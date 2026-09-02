import { createTodoError } from '../../utils/todo'

type Resolve<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason?: unknown) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

export class MiniPromise<T> implements PromiseLike<T> {
  constructor(_executor: Executor<T>) {
    throw createTodoError('MiniPromise')
  }

  then<TResult1 = T, TResult2 = never>(
    _onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    _onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): MiniPromise<TResult1 | TResult2> {
    throw createTodoError('MiniPromise.then')
  }

  catch<TResult = never>(
    _onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): MiniPromise<T | TResult> {
    throw createTodoError('MiniPromise.catch')
  }
}

