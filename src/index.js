require('../lib/check-node-version')

const i18n = require('./i18n/index')
const utils = require('./utils')
const engine = require('./engine')

let packageJson = utils.getPackageJsonConfigs()

module.exports = engine({
  pkg: packageJson
})
