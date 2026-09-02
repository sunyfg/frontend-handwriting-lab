export function arrayFilter<T>(
  array: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T[] {
  const result: T[] = []

  for (let index = 0; index < array.length; index += 1) {
    if (predicate(array[index], index, array)) {
      result.push(array[index])
    }
  }

  return result
}

