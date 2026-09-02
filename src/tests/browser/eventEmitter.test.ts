import { describe, expect, it, vi } from 'vitest'
import { EventEmitter } from '../../problems/browser/eventEmitter'

describe('EventEmitter', () => {
  it('支持 on、emit、off、once', () => {
    const emitter = new EventEmitter<{ change: [number] }>()
    const handler = vi.fn()
    const onceHandler = vi.fn()

    emitter.on('change', handler)
    emitter.once('change', onceHandler)
    emitter.emit('change', 1)
    emitter.emit('change', 2)
    emitter.off('change', handler)
    emitter.emit('change', 3)

    expect(handler).toHaveBeenCalledTimes(2)
    expect(onceHandler).toHaveBeenCalledTimes(1)
  })
})

