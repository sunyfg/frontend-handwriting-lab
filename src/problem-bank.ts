export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type ProblemCategory =
  | 'javascript'
  | 'async'
  | 'function'
  | 'object'
  | 'array'
  | 'browser'
  | 'algorithm'
  | 'react'

export interface ProblemItem {
  slug: string
  title: string
  category: ProblemCategory
  categoryLabel: string
  difficulty: Difficulty
  frequency: '★★★' | '★★★★' | '★★★★★'
  suggestedMinutes: number
  points: string[]
  summary: string
  problemPath: string
  solutionPath: string
  testPath: string
}

export const problemBank: ProblemItem[] = [
  {
    "slug": "myTypeof",
    "title": "手写 typeof",
    "category": "javascript",
    "categoryLabel": "JavaScript 基础",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 8,
    "points": [
      "类型判断",
      "边界处理",
      "原始值与引用值"
    ],
    "summary": "实现一个比原生 typeof 更可用的类型判断函数。",
    "problemPath": "src/problems/javascript/myTypeof.ts",
    "solutionPath": "src/solutions/javascript/myTypeof.ts",
    "testPath": "src/tests/javascript/myTypeof.test.ts"
  },
  {
    "slug": "myInstanceof",
    "title": "手写 instanceof",
    "category": "javascript",
    "categoryLabel": "JavaScript 基础",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 10,
    "points": [
      "原型链",
      "构造函数",
      "边界处理"
    ],
    "summary": "沿着原型链查找，判断对象是否来自指定构造函数。",
    "problemPath": "src/problems/javascript/myInstanceof.ts",
    "solutionPath": "src/solutions/javascript/myInstanceof.ts",
    "testPath": "src/tests/javascript/myInstanceof.test.ts"
  },
  {
    "slug": "objectCreate",
    "title": "手写 Object.create",
    "category": "javascript",
    "categoryLabel": "JavaScript 基础",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "原型继承",
      "属性描述符",
      "对象创建"
    ],
    "summary": "模拟 Object.create 的核心行为，支持可选属性描述符。",
    "problemPath": "src/problems/javascript/objectCreate.ts",
    "solutionPath": "src/solutions/javascript/objectCreate.ts",
    "testPath": "src/tests/javascript/objectCreate.test.ts"
  },
  {
    "slug": "mockNew",
    "title": "手写 new",
    "category": "javascript",
    "categoryLabel": "JavaScript 基础",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 12,
    "points": [
      "new 流程",
      "this 绑定",
      "返回值规则"
    ],
    "summary": "模拟 new 运算符：创建对象、绑定原型、执行构造函数并处理返回值。",
    "problemPath": "src/problems/javascript/mockNew.ts",
    "solutionPath": "src/solutions/javascript/mockNew.ts",
    "testPath": "src/tests/javascript/mockNew.test.ts"
  },
  {
    "slug": "myCall",
    "title": "手写 call",
    "category": "javascript",
    "categoryLabel": "JavaScript 基础",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 10,
    "points": [
      "this 绑定",
      "参数展开",
      "隐式属性"
    ],
    "summary": "实现显式绑定 this 的 call 方法。",
    "problemPath": "src/problems/javascript/myCall.ts",
    "solutionPath": "src/solutions/javascript/myCall.ts",
    "testPath": "src/tests/javascript/myCall.test.ts"
  },
  {
    "slug": "myApply",
    "title": "手写 apply",
    "category": "javascript",
    "categoryLabel": "JavaScript 基础",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 10,
    "points": [
      "this 绑定",
      "数组参数",
      "边界处理"
    ],
    "summary": "实现显式绑定 this 的 apply 方法。",
    "problemPath": "src/problems/javascript/myApply.ts",
    "solutionPath": "src/solutions/javascript/myApply.ts",
    "testPath": "src/tests/javascript/myApply.test.ts"
  },
  {
    "slug": "myBind",
    "title": "手写 bind",
    "category": "javascript",
    "categoryLabel": "JavaScript 基础",
    "difficulty": "Hard",
    "frequency": "★★★★★",
    "suggestedMinutes": 18,
    "points": [
      "this 绑定",
      "柯里化参数",
      "new 绑定优先级"
    ],
    "summary": "实现 bind，支持预置参数和 new 调用场景。",
    "problemPath": "src/problems/javascript/myBind.ts",
    "solutionPath": "src/solutions/javascript/myBind.ts",
    "testPath": "src/tests/javascript/myBind.test.ts"
  },
  {
    "slug": "debounce",
    "title": "debounce 防抖",
    "category": "function",
    "categoryLabel": "函数相关",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 10,
    "points": [
      "定时器",
      "闭包",
      "高频事件优化"
    ],
    "summary": "在连续触发时只执行最后一次调用。",
    "problemPath": "src/problems/function/debounce.ts",
    "solutionPath": "src/solutions/function/debounce.ts",
    "testPath": "src/tests/function/debounce.test.ts"
  },
  {
    "slug": "throttle",
    "title": "throttle 节流",
    "category": "function",
    "categoryLabel": "函数相关",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 10,
    "points": [
      "定时器",
      "节流窗口",
      "高频事件优化"
    ],
    "summary": "限制函数在固定时间窗口内只触发一次。",
    "problemPath": "src/problems/function/throttle.ts",
    "solutionPath": "src/solutions/function/throttle.ts",
    "testPath": "src/tests/function/throttle.test.ts"
  },
  {
    "slug": "curry",
    "title": "curry 柯里化",
    "category": "function",
    "categoryLabel": "函数相关",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "高阶函数",
      "参数收集",
      "递归"
    ],
    "summary": "把多参数函数拆解成可连续调用的单参函数。",
    "problemPath": "src/problems/function/curry.ts",
    "solutionPath": "src/solutions/function/curry.ts",
    "testPath": "src/tests/function/curry.test.ts"
  },
  {
    "slug": "compose",
    "title": "compose",
    "category": "function",
    "categoryLabel": "函数相关",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "函数组合",
      "从右到左执行",
      "高阶函数"
    ],
    "summary": "把多个函数从右到左组合成一个新函数。",
    "problemPath": "src/problems/function/compose.ts",
    "solutionPath": "src/solutions/function/compose.ts",
    "testPath": "src/tests/function/compose.test.ts"
  },
  {
    "slug": "pipe",
    "title": "pipe",
    "category": "function",
    "categoryLabel": "函数相关",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "函数组合",
      "从左到右执行",
      "高阶函数"
    ],
    "summary": "把多个函数从左到右组合成一个新函数。",
    "problemPath": "src/problems/function/pipe.ts",
    "solutionPath": "src/solutions/function/pipe.ts",
    "testPath": "src/tests/function/pipe.test.ts"
  },
  {
    "slug": "once",
    "title": "once",
    "category": "function",
    "categoryLabel": "函数相关",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "闭包",
      "缓存结果",
      "函数包装"
    ],
    "summary": "让函数只执行一次，后续直接返回首次结果。",
    "problemPath": "src/problems/function/once.ts",
    "solutionPath": "src/solutions/function/once.ts",
    "testPath": "src/tests/function/once.test.ts"
  },
  {
    "slug": "memoize",
    "title": "memoize",
    "category": "function",
    "categoryLabel": "函数相关",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "缓存",
      "闭包",
      "高阶函数"
    ],
    "summary": "缓存相同输入的计算结果，避免重复执行。",
    "problemPath": "src/problems/function/memoize.ts",
    "solutionPath": "src/solutions/function/memoize.ts",
    "testPath": "src/tests/function/memoize.test.ts"
  },
  {
    "slug": "shallowClone",
    "title": "shallowClone",
    "category": "object",
    "categoryLabel": "对象与拷贝",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "浅拷贝",
      "对象遍历",
      "数组处理"
    ],
    "summary": "实现对象和数组的浅拷贝。",
    "problemPath": "src/problems/object/shallowClone.ts",
    "solutionPath": "src/solutions/object/shallowClone.ts",
    "testPath": "src/tests/object/shallowClone.test.ts"
  },
  {
    "slug": "deepClone",
    "title": "deepClone",
    "category": "object",
    "categoryLabel": "对象与拷贝",
    "difficulty": "Hard",
    "frequency": "★★★★★",
    "suggestedMinutes": 18,
    "points": [
      "递归",
      "循环引用",
      "复杂引用类型"
    ],
    "summary": "实现支持循环引用的深拷贝。",
    "problemPath": "src/problems/object/deepClone.ts",
    "solutionPath": "src/solutions/object/deepClone.ts",
    "testPath": "src/tests/object/deepClone.test.ts"
  },
  {
    "slug": "deepEqual",
    "title": "deepEqual",
    "category": "object",
    "categoryLabel": "对象与拷贝",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 15,
    "points": [
      "递归比较",
      "数组对象比较",
      "边界处理"
    ],
    "summary": "递归比较两个值在结构和值上是否完全相等。",
    "problemPath": "src/problems/object/deepEqual.ts",
    "solutionPath": "src/solutions/object/deepEqual.ts",
    "testPath": "src/tests/object/deepEqual.test.ts"
  },
  {
    "slug": "flattenObject",
    "title": "flattenObject",
    "category": "object",
    "categoryLabel": "对象与拷贝",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "递归",
      "路径拼接",
      "对象遍历"
    ],
    "summary": "把多层嵌套对象拍平成路径到值的映射。",
    "problemPath": "src/problems/object/flattenObject.ts",
    "solutionPath": "src/solutions/object/flattenObject.ts",
    "testPath": "src/tests/object/flattenObject.test.ts"
  },
  {
    "slug": "unflattenObject",
    "title": "unflattenObject",
    "category": "object",
    "categoryLabel": "对象与拷贝",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "路径解析",
      "对象重建",
      "数组索引处理"
    ],
    "summary": "把路径到值的映射重新还原成嵌套对象。",
    "problemPath": "src/problems/object/unflattenObject.ts",
    "solutionPath": "src/solutions/object/unflattenObject.ts",
    "testPath": "src/tests/object/unflattenObject.test.ts"
  },
  {
    "slug": "arrayMap",
    "title": "Array.prototype.map",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 8,
    "points": [
      "数组遍历",
      "回调参数",
      "返回新数组"
    ],
    "summary": "模拟 map，基于回调结果返回新数组。",
    "problemPath": "src/problems/array/arrayMap.ts",
    "solutionPath": "src/solutions/array/arrayMap.ts",
    "testPath": "src/tests/array/arrayMap.test.ts"
  },
  {
    "slug": "arrayFilter",
    "title": "filter",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 8,
    "points": [
      "数组遍历",
      "条件筛选",
      "返回新数组"
    ],
    "summary": "模拟 filter，筛选满足条件的元素。",
    "problemPath": "src/problems/array/arrayFilter.ts",
    "solutionPath": "src/solutions/array/arrayFilter.ts",
    "testPath": "src/tests/array/arrayFilter.test.ts"
  },
  {
    "slug": "arrayReduce",
    "title": "reduce",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 10,
    "points": [
      "累加器",
      "初始值处理",
      "数组遍历"
    ],
    "summary": "模拟 reduce，按顺序归并数组元素。",
    "problemPath": "src/problems/array/arrayReduce.ts",
    "solutionPath": "src/solutions/array/arrayReduce.ts",
    "testPath": "src/tests/array/arrayReduce.test.ts"
  },
  {
    "slug": "arrayForEach",
    "title": "forEach",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "数组遍历",
      "回调调用",
      "无返回值"
    ],
    "summary": "模拟 forEach，依次执行回调函数。",
    "problemPath": "src/problems/array/arrayForEach.ts",
    "solutionPath": "src/solutions/array/arrayForEach.ts",
    "testPath": "src/tests/array/arrayForEach.test.ts"
  },
  {
    "slug": "arrayFlat",
    "title": "flat",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "递归",
      "深度控制",
      "数组处理"
    ],
    "summary": "模拟 flat，按指定深度展开嵌套数组。",
    "problemPath": "src/problems/array/arrayFlat.ts",
    "solutionPath": "src/solutions/array/arrayFlat.ts",
    "testPath": "src/tests/array/arrayFlat.test.ts"
  },
  {
    "slug": "unique",
    "title": "unique",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 8,
    "points": [
      "去重",
      "Set",
      "顺序保持"
    ],
    "summary": "实现数组去重并保持原顺序。",
    "problemPath": "src/problems/array/unique.ts",
    "solutionPath": "src/solutions/array/unique.ts",
    "testPath": "src/tests/array/unique.test.ts"
  },
  {
    "slug": "chunk",
    "title": "chunk",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "数组分片",
      "循环切片",
      "边界处理"
    ],
    "summary": "按固定大小把数组切成多个小数组。",
    "problemPath": "src/problems/array/chunk.ts",
    "solutionPath": "src/solutions/array/chunk.ts",
    "testPath": "src/tests/array/chunk.test.ts"
  },
  {
    "slug": "shuffle",
    "title": "shuffle",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "随机算法",
      "Fisher-Yates",
      "原数组保护"
    ],
    "summary": "使用 Fisher-Yates 算法打乱数组顺序。",
    "problemPath": "src/problems/array/shuffle.ts",
    "solutionPath": "src/solutions/array/shuffle.ts",
    "testPath": "src/tests/array/shuffle.test.ts"
  },
  {
    "slug": "flattenArray",
    "title": "数组扁平化",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 8,
    "points": [
      "递归",
      "数组展开",
      "基础算法"
    ],
    "summary": "把任意层级的嵌套数组完全展开。",
    "problemPath": "src/problems/array/flattenArray.ts",
    "solutionPath": "src/solutions/array/flattenArray.ts",
    "testPath": "src/tests/array/flattenArray.test.ts"
  },
  {
    "slug": "arrayDeduplicate",
    "title": "数组去重",
    "category": "array",
    "categoryLabel": "数组",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "去重",
      "键提取",
      "顺序保持"
    ],
    "summary": "支持通过 key 提取函数对复杂数组进行去重。",
    "problemPath": "src/problems/array/arrayDeduplicate.ts",
    "solutionPath": "src/solutions/array/arrayDeduplicate.ts",
    "testPath": "src/tests/array/arrayDeduplicate.test.ts"
  },
  {
    "slug": "miniPromise",
    "title": "手写 Promise",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Hard",
    "frequency": "★★★★★",
    "suggestedMinutes": 30,
    "points": [
      "状态机",
      "链式调用",
      "thenable 处理"
    ],
    "summary": "实现一个覆盖核心行为的 MiniPromise。",
    "problemPath": "src/problems/async/miniPromise.ts",
    "solutionPath": "src/solutions/async/miniPromise.ts",
    "testPath": "src/tests/async/miniPromise.test.ts"
  },
  {
    "slug": "promiseAll",
    "title": "Promise.all",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 12,
    "points": [
      "Promise 组合",
      "顺序保持",
      "失败短路"
    ],
    "summary": "实现 Promise.all，全部成功后按原顺序返回结果。",
    "problemPath": "src/problems/async/promiseAll.ts",
    "solutionPath": "src/solutions/async/promiseAll.ts",
    "testPath": "src/tests/async/promiseAll.test.ts"
  },
  {
    "slug": "promiseAllSettled",
    "title": "Promise.allSettled",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "Promise 组合",
      "状态收集",
      "异步结果结构化"
    ],
    "summary": "实现 Promise.allSettled，收集所有任务状态和结果。",
    "problemPath": "src/problems/async/promiseAllSettled.ts",
    "solutionPath": "src/solutions/async/promiseAllSettled.ts",
    "testPath": "src/tests/async/promiseAllSettled.test.ts"
  },
  {
    "slug": "promiseRace",
    "title": "Promise.race",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "Promise 组合",
      "最快完成",
      "竞速处理"
    ],
    "summary": "实现 Promise.race，谁先 settle 就采用谁的结果。",
    "problemPath": "src/problems/async/promiseRace.ts",
    "solutionPath": "src/solutions/async/promiseRace.ts",
    "testPath": "src/tests/async/promiseRace.test.ts"
  },
  {
    "slug": "promiseAny",
    "title": "Promise.any",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Hard",
    "frequency": "★★★★",
    "suggestedMinutes": 15,
    "points": [
      "Promise 组合",
      "成功短路",
      "AggregateError"
    ],
    "summary": "实现 Promise.any，任一成功就 resolve，全部失败则 reject。",
    "problemPath": "src/problems/async/promiseAny.ts",
    "solutionPath": "src/solutions/async/promiseAny.ts",
    "testPath": "src/tests/async/promiseAny.test.ts"
  },
  {
    "slug": "asyncPool",
    "title": "asyncPool / 并发控制",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Hard",
    "frequency": "★★★★★",
    "suggestedMinutes": 18,
    "points": [
      "并发控制",
      "任务调度",
      "Promise 队列"
    ],
    "summary": "限制同时运行的异步任务数量。",
    "problemPath": "src/problems/async/asyncPool.ts",
    "solutionPath": "src/solutions/async/asyncPool.ts",
    "testPath": "src/tests/async/asyncPool.test.ts"
  },
  {
    "slug": "sleep",
    "title": "sleep",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 5,
    "points": [
      "Promise",
      "定时器",
      "异步封装"
    ],
    "summary": "实现一个等待指定时间后完成的 sleep 函数。",
    "problemPath": "src/problems/async/sleep.ts",
    "solutionPath": "src/solutions/async/sleep.ts",
    "testPath": "src/tests/async/sleep.test.ts"
  },
  {
    "slug": "retry",
    "title": "retry",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 12,
    "points": [
      "错误重试",
      "Promise 链",
      "重试次数控制"
    ],
    "summary": "实现失败自动重试的异步函数包装器。",
    "problemPath": "src/problems/async/retry.ts",
    "solutionPath": "src/solutions/async/retry.ts",
    "testPath": "src/tests/async/retry.test.ts"
  },
  {
    "slug": "timeout",
    "title": "timeout",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "Promise.race",
      "超时控制",
      "错误处理"
    ],
    "summary": "给 Promise 增加超时能力，超时后自动 reject。",
    "problemPath": "src/problems/async/timeout.ts",
    "solutionPath": "src/solutions/async/timeout.ts",
    "testPath": "src/tests/async/timeout.test.ts"
  },
  {
    "slug": "serialAsyncTasks",
    "title": "串行执行异步任务",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "串行调度",
      "Promise 链",
      "结果收集"
    ],
    "summary": "按顺序串行执行一组异步任务并收集结果。",
    "problemPath": "src/problems/async/serialAsyncTasks.ts",
    "solutionPath": "src/solutions/async/serialAsyncTasks.ts",
    "testPath": "src/tests/async/serialAsyncTasks.test.ts"
  },
  {
    "slug": "limitConcurrentRequests",
    "title": "控制最大并发请求数",
    "category": "async",
    "categoryLabel": "异步",
    "difficulty": "Hard",
    "frequency": "★★★★★",
    "suggestedMinutes": 18,
    "points": [
      "并发控制",
      "任务队列",
      "Promise 调度"
    ],
    "summary": "给请求函数队列加上最大并发限制。",
    "problemPath": "src/problems/async/limitConcurrentRequests.ts",
    "solutionPath": "src/solutions/async/limitConcurrentRequests.ts",
    "testPath": "src/tests/async/limitConcurrentRequests.test.ts"
  },
  {
    "slug": "eventEmitter",
    "title": "EventEmitter",
    "category": "browser",
    "categoryLabel": "浏览器",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 12,
    "points": [
      "发布订阅",
      "事件中心",
      "once/off"
    ],
    "summary": "实现一个常用的事件总线类。",
    "problemPath": "src/problems/browser/eventEmitter.ts",
    "solutionPath": "src/solutions/browser/eventEmitter.ts",
    "testPath": "src/tests/browser/eventEmitter.test.ts"
  },
  {
    "slug": "pubSub",
    "title": "发布订阅模式",
    "category": "browser",
    "categoryLabel": "浏览器",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "发布订阅",
      "消息分发",
      "取消订阅"
    ],
    "summary": "实现一个基于 topic 的发布订阅器。",
    "problemPath": "src/problems/browser/pubSub.ts",
    "solutionPath": "src/solutions/browser/pubSub.ts",
    "testPath": "src/tests/browser/pubSub.test.ts"
  },
  {
    "slug": "delegateEvent",
    "title": "DOM 事件委托",
    "category": "browser",
    "categoryLabel": "浏览器",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "事件冒泡",
      "DOM API",
      "事件委托"
    ],
    "summary": "把事件监听挂到父节点上，通过 selector 命中目标元素。",
    "problemPath": "src/problems/browser/delegateEvent.ts",
    "solutionPath": "src/solutions/browser/delegateEvent.ts",
    "testPath": "src/tests/browser/delegateEvent.test.ts"
  },
  {
    "slug": "parseURLParams",
    "title": "URL 参数解析",
    "category": "browser",
    "categoryLabel": "浏览器",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "URLSearchParams",
      "重复参数",
      "解码"
    ],
    "summary": "把 URL 查询参数解析成对象，并处理重复 key。",
    "problemPath": "src/problems/browser/parseURLParams.ts",
    "solutionPath": "src/solutions/browser/parseURLParams.ts",
    "testPath": "src/tests/browser/parseURLParams.test.ts"
  },
  {
    "slug": "parseCookie",
    "title": "Cookie 解析",
    "category": "browser",
    "categoryLabel": "浏览器",
    "difficulty": "Easy",
    "frequency": "★★★",
    "suggestedMinutes": 8,
    "points": [
      "字符串解析",
      "URL 解码",
      "边界处理"
    ],
    "summary": "把 Cookie 字符串解析成键值对象。",
    "problemPath": "src/problems/browser/parseCookie.ts",
    "solutionPath": "src/solutions/browser/parseCookie.ts",
    "testPath": "src/tests/browser/parseCookie.test.ts"
  },
  {
    "slug": "expiringStorage",
    "title": "localStorage 带过期时间封装",
    "category": "browser",
    "categoryLabel": "浏览器",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "本地存储",
      "过期时间",
      "序列化"
    ],
    "summary": "封装带过期时间的 localStorage 读写能力。",
    "problemPath": "src/problems/browser/expiringStorage.ts",
    "solutionPath": "src/solutions/browser/expiringStorage.ts",
    "testPath": "src/tests/browser/expiringStorage.test.ts"
  },
  {
    "slug": "lruCache",
    "title": "LRU Cache",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Hard",
    "frequency": "★★★★★",
    "suggestedMinutes": 18,
    "points": [
      "Map",
      "缓存淘汰",
      "数据结构设计"
    ],
    "summary": "设计一个支持 get 和 put 的 LRU 缓存。",
    "problemPath": "src/problems/algorithm/lruCache.ts",
    "solutionPath": "src/solutions/algorithm/lruCache.ts",
    "testPath": "src/tests/algorithm/lruCache.test.ts"
  },
  {
    "slug": "reverseLinkedList",
    "title": "链表反转",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 10,
    "points": [
      "链表",
      "指针反转",
      "迭代"
    ],
    "summary": "把单链表原地反转并返回新的头节点。",
    "problemPath": "src/problems/algorithm/reverseLinkedList.ts",
    "solutionPath": "src/solutions/algorithm/reverseLinkedList.ts",
    "testPath": "src/tests/algorithm/reverseLinkedList.test.ts"
  },
  {
    "slug": "binaryTreeDFS",
    "title": "二叉树 DFS",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "树遍历",
      "深度优先搜索",
      "递归"
    ],
    "summary": "实现二叉树深度优先遍历，按前序返回节点值。",
    "problemPath": "src/problems/algorithm/binaryTreeDFS.ts",
    "solutionPath": "src/solutions/algorithm/binaryTreeDFS.ts",
    "testPath": "src/tests/algorithm/binaryTreeDFS.test.ts"
  },
  {
    "slug": "binaryTreeBFS",
    "title": "二叉树 BFS",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "树遍历",
      "广度优先搜索",
      "队列"
    ],
    "summary": "实现二叉树层序遍历，按从上到下返回节点值。",
    "problemPath": "src/problems/algorithm/binaryTreeBFS.ts",
    "solutionPath": "src/solutions/algorithm/binaryTreeBFS.ts",
    "testPath": "src/tests/algorithm/binaryTreeBFS.test.ts"
  },
  {
    "slug": "maxTreeDepth",
    "title": "二叉树最大深度",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "树递归",
      "深度计算",
      "边界处理"
    ],
    "summary": "计算二叉树的最大深度。",
    "problemPath": "src/problems/algorithm/maxTreeDepth.ts",
    "solutionPath": "src/solutions/algorithm/maxTreeDepth.ts",
    "testPath": "src/tests/algorithm/maxTreeDepth.test.ts"
  },
  {
    "slug": "quickSort",
    "title": "快速排序",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 12,
    "points": [
      "分治",
      "递归",
      "排序"
    ],
    "summary": "实现快速排序并返回升序结果。",
    "problemPath": "src/problems/algorithm/quickSort.ts",
    "solutionPath": "src/solutions/algorithm/quickSort.ts",
    "testPath": "src/tests/algorithm/quickSort.test.ts"
  },
  {
    "slug": "mergeSort",
    "title": "归并排序",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 12,
    "points": [
      "分治",
      "合并有序数组",
      "递归"
    ],
    "summary": "实现归并排序并返回升序结果。",
    "problemPath": "src/problems/algorithm/mergeSort.ts",
    "solutionPath": "src/solutions/algorithm/mergeSort.ts",
    "testPath": "src/tests/algorithm/mergeSort.test.ts"
  },
  {
    "slug": "binarySearch",
    "title": "二分查找",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 8,
    "points": [
      "二分",
      "边界收缩",
      "有序数组"
    ],
    "summary": "在有序数组中查找目标值下标。",
    "problemPath": "src/problems/algorithm/binarySearch.ts",
    "solutionPath": "src/solutions/algorithm/binarySearch.ts",
    "testPath": "src/tests/algorithm/binarySearch.test.ts"
  },
  {
    "slug": "twoSum",
    "title": "两数之和",
    "category": "algorithm",
    "categoryLabel": "算法/数据结构",
    "difficulty": "Easy",
    "frequency": "★★★★★",
    "suggestedMinutes": 8,
    "points": [
      "哈希表",
      "一次遍历",
      "数组索引"
    ],
    "summary": "在数组中找到两数之和等于目标值的下标。",
    "problemPath": "src/problems/algorithm/twoSum.ts",
    "solutionPath": "src/solutions/algorithm/twoSum.ts",
    "testPath": "src/tests/algorithm/twoSum.test.ts"
  },
  {
    "slug": "miniUseState",
    "title": "手写简化版 useState 思路",
    "category": "react",
    "categoryLabel": "React",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "状态闭包",
      "更新函数",
      "基础 Hook 思路"
    ],
    "summary": "用闭包模拟最简版 useState 的核心行为。",
    "problemPath": "src/problems/react/miniUseState.ts",
    "solutionPath": "src/solutions/react/miniUseState.ts",
    "testPath": "src/tests/react/miniUseState.test.ts"
  },
  {
    "slug": "useDebounce",
    "title": "useDebounce",
    "category": "react",
    "categoryLabel": "React",
    "difficulty": "Medium",
    "frequency": "★★★★★",
    "suggestedMinutes": 12,
    "points": [
      "React Hook",
      "定时器",
      "副作用清理"
    ],
    "summary": "实现一个带延迟更新的 useDebounce Hook。",
    "problemPath": "src/problems/react/useDebounce.ts",
    "solutionPath": "src/solutions/react/useDebounce.ts",
    "testPath": "src/tests/react/useDebounce.test.ts"
  },
  {
    "slug": "useThrottle",
    "title": "useThrottle",
    "category": "react",
    "categoryLabel": "React",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "React Hook",
      "节流",
      "Ref 与 Effect"
    ],
    "summary": "实现一个限制更新频率的 useThrottle Hook。",
    "problemPath": "src/problems/react/useThrottle.ts",
    "solutionPath": "src/solutions/react/useThrottle.ts",
    "testPath": "src/tests/react/useThrottle.test.ts"
  },
  {
    "slug": "usePrevious",
    "title": "usePrevious",
    "category": "react",
    "categoryLabel": "React",
    "difficulty": "Easy",
    "frequency": "★★★★",
    "suggestedMinutes": 8,
    "points": [
      "React Hook",
      "useRef",
      "副作用时机"
    ],
    "summary": "保存上一次渲染时的值。",
    "problemPath": "src/problems/react/usePrevious.ts",
    "solutionPath": "src/solutions/react/usePrevious.ts",
    "testPath": "src/tests/react/usePrevious.test.ts"
  },
  {
    "slug": "useUpdateEffect",
    "title": "useUpdateEffect",
    "category": "react",
    "categoryLabel": "React",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 10,
    "points": [
      "React Hook",
      "首次渲染跳过",
      "effect 控制"
    ],
    "summary": "实现仅在更新阶段执行的 useEffect。",
    "problemPath": "src/problems/react/useUpdateEffect.ts",
    "solutionPath": "src/solutions/react/useUpdateEffect.ts",
    "testPath": "src/tests/react/useUpdateEffect.test.ts"
  },
  {
    "slug": "useRequest",
    "title": "useRequest 简化版",
    "category": "react",
    "categoryLabel": "React",
    "difficulty": "Hard",
    "frequency": "★★★★★",
    "suggestedMinutes": 18,
    "points": [
      "React Hook",
      "异步状态管理",
      "封装请求逻辑"
    ],
    "summary": "实现一个简化版 useRequest，统一管理 loading、data、error 和 run。",
    "problemPath": "src/problems/react/useRequest.ts",
    "solutionPath": "src/solutions/react/useRequest.ts",
    "testPath": "src/tests/react/useRequest.test.ts"
  },
  {
    "slug": "useClickOutside",
    "title": "useClickOutside",
    "category": "react",
    "categoryLabel": "React",
    "difficulty": "Medium",
    "frequency": "★★★★",
    "suggestedMinutes": 12,
    "points": [
      "React Hook",
      "DOM 事件监听",
      "Ref"
    ],
    "summary": "监听目标元素外部点击事件并执行回调。",
    "problemPath": "src/problems/react/useClickOutside.ts",
    "solutionPath": "src/solutions/react/useClickOutside.ts",
    "testPath": "src/tests/react/useClickOutside.test.tsx"
  }
]

