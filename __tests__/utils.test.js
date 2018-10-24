/**
 * @file utils
 * @author Cuttle Cong
 * @date 2018/10/11
 * @description
 */
let util = require('../src/utils')
let parsePlaceholder = require('../src/parsePlaceholder')
let nps = require('path')
let { __setFetch } = require('icafe-api')

jest.mock('icafe-api')

describe('utils', function() {
  it('should parsePlaceholder', () => {
    expect(parsePlaceholder('#{type} {noop} {title?flag&w=20%} {所属计划?}{}'))
      .toMatchInlineSnapshot(`
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

  it('should utils.issuesFormat', async function() {
    expect(
      await util.issuesFormat(
        'icaf',
        'lalalal #223 #22s isss-22\n\nclosed #888,#22'
      )
    ).toMatchInlineSnapshot(`
"lalalal icaf-223 icaf-22s isss-22

closed icaf-888,icaf-22"
`)
  })
})
