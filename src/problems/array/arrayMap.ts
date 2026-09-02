import { createTodoError } from '../../utils/todo'

export function arrayMap<T, TResult>(
  array: T[],
  iteratee: (item: T, index: number, array: T[]) => TResult,
): TResult[] {
  // TODO: 请实现 arrayMap
  throw createTodoError('arrayMap')
}

