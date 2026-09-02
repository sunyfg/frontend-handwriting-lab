import { describe, expect, it } from 'vitest'
import { LRUCache } from '../../problems/algorithm/lruCache'

describe('LRUCache', () => {
  it('按最近最少使用淘汰数据', () => {
    const cache = new LRUCache<number, number>(2)
    cache.set(1, 1)
    cache.set(2, 2)
    expect(cache.get(1)).toBe(1)
    cache.set(3, 3)
    expect(cache.get(2)).toBe(-1)
  })
})

