import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CodeEditor } from '../components/CodeEditor'
import { CodeRunner } from '../components/CodeRunner'
import { DifficultyBadge } from '../components/DifficultyBadge'
import { FrequencyStars } from '../components/FrequencyStars'
import { Header } from '../components/Header'
import { TestResults } from '../components/TestResults'
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
    typeof window !== 'undefined' && window.innerWidth < 1024 ? 360 : 520

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
    <div className="app-shell">
      <Header />

      <main className="layout-container">
        <section className="detail-header">
          <div className="detail-header-top">
            <Link to="/" className="back-link">
              ← 返回题库
            </Link>
            <span className="detail-order">
              {index + 1} / {total}
            </span>
          </div>

          <div className="detail-title-row">
            <div>
              <h1>{problem.title}</h1>
              <div className="detail-meta">
                <DifficultyBadge difficulty={problem.difficulty} />
                <FrequencyStars frequency={problem.frequency} />
                <span className="meta-tag">{problem.categoryLabel}</span>
                <span className={`status-pill status-${status}`}>{status}</span>
              </div>
            </div>

            <div className="detail-nav-links">
              {previous ? (
                <Link to={`/problem/${previous.id}`}>← {previous.title}</Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={`/problem/${next.id}`}>{next.title} →</Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </section>

        <section className="detail-grid">
          <div className="detail-left">
            <div className="tab-list">
              <button
                type="button"
                className={detailTab === 'description' ? 'active' : ''}
                onClick={() => setDetailTab('description')}
              >
                Description
              </button>
              <button
                type="button"
                className={detailTab === 'examples' ? 'active' : ''}
                onClick={() => setDetailTab('examples')}
              >
                Examples
              </button>
              <button
                type="button"
                className={detailTab === 'solution' ? 'active' : ''}
                onClick={() => {
                  if (!showSolution) {
                    handleShowSolution()
                    return
                  }
                  setDetailTab('solution')
                }}
              >
                Solution
              </button>
            </div>

            <section className="content-card">
              {detailTab === 'description' ? (
                <div className="content-stack">
                  <div>
                    <h2>题目描述</h2>
                    {problem.description.split('\n\n').map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div>
                    <h3>函数签名</h3>
                    <pre>{renderFunctionSignature(problem)}</pre>
                  </div>

                  <div>
                    <h3>要求</h3>
                    <ol className="plain-list">
                      {problem.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3>知识点</h3>
                    <div className="tag-list">
                      {problem.knowledgePoints.map((item) => (
                        <span key={item} className="meta-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {problem.interviewTips?.length ? (
                    <div>
                      <h3>面试提示</h3>
                      <ul className="plain-list">
                        {problem.interviewTips.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {detailTab === 'examples' ? (
                <div className="content-stack">
                  <h2>Usage Examples</h2>
                  {problem.usageExamples.map((example) => (
                    <article
                      key={`${problem.id}-${example.title}`}
                      className="example-card"
                    >
                      {example.title ? <h3>{example.title}</h3> : null}
                      {example.description ? (
                        <p>{example.description}</p>
                      ) : null}
                      <pre>{example.code}</pre>
                    </article>
                  ))}
                </div>
              ) : null}

              {detailTab === 'solution' ? (
                showSolution ? (
                  <div className="content-stack">
                    <div className="solution-header">
                      <h2>参考答案</h2>
                    </div>

                    <pre>{problem.solutionCode}</pre>

                    <div>
                      <h3>解题思路</h3>
                      <ul className="plain-list">
                        {problem.solutionDetail.approach.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="solution-meta-grid">
                      <div>
                        <h3>时间复杂度</h3>
                        <p>{problem.solutionDetail.timeComplexity}</p>
                      </div>
                      <div>
                        <h3>空间复杂度</h3>
                        <p>{problem.solutionDetail.spaceComplexity}</p>
                      </div>
                    </div>

                    <div>
                      <h3>常见错误</h3>
                      <ul className="plain-list">
                        {problem.solutionDetail.commonMistakes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3>面试追问</h3>
                      <ul className="plain-list">
                        {problem.solutionDetail.followUps.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>建议先自己完成题目并运行测试，再查看参考答案。</p>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={handleShowSolution}
                    >
                      Show Solution
                    </button>
                  </div>
                )
              ) : null}
            </section>
          </div>

          <div className="detail-right">
            <section className="content-card editor-card">
              <div className="editor-toolbar">
                <div>
                  <h2>Code</h2>
                  <p className="shortcut-text">
                    ⌘ / Ctrl + Enter Run，⌘ / Ctrl + Shift + Enter Test
                  </p>
                </div>

                <div className="toolbar-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={handleResetCode}
                  >
                    重置代码
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={handleRunCode}
                    disabled={isRunningCode}
                  >
                    {isRunningCode ? '运行中...' : '▶ 运行代码'}
                  </button>
                  <button
                    type="button"
                    className="primary-button"
                    onClick={handleRunTests}
                    disabled={isRunningTests || !problem.testCases?.length}
                  >
                    {isRunningTests ? '测试中...' : '✓ 运行测试'}
                  </button>
                </div>
              </div>

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
            </section>

            <section className="content-card">
              <div className="tab-list tab-list-inline">
                <button
                  type="button"
                  className={outputTab === 'run' ? 'active' : ''}
                  onClick={() => setOutputTab('run')}
                >
                  Console
                </button>
                <button
                  type="button"
                  className={outputTab === 'tests' ? 'active' : ''}
                  onClick={() => setOutputTab('tests')}
                >
                  Tests
                </button>
              </div>

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
            </section>
          </div>
        </section>

        <section className="detail-footer-links">
          {previous ? (
            <Link to={`/problem/${previous.id}`} className="footer-nav-card">
              <span>上一题</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/problem/${next.id}`}
              className="footer-nav-card align-right"
            >
              <span>下一题</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <div />
          )}
        </section>
      </main>
    </div>
  )
}
