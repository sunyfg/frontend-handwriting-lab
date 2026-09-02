import { describe, expect, it } from 'vitest'
import { unique } from '../../problems/array/unique'

describe('unique', () => {
  it('按顺序去重', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
  })
})

