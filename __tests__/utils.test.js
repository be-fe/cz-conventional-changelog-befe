/**
 * @file utils
 * @author Cuttle Cong
 * @date 2018/10/11
 * @description
 */
let util = require('../src/utils')
let nps = require('path')
let { __setFetch } = require('icafe-api')

jest.mock('icafe-api')

const data = {
  sequence: 4099,
  title: '候选人中心&#034;offer三方&#034;模块增加三方的联系信息',
  status: 'PM功能验收',
  id: '',
  projectName: '',
  type: {
    localid: '',
    name: '任务'
  },
  createdUser: {
    id: '',
    email: 'zhangtingting05@163.com',
    name: '张婷婷',
    username: 'zhangtingting05'
  },
  createdTime: '2018-09-27 15:16:06',
  responsiblePeople: [
    {
      id: '',
      email: 'v_siqiangguo@163.com',
      name: 'v_siqiangguo',
      username: 'v_siqiangguo'
    },
    {
      id: '',
      email: 'yucong02@163.com',
      name: '余聪',
      username: 'yucong02'
    }
  ],
  lastModifiedUser: {
    id: '',
    email: 'yucong02@163.com',
    name: '余聪',
    username: 'yucong02'
  },
  lastModifiedTime: '2018-09-28 11:30:46',
  properties: [
    {
      localid: '',
      propertyName: '所属计划',
      value: '99471',
      displayValue: '上线后优化/2018.9.28'
    },
    {
      localid: '',
      propertyName: '优先级',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '估算工时',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '故事点',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'RD截止时间',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'FE负责人',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'QA负责人',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'RD负责人',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'FE进度',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'FE截止时间',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'RD进度',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '上线日期',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '所属模块',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '严重级别',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '发现版本',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '修复版本',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'Resolution',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '标签',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'Tag',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '模块',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'Build Version',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'Fix Version',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '迭代',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '是否适合线上监控发现',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '线上监控是否报警',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'PM负责人',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'How Found',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: 'Bug Quality',
      value: '',
      displayValue: ''
    },
    {
      localid: '',
      propertyName: '关注人',
      value: '',
      displayValue: ''
    }
  ]
}

describe('utils', function() {
  it('should utils.simplifyData', () => {
    expect(util.simplifyData(data)).toEqual(
      require('./fixture/placeholder.data')
    )
  })

  it('should utils.parsePlaceholder.js', () => {
    expect(
      util.parsePlaceholder(
        '#{type} {noop} {title?flag&w=20%} {所属计划?}{}',
        data
      )
    ).toMatchInlineSnapshot(`
Array [
  Object {
    "type": "plain",
    "value": "#",
  },
  Object {
    "data": Object {},
    "type": "data",
    "value": "type",
  },
  Object {
    "type": "plain",
    "value": " ",
  },
  Object {
    "data": Object {},
    "type": "data",
    "value": "noop",
  },
  Object {
    "type": "plain",
    "value": " ",
  },
  Object {
    "data": Object {
      "flag": true,
      "w": "20%",
    },
    "type": "data",
    "value": "title",
  },
  Object {
    "type": "plain",
    "value": " ",
  },
  Object {
    "data": Object {},
    "type": "data",
    "value": "所属计划?",
  },
  Object {
    "type": "plain",
    "value": "{}",
  },
]
`)
  })

  describe('suggestIcafeIssues', () => {
    beforeEach(() => {
      __setFetch()
    })

    it('should utils.suggestIcafeIssues', function(done) {
      __setFetch()
      const data = {
        spaceId: 'New-Offer-Onboarding-Project',
        username: 'yucong02',
        password: 'VVV1wdOp7KegcLsI1dkFjzdeg==',
        always: true
      }
      util
        .suggestIcafeIssues(
          '4099候选人模块增加三方的联系信息',
          { cursor: 0 },
          data
        )
        .then(list => {
          expect(list.length).toBe(1)
          expect(list[0]).toMatchObject({
            cursor: 33,
            value: 'New-Offer-Onboarding-Project-4099'
          })

          const fn = jest.fn(() => Promise.reject(new Error('some error')))
          __setFetch(fn)

          util
            .suggestIcafeIssues(
              '4099候选人模块增加三方的联系信息',
              { cursor: 0 },
              Object.assign(data)
            )
            .then(d => {
              // Cached
              expect(fn).not.toBeCalled()
              done()
            })
            .catch(done)
        })
    })

    it('should utils.suggestIcafeIssues when error be thrown', function() {
      const fn = jest.fn(() => Promise.reject(new Error('some error')))
      __setFetch(fn)

      const call = () =>
        util.suggestIcafeIssues(
          '4099候选人模块增加三方的联系信息',
          { cursor: 0 },
          {
            spaceId: 'New-Offer-Onboarding-Project',
            username: 'yucong02',
            password: 'VVV1wdOp7KegcLsI1dkFjzdeg==',
            always: true
          }
        )
      return call().catch(err => {
        expect(err.message).toBe('some error')

        // Cache clear
        call().catch(err => {
          expect(err.message).toBe('some error')
          expect(fn).toBeCalledTimes(2)
        })
      })
    })

    it('should utils.suggestIcafeIssues with `suggestTitle = true`', function() {
      return util
        .suggestIcafeIssues(
          '4099候选人模块增加三方的联系信息',
          { cursor: 0 },
          {
            spaceId: 'New-Offer-Onboarding-Project',
            username: 'yucong02',
            password: 'VVV1wdOp7KegcLsI1dkFjzdeg==',
            always: true,
            suggestTitle: true
          }
        )
        .then(list => {
          expect(list.length).toBe(1)
          expect(list[0]).toMatchObject({
            cursor: 25,
            value: '候选人中心"offer三方"模块增加三方的联系信息'
          })
        })
    })
  })

  describe('isSuggestEnabled', () => {
    function setup(cwd) {
      jest.unmock('icafe-api')
      jest.resetModules()
      process.chdir(nps.join(__dirname, 'fixture', cwd))
      util = require('../src/utils')
    }

    it('should suggest-enable', function() {
      setup('suggest-enable')
      expect(util.isSuggestEnabled()).toBeTruthy()
    })

    it('should suggest-disabled', function() {
      setup('suggest-disable')
      expect(util.isSuggestEnabled()).toBeFalsy()
    })
  })
})
