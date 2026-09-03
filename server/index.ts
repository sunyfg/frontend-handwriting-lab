import express from 'express'
import { closeMysqlPool, getMysqlEnvConfig } from './db'
import { mysqlRouter } from './routes/mysql'

const app = express()
const { serverPort } = getMysqlEnvConfig()

app.use(express.json({ limit: '32kb' }))
app.use('/api/mysql', mysqlRouter)

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
  })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : 'Internal server error.'

  response.status(500).json({
    success: false,
    error: {
      message,
    },
  })
})

const server = app.listen(serverPort, () => {
  console.log(`MySQL runner server listening on http://127.0.0.1:${serverPort}`)
})

async function shutdown() {
  server.close(async () => {
    await closeMysqlPool()
    process.exit(0)
  })
}

process.on('SIGINT', () => {
  void shutdown()
})

process.on('SIGTERM', () => {
  void shutdown()
})
