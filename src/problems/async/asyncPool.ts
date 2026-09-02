import { createTodoError } from '../../utils/todo'

export async function asyncPool<T, TResult>(
  limit: number,
  items: T[],
  iterator: (item: T, index: number) => Promise<TResult>,
): Promise<TResult[]> {
  // TODO: 请实现 asyncPool
  throw createTodoError('asyncPool')
}

