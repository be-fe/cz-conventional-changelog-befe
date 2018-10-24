/**
 * @file suggest
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const cliWidth = require('cli-width')
const shallowequal = require('shallowequal')
const isPrimitive = require('is-primitive')
const fuzzy = require('fuzzy')
const sliceInput = require('@moyuyc/inquirer-autocomplete-prompt/slice-input')
const terminalLink = require('terminal-link')
const stripAnsi = require('strip-ansi')
const stringWidth = require('string-width')

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

function sliceString(string, maxLen) {
  let striped = stripAnsi(string)

  const ellipsis = '…'
  const ellipsisLen = stringWidth(ellipsis)
  let isSliced = false
  while (
    stringWidth(striped) >
    maxLen - (striped.endsWith(ellipsis) ? 0 : ellipsisLen)
  ) {
    isSliced = true
    if (/\s$/.test(striped)) {
      striped = striped.replace(/\s+$/, '')
    } else {
      striped = striped.slice(0, -1)
    }
  }
  if (isSliced && !striped.endsWith(ellipsis)) {
    string = striped + ellipsis
  }
  return string // .slice(0, maxLen)
}

const INCREASE_LEN = linkify('').length

function suggestIcafeIssues(
  input,
  rl = {},
  { data = {}, always, suggestTitle = false } = {}
) {
  input = input || ''
  let { leftIndex, rightIndex, matching } = sliceInput(input, {
    cursor: rl.cursor,
    delimiter: '\\s,'
  })

  let isStartIssue = false
  let isSuggestTitle = false
  if (matching.startsWith('#')) {
    isStartIssue = true
    matching = matching.slice(1)
  } else if (/^([a-zA-Z][\w-]+)-(.*)$/.test(matching)) {
    isStartIssue = true
    spaceId = RegExp.$1
    matching = RegExp.$2
  } else if (suggestTitle) {
    isStartIssue = true
    isSuggestTitle = true
  }

  if (!always && !isStartIssue) {
    return Promise.resolve([])
  }

  const linkEnabled = cliWidth() > 140
  if (spaceId) {
    const data = Object.assign(
      {
        spaceId,
        username,
        password,
        page: 1,
        iql,
        order: 'createTime',
        isDesc: false
      },
      restData
    )

    debug('请求数据：%O', data)

    return memoizedFetch(data)
      .then(res => {
        if (res.body.code !== 200) {
          return []
        }
        const parsed = parsePlaceholder(suggestPlaceholder)
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
        const sorted = res.body.cards

        let choices = sorted.map(card => {
          card.title = htmlDecode(card.title)
          const simplifiedData = simplifyData(card)
          const row = []
          parsed.forEach(d => {
            if (d.type === 'data') {
              if (d.value in simplifiedData) {
                let str = String(simplifiedData[d.value])
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
              spaceId +
              '-' +
              simplifiedData.sequence
            : input.slice(0, leftIndex) + simplifiedData.title

          return {
            row,
            simplifiedData,
            value: leftStr + input.slice(rightIndex),
            cursor: leftStr.length
          }
        })

        const tableLines = table.toString().split('\n')
        debug(tableLines)
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
              if (end < len /*&& cliWidth() >= 140*/) {
                return terminalLink(
                  str,
                  `http://newicafe.baidu.com/issue/${spaceId}-${
                    data.simplifiedData.sequence
                  }/show`,
                  { fallback: text => text }
                )
              }
              return str
            })
          }

          let name = line
          if (line == null) {
            name = sliceString(
              data.row
                .map(cell => {
                  let str = ''
                  if (typeof cell === 'string') {
                    str = cell
                  } else if (cell && typeof cell.content === 'string') {
                    str = cell.content
                  }
                  return unlinkify(str)
                })
                .join(''),
              len
            )
          }

          return {
            data: data.simplifiedData,
            name,
            value: data.value,
            cursor: data.cursor
          }
        })

        return fuzzy
          .filter(matching, choices, {
            extract: function(el) {
              const data = el.data
              return [
                data.sequence,
                data.title,
                data.type,
                data.status,
                String(data.responsiblePeople)
              ].join(' ')
            }
          })
          .map(x => {
            delete x.original.data
            return x.original
          })
      })
      .catch(err => {
        // 去除已经存储的 fetch
        memoizedFetch = generateFetch()
        debug(err)
        throw err
      })
  }

  return Promise.resolve([])
}

module.exports = suggestIcafeIssues
