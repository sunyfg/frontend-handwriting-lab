export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Timeout',
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_resolve, reject) => {
      setTimeout(() => {
        reject(new Error(message))
      }, ms)
    }),
  ])
}

