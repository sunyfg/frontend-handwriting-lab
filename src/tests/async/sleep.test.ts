import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sleep } from '../../problems/async/sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('在指定时间后完成', async () => {
    const task = sleep(100)
    vi.advanceTimersByTime(99)

    let done = false
    task.then(() => {
      done = true
    })

    await Promise.resolve()
    expect(done).toBe(false)

    vi.advanceTimersByTime(1)
    await task
    expect(done).toBe(true)
  })
})

