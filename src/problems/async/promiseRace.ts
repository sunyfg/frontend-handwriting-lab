import { createTodoError } from '../../utils/todo'

export function promiseRace<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  // TODO: 请实现 promiseRace
  throw createTodoError('promiseRace')
}

