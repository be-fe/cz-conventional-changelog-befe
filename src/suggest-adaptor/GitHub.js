/**
 * @file icafe
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const gh = require('gh-got')

const debug = require('../debug')
const memoize = require('../memoize')
const AdaptorInterface = require('./AdaptorInterface')
const { simplifyData } = require('../utils')

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

  flattenIncomeData(data) {
    data = simplifyData(data)
    return {
      issueNo: '',
      ...data,
      title: htmlDecode(data.title)
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

  async fetch({ namespace, matching }) {
    let body
    let data = await this.memoized.fn('search/issues', {
      method: 'get',
      token: this.options.token,
      query: {
        q: `${matching}+repo:${namespace}`,
        ...this.data
      },
      hooks: {
        beforeRequest: [data => debug('gh-request: %O', data)]
      }
    })
    body = data && data.body

    if (!body || !body.cards || body.code !== 200) {
      return []
    }

    return body.cards
  }
}

module.exports = Icafe
