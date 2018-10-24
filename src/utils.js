const fs = require('fs')
const findUp = require('find-up')
const readPkgUp = require('read-pkg-up')
const tranz = require('tranz').default
const tranzCommitIcafe = require('tranz-commit-icafe')

const memoize = require('memoize-one')

const Table = require('cli-table3')


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

function isSuggestEnabled() {
  const { spaceId, username, password } = Card.constructor.defaultData
  return !!username && !!password
}

function generateFetch() {
  return memoize(Card.fetch.bind(Card), shallowequal)
}

let memoizedFetch = generateFetch()

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
