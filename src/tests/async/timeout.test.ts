import { describe, expect, it } from 'vitest'
import { timeout } from '../../problems/async/timeout'

describe('timeout', () => {
  it('超时后抛出错误', async () => {
    await expect(
      timeout(
        new Promise<number>((resolve) => setTimeout(() => resolve(1), 50)),
        10,
      ),
    ).rejects.toThrow('Timeout')
  })
})

