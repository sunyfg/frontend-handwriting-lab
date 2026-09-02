import { createTodoError } from '../../utils/todo'

export async function serialAsyncTasks<T>(
  tasks: Array<() => Promise<T>>,
): Promise<T[]> {
  // TODO: 请实现 serialAsyncTasks
  throw createTodoError('serialAsyncTasks')
}

