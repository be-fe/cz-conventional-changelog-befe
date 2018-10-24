/**
 * @file memoize
 * @author Cuttle Cong
 * @date 2018/10/24
 * @description
 */
const memoize = require('../src/memoize')

describe('memoize', function() {
  it('should memoize', () => {
    const fn = jest.fn()

    const m = memoize(fn)
    m.fn(12)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(12)

    m.fn(12)
    expect(fn).toBeCalledTimes(1)

    m.fn(14)

    expect(fn).toBeCalledTimes(2)
    expect(fn).toBeCalledWith(14)
  })

  it('should memoize cancelAble', () => {
    const fn = jest.fn()

    const m = memoize(fn)
    m.fn(12)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(12)

    m.fn(12)
    expect(fn).toBeCalledTimes(1)

    m.cancel()

    m.fn(12)
    m.fn(12)
    expect(fn).toBeCalledTimes(3)

    expect(fn).toBe(m.fn)
  })

  it('should memoize cancelAble', () => {
    const fn = jest.fn()

    const m = memoize(fn)
    m.fn(12)

    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(12)

    m.fn(12)
    expect(fn).toBeCalledTimes(1)

    m.cancel()

    m.fn(12)
    m.fn(12)
    expect(fn).toBeCalledTimes(3)
    expect(fn).toBe(m.fn)
  })

  it('should memoize update when error happened sync', () => {
    const fn = jest.fn(a => {
      if (a === 'error') throw new Error('error')
      return a
    })

    const m = memoize(fn)

    expect(m.fn(12)).toBe(12)
    m.fn(12)
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(12)

    let old = m.fn
    expect(() => m.fn('error')).toThrowError('error')

    expect(m.fn).toBe(old)
    expect(fn).toBeCalledTimes(2)

    expect(m.fn(12)).toBe(12)
    m.fn(12)
    m.fn(12)
    m.fn(13)
    expect(fn).toBeCalledTimes(4)
    expect(fn).toBeCalledWith(13)
  })

  it('should memoize update when error happened async', async () => {
    const fn = jest.fn(a => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (a === 'error') reject(new Error('error'))
          resolve(a)
        }, 200)
      })
    })

    const m = memoize(fn)

    expect(await m.fn(12)).toBe(12)
    await m.fn(12)
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(12)

    let old = m.fn
    await expect(m.fn('error')).rejects.toMatchInlineSnapshot(`[Error: error]`)

    expect(m.fn).toBe(old)
    expect(fn).toBeCalledTimes(2)

    expect(await m.fn(12)).toBe(12)
    await m.fn(12)
    await m.fn(12)
    await m.fn(12)
    await m.fn(12)
    await m.fn(13)

    expect(fn).toBeCalledTimes(4)
    expect(fn).toBeCalledWith(13)
  })
})
