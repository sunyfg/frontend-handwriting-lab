import { createTodoError } from '../../utils/todo'

export function arrayFilter<T>(
  array: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T[] {
  // TODO: 请实现 arrayFilter
  throw createTodoError('arrayFilter')
}

