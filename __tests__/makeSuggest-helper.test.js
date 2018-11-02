/**
 * @file makeSuggest-helper
 * @author Cuttle Cong
 * @date 2018/11/2
 * @description
 */
const { makeStoreAdaptorFetch, defaultConf, namify } = require('../src/makeSuggest')
const makeSuggest = require('../src/makeSuggest')
const GitHub = require('../src/suggest-adaptor/GitHub')
const memoize = require('../src/memoize')

const Config = require('configstore')
const { tmpdir } = require('os')
const got = require('gh-got')
const nps = require('path')
const fs = require('fs')

const configPath = nps.join(tmpdir(), 'config.json')
const conf = new Config(null, {}, { configPath })

jest.mock('gh-got')

describe('makeSuggest-helper', function() {
  it('should namify', () => {
    expect(namify('abc')).toBe('abc')
    expect(namify('a.bc')).toBe('a\\.bc')
    expect(namify('a.b.c')).toBe('a\\.b\\.c')
  })

  const set = jest.spyOn(Config.prototype, 'set')
  const get = jest.spyOn(Config.prototype, 'get')

  const gh = new GitHub({}, {}, 'https://github.com/be-fe/cz-conventional-changelog-befe.git')

  const fetch = jest.spyOn(gh, 'fetch')

  beforeEach(() => {
    conf.clear()
    set.mockClear()
    get.mockClear()
    fetch.mockClear()
  })
  it('should makeStoreAdaptorFetch first time', async function() {
    const fetch = makeStoreAdaptorFetch(gh, conf)
    expect((await fetch({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)

    expect(set).toBeCalledTimes(1)
    expect(set).toBeCalledWith(
      'github.be-fe/cz-conventional-changelog-befe',
      expect.objectContaining({
        req: { per_page: 10 },
        res: expect.any(Array)
      })
    )
    expect(get).toBeCalledTimes(1)
    expect(get).toBeCalledWith('github.be-fe/cz-conventional-changelog-befe')
    expect(get.mock.results[0].value).toBeUndefined()
  })

  it('should call store once', async function() {
    const fetch = makeStoreAdaptorFetch(gh, conf)
    expect((await fetch({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(set).toBeCalledTimes(1)
    expect(get).toBeCalledTimes(1)

    expect((await fetch({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(get).toBeCalledTimes(1)
    expect(set).toBeCalledTimes(1)
  })

  it('should call store twice when make again', async function(done) {
    const fetch = makeStoreAdaptorFetch(gh, conf)
    const fetchB = makeStoreAdaptorFetch(gh, conf)
    expect((await fetch({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(set).toBeCalledTimes(1)
    expect(get).toBeCalledTimes(1)

    expect((await fetchB({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(get).toBeCalledTimes(2)
    // Cache Works
    expect(set).toBeCalledTimes(1)

    process.nextTick(() => {
      expect(set).toBeCalledTimes(2)
      done()
    })
  })

  it('should call store out of date', async function() {
    const fetch = makeStoreAdaptorFetch(gh, conf)
    const fetchB = makeStoreAdaptorFetch(gh, conf)
    expect((await fetch({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(set).toBeCalledTimes(1)
    expect(get).toBeCalledTimes(1)

    // Out of Date
    const ONE_DAY = 1000 * 60 * 60 * 24 * 3
    const obj = JSON.parse(fs.readFileSync(configPath).toString())
    obj['github']['be-fe/cz-conventional-changelog-befe'] = {
      ...obj['github']['be-fe/cz-conventional-changelog-befe'],
      timestamp: Date.now() - ONE_DAY
    }
    fs.writeFileSync(configPath, JSON.stringify(obj))

    expect((await fetchB({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(get).toBeCalledTimes(2)
    // Cache do not works
    expect(set).toBeCalledTimes(2)
  })

  it('should store not works when req is not equals', async function() {
    const fetch = makeStoreAdaptorFetch(gh, conf)
    const fetchB = makeStoreAdaptorFetch(gh, conf)
    expect((await fetch({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(set).toBeCalledTimes(1)
    expect(get).toBeCalledTimes(1)

    const obj = JSON.parse(fs.readFileSync(configPath).toString())
    obj['github']['be-fe/cz-conventional-changelog-befe'] = {
      ...obj['github']['be-fe/cz-conventional-changelog-befe'],
      req: {
        ...obj['github']['be-fe/cz-conventional-changelog-befe'].req,
        tmp: Math.random()
      }
    }
    fs.writeFileSync(configPath, JSON.stringify(obj))

    expect((await fetchB({ namespace: gh.namespace, matching: '' })).length).toMatchInlineSnapshot(`23`)
    expect(get).toBeCalledTimes(2)
    // Cache do not works
    expect(set).toBeCalledTimes(2)
  })

  it('should fetch updated when res is updated', async function(done) {
    const gh = new GitHub({}, {}, 'https://github.com/be-fe/cz-conventional-changelog-befe.git')
    fs.writeFileSync(
      configPath,
      JSON.stringify({
        github: {
          'be-fe/cz-conventional-changelog-befe': {
            req: {
              per_page: 10
            },
            res: (await got()).body.items,
            timestamp: Date.now()
          }
        }
      })
    )
    expect((await got()).body.items.length).toMatchInlineSnapshot(`23`)
    got.__setImpl(() =>
      Promise.resolve({
        body: {
          total_count: 1,
          incomplete_results: false,
          items: [{}]
        }
      })
    )
    const suggest = makeSuggest(gh, { suggestTitle: false, always: true, conf })

    expect((await suggest('', { cursor: 0 })).length).toMatchInlineSnapshot(`23`)
    expect(set).toBeCalledTimes(0)
    expect(get).toBeCalledTimes(1)
    process.nextTick(async () => {
      expect(set).toBeCalledTimes(1)
      expect((await suggest('', { cursor: 0 })).length).toMatchInlineSnapshot(`1`)

      got.__setImpl(() =>
        Promise.resolve({
          body: {
            total_count: 0,
            incomplete_results: false,
            items: []
          }
        })
      )
      expect((await suggest('', { cursor: 0 })).length).toMatchInlineSnapshot(`1`)
      done()
    })
  })
})
