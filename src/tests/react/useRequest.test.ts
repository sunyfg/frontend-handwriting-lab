import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useRequest } from '../../problems/react/useRequest'

describe('useRequest', () => {
  it('支持手动触发请求', async () => {
    const service = vi.fn(async (value: string) => value + '-ok')
    const { result } = renderHook(() =>
      useRequest(service, {
        manual: true,
      }),
    )

    await act(async () => {
      await result.current.run('hello')
    })

    expect(result.current.data).toBe('hello-ok')
    expect(result.current.loading).toBe(false)
    expect(service).toHaveBeenCalledWith('hello')
  })

  it('支持默认参数自动执行', async () => {
    const service = vi.fn(async (value: number) => value * 2)
    const { result } = renderHook(() =>
      useRequest(service, {
        defaultParams: [2],
      }),
    )

    await waitFor(() => {
      expect(result.current.data).toBe(4)
    })
  })
})

