import { describe, expect, it } from 'vitest'
import { mockNew } from '../../problems/javascript/mockNew'

describe('mockNew', () => {
  it('执行构造函数并挂载原型', () => {
    function Person(this: { name?: string }, name: string) {
      this.name = name
    }

    Person.prototype.sayHi = function sayHi() {
      return 'hi'
    }

    const person = mockNew(Person as never, 'sun')

    expect((person as { name: string }).name).toBe('sun')
    expect((person as { sayHi: () => string }).sayHi()).toBe('hi')
  })

  it('优先返回构造函数返回的对象', () => {
    function Factory() {
      return { ok: true }
    }

    expect(mockNew(Factory as never)).toEqual({ ok: true })
  })
})

