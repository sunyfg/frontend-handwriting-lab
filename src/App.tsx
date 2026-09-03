import { Navigate, Route, Routes } from 'react-router-dom'
import { MysqlHomePage } from './modules/mysql/pages/MysqlHomePage'
import { MysqlProblemPage } from './modules/mysql/pages/MysqlProblemPage'
import { HomePage } from './pages/HomePage'
import { ProblemDetailPage } from './pages/ProblemDetailPage'
import { ProblemNotFoundPage } from './pages/ProblemNotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problem/:problemId" element={<ProblemDetailPage />} />
      <Route path="/mysql" element={<MysqlHomePage />} />
      <Route path="/mysql/problem/:problemId" element={<MysqlProblemPage />} />
      <Route path="/not-found" element={<ProblemNotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}

export default App
