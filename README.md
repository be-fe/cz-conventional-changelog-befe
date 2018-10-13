# @baidu/conventional-changelog-befe

## Spec

cz-conventional-changelog-befe 是为 BEFE 团队定制的 cz-conventional-changelog.
可以通过友好交互(问答式)生成符合 git hub 社区主流规范的 commit message.

主要特性:

- 关联多张 icafe 卡片, 自动补全 icafe card 前缀
- 生成 BEFE 团队风格的 commit message
- 友好问答有国际化

## 主流规范 vs BEFE 规范

```bash
# types is BEFE's standard
<type>(<scope>): <subject>

<body>

<footer>
  <breaking changes>
  # issues will be icafe card ID
  <issues>
```

**主要区别两个**

- types: 是 BEFE 团队定制的 types from [@baidu/conventional-commit-types-befe](http://gitlab.baidu.com/be-fe/conventional-commit-types-befe)
- issues: 提示输入 icafe card ID, 会自动补全前缀

**生成的 commit message 示例**

```bash
feat(邮件模块): 富文本输入框添加变量的 mention 功能

mention 功能并未使用第三方库

Cards: hcm-123,hcm-234,hcm-345
```

## 问题顺序

- **type** (_required_)
  Select the type of change that you're committing
- **scope** (**not required**)
  Denote the scope of this change ($location, $browser, $compile, etc.)
- **subject** (_required_)
  Write a short, imperative tense description of the change
- **body** (_not required_)
  Provide a longer description of the change
- **footer** (_not required_)
  - **breaking changes** (_not required_)
    List any breaking changes
  - **issues** (_not required_)
    List any issues closed by this change

## 安装

```bash
npm install commitizen \
  @baidu/cz-conventional-changelog-befe husky \
  -D --registry=http://registry.npm.baidu-int.com
```

同时推荐 `npm install -g commitizen`
全局注入了 `git cz`，用来引导式书写规范的 commit message，十分适合于不熟悉的同学。

`git cz --retry`
`git cz --read`

## 使用

在 `package.json` 中书写：
_要把注释删掉哦_

```json
{
  "lang": "en", // prompter language
  "icafe": "befe-erp", // icafe prefix
  "config": {
    "commitizen": {
      // git-cz config
      "path": "@baidu/cz-conventional-changelog-befe"
    }
  },
  "scripts": {
    "commit": "git-cz"
  }
}
```

## 测试

```bash
npm run commit
```

## 样例项目

[icode commit-demo](http://icode.baidu.com/repos/baidu/personal-code/commit-demo)

![](http://pik.internal.baidu.com/2018/08/28/3bc2ed84279fec04149e9bf3adc013c2.png)
