import { describe, expect, it } from 'vitest'
import { promiseAllSettled } from '../../problems/async/promiseAllSettled'

describe('promiseAllSettled', () => {
  it('返回所有任务的最终状态', async () => {
    const failingThenable = {
      then: (_resolve: unknown, reject: (reason: Error) => void) =>
        reject(new Error('fail')),
    } as PromiseLike<number>

    await expect(
      promiseAllSettled([Promise.resolve(1), failingThenable]),
    ).resolves.toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: new Error('fail') },
    ])
  })
})
