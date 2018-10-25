/**
 * @file mycz
 * @author Cuttle Cong
 * @date 2018/10/11
 *
 */
const nps = require('path')
const fs = require('fs')
const inquirer = require('inquirer')

const exampleRoot = nps.join(__dirname, 'examples')
const choices = fs
  .readdirSync(exampleRoot)
  .filter(name => fs.statSync(nps.join(exampleRoot, name)).isDirectory())
const which = process.argv[2]

let p = () => Promise.resolve(which)

if (!choices.includes(which)) {
  p = () =>
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'which',
          message: 'please select an example',
          choices
        }
      ])
      .then(({ which }) => {
        return which
      })
}

p()
  .then(which => {
    const examplePath = nps.join(exampleRoot, which)
    process.chdir(examplePath)

    const { getPackageJsonConfigs } = require('./lib/utils')
    const engine = require('./lib/engine')

    const cz = engine({
      gitRemoteUrl: require(nps.join(examplePath, 'gitRemoteUrl')),
      pkg: getPackageJsonConfigs(examplePath)
    })

    return cz.prompter(inquirer, function(msg, options) {
      console.log('\n------------ OUTPUT --------------')
      console.log(msg)
      console.log('----------------------------------')
      console.log(options)
    })
  })
  .catch(console.error)
