import { describe, expect, it } from 'vitest'
import { deepClone } from '../../problems/object/deepClone'

describe('deepClone', () => {
  it('深拷贝嵌套对象', () => {
    const source = {
      nested: { value: 1 },
      list: [1, { ok: true }],
      date: new Date('2024-01-01'),
    }
    const cloned = deepClone(source)

    expect(cloned).toEqual(source)
    expect(cloned).not.toBe(source)
    expect(cloned.nested).not.toBe(source.nested)
    expect(cloned.list).not.toBe(source.list)
  })

  it('处理循环引用', () => {
    const source: Record<string, unknown> = {}
    source.self = source

    const cloned = deepClone(source)

    expect(cloned).not.toBe(source)
    expect(cloned.self).toBe(cloned)
  })
})

