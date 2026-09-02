export function twoSum(array: number[], target: number): [number, number] | [] {
  const map = new Map<number, number>()

  for (let index = 0; index < array.length; index += 1) {
    const current = array[index]
    const complement = target - current

    if (map.has(complement)) {
      return [map.get(complement) as number, index]
    }

    map.set(current, index)
  }

  return []
}

