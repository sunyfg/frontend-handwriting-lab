import { describe, expect, it } from 'vitest'
import { limitConcurrentRequests } from '../../problems/async/limitConcurrentRequests'

describe('limitConcurrentRequests', () => {
  it('限制最大并发数量', async () => {
    let running = 0
    let maxRunning = 0

    const tasks = [1, 2, 3, 4].map(
      (item) => async () => {
        running += 1
        maxRunning = Math.max(maxRunning, running)
        await new Promise((resolve) => setTimeout(resolve, 10))
        running -= 1
        return item
      },
    )

    await expect(limitConcurrentRequests(tasks, 2)).resolves.toEqual([1, 2, 3, 4])
    expect(maxRunning).toBeLessThanOrEqual(2)
  })
})

