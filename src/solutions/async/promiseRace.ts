export function promiseRace<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    iterable.forEach((item) => {
      Promise.resolve(item).then(resolve, reject)
    })
  })
}

