import { useCallback, useEffect, useMemo, useState } from 'react'
import type { MysqlProblem, MysqlProgressStatus } from '../types'
import {
  getMysqlProblemProgress,
  markMysqlProblemCompleted,
  markMysqlSolutionViewed,
  resetMysqlProblem,
  saveMysqlProblemSql,
  setMysqlProblemStatus,
} from '../utils/progress'

export function useMysqlProgress(problem: MysqlProblem) {
  const [progress, setProgress] = useState(() => getMysqlProblemProgress(problem))

  useEffect(() => {
    setProgress(getMysqlProblemProgress(problem))
  }, [problem])

  const updateSql = useCallback(
    (sql: string) => {
      saveMysqlProblemSql(problem, sql)
      setProgress(getMysqlProblemProgress(problem))
    },
    [problem],
  )

  const updateStatus = useCallback((status: MysqlProgressStatus) => {
    setMysqlProblemStatus(problem.id, status)
    setProgress(getMysqlProblemProgress(problem))
  }, [problem.id])

  const complete = useCallback(() => {
    markMysqlProblemCompleted(problem.id)
    setProgress(getMysqlProblemProgress(problem))
  }, [problem.id])

  const reset = useCallback(() => {
    resetMysqlProblem(problem)
    setProgress(getMysqlProblemProgress(problem))
  }, [problem])

  const viewSolution = useCallback(() => {
    markMysqlSolutionViewed(problem.id)
    setProgress(getMysqlProblemProgress(problem))
  }, [problem.id])

  return useMemo(
    () => ({
      progress,
      sql: progress.sql,
      status: progress.status,
      solutionViewed: progress.solutionViewed,
      updateSql,
      updateStatus,
      complete,
      reset,
      viewSolution,
    }),
    [complete, progress, reset, updateSql, updateStatus, viewSolution],
  )
}
