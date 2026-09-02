import { describe, expect, it } from 'vitest'
import { binarySearch } from '../../problems/algorithm/binarySearch'

describe('binarySearch', () => {
  it('返回目标值下标', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 4)).toBe(3)
    expect(binarySearch([1, 2, 3, 4, 5], 6)).toBe(-1)
  })
})

