import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from '../../problems/function/debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('只执行最后一次调用', () => {
    const fn = vi.fn()
    const wrapped = debounce(fn, 100)

    wrapped(1)
    wrapped(2)
    wrapped(3)

    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(3)
  })
})

