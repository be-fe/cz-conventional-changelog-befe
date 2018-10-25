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
const inqStore = require('inquirer-store')
const getCommitlintTypes = require('conventional-commit-types-befe')

const { __setAnswers } = inqStore

function engine(opt = {}) {
  let packageJson = utils.getPackageJsonConfigs(opt.cwd)
  let types = getCommitlintTypes(packageJson.lang)

  return _engine(
    Object.assign(
      {
        language: packageJson.lang,
        typeObjects: types.typeObjects,
        typeKeys: types.typeKeys,
        pkg: packageJson
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

it('should main without issues & breaking & body', function(done) {
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

describe('scopes', () => {
  beforeEach(() => {
    inqStore.mockClear()
  })

  it('should scopes-no-suggestOnly', async function() {
    await engine({
      cwd: nps.join(__dirname, 'fixture/scopes/scopes-no-suggestOnly')
    }).prompter(inquirer.prompt)
    expect(inqStore.mock.calls.length).toEqual(1)
    expect(inqStore.mock.calls[0][1].find(x => x.name === 'scope')).toMatchInlineSnapshot(`
Object {
  "message": "Denote the scope of this change (location, browser, compile, etc.):",
  "name": "scope",
  "noResultText": null,
  "source": [Function],
  "suggestOnly": false,
  "type": "auto-complete",
}
`)
  })

  it('should scopes-suggestOnly', async function() {
    await engine({
      cwd: nps.join(__dirname, 'fixture/scopes/scopes-suggestOnly')
    }).prompter(inquirer.prompt)

    const obj = inqStore.mock.calls[0][1].find(x => x.name === 'scope')
    expect(inqStore.mock.calls.length).toEqual(1)
    expect(obj).toMatchInlineSnapshot(`
Object {
  "message": "Denote the scope of this change (location, browser, compile, etc.):",
  "name": "scope",
  "noResultText": null,
  "source": [Function],
  "suggestOnly": true,
  "type": "auto-complete",
}
`)
    console.log(obj)

    expect(Promise.resolve(obj.source({}, 'abc'))).resolves.toMatchInlineSnapshot(`
Array [
  "abc",
  "abcddd",
]
`)
  })

  it('should scopes-source', async function() {
    inqStore.mockRestore()
    await engine({
      cwd: nps.join(__dirname, 'fixture/scopes/scopes-suggestOnly')
    }).prompter(inquirer.prompt)

    const obj = inqStore.mock.calls[0][1].find(x => x.name === 'scope')
    expect(Promise.resolve(obj.source({}, 'abc'))).resolves.toEqual(['abc', 'abcddd'])
    expect(Promise.resolve(obj.source({}, 'value'))).resolves.toEqual([{ name: 'name', value: 'value' }])
  })

  it('should scopes-noscopes', async function() {
    inqStore.mockRestore()
    await engine({
      cwd: nps.join(__dirname, 'fixture/scopes/noscopes')
    }).prompter(inquirer.prompt)

    expect(inqStore.mock.calls.length).toEqual(1)
    expect(inqStore.mock.calls[0][1].find(x => x.name === 'scope')).toMatchInlineSnapshot(`
Object {
  "message": "Denote the scope of this change (location, browser, compile, etc.):",
  "name": "scope",
  "noResultText": null,
  "type": "input",
}
`)
  })
})
