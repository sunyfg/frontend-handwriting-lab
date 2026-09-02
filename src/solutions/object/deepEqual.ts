export function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) {
    return true
  }

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false
  }

  const keysA = Reflect.ownKeys(a)
  const keysB = Reflect.ownKeys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every((key) =>
    deepEqual(
      (a as Record<PropertyKey, unknown>)[key],
      (b as Record<PropertyKey, unknown>)[key],
    ),
  )
}

