import { describe, expect, it } from 'vitest'
import { promiseAny } from '../../problems/async/promiseAny'

describe('promiseAny', () => {
  it('返回第一个成功的结果', async () => {
    const failingThenable = {
      then: (_resolve: unknown, reject: (reason: Error) => void) =>
        reject(new Error('fail')),
    } as PromiseLike<number>

    await expect(
      promiseAny([
        failingThenable,
        new Promise<number>((resolve) => setTimeout(() => resolve(2), 10)),
      ]),
    ).resolves.toBe(2)
  })

  it('全部失败时抛出 AggregateError', async () => {
    const firstFailingThenable = {
      then: (_resolve: unknown, reject: (reason: Error) => void) =>
        reject(new Error('a')),
    } as PromiseLike<number>
    const secondFailingThenable = {
      then: (_resolve: unknown, reject: (reason: Error) => void) =>
        reject(new Error('b')),
    } as PromiseLike<number>

    await expect(
      promiseAny([firstFailingThenable, secondFailingThenable]),
    ).rejects.toBeInstanceOf(AggregateError)
  })
})
