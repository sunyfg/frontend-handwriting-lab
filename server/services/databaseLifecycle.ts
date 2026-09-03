import { readFile } from 'node:fs/promises'
import path from 'node:path'
import {
  assertExerciseDatabaseName,
  createMysqlAdminConnection,
  getMysqlEnvConfig,
} from '../db'

const PROJECT_ROOT = process.cwd()
const SCHEMA_FILE = path.join(PROJECT_ROOT, 'database', 'schema.sql')
const SEED_FILE = path.join(PROJECT_ROOT, 'database', 'seed.sql')

async function readSqlFile(filePath: string) {
  return readFile(filePath, 'utf8')
}

export async function initializeExerciseDatabase() {
  const config = getMysqlEnvConfig()
  assertExerciseDatabaseName(config.database)

  const [schemaSql, seedSql] = await Promise.all([
    readSqlFile(SCHEMA_FILE),
    readSqlFile(SEED_FILE),
  ])

  const connection = await createMysqlAdminConnection()

  try {
    await connection.query(schemaSql)
    await connection.query(seedSql)
  } finally {
    await connection.end()
  }

  return {
    database: config.database,
  }
}

export async function resetExerciseDatabase() {
  return initializeExerciseDatabase()
}
