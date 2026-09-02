import type { StorageLike } from '../../utils/storage'
import { createTodoError } from '../../utils/todo'

export function createExpiringStorage(_storage: StorageLike) {
  return {
    set(_key: string, _value: unknown, _ttl: number): void {
      throw createTodoError('createExpiringStorage.set')
    },
    get<T>(_key: string): T | null {
      throw createTodoError('createExpiringStorage.get')
    },
    remove(_key: string): void {
      throw createTodoError('createExpiringStorage.remove')
    },
  }
}

