import { describe, expect, it } from 'vitest'
import { compose } from '../../problems/function/compose'

describe('compose', () => {
  it('从右到左执行函数', () => {
    const add1 = (value: number) => value + 1
    const double = (value: number) => value * 2

    expect(compose(add1, double)(2)).toBe(5)
  })

  it('空函数列表返回原值', () => {
    expect(compose<number>()(3)).toBe(3)
  })
})

