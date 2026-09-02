import { createTodoError } from '../../utils/todo'

export function myBind<TContext, TArgs extends unknown[], TBoundArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: [...TBoundArgs, ...TArgs]) => TResult,
  context: TContext | null | undefined,
  ...boundArgs: TBoundArgs
): (...args: TArgs) => TResult {
  // TODO: 请实现 myBind
  throw createTodoError('myBind')
}
