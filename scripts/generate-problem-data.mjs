import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = '/Users/sunyanfeng/dev/frontend-handwriting-lab'

function toProblemId(slug) {
  return slug.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

async function main() {
  const problemBankSource = await readFile(join(root, 'src/problem-bank.ts'), 'utf8')
  const jsonMatch = problemBankSource.match(
    /export const problemBank: ProblemItem\[] = (\[[\s\S]*\])\s*$/,
  )

  if (!jsonMatch) {
    throw new Error('无法解析 src/problem-bank.ts')
  }

  const problemBank = JSON.parse(jsonMatch[1])
  const lines = []

  lines.push("import type { Problem } from './types'")
  lines.push("import { createProblemTestCases } from './testCases'")

  for (const item of problemBank) {
    const starterVar = `${item.slug}Starter`
    const solutionVar = `${item.slug}Solution`
    lines.push(`import ${starterVar} from '../../${item.problemPath}?raw'`)
    lines.push(`import ${solutionVar} from '../../${item.solutionPath}?raw'`)
  }

  lines.push('')
  lines.push('export const problems: Problem[] = [')

  lines.push(
    problemBank
      .map((item) => {
        const id = toProblemId(item.slug)
        const frequency = item.frequency.length
        return `  {
    id: '${id}',
    legacySlug: '${item.slug}',
    title: ${JSON.stringify(item.title)},
    category: '${item.category}',
    categoryLabel: ${JSON.stringify(item.categoryLabel)},
    difficulty: '${item.difficulty}',
    frequency: ${frequency},
    summary: ${JSON.stringify(item.summary)},
    description: ${JSON.stringify(item.summary)},
    requirements: ['请根据题意完成实现。'],
    knowledgePoints: ${JSON.stringify(item.points)},
    interviewTips: ['先独立实现，再运行测试验证边界情况。'],
    estimatedMinutes: ${item.suggestedMinutes},
    starterCode: ${item.slug}Starter,
    solutionCode: ${item.slug}Solution,
    starterPath: '${item.problemPath}',
    solutionPath: '${item.solutionPath}',
    usageExamples: [
      {
        title: '基础使用',
        code: '// 建议结合题目本身补充真实业务场景',
        description: '当前题目已支持在线练习，后续可继续补更多案例。',
      },
    ],
    solutionDetail: {
      approach: ['先梳理输入输出，再补齐边界条件。'],
      timeComplexity: '视实现而定',
      spaceComplexity: '视实现而定',
      commonMistakes: ['忽略边界情况', '只实现主路径，没有考虑异常输入'],
      followUps: ['还能不能进一步优化可读性和边界处理？'],
    },
    testCases: createProblemTestCases('${id}'),
  }`
      })
      .join(',\n'),
  )

  lines.push(']')
  lines.push('')
  lines.push(
    'export const problemsById = Object.fromEntries(problems.map((problem) => [problem.id, problem])) as Record<string, Problem>',
  )
  lines.push('')
  lines.push('export function getProblemById(problemId: string) {')
  lines.push('  return problemsById[problemId]')
  lines.push('}')
  lines.push('')
  lines.push('export const problemCategories = [')
  lines.push("  { value: 'all', label: '全部' },")
  lines.push("  { value: 'javascript', label: 'JavaScript' },")
  lines.push("  { value: 'function', label: 'Function' },")
  lines.push("  { value: 'array', label: 'Array' },")
  lines.push("  { value: 'object', label: 'Object' },")
  lines.push("  { value: 'async', label: 'Async' },")
  lines.push("  { value: 'browser', label: 'Browser' },")
  lines.push("  { value: 'algorithm', label: 'Algorithm' },")
  lines.push("  { value: 'react', label: 'React' },")
  lines.push('] as const')

  await mkdir(join(root, 'src/data/problems'), { recursive: true })
  await writeFile(join(root, 'src/data/problems/generated.ts'), lines.join('\n'))
}

main()
