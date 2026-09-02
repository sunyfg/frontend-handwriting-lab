import { createTodoError } from '../../utils/todo'

export function curry<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): any {
  // TODO: 请实现 curry
  throw createTodoError('curry')
}
