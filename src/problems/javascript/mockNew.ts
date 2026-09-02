import { createTodoError } from '../../utils/todo'

type Constructor<T, TArgs extends unknown[]> = new (...args: TArgs) => T

export function mockNew<T, TArgs extends unknown[]>(
  ConstructorFn: Constructor<T, TArgs>,
  ...args: TArgs
): T {
  // TODO: 请实现 mockNew
  throw createTodoError('mockNew')
}

