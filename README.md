# @baidu/conventional-changelog-befe

cz-conventional-changelog preset for baidu BEFE.

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

```json
{
  "config": {
      "commitizen": {
        "path": "@baidu/cz-conventional-changelog-befe"
      }
    }
}
```

## 样例项目
[icode commit-demo](http://icode.baidu.com/repos/baidu/personal-code/commit-demo)

![](http://pik.internal.baidu.com/2018/08/28/3bc2ed84279fec04149e9bf3adc013c2.png)

