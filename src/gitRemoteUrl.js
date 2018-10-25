/**
 * @file gitRemoteUrl
 * @author Cuttle Cong
 * @date 2018/10/25
 *
 */

const gitconfig = require('gitconfiglocal')
const pify = require('pify')

module.exports = (dir, { remoteName = 'origin' } = {}) => {
  return pify(gitconfig)(dir || process.cwd()).then(config => {
    return (
      config.remote &&
      config.remote[remoteName] &&
      config.remote[remoteName].url
    )
  })
}
