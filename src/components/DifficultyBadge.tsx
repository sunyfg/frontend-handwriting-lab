import type { ProblemDifficulty } from '../data/problems/types'
import { Badge } from './ui/Badge'

const difficultyClassNameMap: Record<ProblemDifficulty, string> = {
  Easy: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Medium: 'border-amber-200 bg-amber-50 text-amber-700',
  Hard: 'border-rose-200 bg-rose-50 text-rose-700',
}

export function DifficultyBadge({
  difficulty,
}: {
  difficulty: ProblemDifficulty
}) {
  return (
    <Badge className={difficultyClassNameMap[difficulty]}>{difficulty}</Badge>
  )
}
