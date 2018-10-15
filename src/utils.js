const fs = require('fs')
const findUp = require('find-up')
const readPkgUp = require('read-pkg-up')
const tranz = require('tranz').default
const tranzCommitIcafe = require('@baidu/tranz-commit-icafe')
const { Card } = require('@baidu/icafe-api')
const shallowequal = require('shallowequal')
const memoize = require('memoize-one')
const isPrimitive = require('is-primitive')
const fuzzy = require('fuzzy')
const Table = require('cli-table3')
const cliWidth = require('cli-width')
const sliceInput = require('@moyuyc/inquirer-autocomplete-prompt/slice-input')
const terminalLink = require('terminal-link')
const stripAnsi = require('strip-ansi')

const parsePlaceholder = require('./parsePlaceholder')

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
function getPackageJsonConfigs() {
  const { pkg = {} } = readPkgUp.sync({ normalize: false }) || {}
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
  const striped = stripAnsi(string)
  if (striped.length > maxLen) {
    if (!/\s$/.test(striped)) return string.slice(0, maxLen - 3) + '...'
    return string.slice(0, maxLen).trim()
  }
  return string.trim() // .slice(0, maxLen)
}

const memoizedFetch = memoize(Card.fetch.bind(Card), shallowequal)
function suggestIcafeIssues(
  input,
  rl = {},
  {
    spaceId = Card.constructor.defaultData.spaceId,
    username = Card.constructor.defaultData.username,
    password = Card.constructor.defaultData.password,
    iql = '负责人 in (currentUser)',
    suggestPlaceholder = '#{sequence} [{type?align=center}] ({status?align=center}) {title?link}  {responsiblePeople?w=20}',

    always,

    ...restData
  } = {}
) {
  input = input || ''
  let { leftIndex, rightIndex, matching } = sliceInput(input, {
    cursor: rl.cursor,
    delimiter: '\\s,'
  })

  let isStartIssue = false
  if (matching.startsWith('#')) {
    isStartIssue = true
    matching = matching.slice(1)
  } else if (/^([a-zA-Z][\w-]+)-(.*)$/.test(matching)) {
    isStartIssue = true
    spaceId = RegExp.$1
    matching = RegExp.$2
  }

  if (!always && !isStartIssue) {
    return Promise.resolve([])
  }

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
    return memoizedFetch(data).then(res => {
      if (res.body.code !== 200) {
        return []
      }
      const parsed = parsePlaceholder(suggestPlaceholder)
      const colWidths = parsed.map(d => {
        let width = null
        if (d.type === 'data') {
          if (d.data.hasOwnProperty('w')) {
            width = parseInt(d.data.w)
          }
        }
        return width
      })

      const table = newTable({
        colWidths
        // colWidths: hasPositive ? colWidths : void 0
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
              if (d.data.link) {
                str = terminalLink(
                  str,
                  `http://newicafe.baidu.com/issue/${spaceId}-${
                    simplifiedData.sequence
                  }/show`
                )
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

        const leftStr =
          input.slice(0, leftIndex) + spaceId + '-' + simplifiedData.sequence
        return {
          value: leftStr + input.slice(rightIndex),
          cursor: leftStr.length
        }
      })

      const tableLines = table.toString().split('\n')
      choices = choices.map((data, index) => {
        const len = Math.min(
          cliWidth() - 24 /* the length of `prefix + suffix` */,
          tableLines[index].length
        )
        return {
          name: sliceString(tableLines[index], len),
          value: data.value,
          cursor: data.cursor
        }
      })

      return fuzzy
        .filter(matching, choices, {
          extract: function(el) {
            return el.value + ' ' + el.name
          }
        })
        .map(x => x.original)
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
  rightPadTypes: rightPadTypes,
  getLanguage: getLanguage,
  getGitRootPath,
  suggestIcafeIssues,
  parsePlaceholder,
  simplifyData,
  issuesFormat: issuesFormat
}
