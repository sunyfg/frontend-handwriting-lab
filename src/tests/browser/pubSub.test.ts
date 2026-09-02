import { describe, expect, it, vi } from 'vitest'
import { PubSub } from '../../problems/browser/pubSub'

describe('PubSub', () => {
  it('支持订阅、发布和取消订阅', () => {
    const pubsub = new PubSub<{ news: string }>()
    const handler = vi.fn()
    const unsubscribe = pubsub.subscribe('news', handler)

    pubsub.publish('news', 'hello')
    unsubscribe()
    pubsub.publish('news', 'world')

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith('hello')
  })
})

