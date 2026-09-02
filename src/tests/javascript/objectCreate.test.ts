import { describe, expect, it } from 'vitest'
import { objectCreate } from '../../problems/javascript/objectCreate'

describe('objectCreate', () => {
  it('创建指定原型对象', () => {
    const proto = { name: 'lab' }
    const target = objectCreate(proto)

    expect(Object.getPrototypeOf(target)).toBe(proto)
    expect((target as { name: string }).name).toBe('lab')
  })

  it('支持属性描述符', () => {
    const target = objectCreate(
      {},
      {
        age: {
          value: 18,
          enumerable: true,
        },
      },
    ) as { age: number }

    expect(target.age).toBe(18)
    expect(Object.keys(target)).toContain('age')
  })
})

