const loaderUtils = require('loader-utils')

module.exports = function(template) {
  return interpolate(template)
}

function interpolate(template) {
  const keys = []
  template.replace(/({([^}]+)}|(.+?))/g, function(match, m, key, chars) {
    let data = {}
    if (key) {
      let i = key.lastIndexOf('?')
      if (i >= 0 && i < key.length - 1) {
        let query = key.slice(i + 1)
        query = query.substr(0, 1) === '{' ? query : encodeURI(query)
        data = loaderUtils.parseQuery('?' + query)
        key = key.slice(0, i)
      }
    }

    const d = key
      ? { type: 'data', value: key, data }
      : { type: 'plain', value: chars }
    const last = keys[keys.length - 1]
    if (last && last.type === 'plain' && d.type === 'plain') {
      last.value += d.value
    } else {
      keys.push(d)
    }
    return match
  })
  return keys
}
