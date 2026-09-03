import type {
  FieldPacket,
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise'
import { mysqlPool } from '../db'
import { getMysqlProblemById } from '../../src/modules/mysql/data/problems'
import type {
  MysqlExecutionResponse,
  MysqlExecutionSuccess,
  MysqlOperation,
  MysqlProblem,
} from '../../src/modules/mysql/types'

const MAX_RESULT_ROWS = 200
const MAX_EXECUTION_TIME_MS = 5000

const DANGEROUS_PATTERNS = [
  /\bDROP\s+DATABASE\b/i,
  /\bDROP\s+USER\b/i,
  /\bCREATE\s+USER\b/i,
  /\bALTER\s+USER\b/i,
  /\bGRANT\b/i,
  /\bREVOKE\b/i,
  /\bSET\s+GLOBAL\b/i,
  /\bSHUTDOWN\b/i,
  /\bFLUSH\b/i,
  /\bLOCK\s+TABLES?\b/i,
  /\bUNLOCK\s+TABLES?\b/i,
  /\bTRUNCATE\b/i,
  /\bUSE\b/i,
]

const SYSTEM_DATABASE_PATTERN =
  /\b(mysql|information_schema|performance_schema|sys)\s*\./i

function stripComments(sql: string) {
  return sql
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/--.*$/gm, ' ')
    .replace(/#.*$/gm, ' ')
    .trim()
}

function normalizeSql(sql: string) {
  return stripComments(sql)
    .replace(/;+\s*$/, '')
    .trim()
}

function ensureSingleStatement(sql: string) {
  if (sql.includes(';')) {
    throw new Error('Only a single SQL statement is allowed per execution.')
  }
}

function detectOperation(sql: string): MysqlOperation {
  const normalized = normalizeSql(sql).toUpperCase()

  if (/^CREATE\s+INDEX\b/.test(normalized)) {
    return 'CREATE_INDEX'
  }

  if (/^SELECT\b/.test(normalized)) {
    return 'SELECT'
  }

  if (/^WITH\b/.test(normalized)) {
    return 'WITH'
  }

  if (/^SHOW\b/.test(normalized)) {
    return 'SHOW'
  }

  if (/^DESCRIBE\b/.test(normalized)) {
    return 'DESCRIBE'
  }

  if (/^DESC\b/.test(normalized)) {
    return 'DESC'
  }

  if (/^EXPLAIN\b/.test(normalized)) {
    return 'EXPLAIN'
  }

  if (/^INSERT\b/.test(normalized)) {
    return 'INSERT'
  }

  if (/^UPDATE\b/.test(normalized)) {
    return 'UPDATE'
  }

  if (/^DELETE\b/.test(normalized)) {
    return 'DELETE'
  }

  throw new Error('Unsupported SQL operation for this lab.')
}

function getExplainTargetOperation(sql: string) {
  const normalized = normalizeSql(sql)
  const explainTarget = normalized.replace(/^EXPLAIN\s+/i, '')

  return detectOperation(explainTarget)
}

function validateSql(
  sql: string,
  problem: MysqlProblem,
  mode: 'run' | 'explain',
) {
  const normalized = normalizeSql(sql)

  if (!normalized) {
    throw new Error('SQL cannot be empty.')
  }

  ensureSingleStatement(normalized)

  if (SYSTEM_DATABASE_PATTERN.test(normalized)) {
    throw new Error('System databases are not available in the practice lab.')
  }

  const dangerousPattern = DANGEROUS_PATTERNS.find((pattern) =>
    pattern.test(normalized),
  )

  if (dangerousPattern) {
    throw new Error('This SQL command is blocked in the practice lab.')
  }

  const operation = detectOperation(normalized)

  if (mode === 'explain') {
    const targetOperation =
      operation === 'EXPLAIN'
        ? getExplainTargetOperation(normalized)
        : operation

    if (
      !problem.allowedOperations.includes(targetOperation) &&
      !problem.allowedOperations.includes('EXPLAIN')
    ) {
      throw new Error(`EXPLAIN is not enabled for problem "${problem.id}".`)
    }

    if (targetOperation !== 'SELECT' && targetOperation !== 'WITH') {
      throw new Error(
        'EXPLAIN currently supports SELECT and WITH queries only.',
      )
    }

    return {
      executableSql:
        operation === 'EXPLAIN' ? normalized : `EXPLAIN ${normalized}`,
      shouldJudge: false,
    }
  }

  if (!problem.allowedOperations.includes(operation)) {
    throw new Error(
      `Operation ${operation} is not allowed for problem "${problem.id}".`,
    )
  }

  return {
    executableSql: normalized,
    shouldJudge: Boolean(problem.expectedResult),
  }
}

function sanitizeError(error: unknown): { message: string; code?: string } {
  if (error instanceof Error) {
    const mysqlError = error as Error & { code?: string }

    return {
      message: mysqlError.message || 'SQL execution failed.',
      code: mysqlError.code,
    }
  }

  return {
    message: 'SQL execution failed.',
  }
}

function normalizeValue(value: unknown): unknown {
  if (value === null || value === undefined) {
    return null
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeValue(item))
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>

    return Object.keys(record)
      .sort()
      .reduce<Record<string, unknown>>((accumulator, key) => {
        accumulator[key] = normalizeValue(record[key])
        return accumulator
      }, {})
  }

  return value
}

function normalizeRows(rows: Array<Record<string, unknown>>, ordered: boolean) {
  const normalizedRows = rows.map((row) => normalizeValue(row))

  if (ordered) {
    return normalizedRows
  }

  return normalizedRows
    .map((row) => JSON.stringify(row))
    .sort()
    .map((row) => JSON.parse(row) as Record<string, unknown>)
}

function buildJudgement(
  problem: MysqlProblem,
  actual: MysqlExecutionSuccess,
  expected: MysqlExecutionSuccess,
) {
  const expectedConfig =
    problem.expectedResult && typeof problem.expectedResult === 'object'
      ? (problem.expectedResult as { ordered?: boolean })
      : {}
  const ordered = expectedConfig.ordered !== false

  const actualRows = normalizeRows(actual.rows, ordered)
  const expectedRows = normalizeRows(expected.rows, ordered)
  const passed = JSON.stringify(actualRows) === JSON.stringify(expectedRows)

  return {
    passed,
    message: passed
      ? '结果集与参考答案一致。'
      : `结果集与参考答案不一致。当前返回 ${actual.rowCount} 行，参考答案返回 ${expected.rowCount} 行。`,
  }
}

async function executeQuery(
  connection: PoolConnection,
  sql: string,
): Promise<MysqlExecutionResponse> {
  await connection.query(
    `SET SESSION max_execution_time = ${MAX_EXECUTION_TIME_MS}`,
  )

  const timeout = setTimeout(() => {
    connection.destroy()
  }, MAX_EXECUTION_TIME_MS + 200)

  const startedAt = Date.now()

  try {
    const [result, fields] = await connection.query(sql)
    const executionTime = Date.now() - startedAt

    if (Array.isArray(result)) {
      const rows = (result as RowDataPacket[]).map((row) => ({ ...row }))
      const columns =
        (fields as FieldPacket[] | undefined)?.map((field) => field.name) ??
        Object.keys(rows[0] ?? {})

      return {
        success: true,
        columns,
        rows: rows.slice(0, MAX_RESULT_ROWS),
        affectedRows: 0,
        executionTime,
        rowCount: rows.length,
        truncated: rows.length > MAX_RESULT_ROWS,
      }
    }

    const header = result as ResultSetHeader

    return {
      success: true,
      columns: [],
      rows: [],
      affectedRows: header.affectedRows ?? 0,
      executionTime,
      rowCount: header.affectedRows ?? 0,
      truncated: false,
    }
  } catch (error) {
    return {
      success: false,
      error: sanitizeError(error),
    }
  } finally {
    clearTimeout(timeout)
  }
}

export async function executeProblemSql({
  problemId,
  sql,
  mode = 'run',
}: {
  problemId: string
  sql: string
  mode?: 'run' | 'explain'
}): Promise<MysqlExecutionResponse> {
  const problem = getMysqlProblemById(problemId)

  if (!problem) {
    return {
      success: false,
      error: {
        message: `MySQL problem "${problemId}" was not found.`,
      },
    }
  }

  let validatedSql: string
  let shouldJudge = false

  try {
    const validationResult = validateSql(sql, problem, mode)
    validatedSql = validationResult.executableSql
    shouldJudge = validationResult.shouldJudge
  } catch (error) {
    return {
      success: false,
      error: sanitizeError(error),
    }
  }

  const connection = await mysqlPool.getConnection()

  try {
    const executionResult = await executeQuery(connection, validatedSql)

    if (!executionResult.success || !shouldJudge) {
      return executionResult
    }

    const expectedResult = await executeQuery(
      connection,
      normalizeSql(problem.solutionSql),
    )

    if (!expectedResult.success) {
      return executionResult
    }

    return {
      ...executionResult,
      judgement: buildJudgement(problem, executionResult, expectedResult),
    }
  } finally {
    try {
      connection.release()
    } catch {
      // The connection may already be destroyed after a timeout.
    }
  }
}

export async function getMysqlHealthStatus() {
  const connection = await mysqlPool.getConnection()

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT DATABASE() AS databaseName, NOW() AS serverTime',
    )
    const firstRow = rows[0] ?? {}

    return {
      success: true,
      database: String(firstRow.databaseName ?? ''),
      serverTime: String(firstRow.serverTime ?? ''),
    }
  } catch (error) {
    return {
      success: false,
      error: sanitizeError(error).message,
    }
  } finally {
    connection.release()
  }
}
