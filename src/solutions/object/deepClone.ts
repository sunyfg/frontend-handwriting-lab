export function deepClone<T>(value: T, cache = new WeakMap()): T {
  if (typeof value !== 'object' || value === null) {
    return value
  }

  if (cache.has(value as object)) {
    return cache.get(value as object) as T
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T
  }

  if (value instanceof Map) {
    const clonedMap = new Map()
    cache.set(value, clonedMap)
    value.forEach((mapValue, mapKey) => {
      clonedMap.set(deepClone(mapKey, cache), deepClone(mapValue, cache))
    })
    return clonedMap as T
  }

  if (value instanceof Set) {
    const clonedSet = new Set()
    cache.set(value, clonedSet)
    value.forEach((setValue) => {
      clonedSet.add(deepClone(setValue, cache))
    })
    return clonedSet as T
  }

  const result = (Array.isArray(value) ? [] : {}) as Record<
    PropertyKey,
    unknown
  >
  cache.set(value as object, result)

  Reflect.ownKeys(value as object).forEach((key) => {
    result[key] = deepClone((value as Record<PropertyKey, unknown>)[key], cache)
  })

  return result as T
}
