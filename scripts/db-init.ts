import { initializeExerciseDatabase } from '../server/services/databaseLifecycle'

async function main() {
  const result = await initializeExerciseDatabase()
  console.log(`Initialized database: ${result.database}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Database initialization failed.')
  process.exit(1)
})
