/**
 * @file icafe-api
 * @author Cuttle Cong
 * @date 2018/10/11
 *
 */

let width

module.exports = () => {
  return width
}

module.exports.__set = function(w = 1000) {
  width = w
}

module.exports.__set()
