import { Link } from 'react-router-dom'
import { DifficultyBadge } from '../../../components/DifficultyBadge'
import { FrequencyStars } from '../../../components/FrequencyStars'
import { StatusBadge } from '../../../components/StatusBadge'
import { Panel } from '../../../components/ui/Panel'
import type { MysqlProblem, MysqlProgressStatus } from '../types'

export function MysqlProblemCard({
  problem,
  status,
}: {
  problem: MysqlProblem
  status: MysqlProgressStatus
}) {
  return (
    <Link
      to={`/mysql/problem/${problem.id}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <Panel className="h-full p-5 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <DifficultyBadge difficulty={problem.difficulty} />
          <FrequencyStars frequency={problem.frequency} />
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {problem.chapter}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
            {problem.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{problem.description}</p>
        </div>

        <dl className="mt-5 grid gap-3 text-sm">
          <div className="grid gap-1">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              核心知识点
            </dt>
            <dd className="line-clamp-2 text-slate-700">
              {problem.knowledgePoints.slice(0, 4).join(' / ')}
            </dd>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                预计完成时间
              </dt>
              <dd className="text-slate-700">{problem.estimatedMinutes} min</dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                状态
              </dt>
              <dd>
                <StatusBadge status={status} />
              </dd>
            </div>
          </div>
        </dl>
      </Panel>
    </Link>
  )
}
