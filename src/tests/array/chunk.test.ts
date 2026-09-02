import { describe, expect, it } from 'vitest'
import { chunk } from '../../problems/array/chunk'

describe('chunk', () => {
  it('按固定大小切片', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })
})

