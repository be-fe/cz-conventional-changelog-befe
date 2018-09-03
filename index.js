var i18n = require('./i18n')
var utils = require('./src/utils')
var getCommitlintTypes = require('@baidu/conventional-commit-types-befe')
var engine = require('./src/engine')

let packageJson = utils.getPackageJsonConfigs()

i18n.setLanguage(utils.getLanguage(packageJson.lang))

let types = getCommitlintTypes(packageJson.lang)

module.exports = engine({
  prefix: packageJson.newicafe || packageJson.icafe || '',
  language: packageJson.lang,
  typeObjects: types.typeObjects,
  typeKeys: types.typeKeys
})
