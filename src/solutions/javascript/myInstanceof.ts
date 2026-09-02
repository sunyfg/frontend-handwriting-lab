export function myInstanceof(
  value: unknown,
  constructor: Function,
): boolean {
  if (
    (typeof value !== 'object' && typeof value !== 'function') ||
    value === null
  ) {
    return false
  }

  let current = Object.getPrototypeOf(value)

  while (current) {
    if (current === constructor.prototype) {
      return true
    }
    current = Object.getPrototypeOf(current)
  }

  return false
}

