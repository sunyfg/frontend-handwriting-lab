import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CodeEditor } from '../../../components/CodeEditor'
import { DifficultyBadge } from '../../../components/DifficultyBadge'
import { FrequencyStars } from '../../../components/FrequencyStars'
import { Header } from '../../../components/Header'
import { StatusBadge } from '../../../components/StatusBadge'
import { Button } from '../../../components/ui/Button'
import { EmptyState } from '../../../components/ui/EmptyState'
import { Panel } from '../../../components/ui/Panel'
import { Tabs } from '../../../components/ui/Tabs'
import { cn } from '../../../lib/utils'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShortcut'
import { ProblemNotFoundPage } from '../../../pages/ProblemNotFoundPage'
import { getMysqlProblemById, mysqlProblems, mysqlSampleRows, mysqlTableSchemas } from '../data'
import { MysqlResultTable } from '../components/MysqlResultTable'
import { MysqlSampleDataViewer } from '../components/MysqlSampleDataViewer'
import { MysqlSchemaViewer } from '../components/MysqlSchemaViewer'
import { useMysqlProgress } from '../hooks/useMysqlProgress'
import type { MysqlExecutionResponse, MysqlProblem } from '../types'
import { executeMysqlSql, getMysqlHealth, resetMysqlDatabase } from '../utils/api'
import { formatSql } from '../utils/formatSql'

type DetailTab = 'description' | 'schema' | 'sample-data' | 'solution'

function getAdjacentMysqlProblems(problemId: string) {
  const index = mysqlProblems.findIndex((problem) => problem.id === problemId)

  return {
    index,
    total: mysqlProblems.length,
    previous: index > 0 ? mysqlProblems[index - 1] : null,
    next: index >= 0 && index < mysqlProblems.length - 1 ? mysqlProblems[index + 1] : null,
  }
}

function SectionHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">{title}</h3>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
    </div>
  )
}

function MysqlErrorPanel({ message, code }: { message: string; code?: string }) {
  return (
    <Panel className="border-red-200 bg-red-50 p-4 text-red-700">
      <strong>SQL Error</strong>
      <p className="mt-2 text-sm">{message}</p>
      {code ? <p className="mt-1 text-xs opacity-80">Code: {code}</p> : null}
    </Panel>
  )
}

export function MysqlProblemPage() {
  const { problemId } = useParams<{ problemId: string }>()
  const problem = problemId ? getMysqlProblemById(problemId) : undefined

  if (!problem) {
    return <ProblemNotFoundPage />
  }

  return <MysqlProblemDetail problem={problem} />
}

function MysqlProblemDetail({ problem }: { problem: MysqlProblem }) {
  const { previous, next, index, total } = useMemo(
    () => getAdjacentMysqlProblems(problem.id),
    [problem.id],
  )
  const { sql, status, solutionViewed, updateSql, updateStatus, complete, reset, viewSolution } =
    useMysqlProgress(problem)
  const [detailTab, setDetailTab] = useState<DetailTab>('description')
  const [showSolution, setShowSolution] = useState(solutionViewed)
  const [executionResult, setExecutionResult] = useState<MysqlExecutionResponse | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isResettingDatabase, setIsResettingDatabase] = useState(false)
  const [healthMessage, setHealthMessage] = useState<string>('正在检查数据库连接...')

  const relatedSchemas = useMemo(
    () => mysqlTableSchemas.filter((table) => problem.relatedTables.includes(table.name)),
    [problem.relatedTables],
  )
  const relatedSampleData = useMemo(
    () =>
      problem.relatedTables.map((tableName) => ({
        tableName,
        rows: mysqlSampleRows[tableName] ?? [],
      })),
    [problem.relatedTables],
  )

  useEffect(() => {
    setShowSolution(solutionViewed)
    setExecutionResult(null)
    setDetailTab('description')
  }, [problem.id, solutionViewed])

  useEffect(() => {
    void getMysqlHealth()
      .then((result) => {
        if (result.success) {
          setHealthMessage(`已连接数据库：${result.database}`)
        } else {
          setHealthMessage(result.error ?? '数据库连接未就绪')
        }
      })
      .catch(() => {
        setHealthMessage('数据库连接未就绪')
      })
  }, [])

  const runSql = useCallback(
    async (mode: 'run' | 'explain' = 'run') => {
      setIsRunning(true)
      try {
        const response = await executeMysqlSql({
          problemId: problem.id,
          sql,
          mode,
        })

        setExecutionResult(response)

        if (response.success) {
          if (response.judgement?.passed) {
            complete()
          } else if (sql.trim() !== problem.starterSql.trim()) {
            updateStatus('in-progress')
          }
        }
      } finally {
        setIsRunning(false)
      }
    },
    [complete, problem.id, problem.starterSql, sql, updateStatus],
  )

  useKeyboardShortcut({
    onRunCode: () => {
      void runSql('run')
    },
  })

  const handleShowSolution = () => {
    if (showSolution) {
      return
    }

    const shouldContinue = window.confirm(
      '建议先独立完成并执行 SQL，再查看参考答案。是否继续查看？',
    )

    if (shouldContinue) {
      setShowSolution(true)
      viewSolution()
      setDetailTab('solution')
    }
  }

  const handleResetSql = () => {
    if (window.confirm('确定恢复初始 SQL 吗？当前 SQL 将被清除。')) {
      reset()
      setExecutionResult(null)
    }
  }

  const handleResetDatabase = async () => {
    const shouldReset = window.confirm(
      '确定将练习数据库恢复到 seed 初始状态吗？这会影响所有 MySQL 练习题的数据。',
    )

    if (!shouldReset) {
      return
    }

    setIsResettingDatabase(true)
    try {
      const result = await resetMysqlDatabase()

      if (result.success) {
        window.alert('数据库已恢复到初始状态。')
      } else {
        window.alert(result.error?.message ?? '数据库重置失败。')
      }
    } finally {
      setIsResettingDatabase(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/mysql"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              ← 返回 MySQL 题库
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{index + 1} / {total}</span>
              {previous ? (
                <Link
                  to={`/mysql/problem/${previous.id}`}
                  className="rounded-lg px-2 py-1 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  ← 上一题
                </Link>
              ) : null}
              {next ? (
                <Link
                  to={`/mysql/problem/${next.id}`}
                  className="rounded-lg px-2 py-1 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  下一题 →
                </Link>
              ) : null}
            </div>
          </div>

          <Panel className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  SQL Module
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {problem.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                  {problem.description}
                </p>
                <p className="mt-3 text-sm text-slate-500">{healthMessage}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={problem.difficulty} />
                <FrequencyStars frequency={problem.frequency} />
                <span className="inline-flex min-h-7 items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 text-xs font-medium text-slate-700">
                  {problem.chapter}
                </span>
                <StatusBadge status={status} />
              </div>
            </div>
          </Panel>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <Tabs
              value={detailTab}
              onChange={(nextTab) => {
                if (nextTab === 'solution' && !showSolution) {
                  handleShowSolution()
                  return
                }
                setDetailTab(nextTab)
              }}
              items={[
                { value: 'description', label: 'Description' },
                { value: 'schema', label: 'Schema' },
                { value: 'sample-data', label: 'Sample Data' },
                { value: 'solution', label: 'Solution' },
              ]}
            />

            <Panel className="mt-4 p-5 sm:p-6">
              {detailTab === 'description' ? (
                <div className="grid gap-6">
                  <section className="grid gap-3">
                    <SectionHeading title="题目要求" />
                    <div className="grid gap-3 text-sm leading-7 text-slate-600">
                      <p>{problem.description}</p>
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <SectionHeading title="Requirements" />
                    <ol className="grid gap-2 pl-5 text-sm leading-7 text-slate-600">
                      {problem.requirements.map((item) => (
                        <li key={item} className="list-decimal">
                          {item}
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="grid gap-3">
                    <SectionHeading title="Knowledge Points" />
                    <div className="flex flex-wrap gap-2">
                      {problem.knowledgePoints.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <SectionHeading
                      title="Database Background"
                      description="这道题会复用同一套互联网业务数据库中的相关表。"
                    />
                    <div className="flex flex-wrap gap-2">
                      {problem.relatedTables.map((tableName) => (
                        <span
                          key={tableName}
                          className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {tableName}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <SectionHeading title="Interview Tips" />
                    <ul className="grid gap-2 text-sm leading-7 text-slate-600">
                      {problem.interviewTips.map((item) => (
                        <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : null}

              {detailTab === 'schema' ? (
                <MysqlSchemaViewer tables={relatedSchemas} />
              ) : null}

              {detailTab === 'sample-data' ? (
                <MysqlSampleDataViewer tables={relatedSampleData} />
              ) : null}

              {detailTab === 'solution' ? (
                showSolution ? (
                  <div className="grid gap-6">
                    <SectionHeading title="Solution SQL" />
                    <pre>{problem.solutionSql}</pre>

                    <section className="grid gap-3">
                      <SectionHeading title="解题思路" />
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                        {problem.explanation}
                      </div>
                    </section>

                    <section className="grid gap-3">
                      <SectionHeading title="关键知识点" />
                      <div className="flex flex-wrap gap-2">
                        {problem.knowledgePoints.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className="grid gap-3">
                      <SectionHeading title="性能分析 / 面试追问" />
                      <ul className="grid gap-2 text-sm leading-7 text-slate-600">
                        {problem.interviewTips.map((item) => (
                          <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                ) : (
                  <EmptyState
                    title="建议先独立完成并执行 SQL"
                    description="参考答案会展示 Solution SQL、解题思路、知识点、性能分析和面试追问。"
                    action={
                      <Button variant="secondary" onClick={handleShowSolution}>
                        查看参考答案
                      </Button>
                    }
                  />
                )
              ) : null}
            </Panel>
          </div>

          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <Panel className="p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900">SQL Editor</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Cmd / Ctrl + Enter 执行 SQL
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button onClick={handleResetSql}>Reset</Button>
                    <Button
                      onClick={() => updateSql(formatSql(sql))}
                      variant="secondary"
                    >
                      Format SQL
                    </Button>
                    <Button onClick={() => void runSql('explain')} variant="secondary">
                      EXPLAIN
                    </Button>
                    <Button onClick={() => void runSql('run')} variant="primary" disabled={isRunning}>
                      {isRunning ? 'Running...' : 'Run SQL'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <CodeEditor
                  language="sql"
                  value={sql}
                  onChange={(nextSql) => {
                    updateSql(nextSql)
                    if (nextSql.trim() !== problem.starterSql.trim()) {
                      updateStatus('in-progress')
                    }
                  }}
                  height={typeof window !== 'undefined' && window.innerWidth < 1024 ? 360 : 520}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  onClick={() => void handleResetDatabase()}
                  disabled={isResettingDatabase}
                >
                  {isResettingDatabase ? '重置中...' : 'Reset Database'}
                </Button>
              </div>

              <div className="mt-5 grid gap-4">
                {executionResult ? (
                  executionResult.success ? (
                    <>
                      {executionResult.judgement ? (
                        <Panel
                          className={cn(
                            'p-4 text-sm',
                            executionResult.judgement.passed
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                              : 'border-amber-200 bg-amber-50 text-amber-700',
                          )}
                        >
                          <strong>
                            {executionResult.judgement.passed ? 'Passed' : 'Not Passed'}
                          </strong>
                          <p className="mt-2">{executionResult.judgement.message}</p>
                        </Panel>
                      ) : null}

                      <MysqlResultTable
                        columns={executionResult.columns}
                        rows={executionResult.rows}
                        rowCount={executionResult.rowCount}
                        executionTime={executionResult.executionTime}
                        truncated={executionResult.truncated}
                      />
                    </>
                  ) : (
                    <MysqlErrorPanel
                      message={executionResult.error.message}
                      code={executionResult.error.code}
                    />
                  )
                ) : (
                  <EmptyState
                    title="尚未执行 SQL"
                    description="在右侧编辑 SQL 后点击 Run SQL，即可查看真实数据库执行结果和自动判题状态。"
                  />
                )}
              </div>
            </Panel>
          </div>
        </section>
      </main>
    </div>
  )
}
