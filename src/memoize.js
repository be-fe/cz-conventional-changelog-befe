/**
 * @file memoize
 * @author Cuttle Cong
 * @date 2018/10/24
 *
 */

const iseq = require('lodash.isequalwith')
const memoize = require('./memfn')

function allowFnEq(a, b) {
  return iseq(a, b, (oldV, newV) => {
    if (typeof oldV === 'function' && typeof newV === 'function') {
      return oldV.toString() === newV.toString()
    }
  })
}

module.exports = function(fn) {
  const update = () =>
    (mfn = memoize(fn, {
      eq: allowFnEq
    }))

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
