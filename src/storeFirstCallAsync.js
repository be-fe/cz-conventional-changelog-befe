/**
 * @file storeFirstCall
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/2
 *
 */

function storeFirstCallAsync(fn, store) {
  async function saveCall() {
    const result = await fn.apply(this, arguments)
    store.set(result)
    return result
  }

  let isFirstTime = true
  async function wrap() {
    if (isFirstTime) {
      isFirstTime = false
      const prevResult = store.get()
      if (prevResult) {
        saveCall.apply(this, arguments)
        return prevResult
      }
      return await saveCall.apply(this, arguments)
    }

    return fn.apply(this, arguments)
  }

  Object.setPrototypeOf(wrap, fn)
  return wrap
}

module.exports = storeFirstCallAsync
