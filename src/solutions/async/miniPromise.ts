type Resolve<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason?: unknown) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

type Status = 'pending' | 'fulfilled' | 'rejected'

function resolvePromise<T>(
  value: unknown,
  resolve: Resolve<T>,
  reject: Reject,
) {
  if (value instanceof MiniPromise) {
    value.then(resolve, reject)
    return
  }

  if (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function')
  ) {
    let then: unknown

    try {
      then = (value as PromiseLike<T>).then
    } catch (error) {
      reject(error)
      return
    }

    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          value,
          (nextValue: T | PromiseLike<T>) => {
            if (called) {
              return
            }
            called = true
            resolvePromise(nextValue, resolve, reject)
          },
          (reason: unknown) => {
            if (called) {
              return
            }
            called = true
            reject(reason)
          },
        )
      } catch (error) {
        if (!called) {
          reject(error)
        }
      }
      return
    }
  }

  resolve(value as T)
}

export class MiniPromise<T> implements PromiseLike<T> {
  private status: Status = 'pending'
  private value!: T
  private reason: unknown
  private fulfilledQueue: Array<() => void> = []
  private rejectedQueue: Array<() => void> = []

  constructor(executor: Executor<T>) {
    const resolve: Resolve<T> = (value) => {
      if (this.status !== 'pending') {
        return
      }

      queueMicrotask(() => {
        if (this.status !== 'pending') {
          return
        }

        resolvePromise<T>(
          value,
          (resolvedValue) => {
            this.status = 'fulfilled'
            this.value = resolvedValue as T
            this.fulfilledQueue.forEach((callback) => callback())
          },
          (reason) => {
            this.status = 'rejected'
            this.reason = reason
            this.rejectedQueue.forEach((callback) => callback())
          },
        )
      })
    }

    const reject: Reject = (reason) => {
      if (this.status !== 'pending') {
        return
      }

      queueMicrotask(() => {
        if (this.status !== 'pending') {
          return
        }
        this.status = 'rejected'
        this.reason = reason
        this.rejectedQueue.forEach((callback) => callback())
      })
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): MiniPromise<TResult1 | TResult2> {
    return new MiniPromise<TResult1 | TResult2>((resolve, reject) => {
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.value as TResult1 | TResult2)
              return
            }

            const result = onFulfilled(this.value)
            resolvePromise(result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.reason)
              return
            }

            const result = onRejected(this.reason)
            resolvePromise(result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === 'fulfilled') {
        handleFulfilled()
      } else if (this.status === 'rejected') {
        handleRejected()
      } else {
        this.fulfilledQueue.push(handleFulfilled)
        this.rejectedQueue.push(handleRejected)
      }
    })
  }

  catch<TResult = never>(
    onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): MiniPromise<T | TResult> {
    return this.then(undefined, onRejected)
  }
}

