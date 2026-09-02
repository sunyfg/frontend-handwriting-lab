import { describe, expect, it } from 'vitest'
import { myApply } from '../../problems/javascript/myApply'

describe('myApply', () => {
  it('接收数组形式参数', () => {
    function sum(this: { offset: number }, a: number, b: number) {
      return this.offset + a + b
    }

    expect(myApply(sum, { offset: 1 }, [2, 3])).toBe(6)
  })

  it('处理缺省参数数组', () => {
    function read(this: { value: string }) {
      return this.value
    }

    expect(myApply(read, { value: 'ok' })).toBe('ok')
  })
})

