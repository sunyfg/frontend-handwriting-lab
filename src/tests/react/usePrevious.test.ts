import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { usePrevious } from '../../problems/react/usePrevious'

describe('usePrevious', () => {
  it('返回上一次的值', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: 1 },
      },
    )

    expect(result.current).toBeUndefined()

    rerender({ value: 2 })
    expect(result.current).toBe(1)
  })
})

