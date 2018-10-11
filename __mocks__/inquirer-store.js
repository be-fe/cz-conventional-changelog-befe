/**
 * @file inquirer
 * @author Cuttle Cong
 * @date 2018/10/10
 *
 */

const inquirer = require.requireActual('inquirer')
const BaseUI = require('inquirer/lib/ui/baseUI')
const promptModule = inquirer.createPromptModule()
const Readline = require('./readline')

const rl = (BaseUI.prototype.rl = inquirer.ui.Prompt.prototype.rl = new Readline())

promptModule.prompt = function prompt(prompts) {
  var ui = new inquirer.ui.Prompt(promptModule.prompts, {})

  var promise = ui.run(prompts)

  // Monkey patch the UI on the promise object so
  // that it remains publicly accessible.
  promise.ui = ui

  return promise
}

module.exports = Object.assign(promptModule, inquirer, { rl })
