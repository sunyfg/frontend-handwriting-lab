import { describe, expect, it } from 'vitest'
import { mergeSort } from '../../problems/algorithm/mergeSort'

describe('mergeSort', () => {
  it('返回升序数组', () => {
    expect(mergeSort([5, 1, 4, 2, 3])).toEqual([1, 2, 3, 4, 5])
  })
})

