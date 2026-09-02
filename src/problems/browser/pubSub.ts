import { createTodoError } from '../../utils/todo'

type Subscriber<TPayload> = (payload: TPayload) => void

export class PubSub<TTopics extends Record<string, unknown>> {
  subscribe<TKey extends keyof TTopics>(
    _topic: TKey,
    _subscriber: Subscriber<TTopics[TKey]>,
  ): () => void {
    throw createTodoError('PubSub.subscribe')
  }

  publish<TKey extends keyof TTopics>(
    _topic: TKey,
    _payload: TTopics[TKey],
  ): void {
    throw createTodoError('PubSub.publish')
  }
}

