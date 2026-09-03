import type { MysqlExecutionResponse } from '../types'

export interface MysqlExecuteRequest {
  problemId: string
  sql: string
  mode?: 'run' | 'explain'
}

export async function executeMysqlSql(
  payload: MysqlExecuteRequest,
): Promise<MysqlExecutionResponse> {
  const response = await fetch('/api/mysql/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return (await response.json()) as MysqlExecutionResponse
}

export async function resetMysqlDatabase() {
  const response = await fetch('/api/mysql/reset', {
    method: 'POST',
  })

  return (await response.json()) as { success: boolean; error?: { message: string } }
}

export async function getMysqlHealth() {
  const response = await fetch('/api/mysql/health')
  return (await response.json()) as {
    success: boolean
    database?: string
    serverTime?: string
    error?: string
  }
}
