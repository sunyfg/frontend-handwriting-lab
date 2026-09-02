import { describe, expect, it, vi } from 'vitest'
import { retry } from '../../problems/async/retry'

describe('retry', () => {
  it('失败后重试直到成功', async () => {
    const task = vi.fn(async (): Promise<number> => 0)
    task.mockRejectedValueOnce(new Error('fail'))
    task.mockResolvedValueOnce(2)

    await expect(retry(task, 2)).resolves.toBe(2)
    expect(task).toHaveBeenCalledTimes(2)
  })
})
