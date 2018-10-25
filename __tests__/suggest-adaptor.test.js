/**
 * @file suggest-adaptor
 * @author Cuttle Cong
 * @date 2018/10/25
 * @description
 */
const Adaptor = require('../src/suggest-adaptor/AdaptorInterface')
const GitLab = require('../src/suggest-adaptor/GitLab')

describe('suggest-adaptor', function() {
  it('should suggest-adaptor default data', () => {
    Adaptor.displayName = 'adp'
    const ad = new Adaptor(
      {
        hah: 'ok'
      },
      {}
    )
    expect(ad.name).toBe('adp')
    expect(ad).toMatchInlineSnapshot(`
AdaptorInterface {
  "config": Object {
    "hah": "ok",
  },
  "data": Object {},
  "gitUrl": "",
  "matchRegexps": Array [
    "^#(?<matching>.+)$",
  ],
  "namespace": "",
  "options": Object {
    "hah": "ok",
    "placeholder": "{#:number?link} {[:type:]?align=center} {(:state:)?align=center} {title?w=50%}  {assignees}",
    "suggestEnabled": true,
  },
  "pkg": Object {},
}
`)
  })

  it('should suggest-adaptor options extendable', () => {
    Adaptor.displayName = 'adp'
    const ad = new Adaptor(
      {
        hah: 'ok'
      },
      {}
    )
    expect(ad.options).toEqual({
      hah: 'ok',
      placeholder:
        '{#:number?link} {[:type:]?align=center} {(:state:)?align=center} {title?w=50%}  {assignees}',
      suggestEnabled: true
    })
    expect(ad.data).toEqual({})

    expect(
      new Adaptor(
        {
          hah: 'ok',
          adp: {
            hahh: 'okk'
          },
          data: {
            l: ''
          }
        },
        {}
      ).options
    ).toEqual({
      hahh: 'okk',
      placeholder:
        '{#:number?link} {[:type:]?align=center} {(:state:)?align=center} {title?w=50%}  {assignees}',
      suggestEnabled: true
    })
    expect(ad.data).toEqual({})

    expect(
      new Adaptor(
        {
          hah: 'ok',
          adp: {
            data: {
              l: 'sss'
            }
          }
        },
        {}
      ).data
    ).toEqual({
      l: 'sss'
    })
  })

  it('should gitUrlObj', function() {
    expect(
      new GitLab({}, {}, 'https://gitlab.com/gitlab-org/release/tasks.git')
        .gitUrlObj
    ).toMatchInlineSnapshot(`
Url {
  "auth": null,
  "branch": "tasks.git",
  "filepath": null,
  "hash": null,
  "host": "gitlab.com",
  "hostname": "gitlab.com",
  "href": "https://gitlab.com/gitlab-org/release/tasks.git",
  "name": "release",
  "owner": "gitlab-org",
  "path": "gitlab-org/release/tasks.git",
  "pathname": "gitlab-org/release/tasks.git",
  "port": null,
  "protocol": "https:",
  "query": null,
  "repo": "gitlab-org/release",
  "repository": "gitlab-org/release",
  "search": null,
  "slashes": true,
}
`)

    expect(
      new GitLab({}, {}, 'git@gitlab.com:gitlab-org/release/tasks.git')
        .gitUrlObj
    ).toMatchInlineSnapshot(`
Url {
  "auth": null,
  "branch": "tasks.git",
  "filepath": null,
  "hash": null,
  "host": "gitlab.com",
  "hostname": null,
  "href": "git@gitlab.com:gitlab-org/release/tasks.git",
  "name": "release",
  "owner": "gitlab-org",
  "path": "gitlab-org/release/tasks.git",
  "pathname": "gitlab-org/release/tasks.git",
  "port": null,
  "protocol": null,
  "query": null,
  "repo": "gitlab-org/release",
  "repository": "gitlab-org/release",
  "search": null,
  "slashes": null,
}
`)
    expect(
      new GitLab(
        {},
        {},
        'ssh://g@gitlab.baidu.com:8022/be-fe/conventional-changelog-befe.git'
      ).gitUrlObj
    ).toMatchInlineSnapshot(`
Url {
  "auth": "g",
  "branch": "master",
  "filepath": null,
  "hash": null,
  "host": "gitlab.baidu.com:8022",
  "hostname": "gitlab.baidu.com",
  "href": "ssh://g@gitlab.baidu.com:8022/be-fe/conventional-changelog-befe.git",
  "name": "conventional-changelog-befe",
  "owner": "be-fe",
  "path": "be-fe/conventional-changelog-befe.git",
  "pathname": "be-fe/conventional-changelog-befe.git",
  "port": "8022",
  "protocol": "ssh:",
  "query": null,
  "repo": "be-fe/conventional-changelog-befe",
  "repository": "be-fe/conventional-changelog-befe",
  "search": null,
  "slashes": true,
}
`)

    expect(
      new GitLab(
        {},
        {},
        'git+https://github.com/be-fe/cz-conventional-changelog-befe.git'
      ).gitUrlObj
    ).toMatchInlineSnapshot(`
Url {
  "auth": null,
  "branch": "master",
  "filepath": null,
  "hash": null,
  "host": "github.com",
  "hostname": "github.com",
  "href": "git+https://github.com/be-fe/cz-conventional-changelog-befe.git",
  "name": "cz-conventional-changelog-befe",
  "owner": "be-fe",
  "path": "be-fe/cz-conventional-changelog-befe.git",
  "pathname": "be-fe/cz-conventional-changelog-befe.git",
  "port": null,
  "protocol": "git+https:",
  "query": null,
  "repo": "be-fe/cz-conventional-changelog-befe",
  "repository": "be-fe/cz-conventional-changelog-befe",
  "search": null,
  "slashes": true,
}
`)
  })

  it('should GitLab-stringify', function() {
    const gl = new GitLab(
      {},
      {},
      'https://github.com/be-fe/cz-conventional-changelog-befe.git'
    )

    expect(gl.baseUrl).toMatchInlineSnapshot(`"https://github.com"`)
    expect(
      decodeURIComponent(
        gl.queryStringify({
          search: ['assss', 'bbb'],
          iids: [44, 55],
          labels: ['你', 'hhh'],
          created_after: new Date(0)
        })
      )
    ).toMatchInlineSnapshot(
      `"search=assss+bbb&iids[]=44&iids[]=55&labels=你,hhh&created_after=1970-01-01T00:00:00.000Z"`
    )
  })
})
