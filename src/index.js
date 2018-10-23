require('../lib/check-node-version')

const i18n = require('./i18n/index')
const utils = require('./utils')
const getCommitlintTypes = require('conventional-commit-types-befe')
const { normalizeIcafeByPkg } = require('normalize-icafe-pkg')
const engine = require('./engine')

let packageJson = utils.getPackageJsonConfigs()
i18n.setLanguage(utils.getLanguage(packageJson.lang))
let types = getCommitlintTypes(packageJson.lang)
const icafe = normalizeIcafeByPkg(packageJson)

module.exports = engine({
  pkg: packageJson,
  icafe: icafe,
  language: packageJson.lang,
  typeObjects: types.typeObjects,
  typeKeys: types.typeKeys
})
