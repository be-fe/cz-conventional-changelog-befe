/**
 * @file icafe-api
 * @author Cuttle Cong
 * @date 2018/10/11
 *
 */

const stub = {
  constructor: {
    defaultData: {}
  },
  fetch() {
    return Promise.resolve()
  }
}

module.exports = {
  Card: stub
}
