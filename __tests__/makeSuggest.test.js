/**
 * @file makeSuggest
 * @author Cuttle Cong
 * @date 2018/10/24
 * @description
 */
process.env.DEBUG = 'cz*'
const makeSuggest = require('../src/makeSuggest')
const Icafe = require('../src/suggest-adaptor/Icafe')
const GitHub = require('../src/suggest-adaptor/GitHub')

const { __setFetch, _stub } = require('icafe-api')

jest.mock('icafe-api')
jest.mock('cli-width')

describe('makeSuggest', function() {
  describe('icafe', () => {
    let normalizeConfigData
    let fetch
    let flattenIncomeData
    beforeEach(() => {
      normalizeConfigData = jest.spyOn(Icafe.prototype, 'normalizeConfigData')
      fetch = jest.spyOn(Icafe.prototype, 'fetch')
      flattenIncomeData = jest.spyOn(Icafe.prototype, 'flattenIncomeData')
      __setFetch()
    })

    afterEach(() => {
      normalizeConfigData.mockClear()
      fetch.mockClear()
      flattenIncomeData.mockClear()
    })

    it('should makeSuggest on icafe failed', async () => {
      const icafe = new Icafe()
      const list = await makeSuggest(icafe)('#123', { cursor: 0 })

      expect(icafe.isEnabled()).toBeFalsy()
      expect(list).toEqual([])
      expect(fetch).not.toBeCalled()
      expect(flattenIncomeData).not.toBeCalled()
      expect(normalizeConfigData).toBeCalled()
      expect(_stub.fetch).toBeCalledTimes(0)
    })

    it('should makeSuggest `suggestTitle`', async () => {
      const icafe = new Icafe()
      icafe.namespace = 'mock-namespace'

      const suggest = makeSuggest(icafe, { suggestTitle: true })
      const list = await suggest('候选人中心在未找到该手机号码  ok ', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: '候选人中心在未找到该手机号码',
        namespace: 'mock-namespace'
      })

      expect(list).toEqual([
        {
          cursor: 74,
          name:
            '#4045 [ Bug ] (  closed  ) 候选人中心在未找到该手机号码”的后面加上当前登录的百度账号，目前是未找到该手机号码--，正常为暂未找到该手机号码13735342343的有效应聘信息                                                                                                                                                                                                                          余聪,siii                                                                                           ',
          value:
            '候选人中心在未找到该手机号码”的后面加上当前登录的百度账号，目前是未找到该手机号码--，正常为暂未找到该手机号码13735342343的有效应聘信息  ok '
        }
      ])
    })

    it('should makeSuggest on icafe', async () => {
      const icafe = new Icafe()
      icafe.namespace = 'mock-namespace'

      const suggest = makeSuggest(icafe)
      const list = await suggest('#候选人中心在未找到该手机号码  ok ', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: '候选人中心在未找到该手机号码',
        namespace: 'mock-namespace'
      })
      expect(fetch).toBeCalledTimes(1)
      const data = await fetch.mock.results[0].value

      expect(list).toEqual([
        {
          cursor: 1,
          name:
            '#4045 [ Bug ] (  closed  ) 候选人中心在未找到该手机号码”的后面加上当前登录的百度账号，目前是未找到该手机号码--，正常为暂未找到该手机号码13735342343的有效应聘信息                                                                                                                                                                                                                          余聪,siii                                                                                           ',
          value: '#  ok '
        }
      ])

      expect(flattenIncomeData).toBeCalledTimes(data.length)
      expect(normalizeConfigData).toBeCalled()

      await suggest('#选人中心在未找到该手机号码  ok ', {
        cursor: 1
      })
      expect(fetch).toBeCalledWith({
        matching: '选人中心在未找到该手机号码',
        namespace: 'mock-namespace'
      })
      // memoize
      expect(fetch).toBeCalledTimes(2)
      expect(_stub.fetch).toBeCalledTimes(1)

      icafe.namespace = 'mock-namespace-update'
      await suggest('#选人中心在未找到该手机号码  ok ', {
        cursor: 1
      })
      expect(fetch).toBeCalledTimes(3)
      expect(_stub.fetch).toBeCalledWith({
        iql: '负责人 in (currentUser)',
        isDesc: false,
        order: 'createTime',
        page: 1,
        password: undefined,
        spaceId: 'mock-namespace-update',
        username: undefined
      })
      expect(_stub.fetch).toBeCalledTimes(2)
    })
  })

  describe('github', () => {
    let normalizeConfigData
    let fetch
    let flattenIncomeData
    beforeEach(() => {
      normalizeConfigData = jest.spyOn(Icafe.prototype, 'normalizeConfigData')
      fetch = jest.spyOn(Icafe.prototype, 'fetch')
      flattenIncomeData = jest.spyOn(Icafe.prototype, 'flattenIncomeData')
      __setFetch()
    })

    afterEach(() => {
      normalizeConfigData.mockClear()
      fetch.mockClear()
      flattenIncomeData.mockClear()
    })

    it('should makeSuggest on GitHub', async () => {
      const gh = new GitHub()
      gh.namespace = 'imcuttle/edam'

      const suggest = makeSuggest(gh)
      const list = await suggest('#候选人中心在未找到该手机号码  ok ', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: '候选人中心在未找到该手机号码',
        namespace: 'mock-namespace'
      })
      expect(fetch).toBeCalledTimes(1)
      const data = await fetch.mock.results[0].value

      expect(list).toEqual([
        {
          cursor: 1,
          name:
            '#4045 [ Bug ] (  closed  ) 候选人中心在未找到该手机号码”的后面加上当前登录的百度账号，目前是未找到该手机号码--，正常为暂未找到该手机号码13735342343的有效应聘信息                                                                                                                                                                                                                          余聪,siii                                                                                           ',
          value: '#  ok '
        }
      ])
    })
  })
})
