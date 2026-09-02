type Handler<TArgs extends unknown[]> = (...args: TArgs) => void

export class EventEmitter<TEvents extends Record<string, unknown[]>> {
  private events = new Map<keyof TEvents, Set<Handler<unknown[]>>>()

  on<TKey extends keyof TEvents>(
    eventName: TKey,
    handler: Handler<TEvents[TKey]>,
  ): void {
    const handlers = this.events.get(eventName) ?? new Set()
    handlers.add(handler as Handler<unknown[]>)
    this.events.set(eventName, handlers)
  }

  off<TKey extends keyof TEvents>(
    eventName: TKey,
    handler: Handler<TEvents[TKey]>,
  ): void {
    this.events.get(eventName)?.delete(handler as Handler<unknown[]>)
  }

  once<TKey extends keyof TEvents>(
    eventName: TKey,
    handler: Handler<TEvents[TKey]>,
  ): void {
    const wrapped: Handler<TEvents[TKey]> = (...args) => {
      this.off(eventName, wrapped)
      handler(...args)
    }

    this.on(eventName, wrapped)
  }

  emit<TKey extends keyof TEvents>(
    eventName: TKey,
    ...args: TEvents[TKey]
  ): void {
    this.events.get(eventName)?.forEach((handler) => {
      handler(...args)
    })
  }
}

