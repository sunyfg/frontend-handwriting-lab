import { Link } from 'react-router-dom'

export function ProblemNotFoundPage() {
  return (
    <div className="app-shell">
      <main className="layout-container problem-not-found">
        <div className="empty-state-card">
          <p className="eyebrow">404</p>
          <h1>Problem Not Found</h1>
          <p>这个题目的 problemId 不存在，可能是链接写错了，或者题目数据还没有接入。</p>
          <Link to="/" className="primary-button">
            返回题库
          </Link>
        </div>
      </main>
    </div>
  )
}
