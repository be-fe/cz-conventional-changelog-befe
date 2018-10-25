/**
 * @file icafe
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const { create } = require('icafe-api')
const { normalizeIcafeByPkg } = require('normalize-icafe-pkg')

const debug = require('../debug')
const memoize = require('../memoize')
const AdaptorInterface = require('./AdaptorInterface')
const { simplifyData, issuesFormat } = require('../utils')

const { Card } = create()

debug(
  'icafe-api: Card.constructor.defaultData %O',
  Card.constructor.defaultData
)

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

class Icafe extends AdaptorInterface {
  static displayName = 'Icafe'

  constructor(config, pkg) {
    super(...arguments)
    this.pkg.icafe = normalizeIcafeByPkg(pkg)
    this.data = this.normalizeConfigData({
      spaceId: Card.constructor.defaultData.spaceId,
      username: Card.constructor.defaultData.username,
      password: Card.constructor.defaultData.password,
      iql: '负责人 in (currentUser)',
      page: 1,
      order: 'createTime',
      isDesc: false,
      ...this.pkg.icafe,
      ...this.data
    })

    this.namespace = this.data.spaceId
    this.matchRegexps = this.matchRegexps.concat([
      '^(?<namespace>[a-zA-Z][\\w-]+)-(?<matching>.*)$'
    ])
  }

  normalizeConfigData(data) {
    return data
  }

  flattenIncomeData(data, { namespace } = {}) {
    data = simplifyData(data, {
      flattenKeys: [{ name: 'responsiblePeople', valueKey: 'name' }],
      rollbackKeys: [{ name: 'properties', valueKey: 'displayValue' }],
      defaultKeyName: 'name'
    })
    return {
      issueURL:
        namespace &&
        `http://newicafe.baidu.com/issue/${namespace}-${data.sequence}/show`,
      assignees: data.responsiblePeople,
      state: data.status,
      issueId: namespace ? `${namespace}-${data.sequence}` : null,
      number: data.sequence,
      ...data,
      title: htmlDecode(data.title)
    }
  }

  _isEnabled() {
    return this.data.username && this.data.password && this.namespace
  }

  memoized = memoize(Card.fetch.bind(Card))

  async fetch({ namespace, matching }) {
    let body
    let data = await this.memoized.fn({
      ...this.data,
      spaceId: namespace
    })
    body = data && data.body

    if (!body || !body.cards || body.code !== 200) {
      return []
    }

    return body.cards
  }

  transformCommitMessage(message) {
    return this.namespace ? issuesFormat(this.namespace, message) : message
  }
}

module.exports = Icafe
