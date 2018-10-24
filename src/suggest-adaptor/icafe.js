/**
 * @file icafe
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const debug = require('../debug')
const { create } = require('icafe-api')
const { Card } = create()

debug('Card.constructor.defaultData %O', Card.constructor.defaultData)

module.exports = {
  spaceId = Card.constructor.defaultData.spaceId,
  username = Card.constructor.defaultData.username,
  password = Card.constructor.defaultData.password,
  iql = '负责人 in (currentUser)',
  suggestPlaceholder = '#{sequence?link} [{type?align=center}] ({status?align=center}) {title?w=35%}  {responsiblePeople?w=10%}',
}

