import { createTodoError } from '../../utils/todo'

export class LRUCache<TKey, TValue> {
  constructor(_capacity: number) {
    throw createTodoError('LRUCache')
  }

  get(_key: TKey): TValue | -1 {
    throw createTodoError('LRUCache.get')
  }

  set(_key: TKey, _value: TValue): void {
    throw createTodoError('LRUCache.set')
  }
}

