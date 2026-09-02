export function flattenObject(
  value: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  function walk(current: unknown, path: string) {
    if (
      current === null ||
      typeof current !== 'object' ||
      current instanceof Date ||
      current instanceof RegExp
    ) {
      result[path] = current
      return
    }

    if (Array.isArray(current)) {
      if (current.length === 0) {
        result[path] = []
        return
      }

      current.forEach((item, index) => {
        walk(item, path ? path + '.' + index : String(index))
      })
      return
    }

    const entries = Object.entries(current)

    if (entries.length === 0 && path) {
      result[path] = {}
      return
    }

    entries.forEach(([key, item]) => {
      walk(item, path ? path + '.' + key : key)
    })
  }

  walk(value, '')
  return result
}

