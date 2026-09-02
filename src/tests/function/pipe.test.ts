import { describe, expect, it } from 'vitest'
import { pipe } from '../../problems/function/pipe'

describe('pipe', () => {
  it('从左到右执行函数', () => {
    const add1 = (value: number) => value + 1
    const double = (value: number) => value * 2

    expect(pipe(add1, double)(2)).toBe(6)
  })
})

