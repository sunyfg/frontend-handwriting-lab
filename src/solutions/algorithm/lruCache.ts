export class LRUCache<TKey, TValue> {
  private capacity: number
  private cache = new Map<TKey, TValue>()

  constructor(capacity: number) {
    this.capacity = capacity
  }

  get(key: TKey): TValue | -1 {
    if (!this.cache.has(key)) {
      return -1
    }

    const value = this.cache.get(key) as TValue
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  set(key: TKey, value: TValue): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key, value)

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value as TKey
      this.cache.delete(oldestKey)
    }
  }
}

