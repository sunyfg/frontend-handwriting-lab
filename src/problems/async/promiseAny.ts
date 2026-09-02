import { createTodoError } from '../../utils/todo'

export function promiseAny<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  // TODO: 请实现 promiseAny
  throw createTodoError('promiseAny')
}

