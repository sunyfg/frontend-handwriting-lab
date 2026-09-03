import type { ProblemDifficulty } from '../data/problems/types'

const difficultyClassNameMap: Record<ProblemDifficulty, string> = {
  Easy: 'badge-easy',
  Medium: 'badge-medium',
  Hard: 'badge-hard',
}

export function DifficultyBadge({ difficulty }: { difficulty: ProblemDifficulty }) {
  return <span className={`difficulty-badge ${difficultyClassNameMap[difficulty]}`}>{difficulty}</span>
}
