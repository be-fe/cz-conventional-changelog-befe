/**
 * @file Interface
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const parse = require('parse-github-url')

/**
 * @typedef {{}} InputData
 * @param namespace {string}
 * @param matching {string}
 */

/**
 * 适配器接口
 * @class
 */
class AdaptorInterface {
  get name() {
    return this.constructor.displayName || this.constructor.name
  }

  /**
   * 扁平化，规范化 数据 （来自 fetch 方法）
   * @param data {{}}
   * @param inputData {InputData}
   * @return {{title: string, issueURL?: string, issueId?: string, number?: string, searchText?: string} & *}
   */
  flattenIncomeData(data, inputData) {
    return {
      title: '',
      issueURL: '',
      issueId: '',
      number: '',
      searchText: '',
      ...data
    }
  }

  /**
   *
   * @param config {object} - cz-conventional-changelog-befe config
   * @param pkg {object} - package.json
   * @param gitUrl {string} - git remote url
   */
  constructor(config = {}, pkg = {}, gitUrl = '') {
    if (typeof this.name !== 'string') {
      throw new TypeError(`Adaptor requires \`displayName\` (string) static property, but ${typeof this.name}`)
    }
    this.pkg = pkg
    this.config = config
    this.gitUrl = gitUrl

    if (gitUrl) {
      gitUrl = gitUrl.trim()
      this.gitUrlObj = parse(gitUrl)
      // git@gitlab.com:gitlab-org/release/tasks.git
      if (/^git@.+?:(.+)$/.test(gitUrl)) {
        this.gitUrlObj.path = this.gitUrlObj.pathname = RegExp.$1
      }
    } else if (pkg.repository) {
      const repository = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url
      if (repository) {
        this.gitUrlObj = parse(repository)
      }
    }

    this.options = {
      placeholder: '{#:number?link} {[:type:]?align=center} {(:state:)?align=center} {title?w=50%}  {assignees}',
      suggestEnabled: true,
      ...(this.config && this.config[this.name.toLowerCase()] ? this.config[this.name.toLowerCase()] : this.config)
    }
    this.data = (this.options || {}).data || {}

    this.namespace = ''
    this.matchRegexps = ['^#(?<matching>.+)$']
  }

  /**
   * 判断 suggest adaptor 是否生效
   * @public
   * @return {boolean}
   */
  isEnabled() {
    return this._isEnabled() && this.options.suggestEnabled
  }

  /**
   * @return {boolean}
   * @protected
   */
  _isEnabled() {
    return !!this.namespace
  }

  /**
   * 获取 suggest 列表
   * @param inputData {InputData}
   * @return {Array|Promise<Array>}
   */
  fetch({ namespace, matching }) {
    return []
  }

  /**
   * 转换 commit message
   * @param message {string}
   * @return {string}
   */
  transformCommitMessage(message) {
    return message
  }
}

/**
 * name
 * @type {string}
 */
AdaptorInterface.displayName = ''

module.exports = AdaptorInterface
