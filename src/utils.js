const fs = require('fs')
const findUp = require('find-up')
const readPkgUp = require('read-pkg-up')
const tranz = require('tranz').default
const tranzCommitIcafe = require('tranz-commit-icafe')
const Table = require('cli-table3')
const isPrimitive = require('is-primitive')
// const stripAnsi = require('strip-ansi')
const stringWidth = require('string-width')
const cliWidth = require('cli-width')

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

function rightPadTypes(tObj, tkeys, lang) {
  const emptyString =
    getLanguage(lang) === 'zh'
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
      name: trimRight(sliceString(lines[i], cliWidth() - 4)),
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
  const { pkg = {} } = readPkgUp.sync({ normalize: true, cwd }) || {}
  return pkg
}

function issuesFormat(spaceId, message) {
  return tranz(message, [tranzCommitIcafe({ spaceId, readPkg: false })])
}

function getVal(val, { keyName = 'name' } = {}) {
  if (val && val.hasOwnProperty && val.hasOwnProperty(keyName)) {
    val = val[keyName]
  }
  if (val == null) {
    val = ''
  }

  if (isPrimitive(val) || (Array.isArray(val) && val.every(isPrimitive))) {
    return val
  }
  if (Array.isArray(val)) {
    val = val.map(v => getVal(v, { keyName }))
  }

  return val
}

function simplifyData(
  data = {},
  { flattenKeys = [], rollbackKeys = [], defaultKeyName = 'name' } = {}
) {
  function find(array, value) {
    return array.find(x => {
      if (typeof x === 'string') {
        return x === value
      }
      return x && x.name === value
    })
  }
  const newData = {}
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let val = data[key]
      let tmp
      if ((tmp = find(flattenKeys, key))) {
        const keyName = tmp && tmp.valueKey ? tmp.valueKey : defaultKeyName
        if (Array.isArray(val)) {
          val = val.map(v => getVal(v, { keyName }))
        } else {
          val = getVal(val, { keyName })
        }
      }

      if ((tmp = find(rollbackKeys, key))) {
        const keyName = tmp && tmp.valueKey ? tmp.valueKey : defaultKeyName
        val.forEach(v => {
          newData[v.propertyName] = getVal(v, { keyName })
        })
      } else {
        newData[key] = getVal(val, { keyName: defaultKeyName })
      }
    }
  }
  return newData
}

function sliceString(string, maxLen, { deltaLen = 0 } = {}) {
  // let string = string
  const ellipsis = '…'
  const ellipsisLen = stringWidth(ellipsis)
  let isSliced = false
  while (
    deltaLen + stringWidth(string) >
    maxLen - (string.endsWith(ellipsis) ? 0 : ellipsisLen)
  ) {
    isSliced = true
    if (/\s$/.test(string)) {
      string = trimRight(string)
    } else {
      string = string.slice(0, -1)
    }
  }
  if (isSliced && !string.endsWith(ellipsis)) {
    string = string + ellipsis
  }
  return string // .slice(0, maxLen)
}

function trimRight(str) {
  return str.replace(/\s+$/, '')
}

module.exports = {
  sliceString,
  trimRight,
  getPackageJsonConfigs,
  rightPadTypes,
  getLanguage,
  getGitRootPath,
  getVal,
  simplifyData,
  issuesFormat,
  newTable
}
