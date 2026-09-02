import { describe, expect, it } from 'vitest'
import { myTypeof } from '../../problems/javascript/myTypeof'

describe('myTypeof', () => {
  it('识别常见类型', () => {
    expect(myTypeof(null)).toBe('null')
    expect(myTypeof([])).toBe('array')
    expect(myTypeof({})).toBe('object')
    expect(myTypeof(() => {})).toBe('function')
    expect(myTypeof(new Date())).toBe('date')
    expect(myTypeof(/a/)).toBe('regexp')
  })

  it('识别原始值', () => {
    expect(myTypeof('hello')).toBe('string')
    expect(myTypeof(1)).toBe('number')
    expect(myTypeof(true)).toBe('boolean')
    expect(myTypeof(undefined)).toBe('undefined')
    expect(myTypeof(Symbol('x'))).toBe('symbol')
  })
})

