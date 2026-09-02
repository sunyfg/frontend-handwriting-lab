import { describe, expect, it } from 'vitest'
import { arrayReduce } from '../../problems/array/arrayReduce'

describe('arrayReduce', () => {
  it('累计数组元素', () => {
    expect(arrayReduce([1, 2, 3], (sum, item) => sum + item, 0)).toBe(6)
  })
})

