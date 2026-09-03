import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'

export function ProblemNotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            404
          </p>
          <EmptyState
            title="Problem Not Found"
            description="这个题目的 problemId 不存在，可能是链接写错了，或者题目数据还没有接入。"
            action={
              <Link to="/">
                <Button variant="primary">返回题库</Button>
              </Link>
            }
          />
        </div>
      </main>
    </div>
  )
}
