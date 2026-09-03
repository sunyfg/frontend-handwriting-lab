import type { Problem } from './types'
import { problems as generatedProblems, problemCategories } from './generated'

function normalizeStarterCode(source: string) {
  return source
    .replace(/^import\s.+$/gm, '')
    .replace(
      /throw createTodoError\((.+?)\)/g,
      "throw new Error('TODO: 请先完成当前题目')",
    )
    .trim()
}

function byId(problemId: string) {
  const problem = generatedProblems.find((item) => item.id === problemId)

  if (!problem) {
    throw new Error(`Problem not found: ${problemId}`)
  }

  return problem
}

const enrichedProblems: Problem[] = generatedProblems.map((problem) => {
  const normalizedProblem = {
    ...problem,
    starterCode: normalizeStarterCode(problem.starterCode),
  }

  switch (problem.id) {
    case 'debounce':
      return {
        ...normalizedProblem,
        title: '手写 debounce 防抖函数',
        description: `实现一个 debounce 函数。

当函数被连续调用时，每次调用都会重新开始计时，只有停止调用达到指定 delay 时间后，原函数 fn 才会真正执行。这个题目是前端面试里非常高频的基础手写题，重点不在 API 复杂度，而在于你是否能稳定处理闭包、定时器、参数和调用时机。`,
        requirements: [
          '连续调用时只执行最后一次',
          '能够正确透传参数',
          '不能丢失 this 指向',
          '每次调用都需要重新计时',
          '不要产生多余的定时器',
        ],
        knowledgePoints: [
          'Closure / 闭包',
          'setTimeout',
          'clearTimeout',
          'this',
          'Parameters<T>',
          'TypeScript 泛型',
        ],
        interviewTips: [
          '追问一：如何支持立即执行 leading？',
          '追问二：如何补充 cancel 和 flush？',
          '追问三：debounce 和 throttle 的适用场景分别是什么？',
        ],
        usageExamples: [
          {
            title: '搜索输入框',
            code: `const handleSearch = debounce((keyword: string) => {
  fetchSearchResult(keyword)
}, 300)`,
            description:
              '用户连续输入时，不需要每次按键都发送请求，降低无效网络开销。',
          },
          {
            title: '窗口 resize',
            code: `window.addEventListener(
  'resize',
  debounce(() => {
    console.log(window.innerWidth)
  }, 200),
)`,
            description:
              '窗口变化非常频繁时，只在用户停下来后再做重新布局计算。',
          },
          {
            title: '表单校验',
            code: `const validateUsername = debounce(checkUsername, 500)`,
            description: '输入用户名时避免每输入一个字符就立刻发起重复校验。',
          },
        ],
        solutionDetail: {
          approach: [
            '用闭包保存 timer，保证多次触发之间共享同一个定时器状态。',
            '每次调用先 clearTimeout，再创建新的 setTimeout。',
            '在定时器回调里执行原函数，并把参数透传进去。',
            '如果想完整保留 this，内部调用时不能随意改写函数调用方式。',
          ],
          timeComplexity: '每次调用 O(1)',
          spaceComplexity: 'O(1)',
          commonMistakes: [
            'timer 没有放在闭包里，导致状态无法复用',
            '参数没有透传，最终调用丢失 arguments',
            '误用箭头函数导致 this 行为和预期不一致',
            '忘记清除旧定时器，导致执行多次',
          ],
          followUps: [
            '如何支持 leading + trailing 两种模式？',
            '如果要支持 cancel / flush，API 怎么设计？',
            '在 React 里使用 debounce 时要注意什么？',
          ],
        },
        runCodeSnippet: `const { debounce } = exports
const events = []
const wrapped = debounce((value) => {
  console.log('callback executed:', value)
  events.push(value)
}, 50)
console.log('debounce initialized')
wrapped('hello')
wrapped('world')
await new Promise((resolve) => setTimeout(resolve, 70))
return events`,
      }
    case 'throttle':
      return {
        ...normalizedProblem,
        title: '手写 throttle 节流函数',
        description: `实现一个 throttle 函数。

函数在固定时间窗口内最多只能执行一次。这个题和 debounce 经常放在一起考，面试官通常会看你是否真正理解“稀释频率”和“延后执行”的差异。`,
        requirements: [
          '同一个节流窗口内只执行一次',
          '超出窗口后下一次调用可以继续执行',
          '正确处理传入参数',
          '实现尽量保持清晰，避免多余状态',
        ],
        knowledgePoints: ['节流', '定时器', '闭包', '高频事件优化'],
        interviewTips: [
          '追问一：如何实现尾调用版本 throttle？',
          '追问二：滚动监听、拖拽监听更适合 throttle 还是 debounce？',
        ],
        usageExamples: [
          {
            title: '滚动监听',
            code: `window.addEventListener(
  'scroll',
  throttle(() => {
    console.log(window.scrollY)
  }, 100),
)`,
            description: '滚动过程中不需要每一帧都执行昂贵逻辑。',
          },
          {
            title: '拖拽位置同步',
            code: `const onDrag = throttle((point) => {
  syncPosition(point)
}, 16)`,
            description: '把高频拖拽事件压到一个更稳定的更新节奏。',
          },
        ],
        solutionDetail: {
          approach: [
            '使用闭包记录当前是否处于锁定状态。',
            '第一次触发时立即执行，并把锁打开。',
            '通过 setTimeout 在 delay 后释放锁。',
          ],
          timeComplexity: '每次调用 O(1)',
          spaceComplexity: 'O(1)',
          commonMistakes: [
            '没有处理锁释放，导致后续永远不执行',
            '把 throttle 写成了 debounce 行为',
          ],
          followUps: [
            '如何实现首尾都执行的节流？',
            '如果需要返回最后一次结果应该怎么做？',
          ],
        },
        runCodeSnippet: `const { throttle } = exports
const logs = []
const wrapped = throttle((value) => {
  console.log('throttle fired:', value)
  logs.push(value)
}, 40)
wrapped('A')
wrapped('B')
await new Promise((resolve) => setTimeout(resolve, 60))
wrapped('C')
await new Promise((resolve) => setTimeout(resolve, 10))
return logs`,
      }
    case 'deep-clone':
      return {
        ...normalizedProblem,
        title: '手写 deepClone 深拷贝',
        description: `实现一个 deepClone 函数，用于深拷贝复杂数据结构。

相比浅拷贝，这道题更考察你对引用类型、递归、边界对象以及循环引用的理解。很多面试官会继续追问 Date、RegExp、Map、Set 和循环引用应该怎么处理。`,
        requirements: [
          '能够递归复制嵌套对象和数组',
          '循环引用不能导致栈溢出',
          '至少支持 Date、RegExp、Map、Set',
          '原对象和拷贝对象之间不能共享内部引用',
        ],
        knowledgePoints: ['递归', 'WeakMap', '循环引用', '复杂引用类型'],
        interviewTips: [
          '追问一：为什么要用 WeakMap 而不是 Map？',
          '追问二：哪些对象不能简单深拷贝？',
        ],
        usageExamples: [
          {
            title: '撤销/重做快照',
            code: `const snapshot = deepClone(editorState)`,
            description:
              '保存编辑器或表单状态快照时，避免后续修改影响历史数据。',
          },
          {
            title: '接口结果防污染',
            code: `const safeData = deepClone(response.data)`,
            description:
              '需要在本地多次加工数据，但又不想污染原始响应对象时很常见。',
          },
        ],
        solutionDetail: {
          approach: [
            '先处理原始值和 null，原样返回。',
            '用 WeakMap 记录已经克隆过的对象，解决循环引用。',
            '针对 Date、RegExp、Map、Set 做分类处理。',
            '最后再递归复制普通对象或数组的每个属性。',
          ],
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          commonMistakes: [
            '忽略循环引用，导致无限递归',
            '只支持对象和数组，漏掉 Date、RegExp',
            '没有处理 Symbol key 或 Reflect.ownKeys',
          ],
          followUps: [
            '函数、DOM 节点、原型链应该怎么处理？',
            'JSON.parse(JSON.stringify()) 和深拷贝实现差别在哪里？',
          ],
        },
        runCodeSnippet: `const { deepClone } = exports
const source = {
  profile: { name: 'Sun', tags: ['ts', 'react'] },
  createdAt: new Date('2024-01-01'),
}
source.self = source
const cloned = deepClone(source)
console.log('same reference:', cloned === source)
console.log('nested reference:', cloned.profile === source.profile)
return {
  name: cloned.profile.name,
  loop: cloned.self === cloned,
}`,
      }
    case 'my-call':
      return {
        ...normalizedProblem,
        title: '手写 Function.prototype.call',
        description: `实现一个 myCall 函数，模拟 Function.prototype.call 的核心行为。

这是原型方法题里的经典代表，重点通常在 this 绑定、临时属性挂载、参数透传以及 null / undefined 上下文处理。`,
        requirements: [
          '显式绑定 this',
          '支持可变参数透传',
          '处理 null / undefined 时回退到全局对象',
          '执行后清理临时属性',
        ],
        knowledgePoints: ['this 绑定', 'Symbol', '参数透传', '隐式调用'],
        interviewTips: [
          '追问一：call、apply、bind 的差异是什么？',
          '追问二：为什么临时属性更适合用 Symbol？',
        ],
        usageExamples: [
          {
            title: '借用对象方法',
            code: `myCall(Array.prototype.join, ['a', 'b'], '-')`,
            description: '把某个对象上的函数借给另一个对象临时执行。',
          },
          {
            title: '显式切换上下文',
            code: `myCall(greet, { name: 'Tom' }, 'Hi ')`,
            description: '手动指定函数执行时的 this 指向。',
          },
        ],
        solutionDetail: {
          approach: [
            '把 context 规范成可挂载属性的对象。',
            '用 Symbol 挂上临时函数引用，避免属性名冲突。',
            '执行目标函数并透传参数。',
            '删除临时属性后返回执行结果。',
          ],
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          commonMistakes: [
            '没有处理 null / undefined',
            '临时属性名写死，污染原对象',
            '执行完成后忘记删除临时属性',
          ],
          followUps: [
            '如果 context 是原始值会发生什么？',
            '严格模式下 this 回退逻辑和非严格模式有什么不同？',
          ],
        },
        runCodeSnippet: `const { myCall } = exports
function greet(prefix) {
  console.log(prefix + this.name)
  return prefix + this.name
}
return myCall(greet, { name: 'Tom' }, 'Hi ')`,
      }
    case 'my-bind':
      return {
        ...normalizedProblem,
        title: '手写 Function.prototype.bind',
        description: `实现一个 myBind 函数，模拟 bind 的核心行为。

它通常比 call / apply 更难，因为除了绑定 this 和预置参数以外，还需要考虑 new 调用时的优先级。`,
        requirements: [
          '返回一个新函数',
          '支持预置参数',
          '支持后续调用时继续传参',
          '作为构造函数时，new 绑定优先于显式绑定',
        ],
        knowledgePoints: ['this 绑定', '柯里化参数', '原型链', 'new 优先级'],
        interviewTips: [
          '追问一：为什么 new 调用时要忽略绑定对象？',
          '追问二：bind 返回函数的 prototype 应该怎么处理？',
        ],
        usageExamples: [
          {
            title: '事件回调预绑定',
            code: `const handleClick = myBind(trackClick, analytics, 'button')`,
            description: '提前固定上下文和一部分参数。',
          },
          {
            title: '偏函数',
            code: `const addTen = myBind(add, null, 10)`,
            description: '在业务里也常用来做轻量参数预填充。',
          },
        ],
        solutionDetail: {
          approach: [
            '返回一个包装函数，在调用时拼接预置参数和运行时参数。',
            '普通调用走显式绑定的 context。',
            '如果通过 new 调用，this 应该指向新实例，而不是传入的 context。',
            '让返回函数的 prototype 继承原函数 prototype，保留构造场景。',
          ],
          timeComplexity: 'O(k)，k 为拼接参数数',
          spaceComplexity: 'O(1)',
          commonMistakes: [
            '忽略 new 调用场景',
            '没有拼接预置参数和后续参数',
            '没有处理 prototype，构造函数场景失效',
          ],
          followUps: [
            'bind 后的 length / name 能否保留？',
            '如何实现一个更接近原生行为的 bind？',
          ],
        },
        runCodeSnippet: `const { myBind } = exports
function greet(prefix, suffix) {
  console.log(prefix + this.name + suffix)
  return prefix + this.name + suffix
}
const bound = myBind(greet, { name: 'Tom' }, 'Hi ')
return bound('!')`,
      }
    case 'promise-all':
      return {
        ...normalizedProblem,
        title: '手写 Promise.all',
        description: `实现一个 promiseAll 函数，模拟 Promise.all 的核心行为。

这道题重点不在 Promise API 背诵，而在于你能否处理好结果顺序、空数组、Promise.resolve 包装和失败短路。`,
        requirements: [
          '全部成功时按原顺序返回结果数组',
          '任一任务失败时立即 reject',
          '支持普通值与 Promise 混用',
          '空数组输入应返回空结果',
        ],
        knowledgePoints: [
          'Promise 组合',
          'Promise.resolve',
          '失败短路',
          '结果顺序',
        ],
        interviewTips: [
          '追问一：Promise.all 和 allSettled 的区别是什么？',
          '追问二：为什么结果顺序不能按完成顺序返回？',
        ],
        usageExamples: [
          {
            title: '页面首屏并发请求',
            code: `const [profile, settings, messages] = await promiseAll([
  fetchProfile(),
  fetchSettings(),
  fetchMessages(),
])`,
            description: '多个资源都准备好后再统一渲染页面。',
          },
          {
            title: '批量静态资源预加载',
            code: `await promiseAll(imageUrls.map(loadImage))`,
            description: '所有图片都加载完成后再展示画廊。',
          },
        ],
        solutionDetail: {
          approach: [
            '返回一个新的 Promise，统一管理完成与失败。',
            '用结果数组按索引保存每个任务的最终值。',
            '每个输入统一用 Promise.resolve 包装。',
            '全部完成时 resolve，任一失败时直接 reject。',
          ],
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          commonMistakes: [
            '结果按完成顺序 push，导致顺序错乱',
            '没有处理空数组',
            '没有用 Promise.resolve 包装普通值',
          ],
          followUps: [
            '如何实现 allSettled / race / any？',
            '失败之后是否还会取消其他 Promise？',
          ],
        },
        runCodeSnippet: `const { promiseAll } = exports
const result = await promiseAll([
  Promise.resolve('profile'),
  new Promise((resolve) => setTimeout(() => resolve('settings'), 20)),
  'messages',
])
console.log('promiseAll done')
return result`,
      }
    case 'async-pool':
      return {
        ...normalizedProblem,
        title: '手写 asyncPool 并发控制',
        description: `实现一个 asyncPool 函数，限制一组异步任务的最大并发数。

这道题在“请求并发控制”“批量任务调度”“爬虫/上传队列”场景里非常常见，也是前端异步能力的高频考点。`,
        requirements: [
          '限制同时运行的任务数量不超过 limit',
          '保持最终结果顺序与输入顺序一致',
          '支持异步 iterator',
          '所有任务完成后返回结果数组',
        ],
        knowledgePoints: ['并发控制', 'Promise.race', '任务调度', '结果收集'],
        interviewTips: [
          '追问一：如果某个任务失败，要不要中断整体流程？',
          '追问二：如何支持动态插入新任务？',
        ],
        usageExamples: [
          {
            title: '批量上传文件',
            code: `await asyncPool(3, files, (file) => uploadFile(file))`,
            description: '限制上传并发数，避免浏览器和服务端瞬时压力过高。',
          },
          {
            title: '批量请求接口',
            code: `await asyncPool(5, ids, (id) => fetchDetail(id))`,
            description: '控制请求峰值，避免把后端或客户端打满。',
          },
        ],
        solutionDetail: {
          approach: [
            '维护一个 executing 集合，记录当前正在执行的任务。',
            '每次启动新任务后把它加入集合。',
            '如果集合大小达到 limit，就 await Promise.race(executing)。',
            '所有输入都遍历完后，再等待剩余执行中的任务结束。',
          ],
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(limit)',
          commonMistakes: [
            '结果没有按原索引放回去，顺序错乱',
            '没有在任务结束后把其从 executing 中移除',
            '把并发控制写成串行执行',
          ],
          followUps: ['如何支持失败重试？', '如何把并发池做成可复用调度器？'],
        },
        runCodeSnippet: `const { asyncPool } = exports
const result = await asyncPool(2, [1, 2, 3, 4], async (item) => {
  await new Promise((resolve) => setTimeout(resolve, 20))
  console.log('done item:', item)
  return item * 2
})
return result`,
      }
    case 'event-emitter':
      return {
        ...normalizedProblem,
        title: '手写 EventEmitter',
        description: `实现一个 EventEmitter 类，支持 on、off、once、emit。

这道题是前端里发布订阅模式的代表题，考察点通常集中在事件存储结构、取消订阅和 once 语义。`,
        requirements: [
          '支持 on 订阅事件',
          '支持 emit 派发事件并透传参数',
          '支持 off 取消订阅',
          '支持 once 仅触发一次',
        ],
        knowledgePoints: ['发布订阅', 'Map / Set', 'once 语义', '事件系统设计'],
        interviewTips: [
          '追问一：如何支持通配符事件？',
          '追问二：如果 handler 里再次 emit，会发生什么？',
        ],
        usageExamples: [
          {
            title: '组件间事件通信',
            code: `bus.on('user:login', (user) => {
  console.log(user.name)
})`,
            description: '在没有状态管理库的轻量场景下做模块解耦。',
          },
          {
            title: '全局通知中心',
            code: `bus.emit('toast', { type: 'success', message: '保存成功' })`,
            description: '通知中心、埋点总线、微前端通信都很常见。',
          },
        ],
        solutionDetail: {
          approach: [
            '使用 Map 存储事件名和对应处理函数集合。',
            'on 时把 handler 放到集合里，off 时删除。',
            'once 可以包装一个中间函数，在首次执行后自动 off。',
            'emit 时遍历对应事件的所有 handler 并执行。',
          ],
          timeComplexity: 'on/off 近似 O(1)，emit 为 O(k)',
          spaceComplexity: 'O(n)',
          commonMistakes: [
            'once 没有自动移除监听',
            '同一个事件的数据结构设计得过于复杂',
            'off 删除的是包装前函数，导致 once 无法正确移除',
          ],
          followUps: [
            '如何支持优先级、命名空间或事件回放？',
            'EventEmitter 和 PubSub 的边界在哪里？',
          ],
        },
        runCodeSnippet: `const { EventEmitter } = exports
const emitter = new EventEmitter()
emitter.on('change', (value) => {
  console.log('change:', value)
})
emitter.once('change', () => {
  console.log('only once')
})
emitter.emit('change', 1)
emitter.emit('change', 2)
return 'done'`,
      }
    case 'lru-cache':
      return {
        ...normalizedProblem,
        title: '手写 LRU Cache',
        description: `设计一个支持 get 和 set 的 LRU 缓存。

虽然它属于数据结构题，但非常贴近前端场景，比如接口缓存、计算结果缓存和本地数据淘汰策略。`,
        requirements: [
          '容量固定，超过后淘汰最近最少使用的数据',
          'get 命中后应更新最近使用顺序',
          'set 已存在 key 时应覆盖并更新顺序',
          'get 未命中返回 -1',
        ],
        knowledgePoints: ['缓存淘汰', 'Map', '数据结构设计', '访问顺序更新'],
        interviewTips: [
          '追问一：为什么 Map 很适合做这个题？',
          '追问二：如果要求 O(1) 且不依赖 Map 顺序，怎么做？',
        ],
        usageExamples: [
          {
            title: '接口结果缓存',
            code: `const cache = new LRUCache<string, ResponseData>(100)`,
            description: '热点数据常驻，冷数据逐步淘汰。',
          },
          {
            title: '昂贵计算缓存',
            code: `const cache = new LRUCache<string, Result>(50)`,
            description: '例如图表计算、搜索索引、Markdown 渲染结果缓存。',
          },
        ],
        solutionDetail: {
          approach: [
            '使用 Map 保存键值对，同时利用其插入顺序特性。',
            'get 命中时先删后插，刷新为最近使用。',
            'set 时如果 key 已存在也先删后插。',
            '容量超限后删除 Map 的第一个键，即最久未使用项。',
          ],
          timeComplexity: 'get / set 平均 O(1)',
          spaceComplexity: 'O(capacity)',
          commonMistakes: [
            '命中 get 后没有刷新顺序',
            '超限时删掉了最新数据而不是最旧数据',
            'set 已存在 key 时只覆盖值，没有更新顺序',
          ],
          followUps: [
            '如何基于双向链表 + 哈希表手写一个经典 LRU？',
            '如果要加过期时间 TTL，结构该怎么改？',
          ],
        },
        runCodeSnippet: `const { LRUCache } = exports
const cache = new LRUCache(2)
cache.set('a', 1)
cache.set('b', 2)
cache.get('a')
cache.set('c', 3)
console.log('b after eviction:', cache.get('b'))
return {
  a: cache.get('a'),
  b: cache.get('b'),
  c: cache.get('c'),
}`,
      }
    case 'curry':
      return {
        ...normalizedProblem,
        title: '手写 curry 柯里化',
        description: `实现一个 curry 函数，把多参数函数拆成可连续调用的函数。

这道题比较适合看函数式基础，高频点在“参数收集”“达到 arity 后执行”和“返回函数递归继续收参”。`,
        requirements: [
          '支持分多次传参',
          '参数数量达到原函数长度时执行',
          '支持一次传多个参数',
          '最终返回原函数执行结果',
        ],
        knowledgePoints: ['高阶函数', '递归', '参数收集', 'fn.length'],
        interviewTips: [
          '追问一：如何支持占位符？',
          '追问二：箭头函数和普通函数在这题里有区别吗？',
        ],
        usageExamples: [
          {
            title: '条件组合',
            code: `const add = curry((a, b, c) => a + b + c)`,
            description: '把一个多参数函数拆成更灵活的连续调用形式。',
          },
          {
            title: '函数式工具库',
            code: `const match = curry((pattern, text) => text.match(pattern))`,
            description: '很多函数式工具库都会用到柯里化来提升复用性。',
          },
        ],
        solutionDetail: {
          approach: [
            '返回一个 curried 函数，用于累计参数。',
            '每次调用判断当前参数数是否达到 fn.length。',
            '如果达到则执行原函数，否则返回新的收参函数。',
          ],
          timeComplexity: '累计收参阶段每次 O(k)',
          spaceComplexity: 'O(k)',
          commonMistakes: [
            '只支持一次传一个参数',
            '没有按 fn.length 判断是否执行',
            '递归收参时把之前参数覆盖掉了',
          ],
          followUps: [
            '如何支持占位符 curry(fn)(_, 2)(1)？',
            '手写 compose / pipe 和 curry 之间有什么联系？',
          ],
        },
        runCodeSnippet: `const { curry } = exports
const join = curry((a, b, c) => \`\${a}-\${b}-\${c}\`)
const result = join('A')('B')('C')
console.log('curried result:', result)
return result`,
      }
    default:
      return normalizedProblem
  }
})

export const problems = enrichedProblems
export { problemCategories }

export const problemsById = Object.fromEntries(
  problems.map((problem) => [problem.id, problem]),
) as Record<string, Problem>

export function getProblemById(problemId: string) {
  return problemsById[problemId]
}

export const problemOrder = problems.map((problem) => problem.id)

export function getProblemIndex(problemId: string) {
  return problemOrder.findIndex((id) => id === problemId)
}

export function getAdjacentProblems(problemId: string) {
  const index = getProblemIndex(problemId)

  return {
    previous: index > 0 ? byId(problemOrder[index - 1]) : null,
    next:
      index >= 0 && index < problemOrder.length - 1
        ? byId(problemOrder[index + 1])
        : null,
    index,
    total: problemOrder.length,
  }
}
