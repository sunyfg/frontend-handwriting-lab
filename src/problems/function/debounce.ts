import { createTodoError } from '../../utils/todo'

export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  // TODO: 请实现 debounce
  throw createTodoError('debounce')
}

