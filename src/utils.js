const fs = require('fs')
const findUp = require('find-up')
const readPkgUp = require('read-pkg-up')
const tranz = require('tranz').default
const tranzCommitIcafe = require('tranz-commit-icafe')
const { create } = require('icafe-api')
const shallowequal = require('shallowequal')
const memoize = require('memoize-one')
const isPrimitive = require('is-primitive')
const fuzzy = require('fuzzy')
const Table = require('cli-table3')
const cliWidth = require('cli-width')
const sliceInput = require('@moyuyc/inquirer-autocomplete-prompt/slice-input')
const terminalLink = require('terminal-link')
const stripAnsi = require('strip-ansi')
const stringWidth = require('string-width')

const parsePlaceholder = require('./parsePlaceholder')
const debug = require('debug')('cz-conventional-changelog-befe')

const { Card } = create()
debug('debug enabled!')
debug('Card.constructor.defaultData %O', Card.constructor.defaultData)

const tableConfig = {
  chars: {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: '',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ''
  },
  style: { 'padding-left': 0, 'padding-right': 0 }
}

function newTable(config) {
  return new Table(Object.assign({}, tableConfig, config))
}

// 右对齐
// TODO: 中英混杂的时候就对不齐了, 苦恼
function rightPadTypes(tObj, tkeys, lang) {
  const emptyString =
    getLanguage(lang) === 'zh_cn'
      ? ' 　　　　　　　　　　　　　　　　　　　　'
      : '                     '

  const table = newTable({ colWidths: [12] })
  const list = tkeys.map(function(key) {
    table.push([key + ':', tObj[key].description])
    return {
      object: tObj[key],
      value: key
    }
  })

  const lines = table.toString().split('\n')
  return list.map((d, i) => {
    return {
      name: lines[i],
      value: d.value
    }
  })
}

const LANGUAGE_MAP = {
  zh: 'zh_cn',
  zh_cn: 'zh_cn',
  en: 'en_us',
  en_us: 'en_us'
}

function getGitRootPath() {
  const gitPath = findUp.sync('.git')
  if (gitPath && fs.statSync(gitPath).isDirectory()) {
    return gitPath
  }
  return gitPath
}

// 给tiny-i18n map 参数
function getLanguage(language) {
  const lang = (language + '').toLowerCase()
  return LANGUAGE_MAP[lang] || 'zh_cn'
}

// 拿到 package.json 中的配置
function getPackageJsonConfigs(cwd) {
  const { pkg = {} } = readPkgUp.sync({ normalize: false, cwd }) || {}
  return pkg
}

function issuesFormat(spaceId, serials) {
  return tranz(serials, [tranzCommitIcafe({ spaceId, readPkg: false })])
}

function getVal(val, { keyName = 'name' } = {}) {
  if (val && val.hasOwnProperty && val.hasOwnProperty(keyName)) {
    val = val[keyName]
  }
  if (typeof val === 'undefined') {
    val = ''
  }
  return isPrimitive(val) || (Array.isArray(val) && val.every(isPrimitive))
    ? val
    : null
}

function simplifyData(data = {}) {
  const newData = {}
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let val = data[key]
      if (['responsiblePeople'].indexOf(key) >= 0 && Array.isArray(val)) {
        val = val.map(v => getVal(v, { keyName: 'name' }))
      }

      if ('properties' === key) {
        val.forEach(v => {
          newData[v.propertyName] = getVal(v, { keyName: 'displayValue' })
        })
      } else {
        newData[key] = getVal(val)
      }
    }
  }
  return newData
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

function isSuggestEnabled() {
  const { spaceId, username, password } = Card.constructor.defaultData
  return !!username && !!password
}

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

function generateFetch() {
  return memoize(Card.fetch.bind(Card), shallowequal)
}

let memoizedFetch = generateFetch()
function suggestIcafeIssues(
  input,
  rl = {},
  {
    spaceId = Card.constructor.defaultData.spaceId,
    username = Card.constructor.defaultData.username,
    password = Card.constructor.defaultData.password,
    iql = '负责人 in (currentUser)',
    suggestPlaceholder = '#{sequence?link} [{type?align=center}] ({status?align=center}) {title?w=35%}  {responsiblePeople?w=10%}',

    always,
    suggestTitle = false,

    ...restData
  } = {}
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
        // maxRecords: 30
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

function htmlDecode(str) {
  // 一般可以先转换为标准 unicode 格式（有需要就添加：当返回的数据呈现太多\\\u 之类的时）
  str = str
    .replace(/\\u/g, '%u')
    .replace(/&amp;?/g, '&')
    .replace(/&lt;?/g, '<')
    .replace(/&gt;?/g, '>')
    .replace(/&quot;?/g, '"')
    .replace(/&apos;?/g, "'")
  // 再对实体符进行转义
  // 有 x 则表示是16进制，$1 就是匹配是否有 x，$2 就是匹配出的第二个括号捕获到的内容，将 $2 以对

  str = str.replace(/&#(x)?(\w+);/g, function($, $1, $2) {
    return String.fromCharCode(parseInt($2, $1 ? 16 : 10))
  })

  return str
}

module.exports = {
  getPackageJsonConfigs: getPackageJsonConfigs,
  rightPadTypes,
  getLanguage,
  getGitRootPath,
  suggestIcafeIssues,
  parsePlaceholder,
  simplifyData,
  isSuggestEnabled,
  issuesFormat
}
