import { describe, expect, it } from 'vitest'
import { deepEqual } from '../../problems/object/deepEqual'

describe('deepEqual', () => {
  it('比较嵌套对象和数组', () => {
    expect(deepEqual({ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] })).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('比较日期和正则', () => {
    expect(deepEqual(new Date('2024-01-01'), new Date('2024-01-01'))).toBe(
      true,
    )
    expect(deepEqual(/a/gi, /a/g)).toBe(false)
  })
})

