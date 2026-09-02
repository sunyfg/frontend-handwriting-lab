export function arrayDeduplicate<T>(
  array: T[],
  getKey: (item: T) => unknown = (item) => item,
): T[] {
  const seen = new Set<unknown>()

  return array.filter((item) => {
    const key = getKey(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

