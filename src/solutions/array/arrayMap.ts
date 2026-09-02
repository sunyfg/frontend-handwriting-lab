export function arrayMap<T, TResult>(
  array: T[],
  iteratee: (item: T, index: number, array: T[]) => TResult,
): TResult[] {
  const result: TResult[] = []

  for (let index = 0; index < array.length; index += 1) {
    result.push(iteratee(array[index], index, array))
  }

  return result
}

