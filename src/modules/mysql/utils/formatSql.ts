const KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
  'GROUP BY',
  'HAVING',
  'ORDER BY',
  'LIMIT',
  'INNER JOIN',
  'LEFT JOIN',
  'RIGHT JOIN',
  'JOIN',
  'ON',
  'UNION ALL',
  'UNION',
  'EXISTS',
  'IN',
]

export function formatSql(sql: string) {
  let nextSql = sql.trim()

  KEYWORDS.forEach((keyword) => {
    const pattern = new RegExp(`\\s*${keyword}\\s+`, 'gi')
    nextSql = nextSql.replace(pattern, `\n${keyword} `)
  })

  return nextSql.replace(/^\n/, '').trim()
}
