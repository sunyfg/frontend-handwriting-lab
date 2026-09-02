import { describe, expect, it } from 'vitest'
import { quickSort } from '../../problems/algorithm/quickSort'

describe('quickSort', () => {
  it('返回升序数组', () => {
    expect(quickSort([5, 1, 4, 2, 3])).toEqual([1, 2, 3, 4, 5])
  })
})

