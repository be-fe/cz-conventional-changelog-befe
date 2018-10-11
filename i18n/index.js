const { createIsolateI18n } = require('tiny-i18n')
const langZhCN = require('./zh-CN')
const langEnUS = require('./en-US')

const i = createIsolateI18n()
i.setDictionary(langZhCN, 'zh_cn')
i.setDictionary(langEnUS, 'en_us')

module.exports = i
