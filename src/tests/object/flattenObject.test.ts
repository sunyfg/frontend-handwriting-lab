import { describe, expect, it } from 'vitest'
import { flattenObject } from '../../problems/object/flattenObject'

describe('flattenObject', () => {
  it('拍平嵌套对象和数组', () => {
    expect(
      flattenObject({
        user: {
          name: 'sun',
          tags: ['a', 'b'],
        },
      }),
    ).toEqual({
      'user.name': 'sun',
      'user.tags.0': 'a',
      'user.tags.1': 'b',
    })
  })
})

