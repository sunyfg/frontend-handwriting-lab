import { createTodoError } from '../../utils/todo'

export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  resolver?: (...args: TArgs) => string,
): (...args: TArgs) => TResult {
  // TODO: 请实现 memoize
  throw createTodoError('memoize')
}

