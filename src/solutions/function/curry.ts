export function curry<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): any {
  function curried(...args: unknown[]) {
    if (args.length >= fn.length) {
      return fn(...(args as TArgs))
    }

    return (...rest: unknown[]) => curried(...args, ...rest)
  }

  return curried
}
