export function myBind<TContext, TArgs extends unknown[], TBoundArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: [...TBoundArgs, ...TArgs]) => TResult,
  context: TContext | null | undefined,
  ...boundArgs: TBoundArgs
): (...args: TArgs) => TResult {
  function bound(this: TContext, ...args: TArgs): TResult {
    const finalContext =
      this instanceof bound
        ? (this as TContext)
        : context === null || context === undefined
          ? (globalThis as TContext)
          : context

    return fn.apply(finalContext, [...boundArgs, ...args])
  }

  bound.prototype = Object.create(fn.prototype)

  return bound
}
