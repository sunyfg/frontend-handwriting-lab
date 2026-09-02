import { describe, expect, it } from 'vitest'
import { parseURLParams } from '../../problems/browser/parseURLParams'

describe('parseURLParams', () => {
  it('解析查询参数并处理重复 key', () => {
    expect(parseURLParams('https://test.com?a=1&b=2&a=3')).toEqual({
      a: ['1', '3'],
      b: '2',
    })
  })
})

