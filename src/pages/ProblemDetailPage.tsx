import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CodeEditor } from '../components/CodeEditor'
import { CodeRunner } from '../components/CodeRunner'
import { DifficultyBadge } from '../components/DifficultyBadge'
import { FrequencyStars } from '../components/FrequencyStars'
import { Header } from '../components/Header'
import { StatusBadge } from '../components/StatusBadge'
import { TestResults } from '../components/TestResults'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { Panel } from '../components/ui/Panel'
import { Tabs } from '../components/ui/Tabs'
import { getAdjacentProblems, getProblemById } from '../data/problems'
import type { Problem } from '../data/problems/types'
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut'
import { useProblemProgress } from '../hooks/useProblemProgress'
import { executeProblemPreview } from '../runner/execute'
import type { ExecuteResult } from '../runner/execute'
import { runProblemTests } from '../runner/testRunner'
import type { TestRunResult } from '../runner/testRunner'
import { ProblemNotFoundPage } from './ProblemNotFoundPage'

type DetailTab = 'description' | 'examples' | 'solution'
type OutputTab = 'run' | 'tests'

function renderFunctionSignature(problem: Problem) {
  return problem.starterCode.trim().split('\n').slice(0, 6).join('\n')
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
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
        {title}
      </h3>
      {description ? (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  )
}

export function ProblemDetailPage() {
  const { problemId } = useParams<{ problemId: string }>()
  const problem = problemId ? getProblemById(problemId) : undefined

  if (!problem) {
    return <ProblemNotFoundPage />
  }

  return <ProblemDetail problem={problem} />
}

function ProblemDetail({ problem }: { problem: Problem }) {
  const { previous, next, index, total } = useMemo(
    () => getAdjacentProblems(problem.id),
    [problem.id],
  )
  const {
    code,
    status,
    solutionViewed,
    updateCode,
    updateStatus,
    complete,
    reset,
    viewSolution,
  } = useProblemProgress(problem)

  const [detailTab, setDetailTab] = useState<DetailTab>('description')
  const [outputTab, setOutputTab] = useState<OutputTab>('run')
  const [executeResult, setExecuteResult] = useState<
    (ExecuteResult & { returnValue?: string }) | null
  >(null)
  const [testResult, setTestResult] = useState<TestRunResult | null>(null)
  const [isRunningCode, setIsRunningCode] = useState(false)
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [showSolution, setShowSolution] = useState(solutionViewed)

  useEffect(() => {
    setShowSolution(solutionViewed)
    setExecuteResult(null)
    setTestResult(null)
    setDetailTab('description')
    setOutputTab('run')
  }, [problem.id, solutionViewed])

  const editorHeight =
    typeof window !== 'undefined' && window.innerWidth < 1024 ? 360 : 560

  const handleRunCode = useCallback(async () => {
    setOutputTab('run')
    setIsRunningCode(true)

    try {
      const result = await executeProblemPreview(code, problem.runCodeSnippet)
      setExecuteResult(result)
    } finally {
      setIsRunningCode(false)
    }
  }, [code, problem.runCodeSnippet])

  const handleRunTests = useCallback(async () => {
    setOutputTab('tests')
    setIsRunningTests(true)

    try {
      const result = await runProblemTests(code, problem.testCases ?? [])
      setTestResult(result)

      if (result.allPassed) {
        complete()
      } else if (code !== problem.starterCode) {
        updateStatus('in-progress')
      }
    } finally {
      setIsRunningTests(false)
    }
  }, [code, complete, problem.starterCode, problem.testCases, updateStatus])

  useKeyboardShortcut({
    onRunCode: handleRunCode,
    onRunTests: handleRunTests,
  })

  const handleResetCode = () => {
    if (window.confirm('确定恢复初始代码吗？当前代码将被清除。')) {
      reset()
      setExecuteResult(null)
      setTestResult(null)
    }
  }

  const handleShowSolution = () => {
    if (showSolution) {
      return
    }

    const shouldContinue = window.confirm(
      '建议先独立完成并运行测试，再查看参考答案。是否继续查看？',
    )

    if (shouldContinue) {
      setShowSolution(true)
      viewSolution()
      setDetailTab('solution')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              ← 返回题库
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>
                {index + 1} / {total}
              </span>
              {previous ? (
                <Link
                  to={`/problem/${previous.id}`}
                  className="rounded-lg px-2 py-1 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  ← 上一题
                </Link>
              ) : null}
              {next ? (
                <Link
                  to={`/problem/${next.id}`}
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
                  Problem Detail
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {problem.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                  {problem.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <DifficultyBadge difficulty={problem.difficulty} />
                <FrequencyStars frequency={problem.frequency} />
                <span className="inline-flex min-h-7 items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 text-xs font-medium text-slate-700">
                  {problem.categoryLabel}
                </span>
                <StatusBadge status={status} />
              </div>
            </div>
          </Panel>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
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
                { value: 'examples', label: 'Examples' },
                { value: 'solution', label: 'Solution' },
              ]}
            />

            <Panel className="mt-4 p-5 sm:p-6">
              {detailTab === 'description' ? (
                <div className="grid gap-6">
                  <section className="grid gap-3">
                    <SectionHeading title="Description" />
                    <div className="grid gap-3 text-sm leading-7 text-slate-600">
                      {problem.description.split('\n\n').map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section className="grid gap-3">
                    <SectionHeading title="Function Signature" />
                    <pre>{renderFunctionSignature(problem)}</pre>
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

                  {problem.interviewTips?.length ? (
                    <section className="grid gap-3">
                      <SectionHeading title="Interview Tips" />
                      <ul className="grid gap-2 text-sm leading-7 text-slate-600">
                        {problem.interviewTips.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>
              ) : null}

              {detailTab === 'examples' ? (
                <div className="grid gap-4">
                  <SectionHeading
                    title="Usage Examples"
                    description="这些案例帮助你把手写题和真实前端开发场景连起来。"
                  />
                  {problem.usageExamples.map((example) => (
                    <article
                      key={`${problem.id}-${example.title ?? example.code}`}
                      className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      {example.title ? (
                        <h3 className="text-base font-semibold text-slate-900">
                          {example.title}
                        </h3>
                      ) : null}
                      {example.description ? (
                        <p className="text-sm leading-6 text-slate-500">
                          {example.description}
                        </p>
                      ) : null}
                      <pre>{example.code}</pre>
                    </article>
                  ))}
                </div>
              ) : null}

              {detailTab === 'solution' ? (
                showSolution ? (
                  <div className="grid gap-6">
                    <SectionHeading title="Solution" />
                    <pre>{problem.solutionCode}</pre>

                    <section className="grid gap-3">
                      <SectionHeading title="解题思路" />
                      <ul className="grid gap-2 text-sm leading-7 text-slate-600">
                        {problem.solutionDetail.approach.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Panel className="bg-slate-50 p-4">
                        <SectionHeading title="时间复杂度" />
                        <p className="mt-2 text-sm text-slate-600">
                          {problem.solutionDetail.timeComplexity}
                        </p>
                      </Panel>
                      <Panel className="bg-slate-50 p-4">
                        <SectionHeading title="空间复杂度" />
                        <p className="mt-2 text-sm text-slate-600">
                          {problem.solutionDetail.spaceComplexity}
                        </p>
                      </Panel>
                    </div>

                    <section className="grid gap-3">
                      <SectionHeading title="常见错误" />
                      <ul className="grid gap-2 text-sm leading-7 text-slate-600">
                        {problem.solutionDetail.commonMistakes.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl border border-red-100 bg-red-50 px-4 py-3"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="grid gap-3">
                      <SectionHeading title="面试追问" />
                      <ul className="grid gap-2 text-sm leading-7 text-slate-600">
                        {problem.solutionDetail.followUps.map((item) => (
                          <li
                            key={item}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                ) : (
                  <EmptyState
                    title="建议先独立完成并运行测试"
                    description="参考答案会包含完整代码、解题思路、复杂度、常见错误和面试追问。"
                    action={
                      <Button variant="secondary" onClick={handleShowSolution}>
                        Show Solution
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
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                      Code
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      ⌘ / Ctrl + Enter Run，⌘ / Ctrl + Shift + Enter Test
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button onClick={handleResetCode}>Reset</Button>
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunningCode}
                      variant="secondary"
                    >
                      {isRunningCode ? 'Running...' : '▶ Run'}
                    </Button>
                    <Button
                      onClick={handleRunTests}
                      disabled={isRunningTests || !problem.testCases?.length}
                      variant="primary"
                    >
                      {isRunningTests ? 'Testing...' : '✓ Run Tests'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <CodeEditor
                  value={code}
                  onChange={(nextCode) => {
                    updateCode(nextCode)
                    if (nextCode !== problem.starterCode) {
                      updateStatus('in-progress')
                    }
                  }}
                  height={editorHeight}
                />
              </div>

              <div className="mt-5">
                <Tabs
                  value={outputTab}
                  onChange={setOutputTab}
                  items={[
                    { value: 'run', label: 'Console' },
                    { value: 'tests', label: 'Tests' },
                  ]}
                />

                <div className="mt-4">
                  {outputTab === 'run' ? (
                    <CodeRunner
                      {...(executeResult ?? {
                        consoleEntries: [],
                        compileErrors: [],
                      })}
                    />
                  ) : (
                    <TestResults result={testResult} />
                  )}
                </div>
              </div>
            </Panel>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          {previous ? (
            <Link
              to={`/problem/${previous.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                上一题
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {previous.title}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/problem/${next.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-right shadow-card transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                下一题
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </section>
      </main>
    </div>
  )
}
