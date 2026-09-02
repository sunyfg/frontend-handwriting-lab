import { describe, expect, it } from 'vitest'
import { shuffle } from '../../problems/array/shuffle'

describe('shuffle', () => {
  it('返回包含相同元素的新数组', () => {
    const source = [1, 2, 3, 4]
    const shuffled = shuffle(source)

    expect(shuffled).toHaveLength(source.length)
    expect([...shuffled].sort()).toEqual([...source].sort())
    expect(shuffled).not.toBe(source)
  })
})

