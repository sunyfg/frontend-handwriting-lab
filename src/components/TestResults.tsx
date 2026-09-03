import type { TestRunResult } from '../runner/testRunner'
import { Badge } from './ui/Badge'
import { Panel } from './ui/Panel'

export function TestResults({ result }: { result: TestRunResult | null }) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Test Results</h3>
        {result ? (
          <span className="text-xs text-slate-400">
            {result.passedCount} / {result.totalCount} Passed
          </span>
        ) : null}
      </div>

      {!result ? (
        <Panel className="p-5">
          <p className="text-sm text-slate-500">
            点击“运行测试”后在这里查看浏览器中的轻量测试结果。
          </p>
        </Panel>
      ) : null}

      {result?.compileErrors.length ? (
        <Panel className="border-red-200 bg-red-50 p-4 text-red-700">
          <strong>Compile Errors</strong>
          <ul className="mt-2 grid gap-1 text-sm">
            {result.compileErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Panel>
      ) : null}

      {result?.runtimeError ? (
        <Panel className="border-red-200 bg-red-50 p-4 text-red-700">
          <strong>Runtime Error</strong>
          <p className="mt-2 text-sm">{result.runtimeError}</p>
        </Panel>
      ) : null}

      {result ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <strong className="text-sm text-slate-900">
              {result.passedCount} / {result.totalCount} Passed
            </strong>
            {result.allPassed ? (
              <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
                All tests passed
              </Badge>
            ) : null}
          </div>

          <ul className="grid gap-3">
            {result.items.map((item) => (
              <li
                key={item.name}
                className={`rounded-2xl border p-4 ${
                  item.passed
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      item.passed ? 'text-emerald-700' : 'text-red-700'
                    }
                  >
                    {item.passed ? '✓' : '✗'}
                  </span>
                  <strong>{item.name}</strong>
                </div>
                {item.description ? (
                  <p className="mt-2 text-sm text-slate-600">
                    {item.description}
                  </p>
                ) : null}
                {item.error ? <pre>{item.error}</pre> : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}
