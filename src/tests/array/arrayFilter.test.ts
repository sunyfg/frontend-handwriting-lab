import { describe, expect, it } from 'vitest'
import { arrayFilter } from '../../problems/array/arrayFilter'

describe('arrayFilter', () => {
  it('筛选满足条件的元素', () => {
    expect(arrayFilter([1, 2, 3, 4], (item) => item % 2 === 0)).toEqual([2, 4])
  })
})

