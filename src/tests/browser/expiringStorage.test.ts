import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createExpiringStorage } from '../../problems/browser/expiringStorage'

class MemoryStorage {
  private store = new Map<string, string>()

  getItem(key: string): string | null {
    return this.store.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }
}

describe('createExpiringStorage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('在过期前读取值，过期后返回 null', () => {
    const storage = createExpiringStorage(new MemoryStorage())
    storage.set('token', { ok: true }, 100)

    expect(storage.get<{ ok: boolean }>('token')).toEqual({ ok: true })

    vi.advanceTimersByTime(101)
    expect(storage.get('token')).toBeNull()
  })
})

