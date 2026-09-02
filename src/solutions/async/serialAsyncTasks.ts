export async function serialAsyncTasks<T>(
  tasks: Array<() => Promise<T>>,
): Promise<T[]> {
  const result: T[] = []

  for (const task of tasks) {
    result.push(await task())
  }

  return result
}

