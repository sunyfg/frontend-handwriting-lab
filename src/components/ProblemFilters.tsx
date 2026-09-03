import { problemCategories } from '../data/problems'
import type { ProblemDifficulty } from '../data/problems/types'

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
    <section className="filters-panel">
      <div className="filters-row">
        <div className="filter-group">
          <span className="filter-label">分类</span>
          <div className="chip-group">
            {problemCategories.map((category) => (
              <button
                key={category.value}
                type="button"
                className={`filter-chip ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">难度</span>
          <div className="chip-group">
            {(['all', 'Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
              <button
                key={difficulty}
                type="button"
                className={`filter-chip ${selectedDifficulty === difficulty ? 'active' : ''}`}
                onClick={() => onDifficultyChange(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">高频</span>
          <div className="chip-group">
            {(['all', 5, 4, 3] as const).map((frequency) => (
              <button
                key={String(frequency)}
                type="button"
                className={`filter-chip ${selectedFrequency === frequency ? 'active' : ''}`}
                onClick={() => onFrequencyChange(frequency)}
              >
                {frequency === 'all' ? 'All' : '★'.repeat(frequency)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="search-field">
        <span className="filter-label">搜索题目 / 知识点</span>
        <input
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="搜索 debounce、闭包、Promise..."
        />
      </label>
    </section>
  )
}
