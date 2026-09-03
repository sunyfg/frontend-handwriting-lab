import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <div>
        <Link to="/" className="brand-link">
          Frontend Handwriting Lab
        </Link>
        <p className="brand-subtitle">前端面试高频手写题训练</p>
      </div>
    </header>
  )
}
