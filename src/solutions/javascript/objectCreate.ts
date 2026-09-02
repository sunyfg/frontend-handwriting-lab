export function objectCreate<T extends object>(
  prototype: T | null,
  properties?: PropertyDescriptorMap,
): T {
  function Temporary(this: unknown) {}

  Temporary.prototype = prototype
  const instance = new (Temporary as unknown as new () => T)()

  if (prototype === null) {
    Object.setPrototypeOf(instance, null)
  }

  if (properties) {
    Object.defineProperties(instance, properties)
  }

  return instance
}
