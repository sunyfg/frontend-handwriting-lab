import { describe, expect, it } from 'vitest'
import { unflattenObject } from '../../problems/object/unflattenObject'

describe('unflattenObject', () => {
  it('还原嵌套对象和数组', () => {
    expect(
      unflattenObject({
        'user.name': 'sun',
        'user.tags.0': 'a',
        'user.tags.1': 'b',
      }),
    ).toEqual({
      user: {
        name: 'sun',
        tags: ['a', 'b'],
      },
    })
  })
})

