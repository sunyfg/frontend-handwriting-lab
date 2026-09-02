export function unflattenObject(
  value: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<PropertyKey, unknown> = {}

  Object.entries(value).forEach(([path, pathValue]) => {
    const segments = path.split('.')
    let current: Record<PropertyKey, unknown> = result

    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1
      const nextSegment = segments[index + 1]
      const nextIsIndex = nextSegment !== undefined && /^\d+$/.test(nextSegment)
      const isIndex = /^\d+$/.test(segment)
      const key = isIndex ? Number(segment) : segment

      if (isLast) {
        current[key] = pathValue
        return
      }

      if (current[key] === undefined) {
        current[key] = nextIsIndex ? [] : {}
      }

      current = current[key] as Record<PropertyKey, unknown>
    })
  })

  return result as Record<string, unknown>
}
