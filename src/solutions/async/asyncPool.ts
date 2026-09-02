export async function asyncPool<T, TResult>(
  limit: number,
  items: T[],
  iterator: (item: T, index: number) => Promise<TResult>,
): Promise<TResult[]> {
  const results: TResult[] = []
  const executing = new Set<Promise<void>>()

  for (const [index, item] of items.entries()) {
    const task = Promise.resolve().then(async () => {
      results[index] = await iterator(item, index)
    })

    executing.add(task)
    task.finally(() => {
      executing.delete(task)
    })

    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  await Promise.all(executing)
  return results
}

