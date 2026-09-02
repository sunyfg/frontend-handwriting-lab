type Unary<TInput, TOutput> = (input: TInput) => TOutput

export function pipe<T>(...fns: Array<Unary<T, T>>): Unary<T, T> {
  return (input: T) => fns.reduce((value, fn) => fn(value), input)
}

