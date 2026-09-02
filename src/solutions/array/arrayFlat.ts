export function arrayFlat(
  array: unknown[],
  depth = 1,
): unknown[] {
  if (depth <= 0) {
    return [...array]
  }

  return array.reduce<unknown[]>((result, item) => {
    if (Array.isArray(item)) {
      result.push(...arrayFlat(item, depth - 1))
    } else {
      result.push(item)
    }
    return result
  }, [])
}

