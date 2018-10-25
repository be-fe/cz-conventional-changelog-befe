require('../lib/check-node-version')

const utils = require('./utils')
const engine = require('./engine')

let packageJson = utils.getPackageJsonConfigs()

module.exports = engine({
  pkg: packageJson
})
