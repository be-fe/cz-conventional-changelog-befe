/**
 * @file storeFirstCallAsync
 * @author Cuttle Cong
 * @date 2018/11/2
 * @description
 */

const storeFirstCallAsync = require('../src/storeFirstCallAsync')

describe('storeFirstCallAsync', function() {
  const get = jest.fn(() => {})
  const set = jest.fn(() => {})
  const mockStore = { get, set }

  beforeEach(() => {
    get.mockRestore()
    set.mockRestore()
  })
  it('should storeFirstCallAsync', async () => {
    const fn = jest.fn(() => 'mock')
    fn.staticValue = 'okk'
    const storedFn = storeFirstCallAsync(fn, mockStore)
    expect(storedFn.staticValue).toBe('okk')
    expect(storedFn).not.toBe(fn)
    expect(await storedFn()).toBe('mock')
    expect(get).toBeCalledTimes(1)
    expect(set).toBeCalledTimes(1)
    expect(set).toBeCalledWith('mock')

    expect(await storedFn()).toBe('mock')
    expect(get).toBeCalledTimes(1)
    expect(set).toBeCalledTimes(1)
  })
})
