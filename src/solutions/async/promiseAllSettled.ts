export function promiseAllSettled<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<Array<PromiseSettledResult<T>>> {
  return Promise.all(
    iterable.map((item) =>
      Promise.resolve(item)
        .then(
          (value) =>
            ({
              status: 'fulfilled',
              value,
            }) as PromiseFulfilledResult<T>,
        )
        .catch(
          (reason) =>
            ({
              status: 'rejected',
              reason,
            }) as PromiseRejectedResult,
        ),
    ),
  )
}

