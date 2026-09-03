import { Link } from 'react-router-dom'
import type { Problem, ProblemStatus } from '../data/problems/types'
import { DifficultyBadge } from './DifficultyBadge'
import { FrequencyStars } from './FrequencyStars'
import { StatusBadge } from './StatusBadge'
import { Panel } from './ui/Panel'

export function ProblemCard({
  problem,
  status,
}: {
  problem: Problem
  status: ProblemStatus
}) {
  return (
    <Link
      to={`/problem/${problem.id}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <Panel className="h-full p-5 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <DifficultyBadge difficulty={problem.difficulty} />
          <FrequencyStars frequency={problem.frequency} />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {problem.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {problem.summary}
          </p>
        </div>

        <dl className="mt-5 grid gap-3 text-sm">
          <div className="grid gap-1">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              分类
            </dt>
            <dd className="text-slate-700">{problem.categoryLabel}</dd>
          </div>
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
                预计时间
              </dt>
              <dd className="text-slate-700">
                {problem.estimatedMinutes ?? 10} min
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
                学习状态
              </dt>
              <dd>
                <StatusBadge status={status} />
              </dd>
            </div>
          </div>
          <div className="grid gap-1">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              完成状态
            </dt>
            <dd className="text-sm text-slate-500">
              {status === 'completed'
                ? '已完成，建议复盘复杂度与边界情况。'
                : '进入详情页后可继续练习并运行测试。'}
            </dd>
          </div>
        </dl>
      </Panel>
    </Link>
  )
}
