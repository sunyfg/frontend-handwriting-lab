import { describe, expect, it } from 'vitest'
import { asyncPool } from '../../problems/async/asyncPool'

describe('asyncPool', () => {
  it('控制并发数量并保持结果顺序', async () => {
    let running = 0
    let maxRunning = 0

    const result = await asyncPool(2, [1, 2, 3, 4], async (item) => {
      running += 1
      maxRunning = Math.max(maxRunning, running)
      await new Promise((resolve) => setTimeout(resolve, 10))
      running -= 1
      return item * 2
    })

    expect(result).toEqual([2, 4, 6, 8])
    expect(maxRunning).toBeLessThanOrEqual(2)
  })
})

