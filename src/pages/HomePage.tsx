import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { ProblemCard } from '../components/ProblemCard'
import { ProblemFilters } from '../components/ProblemFilters'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { Panel } from '../components/ui/Panel'
import { ProgressBar } from '../components/ui/ProgressBar'
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

      const haystack = [
        problem.title,
        problem.summary,
        ...problem.knowledgePoints,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(lowerKeyword)
    })
  }, [category, difficulty, frequency, keyword])

  const stats = useMemo(
    () => ({
      total: problems.length,
      easy: problems.filter((problem) => problem.difficulty === 'Easy').length,
      medium: problems.filter((problem) => problem.difficulty === 'Medium')
        .length,
      hard: problems.filter((problem) => problem.difficulty === 'Hard').length,
      completed: getCompletedProblemCount(problems),
    }),
    [],
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.9fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                Frontend Handwriting Lab
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                前端面试手写题训练平台
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                从题库浏览、在线编写、运行代码、运行测试，到查看案例和参考答案，都可以在一个页面流里完成。
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/problem/debounce">
                  <Button variant="primary">继续前端练习</Button>
                </Link>
                <Link to="/mysql">
                  <Button variant="secondary">进入 MySQL 模块</Button>
                </Link>
              </div>
            </div>

            <Panel className="bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">练习进度</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    {stats.completed} / {stats.total} Completed
                  </p>
                </div>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {stats.total === 0
                    ? 0
                    : Math.round((stats.completed / stats.total) * 100)}
                  %
                </span>
              </div>
              <ProgressBar
                value={stats.completed}
                max={stats.total}
                className="mt-4"
              />
            </Panel>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: '全部题目', value: stats.total },
              { label: 'Easy', value: stats.easy },
              { label: 'Medium', value: stats.medium },
              { label: 'Hard', value: stats.hard },
              { label: '已完成', value: `${stats.completed} / ${stats.total}` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Panel className="border-blue-200 bg-blue-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                Learning Modules
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
                前端手写题练习
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                继续完成 JavaScript / TypeScript / React 高频手写题，支持在线编写、运行代码和运行测试。
              </p>
            </Panel>

            <Panel className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                New Module
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
                MySQL 面试题练习
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                基于统一业务数据库练习 SQL 查询、JOIN、子查询和综合业务题，支持真实数据库执行结果与错误反馈。
              </p>
              <div className="mt-4">
                <Link to="/mysql">
                  <Button variant="secondary">打开 MySQL 题库</Button>
                </Link>
              </div>
            </Panel>
          </div>
        </Panel>

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

        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                题目列表
              </h2>
              <p className="text-sm text-slate-500">
                {filteredProblems.length} 道题符合当前筛选条件
              </p>
            </div>
          </div>

          {filteredProblems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProblems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  status={getProblemStatus(problem.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="没有找到符合条件的题目"
              description="试试清空搜索关键词，或者切换分类、难度和高频度筛选。"
            />
          )}
        </section>
      </main>
    </div>
  )
}
