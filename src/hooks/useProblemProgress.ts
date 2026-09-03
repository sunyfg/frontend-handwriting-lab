import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  Problem,
  ProblemProgress,
  ProblemStatus,
} from '../data/problems/types'
import {
  getProblemProgress,
  markProblemCompleted,
  markSolutionViewed,
  resetProblem,
  saveProblemCode,
  setProblemStatus,
} from '../utils/progress'

export function useProblemProgress(problem: Problem) {
  const [progress, setProgress] = useState<ProblemProgress>(() =>
    getProblemProgress(problem),
  )

  useEffect(() => {
    setProgress(getProblemProgress(problem))
  }, [problem])

  const updateCode = useCallback(
    (code: string) => {
      saveProblemCode(problem, code)
      setProgress(getProblemProgress(problem))
    },
    [problem],
  )

  const updateStatus = useCallback(
    (status: ProblemStatus) => {
      setProblemStatus(problem.id, status)
      setProgress(getProblemProgress(problem))
    },
    [problem],
  )

  const complete = useCallback(() => {
    markProblemCompleted(problem.id)
    setProgress(getProblemProgress(problem))
  }, [problem])

  const reset = useCallback(() => {
    resetProblem(problem)
    setProgress(getProblemProgress(problem))
  }, [problem])

  const viewSolution = useCallback(() => {
    markSolutionViewed(problem.id)
    setProgress(getProblemProgress(problem))
  }, [problem])

  return useMemo(
    () => ({
      progress,
      code: progress.code,
      status: progress.status,
      solutionViewed: progress.solutionViewed,
      updateCode,
      updateStatus,
      complete,
      reset,
      viewSolution,
    }),
    [complete, progress, reset, updateCode, updateStatus, viewSolution],
  )
}
