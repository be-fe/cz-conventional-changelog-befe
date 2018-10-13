/**
 * @file check-node-version
 * @author Cuttle Cong
 * @date 2018/10/13
 *
 */

const pleaseUpgradeNode = require('please-upgrade-node')
const pkg = require('./package.json')

// Node version isn't supported, skip
pleaseUpgradeNode(pkg, {
  message: function(requiredVersion) {
    return (
      pkg.name +
      ' requires node v' +
      requiredVersion +
      ', but you are using node ' +
      process.version
    )
  }
})
