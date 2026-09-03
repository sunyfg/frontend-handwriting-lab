import type { ProblemTestCase } from './types'

const noopCases: ProblemTestCase[] = []

const casesMap: Record<string, ProblemTestCase[]> = {
  debounce: [
    {
      name: '连续调用只执行最后一次',
      async run({ exports, helpers }) {
        const debounce = exports.debounce as
          | ((
              fn: (...args: unknown[]) => void,
              delay: number,
            ) => (...args: unknown[]) => void)
          | undefined

        helpers.ok(typeof debounce === 'function', '应该导出 debounce 函数')

        const calls: unknown[][] = []
        const wrapped = debounce!((...args) => {
          calls.push(args)
        }, 20)

        wrapped('a')
        wrapped('b')
        wrapped('c')
        await helpers.sleep(35)

        helpers.equal(calls.length, 1, '只应该执行一次')
        helpers.deepEqual(calls[0], ['c'], '应该保留最后一次参数')
      },
    },
    {
      name: '多次调用会重新计时',
      async run({ exports, helpers }) {
        const debounce = exports.debounce as
          ((fn: () => void, delay: number) => () => void) | undefined
        helpers.ok(typeof debounce === 'function', '应该导出 debounce 函数')

        let count = 0
        const wrapped = debounce!(() => {
          count += 1
        }, 25)

        wrapped()
        await helpers.sleep(10)
        wrapped()
        await helpers.sleep(10)
        wrapped()
        await helpers.sleep(40)

        helpers.equal(count, 1, '重新触发后应只执行一次')
      },
    },
  ],
  throttle: [
    {
      name: '节流窗口内只执行一次',
      async run({ exports, helpers }) {
        const throttle = exports.throttle as
          | ((
              fn: (...args: unknown[]) => void,
              delay: number,
            ) => (...args: unknown[]) => void)
          | undefined
        helpers.ok(typeof throttle === 'function', '应该导出 throttle 函数')

        const values: unknown[] = []
        const wrapped = throttle!((value) => {
          values.push(value)
        }, 30)

        wrapped('first')
        wrapped('second')
        await helpers.sleep(40)
        wrapped('third')

        helpers.deepEqual(
          values,
          ['first', 'third'],
          '应保留每个窗口第一次调用',
        )
      },
    },
  ],
  'deep-clone': [
    {
      name: '深拷贝嵌套对象',
      run({ exports, helpers }) {
        const deepClone = exports.deepClone as (<T>(value: T) => T) | undefined
        helpers.ok(typeof deepClone === 'function', '应该导出 deepClone 函数')

        const source = {
          user: { name: 'Sun' },
          tags: ['a', 'b'],
          nested: [{ score: 1 }],
        }

        const cloned = deepClone!(source)

        helpers.deepEqual(cloned, source, '深拷贝后结构应该一致')
        helpers.ok(cloned !== source, '返回对象不能与原对象同引用')
        helpers.ok(cloned.user !== source.user, '嵌套对象需要是新引用')
        helpers.ok(cloned.tags !== source.tags, '嵌套数组需要是新引用')
      },
    },
    {
      name: '支持循环引用',
      run({ exports, helpers }) {
        const deepClone = exports.deepClone as
          | ((value: Record<string, unknown>) => Record<string, unknown>)
          | undefined
        helpers.ok(typeof deepClone === 'function', '应该导出 deepClone 函数')

        const source: Record<string, unknown> = { name: 'loop' }
        source.self = source
        const cloned = deepClone!(source)

        helpers.ok(cloned !== source, '循环引用对象也应生成新对象')
        helpers.equal(cloned.self, cloned, '循环引用结构应该保持')
      },
    },
  ],
  'my-call': [
    {
      name: '绑定 this 并传递参数',
      run({ exports, helpers }) {
        const myCall = exports.myCall as
          | ((
              fn: (...args: unknown[]) => unknown,
              context: unknown,
              ...args: unknown[]
            ) => unknown)
          | undefined
        helpers.ok(typeof myCall === 'function', '应该导出 myCall 函数')

        function greet(this: { name: string }, prefix: string) {
          return prefix + this.name
        }

        const result = myCall!(
          greet as unknown as (...args: unknown[]) => unknown,
          { name: 'Tom' },
          'Hi ',
        )
        helpers.equal(result, 'Hi Tom')
      },
    },
  ],
  'my-bind': [
    {
      name: '支持预置参数',
      run({ exports, helpers }) {
        const myBind = exports.myBind as
          | ((
              fn: (...args: unknown[]) => unknown,
              context: unknown,
              ...args: unknown[]
            ) => (...args: unknown[]) => unknown)
          | undefined
        helpers.ok(typeof myBind === 'function', '应该导出 myBind 函数')

        function greet(this: { name: string }, prefix: string, suffix: string) {
          return prefix + this.name + suffix
        }

        const bound = myBind!(
          greet as unknown as (...args: unknown[]) => unknown,
          { name: 'Tom' },
          'Hi ',
        )
        helpers.equal(bound('!'), 'Hi Tom!')
      },
    },
  ],
  'promise-all': [
    {
      name: '保持结果顺序',
      async run({ exports, helpers }) {
        const promiseAll = exports.promiseAll as
          (<T>(iterable: Array<T | PromiseLike<T>>) => Promise<T[]>) | undefined
        helpers.ok(typeof promiseAll === 'function', '应该导出 promiseAll 函数')

        const result = await promiseAll!([
          Promise.resolve(1),
          new Promise<number>((resolve) => {
            window.setTimeout(() => resolve(2), 10)
          }),
          3,
        ])

        helpers.deepEqual(result, [1, 2, 3])
      },
    },
    {
      name: '任一失败时立即 reject',
      async run({ exports, helpers }) {
        const promiseAll = exports.promiseAll as
          (<T>(iterable: Array<T | PromiseLike<T>>) => Promise<T[]>) | undefined
        helpers.ok(typeof promiseAll === 'function', '应该导出 promiseAll 函数')

        let failed = false

        try {
          await promiseAll!([
            Promise.resolve(1),
            Promise.reject(new Error('fail')),
          ])
        } catch (error) {
          failed = true
          helpers.equal((error as Error).message, 'fail')
        }

        helpers.ok(failed, '应该在失败时 reject')
      },
    },
  ],
  'async-pool': [
    {
      name: '限制最大并发数',
      async run({ exports, helpers }) {
        const asyncPool = exports.asyncPool as
          | (<T, TResult>(
              limit: number,
              items: T[],
              iterator: (item: T, index: number) => Promise<TResult>,
            ) => Promise<TResult[]>)
          | undefined
        helpers.ok(typeof asyncPool === 'function', '应该导出 asyncPool 函数')

        let running = 0
        let maxRunning = 0

        const result = await asyncPool!(2, [1, 2, 3, 4], async (item) => {
          running += 1
          maxRunning = Math.max(maxRunning, running)
          await helpers.sleep(10)
          running -= 1
          return item * 2
        })

        helpers.deepEqual(result, [2, 4, 6, 8], '结果顺序应该与输入一致')
        helpers.ok(maxRunning <= 2, '最大并发数不能超过 limit')
      },
    },
  ],
  'event-emitter': [
    {
      name: '支持 on emit off once',
      run({ exports, helpers }) {
        const EventEmitter = exports.EventEmitter as
          | (new () => {
              on: (event: string, handler: (...args: unknown[]) => void) => void
              off: (
                event: string,
                handler: (...args: unknown[]) => void,
              ) => void
              once: (
                event: string,
                handler: (...args: unknown[]) => void,
              ) => void
              emit: (event: string, ...args: unknown[]) => void
            })
          | undefined

        helpers.ok(
          typeof EventEmitter === 'function',
          '应该导出 EventEmitter 类',
        )

        const emitter = new EventEmitter!()
        let count = 0
        const onHandler = () => {
          count += 1
        }
        let onceCount = 0

        emitter.on('change', onHandler)
        emitter.once('change', () => {
          onceCount += 1
        })
        emitter.emit('change')
        emitter.emit('change')
        emitter.off('change', onHandler)
        emitter.emit('change')

        helpers.equal(count, 2)
        helpers.equal(onceCount, 1)
      },
    },
  ],
  'lru-cache': [
    {
      name: '按最近最少使用淘汰数据',
      run({ exports, helpers }) {
        const LRUCache = exports.LRUCache as
          | (new <TKey, TValue>(
              capacity: number,
            ) => {
              get: (key: TKey) => TValue | -1
              set: (key: TKey, value: TValue) => void
            })
          | undefined
        helpers.ok(typeof LRUCache === 'function', '应该导出 LRUCache 类')

        const cache = new LRUCache!(2)
        cache.set(1, 1)
        cache.set(2, 2)
        helpers.equal(cache.get(1), 1)
        cache.set(3, 3)
        helpers.equal(cache.get(2), -1)
      },
    },
  ],
  curry: [
    {
      name: '支持分步收集参数',
      run({ exports, helpers }) {
        const curry = exports.curry as
          | (<TArgs extends unknown[], TResult>(
              fn: (...args: TArgs) => TResult,
            ) => (...args: unknown[]) => unknown)
          | undefined
        helpers.ok(typeof curry === 'function', '应该导出 curry 函数')

        const join = (a: string, b: string, c: string) => `${a}-${b}-${c}`
        const curried = curry!(join)

        const first = curried('a') as (value: string) => unknown
        const second = first('b') as (value: string) => string
        helpers.equal(second('c'), 'a-b-c')

        const combined = curried('a', 'b') as (value: string) => string
        helpers.equal(combined('c'), 'a-b-c')
      },
    },
  ],
}

export function createProblemTestCases(problemId: string): ProblemTestCase[] {
  return casesMap[problemId] ?? noopCases
}
