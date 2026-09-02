import { problemBank } from '../src/problem-bank'

const difficultyArg = process.argv[2]?.toLowerCase()

const difficultyMap = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const

const targetDifficulty =
  difficultyArg && difficultyArg in difficultyMap
    ? difficultyMap[difficultyArg as keyof typeof difficultyMap]
    : undefined

const pool = targetDifficulty
  ? problemBank.filter((problem) => problem.difficulty === targetDifficulty)
  : problemBank

if (pool.length === 0) {
  console.error('没有找到符合条件的题目。')
  process.exit(1)
}

const picked = pool[Math.floor(Math.random() * pool.length)]

console.log('🎯 今日手写题：' + picked.slug)
console.log('难度：' + picked.difficulty)
console.log('分类：' + picked.categoryLabel)
console.log('建议时间：' + picked.suggestedMinutes + ' 分钟')
console.log('文件：' + picked.problemPath)

