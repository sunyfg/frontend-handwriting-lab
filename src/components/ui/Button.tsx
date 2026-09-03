import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md'

const variantClassNameMap: Record<ButtonVariant, string> = {
  primary:
    'border-blue-600 bg-blue-600 text-white hover:border-blue-700 hover:bg-blue-700 active:bg-blue-800',
  secondary:
    'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100',
  ghost:
    'border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 active:bg-slate-200',
  danger:
    'border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 active:bg-red-800',
}

const sizeClassNameMap: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leading?: ReactNode
}

export function Button({
  className,
  variant = 'secondary',
  size = 'md',
  leading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClassNameMap[variant],
        sizeClassNameMap[size],
        className,
      )}
      {...props}
    >
      {leading}
      {children}
    </button>
  )
}
