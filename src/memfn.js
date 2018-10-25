/**
 * @file memfn
 * @author Cuttle Cong
 * @date 2018/10/25
 *
 */
function memoize(fn, { once = false, eq = (a, b) => a === b } = {}) {
  const map = new Map()

  return function memoizeFn() {
    let isContainsKey = false
    let containsKey
    let curKey = [...arguments]
    for (let key of map.keys()) {
      if (eq(key, curKey)) {
        isContainsKey = true
        containsKey = key
        break
      }
    }

    // console.log(isContainsKey, curKey, map.size)
    if (isContainsKey && containsKey) {
      return map.get(containsKey)
    }

    if (once) {
      map.clear()
    }
    const result = fn.apply(this, arguments)
    map.set(curKey, result)
    return result
  }
}

module.exports = memoize
