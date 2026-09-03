import { Panel } from '../../../components/ui/Panel'

export function MysqlSampleDataViewer({
  tables,
}: {
  tables: Array<{ tableName: string; rows: Array<Record<string, unknown>> }>
}) {
  return (
    <div className="grid gap-4">
      {tables.map((table) => {
        const columns = Object.keys(table.rows[0] ?? {})

        return (
          <Panel key={table.tableName} className="overflow-hidden">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="text-base font-semibold text-slate-900">{table.tableName}</h3>
              <p className="mt-1 text-sm text-slate-500">示例数据帮助你快速理解字段含义。</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={`${table.tableName}-${column}`}
                        className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-700"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {table.rows.map((row, rowIndex) => (
                    <tr key={`${table.tableName}-${rowIndex}`}>
                      {columns.map((column) => (
                        <td key={`${table.tableName}-${rowIndex}-${column}`} className="px-4 py-3 text-slate-600">
                          {row[column] === null ? (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                              NULL
                            </span>
                          ) : (
                            String(row[column])
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )
      })}
    </div>
  )
}
