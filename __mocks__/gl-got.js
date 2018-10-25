/**
 * @file gh-got
 * @author Cuttle Cong
 * @date 2018/10/25
 *
 */

let impl = () =>
  Promise.resolve({
    body: [
      {
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
        web_url:
          'http://gitlab.foo.com/be-fe/conventional-changelog-befe/issues/1'
      }
    ]
  })
module.exports = jest.fn(() => Promise.resolve(impl()))
module.exports.__setImpl = imp => (impl = imp)
