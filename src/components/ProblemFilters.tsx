import { problemCategories } from '../data/problems'
import type { ProblemDifficulty } from '../data/problems/types'
import { cn } from '../lib/utils'
import { SearchInput } from './ui/SearchInput'
import { Panel } from './ui/Panel'

interface ProblemFiltersProps {
  selectedCategory: string
  selectedDifficulty: 'all' | ProblemDifficulty
  selectedFrequency: 'all' | 3 | 4 | 5
  keyword: string
  onCategoryChange: (value: string) => void
  onDifficultyChange: (value: 'all' | ProblemDifficulty) => void
  onFrequencyChange: (value: 'all' | 3 | 4 | 5) => void
  onKeywordChange: (value: string) => void
}

export function ProblemFilters(props: ProblemFiltersProps) {
  const {
    selectedCategory,
    selectedDifficulty,
    selectedFrequency,
    keyword,
    onCategoryChange,
    onDifficultyChange,
    onFrequencyChange,
    onKeywordChange,
  } = props

  return (
    <Panel className="mt-6 p-5 sm:p-6">
      <div className="grid gap-5">
        <div className="grid gap-4">
          <div className="grid gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              分类
            </span>
            <div className="flex flex-wrap gap-2">
              {problemCategories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                    selectedCategory === category.value
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  )}
                  onClick={() => onCategoryChange(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              难度
            </span>
            <div className="flex flex-wrap gap-2">
              {(['all', 'Easy', 'Medium', 'Hard'] as const).map(
                (difficulty) => (
                  <button
                    key={difficulty}
                    type="button"
                    className={cn(
                      'rounded-xl border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                      selectedDifficulty === difficulty
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                    )}
                    onClick={() => onDifficultyChange(difficulty)}
                  >
                    {difficulty}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              高频度
            </span>
            <div className="flex flex-wrap gap-2">
              {(['all', 5, 4, 3] as const).map((frequency) => (
                <button
                  key={String(frequency)}
                  type="button"
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                    selectedFrequency === frequency
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  )}
                  onClick={() => onFrequencyChange(frequency)}
                >
                  {frequency === 'all' ? 'All' : '★'.repeat(frequency)}
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
            placeholder="搜索 debounce、闭包、Promise..."
          />
        </label>
      </div>
    </Panel>
  )
}
