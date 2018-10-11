/**
 * @file main
 * @author Cuttle Cong
 * @date 2018/10/11
 * @description
 */

const nps = require('path')
const inquirer = require('inquirer')
const _engine = require('../src/engine')
const utils = require('../src/utils')
const { __setAnswers } = require('inquirer-store')

const getCommitlintTypes = require('@baidu/conventional-commit-types-befe')
let packageJson = utils.getPackageJsonConfigs()
let types = getCommitlintTypes(packageJson.lang)

function engine(opt = {}) {
  return _engine(
    Object.assign(
      {
        language: packageJson.lang,
        typeObjects: types.typeObjects,
        typeKeys: types.typeKeys
      },
      opt
    )
  )
}

jest.mock('inquirer-store')

describe('main', function() {
  beforeEach(() => {
    __setAnswers({})
  })

  it('should main', done => {
    __setAnswers({
      type: 'feat',
      scope: 'abc',
      subject: 'subject',
      body: 'body',
      breaking: 'breaking',
      issues: 'issues'
    })

    engine({
      icafe: {
        spaceId: 'abc'
      }
    }).prompter(inquirer, msg => {
      expect(msg).toMatchInlineSnapshot(`
"feat(abc): subject

body

BREAKING CHANGE: breaking

issues"
`)
      done()
    })
  })

  it('should main without body', done => {
    __setAnswers({
      type: 'feat',
      scope: 'abc',
      subject: 'subject',
      // body: '',
      breaking: 'breaking',
      issues: 'issues'
    })

    engine({
      icafe: {
        spaceId: 'abc'
      }
    }).prompter(inquirer, msg => {
      expect(msg).toMatchInlineSnapshot(`
"feat(abc): subject

BREAKING CHANGE: breaking

issues"
`)
      done()
    })
  })

  it('should main without issues', done => {
    __setAnswers({
      type: 'feat',
      scope: 'abc',
      subject: 'subject',
      // body: '',
      breaking: 'breaking',
      issues: ''
    })

    engine({
      icafe: {
        spaceId: 'abc'
      }
    }).prompter(inquirer, msg => {
      expect(msg).toMatchInlineSnapshot(`
"feat(abc): subject

BREAKING CHANGE: breaking"
`)
      done()
    })
  })

  it('should main without issues & breaking & body', done => {
    __setAnswers({
      type: 'feat',
      scope: 'abc',
      subject: 'subject',
      // body: '',
      breaking: '',
      issues: ''
    })

    engine({
      icafe: {
        spaceId: 'abc'
      }
    }).prompter(inquirer, msg => {
      expect(msg).toMatchInlineSnapshot(`"feat(abc): subject"`)
      done()
    })
  })
})
