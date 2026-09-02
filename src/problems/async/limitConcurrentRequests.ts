import { createTodoError } from '../../utils/todo'

export async function limitConcurrentRequests<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> {
  // TODO: 请实现 limitConcurrentRequests
  throw createTodoError('limitConcurrentRequests')
}

