import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 border-b border-slate-200/80 bg-slate-50/95 backdrop-blur',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <Link
            to="/"
            className="text-base font-semibold tracking-tight text-slate-900 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Frontend Handwriting Lab
          </Link>
          <p className="mt-1 text-sm text-slate-500">前端面试高频手写题训练</p>
        </div>
      </div>
    </header>
  )
}
