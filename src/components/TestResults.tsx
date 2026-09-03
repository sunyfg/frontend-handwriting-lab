import type { TestRunResult } from '../runner/testRunner'

export function TestResults({ result }: { result: TestRunResult | null }) {
  return (
    <section className="output-panel">
      <div className="output-section">
        <h3>Test Results</h3>

        {!result ? (
          <p className="muted-text">点击“运行测试”后在这里查看浏览器中的轻量测试结果。</p>
        ) : null}

        {result?.compileErrors.length ? (
          <div className="output-error">
            <strong>Compile Errors</strong>
            <ul>
              {result.compileErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {result?.runtimeError ? (
          <div className="output-error">
            <strong>Runtime Error</strong>
            <p>{result.runtimeError}</p>
          </div>
        ) : null}

        {result ? (
          <>
            <div className="test-summary">
              <strong>
                {result.passedCount} / {result.totalCount} Passed
              </strong>
              {result.allPassed ? <span className="status-pill status-completed">All tests passed</span> : null}
            </div>

            <ul className="test-list">
              {result.items.map((item) => (
                <li key={item.name} className={`test-item ${item.passed ? 'passed' : 'failed'}`}>
                  <div className="test-item-title">
                    <span>{item.passed ? '✓' : '✗'}</span>
                    <strong>{item.name}</strong>
                  </div>
                  {item.description ? <p>{item.description}</p> : null}
                  {item.error ? <pre>{item.error}</pre> : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  )
}
