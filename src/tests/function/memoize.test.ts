import { describe, expect, it, vi } from 'vitest'
import { memoize } from '../../problems/function/memoize'

describe('memoize', () => {
  it('缓存相同参数的执行结果', () => {
    const fn = vi.fn((a: number, b: number) => a + b)
    const wrapped = memoize(fn)

    expect(wrapped(1, 2)).toBe(3)
    expect(wrapped(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

