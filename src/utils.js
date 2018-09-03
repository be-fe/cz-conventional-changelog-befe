var fs = require('fs')

// 右对齐
// TODO: 中英混杂的时候就对不齐了, 苦恼
function rightPadTypes(tObj, tkeys, lang) {
  var emptyString = getLanguage(lang) === 'zh_cn' ? ' 　　　　　　　　　　　　　　　　　　　　' : '                     '
  var length = tkeys.reduce(
    function (maxLength, key) {
      return maxLength > tObj[key].title.length ? maxLength : tObj[key].title.length
    },
    0
  ) + 1

  return tkeys.map(
    function (key) {
      return {
        name: (tObj[key].title + emptyString).slice(0, length) + ': ' + tObj[key].description,
        value: key
      }
    }
  )
}

const LANGUAGE_MAP = {
  'zh': 'zh_cn',
  'zh_cn': 'zh_cn',
  'en': 'en_us',
  'en_us': 'en_us'
}

// 给tiny-i18n map 参数
function getLanguage(language) {
  var lang = (language + '').toLowerCase()
  return LANGUAGE_MAP[lang] || 'zh_cn'
}

// 拿到 package.json 中的配置
function getPackageJsonConfigs() {
  return JSON.parse(fs.readFileSync(process.cwd() + '/package.json', 'utf8'))
}

// 判断是否加入 icafe 前缀
function icafePrefixer(icafeTitle, serials) {
  if (serials.indexOf('#') === 0) {
    serials = serials.slice(1)
    return icafeTitle + '-' + serials
  }
  return serials
}

var issuesFormat = function (icafeTitle, serials, language) {
  var serialsArray = []
  serials.split(' ').reduce(
    function (resultArray, serialStr) {
      Array.prototype.push.apply(
        resultArray,
        serialStr.split(',').map(function (serial) {
          return icafePrefixer(icafeTitle, serial)
        })
      )
      return resultArray
    },
    serialsArray
  )
  return serialsArray.sort().join(',')
}


module.exports = {
  getPackageJsonConfigs: getPackageJsonConfigs,
  rightPadTypes: rightPadTypes,
  getLanguage: getLanguage,
  issuesFormat: issuesFormat
}
