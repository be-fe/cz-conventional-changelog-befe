/**
 * @file makeSuggest
 * @author Cuttle Cong
 * @date 2018/10/24
 * @description
 */
// process.env.DEBUG = 'cz*'
const makeSuggest = require('../src/makeSuggest')
const Icafe = require('../src/suggest-adaptor/Icafe')
const GitHub = require('../src/suggest-adaptor/GitHub')
const GitLab = require('../src/suggest-adaptor/GitLab')

const { __setFetch, _stub } = require('icafe-api')
const ghgot = require('gh-got')
const glgot = require('gl-got')

jest.mock('icafe-api')
jest.mock('terminal-link')
jest.mock('cli-width')
jest.mock('gh-got')
jest.mock('gl-got')

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
      _stub.fetch.mockClear()
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
            '#4045  [Bug]    (closed)   候选人中心在未找到该手机号码”的后面加上当前登录的百度账号，目前是未找到该手机号码--，正常为暂未找到该手机号码13735342343的有效应聘信息                                                                                                                                                                                                                                                                                                                                                                                余聪,s…',
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
          cursor: 19,
          name:
            '#4045  [Bug]    (closed)   候选人中心在未找到该手机号码”的后面加上当前登录的百度账号，目前是未找到该手机号码--，正常为暂未找到该手机号码13735342343的有效应聘信息                                                                                                                                                                                                                                                                                                                                                                                余聪,s…',
          value: 'mock-namespace-4045  ok '
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

    it('should fattenData', function() {
      expect(
        new Icafe().flattenIncomeData({
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
        })
      ).toEqual(require('./fixture/icafe'))
    })
  })

  describe('github', () => {
    let normalizeConfigData
    let fetch
    let flattenIncomeData
    beforeEach(() => {
      normalizeConfigData = jest.spyOn(GitHub.prototype, 'normalizeConfigData')
      fetch = jest.spyOn(GitHub.prototype, 'fetch')
      flattenIncomeData = jest.spyOn(GitHub.prototype, 'flattenIncomeData')
      __setFetch()
    })

    afterEach(() => {
      normalizeConfigData.mockClear()
      fetch.mockClear()
      flattenIncomeData.mockClear()
      ghgot.mockClear()
    })

    it('should fattenData', function() {
      const gh = new GitHub()
      expect(
        gh.flattenIncomeData({
          url: 'https://api.github.com/repos/imcuttle/edam/issues/6',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url: 'https://api.github.com/repos/imcuttle/edam/issues/6/labels{/name}',
          comments_url: 'https://api.github.com/repos/imcuttle/edam/issues/6/comments',
          events_url: 'https://api.github.com/repos/imcuttle/edam/issues/6/events',
          html_url: 'https://github.com/imcuttle/edam/issues/6',
          id: 347840765,
          node_id: 'MDU6SXNzdWUzNDc4NDA3NjU=',
          number: 6,
          title: 'Feat: supports the description of each source in alias',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url: 'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url: 'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url: 'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [
            {
              id: 816932358,
              node_id: 'MDU6TGFiZWw4MTY5MzIzNTg=',
              url: 'https://api.github.com/repos/imcuttle/edam/labels/enhancement',
              name: 'enhancement',
              color: 'a2eeef',
              default: true
            }
          ],
          state: 'closed',
          locked: false,
          assignee: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url: 'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url: 'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url: 'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url: 'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url: 'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          assignees: [
            {
              login: 'imcuttle',
              id: 13509258,
              node_id: 'MDQ6VXNlcjEzNTA5MjU4',
              avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
              gravatar_id: '',
              url: 'https://api.github.com/users/imcuttle',
              html_url: 'https://github.com/imcuttle',
              followers_url: 'https://api.github.com/users/imcuttle/followers',
              following_url: 'https://api.github.com/users/imcuttle/following{/other_user}',
              gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
              starred_url: 'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
              subscriptions_url: 'https://api.github.com/users/imcuttle/subscriptions',
              organizations_url: 'https://api.github.com/users/imcuttle/orgs',
              repos_url: 'https://api.github.com/users/imcuttle/repos',
              events_url: 'https://api.github.com/users/imcuttle/events{/privacy}',
              received_events_url: 'https://api.github.com/users/imcuttle/received_events',
              type: 'User',
              site_admin: false
            }
          ],
          milestone: null,
          comments: 2,
          created_at: '2018-08-06T09:11:21Z',
          updated_at: '2018-08-14T00:14:07Z',
          closed_at: '2018-08-14T00:14:07Z',
          author_association: 'OWNER',
          body:
            "```js\r\n// .edamrc\r\n{\r\n     alias: {\r\n        abc: {\r\n            type: 'npm',\r\n            url: 'abc',\r\n            description: 'wow!'\r\n        }\r\n     }\r\n}\r\n```\r\n\r\n1. `description` was used in `edam-completer` \r\n2. `description` was used in `edam-cli` when `source` is empty.",
          score: 1.0
        })
      ).toEqual(require('./fixture/github.json'))
    })

    it('should makeSuggest on GitHub', async () => {
      const gh = new GitHub()
      gh.namespace = 'imcuttle/edam'

      const suggest = makeSuggest(gh)
      const list = await suggest('#Feat:handlebar.jsinject', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: 'Feat:handlebar.jsinject',
        namespace: 'imcuttle/edam'
      })
      expect(fetch).toBeCalledTimes(1)

      expect(list).toEqual([
        {
          cursor: 3,
          name: '#17 [issue] (closed) Feat: handlebar.js inject some bulit-in helper (e.g. `eq`)',
          value: '#17'
        }
      ])
    })

    it('should queryStringify', function() {
      expect(
        new GitHub().queryStringify({
          search: ['nihao', 'NOT', 'hello'],
          a: ['aaaa', 'bbb'],
          c: ['oooo']
        })
      ).toMatchInlineSnapshot(`"nihao NOT hello a:aaaa a:bbb c:oooo"`)
    })

    it('should makeSuggest memorized on GitHub', async () => {
      const gl = new GitHub({}, {}, 'https://github.com/imcuttle/edam.git')
      const suggest = makeSuggest(gl, { suggestTitle: true })
      await suggest('test asd www', { cursor: 0 })
      expect(fetch).toBeCalledWith({
        matching: 'test',
        namespace: 'imcuttle/edam'
      })
      expect(fetch).toBeCalledTimes(1)
      expect(ghgot).toBeCalledTimes(1)

      await suggest('test asd www', { cursor: 0 })
      expect(fetch).toBeCalledWith({
        matching: 'test',
        namespace: 'imcuttle/edam'
      })
      expect(fetch).toBeCalledTimes(1)
      expect(ghgot).toBeCalledTimes(1)

      await suggest('testasd www', { cursor: 0 })
      expect(fetch).toBeCalledTimes(2)
      expect(ghgot).toBeCalledTimes(2)

      await suggest('test asd www', { cursor: 0 })
      expect(fetch).toBeCalledTimes(2)
      expect(ghgot).toBeCalledTimes(2)
    })
  })

  describe('GitLab', function() {
    let normalizeConfigData
    let fetch
    let flattenIncomeData
    beforeEach(() => {
      normalizeConfigData = jest.spyOn(GitLab.prototype, 'normalizeConfigData')
      fetch = jest.spyOn(GitLab.prototype, 'fetch')
      flattenIncomeData = jest.spyOn(GitLab.prototype, 'flattenIncomeData')
    })

    afterEach(() => {
      normalizeConfigData.mockClear()
      fetch.mockClear()
      flattenIncomeData.mockClear()
      glgot.mockClear()
    })

    it('should flattenIncomeData on GitLab', async () => {
      const gl = new GitLab({}, {}, 'https://gitlab.com/imcuttle/edam.git')
      expect(
        gl.flattenIncomeData({
          id: 12913,
          iid: 1,
          project_id: 33595,
          title: 'test: 测试 Gitlab issue reference',
          description: 'hhhhahah :+1_tone1:',
          state: 'opened',
          created_at: '2018-08-27T19:41:22.137+08:00',
          updated_at: '2018-08-27T19:41:22.137+08:00',
          labels: [],
          milestone: null,
          assignees: [],
          author: {
            name: 'yucong02',
            username: 'yucong02',
            id: 10352,
            state: 'active',
            avatar_url: null,
            web_url: 'http://gitlab.foo.com/yucong02'
          },
          assignee: null,
          user_notes_count: 0,
          upvotes: 0,
          downvotes: 0,
          due_date: null,
          confidential: false,
          web_url: 'http://gitlab.foo.com/be-fe/conventional-changelog-befe/issues/1'
        })
      ).toEqual(require('./fixture/gitlab'))
    })

    it('should makeSuggest on GitLab', async () => {
      const gl = new GitLab({}, {}, 'https://gitlab.com/imcuttle/edam.git')
      expect(gl.namespace).toBe('imcuttle/edam')

      const suggest = makeSuggest(gl)
      const list = await suggest('#test', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: 'test',
        namespace: 'imcuttle/edam'
      })
      expect(fetch).toBeCalledTimes(1)

      expect(list).toEqual([
        {
          cursor: 2,
          name: '#1 [issue] (opened) test: 测试 Gitlab issue reference',
          value: '#1'
        }
      ])
    })

    it('should makeSuggest other repo on GitLab', async () => {
      const gl = new GitLab({}, {}, 'https://gitlab.com/imcuttle/edam.git')
      const suggest = makeSuggest(gl)
      const list = await suggest('test/asd/www#', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: '',
        namespace: 'test/asd/www'
      })
      expect(fetch).toBeCalledTimes(1)

      expect(list).toEqual([
        {
          cursor: 14,
          name: '#1 [issue] (opened) test: 测试 Gitlab issue reference',
          value: 'test/asd/www#1'
        }
      ])
    })

    it('should makeSuggest other repo issue number even `suggestTitle` on GitLab', async () => {
      const gl = new GitLab({}, {}, 'https://gitlab.com/imcuttle/edam.git')
      const suggest = makeSuggest(gl, { suggestTitle: true })
      const list = await suggest('test/:-asd/www#', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: '',
        namespace: 'test/:-asd/www'
      })
      expect(fetch).toBeCalledTimes(1)

      expect(list).toEqual([
        {
          cursor: 16,
          name: '#1 [issue] (opened) test: 测试 Gitlab issue reference',
          value: 'test/:-asd/www#1'
        }
      ])
    })

    it('should makeSuggest this repo title when `suggestTitle` on GitLab', async () => {
      const gl = new GitLab({}, {}, 'https://gitlab.com/imcuttle/edam.git')
      const suggest = makeSuggest(gl, { suggestTitle: true })
      const list = await suggest('test asd www', {
        cursor: 0
      })

      expect(fetch).toBeCalledWith({
        matching: 'test',
        namespace: 'imcuttle/edam'
      })
      expect(fetch).toBeCalledTimes(1)

      expect(list).toEqual([
        {
          cursor: 25,
          name: '#1 [issue] (opened) test: 测试 Gitlab issue reference',
          value: '测试 Gitlab issue reference asd www'
        }
      ])
    })

    it('should makeSuggest memorized on GitLab', async () => {
      const gl = new GitLab({}, {}, 'https://gitlab.com/imcuttle/edam.git')
      const suggest = makeSuggest(gl, { suggestTitle: true })
      await suggest('test asd www', { cursor: 0 })
      expect(fetch).toBeCalledWith({
        matching: 'test',
        namespace: 'imcuttle/edam'
      })
      expect(fetch).toBeCalledTimes(1)
      expect(glgot).toBeCalledTimes(1)

      await suggest('test asd www', { cursor: 0 })
      expect(fetch).toBeCalledWith({
        matching: 'test',
        namespace: 'imcuttle/edam'
      })
      expect(fetch).toBeCalledTimes(1)
      expect(glgot).toBeCalledTimes(1)

      await suggest('testasd www', { cursor: 0 })
      expect(fetch).toBeCalledTimes(2)
      expect(glgot).toBeCalledTimes(2)

      await suggest('test asd www', { cursor: 0 })
      expect(fetch).toBeCalledTimes(2)
      expect(glgot).toBeCalledTimes(2)
    })
  })
})
