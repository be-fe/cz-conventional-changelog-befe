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

class GitHub extends AdaptorInterface {
  static displayName = 'GitHub'

  constructor(config, pkg) {
    super(...arguments)
    this.data = this.normalizeConfigData({
      per_page: 10,
      ...this.data
    })

    this.namespace = this.gitUrlObj && this.gitUrlObj.repository
    this.matchRegexps = this.matchRegexps.concat([
      '^(?<namespace>[\\w-.:]+/[\\w-.:]+)#(?<matching>.*)$'
    ])
  }

  normalizeConfigData(data) {
    return data
  }

  flattenIncomeData(data, { namespace = this.namespace } = {}) {
    data = simplifyData(data, {
      flattenKeys: ['user', { name: 'labels', valueKey: 'name' }],
      defaultKeyName: 'login'
    })
    return {
      ...data,
      issueURL: data.html_url,
      issueId:
        namespace && namespace !== this.namespace
          ? `${namespace}#${data.number}`
          : null,
      type: data.pull_request ? 'pr' : 'issue'
    }
  }

  _isEnabled() {
    return this.gitUrlObj && this.gitUrlObj.host === 'github.com'
  }

  memoized = memoize(gh)

  queryStringify(query) {
    let string = ''
    Object.keys(query).forEach(key => {
      const val = query[key]
      let prefix = key + ':'
      if (key === 'search') {
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
    const query = omit(this.data, ['sort', 'order', 'per_page'])
    query.search = toArray(query.search || [])
    query.repo = toArray(query.repo || [])
    matching && query.search.push(matching)
    namespace && query.repo.push(namespace)

    let { body } = await this.memoized.fn('search/issues', {
      method: 'get',
      token: this.options.token,
      query: {
        q: this.queryStringify(query),
        sort: this.data.sort,
        order: this.data.order,
        pre_page: this.data.per_page
      },
      hooks: {
        beforeRequest: [data => debug('gh-request: %O', data)]
      }
    })

    return body && body.items
  }
}

module.exports = GitHub
