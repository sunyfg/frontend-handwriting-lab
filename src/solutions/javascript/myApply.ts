export function myApply<TContext, TArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: TArgs) => TResult,
  context: TContext | null | undefined,
  args?: TArgs,
): TResult {
  const target =
    context === null || context === undefined
      ? (globalThis as TContext)
      : Object(context)

  const key = Symbol('apply')
  ;(target as Record<PropertyKey, unknown>)[key] = fn
  const result = (target as Record<PropertyKey, (...params: TArgs) => TResult>)[
    key
  ](...((args ?? []) as TArgs))
  delete (target as Record<PropertyKey, unknown>)[key]
  return result
}
