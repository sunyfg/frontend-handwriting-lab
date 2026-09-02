import { describe, expect, it } from 'vitest'
import { arrayMap } from '../../problems/array/arrayMap'

describe('arrayMap', () => {
  it('返回映射后的新数组', () => {
    expect(arrayMap([1, 2, 3], (item) => item * 2)).toEqual([2, 4, 6])
  })
})

