/**
 * @file utils
 * @author Cuttle Cong
 * @date 2018/10/11
 * @description
 */
const util = require('../src/utils')

jest.mock('@baidu/icafe-api')

const data = {
  sequence: 4099,
  title: '候选人中心&#034;offer三方&#034;模块增加三方的联系信息',
  status: 'PM功能验收',
  id: '66262323',
  projectName: '',
  type: {
    localId: 5010,
    name: '任务'
  },
  createdUser: {
    id: 121560,
    email: 'zhangtingting05@baidu.com',
    name: '张婷婷',
    username: 'zhangtingting05'
  },
  createdTime: '2018-09-27 15:16:06',
  responsiblePeople: [
    {
      id: 314343,
      email: 'v_siqiangguo@baidu.com',
      name: 'v_siqiangguo',
      username: 'v_siqiangguo'
    },
    {
      id: 291728,
      email: 'yucong02@baidu.com',
      name: '余聪',
      username: 'yucong02'
    }
  ],
  lastModifiedUser: {
    id: 291728,
    email: 'yucong02@baidu.com',
    name: '余聪',
    username: 'yucong02'
  },
  lastModifiedTime: '2018-09-28 11:30:46',
  properties: [
    {
      localId: 45788,
      propertyName: '所属计划',
      value: '99471',
      displayValue: '上线后优化/2018.9.28'
    },
    {
      localId: 22797,
      propertyName: '优先级',
      value: '',
      displayValue: ''
    },
    {
      localId: 20008,
      propertyName: '估算工时',
      value: '',
      displayValue: ''
    },
    {
      localId: 22088,
      propertyName: '故事点',
      value: '',
      displayValue: ''
    },
    {
      localId: 22439,
      propertyName: 'RD截止时间',
      value: '',
      displayValue: ''
    },
    {
      localId: 86892,
      propertyName: 'FE负责人',
      value: '',
      displayValue: ''
    },
    {
      localId: 23879,
      propertyName: 'QA负责人',
      value: '',
      displayValue: ''
    },
    {
      localId: 23880,
      propertyName: 'RD负责人',
      value: '',
      displayValue: ''
    },
    {
      localId: 86893,
      propertyName: 'FE进度',
      value: '',
      displayValue: ''
    },
    {
      localId: 86895,
      propertyName: 'FE截止时间',
      value: '',
      displayValue: ''
    },
    {
      localId: 86896,
      propertyName: 'RD进度',
      value: '',
      displayValue: ''
    },
    {
      localId: 100156,
      propertyName: '上线日期',
      value: '',
      displayValue: ''
    },
    {
      localId: 93970,
      propertyName: '所属模块',
      value: '',
      displayValue: ''
    },
    {
      localId: 22796,
      propertyName: '严重级别',
      value: '',
      displayValue: ''
    },
    {
      localId: 86417,
      propertyName: '发现版本',
      value: '',
      displayValue: ''
    },
    {
      localId: 86418,
      propertyName: '修复版本',
      value: '',
      displayValue: ''
    },
    {
      localId: 22990,
      propertyName: 'Resolution',
      value: '',
      displayValue: ''
    },
    {
      localId: 86419,
      propertyName: '标签',
      value: '',
      displayValue: ''
    },
    {
      localId: 21666,
      propertyName: 'Tag',
      value: '',
      displayValue: ''
    },
    {
      localId: 21996,
      propertyName: '模块',
      value: '',
      displayValue: ''
    },
    {
      localId: 21998,
      propertyName: 'Build Version',
      value: '',
      displayValue: ''
    },
    {
      localId: 21997,
      propertyName: 'Fix Version',
      value: '',
      displayValue: ''
    },
    {
      localId: 32564,
      propertyName: '迭代',
      value: '',
      displayValue: ''
    },
    {
      localId: 32058,
      propertyName: '是否适合线上监控发现',
      value: '',
      displayValue: ''
    },
    {
      localId: 32057,
      propertyName: '线上监控是否报警',
      value: '',
      displayValue: ''
    },
    {
      localId: 23881,
      propertyName: 'PM负责人',
      value: '',
      displayValue: ''
    },
    {
      localId: 22800,
      propertyName: 'How Found',
      value: '',
      displayValue: ''
    },
    {
      localId: 22798,
      propertyName: 'Bug Quality',
      value: '',
      displayValue: ''
    },
    {
      localId: 22564,
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
      util.parsePlaceholder('#{type} {noop} {title?flag} {所属计划?}{}', data)
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

  it('should utils.suggestIcafeIssues', function() {
    return util
      .suggestIcafeIssues(
        '4099候选人模块增加三方的联系信息',
        { cursor: 0 },
        {
          spaceId: 'New-Offer-Onboarding-Project',
          username: 'yucong02',
          password: 'VVV1wdOp7KegcLsI1dkFjzdeg==',
          always: true
        }
      )
      .then(list => {
        expect(list.length).toBe(1)
        expect(list[0]).toMatchObject({
          cursor: 33,
          value: 'New-Offer-Onboarding-Project-4099'
        })
      })
  })
})
