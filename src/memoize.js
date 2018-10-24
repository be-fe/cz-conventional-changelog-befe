/**
 * @file memoize
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const memoizeOne = require('memoize-one')
const shallowequal = require('shallowequal')

const memoize = fn => memoizeOne(fn, shallowequal)

module.exports = function(fn) {
  const update = () => (mfn = memoize(fn))

  let mfn
  update()

  function wrapfn() {
    let rlt
    try {
      rlt = mfn.apply(this, arguments)
    } catch (err) {
      update()
      throw err
    }
    if (rlt && typeof rlt.then === 'function') {
      return rlt.catch(err => {
        update()
        throw err
      })
    }
    return rlt
  }

  const ctx = {
    fn: wrapfn,
    cancel: () => (ctx.fn = fn)
  }
  return ctx
}
