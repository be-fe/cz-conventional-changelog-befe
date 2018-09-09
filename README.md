# @baidu/conventional-changelog-befe

cz-conventional-changelog preset for baidu BEFE.
通过友好交互生成符合 git hub 社区主流规范的 commit message.
是一个基于 commitizen 的 prompter.

## 主流规范说明
```bash
<type>(<scope>): <subject>

<body>

<footer>
```

生成的 commit message 示例
```bash
feat(邮件模块): 富文本输入框添加变量的 mention 功能

mention 功能并未使用第三方库

Cards: hcm-123,hcm-234,hcm-345
```

## 问题顺序
- **type** (*required*)
  Select the type of change that you're committing
- **scope** (**not required**)
  Denote the scope of this change ($location, $browser, $compile, etc.)
- **subject** (*required*)
  Write a short, imperative tense description of the change
- **body** (*not required*)
  Provide a longer description of the change
- **footer** (*not required*)
  - **breaking changes** (*not required*)
    List any breaking changes
  - **issues** (*not required*)
    List any issues closed by this change


## 安装

```bash
npm install commitizen \
  @baidu/cz-conventional-changelog-befe husky \
  -D --registry=http://registry.npm.baidu-int.com
```

同时推荐 `npm install -g commitizen`
全局注入了 `git cz`，用来引导式书写规范的 commit message，十分适合于不熟悉的同学。

## 使用

在 `package.json` 中书写：
*要把注释删掉哦*
```json
{
  "lang": "en", // prompter language
  "icafe": "befe-erp", // icafe prefix
  "config": { 
    "commitizen": { // git-cz config
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

