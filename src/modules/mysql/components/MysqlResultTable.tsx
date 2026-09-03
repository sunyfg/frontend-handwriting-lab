import { Panel } from '../../../components/ui/Panel'

function formatCellValue(value: unknown) {
  if (value === null) {
    return <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">NULL</span>
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

export function MysqlResultTable({
  columns,
  rows,
  rowCount,
  executionTime,
  truncated,
}: {
  columns: string[]
  rows: Array<Record<string, unknown>>
  rowCount: number
  executionTime: number
  truncated: boolean
}) {
  return (
    <Panel className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <strong className="text-sm text-slate-900">Query Result</strong>
        <div className="text-xs text-slate-500">
          {rowCount} rows · {executionTime} ms {truncated ? '· 已截断' : ''}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`} className="align-top">
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column}`} className="px-4 py-3 text-slate-600">
                    {formatCellValue(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
