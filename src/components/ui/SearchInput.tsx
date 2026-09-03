import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
        搜索
      </span>
      <input
        className={cn(
          'h-11 w-full rounded-xl border border-slate-200 bg-white pl-14 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100',
          className,
        )}
        {...props}
      />
    </div>
  )
}
