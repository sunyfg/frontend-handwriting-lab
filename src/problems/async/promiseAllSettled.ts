import { createTodoError } from '../../utils/todo'

export function promiseAllSettled<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<Array<PromiseSettledResult<T>>> {
  // TODO: 请实现 promiseAllSettled
  throw createTodoError('promiseAllSettled')
}

