export function parseCookie(
  cookie: string,
): Record<string, string> {
  if (!cookie.trim()) {
    return {}
  }

  return cookie.split(';').reduce<Record<string, string>>((result, segment) => {
    const [rawKey, ...rest] = segment.trim().split('=')
    result[rawKey] = decodeURIComponent(rest.join('='))
    return result
  }, {})
}

