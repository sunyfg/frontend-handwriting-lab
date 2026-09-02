import { describe, expect, it } from 'vitest'
import { arrayDeduplicate } from '../../problems/array/arrayDeduplicate'

describe('arrayDeduplicate', () => {
  it('支持按 key 去重', () => {
    expect(
      arrayDeduplicate(
        [
          { id: 1, name: 'a' },
          { id: 1, name: 'b' },
          { id: 2, name: 'c' },
        ],
        (item) => item.id,
      ),
    ).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'c' },
    ])
  })
})

