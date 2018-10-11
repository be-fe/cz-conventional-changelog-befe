/**
 * @file mycz
 * @author Cuttle Cong
 * @date 2018/10/11
 *
 */

const path = require('path')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap

module.exports = function () {
  return bootstrap({
    cliPath: path.join(__dirname, '../node_modules/commitizen'),
    // this is new
    config: {
      path: require.resolve('../')
    }
  })
}
