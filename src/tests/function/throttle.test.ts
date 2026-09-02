import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { throttle } from '../../problems/function/throttle'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('在窗口内只触发一次', () => {
    const fn = vi.fn()
    const wrapped = throttle(fn, 100)

    wrapped('a')
    wrapped('b')
    wrapped('c')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    vi.advanceTimersByTime(100)
    wrapped('d')
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('d')
  })
})

