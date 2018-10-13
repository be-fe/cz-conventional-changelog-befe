/**
 * @file mycz
 * @author Cuttle Cong
 * @date 2018/10/11
 *
 */

const inquirer = require('inquirer')
const prompter = require('.').prompter

return prompter(inquirer, function(msg, options) {
  console.log(msg)
  console.log('----------------------------------')
  console.log(options)
})
