/**
 * @file gh-got
 * @author Cuttle Cong
 * @date 2018/10/25
 *
 */

let impl = () =>
  Promise.resolve({
    body: {
      total_count: 23,
      incomplete_results: false,
      items: [
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/23',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/23/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/23/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/23/events',
          html_url: 'https://github.com/imcuttle/edam/issues/23',
          id: 372894902,
          node_id: 'MDU6SXNzdWUzNzI4OTQ5MDI=',
          number: 23,
          title: 'Bug: appveyor ci should be passed',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-10-23T09:19:04Z',
          updated_at: '2018-10-23T09:19:04Z',
          closed_at: null,
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/22',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/22/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/22/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/22/events',
          html_url: 'https://github.com/imcuttle/edam/issues/22',
          id: 368477199,
          node_id: 'MDU6SXNzdWUzNjg0NzcxOTk=',
          number: 22,
          title: 'Perf:  make `storePrompts` be more useful',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2018-10-10T03:12:59Z',
          updated_at: '2018-10-19T10:49:22Z',
          closed_at: '2018-10-19T10:49:22Z',
          author_association: 'OWNER',
          body:
            'https://github.com/SBoudrias/Inquirer.js/#reactive-interface\r\n\r\n```javascript\r\ninquirer.prompt(prompts).ui.process.subscribe(onEachAnswer, onError, onComplete);\r\n```',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/21',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/21/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/21/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/21/events',
          html_url: 'https://github.com/imcuttle/edam/issues/21',
          id: 368068424,
          node_id: 'MDU6SXNzdWUzNjgwNjg0MjQ=',
          number: 21,
          title: 'Refactor: inquirer.createPromptModule() -> prompt function',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-10-09T07:06:04Z',
          updated_at: '2018-10-19T10:13:00Z',
          closed_at: '2018-10-19T10:13:00Z',
          author_association: 'OWNER',
          body:
            'should create isolate env for avoiding be effected by other\r\nhttps://github.com/imcuttle/Inquirer.js#inquirercreatepromptmodule---prompt-function',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/20',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/20/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/20/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/20/events',
          html_url: 'https://github.com/imcuttle/edam/issues/20',
          id: 366554342,
          node_id: 'MDU6SXNzdWUzNjY1NTQzNDI=',
          number: 20,
          title: 'Bug: cli pull npm client is not working',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 2,
          created_at: '2018-10-03T22:28:23Z',
          updated_at: '2018-10-22T11:09:59Z',
          closed_at: '2018-10-22T09:45:32Z',
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/19',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/19/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/19/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/19/events',
          html_url: 'https://github.com/imcuttle/edam/issues/19',
          id: 366553986,
          node_id: 'MDU6SXNzdWUzNjY1NTM5ODY=',
          number: 19,
          title:
            'Feat: show diff view when has been existed, and make diff view pluggable ',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-10-03T22:26:54Z',
          updated_at: '2018-10-03T22:26:54Z',
          closed_at: null,
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/18',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/18/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/18/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/18/events',
          html_url: 'https://github.com/imcuttle/edam/issues/18',
          id: 366553498,
          node_id: 'MDU6SXNzdWUzNjY1NTM0OTg=',
          number: 18,
          title: 'feat: fallback to cache when in offline',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-10-03T22:24:57Z',
          updated_at: '2018-10-22T13:26:09Z',
          closed_at: '2018-10-22T13:26:09Z',
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/17',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/17/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/17/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/17/events',
          html_url: 'https://github.com/imcuttle/edam/issues/17',
          id: 365131807,
          node_id: 'MDU6SXNzdWUzNjUxMzE4MDc=',
          number: 17,
          title: 'Feat: handlebar.js inject some bulit-in helper (e.g. `eq`)',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-09-29T13:17:39Z',
          updated_at: '2018-10-23T09:07:19Z',
          closed_at: '2018-10-23T09:07:19Z',
          author_association: 'OWNER',
          body:
            'https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/16',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/16/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/16/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/16/events',
          html_url: 'https://github.com/imcuttle/edam/issues/16',
          id: 358131214,
          node_id: 'MDU6SXNzdWUzNTgxMzEyMTQ=',
          number: 16,
          title: 'Feat: support `scope` `ignore` globby files',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2018-09-07T16:21:04Z',
          updated_at: '2018-10-23T09:07:20Z',
          closed_at: '2018-10-23T09:07:20Z',
          author_association: 'OWNER',
          body:
            '```\r\nedam --scope=*package.json  --ignore=*/index.js (-w)\r\n```',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/15',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/15/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/15/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/15/events',
          html_url: 'https://github.com/imcuttle/edam/issues/15',
          id: 355447774,
          node_id: 'MDU6SXNzdWUzNTU0NDc3NzQ=',
          number: 15,
          title: 'Perf(edam-cli): better the flow of run sequence like `np`.',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2018-08-30T06:51:32Z',
          updated_at: '2018-08-30T06:52:08Z',
          closed_at: null,
          author_association: 'OWNER',
          body:
            '- [listr](https://github.com/SamVerschueren/listr)\r\n- [terminal-link](https://www.npmjs.com/package/terminal-link)',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/14',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/14/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/14/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/14/events',
          html_url: 'https://github.com/imcuttle/edam/issues/14',
          id: 355446058,
          node_id: 'MDU6SXNzdWUzNTU0NDYwNTg=',
          number: 14,
          title: 'Perf(edam): use execa instead of the simple runner',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-08-30T06:44:35Z',
          updated_at: '2018-08-30T06:45:25Z',
          closed_at: null,
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/13',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/13/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/13/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/13/events',
          html_url: 'https://github.com/imcuttle/edam/issues/13',
          id: 352415516,
          node_id: 'MDU6SXNzdWUzNTI0MTU1MTY=',
          number: 13,
          title:
            'Feat(edam-completer): more information about flags with highlight.',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 2,
          created_at: '2018-08-21T07:22:18Z',
          updated_at: '2018-10-22T08:49:41Z',
          closed_at: '2018-10-22T08:49:41Z',
          author_association: 'OWNER',
          body:
            'Like:\r\n![image](https://user-images.githubusercontent.com/13509258/44386749-f8d03d00-a555-11e8-9128-d277183819c1.png)\r\n',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/12',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/12/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/12/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/12/events',
          html_url: 'https://github.com/imcuttle/edam/issues/12',
          id: 350416817,
          node_id: 'MDU6SXNzdWUzNTA0MTY4MTc=',
          number: 12,
          title: 'Bug: edam-cli format log ',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 4,
          created_at: '2018-08-14T12:58:13Z',
          updated_at: '2018-10-22T09:48:48Z',
          closed_at: '2018-10-22T09:47:05Z',
          author_association: 'OWNER',
          body:
            '![image](https://user-images.githubusercontent.com/13509258/44093011-b90acf06-a004-11e8-8a24-f7bbe7a4f556.png)\r\n',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/11',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/11/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/11/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/11/events',
          html_url: 'https://github.com/imcuttle/edam/issues/11',
          id: 350266815,
          node_id: 'MDU6SXNzdWUzNTAyNjY4MTU=',
          number: 11,
          title:
            'Feat: the field `move` and `copy` of template config should more bash-like',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [
            {
              id: 816932358,
              node_id: 'MDU6TGFiZWw4MTY5MzIzNTg=',
              url:
                'https://api.github.com/repos/imcuttle/edam/labels/enhancement',
              name: 'enhancement',
              color: 'a2eeef',
              default: true
            }
          ],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 2,
          created_at: '2018-08-14T03:19:13Z',
          updated_at: '2018-08-14T12:59:05Z',
          closed_at: '2018-08-14T12:59:05Z',
          author_association: 'OWNER',
          body:
            "```\r\n// 1. support wild matching\r\nmove: {\r\n  '*.{hbs, js}': ''\r\n}\r\n// 2. support array\r\nmove: [\r\n  '*.{hbs, js}',\r\n  'a.js b.js',\r\n  '* a/'\r\n]\r\n```",
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/10',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/10/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/10/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/10/events',
          html_url: 'https://github.com/imcuttle/edam/issues/10',
          id: 349893432,
          node_id: 'MDU6SXNzdWUzNDk4OTM0MzI=',
          number: 10,
          title: 'Bug: updateNotify is not working',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-08-13T05:38:19Z',
          updated_at: '2018-10-23T09:07:25Z',
          closed_at: '2018-10-23T09:07:25Z',
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/9',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/9/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/9/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/9/events',
          html_url: 'https://github.com/imcuttle/edam/issues/9',
          id: 349828914,
          node_id: 'MDU6SXNzdWUzNDk4Mjg5MTQ=',
          number: 9,
          title: 'Doc: more information for help',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-08-12T17:20:17Z',
          updated_at: '2018-08-12T17:20:17Z',
          closed_at: null,
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/8',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/8/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/8/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/8/events',
          html_url: 'https://github.com/imcuttle/edam/issues/8',
          id: 349826913,
          node_id: 'MDU6SXNzdWUzNDk4MjY5MTM=',
          number: 8,
          title: 'Feat: fake input in cli argument',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2018-08-12T16:50:57Z',
          updated_at: '2018-08-13T15:07:43Z',
          closed_at: '2018-08-13T15:07:43Z',
          author_association: 'OWNER',
          body: 'https://plopjs.com/documentation/#bypassing-prompts',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/7',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/7/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/7/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/7/events',
          html_url: 'https://github.com/imcuttle/edam/issues/7',
          id: 349781084,
          node_id: 'MDU6SXNzdWUzNDk3ODEwODQ=',
          number: 7,
          title: 'Feat: add loader like plop (hbs) and to be preset',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [
            {
              id: 816932358,
              node_id: 'MDU6TGFiZWw4MTY5MzIzNTg=',
              url:
                'https://api.github.com/repos/imcuttle/edam/labels/enhancement',
              name: 'enhancement',
              color: 'a2eeef',
              default: true
            }
          ],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2018-08-12T03:25:06Z',
          updated_at: '2018-08-14T03:16:43Z',
          closed_at: '2018-08-14T03:16:43Z',
          author_association: 'OWNER',
          body:
            "https://github.com/amwmedia/plop\r\n\r\n```text\r\n{{ dashAround (properCase name) }}\r\n{{> salutation greeting=\"Hello there\" }}\r\n\r\n{{#if toppings}}\r\non my pizza I like {{ wordJoin toppings }}\r\n{{else}}\r\nI don't like any toppings on my pizza (not human)\r\n{{/if}}\r\n\r\ngenerated by {{ pkg 'name' }}\r\n```",
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/6',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/6/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/6/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/6/events',
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
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [
            {
              id: 816932358,
              node_id: 'MDU6TGFiZWw4MTY5MzIzNTg=',
              url:
                'https://api.github.com/repos/imcuttle/edam/labels/enhancement',
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
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          assignees: [
            {
              login: 'imcuttle',
              id: 13509258,
              node_id: 'MDQ6VXNlcjEzNTA5MjU4',
              avatar_url:
                'https://avatars2.githubusercontent.com/u/13509258?v=4',
              gravatar_id: '',
              url: 'https://api.github.com/users/imcuttle',
              html_url: 'https://github.com/imcuttle',
              followers_url: 'https://api.github.com/users/imcuttle/followers',
              following_url:
                'https://api.github.com/users/imcuttle/following{/other_user}',
              gists_url:
                'https://api.github.com/users/imcuttle/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/imcuttle/subscriptions',
              organizations_url: 'https://api.github.com/users/imcuttle/orgs',
              repos_url: 'https://api.github.com/users/imcuttle/repos',
              events_url:
                'https://api.github.com/users/imcuttle/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/imcuttle/received_events',
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
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/5',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/5/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/5/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/5/events',
          html_url: 'https://github.com/imcuttle/edam/issues/5',
          id: 328065439,
          node_id: 'MDU6SXNzdWUzMjgwNjU0Mzk=',
          number: 5,
          title: 'Move field',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [
            {
              id: 816932356,
              node_id: 'MDU6TGFiZWw4MTY5MzIzNTY=',
              url: 'https://api.github.com/repos/imcuttle/edam/labels/bug',
              name: 'bug',
              color: 'd73a4a',
              default: true
            }
          ],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2018-05-31T09:37:18Z',
          updated_at: '2018-06-18T13:54:00Z',
          closed_at: '2018-06-18T13:54:00Z',
          author_association: 'OWNER',
          body:
            "```\r\nmove: {\r\n  '**': 'a/',\r\n  'x': 'x.js'\r\n}\r\n```\r\nThe above `move` field can't move 'x' to 'x.js'\r\n\r\n```\r\nmove: {\r\n  'x': 'x.js',\r\n  '**': 'a/'\r\n}\r\n```",
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/4',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/4/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/4/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/4/events',
          html_url: 'https://github.com/imcuttle/edam/issues/4',
          id: 327028141,
          node_id: 'MDU6SXNzdWUzMjcwMjgxNDE=',
          number: 4,
          title: 'The doc link in repo description is wrong.',
          user: {
            login: 'Claiyre',
            id: 18069718,
            node_id: 'MDQ6VXNlcjE4MDY5NzE4',
            avatar_url: 'https://avatars1.githubusercontent.com/u/18069718?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/Claiyre',
            html_url: 'https://github.com/Claiyre',
            followers_url: 'https://api.github.com/users/Claiyre/followers',
            following_url:
              'https://api.github.com/users/Claiyre/following{/other_user}',
            gists_url: 'https://api.github.com/users/Claiyre/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/Claiyre/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/Claiyre/subscriptions',
            organizations_url: 'https://api.github.com/users/Claiyre/orgs',
            repos_url: 'https://api.github.com/users/Claiyre/repos',
            events_url: 'https://api.github.com/users/Claiyre/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/Claiyre/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 4,
          created_at: '2018-05-28T13:31:56Z',
          updated_at: '2018-05-28T14:40:34Z',
          closed_at: '2018-05-28T14:40:34Z',
          author_association: 'NONE',
          body: '404',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/3',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/3/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/3/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/3/events',
          html_url: 'https://github.com/imcuttle/edam/issues/3',
          id: 304129353,
          node_id: 'MDU6SXNzdWUzMDQxMjkzNTM=',
          number: 3,
          title: 'Feat: supports declare computed value',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-03-11T04:27:01Z',
          updated_at: '2018-03-28T15:34:58Z',
          closed_at: '2018-03-28T15:34:58Z',
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/2',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/2/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/2/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/2/events',
          html_url: 'https://github.com/imcuttle/edam/issues/2',
          id: 304126981,
          node_id: 'MDU6SXNzdWUzMDQxMjY5ODE=',
          number: 2,
          title: 'Feat: support generate again',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
          state: 'closed',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2018-03-11T03:29:07Z',
          updated_at: '2018-03-28T15:35:09Z',
          closed_at: '2018-03-28T15:35:09Z',
          author_association: 'OWNER',
          body: '',
          score: 1.0
        },
        {
          url: 'https://api.github.com/repos/imcuttle/edam/issues/1',
          repository_url: 'https://api.github.com/repos/imcuttle/edam',
          labels_url:
            'https://api.github.com/repos/imcuttle/edam/issues/1/labels{/name}',
          comments_url:
            'https://api.github.com/repos/imcuttle/edam/issues/1/comments',
          events_url:
            'https://api.github.com/repos/imcuttle/edam/issues/1/events',
          html_url: 'https://github.com/imcuttle/edam/issues/1',
          id: 291781424,
          node_id: 'MDU6SXNzdWUyOTE3ODE0MjQ=',
          number: 1,
          title: 'feature',
          user: {
            login: 'imcuttle',
            id: 13509258,
            node_id: 'MDQ6VXNlcjEzNTA5MjU4',
            avatar_url: 'https://avatars2.githubusercontent.com/u/13509258?v=4',
            gravatar_id: '',
            url: 'https://api.github.com/users/imcuttle',
            html_url: 'https://github.com/imcuttle',
            followers_url: 'https://api.github.com/users/imcuttle/followers',
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          labels: [],
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
            following_url:
              'https://api.github.com/users/imcuttle/following{/other_user}',
            gists_url: 'https://api.github.com/users/imcuttle/gists{/gist_id}',
            starred_url:
              'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
            subscriptions_url:
              'https://api.github.com/users/imcuttle/subscriptions',
            organizations_url: 'https://api.github.com/users/imcuttle/orgs',
            repos_url: 'https://api.github.com/users/imcuttle/repos',
            events_url:
              'https://api.github.com/users/imcuttle/events{/privacy}',
            received_events_url:
              'https://api.github.com/users/imcuttle/received_events',
            type: 'User',
            site_admin: false
          },
          assignees: [
            {
              login: 'imcuttle',
              id: 13509258,
              node_id: 'MDQ6VXNlcjEzNTA5MjU4',
              avatar_url:
                'https://avatars2.githubusercontent.com/u/13509258?v=4',
              gravatar_id: '',
              url: 'https://api.github.com/users/imcuttle',
              html_url: 'https://github.com/imcuttle',
              followers_url: 'https://api.github.com/users/imcuttle/followers',
              following_url:
                'https://api.github.com/users/imcuttle/following{/other_user}',
              gists_url:
                'https://api.github.com/users/imcuttle/gists{/gist_id}',
              starred_url:
                'https://api.github.com/users/imcuttle/starred{/owner}{/repo}',
              subscriptions_url:
                'https://api.github.com/users/imcuttle/subscriptions',
              organizations_url: 'https://api.github.com/users/imcuttle/orgs',
              repos_url: 'https://api.github.com/users/imcuttle/repos',
              events_url:
                'https://api.github.com/users/imcuttle/events{/privacy}',
              received_events_url:
                'https://api.github.com/users/imcuttle/received_events',
              type: 'User',
              site_admin: false
            }
          ],
          milestone: null,
          comments: 0,
          created_at: '2018-01-26T02:27:17Z',
          updated_at: '2018-03-30T06:20:39Z',
          closed_at: '2018-03-30T06:20:39Z',
          author_association: 'OWNER',
          body:
            '- [x] global config\r\n- [x] local config\r\n- [x] multiply templates on same directory\r\n- [x] command\r\n- [x] variables rule (eg.  #{BASENAME:lower}  #{BASENAME:start}  #{BASENAME:start,length} ) (CANCEL)\r\n',
          score: 1.0
        }
      ]
    }
  })
module.exports = jest.fn(() => Promise.resolve(impl()))
module.exports.__setImpl = imp => (impl = imp)
