import { createTodoError } from '../../utils/todo'

type Unary<TInput, TOutput> = (input: TInput) => TOutput

export function pipe<T>(...fns: Array<Unary<T, T>>): Unary<T, T> {
  // TODO: 请实现 pipe
  throw createTodoError('pipe')
}

