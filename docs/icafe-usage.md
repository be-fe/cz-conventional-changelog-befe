## Icafe 接入

- `package.json`

```javascript
{
  "lang": "en", // 默认为为系统语言
  "icafe": {
    "spaceId": "" // 非必填，icafe 的空间标识，不填则关闭 icafe suggest 和补全功能。如 "befe-erp"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog-befe"
    },
    "cz-conventional-changelog-befe": {
      // 配置在这写
    }
  },
  "scripts": {
    "commit": "git-cz"
  }
}
```

使用 [icafe-api](https://www.npmjs.com/package/icafe-api#%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AE%E7%94%A8%E6%88%B7%E5%90%8D%E3%80%81%E5%AF%86%E7%A0%81%E7%AD%89%E9%BB%98%E8%AE%A4%E5%8F%82%E6%95%B0) 调用接口，

其中 icafe 用户名和密码, 在 http://icafe.baidu.com/users/virtual 中查看.

**注意: 上述网站中的密码不能直接使用,需要经过 `decodeURIComponent('password')` 后, 才能赋值使用**

推荐把 icafe 用户名配置在环境变量 `ICAFE_USERNAME`，或使用 git 本地用户名

`username` 则在项目目录下设置 `git config user.name "Your Name Here"`，一般 icode 推荐的 clone repo 方式会自动注入用户名至 git 配置

之后通过 `git config --local user.name` 查看是否已经配置用户名在当前 git 目录

建议将 `password` 以系统环境变量形式存储 `export ICAFE_PASSWORD=foo;` 在 `.bash_profile` 或 `.zshrc` 中。

### Data

##### `iql`

关于 `iql` 说明请看 [API: 获取满足条件的卡片:根据一定的过滤条件查询满足条件的相关所有卡片以及卡片的详细信息](http://wiki.baidu.com/pages/viewpage.action?pageId=457513331)

> `iql`: 查询条件，需求池高级查询语句，用于对卡片进行按条件筛选。

> 如流程状态 = closed AND 优先级 > 3。

> 如果不会使用，可以去对应 icafe 的空间的需求池里面，点击“高级查询”按钮，

> 会有一个自动 suggest 提示你书写 iql 的文本框，写完后点击查询可以检验自己写的是否正确

- Type: `string`
- Default: `'负责人 in (currentUser)'`

##### `isDesc`

是否降序

- Type: `boolean`
- Default: `false`

##### `order`

按照什么排序，详细情况 icafe 支持字段

- Type: `string`
- Default: `'createTime'`

**[官方文档](http://hetu.baidu.com/api/platform/api/show?apiId=542)**
