export function quickSort(array: number[]): number[] {
  if (array.length <= 1) {
    return [...array]
  }

  const [pivot, ...rest] = array
  const left = rest.filter((item) => item <= pivot)
  const right = rest.filter((item) => item > pivot)

  return [...quickSort(left), pivot, ...quickSort(right)]
}

