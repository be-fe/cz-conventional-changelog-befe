/**
 * @file Interface
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

/**
 * @class AdaptorInterface
 */
class AdaptorInterface {
  get name() {
    return this.constructor.name
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

  constructor(config = {}, pkg = {}) {
    if (typeof this.name !== 'string') {
      throw new TypeError(
        `Adaptor requires \`displayName\` (string) static property, but ${typeof this
          .name}`
      )
    }
    this.pkg = pkg
    this.config = config

    this.options = { ...(this.config && this.config[this.name]) }
    this.options.placeholder =
      this.options.placeholder ||
      '#{number?link} [{type?align=center}] ({state?align=center}) {title?w=35%}  {assignees?w=10%}'
    this.data = (this.options || {}).data || this.config.data || {}

    this.namespace = ''
    this.matchRegexps = ['^#(?<matching>.+)$']
  }

  isEnabled({ gitUrlParsed } = {}) {
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
