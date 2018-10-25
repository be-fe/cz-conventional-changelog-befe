const wrap = require('word-wrap')
const inquirerStore = require('inquirer-store')
const FileStore = require('inquirer-store/FileStore')
const fuzzy = require('fuzzy')
const autoComplete = require('@moyuyc/inquirer-autocomplete-prompt')
const nps = require('path')
const minimist = require('minimist')
const omit = require('lodash.omit')
const getCommitLintTypes = require('conventional-commit-types-befe')
const osLocale = require('os-locale')
const findUp = require('find-up')
const loadJson = require('load-json-file')

const { name } = require('../package')
const getGitRemoteUrl = require('./gitRemoteUrl')
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

function catchError(fn) {
  return async function() {
    try {
      return await fn.apply(this, arguments)
    } catch (e) {
      console.error(e)
    }
  }
}

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function({
  pkg,
  gitRemoteUrl,
  suggestAdaptors = require('./suggest-adaptor'),
  userc = true
} = {}) {
  return {
    prompter: catchError(async function(cz, commit) {
      let lang = (osLocale.sync() || '')
        .toLowerCase()
        .trim()
        .startsWith('zh')
        ? 'zh'
        : 'en'
      pkg.lang = pkg.lang || lang

      i.setLanguage(utils.getLanguage(pkg.lang))
      let { typeKeys, typeObjects } = getCommitLintTypes(pkg.lang)

      // Convert `Fix` to `fix`
      const set = new Set()
      typeKeys.forEach(type => {
        set.add(type.toLowerCase())
      })
      typeKeys = Array.from(set)

      const typeChoices = utils.rightPadTypes(typeObjects, typeKeys, pkg.lang)
      let config = pkg.config && pkg.config[name]
      if (!config && userc) {
        let rcPath = await findUp(`.${name}rc`)
        if (rcPath) {
          config = await loadJson(rcPath)
        }
      }
      config = Object.assign(
        { scopeSuggestOnly: false, remoteName: 'origin' },
        config
      )
      const adaptorConfig = omit(config, [
        'scopes',
        'scopeSuggestOnly',
        'remoteName'
      ])

      gitRemoteUrl =
        gitRemoteUrl ||
        (await getGitRemoteUrl(null, { remoteName: config.remoteName }))

      suggestAdaptors = suggestAdaptors.map(
        Class => new Class(adaptorConfig, pkg, gitRemoteUrl)
      )

      const enabledSuggest = suggestAdaptors.find(adaptor =>
        adaptor.isEnabled()
      )
      const isEveryDisabled = suggestAdaptors.every(
        adaptor => !adaptor.options.suggestEnabled
      )

      function makeSuggestLocal(options) {
        if (!enabledSuggest) {
          return null
        }

        const suggest = makeSuggest(enabledSuggest, options)
        return (answers, input, rl) => suggest(input, rl)
      }

      if (enabledSuggest) {
        console.log(
          i18n(
            'succ.suggest-enabled',
            [
              enabledSuggest.name,
              enabledSuggest.namespace ? `(${enabledSuggest.namespace})` : ''
            ].join(' ')
          )
        )
      } else if (!isEveryDisabled) {
        console.warn(i18n('warn.suggest-disabled'))
      }
      console.log(i18n('first.hint'))

      const type = enabledSuggest ? 'auto-complete' : 'input'
      cz.registerPrompt('auto-complete', autoComplete)
      const store = new FileStore({
        storePath: nps.join(__dirname, '../inquirer-cache.json'),
        key: utils.getGitRootPath() || (pkg && pkg.name)
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
        return Promise.resolve(
          inquirerStore(
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
                // noResultText: null,
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
                // noResultText: null,
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
        )
      }

      prompt()
        .then(function(answers = {}) {
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
          let issues = answers.issues || ''
          issues = issues ? wrap(issues, wrapOptions) : ''
          const footer = filter([breaking, issues]).join('\n\n')
          let message = head
          if (body) {
            message += '\n\n' + body
          }
          if (footer) {
            message += '\n\n' + footer
          }

          const transform =
            (enabledSuggest && enabledSuggest.transformCommitMessage) ||
            (m => m)

          return Promise.resolve(transform(message)).then(message => {
            typeof commit === 'function' &&
              commit(message, {
                args: process.argv.slice(2)
              })
          })
        })
        .catch(console.error)
    })
  }
}
