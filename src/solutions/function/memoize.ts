export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  resolver?: (...args: TArgs) => string,
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>()

  return (...args: TArgs) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key) as TResult
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

