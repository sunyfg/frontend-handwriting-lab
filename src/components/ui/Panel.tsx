import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function Panel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white shadow-card',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
