export function parseURLParams(
  url: string,
): Record<string, string | string[]> {
  const parsedUrl = new URL(url, 'https://example.com')
  const result: Record<string, string | string[]> = {}

  parsedUrl.searchParams.forEach((value, key) => {
    const current = result[key]

    if (current === undefined) {
      result[key] = value
      return
    }

    if (Array.isArray(current)) {
      current.push(value)
      return
    }

    result[key] = [current, value]
  })

  return result
}

