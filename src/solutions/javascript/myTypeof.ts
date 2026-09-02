export function myTypeof(value: unknown): string {
  if (value === null) {
    return 'null'
  }

  if (Array.isArray(value)) {
    return 'array'
  }

  if (value instanceof Date) {
    return 'date'
  }

  if (value instanceof RegExp) {
    return 'regexp'
  }

  const type = typeof value

  if (type !== 'object') {
    return type
  }

  return 'object'
}

