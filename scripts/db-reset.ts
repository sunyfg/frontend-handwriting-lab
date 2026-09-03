import { resetExerciseDatabase } from '../server/services/databaseLifecycle'

async function main() {
  const result = await resetExerciseDatabase()
  console.log(`Reset database: ${result.database}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Database reset failed.')
  process.exit(1)
})
