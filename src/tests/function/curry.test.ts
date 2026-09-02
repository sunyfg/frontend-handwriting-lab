import { describe, expect, it } from 'vitest'
import { curry } from '../../problems/function/curry'

describe('curry', () => {
  it('支持分步收集参数', () => {
    const join = (a: string, b: string, c: string) => a + b + c
    const curried = curry(join)

    expect(curried('a')('b')('c')).toBe('abc')
    expect(curried('a', 'b')('c')).toBe('abc')
  })
})

