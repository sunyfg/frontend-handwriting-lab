import './index.css'
import { problemBank } from './problem-bank'

const categoryOrder = [
  'javascript',
  'function',
  'object',
  'array',
  'async',
  'browser',
  'algorithm',
  'react',
] as const

function App() {
  const grouped = categoryOrder
    .map((category) => {
      const items = problemBank.filter((problem) => problem.category === category)
      return {
        key: category,
        label: items[0]?.categoryLabel ?? category,
        items,
      }
    })
    .filter((group) => group.items.length > 0)

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Frontend Handwriting Lab</p>
        <h1>前端面试高频手写题练习库</h1>
        <p className="hero-text">
          题目、测试、参考答案和知识点索引都已经预置好了。推荐先从
          <code> src/problems </code>
          开始，自己实现后再跑测试复盘。
        </p>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label">总题数</span>
            <strong>{problemBank.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">分类数</span>
            <strong>{grouped.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">练习建议</span>
            <strong>先写再看答案</strong>
          </div>
        </div>
      </section>

      <section className="section">
        {grouped.map((group) => (
          <div key={group.key} className="category-block">
            <div className="category-header">
              <h2>{group.label}</h2>
              <span>{group.items.length} 题</span>
            </div>

            <div className="card-grid">
              {group.items.map((problem) => (
                <article key={problem.slug} className="problem-card">
                  <div className="problem-meta">
                    <span className="badge">{problem.difficulty}</span>
                    <span className="badge subtle">{problem.frequency}</span>
                  </div>
                  <h3>{problem.title}</h3>
                  <p className="summary">{problem.summary}</p>
                  <dl className="meta-list">
                    <div>
                      <dt>分类</dt>
                      <dd>{problem.categoryLabel}</dd>
                    </div>
                    <div>
                      <dt>建议时间</dt>
                      <dd>{problem.suggestedMinutes} 分钟</dd>
                    </div>
                    <div>
                      <dt>考察点</dt>
                      <dd>{problem.points.join(' / ')}</dd>
                    </div>
                  </dl>
                  <div className="path-row">
                    <code>{problem.problemPath}</code>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default App

