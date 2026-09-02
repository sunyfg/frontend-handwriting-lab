import { createTodoError } from '../../utils/todo'

type SetStateAction<T> = T | ((previous: T) => T)

export function createMiniState<T>(
  _initialValue: T,
): [() => T, (nextValue: SetStateAction<T>) => T] {
  // TODO: 请实现 createMiniState
  throw createTodoError('createMiniState')
}

