import { Link } from 'react-router-dom'
import type { Problem, ProblemStatus } from '../data/problems/types'
import { DifficultyBadge } from './DifficultyBadge'
import { FrequencyStars } from './FrequencyStars'

const statusLabelMap: Record<ProblemStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

export function ProblemCard({
  problem,
  status,
}: {
  problem: Problem
  status: ProblemStatus
}) {
  return (
    <Link to={`/problem/${problem.id}`} className="problem-card-link">
      <article className="problem-card" tabIndex={0}>
        <div className="problem-card-top">
          <DifficultyBadge difficulty={problem.difficulty} />
          <FrequencyStars frequency={problem.frequency} />
        </div>

        <div className="problem-card-content">
          <h3>{problem.title}</h3>
          <p>{problem.summary}</p>
        </div>

        <dl className="problem-card-meta">
          <div>
            <dt>分类</dt>
            <dd>{problem.categoryLabel}</dd>
          </div>
          <div>
            <dt>知识点</dt>
            <dd>{problem.knowledgePoints.slice(0, 4).join(' / ')}</dd>
          </div>
          <div>
            <dt>预计时间</dt>
            <dd>{problem.estimatedMinutes ?? 10} min</dd>
          </div>
          <div>
            <dt>状态</dt>
            <dd className={`status-pill status-${status}`}>{statusLabelMap[status]}</dd>
          </div>
        </dl>
      </article>
    </Link>
  )
}
