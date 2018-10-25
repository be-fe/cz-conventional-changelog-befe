/**
 * @file suggest
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const cliWidth = require('cli-width')
const fuzzy = require('fuzzy')
const sliceInput = require('@moyuyc/inquirer-autocomplete-prompt/slice-input')
const terminalLink = require('terminal-link')
const namedRegexp = require('named-js-regexp')
const stringWidth = require('string-width')

const memoize = require('./memoize')
const debug = require('./debug')
const { parse } = require('./parsePlaceholder')
const { newTable, sliceString, trimRight } = require('./utils')

function linkify(text = '') {
  return `#__link__#${text}#__link__#`
}

function lastOfLink(string) {
  return string.lastIndexOf('#__link__#')
}

function unlinkify(text, replacer = m => m) {
  const reg = /#__link__#(.*)?#__link__#/g
  let i = 0
  return text.replace(reg, (_, m) =>
    replacer(m, { times: ++i, endIndex: RegExp.lastMatch.length })
  )
}

const INCREASE_LEN = linkify('').length

/**
 *
 * @param adaptor {AdaptorInterface}
 * @param opts
 * @return {Function}
 */
function makeSuggest(adaptor, { always, suggestTitle = false } = {}) {
  let controller = memoize(adaptor.fetch.bind(adaptor))

  return async function suggest(input, { cursor } = {}) {
    input = input || ''
    let { leftIndex, rightIndex, matching } = sliceInput(input, {
      cursor,
      delimiter: '\\s,'
    })

    let namespace = adaptor.namespace
    let isStartIssue = false
    let isSuggestTitle = false
    let match
    adaptor.matchRegexps.some(rgx => {
      match = namedRegexp(rgx).exec(matching)
      if (match) {
        debug('matched regexp', rgx)
      }
      return !!match
    })
    let inputData = { namespace, matching }

    if (match) {
      // /^([a-zA-Z][\w-]+)-(.*)$/
      isStartIssue = true
      let groups = match.groups() || {}
      inputData = {
        ...inputData,
        ...groups,
        namespace:
          typeof groups.namespace === 'string' ? groups.namespace : namespace,
        matching:
          typeof groups.matching === 'string' ? groups.matching : matching
      }
    } else if (suggestTitle) {
      isStartIssue = true
      isSuggestTitle = true
    }

    if (!always && !isStartIssue) {
      return Promise.resolve([])
    }

    const linkEnabled = cliWidth() > 140

    if (!inputData.namespace) {
      return Promise.resolve([])
    }
    debug('input data：%O', inputData)
    debug('请求数据：%O', adaptor.data)
    let list = []
    try {
      list = await controller.fn.call(adaptor, inputData)
      debug('响应数据：%O', list)
    } catch (e) {
      debug(e)
      throw e
    }

    if (!list || !Array.isArray(list)) {
      return Promise.resolve([])
    }
    const parsed = parse(
      adaptor.options.placeholder || adaptor.config.placeholder
    )
    const colWidths = parsed.map(d => {
      let width = null
      if (d.type === 'data') {
        if (d.data.hasOwnProperty('w')) {
          if (d.data.w.trim().endsWith('%')) {
            width = parseInt(parseInt(d.data.w) * 0.01 * cliWidth())
          } else {
            width = parseInt(d.data.w)
          }
          // link 会加上 包裹符，所以 width 需要加上包裹符的长度
          if (d.data.link && linkEnabled) {
            width += INCREASE_LEN
          }
        }
      }
      return width
    })

    const table = newTable({
      colWidths
    })

    let choices = list.map(data => {
      // card.title = htmlDecode(card.title)
      const flattenData = adaptor.flattenIncomeData(data, inputData)
      const row = []
      parsed.forEach(d => {
        if (d.type === 'data') {
          if (flattenData.hasOwnProperty(d.value)) {
            let str = `${d.prefix || ''}${String(
              flattenData[d.value]
            )}${d.suffix || ''}`

            if (d.data.link && linkEnabled) {
              str = linkify(str)
            }
            if (typeof d.data.align === 'string') {
              str = { hAlign: d.data.align, content: str }
            }
            row.push(str)
          } else {
            row.push(`{${d.value}}`)
          }
        } else {
          row.push(d.value)
        }
      })
      table.push(row)

      const leftStr = !isSuggestTitle
        ? input.slice(0, leftIndex) +
          (flattenData.issueId || `#${flattenData.number}`)
        : input.slice(0, leftIndex) + flattenData.title

      return {
        row,
        flattenData,
        value: leftStr + input.slice(rightIndex),
        cursor: leftStr.length
      }
    })

    const tableLines = table.toString().split('\n')
    // debug(tableLines)
    debug(
      'choices.length: %d, tableLines.length: %d.',
      choices.length,
      tableLines.length
    )
    choices = choices.map((data, index) => {
      let line = null
      let len = cliWidth() - 10 /* the length of `prefix + suffix` */
      if (tableLines[index]) {
        len = Math.min(len, tableLines[index].length)
        line = unlinkify(tableLines[index], (str, { endIndex, times }) => {
          let end = endIndex - times * INCREASE_LEN
          if (end < len && data.flattenData.issueURL) {
            return terminalLink(str, data.flattenData.issueURL, {
              fallback: text => text
            })
          }
          return str
        })
      }

      let name = line
      if (line == null) {
        name = data.row
          .map(cell => {
            let str = ''
            if (typeof cell === 'string') {
              str = cell
            } else if (cell && typeof cell.content === 'string') {
              str = cell.content
            }
            return unlinkify(str)
          })
          .join('')
        // name = sliceString(trimRight(name), len)
      }
      return {
        data: data.flattenData,
        name: sliceString(trimRight(name), len),
        value: data.value,
        cursor: data.cursor
      }
    })

    return fuzzy
      .filter(inputData.matching.replace(/\+/g, ' '), choices, {
        extract: function(el) {
          const data = el.data
          return (
            data.searchText ||
            [
              data.issueId || '',
              data.number || '',
              data.title || ''
              // data.type,
              // data.status,
              // String(data.responsiblePeople)
            ].join(' ')
          )
        }
      })
      .map(x => {
        delete x.original.data
        return x.original
      })
  }
}

module.exports = makeSuggest