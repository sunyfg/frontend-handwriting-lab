import { describe, expect, it } from 'vitest'
import { arrayFlat } from '../../problems/array/arrayFlat'

describe('arrayFlat', () => {
  it('按深度展开数组', () => {
    expect(arrayFlat([1, [2, [3]]], 1)).toEqual([1, 2, [3]])
    expect(arrayFlat([1, [2, [3]]], 2)).toEqual([1, 2, 3])
  })
})

