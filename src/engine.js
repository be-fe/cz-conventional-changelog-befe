const wrap = require('word-wrap')
const inquirerStore = require('inquirer-store')
const FileStore = require('inquirer-store/FileStore')
const fuzzy = require('fuzzy')
const autoComplete = require('@moyuyc/inquirer-autocomplete-prompt')
const nps = require('path')
const minimist = require('minimist')
const omit = require('lodash.omit')
const gitRemoteOriginUrl = require('git-remote-origin-url')
const getCommitLintTypes = require('conventional-commit-types-befe')
const { parse } = require('url')

const { name } = require('../package')
const utils = require('./utils')
const makeSuggest = require('./makeSuggest')
const i = require('./i18n')
const i18n = i.i18n

const filter = function(array) {
  return array.filter(function(x) {
    return x
  })
}

const args = minimist(process.argv.slice(2), {
  boolean: ['read']
})

function removeArgv(flags = []) {
  flags.forEach(flag => {
    while (true) {
      let readIndex = process.argv.findIndex(
        x => x === flag || x.startsWith(flag + '=')
      )
      if (readIndex >= 0) {
        process.argv.splice(readIndex, 1)
      } else {
        break
      }
    }
  })
}
removeArgv(['--read', '--retry'])

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = async function({
  pkg,
  gitRemoteUrl,
  suggestAdaptors = require('./suggest-adaptor')
} = {}) {
  pkg.lang = pkg.lang || 'zh'
  gitRemoteUrl = gitRemoteUrl || (await gitRemoteOriginUrl())

  i18n.setLanguage(utils.getLanguage(pkg.lang))
  const types = getCommitLintTypes(pkg.lang)

  const typeChoices = utils.rightPadTypes(
    types.typeObjects,
    types.typeKeys,
    pkg.lang
  )
  const gitRootPath = utils.getGitRootPath()

  let config = pkg.config ? pkg.config[name] : {}
  config = Object.assign({ scopeSuggestOnly: false }, config)

  return {
    prompter: function(cz, commit) {
      const adaptorConfig = omit(config, ['scopes', 'scopeSuggestOnly'])

      suggestAdaptors = suggestAdaptors.map(Class => {
        new Class(adaptorConfig, pkg)
      })

      const gitUrlParsed = parse(gitRemoteUrl)
      const enabledSuggest = suggestAdaptors.find(adaptor =>
        adaptor.isEnabled({ gitUrlParsed })
      )

      function makeSuggestLocal(options) {
        if (!enabledSuggest) {
          return null
        }

        const suggest = makeSuggest(enabledSuggest, options)
        return (answers, input, rl) => suggest(input, rl)
      }

      if (enabledSuggest) {
        console.warn(i18n('succ.suggest-enabled', enabledSuggest.name))
      } else {
        console.warn(i18n('warn.suggest-disabled'))
      }

      console.log(i18n('first.hint'))

      const type = enabledSuggest ? 'auto-complete' : 'input'
      cz.registerPrompt('auto-complete', autoComplete)
      const store = new FileStore({
        storePath: nps.join(__dirname, '../inquirer-cache.json'),
        key: gitRootPath
      })

      let scopeProps = { type: 'input' }
      if (Array.isArray(config.scopes) && config.scopes.length) {
        scopeProps.type = 'auto-complete'
        scopeProps.suggestOnly = config.scopeSuggestOnly
        scopeProps.source = (answers, input) => {
          return fuzzy
            .filter(input || '', config.scopes, {
              extract: function(el) {
                return typeof el === 'string'
                  ? el
                  : el.value + (' ' + el.name || '')
              }
            })
            .map(x => {
              return x.original
            })
        }
      }

      function prompt() {
        return inquirerStore(
          cz.prompt,
          [
            {
              type: 'auto-complete',
              name: 'type',
              message: i18n('feat.hint'),
              source: (answers, input) => {
                return fuzzy
                  .filter(input || '', typeChoices, {
                    extract: function(el) {
                      return (el.value || '') + ' ' + el.name
                    }
                  })
                  .map(x => {
                    return x.original
                  })
              }
            },
            {
              name: 'scope',
              message: i18n('scope.hint'),
              ...scopeProps
            },
            {
              type: type,
              noResultText: null,
              suggestOnly: true,
              name: 'subject',
              source: makeSuggestLocal({ suggestTitle: true }),
              validate: input => {
                if (!input) {
                  return i18n('subject.error')
                }
                return true
              },
              message: i18n('subject.hint')
            },
            {
              type: 'input',
              name: 'body',
              message: i18n('body.hint')
            },
            {
              type: 'confirm',
              default: false,
              name: 'hasBreaking',
              message: i18n('has-breaking.hint')
            },
            {
              type: 'input',
              when: ans => ans.hasBreaking,
              name: 'breaking',
              message: i18n('breaking.change.hint')
              // noResultText: null,
              // suggestOnly: true,
              // source: makeSuggest()
            },
            {
              type: 'confirm',
              default: false,
              name: 'hasIssues',
              message: i18n('has-issues.hint')
            },
            {
              when: ans => ans.hasIssues,
              type: type,
              suggestOnly: true,
              noResultText: null,
              name: 'issues',
              source: makeSuggestLocal({ always: true }),
              message: i18n('issues.hint')
            }
          ],
          {
            mode: args['read'] ? 'duplex' : 'write',
            store
          }
        )
      }

      prompt()
        .then(function(answers) {
          const maxLineWidth = 100

          const wrapOptions = {
            trim: true,
            newline: '\n',
            indent: '',
            width: maxLineWidth
          }

          // parentheses are only needed when a scope is present
          let scope = (answers.scope || '').trim()
          scope = scope ? '(' + answers.scope.trim() + ')' : ''

          // Hard limit this line
          const head = (
            (answers.type || '') +
            scope +
            ': ' +
            (answers.subject || '').trim()
          ).slice(0, maxLineWidth)

          // Wrap these lines at 100 characters
          const body = wrap(answers.body, wrapOptions)

          // Apply breaking change prefix, removing it if already present

          let breaking = answers.breaking ? answers.breaking.trim() : ''
          breaking = breaking
            ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '')
            : ''
          breaking = wrap(breaking, wrapOptions)

          return utils
            .issuesFormat(prefix, answers.issues || '')
            .then(issues => {
              issues = issues ? wrap(issues, wrapOptions) : ''
              const footer = filter([breaking, issues]).join('\n\n')
              let message = head
              if (body) {
                message += '\n\n' + body
              }
              if (footer) {
                message += '\n\n' + footer
              }

              typeof commit === 'function' &&
                commit(message, {
                  args: process.argv.slice(2)
                })
            })
        })
        .catch(console.error)
    }
  }
}
