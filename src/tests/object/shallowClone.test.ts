import { describe, expect, it } from 'vitest'
import { shallowClone } from '../../problems/object/shallowClone'

describe('shallowClone', () => {
  it('拷贝对象第一层属性', () => {
    const source = { nested: { value: 1 }, list: [1, 2] }
    const cloned = shallowClone(source)

    expect(cloned).toEqual(source)
    expect(cloned).not.toBe(source)
    expect(cloned.nested).toBe(source.nested)
  })
})

