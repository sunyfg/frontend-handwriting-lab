import { createTodoError } from '../../utils/todo'

export function myApply<TContext, TArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: TArgs) => TResult,
  context: TContext | null | undefined,
  args?: TArgs,
): TResult {
  // TODO: 请实现 myApply
  throw createTodoError('myApply')
}
