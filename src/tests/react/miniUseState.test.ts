import { describe, expect, it } from 'vitest'
import { createMiniState } from '../../problems/react/miniUseState'

describe('createMiniState', () => {
  it('支持读取和更新状态', () => {
    const [getState, setState] = createMiniState(0)

    expect(getState()).toBe(0)
    setState(1)
    expect(getState()).toBe(1)
    setState((previous) => previous + 1)
    expect(getState()).toBe(2)
  })
})

