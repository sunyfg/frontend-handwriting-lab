import { describe, expect, it } from 'vitest'
import { promiseAll } from '../../problems/async/promiseAll'

describe('promiseAll', () => {
  it('按顺序返回所有结果', async () => {
    await expect(
      promiseAll([
        Promise.resolve(1),
        2,
        new Promise<number>((resolve) => setTimeout(() => resolve(3), 10)),
      ]),
    ).resolves.toEqual([1, 2, 3])
  })

  it('任一失败时立即 reject', async () => {
    const failingThenable = {
      then: (_resolve: unknown, reject: (reason: Error) => void) =>
        reject(new Error('fail')),
    } as PromiseLike<number>

    await expect(
      promiseAll([Promise.resolve(1), failingThenable]),
    ).rejects.toThrow('fail')
  })
})
