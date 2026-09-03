import type { ProblemStatus } from '../data/problems/types'
import { Badge } from './ui/Badge'

const statusLabelMap: Record<ProblemStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

const statusClassNameMap: Record<ProblemStatus, string> = {
  'not-started': 'border-slate-200 bg-slate-100 text-slate-600',
  'in-progress': 'border-blue-200 bg-blue-50 text-blue-700',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
}

export function StatusBadge({ status }: { status: ProblemStatus }) {
  return <Badge className={statusClassNameMap[status]}>{statusLabelMap[status]}</Badge>
}
