import { createTodoError } from '../../utils/todo'

export function arrayReduce<T, TResult>(
  array: T[],
  reducer: (
    accumulator: TResult,
    item: T,
    index: number,
    array: T[],
  ) => TResult,
  initialValue: TResult,
): TResult {
  // TODO: 请实现 arrayReduce
  throw createTodoError('arrayReduce')
}

