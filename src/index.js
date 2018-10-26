require('./check-node-version')

const updateNotifier = require('update-notifier')
const pkg = require('../package.json')
updateNotifier({ pkg }).notify()

const utils = require('./utils')
const engine = require('./engine')

let packageJson = utils.getPackageJsonConfigs()

module.exports = engine({
  pkg: packageJson
})
