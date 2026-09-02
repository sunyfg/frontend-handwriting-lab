import { describe, expect, it } from 'vitest'
import { flattenArray } from '../../problems/array/flattenArray'

describe('flattenArray', () => {
  it('完全展开多层嵌套数组', () => {
    expect(flattenArray([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4])
  })
})

