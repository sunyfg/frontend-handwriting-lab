import { describe, expect, it } from 'vitest'
import { myCall } from '../../problems/javascript/myCall'

describe('myCall', () => {
  it('绑定 this 并传入参数', () => {
    function greet(this: { name: string }, prefix: string) {
      return prefix + this.name
    }

    expect(myCall(greet, { name: 'lab' }, 'hi ')).toBe('hi lab')
  })

  it('支持 null 或 undefined 上下文', () => {
    ;(globalThis as { label?: string }).label = 'global'

    function read(this: { label?: string }) {
      return this.label
    }

    expect(myCall(read, undefined)).toBe('global')
  })
})

