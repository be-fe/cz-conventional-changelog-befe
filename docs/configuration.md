## 配置

## 目录

<details>

<!-- toc -->

- [文件位置](#%E6%96%87%E4%BB%B6%E4%BD%8D%E7%BD%AE)
- [配置项](#%E9%85%8D%E7%BD%AE%E9%A1%B9)
  - [``](#)

<!-- tocstop -->

</details>

### 文件位置

cz-conventional-changelog-befe 可以来自 `package.json` 或者 `.cz-conventional-changelog-beferc`

从当前工作目录 `pwd` 向上寻找 `package.json`, 在 `package.json` 中配置如下

- `package.json`

  ```diff
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog-befe"
    },
    "cz-conventional-changelog-befe": {

    }
  }
  ```

- `.cz-conventional-changelog-beferc`

  可以书写 `.cz-conventional-changelog-beferc` 配置，如 `package.json` 不存在配置，会向上寻找 `.cz-conventional-changelog-beferc` 文件，
  其为 JSON 文件格式

### 配置规则

我们可以单独对 github、gitlab、gitlab 配置，也可以进行全局配置，如下配置：

```json
{
  "suggestEnabled": true,
  "data": {
    "page": 1
  },

  "github": {
    "suggestEnabled": false,
    "placeholder": "..."
  }
}
```

- 对应 `github` 配置为

  ```javascript
  {
    "suggestEnabled": false,
    "placeholder": "...",
    // ... 其他均为默认值，如 data: {}
  }
  ```

- 因为没有找到，`gitlab` 和 `icafe` 局部配置，因此他们配置为
  ```javascript
  {
    "suggestEnabled": true,
    "data": { "page": 1 },
    // ... 其他均为默认值，如 data: {}
  }
  ```

### 配置项

以下为配置项的说明，需要配置在上述的文件位置中。(注：以下配置带 `*` 表示仅用于全局配置）

##### `*scopes`

自定义 scopes，如果需要自定义项目的可选 scopes，使用该字段

- Type: `Array`
- Default: `null`
- Examples

```javascript
// name：表示显示值；value：表示输出值
;['编辑页面', '保存页面', { name: '无', value: '' }]
```

##### `*scopeSuggestOnly`

对应自定义 scope，是否只是自动补全交互。“是”表示允许用户随意输入 scope，否则只能在 `scopes` 中选择固定 scope

- Type: `boolean`
- Default: `false`

##### `*remoteName`

读取 `git remote get-url $remoteName` 远端地址，用于判断是否为 github / gitlab 远端

- Type: `string`
- Default: `'origin'`

##### `suggestEnabled`

是否开启 issue 提示功能

- Type: `boolean`
- Default: `true`

##### `placeholder`

单行 issue 提示布局模板。

- Type: `string`
- Default: `'{#:number?link} {[:type:]?align=center} {(:state:)?align=center} {title?w=50%} {assignees}'`

模板规则如下：

- 支持的变量

  - [icafe](../__tests__/fixture/icafe.json)
  - [github](../__tests__/fixture/github.json)
  - [gitlab](../__tests__/fixture/gitlab.json)
  - 通用的变量：`assignees(负责人),id,issueId,type(issue 类型),number(issue number),state(issue 状态),title`

- 变量替换 (`'{$variable}'`)  
  `'abc {name}'`: 其中 `name` 变量，`'abc '` 为字符常量
- 变量前后缀 (`'{$prefix:$variable:$suffix}'`)  
  `'{[:type:]}'`: 其中 `'['` 为前缀，`']'` 为后缀
- 变量参数 `('{$prefix:$variable:$suffix?$query}')`  
  `'{[:type:?link&w=10%]}'`: 对应变量名 `type`, 前缀 `'['`, 后缀 `']'`, 参数 `{ link: true, w: '10%' }`

- 模板支持参数

  | 参数    | 说明                                                                                                                     | 类型                      |
  | ------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
  | `link`  | 是否在该字段上显示使用超链接（ Cmd + 左键 跳转至 icafe ）, 当命令行宽度大于 140 时，该功能才开启；小于时候有文本换行 bug | `boolean`                 |
  | `w`     | 该字段的最大宽度大小，超出用 '...' 结尾，如 `30%` 或者 `100`，当为百分比时，按照 cli-width 来换算                        | `number|string`           |
  | `align` | 该字段的水平对齐规则                                                                                                     | `'left'|'right'|'center'` |

##### `token`

用于设置 [github](https://github.com/settings/tokens/new) [gitlab](https://docs.gitlab.com/ee/api/README.html#personal-access-tokens) 的 token

- Type: `string`
- Default: `undefined`

##### `data`

suggest 网络请求参数

点击查看不同 suggest 的 data 配置

[github](./github-usage.md#data) [gitlab](./gitlab-usage.md#data) [icafe](./icafe-usage.md#data)

- Type: `object`
- Default: `{}`
