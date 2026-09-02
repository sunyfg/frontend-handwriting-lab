import { describe, expect, it } from 'vitest'
import { parseCookie } from '../../problems/browser/parseCookie'

describe('parseCookie', () => {
  it('解析 cookie 字符串', () => {
    expect(parseCookie('token=abc; theme=dark; name=sun%20yan')).toEqual({
      token: 'abc',
      theme: 'dark',
      name: 'sun yan',
    })
  })
})

