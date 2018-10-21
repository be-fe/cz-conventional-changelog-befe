/**
 * @file inquirer-store
 * @author Cuttle Cong
 * @date 2018/10/10
 *
 */
const store = require.requireActual('inquirer-store')

let answers = {}

module.exports = Object.assign(jest.fn(() => Promise.resolve(answers)), store, {
  __setAnswers(data = {}) {
    answers = data
  }
})
