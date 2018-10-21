const wrap = require('word-wrap')
const inquirerStore = require('inquirer-store')
const FileStore = require('inquirer-store/FileStore')
const fuzzy = require('fuzzy')
const autoComplete = require('@moyuyc/inquirer-autocomplete-prompt')
const nps = require('path')
const minimist = require('minimist')
const omit = require('lodash.omit')

const name = require('../package').name

const utils = require('./utils')
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
module.exports = function(options) {
  const { config } = options.pkg || {}
  const typeChoices = utils.rightPadTypes(
    options.typeObjects,
    options.typeKeys,
    options.language
  )
  const gitRootPath = utils.getGitRootPath()
  const rcConfig = config ? config[name] : {}
  const mergedConfig = Object.assign(
    { scopeSuggestOnly: false },
    options.icafe,
    rcConfig
  )
  const prefix = config ? config.spaceId : null

  const icafe = omit(mergedConfig, ['scopes', 'scopeSuggestOnly'])

  function makeSuggest({ always = false, suggestTitle } = {}) {
    return function suggestIcafeIssues(anw, input, rl) {
      return utils.suggestIcafeIssues(
        input,
        rl,
        Object.assign({}, icafe || {}, { always, suggestTitle })
      )
    }
  }

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function(cz, commit) {
      const isSuggestEnabled = utils.isSuggestEnabled()
      if (!isSuggestEnabled) {
        console.warn(i18n('warn.suggest-disabled'))
      }

      console.log(i18n('first.hint'))

      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.

      const type = isSuggestEnabled ? 'auto-complete' : 'input'
      cz.registerPrompt('auto-complete', autoComplete)
      const store = new FileStore({
        storePath: nps.join(__dirname, '../inquirer-cache.json'),
        key: gitRootPath
      })

      let scopeProps = { type: 'input' }
      if (Array.isArray(mergedConfig.scopes) && mergedConfig.scopes.length) {
        scopeProps.type = 'auto-complete'
        scopeProps.suggestOnly = mergedConfig.scopeSuggestOnly
        scopeProps.source = (answers, input) => {
          return fuzzy
            .filter(input || '', mergedConfig.scopes, {
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
              // searchText: null,
              // noResultText: null,
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
              source: makeSuggest({ suggestTitle: true }),
              validate: input => {
                if (!input) {
                  return i18n('subject.error')
                }
                return true
              },
              message: i18n('subject.hint')
            },
            {
              // bug: 在 cli 包含重复行，如果 type 为 auto-complete
              // type: 'auto-complete',
              // noResultText: null,
              // suggestOnly: true,
              // source: makeSuggest(),
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
              source: makeSuggest({ always: true }),
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
