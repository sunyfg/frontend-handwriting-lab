import { describe, expect, it, vi } from 'vitest'
import { delegateEvent } from '../../problems/browser/delegateEvent'

describe('delegateEvent', () => {
  it('命中选择器时触发回调', () => {
    const root = document.createElement('div')
    root.innerHTML = '<button class="target">click</button>'
    const button = root.querySelector('.target') as HTMLButtonElement
    const handler = vi.fn()

    delegateEvent(root, 'click', '.target', handler)
    button.click()

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler.mock.calls[0][1]).toBe(button)
  })
})

