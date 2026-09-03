export type ProblemCategory =
  | 'javascript'
  | 'function'
  | 'array'
  | 'object'
  | 'async'
  | 'browser'
  | 'algorithm'
  | 'react'

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard'

export type ProblemStatus = 'not-started' | 'in-progress' | 'completed'

export type ProblemFrequency = 3 | 4 | 5

export interface UsageExample {
  title?: string
  code: string
  description?: string
}

export interface SolutionDetail {
  approach: string[]
  timeComplexity: string
  spaceComplexity: string
  commonMistakes: string[]
  followUps: string[]
}

export interface TestHelpers {
  equal(actual: unknown, expected: unknown, message?: string): void
  deepEqual(actual: unknown, expected: unknown, message?: string): void
  ok(value: unknown, message?: string): void
  sleep(ms: number): Promise<void>
}

export interface ProblemTestCaseContext {
  exports: Record<string, unknown>
  helpers: TestHelpers
}

export interface ProblemTestCase {
  name: string
  description?: string
  run(context: ProblemTestCaseContext): void | Promise<void>
}

export interface Problem {
  id: string
  title: string
  category: ProblemCategory
  categoryLabel: string
  difficulty: ProblemDifficulty
  frequency: ProblemFrequency
  description: string
  summary: string
  requirements: string[]
  knowledgePoints: string[]
  interviewTips?: string[]
  starterCode: string
  solutionCode: string
  solutionDetail: SolutionDetail
  usageExamples: UsageExample[]
  testCases?: ProblemTestCase[]
  estimatedMinutes?: number
  starterPath: string
  solutionPath: string
  legacySlug: string
  runCodeSnippet?: string
}

export interface ProblemProgress {
  problemId: string
  status: ProblemStatus
  code: string
  solutionViewed: boolean
  lastUpdatedAt: number
}
