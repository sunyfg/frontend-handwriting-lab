import { createTodoError } from '../../utils/todo'

export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Timeout',
): Promise<T> {
  // TODO: 请实现 timeout
  throw createTodoError('timeout')
}

