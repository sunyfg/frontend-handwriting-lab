import { createTodoError } from '../../utils/todo'

export async function retry<T>(
  task: () => Promise<T>,
  retries: number,
  delay = 0,
): Promise<T> {
  // TODO: 请实现 retry
  throw createTodoError('retry')
}

