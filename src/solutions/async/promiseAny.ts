export function promiseAny<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'))
      return
    }

    const reasons: unknown[] = []
    let rejectedCount = 0

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve)
        .catch((reason) => {
          reasons[index] = reason
          rejectedCount += 1

          if (rejectedCount === iterable.length) {
            reject(new AggregateError(reasons, 'All promises were rejected'))
          }
        })
    })
  })
}

