/**
 * @file get-common-vars
 * @author Cuttle Cong
 * @date 2018/10/25
 *
 */

const gitlab = require('../__tests__/fixture/gitlab')
const github = require('../__tests__/fixture/github')
const icafe = require('../__tests__/fixture/icafe')

function has(target, key) {
  return Object.hasOwnProperty.call(target, key)
}

const commons = []
Object.keys(github).forEach(name => {
  if (has(gitlab, name) && has(icafe, name)) {
    commons.push(name)
  }
})

console.log(commons.join(','))
