import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useThrottle } from '../../problems/react/useThrottle'

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(0)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('限制值更新频率', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'a', delay: 100 },
      },
    )

    rerender({ value: 'b', delay: 100 })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('b')
  })
})

