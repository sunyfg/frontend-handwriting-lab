import { cn } from '../../lib/utils'

export function ProgressBar({
  value,
  max,
  className,
}: {
  value: number
  max: number
  className?: string
}) {
  const percent = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100))

  return (
    <div
      className={cn(
        'h-2 overflow-hidden rounded-full bg-slate-200',
        className,
      )}
      aria-label="练习进度"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div
        className="h-full rounded-full bg-blue-600 transition-[width]"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
