export type MysqlDifficulty = 'Easy' | 'Medium' | 'Hard'
export type MysqlProgressStatus = 'not-started' | 'in-progress' | 'completed'
export type MysqlOperation =
  | 'SELECT'
  | 'WITH'
  | 'SHOW'
  | 'DESCRIBE'
  | 'DESC'
  | 'EXPLAIN'
  | 'INSERT'
  | 'UPDATE'
  | 'DELETE'
  | 'CREATE_INDEX'

export interface MysqlProblem {
  id: string
  title: string
  chapter: string
  level: number
  difficulty: MysqlDifficulty
  frequency: 3 | 4 | 5
  description: string
  requirements: string[]
  knowledgePoints: string[]
  relatedTables: string[]
  starterSql: string
  solutionSql: string
  explanation: string
  interviewTips: string[]
  expectedResult?: unknown
  allowedOperations: MysqlOperation[]
  estimatedMinutes: number
}

export interface MysqlProgress {
  problemId: string
  status: MysqlProgressStatus
  sql: string
  solutionViewed: boolean
  lastUpdatedAt: number
}

export interface MysqlColumn {
  name: string
  type: string
  nullable?: boolean
  primaryKey?: boolean
  foreignKey?: string
}

export interface MysqlTableSchema {
  name: string
  title: string
  description: string
  columns: MysqlColumn[]
}

export interface MysqlExecutionSuccess {
  success: true
  columns: string[]
  rows: Array<Record<string, unknown>>
  affectedRows: number
  executionTime: number
  rowCount: number
  truncated: boolean
  judgement?: {
    passed: boolean
    message: string
  }
}

export interface MysqlExecutionFailure {
  success: false
  error: {
    message: string
    code?: string
  }
}

export type MysqlExecutionResponse = MysqlExecutionSuccess | MysqlExecutionFailure
