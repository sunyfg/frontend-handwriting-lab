import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { EmptyState } from '../../../components/ui/EmptyState'
import { Panel } from '../../../components/ui/Panel'
import { ProgressBar } from '../../../components/ui/ProgressBar'
import { Button } from '../../../components/ui/Button'
import { mysqlChapters, mysqlProblems } from '../data'
import { MysqlFilters } from '../components/MysqlFilters'
import { MysqlProblemCard } from '../components/MysqlProblemCard'
import type { MysqlDifficulty, MysqlProgressStatus } from '../types'
import { getMysqlCompletedCount, getMysqlProblemStatus } from '../utils/progress'

export function MysqlHomePage() {
  const [keyword, setKeyword] = useState('')
  const [chapter, setChapter] = useState('all')
  const [difficulty, setDifficulty] = useState<'all' | MysqlDifficulty>('all')
  const [frequency, setFrequency] = useState<'all' | 3 | 4 | 5>('all')
  const [status, setStatus] = useState<'all' | MysqlProgressStatus>('all')

  const filteredProblems = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase()

    return mysqlProblems.filter((problem) => {
      if (chapter !== 'all' && problem.chapter !== chapter) {
        return false
      }

      if (difficulty !== 'all' && problem.difficulty !== difficulty) {
        return false
      }

      if (frequency !== 'all' && problem.frequency !== frequency) {
        return false
      }

      if (status !== 'all' && getMysqlProblemStatus(problem.id) !== status) {
        return false
      }

      if (!lowerKeyword) {
        return true
      }

      return [problem.title, problem.description, ...problem.knowledgePoints]
        .join(' ')
        .toLowerCase()
        .includes(lowerKeyword)
    })
  }, [chapter, difficulty, frequency, keyword, status])

  const stats = useMemo(
    () => ({
      total: mysqlProblems.length,
      easy: mysqlProblems.filter((item) => item.difficulty === 'Easy').length,
      medium: mysqlProblems.filter((item) => item.difficulty === 'Medium').length,
      hard: mysqlProblems.filter((item) => item.difficulty === 'Hard').length,
      completed: getMysqlCompletedCount(mysqlProblems),
    }),
    [],
  )

  const currentStage = useMemo(() => {
    const nextProblem = mysqlProblems.find(
      (problem) => getMysqlProblemStatus(problem.id) !== 'completed',
    )

    return nextProblem?.chapter ?? '全部章节已完成'
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.95fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                MySQL Interview Lab
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                MySQL 面试题训练
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                从基础查询一路练到多表 JOIN、子查询和综合业务题，所有题目都围绕同一套互联网业务数据库展开。
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/">
                  <Button variant="secondary">前端手写题模块</Button>
                </Link>
                <Link to="/mysql/problem/select-basic">
                  <Button variant="primary">开始第一题</Button>
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
                  <p className="mt-2 text-sm text-slate-500">当前学习阶段：{currentStage}</p>
                </div>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)}%
                </span>
              </div>
              <ProgressBar value={stats.completed} max={stats.total} className="mt-4" />
            </Panel>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: '总题目数量', value: stats.total },
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
        </Panel>

        <MysqlFilters
          keyword={keyword}
          chapter={chapter}
          difficulty={difficulty}
          frequency={frequency}
          status={status}
          chapters={mysqlChapters}
          onKeywordChange={setKeyword}
          onChapterChange={setChapter}
          onDifficultyChange={setDifficulty}
          onFrequencyChange={setFrequency}
          onStatusChange={setStatus}
        />

        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">MySQL 题目列表</h2>
              <p className="text-sm text-slate-500">
                {filteredProblems.length} 道题符合当前筛选条件
              </p>
            </div>
          </div>

          {filteredProblems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProblems.map((problem) => (
                <MysqlProblemCard
                  key={problem.id}
                  problem={problem}
                  status={getMysqlProblemStatus(problem.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="没有找到符合条件的 MySQL 题目"
              description="试试清空搜索关键词，或者切换章节、难度、高频度和完成状态筛选。"
            />
          )}
        </section>
      </main>
    </div>
  )
}
