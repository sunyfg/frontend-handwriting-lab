export async function retry<T>(
  task: () => Promise<T>,
  retries: number,
  delay = 0,
): Promise<T> {
  let currentError: unknown

  for (let count = 0; count <= retries; count += 1) {
    try {
      return await task()
    } catch (error) {
      currentError = error

      if (count === retries) {
        break
      }

      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw currentError
}

