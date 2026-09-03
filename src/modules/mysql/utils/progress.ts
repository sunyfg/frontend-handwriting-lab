import type { MysqlProblem, MysqlProgress, MysqlProgressStatus } from '../types'

const PREFIX = 'mysql-lab'

function key(problemId: string, suffix: string) {
  return `${PREFIX}:${problemId}:${suffix}`
}

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function read(keyName: string) {
  if (!isBrowser()) {
    return null
  }

  return window.localStorage.getItem(keyName)
}

function write(keyName: string, value: string) {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(keyName, value)
}

function remove(keyName: string) {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(keyName)
}

function normalizeStatus(status: string | null): MysqlProgressStatus {
  if (status === 'in-progress' || status === 'completed') {
    return status
  }

  return 'not-started'
}

export function getMysqlProblemProgress(problem: MysqlProblem): MysqlProgress {
  return {
    problemId: problem.id,
    status: normalizeStatus(read(key(problem.id, 'status'))),
    sql: read(key(problem.id, 'sql')) ?? problem.starterSql,
    solutionViewed: read(key(problem.id, 'solutionViewed')) === 'true',
    lastUpdatedAt: Number(read(key(problem.id, 'updatedAt')) ?? 0),
  }
}

export function saveMysqlProblemSql(problem: MysqlProblem, sql: string) {
  write(key(problem.id, 'sql'), sql)
  write(
    key(problem.id, 'status'),
    sql.trim() === problem.starterSql.trim() ? 'not-started' : 'in-progress',
  )
  write(key(problem.id, 'updatedAt'), String(Date.now()))
}

export function setMysqlProblemStatus(problemId: string, status: MysqlProgressStatus) {
  write(key(problemId, 'status'), status)
  write(key(problemId, 'updatedAt'), String(Date.now()))
}

export function markMysqlProblemCompleted(problemId: string) {
  setMysqlProblemStatus(problemId, 'completed')
}

export function markMysqlSolutionViewed(problemId: string) {
  write(key(problemId, 'solutionViewed'), 'true')
  write(key(problemId, 'updatedAt'), String(Date.now()))
}

export function resetMysqlProblem(problem: MysqlProblem) {
  remove(key(problem.id, 'sql'))
  write(key(problem.id, 'status'), 'not-started')
  write(key(problem.id, 'updatedAt'), String(Date.now()))
}

export function getMysqlProblemStatus(problemId: string): MysqlProgressStatus {
  return normalizeStatus(read(key(problemId, 'status')))
}

export function getMysqlCompletedCount(problems: MysqlProblem[]) {
  return problems.filter((problem) => getMysqlProblemStatus(problem.id) === 'completed').length
}
