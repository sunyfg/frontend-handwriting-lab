import type { Problem, ProblemProgress, ProblemStatus } from '../data/problems/types'

const CODE_KEY_PREFIX = 'handwriting-lab'

function buildCodeKey(problemId: string) {
  return `${CODE_KEY_PREFIX}:${problemId}:code`
}

function buildStatusKey(problemId: string) {
  return `${CODE_KEY_PREFIX}:${problemId}:status`
}

function buildSolutionViewedKey(problemId: string) {
  return `${CODE_KEY_PREFIX}:${problemId}:solution-viewed`
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readStorage(key: string): string | null {
  if (!isBrowser()) {
    return null
  }

  return window.localStorage.getItem(key)
}

function writeStorage(key: string, value: string) {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(key, value)
}

function removeStorage(key: string) {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(key)
}

function normalizeStatus(status: string | null): ProblemStatus {
  if (status === 'in-progress' || status === 'completed') {
    return status
  }

  return 'not-started'
}

export function getProblemProgress(problem: Problem): ProblemProgress {
  const savedCode = readStorage(buildCodeKey(problem.id))
  const status = normalizeStatus(readStorage(buildStatusKey(problem.id)))
  const solutionViewed = readStorage(buildSolutionViewedKey(problem.id)) === 'true'

  return {
    problemId: problem.id,
    status,
    code: savedCode ?? problem.starterCode,
    solutionViewed,
    lastUpdatedAt: Number(readStorage(`${CODE_KEY_PREFIX}:${problem.id}:updated-at`) ?? 0),
  }
}

export function saveProblemCode(problem: Problem, code: string) {
  writeStorage(buildCodeKey(problem.id), code)

  const nextStatus: ProblemStatus =
    code === problem.starterCode ? 'not-started' : 'in-progress'

  writeStorage(buildStatusKey(problem.id), nextStatus)
  writeStorage(`${CODE_KEY_PREFIX}:${problem.id}:updated-at`, String(Date.now()))
}

export function setProblemStatus(problemId: string, status: ProblemStatus) {
  writeStorage(buildStatusKey(problemId), status)
  writeStorage(`${CODE_KEY_PREFIX}:${problemId}:updated-at`, String(Date.now()))
}

export function markProblemCompleted(problemId: string) {
  setProblemStatus(problemId, 'completed')
}

export function markSolutionViewed(problemId: string) {
  writeStorage(buildSolutionViewedKey(problemId), 'true')
  writeStorage(`${CODE_KEY_PREFIX}:${problemId}:updated-at`, String(Date.now()))
}

export function resetProblem(problem: Problem) {
  removeStorage(buildCodeKey(problem.id))
  writeStorage(buildStatusKey(problem.id), 'not-started')
  writeStorage(`${CODE_KEY_PREFIX}:${problem.id}:updated-at`, String(Date.now()))
}

export function getCompletedProblemCount(problems: Problem[]) {
  return problems.filter(
    (problem) => normalizeStatus(readStorage(buildStatusKey(problem.id))) === 'completed',
  ).length
}

export function getProblemStatus(problemId: string): ProblemStatus {
  return normalizeStatus(readStorage(buildStatusKey(problemId)))
}
