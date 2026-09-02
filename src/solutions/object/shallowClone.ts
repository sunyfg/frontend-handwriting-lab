export function shallowClone<T>(value: T): T {
  if (Array.isArray(value)) {
    return [...value] as T
  }

  if (value && typeof value === 'object') {
    return { ...(value as Record<string, unknown>) } as T
  }

  return value
}

