function merge(left: number[], right: number[]): number[] {
  const result: number[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex += 1
    } else {
      result.push(right[rightIndex])
      rightIndex += 1
    }
  }

  return [
    ...result,
    ...left.slice(leftIndex),
    ...right.slice(rightIndex),
  ]
}

export function mergeSort(array: number[]): number[] {
  if (array.length <= 1) {
    return [...array]
  }

  const middle = Math.floor(array.length / 2)
  const left = mergeSort(array.slice(0, middle))
  const right = mergeSort(array.slice(middle))

  return merge(left, right)
}

