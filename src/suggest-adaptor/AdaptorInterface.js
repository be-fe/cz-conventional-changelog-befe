/**
 * @file Interface
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const parse = require('parse-github-url')

/**
 * @class AdaptorInterface
 */
class AdaptorInterface {
  get name() {
    return this.constructor.displayName || this.constructor.name
  }

  /**
   *
   * @param data
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

  constructor(config = {}, pkg = {}, gitUrl = '') {
    if (typeof this.name !== 'string') {
      throw new TypeError(
        `Adaptor requires \`displayName\` (string) static property, but ${typeof this
          .name}`
      )
    }
    this.pkg = pkg
    this.config = config
    this.gitUrl = gitUrl

    if (gitUrl) {
      this.gitUrlObj = parse(gitUrl)
    } else if (pkg.repository) {
      const repository =
        typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url
      if (repository) {
        this.gitUrlObj = parse(repository)
      }
    }

    this.options = {
      placeholder:
        '{#:number?link} {[:type:]?align=center} {(:state:)?align=center} {title?w=50%}  {assignees}',
      suggestEnabled: true,
      ...(this.config && this.config[this.name.toLowerCase()]
        ? this.config[this.name.toLowerCase()]
        : this.config)
    }
    this.data = (this.options || {}).data || {}

    this.namespace = ''
    this.matchRegexps = ['^#(?<matching>.+)$']
  }

  isEnabled() {
    return this._isEnabled() && this.options.suggestEnabled
  }

  _isEnabled() {
    return !!this.namespace
  }

  fetch({ namespace, matching }) {
    return []
  }

  transformCommitMessage(message) {
    return message
  }
}

AdaptorInterface.displayName = ''

module.exports = AdaptorInterface
