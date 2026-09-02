type Subscriber<TPayload> = (payload: TPayload) => void

export class PubSub<TTopics extends Record<string, unknown>> {
  private topics = new Map<keyof TTopics, Set<Subscriber<unknown>>>()

  subscribe<TKey extends keyof TTopics>(
    topic: TKey,
    subscriber: Subscriber<TTopics[TKey]>,
  ): () => void {
    const subscribers = this.topics.get(topic) ?? new Set()
    subscribers.add(subscriber as Subscriber<unknown>)
    this.topics.set(topic, subscribers)

    return () => {
      subscribers.delete(subscriber as Subscriber<unknown>)
    }
  }

  publish<TKey extends keyof TTopics>(
    topic: TKey,
    payload: TTopics[TKey],
  ): void {
    this.topics.get(topic)?.forEach((subscriber) => {
      subscriber(payload)
    })
  }
}

