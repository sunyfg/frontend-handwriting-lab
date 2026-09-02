import { describe, expect, it } from 'vitest'
import { arrayForEach } from '../../problems/array/arrayForEach'

describe('arrayForEach', () => {
  it('遍历每一个元素', () => {
    const collected: number[] = []
    arrayForEach([1, 2, 3], (item) => {
      collected.push(item)
    })

    expect(collected).toEqual([1, 2, 3])
  })
})

