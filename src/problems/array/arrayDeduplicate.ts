import { createTodoError } from '../../utils/todo'

export function arrayDeduplicate<T>(
  array: T[],
  getKey: (item: T) => unknown = (item) => item,
): T[] {
  // TODO: 请实现 arrayDeduplicate
  throw createTodoError('arrayDeduplicate')
}

