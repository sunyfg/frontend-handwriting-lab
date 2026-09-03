import { Router } from 'express'
import { resetExerciseDatabase } from '../services/databaseLifecycle'
import { executeProblemSql, getMysqlHealthStatus } from '../services/sqlRunner'

export const mysqlRouter: Router = Router()

mysqlRouter.get('/health', async (_request, response) => {
  const result = await getMysqlHealthStatus()

  if (result.success) {
    response.json(result)
    return
  }

  response.status(500).json(result)
})

mysqlRouter.post('/execute', async (request, response) => {
  const problemId =
    typeof request.body?.problemId === 'string'
      ? request.body.problemId.trim()
      : ''
  const sql = typeof request.body?.sql === 'string' ? request.body.sql : ''
  const mode = request.body?.mode === 'explain' ? 'explain' : 'run'

  if (!problemId) {
    response.status(400).json({
      success: false,
      error: {
        message: 'problemId is required.',
      },
    })
    return
  }

  if (!sql.trim()) {
    response.status(400).json({
      success: false,
      error: {
        message: 'sql is required.',
      },
    })
    return
  }

  const result = await executeProblemSql({
    problemId,
    sql,
    mode,
  })

  response.status(result.success ? 200 : 400).json(result)
})

mysqlRouter.post('/reset', async (_request, response) => {
  try {
    const result = await resetExerciseDatabase()

    response.json({
      success: true,
      database: result.database,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to reset database.'

    response.status(500).json({
      success: false,
      error: {
        message,
      },
    })
  }
})
