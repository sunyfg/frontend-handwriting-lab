export function arrayReduce<T, TResult>(
  array: T[],
  reducer: (
    accumulator: TResult,
    item: T,
    index: number,
    array: T[],
  ) => TResult,
  initialValue: TResult,
): TResult {
  let accumulator = initialValue

  for (let index = 0; index < array.length; index += 1) {
    accumulator = reducer(accumulator, array[index], index, array)
  }

  return accumulator
}

