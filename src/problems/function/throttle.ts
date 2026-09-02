import { createTodoError } from '../../utils/todo'

export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  // TODO: 请实现 throttle
  throw createTodoError('throttle')
}

