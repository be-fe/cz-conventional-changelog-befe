/**
 * @file utils
 * @author Cuttle Cong
 * @date 2018/10/11
 * @description
 */
let util = require('../src/utils')
let { parse, stringify, replaceStringify } = require('../src/parsePlaceholder')
let nps = require('path')
let { __setFetch } = require('icafe-api')

jest.mock('icafe-api')

describe('utils', function() {
  it('should parse', () => {
    expect(parse('#{type} {noop} {title?flag&w=20%} {所属计划?}{}'))
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

  it('should parse support suffix, prefix', function() {
    const obj = [
      {
        type: 'plain',
        value: '# '
      },
      {
        data: {},
        prefix: '#',
        type: 'data',
        value: 'type'
      },
      {
        type: 'plain',
        value: ' '
      },
      {
        data: {
          okk: true
        },
        prefix: '[',
        suffix: ']',
        type: 'data',
        value: ':noop:'
      }
    ]
    expect(parse('# {#:type} {[::noop::]?okk}')).toEqual(obj)
    const stringified = '# {#:type} {[::noop::]?okk=true}'
    expect(stringify(obj)).toBe(stringified)
    expect(replaceStringify(obj, { type: 'ok', [':noop:']: 'hh' })).toBe(
      '# #ok [hh]'
    )

    expect(parse(stringified)).toEqual(obj)
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
