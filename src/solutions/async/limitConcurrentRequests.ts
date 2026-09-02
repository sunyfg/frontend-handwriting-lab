export async function limitConcurrentRequests<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = []
    let nextIndex = 0
    let completed = 0

    function runNext() {
      if (completed === tasks.length) {
        resolve(results)
        return
      }

      while (nextIndex < tasks.length && nextIndex - completed < limit) {
        const currentIndex = nextIndex
        nextIndex += 1

        tasks[currentIndex]()
          .then((value) => {
            results[currentIndex] = value
            completed += 1
            runNext()
          })
          .catch(reject)
      }
    }

    if (tasks.length === 0) {
      resolve([])
      return
    }

    runNext()
  })
}

