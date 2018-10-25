## GitLab 接入

首先根据 git 远端地址或 `package.json` 配置的 `repository` 判断是否为 gitlab

同时使用 [gl-got](https://github.com/singapore/gl-got) 请求 GitLab 接口

当未设置 [`token`](./configuration.md#token) 时，读取环境变量 `GITLAB_TOKEN`

### Data

##### `per_page`

返回的数据数目

- Type: `number`
- Default: `10`

**更多请求参数查看[官方文档](https://docs.gitlab.com/ee/api/issues.html#list-issues)**
