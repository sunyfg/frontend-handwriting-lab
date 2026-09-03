import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import { ProblemCard } from '../components/ProblemCard'
import { ProblemFilters } from '../components/ProblemFilters'
import { problems } from '../data/problems'
import type { ProblemDifficulty } from '../data/problems/types'
import { getCompletedProblemCount, getProblemStatus } from '../utils/progress'

export function HomePage() {
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState<'all' | ProblemDifficulty>('all')
  const [frequency, setFrequency] = useState<'all' | 3 | 4 | 5>('all')
  const [keyword, setKeyword] = useState('')

  const filteredProblems = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase()

    return problems.filter((problem) => {
      if (category !== 'all' && problem.category !== category) {
        return false
      }

      if (difficulty !== 'all' && problem.difficulty !== difficulty) {
        return false
      }

      if (frequency !== 'all' && problem.frequency !== frequency) {
        return false
      }

      if (!lowerKeyword) {
        return true
      }

      const haystack = [problem.title, problem.summary, ...problem.knowledgePoints]
        .join(' ')
        .toLowerCase()

      return haystack.includes(lowerKeyword)
    })
  }, [category, difficulty, frequency, keyword])

  const stats = useMemo(
    () => ({
      total: problems.length,
      easy: problems.filter((problem) => problem.difficulty === 'Easy').length,
      medium: problems.filter((problem) => problem.difficulty === 'Medium').length,
      hard: problems.filter((problem) => problem.difficulty === 'Hard').length,
      completed: getCompletedProblemCount(problems),
    }),
    [],
  )

  return (
    <div className="app-shell">
      <Header />

      <main className="layout-container">
        <section className="hero-panel">
          <div>
            <p className="eyebrow">Frontend Handwriting Lab</p>
            <h1>前端面试手写题训练场</h1>
            <p className="hero-copy">
              从题库浏览、在线编写、运行代码、运行测试，到查看案例和参考答案，都可以在一个页面流里完成。
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <span>全部题目</span>
              <strong>{stats.total}</strong>
            </div>
            <div className="stat-box">
              <span>Easy</span>
              <strong>{stats.easy}</strong>
            </div>
            <div className="stat-box">
              <span>Medium</span>
              <strong>{stats.medium}</strong>
            </div>
            <div className="stat-box">
              <span>Hard</span>
              <strong>{stats.hard}</strong>
            </div>
            <div className="stat-box">
              <span>已完成</span>
              <strong>
                {stats.completed} / {stats.total}
              </strong>
            </div>
          </div>
        </section>

        <ProblemFilters
          selectedCategory={category}
          selectedDifficulty={difficulty}
          selectedFrequency={frequency}
          keyword={keyword}
          onCategoryChange={setCategory}
          onDifficultyChange={setDifficulty}
          onFrequencyChange={setFrequency}
          onKeywordChange={setKeyword}
        />

        <section className="problem-list-section">
          <div className="section-heading">
            <div>
              <h2>题目列表</h2>
              <p>{filteredProblems.length} 道题符合当前筛选条件</p>
            </div>
          </div>

          <div className="problem-grid">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} status={getProblemStatus(problem.id)} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
