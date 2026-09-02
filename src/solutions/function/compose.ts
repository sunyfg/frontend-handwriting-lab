type Unary<TInput, TOutput> = (input: TInput) => TOutput

export function compose<T>(...fns: Array<Unary<T, T>>): Unary<T, T> {
  return (input: T) => fns.reduceRight((value, fn) => fn(value), input)
}

