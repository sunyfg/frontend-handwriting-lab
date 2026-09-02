import { createTodoError } from '../../utils/todo'

type Handler<TArgs extends unknown[]> = (...args: TArgs) => void

export class EventEmitter<TEvents extends Record<string, unknown[]>> {
  on<TKey extends keyof TEvents>(
    _eventName: TKey,
    _handler: Handler<TEvents[TKey]>,
  ): void {
    throw createTodoError('EventEmitter.on')
  }

  off<TKey extends keyof TEvents>(
    _eventName: TKey,
    _handler: Handler<TEvents[TKey]>,
  ): void {
    throw createTodoError('EventEmitter.off')
  }

  once<TKey extends keyof TEvents>(
    _eventName: TKey,
    _handler: Handler<TEvents[TKey]>,
  ): void {
    throw createTodoError('EventEmitter.once')
  }

  emit<TKey extends keyof TEvents>(
    _eventName: TKey,
    ..._args: TEvents[TKey]
  ): void {
    throw createTodoError('EventEmitter.emit')
  }
}

