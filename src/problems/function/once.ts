import { createTodoError } from '../../utils/todo'

export function once<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  // TODO: 请实现 once
  throw createTodoError('once')
}

