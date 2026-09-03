import { Badge } from './ui/Badge'

export function FrequencyStars({ frequency }: { frequency: 3 | 4 | 5 }) {
  return (
    <Badge className="border-slate-200 bg-slate-100 text-slate-600">
      {'★'.repeat(frequency)}
    </Badge>
  )
}
