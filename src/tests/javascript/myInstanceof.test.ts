import { describe, expect, it } from 'vitest'
import { myInstanceof } from '../../problems/javascript/myInstanceof'

describe('myInstanceof', () => {
  it('沿原型链查找构造函数原型', () => {
    expect(myInstanceof([], Array)).toBe(true)
    expect(myInstanceof(new Date(), Date)).toBe(true)
    expect(myInstanceof({}, Array)).toBe(false)
  })

  it('处理非对象值', () => {
    expect(myInstanceof(null, Object)).toBe(false)
    expect(myInstanceof(1, Number)).toBe(false)
    expect(myInstanceof('x', String)).toBe(false)
  })
})

