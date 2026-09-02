import { describe, expect, it } from 'vitest'
import { twoSum } from '../../problems/algorithm/twoSum'

describe('twoSum', () => {
  it('返回目标值对应的两个下标', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
    expect(twoSum([1, 2, 3], 7)).toEqual([])
  })
})

