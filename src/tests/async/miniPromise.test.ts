import { describe, expect, it } from 'vitest'
import { MiniPromise } from '../../problems/async/miniPromise'

describe('MiniPromise', () => {
  it('支持 fulfilled 链式调用', async () => {
    const result = await new MiniPromise<number>((resolve) => {
      resolve(1)
    }).then((value) => value + 1)

    expect(result).toBe(2)
  })

  it('支持 catch 捕获异常', async () => {
    const result = await new MiniPromise<number>((_resolve, reject) => {
      reject(new Error('fail'))
    }).catch((error) => (error as Error).message)

    expect(result).toBe('fail')
  })

  it('支持 then 返回 PromiseLike', async () => {
    const result = await new MiniPromise<number>((resolve) => {
      resolve(1)
    }).then(
      (value) =>
        new Promise<number>((resolve) => {
          resolve(value + 2)
        }),
    )

    expect(result).toBe(3)
  })
})

