import type { StorageLike } from '../../utils/storage'

interface StoredValue {
  value: unknown
  expiresAt: number
}

export function createExpiringStorage(storage: StorageLike) {
  return {
    set(key: string, value: unknown, ttl: number): void {
      const payload: StoredValue = {
        value,
        expiresAt: Date.now() + ttl,
      }

      storage.setItem(key, JSON.stringify(payload))
    },
    get<T>(key: string): T | null {
      const rawValue = storage.getItem(key)

      if (!rawValue) {
        return null
      }

      const parsed = JSON.parse(rawValue) as StoredValue

      if (Date.now() > parsed.expiresAt) {
        storage.removeItem(key)
        return null
      }

      return parsed.value as T
    },
    remove(key: string): void {
      storage.removeItem(key)
    },
  }
}

