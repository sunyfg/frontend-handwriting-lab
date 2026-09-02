export function flattenArray(array: unknown[]): unknown[] {
  return array.reduce<unknown[]>((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item))
    } else {
      result.push(item)
    }
    return result
  }, [])
}

