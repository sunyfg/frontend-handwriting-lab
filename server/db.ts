import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config({ path: '.env.local', quiet: true })
dotenv.config({ path: '.env', quiet: true })

export const EXERCISE_DATABASE_NAME = 'frontend_handwriting_lab'

export interface MysqlEnvConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  serverPort: number
}

function getEnvConfig(): MysqlEnvConfig {
  const config = {
    host: process.env.MYSQL_HOST ?? '127.0.0.1',
    port: Number(process.env.MYSQL_PORT ?? 13306),
    user: process.env.MYSQL_USER ?? 'root',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE ?? EXERCISE_DATABASE_NAME,
    serverPort: Number(process.env.MYSQL_SERVER_PORT ?? 3001),
  }

  assertExerciseDatabaseName(config.database)

  return config
}

export function getMysqlEnvConfig() {
  return getEnvConfig()
}

export function assertExerciseDatabaseName(databaseName: string) {
  if (databaseName !== EXERCISE_DATABASE_NAME) {
    throw new Error(`Only ${EXERCISE_DATABASE_NAME} is allowed for this lab.`)
  }
}

export function createMysqlAdminConnection() {
  const config = getEnvConfig()

  return mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    multipleStatements: true,
  })
}

export const mysqlPool = mysql.createPool({
  host: getEnvConfig().host,
  port: getEnvConfig().port,
  user: getEnvConfig().user,
  password: getEnvConfig().password,
  database: getEnvConfig().database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: false,
  decimalNumbers: true,
  dateStrings: true,
})

export async function closeMysqlPool() {
  await mysqlPool.end()
}
