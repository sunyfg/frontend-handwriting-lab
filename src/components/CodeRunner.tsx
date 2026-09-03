import type { ExecuteResult } from '../runner/execute'
import { Panel } from './ui/Panel'

export function CodeRunner({
  compileErrors,
  runtimeError,
  consoleEntries,
  returnValue,
}: Partial<ExecuteResult> & { returnValue?: string }) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">运行结果</h3>
        <span className="text-xs text-slate-400">Console / Runtime</span>
      </div>

        {compileErrors && compileErrors.length > 0 ? (
        <Panel className="border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Compile Errors</strong>
          <ul className="mt-2 grid gap-1 text-sm">
              {compileErrors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
        </Panel>
        ) : null}

        {runtimeError ? (
        <Panel className="border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Runtime Error</strong>
          <p className="mt-2 text-sm">{runtimeError}</p>
        </Panel>
        ) : null}

      <Panel className="overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-3">
          <strong className="text-sm text-slate-900">Console</strong>
        </div>
        <div className="bg-slate-950 px-4 py-4 text-sm text-slate-100">
          {consoleEntries && consoleEntries.length > 0 ? (
            <ul className="grid gap-2">
              {consoleEntries.map((entry, index) => (
                  <li
                    key={`${entry.type}-${index}`}
                    className={
                      entry.type === 'error' ? 'text-red-300' : 'text-slate-100'
                    }
                  >
                  {entry.message}
                </li>
              ))}
            </ul>
          ) : (
              <p className="text-slate-400">运行后会在这里显示 console 输出。</p>
          )}
        </div>
      </Panel>

        {returnValue ? (
        <Panel className="overflow-hidden">
          <div className="border-b border-slate-200 px-4 py-3">
            <strong className="text-sm text-slate-900">Return Value</strong>
          </div>
          <pre>{returnValue}</pre>
        </Panel>
        ) : null}
    </div>
  )
}
