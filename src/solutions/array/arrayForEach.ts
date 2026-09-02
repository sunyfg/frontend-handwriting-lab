export function arrayForEach<T>(
  array: T[],
  iteratee: (item: T, index: number, array: T[]) => void,
): void {
  for (let index = 0; index < array.length; index += 1) {
    iteratee(array[index], index, array)
  }
}

