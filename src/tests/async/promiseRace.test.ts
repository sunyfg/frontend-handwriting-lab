import { describe, expect, it } from 'vitest'
import { promiseRace } from '../../problems/async/promiseRace'

describe('promiseRace', () => {
  it('返回最先完成的结果', async () => {
    await expect(
      promiseRace([
        new Promise<number>((resolve) => setTimeout(() => resolve(2), 20)),
        new Promise<number>((resolve) => setTimeout(() => resolve(1), 10)),
      ]),
    ).resolves.toBe(1)
  })
})

