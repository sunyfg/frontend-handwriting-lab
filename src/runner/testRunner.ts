import type { ProblemTestCase, TestHelpers } from '../data/problems/types'
import { executeUserCode } from './execute'

export interface TestResultItem {
  name: string
  description?: string
  passed: boolean
  error?: string
}

export interface TestRunResult {
  items: TestResultItem[]
  passedCount: number
  totalCount: number
  allPassed: boolean
  compileErrors: string[]
  runtimeError: string | null
}

function toMessage(message: string | undefined, fallback: string) {
  return message ?? fallback
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') {
    return `"${value}"`
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

function createHelpers(): TestHelpers {
  return {
    equal(actual, expected, message) {
      if (!Object.is(actual, expected)) {
        throw new Error(
          `${toMessage(message, '断言失败')}\nExpected:\n${formatValue(expected)}\nReceived:\n${formatValue(actual)}`,
        )
      }
    },
    deepEqual(actual, expected, message) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
          `${toMessage(message, '深比较断言失败')}\nExpected:\n${formatValue(expected)}\nReceived:\n${formatValue(actual)}`,
        )
      }
    },
    ok(value, message) {
      if (!value) {
        throw new Error(toMessage(message, '断言失败，期望值为 truthy'))
      }
    },
    sleep(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms)
      })
    },
  }
}

export async function runProblemTests(
  source: string,
  testCases: ProblemTestCase[],
): Promise<TestRunResult> {
  const execution = executeUserCode(source)

  if (!execution.success) {
    return {
      items: [],
      passedCount: 0,
      totalCount: testCases.length,
      allPassed: false,
      compileErrors: execution.compileErrors,
      runtimeError: execution.runtimeError,
    }
  }

  const helpers = createHelpers()
  const items: TestResultItem[] = []

  for (const testCase of testCases) {
    try {
      await testCase.run({
        exports: execution.exports,
        helpers,
      })

      items.push({
        name: testCase.name,
        description: testCase.description,
        passed: true,
      })
    } catch (error) {
      items.push({
        name: testCase.name,
        description: testCase.description,
        passed: false,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const passedCount = items.filter((item) => item.passed).length

  return {
    items,
    passedCount,
    totalCount: items.length,
    allPassed: items.length > 0 && passedCount === items.length,
    compileErrors: [],
    runtimeError: null,
  }
}
