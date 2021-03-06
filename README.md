# cz-conventional-changelog-befe

[![Build status](https://img.shields.io/travis/be-fe/cz-conventional-changelog-befe/master.svg?style=flat-square)](https://travis-ci.org/be-fe/cz-conventional-changelog-befe)
[![Test coverage](https://img.shields.io/codecov/c/github/be-fe/cz-conventional-changelog-befe.svg?style=flat-square)](https://codecov.io/github/be-fe/cz-conventional-changelog-befe?branch=master)
[![NPM version](https://img.shields.io/npm/v/cz-conventional-changelog-befe.svg?style=flat-square)](https://www.npmjs.com/package/cz-conventional-changelog-befe)
[![NPM Downloads](https://img.shields.io/npm/dm/cz-conventional-changelog-befe.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/cz-conventional-changelog-befe)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> cz adaptor for baidu BEFE

cz-conventional-changelog-befe 是为 BEFE 团队定制的 [commitizen 适配器](https://github.com/commitizen/cz-cli#adapters).

可以通过友好交互(问答式)提交符合[规范的 commit message](https://www.conventionalcommits.org/).

<!-- toc -->

## 特性

- 生成 BEFE 团队风格的 commit message
- 友好问答
- 支持 icafe / gitlab / github suggest 补全卡片
- 记录上次的交互输入值
- 国际化支持（默认使用当前系统语言：中文或英文）

## 主流规范 vs BEFE 规范

```bash
# types is BEFE's standard
<type>(<scope>): <subject>

<body>

<footer>
```

### 主要区别

- types: 是 BEFE 团队定制的 types from [conventional-commit-types-befe](http://gitlab.baidu.com/be-fe/conventional-commit-types-befe)
- issues: 提示输入 icafe card ID, 会自动补全前缀
- 简要描述和关联卡片输入框 支持 icafe suggest  
  (如输入 '#{关键字(可以是 id 或者 title 等等)}' 或者 带有明确 icafe spaceId，如 'icafe-api-{关键字}')
- 支持输入值交互的保存（详见[inquirer-store](https://github.com/imcuttle/inquirer-store)）  
  使用 `git cz --read` 来使得上一次保存值生效

![](./snapshot.gif)

**生成的 commit message 示例**

```text
feat(邮件模块): 富文本输入框添加变量的 mention 功能

mention 功能并未使用第三方库

fix hcm-123,hcm-234,hcm-345
```

## 使用

#### 全局使用

```bash
npm install -g commitizen
npm install -g cz-conventional-changelog-befe
echo '{ "path": "cz-conventional-changelog-befe" }' > ~/.czrc
```

#### 当前项目使用

```bash
npm install -g commitizen
npm install cz-conventional-changelog-befe
```

在项目根 `package.json` 中配置

```text
...
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog-befe"
    }
  }
```

在项目中执行 `git cz`

- `git cz --retry`：跳过问答式交互，直接以上一次的提交 message 进行提交
- `git cz --read`: 使用 `git cz --read` 来使得上一次交互输入值成为默认值

## 文档

- [配置说明](./docs/configuration.md)
- [github 接入](./docs/github-usage.md)
- [gitlab 接入](./docs/gitlab-usage.md)
- [icafe 接入](./docs/icafe-usage.md)

在具有卡片提示功能的**简要描述字段**中，卡片提示补全功能有两种用法:

1. 补全卡片号：输入 # 开头，tab 键补全卡片号
2. 补全卡片标题（只在简要描述字段中）：输入任意非 # 开头文本，tab 键补全卡片标题

其他的卡片提示字段则只能补全卡片号

## Debugger

```bash
# 只调试 cz
DEBUG=cz-conventional-changelog-befe git cz

# icafe-api 调试也开启
DEBUG=cz-conventional-changelog-befe,icafe-api* git cz
```

## Examples

```bash
git clone https://github.com/be-fe/cz-conventional-changelog-befe.git
cd cz-conventional-changelog-befe

npm i
npm run example
npm run example [type] # type 对应 examples 下的例子，如 github
```

## 样例项目

[icode commit-demo](http://icode.baidu.com/repos/baidu/personal-code/commit-demo)
