import { describe, expect, it, vi } from 'vitest'
import { once } from '../../problems/function/once'

describe('once', () => {
  it('只执行一次并缓存结果', () => {
    const fn = vi.fn((value: number) => value * 2)
    const wrapped = once(fn)

    expect(wrapped(2)).toBe(4)
    expect(wrapped(4)).toBe(4)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

