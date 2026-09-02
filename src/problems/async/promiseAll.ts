import { createTodoError } from '../../utils/todo'

export function promiseAll<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T[]> {
  // TODO: 请实现 promiseAll
  throw createTodoError('promiseAll')
}

