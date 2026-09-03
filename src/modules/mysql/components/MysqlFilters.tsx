import { cn } from '../../../lib/utils'
import { SearchInput } from '../../../components/ui/SearchInput'
import { Panel } from '../../../components/ui/Panel'
import type { MysqlDifficulty, MysqlProgressStatus } from '../types'

interface MysqlFiltersProps {
  keyword: string
  chapter: string
  difficulty: 'all' | MysqlDifficulty
  frequency: 'all' | 3 | 4 | 5
  status: 'all' | MysqlProgressStatus
  chapters: string[]
  onKeywordChange: (value: string) => void
  onChapterChange: (value: string) => void
  onDifficultyChange: (value: 'all' | MysqlDifficulty) => void
  onFrequencyChange: (value: 'all' | 3 | 4 | 5) => void
  onStatusChange: (value: 'all' | MysqlProgressStatus) => void
}

const chipClassName =
  'rounded-xl border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

export function MysqlFilters(props: MysqlFiltersProps) {
  const {
    keyword,
    chapter,
    difficulty,
    frequency,
    status,
    chapters,
    onKeywordChange,
    onChapterChange,
    onDifficultyChange,
    onFrequencyChange,
    onStatusChange,
  } = props

  return (
    <Panel className="mt-6 p-5 sm:p-6">
      <div className="grid gap-5">
        <div className="grid gap-4">
          <div className="grid gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              章节
            </span>
            <div className="flex flex-wrap gap-2">
              {['all', ...chapters].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    chipClassName,
                    chapter === item
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  )}
                  onClick={() => onChapterChange(item)}
                >
                  {item === 'all' ? '全部章节' : item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              难度
            </span>
            <div className="flex flex-wrap gap-2">
              {(['all', 'Easy', 'Medium', 'Hard'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    chipClassName,
                    difficulty === item
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  )}
                  onClick={() => onDifficultyChange(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              高频度
            </span>
            <div className="flex flex-wrap gap-2">
              {(['all', 5, 4, 3] as const).map((item) => (
                <button
                  key={String(item)}
                  type="button"
                  className={cn(
                    chipClassName,
                    frequency === item
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  )}
                  onClick={() => onFrequencyChange(item)}
                >
                  {item === 'all' ? 'All' : '★'.repeat(item)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              完成状态
            </span>
            <div className="flex flex-wrap gap-2">
              {(['all', 'not-started', 'in-progress', 'completed'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={cn(
                    chipClassName,
                    status === item
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  )}
                  onClick={() => onStatusChange(item)}
                >
                  {item === 'all'
                    ? '全部状态'
                    : item === 'not-started'
                      ? 'Not Started'
                      : item === 'in-progress'
                        ? 'In Progress'
                        : 'Completed'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            搜索题目 / 知识点
          </span>
          <SearchInput
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="搜索 SELECT、GROUP BY、JOIN、索引..."
          />
        </label>
      </div>
    </Panel>
  )
}
