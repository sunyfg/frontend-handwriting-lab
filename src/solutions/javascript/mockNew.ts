type Constructor<T, TArgs extends unknown[]> = new (...args: TArgs) => T

export function mockNew<T, TArgs extends unknown[]>(
  ConstructorFn: Constructor<T, TArgs>,
  ...args: TArgs
): T {
  const instance = Object.create(ConstructorFn.prototype) as T
  const result = ConstructorFn.apply(instance, args)

  if (
    (typeof result === 'object' && result !== null) ||
    typeof result === 'function'
  ) {
    return result as T
  }

  return instance
}

