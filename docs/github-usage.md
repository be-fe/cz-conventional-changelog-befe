## GitHub 接入

首先根据 git 远端地址或 `package.json` 配置的 `repository` 判断是否为 github

同时使用 [gh-got](https://github.com/sindresorhus/gh-got/) 请求 GitHub 接口

当未设置 [`token`](./configuration.md#token) 时，读取环境变量 `GITHUB_TOKEN`

### Data

##### `per_page`

返回的数据数目

- Type: `number`
- Default: `10`

**更多数据查看[官方文档](https://developer.github.com/v3/search/#search-issues)**
