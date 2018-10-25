/**
 * @file icafe
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const gl = require('gl-got')
const isPrimitive = require('is-primitive')
const toArray = require('lodash.toarray')

const debug = require('../debug')
const memoize = require('../memoize')
const AdaptorInterface = require('./AdaptorInterface')
const { simplifyData } = require('../utils')

const omit = require('lodash.omit')

class GitLab extends AdaptorInterface {
  static displayName = 'GitLab'

  constructor(config, pkg) {
    super(...arguments)
    this.data = this.normalizeConfigData({
      per_page: 10,
      ...this.data
    })

    this.namespace =
      this.gitUrlObj && this.gitUrlObj.pathname.replace(/\.git$/i, '')
    this.matchRegexps = this.matchRegexps.concat([
      '^(?<namespace>[\\w-.:]+/[\\w-.:]+(/[\\w-.:]+)?)#(?<matching>.*)$'
    ])
  }

  normalizeConfigData(data) {
    return data
  }

  get baseUrl() {
    const { protocol, hostname } = this.gitUrlObj || {}
    const isHTTP = ['http:', 'https:'].includes(protocol)
    return `${isHTTP ? protocol : 'http:'}//${hostname}`
  }

  flattenIncomeData(data, { namespace = this.namespace } = {}) {
    data = simplifyData(data, {
      defaultKeyName: 'name'
    })
    return {
      ...data,
      issueURL: data.web_url,
      issueId:
        namespace && namespace !== this.namespace
          ? `${namespace}#${data.iid}`
          : null,
      type: data.pull_request ? 'pr' : 'issue',
      number: data.iid
    }
  }

  _isEnabled() {
    return this.gitUrlObj && this.gitUrlObj.hostname.startsWith('gitlab.')
  }

  memoized = memoize(gl)

  queryStringify(query) {
    query = { ...query }

    function getChunks(query) {
      let stringChunks = []
      Object.keys(query).forEach(name => {
        let val = query[name]
        if (name === 'search') {
          if (Array.isArray(val)) {
            val = val.join('+')
          }
        }
        if (name === 'iids') {
          toArray(val).forEach(id => {
            stringChunks = stringChunks.concat(getChunks({ 'iids[]': id }))
          })
          return
        }

        if (Array.isArray(val)) {
          val = val.join(',')
        }
        if (val instanceof Date) {
          val = val.toISOString()
        }

        stringChunks.push(
          `${encodeURIComponent(name)}=${encodeURIComponent(String(val))}`
        )
      })
      return stringChunks
    }

    return getChunks(query).join('&')
  }

  async fetch({ namespace, matching }) {
    const query = { ...this.data }
    query.search = toArray(query.search || [])
    query.search.push(matching)
    let { body } = await this.memoized.fn(
      `/api/v4/projects/${encodeURIComponent(namespace)}/issues`,
      {
        method: 'get',
        token: this.options.token,
        baseUrl: this.baseUrl,
        query: this.queryStringify(query),
        hooks: {
          beforeRequest: [data => debug('gl-request: %O', data)]
        }
      }
    )

    return body
  }
}

module.exports = GitLab
