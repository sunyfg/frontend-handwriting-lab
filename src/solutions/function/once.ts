export function once<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  let called = false
  let result: TResult

  return (...args: TArgs) => {
    if (!called) {
      called = true
      result = fn(...args)
    }

    return result
  }
}

