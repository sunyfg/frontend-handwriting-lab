import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useUpdateEffect } from '../../problems/react/useUpdateEffect'

describe('useUpdateEffect', () => {
  it('跳过首次执行，只在更新时运行', () => {
    const fn = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => {
        useUpdateEffect(() => {
          fn(value)
        }, [value])
      },
      {
        initialProps: { value: 1 },
      },
    )

    expect(fn).not.toHaveBeenCalled()

    rerender({ value: 2 })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(2)
  })
})

