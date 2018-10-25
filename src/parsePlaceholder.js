const { parseQuery } = require('loader-utils')
const qs = require('querystring')
const isEmpty = require('lodash.isempty')

module.exports = {
  parse,
  stringify,
  replaceStringify
}

// {value?query} {aa:value:xxx?sss}
function parse(template = '') {
  const keys = []
  template.replace(/({([^}]+)}|(.+?))/g, function(match, m, key, chars) {
    let data = {}
    if (key) {
      let i = key.lastIndexOf('?')
      if (i >= 0 && i < key.length - 1) {
        let query = key.slice(i + 1)
        query = encodeURI(query)
        // query = query.slice(0, 1) === '{' ? query : query
        data = parseQuery('?' + query)
        key = key.slice(0, i)
      }
    }

    let props = {}
    if (key) {
      const matched = key.match(/^([^:]+:)?(.+?)(:[^:]+)?$/)
      if (matched) {
        matched[1] && (props.prefix = matched[1].slice(0, -1))
        key = matched[2]
        matched[3] && (props.suffix = matched[3].slice(1))
      }
    }

    const d = key
      ? { type: 'data', value: key, data, ...props }
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

function stringify(parsed) {
  return parsed.reduce((string, obj) => {
    if (obj.type === 'data') {
      let val = obj.value
      if (obj.prefix) {
        val = obj.prefix + ':' + val
      }
      if (obj.suffix) {
        val = val + ':' + obj.suffix
      }
      if (obj.data && !isEmpty(obj.data)) {
        val += '?' + qs.stringify(obj.data)
      }
      string += `{${val}}`
    }
    if (obj.type === 'plain') {
      string += obj.value
    }
    return string
  }, '')
}

function replaceStringify(parsed, data, replacer) {
  replacer =
    replacer ||
    function(data, d) {
      let s = `${data[d.value]}`
      if (d.prefix) {
        s = d.prefix + s
      }
      if (d.suffix) {
        s = s + d.suffix
      }
      return s
    }
  parsed = parsed.map(d => {
    if (d.type === 'data' && data.hasOwnProperty(d.value)) {
      return {
        type: 'plain',
        value: replacer(data, d)
      }
    }
    return d
  })
  return stringify(parsed)
}
