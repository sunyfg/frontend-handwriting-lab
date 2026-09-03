import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface TabItem<TValue extends string> {
  value: TValue
  label: ReactNode
}

interface TabsProps<TValue extends string> {
  value: TValue
  items: TabItem<TValue>[]
  onChange: (value: TValue) => void
}

export function Tabs<TValue extends string>({
  value,
  items,
  onChange,
}: TabsProps<TValue>) {
  return (
    <div className="inline-flex w-full gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100/80 p-1">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={cn(
            'inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            value === item.value
              ? 'bg-white text-slate-900 shadow-soft'
              : 'text-slate-500 hover:bg-white/80 hover:text-slate-700',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
