export function promiseAll<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      resolve([])
      return
    }

    const result: T[] = []
    let completed = 0

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          result[index] = value
          completed += 1

          if (completed === iterable.length) {
            resolve(result)
          }
        })
        .catch(reject)
    })
  })
}

