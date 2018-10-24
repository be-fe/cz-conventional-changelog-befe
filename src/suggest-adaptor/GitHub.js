/**
 * @file icafe
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const gh = require('gh-got')
const isPrimitive = require('is-primitive')
const toArray = require('lodash.toarray')

const debug = require('../debug')
const memoize = require('../memoize')
const AdaptorInterface = require('./AdaptorInterface')
const { simplifyData } = require('../utils')

const omit = require('lodash.omit')

class Icafe extends AdaptorInterface {
  static displayName = 'github'

  constructor(config, pkg) {
    super(config, pkg)
    this.options.placeholder =
      this.options.placeholder ||
      '#{sequence?link} [{type?align=center}] ({status?align=center}) {title?w=35%}  {responsiblePeople?w=10%}'
    this.data = this.normalizeConfigData({
      repo: ''
    })

    this.namespace = this.data.spaceId
    // this.matchRegexps = this.matchRegexps.concat([
    //   '^(?<namespace>[a-zA-Z][\\w-]+)-(?<matching>.*)$'
    // ])
  }

  normalizeConfigData(data) {
    return data
  }

  flattenIncomeData(data, { namespace } = {}) {
    data = simplifyData(data, {
      flattenKeys: ['user', { name: 'labels', valueKey: 'name' }],
      defaultKeyName: 'login'
    })
    return {
      issueId:
        namespace && namespace !== this.namespace
          ? `${namespace}#${data.number}`
          : null,
      type: data.pull_request ? 'pr' : 'issue',
      ...data
    }
  }

  isEnabled({ gitUrlParsed } = {}) {
    return (
      super.isEnabled.apply(this, arguments) &&
      this.data.username &&
      this.data.password
    )
  }

  memoized = memoize(gh)

  queryStringify(query) {
    let string = ''
    Object.keys(query).forEach(key => {
      const val = query[key]
      let prefix = key + ':'
      if (key === 'word') {
        prefix = ''
      }
      if (Array.isArray(val)) {
        string +=
          val.map(x => (x ? `${prefix}${String(x)}` : '')).join(' ') + ' '
      } else if (val && isPrimitive(val)) {
        string += ' ' + String(val)
      }
    })
    return string.trim()
  }

  async fetch({ namespace, matching }) {
    const query = omit(this.data, ['sort', 'order'])
    query.word = toArray(query.word || [])
    query.repo = toArray(query.repo || [])
    query.word.push(matching)
    query.repo.push(namespace)

    let { body } = await this.memoized.fn('search/issues', {
      method: 'get',
      token: this.options.token,
      query: {
        q: this.queryStringify(query),
        sort: this.data.sort,
        order: this.data.order
      },
      hooks: {
        beforeRequest: [data => debug('gh-request: %O', data)]
      }
    })

    return body && body.items
  }
}

module.exports = Icafe
