import { describe, expect, it } from 'vitest'
import { serialAsyncTasks } from '../../problems/async/serialAsyncTasks'

describe('serialAsyncTasks', () => {
  it('按顺序执行任务', async () => {
    const order: number[] = []

    const result = await serialAsyncTasks([
      async () => {
        order.push(1)
        return 1
      },
      async () => {
        order.push(2)
        return 2
      },
    ])

    expect(order).toEqual([1, 2])
    expect(result).toEqual([1, 2])
  })
})

