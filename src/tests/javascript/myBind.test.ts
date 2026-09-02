import { describe, expect, it } from 'vitest'
import { myBind } from '../../problems/javascript/myBind'

describe('myBind', () => {
  it('绑定 this 和预置参数', () => {
    function greet(this: { name: string }, prefix: string, suffix: string) {
      return prefix + this.name + suffix
    }

    const bound = myBind(greet, { name: 'lab' }, 'hi ')

    expect(bound('!')).toBe('hi lab!')
  })

  it('作为构造函数时忽略绑定对象', () => {
    function Person(this: { name?: string }, name: string) {
      this.name = name
    }

    const BoundPerson = myBind(Person as never, { name: 'ignored' })
    const person = new (BoundPerson as unknown as new (name: string) => {
      name: string
    })('sun')

    expect(person.name).toBe('sun')
  })
})

