import { Panel } from '../../../components/ui/Panel'
import type { MysqlTableSchema } from '../types'

export function MysqlSchemaViewer({ tables }: { tables: MysqlTableSchema[] }) {
  return (
    <div className="grid gap-4">
      {tables.map((table) => (
        <Panel key={table.name} className="overflow-hidden">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-base font-semibold text-slate-900">{table.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{table.description}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">字段</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">类型</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {table.columns.map((column) => (
                  <tr key={`${table.name}-${column.name}`}>
                    <td className="px-4 py-3 text-slate-700">{column.name}</td>
                    <td className="px-4 py-3 text-slate-600">{column.type}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {[
                        column.primaryKey ? 'PK' : null,
                        column.nullable ? 'NULLABLE' : 'NOT NULL',
                        column.foreignKey ? `FK -> ${column.foreignKey}` : null,
                      ]
                        .filter(Boolean)
                        .join(' / ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      ))}
    </div>
  )
}
