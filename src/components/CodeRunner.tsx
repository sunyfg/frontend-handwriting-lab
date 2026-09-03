import type { ExecuteResult } from '../runner/execute'

export function CodeRunner({
  compileErrors,
  runtimeError,
  consoleEntries,
  returnValue,
}: Partial<ExecuteResult> & { returnValue?: string }) {
  return (
    <section className="output-panel">
      <div className="output-section">
        <h3>运行结果</h3>
        {compileErrors && compileErrors.length > 0 ? (
          <div className="output-error">
            <strong>Compile Errors</strong>
            <ul>
              {compileErrors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {runtimeError ? (
          <div className="output-error">
            <strong>Runtime Error</strong>
            <p>{runtimeError}</p>
          </div>
        ) : null}

        <div className="console-panel">
          <strong>Console</strong>
          {consoleEntries && consoleEntries.length > 0 ? (
            <ul>
              {consoleEntries.map((entry, index) => (
                <li key={`${entry.type}-${index}`} className={`console-${entry.type}`}>
                  {entry.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted-text">运行后会在这里显示 console 输出。</p>
          )}
        </div>

        {returnValue ? (
          <div className="return-panel">
            <strong>Return Value</strong>
            <pre>{returnValue}</pre>
          </div>
        ) : null}
      </div>
    </section>
  )
}
