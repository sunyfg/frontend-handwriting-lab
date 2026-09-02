import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const rootDir = process.cwd()

const categoryLabels = {
  javascript: 'JavaScript 基础',
  async: '异步',
  function: '函数相关',
  object: '对象与拷贝',
  array: '数组',
  browser: '浏览器',
  algorithm: '算法/数据结构',
  react: 'React',
}

const problems = [
  {
    slug: 'myTypeof',
    category: 'javascript',
    title: '手写 typeof',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 8,
    points: ['类型判断', '边界处理', '原始值与引用值'],
    summary: '实现一个比原生 typeof 更可用的类型判断函数。',
    problem: `
import { createTodoError } from '../../utils/todo'

/**
 * 题目：手写 typeof
 * 要求：
 * 1. 能正确识别 null、array、date、regexp 等常见类型。
 * 2. 返回结果统一为小写字符串。
 * 3. 保持函数无副作用。
 */
export function myTypeof(value: unknown): string {
  // TODO: 请实现 myTypeof
  throw createTodoError('myTypeof')
}
`,
    solution: `
export function myTypeof(value: unknown): string {
  if (value === null) {
    return 'null'
  }

  if (Array.isArray(value)) {
    return 'array'
  }

  if (value instanceof Date) {
    return 'date'
  }

  if (value instanceof RegExp) {
    return 'regexp'
  }

  const type = typeof value

  if (type !== 'object') {
    return type
  }

  return 'object'
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { myTypeof } from '../../problems/javascript/myTypeof'

describe('myTypeof', () => {
  it('识别常见类型', () => {
    expect(myTypeof(null)).toBe('null')
    expect(myTypeof([])).toBe('array')
    expect(myTypeof({})).toBe('object')
    expect(myTypeof(() => {})).toBe('function')
    expect(myTypeof(new Date())).toBe('date')
    expect(myTypeof(/a/)).toBe('regexp')
  })

  it('识别原始值', () => {
    expect(myTypeof('hello')).toBe('string')
    expect(myTypeof(1)).toBe('number')
    expect(myTypeof(true)).toBe('boolean')
    expect(myTypeof(undefined)).toBe('undefined')
    expect(myTypeof(Symbol('x'))).toBe('symbol')
  })
})
`,
  },
  {
    slug: 'myInstanceof',
    category: 'javascript',
    title: '手写 instanceof',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 10,
    points: ['原型链', '构造函数', '边界处理'],
    summary: '沿着原型链查找，判断对象是否来自指定构造函数。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function myInstanceof(
  value: unknown,
  constructor: Function,
): boolean {
  // TODO: 请实现 myInstanceof
  throw createTodoError('myInstanceof')
}
`,
    solution: `
export function myInstanceof(
  value: unknown,
  constructor: Function,
): boolean {
  if (
    (typeof value !== 'object' && typeof value !== 'function') ||
    value === null
  ) {
    return false
  }

  let current = Object.getPrototypeOf(value)

  while (current) {
    if (current === constructor.prototype) {
      return true
    }
    current = Object.getPrototypeOf(current)
  }

  return false
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { myInstanceof } from '../../problems/javascript/myInstanceof'

describe('myInstanceof', () => {
  it('沿原型链查找构造函数原型', () => {
    expect(myInstanceof([], Array)).toBe(true)
    expect(myInstanceof(new Date(), Date)).toBe(true)
    expect(myInstanceof({}, Array)).toBe(false)
  })

  it('处理非对象值', () => {
    expect(myInstanceof(null, Object)).toBe(false)
    expect(myInstanceof(1, Number)).toBe(false)
    expect(myInstanceof('x', String)).toBe(false)
  })
})
`,
  },
  {
    slug: 'objectCreate',
    category: 'javascript',
    title: '手写 Object.create',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['原型继承', '属性描述符', '对象创建'],
    summary: '模拟 Object.create 的核心行为，支持可选属性描述符。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function objectCreate<T extends object>(
  prototype: T | null,
  properties?: PropertyDescriptorMap,
): T {
  // TODO: 请实现 objectCreate
  throw createTodoError('objectCreate')
}
`,
    solution: `
export function objectCreate<T extends object>(
  prototype: T | null,
  properties?: PropertyDescriptorMap,
): T {
  function Temporary() {}

  Temporary.prototype = prototype
  const instance = new Temporary() as T

  if (prototype === null) {
    Object.setPrototypeOf(instance, null)
  }

  if (properties) {
    Object.defineProperties(instance, properties)
  }

  return instance
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { objectCreate } from '../../problems/javascript/objectCreate'

describe('objectCreate', () => {
  it('创建指定原型对象', () => {
    const proto = { name: 'lab' }
    const target = objectCreate(proto)

    expect(Object.getPrototypeOf(target)).toBe(proto)
    expect((target as { name: string }).name).toBe('lab')
  })

  it('支持属性描述符', () => {
    const target = objectCreate(
      {},
      {
        age: {
          value: 18,
          enumerable: true,
        },
      },
    ) as { age: number }

    expect(target.age).toBe(18)
    expect(Object.keys(target)).toContain('age')
  })
})
`,
  },
  {
    slug: 'mockNew',
    category: 'javascript',
    title: '手写 new',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 12,
    points: ['new 流程', 'this 绑定', '返回值规则'],
    summary: '模拟 new 运算符：创建对象、绑定原型、执行构造函数并处理返回值。',
    problem: `
import { createTodoError } from '../../utils/todo'

type Constructor<T, TArgs extends unknown[]> = new (...args: TArgs) => T

export function mockNew<T, TArgs extends unknown[]>(
  ConstructorFn: Constructor<T, TArgs>,
  ...args: TArgs
): T {
  // TODO: 请实现 mockNew
  throw createTodoError('mockNew')
}
`,
    solution: `
type Constructor<T, TArgs extends unknown[]> = new (...args: TArgs) => T

export function mockNew<T, TArgs extends unknown[]>(
  ConstructorFn: Constructor<T, TArgs>,
  ...args: TArgs
): T {
  const instance = Object.create(ConstructorFn.prototype) as T
  const result = ConstructorFn.apply(instance, args)

  if (
    (typeof result === 'object' && result !== null) ||
    typeof result === 'function'
  ) {
    return result as T
  }

  return instance
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { mockNew } from '../../problems/javascript/mockNew'

describe('mockNew', () => {
  it('执行构造函数并挂载原型', () => {
    function Person(this: { name?: string }, name: string) {
      this.name = name
    }

    Person.prototype.sayHi = function sayHi() {
      return 'hi'
    }

    const person = mockNew(Person as never, 'sun')

    expect((person as { name: string }).name).toBe('sun')
    expect((person as { sayHi: () => string }).sayHi()).toBe('hi')
  })

  it('优先返回构造函数返回的对象', () => {
    function Factory() {
      return { ok: true }
    }

    expect(mockNew(Factory as never)).toEqual({ ok: true })
  })
})
`,
  },
  {
    slug: 'myCall',
    category: 'javascript',
    title: '手写 call',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 10,
    points: ['this 绑定', '参数展开', '隐式属性'],
    summary: '实现显式绑定 this 的 call 方法。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function myCall<TContext, TArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: TArgs) => TResult,
  context: TContext,
  ...args: TArgs
): TResult {
  // TODO: 请实现 myCall
  throw createTodoError('myCall')
}
`,
    solution: `
export function myCall<TContext, TArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: TArgs) => TResult,
  context: TContext,
  ...args: TArgs
): TResult {
  const target =
    context === null || context === undefined
      ? (globalThis as TContext)
      : Object(context)

  const key = Symbol('call')
  ;(target as Record<PropertyKey, unknown>)[key] = fn
  const result = (target as Record<PropertyKey, (...params: TArgs) => TResult>)[
    key
  ](...args)
  delete (target as Record<PropertyKey, unknown>)[key]
  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { myCall } from '../../problems/javascript/myCall'

describe('myCall', () => {
  it('绑定 this 并传入参数', () => {
    function greet(this: { name: string }, prefix: string) {
      return prefix + this.name
    }

    expect(myCall(greet, { name: 'lab' }, 'hi ')).toBe('hi lab')
  })

  it('支持 null 或 undefined 上下文', () => {
    ;(globalThis as { label?: string }).label = 'global'

    function read(this: { label?: string }) {
      return this.label
    }

    expect(myCall(read, undefined)).toBe('global')
  })
})
`,
  },
  {
    slug: 'myApply',
    category: 'javascript',
    title: '手写 apply',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 10,
    points: ['this 绑定', '数组参数', '边界处理'],
    summary: '实现显式绑定 this 的 apply 方法。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function myApply<TContext, TArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: TArgs) => TResult,
  context: TContext,
  args?: TArgs,
): TResult {
  // TODO: 请实现 myApply
  throw createTodoError('myApply')
}
`,
    solution: `
export function myApply<TContext, TArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: TArgs) => TResult,
  context: TContext,
  args?: TArgs,
): TResult {
  const target =
    context === null || context === undefined
      ? (globalThis as TContext)
      : Object(context)

  const key = Symbol('apply')
  ;(target as Record<PropertyKey, unknown>)[key] = fn
  const result = (target as Record<PropertyKey, (...params: TArgs) => TResult>)[
    key
  ](...(args ?? []))
  delete (target as Record<PropertyKey, unknown>)[key]
  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { myApply } from '../../problems/javascript/myApply'

describe('myApply', () => {
  it('接收数组形式参数', () => {
    function sum(this: { offset: number }, a: number, b: number) {
      return this.offset + a + b
    }

    expect(myApply(sum, { offset: 1 }, [2, 3])).toBe(6)
  })

  it('处理缺省参数数组', () => {
    function read(this: { value: string }) {
      return this.value
    }

    expect(myApply(read, { value: 'ok' })).toBe('ok')
  })
})
`,
  },
  {
    slug: 'myBind',
    category: 'javascript',
    title: '手写 bind',
    difficulty: 'Hard',
    frequency: '★★★★★',
    suggestedMinutes: 18,
    points: ['this 绑定', '柯里化参数', 'new 绑定优先级'],
    summary: '实现 bind，支持预置参数和 new 调用场景。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function myBind<TContext, TArgs extends unknown[], TBoundArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: [...TBoundArgs, ...TArgs]) => TResult,
  context: TContext,
  ...boundArgs: TBoundArgs
): (...args: TArgs) => TResult {
  // TODO: 请实现 myBind
  throw createTodoError('myBind')
}
`,
    solution: `
export function myBind<TContext, TArgs extends unknown[], TBoundArgs extends unknown[], TResult>(
  fn: (this: TContext, ...args: [...TBoundArgs, ...TArgs]) => TResult,
  context: TContext,
  ...boundArgs: TBoundArgs
): (...args: TArgs) => TResult {
  function bound(this: TContext, ...args: TArgs): TResult {
    const finalContext =
      this instanceof bound
        ? (this as TContext)
        : context === null || context === undefined
          ? (globalThis as TContext)
          : context

    return fn.apply(finalContext, [...boundArgs, ...args])
  }

  bound.prototype = Object.create(fn.prototype)

  return bound
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { myBind } from '../../problems/javascript/myBind'

describe('myBind', () => {
  it('绑定 this 和预置参数', () => {
    function greet(this: { name: string }, prefix: string, suffix: string) {
      return prefix + this.name + suffix
    }

    const bound = myBind(greet, { name: 'lab' }, 'hi ')

    expect(bound('!')).toBe('hi lab!')
  })

  it('作为构造函数时忽略绑定对象', () => {
    function Person(this: { name?: string }, name: string) {
      this.name = name
    }

    const BoundPerson = myBind(Person as never, { name: 'ignored' })
    const person = new (BoundPerson as unknown as new (name: string) => {
      name: string
    })('sun')

    expect(person.name).toBe('sun')
  })
})
`,
  },
  {
    slug: 'debounce',
    category: 'function',
    title: 'debounce 防抖',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 10,
    points: ['定时器', '闭包', '高频事件优化'],
    summary: '在连续触发时只执行最后一次调用。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  // TODO: 请实现 debounce
  throw createTodoError('debounce')
}
`,
    solution: `
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: TArgs) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
`,
    test: `
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from '../../problems/function/debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('只执行最后一次调用', () => {
    const fn = vi.fn()
    const wrapped = debounce(fn, 100)

    wrapped(1)
    wrapped(2)
    wrapped(3)

    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(3)
  })
})
`,
  },
  {
    slug: 'throttle',
    category: 'function',
    title: 'throttle 节流',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 10,
    points: ['定时器', '节流窗口', '高频事件优化'],
    summary: '限制函数在固定时间窗口内只触发一次。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  // TODO: 请实现 throttle
  throw createTodoError('throttle')
}
`,
    solution: `
export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let locked = false

  return (...args: TArgs) => {
    if (locked) {
      return
    }

    locked = true
    fn(...args)

    setTimeout(() => {
      locked = false
    }, delay)
  }
}
`,
    test: `
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { throttle } from '../../problems/function/throttle'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('在窗口内只触发一次', () => {
    const fn = vi.fn()
    const wrapped = throttle(fn, 100)

    wrapped('a')
    wrapped('b')
    wrapped('c')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    vi.advanceTimersByTime(100)
    wrapped('d')
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith('d')
  })
})
`,
  },
  {
    slug: 'curry',
    category: 'function',
    title: 'curry 柯里化',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['高阶函数', '参数收集', '递归'],
    summary: '把多参数函数拆解成可连续调用的单参函数。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function curry<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: unknown[]) => TResult | ReturnType<typeof curry<TArgs, TResult>> {
  // TODO: 请实现 curry
  throw createTodoError('curry')
}
`,
    solution: `
export function curry<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: unknown[]) => TResult | ReturnType<typeof curry<TArgs, TResult>> {
  function curried(...args: unknown[]) {
    if (args.length >= fn.length) {
      return fn(...(args as TArgs))
    }

    return (...rest: unknown[]) => curried(...args, ...rest)
  }

  return curried
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { curry } from '../../problems/function/curry'

describe('curry', () => {
  it('支持分步收集参数', () => {
    const join = (a: string, b: string, c: string) => a + b + c
    const curried = curry(join)

    expect(curried('a')('b')('c')).toBe('abc')
    expect(curried('a', 'b')('c')).toBe('abc')
  })
})
`,
  },
  {
    slug: 'compose',
    category: 'function',
    title: 'compose',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['函数组合', '从右到左执行', '高阶函数'],
    summary: '把多个函数从右到左组合成一个新函数。',
    problem: `
import { createTodoError } from '../../utils/todo'

type Unary<TInput, TOutput> = (input: TInput) => TOutput

export function compose<T>(...fns: Array<Unary<T, T>>): Unary<T, T> {
  // TODO: 请实现 compose
  throw createTodoError('compose')
}
`,
    solution: `
type Unary<TInput, TOutput> = (input: TInput) => TOutput

export function compose<T>(...fns: Array<Unary<T, T>>): Unary<T, T> {
  return (input: T) => fns.reduceRight((value, fn) => fn(value), input)
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { compose } from '../../problems/function/compose'

describe('compose', () => {
  it('从右到左执行函数', () => {
    const add1 = (value: number) => value + 1
    const double = (value: number) => value * 2

    expect(compose(add1, double)(2)).toBe(5)
  })

  it('空函数列表返回原值', () => {
    expect(compose<number>()(3)).toBe(3)
  })
})
`,
  },
  {
    slug: 'pipe',
    category: 'function',
    title: 'pipe',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['函数组合', '从左到右执行', '高阶函数'],
    summary: '把多个函数从左到右组合成一个新函数。',
    problem: `
import { createTodoError } from '../../utils/todo'

type Unary<TInput, TOutput> = (input: TInput) => TOutput

export function pipe<T>(...fns: Array<Unary<T, T>>): Unary<T, T> {
  // TODO: 请实现 pipe
  throw createTodoError('pipe')
}
`,
    solution: `
type Unary<TInput, TOutput> = (input: TInput) => TOutput

export function pipe<T>(...fns: Array<Unary<T, T>>): Unary<T, T> {
  return (input: T) => fns.reduce((value, fn) => fn(value), input)
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { pipe } from '../../problems/function/pipe'

describe('pipe', () => {
  it('从左到右执行函数', () => {
    const add1 = (value: number) => value + 1
    const double = (value: number) => value * 2

    expect(pipe(add1, double)(2)).toBe(6)
  })
})
`,
  },
  {
    slug: 'once',
    category: 'function',
    title: 'once',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['闭包', '缓存结果', '函数包装'],
    summary: '让函数只执行一次，后续直接返回首次结果。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function once<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  // TODO: 请实现 once
  throw createTodoError('once')
}
`,
    solution: `
export function once<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  let called = false
  let result: TResult

  return (...args: TArgs) => {
    if (!called) {
      called = true
      result = fn(...args)
    }

    return result
  }
}
`,
    test: `
import { describe, expect, it, vi } from 'vitest'
import { once } from '../../problems/function/once'

describe('once', () => {
  it('只执行一次并缓存结果', () => {
    const fn = vi.fn((value: number) => value * 2)
    const wrapped = once(fn)

    expect(wrapped(2)).toBe(4)
    expect(wrapped(4)).toBe(4)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
`,
  },
  {
    slug: 'memoize',
    category: 'function',
    title: 'memoize',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['缓存', '闭包', '高阶函数'],
    summary: '缓存相同输入的计算结果，避免重复执行。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  resolver?: (...args: TArgs) => string,
): (...args: TArgs) => TResult {
  // TODO: 请实现 memoize
  throw createTodoError('memoize')
}
`,
    solution: `
export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  resolver?: (...args: TArgs) => string,
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>()

  return (...args: TArgs) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key) as TResult
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}
`,
    test: `
import { describe, expect, it, vi } from 'vitest'
import { memoize } from '../../problems/function/memoize'

describe('memoize', () => {
  it('缓存相同参数的执行结果', () => {
    const fn = vi.fn((a: number, b: number) => a + b)
    const wrapped = memoize(fn)

    expect(wrapped(1, 2)).toBe(3)
    expect(wrapped(1, 2)).toBe(3)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
`,
  },
  {
    slug: 'shallowClone',
    category: 'object',
    title: 'shallowClone',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['浅拷贝', '对象遍历', '数组处理'],
    summary: '实现对象和数组的浅拷贝。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function shallowClone<T>(value: T): T {
  // TODO: 请实现 shallowClone
  throw createTodoError('shallowClone')
}
`,
    solution: `
export function shallowClone<T>(value: T): T {
  if (Array.isArray(value)) {
    return [...value] as T
  }

  if (value && typeof value === 'object') {
    return { ...(value as Record<string, unknown>) } as T
  }

  return value
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { shallowClone } from '../../problems/object/shallowClone'

describe('shallowClone', () => {
  it('拷贝对象第一层属性', () => {
    const source = { nested: { value: 1 }, list: [1, 2] }
    const cloned = shallowClone(source)

    expect(cloned).toEqual(source)
    expect(cloned).not.toBe(source)
    expect(cloned.nested).toBe(source.nested)
  })
})
`,
  },
  {
    slug: 'deepClone',
    category: 'object',
    title: 'deepClone',
    difficulty: 'Hard',
    frequency: '★★★★★',
    suggestedMinutes: 18,
    points: ['递归', '循环引用', '复杂引用类型'],
    summary: '实现支持循环引用的深拷贝。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function deepClone<T>(value: T): T {
  // TODO: 请实现 deepClone
  throw createTodoError('deepClone')
}
`,
    solution: `
export function deepClone<T>(value: T, cache = new WeakMap()): T {
  if (typeof value !== 'object' || value === null) {
    return value
  }

  if (cache.has(value as object)) {
    return cache.get(value as object) as T
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T
  }

  if (value instanceof Map) {
    const clonedMap = new Map()
    cache.set(value, clonedMap)
    value.forEach((mapValue, mapKey) => {
      clonedMap.set(deepClone(mapKey, cache), deepClone(mapValue, cache))
    })
    return clonedMap as T
  }

  if (value instanceof Set) {
    const clonedSet = new Set()
    cache.set(value, clonedSet)
    value.forEach((setValue) => {
      clonedSet.add(deepClone(setValue, cache))
    })
    return clonedSet as T
  }

  const result: Record<string, unknown> | unknown[] = Array.isArray(value)
    ? []
    : {}
  cache.set(value as object, result)

  Reflect.ownKeys(value as object).forEach((key) => {
    result[key as keyof typeof result] = deepClone(
      (value as Record<PropertyKey, unknown>)[key],
      cache,
    )
  })

  return result as T
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { deepClone } from '../../problems/object/deepClone'

describe('deepClone', () => {
  it('深拷贝嵌套对象', () => {
    const source = {
      nested: { value: 1 },
      list: [1, { ok: true }],
      date: new Date('2024-01-01'),
    }
    const cloned = deepClone(source)

    expect(cloned).toEqual(source)
    expect(cloned).not.toBe(source)
    expect(cloned.nested).not.toBe(source.nested)
    expect(cloned.list).not.toBe(source.list)
  })

  it('处理循环引用', () => {
    const source: Record<string, unknown> = {}
    source.self = source

    const cloned = deepClone(source)

    expect(cloned).not.toBe(source)
    expect(cloned.self).toBe(cloned)
  })
})
`,
  },
  {
    slug: 'deepEqual',
    category: 'object',
    title: 'deepEqual',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 15,
    points: ['递归比较', '数组对象比较', '边界处理'],
    summary: '递归比较两个值在结构和值上是否完全相等。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function deepEqual(a: unknown, b: unknown): boolean {
  // TODO: 请实现 deepEqual
  throw createTodoError('deepEqual')
}
`,
    solution: `
export function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) {
    return true
  }

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false
  }

  const keysA = Reflect.ownKeys(a)
  const keysB = Reflect.ownKeys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  return keysA.every((key) =>
    deepEqual(
      (a as Record<PropertyKey, unknown>)[key],
      (b as Record<PropertyKey, unknown>)[key],
    ),
  )
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { deepEqual } from '../../problems/object/deepEqual'

describe('deepEqual', () => {
  it('比较嵌套对象和数组', () => {
    expect(deepEqual({ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] })).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('比较日期和正则', () => {
    expect(deepEqual(new Date('2024-01-01'), new Date('2024-01-01'))).toBe(
      true,
    )
    expect(deepEqual(/a/gi, /a/g)).toBe(false)
  })
})
`,
  },
  {
    slug: 'flattenObject',
    category: 'object',
    title: 'flattenObject',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['递归', '路径拼接', '对象遍历'],
    summary: '把多层嵌套对象拍平成路径到值的映射。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function flattenObject(
  value: Record<string, unknown>,
): Record<string, unknown> {
  // TODO: 请实现 flattenObject
  throw createTodoError('flattenObject')
}
`,
    solution: `
export function flattenObject(
  value: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  function walk(current: unknown, path: string) {
    if (
      current === null ||
      typeof current !== 'object' ||
      current instanceof Date ||
      current instanceof RegExp
    ) {
      result[path] = current
      return
    }

    if (Array.isArray(current)) {
      if (current.length === 0) {
        result[path] = []
        return
      }

      current.forEach((item, index) => {
        walk(item, path ? path + '.' + index : String(index))
      })
      return
    }

    const entries = Object.entries(current)

    if (entries.length === 0 && path) {
      result[path] = {}
      return
    }

    entries.forEach(([key, item]) => {
      walk(item, path ? path + '.' + key : key)
    })
  }

  walk(value, '')
  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { flattenObject } from '../../problems/object/flattenObject'

describe('flattenObject', () => {
  it('拍平嵌套对象和数组', () => {
    expect(
      flattenObject({
        user: {
          name: 'sun',
          tags: ['a', 'b'],
        },
      }),
    ).toEqual({
      'user.name': 'sun',
      'user.tags.0': 'a',
      'user.tags.1': 'b',
    })
  })
})
`,
  },
  {
    slug: 'unflattenObject',
    category: 'object',
    title: 'unflattenObject',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['路径解析', '对象重建', '数组索引处理'],
    summary: '把路径到值的映射重新还原成嵌套对象。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function unflattenObject(
  value: Record<string, unknown>,
): Record<string, unknown> {
  // TODO: 请实现 unflattenObject
  throw createTodoError('unflattenObject')
}
`,
    solution: `
export function unflattenObject(
  value: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  Object.entries(value).forEach(([path, pathValue]) => {
    const segments = path.split('.')
    let current: Record<string, unknown> | unknown[] = result

    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1
      const nextSegment = segments[index + 1]
      const nextIsIndex = nextSegment !== undefined && /^\\d+$/.test(nextSegment)
      const isIndex = /^\\d+$/.test(segment)
      const key = isIndex ? Number(segment) : segment

      if (isLast) {
        current[key as keyof typeof current] = pathValue
        return
      }

      if (current[key as keyof typeof current] === undefined) {
        current[key as keyof typeof current] = nextIsIndex ? [] : {}
      }

      current = current[key as keyof typeof current] as
        | Record<string, unknown>
        | unknown[]
    })
  })

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { unflattenObject } from '../../problems/object/unflattenObject'

describe('unflattenObject', () => {
  it('还原嵌套对象和数组', () => {
    expect(
      unflattenObject({
        'user.name': 'sun',
        'user.tags.0': 'a',
        'user.tags.1': 'b',
      }),
    ).toEqual({
      user: {
        name: 'sun',
        tags: ['a', 'b'],
      },
    })
  })
})
`,
  },
  {
    slug: 'arrayMap',
    category: 'array',
    title: 'Array.prototype.map',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 8,
    points: ['数组遍历', '回调参数', '返回新数组'],
    summary: '模拟 map，基于回调结果返回新数组。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function arrayMap<T, TResult>(
  array: T[],
  iteratee: (item: T, index: number, array: T[]) => TResult,
): TResult[] {
  // TODO: 请实现 arrayMap
  throw createTodoError('arrayMap')
}
`,
    solution: `
export function arrayMap<T, TResult>(
  array: T[],
  iteratee: (item: T, index: number, array: T[]) => TResult,
): TResult[] {
  const result: TResult[] = []

  for (let index = 0; index < array.length; index += 1) {
    result.push(iteratee(array[index], index, array))
  }

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { arrayMap } from '../../problems/array/arrayMap'

describe('arrayMap', () => {
  it('返回映射后的新数组', () => {
    expect(arrayMap([1, 2, 3], (item) => item * 2)).toEqual([2, 4, 6])
  })
})
`,
  },
  {
    slug: 'arrayFilter',
    category: 'array',
    title: 'filter',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 8,
    points: ['数组遍历', '条件筛选', '返回新数组'],
    summary: '模拟 filter，筛选满足条件的元素。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function arrayFilter<T>(
  array: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T[] {
  // TODO: 请实现 arrayFilter
  throw createTodoError('arrayFilter')
}
`,
    solution: `
export function arrayFilter<T>(
  array: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T[] {
  const result: T[] = []

  for (let index = 0; index < array.length; index += 1) {
    if (predicate(array[index], index, array)) {
      result.push(array[index])
    }
  }

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { arrayFilter } from '../../problems/array/arrayFilter'

describe('arrayFilter', () => {
  it('筛选满足条件的元素', () => {
    expect(arrayFilter([1, 2, 3, 4], (item) => item % 2 === 0)).toEqual([2, 4])
  })
})
`,
  },
  {
    slug: 'arrayReduce',
    category: 'array',
    title: 'reduce',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 10,
    points: ['累加器', '初始值处理', '数组遍历'],
    summary: '模拟 reduce，按顺序归并数组元素。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function arrayReduce<T, TResult>(
  array: T[],
  reducer: (
    accumulator: TResult,
    item: T,
    index: number,
    array: T[],
  ) => TResult,
  initialValue: TResult,
): TResult {
  // TODO: 请实现 arrayReduce
  throw createTodoError('arrayReduce')
}
`,
    solution: `
export function arrayReduce<T, TResult>(
  array: T[],
  reducer: (
    accumulator: TResult,
    item: T,
    index: number,
    array: T[],
  ) => TResult,
  initialValue: TResult,
): TResult {
  let accumulator = initialValue

  for (let index = 0; index < array.length; index += 1) {
    accumulator = reducer(accumulator, array[index], index, array)
  }

  return accumulator
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { arrayReduce } from '../../problems/array/arrayReduce'

describe('arrayReduce', () => {
  it('累计数组元素', () => {
    expect(arrayReduce([1, 2, 3], (sum, item) => sum + item, 0)).toBe(6)
  })
})
`,
  },
  {
    slug: 'arrayForEach',
    category: 'array',
    title: 'forEach',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['数组遍历', '回调调用', '无返回值'],
    summary: '模拟 forEach，依次执行回调函数。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function arrayForEach<T>(
  array: T[],
  iteratee: (item: T, index: number, array: T[]) => void,
): void {
  // TODO: 请实现 arrayForEach
  throw createTodoError('arrayForEach')
}
`,
    solution: `
export function arrayForEach<T>(
  array: T[],
  iteratee: (item: T, index: number, array: T[]) => void,
): void {
  for (let index = 0; index < array.length; index += 1) {
    iteratee(array[index], index, array)
  }
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { arrayForEach } from '../../problems/array/arrayForEach'

describe('arrayForEach', () => {
  it('遍历每一个元素', () => {
    const collected: number[] = []
    arrayForEach([1, 2, 3], (item) => {
      collected.push(item)
    })

    expect(collected).toEqual([1, 2, 3])
  })
})
`,
  },
  {
    slug: 'arrayFlat',
    category: 'array',
    title: 'flat',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['递归', '深度控制', '数组处理'],
    summary: '模拟 flat，按指定深度展开嵌套数组。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function arrayFlat(
  array: unknown[],
  depth = 1,
): unknown[] {
  // TODO: 请实现 arrayFlat
  throw createTodoError('arrayFlat')
}
`,
    solution: `
export function arrayFlat(
  array: unknown[],
  depth = 1,
): unknown[] {
  if (depth <= 0) {
    return [...array]
  }

  return array.reduce<unknown[]>((result, item) => {
    if (Array.isArray(item)) {
      result.push(...arrayFlat(item, depth - 1))
    } else {
      result.push(item)
    }
    return result
  }, [])
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { arrayFlat } from '../../problems/array/arrayFlat'

describe('arrayFlat', () => {
  it('按深度展开数组', () => {
    expect(arrayFlat([1, [2, [3]]], 1)).toEqual([1, 2, [3]])
    expect(arrayFlat([1, [2, [3]]], 2)).toEqual([1, 2, 3])
  })
})
`,
  },
  {
    slug: 'unique',
    category: 'array',
    title: 'unique',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 8,
    points: ['去重', 'Set', '顺序保持'],
    summary: '实现数组去重并保持原顺序。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function unique<T>(array: T[]): T[] {
  // TODO: 请实现 unique
  throw createTodoError('unique')
}
`,
    solution: `
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { unique } from '../../problems/array/unique'

describe('unique', () => {
  it('按顺序去重', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
  })
})
`,
  },
  {
    slug: 'chunk',
    category: 'array',
    title: 'chunk',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['数组分片', '循环切片', '边界处理'],
    summary: '按固定大小把数组切成多个小数组。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function chunk<T>(array: T[], size: number): T[][] {
  // TODO: 请实现 chunk
  throw createTodoError('chunk')
}
`,
    solution: `
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    return []
  }

  const result: T[][] = []

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size))
  }

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { chunk } from '../../problems/array/chunk'

describe('chunk', () => {
  it('按固定大小切片', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })
})
`,
  },
  {
    slug: 'shuffle',
    category: 'array',
    title: 'shuffle',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['随机算法', 'Fisher-Yates', '原数组保护'],
    summary: '使用 Fisher-Yates 算法打乱数组顺序。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function shuffle<T>(array: T[]): T[] {
  // TODO: 请实现 shuffle
  throw createTodoError('shuffle')
}
`,
    solution: `
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[randomIndex]] = [
      result[randomIndex],
      result[index],
    ]
  }

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { shuffle } from '../../problems/array/shuffle'

describe('shuffle', () => {
  it('返回包含相同元素的新数组', () => {
    const source = [1, 2, 3, 4]
    const shuffled = shuffle(source)

    expect(shuffled).toHaveLength(source.length)
    expect([...shuffled].sort()).toEqual([...source].sort())
    expect(shuffled).not.toBe(source)
  })
})
`,
  },
  {
    slug: 'flattenArray',
    category: 'array',
    title: '数组扁平化',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 8,
    points: ['递归', '数组展开', '基础算法'],
    summary: '把任意层级的嵌套数组完全展开。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function flattenArray(array: unknown[]): unknown[] {
  // TODO: 请实现 flattenArray
  throw createTodoError('flattenArray')
}
`,
    solution: `
export function flattenArray(array: unknown[]): unknown[] {
  return array.reduce<unknown[]>((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item))
    } else {
      result.push(item)
    }
    return result
  }, [])
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { flattenArray } from '../../problems/array/flattenArray'

describe('flattenArray', () => {
  it('完全展开多层嵌套数组', () => {
    expect(flattenArray([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4])
  })
})
`,
  },
  {
    slug: 'arrayDeduplicate',
    category: 'array',
    title: '数组去重',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['去重', '键提取', '顺序保持'],
    summary: '支持通过 key 提取函数对复杂数组进行去重。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function arrayDeduplicate<T>(
  array: T[],
  getKey: (item: T) => unknown = (item) => item,
): T[] {
  // TODO: 请实现 arrayDeduplicate
  throw createTodoError('arrayDeduplicate')
}
`,
    solution: `
export function arrayDeduplicate<T>(
  array: T[],
  getKey: (item: T) => unknown = (item) => item,
): T[] {
  const seen = new Set<unknown>()

  return array.filter((item) => {
    const key = getKey(item)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { arrayDeduplicate } from '../../problems/array/arrayDeduplicate'

describe('arrayDeduplicate', () => {
  it('支持按 key 去重', () => {
    expect(
      arrayDeduplicate(
        [
          { id: 1, name: 'a' },
          { id: 1, name: 'b' },
          { id: 2, name: 'c' },
        ],
        (item) => item.id,
      ),
    ).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'c' },
    ])
  })
})
`,
  },
  {
    slug: 'miniPromise',
    category: 'async',
    title: '手写 Promise',
    difficulty: 'Hard',
    frequency: '★★★★★',
    suggestedMinutes: 30,
    points: ['状态机', '链式调用', 'thenable 处理'],
    summary: '实现一个覆盖核心行为的 MiniPromise。',
    problem: `
import { createTodoError } from '../../utils/todo'

type Resolve<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason?: unknown) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

export class MiniPromise<T> implements PromiseLike<T> {
  constructor(_executor: Executor<T>) {
    throw createTodoError('MiniPromise')
  }

  then<TResult1 = T, TResult2 = never>(
    _onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    _onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): MiniPromise<TResult1 | TResult2> {
    throw createTodoError('MiniPromise.then')
  }

  catch<TResult = never>(
    _onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): MiniPromise<T | TResult> {
    throw createTodoError('MiniPromise.catch')
  }
}
`,
    solution: `
type Resolve<T> = (value: T | PromiseLike<T>) => void
type Reject = (reason?: unknown) => void
type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void

type Status = 'pending' | 'fulfilled' | 'rejected'

function resolvePromise<T>(
  value: unknown,
  resolve: Resolve<T>,
  reject: Reject,
) {
  if (value instanceof MiniPromise) {
    value.then(resolve, reject)
    return
  }

  if (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function')
  ) {
    let then: unknown

    try {
      then = (value as PromiseLike<T>).then
    } catch (error) {
      reject(error)
      return
    }

    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          value,
          (nextValue: T | PromiseLike<T>) => {
            if (called) {
              return
            }
            called = true
            resolvePromise(nextValue, resolve, reject)
          },
          (reason: unknown) => {
            if (called) {
              return
            }
            called = true
            reject(reason)
          },
        )
      } catch (error) {
        if (!called) {
          reject(error)
        }
      }
      return
    }
  }

  resolve(value as T)
}

export class MiniPromise<T> implements PromiseLike<T> {
  private status: Status = 'pending'
  private value!: T
  private reason: unknown
  private fulfilledQueue: Array<() => void> = []
  private rejectedQueue: Array<() => void> = []

  constructor(executor: Executor<T>) {
    const resolve: Resolve<T> = (value) => {
      if (this.status !== 'pending') {
        return
      }

      queueMicrotask(() => {
        if (this.status !== 'pending') {
          return
        }

        resolvePromise<T>(
          value,
          (resolvedValue) => {
            this.status = 'fulfilled'
            this.value = resolvedValue as T
            this.fulfilledQueue.forEach((callback) => callback())
          },
          (reason) => {
            this.status = 'rejected'
            this.reason = reason
            this.rejectedQueue.forEach((callback) => callback())
          },
        )
      })
    }

    const reject: Reject = (reason) => {
      if (this.status !== 'pending') {
        return
      }

      queueMicrotask(() => {
        if (this.status !== 'pending') {
          return
        }
        this.status = 'rejected'
        this.reason = reason
        this.rejectedQueue.forEach((callback) => callback())
      })
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): MiniPromise<TResult1 | TResult2> {
    return new MiniPromise<TResult1 | TResult2>((resolve, reject) => {
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.value as TResult1 | TResult2)
              return
            }

            const result = onFulfilled(this.value)
            resolvePromise(result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.reason)
              return
            }

            const result = onRejected(this.reason)
            resolvePromise(result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === 'fulfilled') {
        handleFulfilled()
      } else if (this.status === 'rejected') {
        handleRejected()
      } else {
        this.fulfilledQueue.push(handleFulfilled)
        this.rejectedQueue.push(handleRejected)
      }
    })
  }

  catch<TResult = never>(
    onRejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): MiniPromise<T | TResult> {
    return this.then(undefined, onRejected)
  }
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { MiniPromise } from '../../problems/async/miniPromise'

describe('MiniPromise', () => {
  it('支持 fulfilled 链式调用', async () => {
    const result = await new MiniPromise<number>((resolve) => {
      resolve(1)
    }).then((value) => value + 1)

    expect(result).toBe(2)
  })

  it('支持 catch 捕获异常', async () => {
    const result = await new MiniPromise<number>((_resolve, reject) => {
      reject(new Error('fail'))
    }).catch((error) => (error as Error).message)

    expect(result).toBe('fail')
  })

  it('支持 then 返回 PromiseLike', async () => {
    const result = await new MiniPromise<number>((resolve) => {
      resolve(1)
    }).then(
      (value) =>
        new Promise<number>((resolve) => {
          resolve(value + 2)
        }),
    )

    expect(result).toBe(3)
  })
})
`,
  },
  {
    slug: 'promiseAll',
    category: 'async',
    title: 'Promise.all',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 12,
    points: ['Promise 组合', '顺序保持', '失败短路'],
    summary: '实现 Promise.all，全部成功后按原顺序返回结果。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function promiseAll<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T[]> {
  // TODO: 请实现 promiseAll
  throw createTodoError('promiseAll')
}
`,
    solution: `
export function promiseAll<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      resolve([])
      return
    }

    const result: T[] = []
    let completed = 0

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          result[index] = value
          completed += 1

          if (completed === iterable.length) {
            resolve(result)
          }
        })
        .catch(reject)
    })
  })
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { promiseAll } from '../../problems/async/promiseAll'

describe('promiseAll', () => {
  it('按顺序返回所有结果', async () => {
    await expect(
      promiseAll([
        Promise.resolve(1),
        2,
        new Promise<number>((resolve) => setTimeout(() => resolve(3), 10)),
      ]),
    ).resolves.toEqual([1, 2, 3])
  })

  it('任一失败时立即 reject', async () => {
    await expect(
      promiseAll([Promise.resolve(1), Promise.reject(new Error('fail'))]),
    ).rejects.toThrow('fail')
  })
})
`,
  },
  {
    slug: 'promiseAllSettled',
    category: 'async',
    title: 'Promise.allSettled',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['Promise 组合', '状态收集', '异步结果结构化'],
    summary: '实现 Promise.allSettled，收集所有任务状态和结果。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function promiseAllSettled<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<Array<PromiseSettledResult<T>>> {
  // TODO: 请实现 promiseAllSettled
  throw createTodoError('promiseAllSettled')
}
`,
    solution: `
export function promiseAllSettled<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<Array<PromiseSettledResult<T>>> {
  return Promise.all(
    iterable.map((item) =>
      Promise.resolve(item)
        .then(
          (value) =>
            ({
              status: 'fulfilled',
              value,
            }) as PromiseFulfilledResult<T>,
        )
        .catch(
          (reason) =>
            ({
              status: 'rejected',
              reason,
            }) as PromiseRejectedResult,
        ),
    ),
  )
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { promiseAllSettled } from '../../problems/async/promiseAllSettled'

describe('promiseAllSettled', () => {
  it('返回所有任务的最终状态', async () => {
    await expect(
      promiseAllSettled([Promise.resolve(1), Promise.reject(new Error('fail'))]),
    ).resolves.toEqual([
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: new Error('fail') },
    ])
  })
})
`,
  },
  {
    slug: 'promiseRace',
    category: 'async',
    title: 'Promise.race',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['Promise 组合', '最快完成', '竞速处理'],
    summary: '实现 Promise.race，谁先 settle 就采用谁的结果。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function promiseRace<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  // TODO: 请实现 promiseRace
  throw createTodoError('promiseRace')
}
`,
    solution: `
export function promiseRace<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    iterable.forEach((item) => {
      Promise.resolve(item).then(resolve, reject)
    })
  })
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { promiseRace } from '../../problems/async/promiseRace'

describe('promiseRace', () => {
  it('返回最先完成的结果', async () => {
    await expect(
      promiseRace([
        new Promise<number>((resolve) => setTimeout(() => resolve(2), 20)),
        new Promise<number>((resolve) => setTimeout(() => resolve(1), 10)),
      ]),
    ).resolves.toBe(1)
  })
})
`,
  },
  {
    slug: 'promiseAny',
    category: 'async',
    title: 'Promise.any',
    difficulty: 'Hard',
    frequency: '★★★★',
    suggestedMinutes: 15,
    points: ['Promise 组合', '成功短路', 'AggregateError'],
    summary: '实现 Promise.any，任一成功就 resolve，全部失败则 reject。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function promiseAny<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  // TODO: 请实现 promiseAny
  throw createTodoError('promiseAny')
}
`,
    solution: `
export function promiseAny<T>(
  iterable: Array<T | PromiseLike<T>>,
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'))
      return
    }

    const reasons: unknown[] = []
    let rejectedCount = 0

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve)
        .catch((reason) => {
          reasons[index] = reason
          rejectedCount += 1

          if (rejectedCount === iterable.length) {
            reject(new AggregateError(reasons, 'All promises were rejected'))
          }
        })
    })
  })
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { promiseAny } from '../../problems/async/promiseAny'

describe('promiseAny', () => {
  it('返回第一个成功的结果', async () => {
    await expect(
      promiseAny([
        Promise.reject(new Error('fail')),
        new Promise<number>((resolve) => setTimeout(() => resolve(2), 10)),
      ]),
    ).resolves.toBe(2)
  })

  it('全部失败时抛出 AggregateError', async () => {
    await expect(
      promiseAny([Promise.reject(new Error('a')), Promise.reject(new Error('b'))]),
    ).rejects.toBeInstanceOf(AggregateError)
  })
})
`,
  },
  {
    slug: 'asyncPool',
    category: 'async',
    title: 'asyncPool / 并发控制',
    difficulty: 'Hard',
    frequency: '★★★★★',
    suggestedMinutes: 18,
    points: ['并发控制', '任务调度', 'Promise 队列'],
    summary: '限制同时运行的异步任务数量。',
    problem: `
import { createTodoError } from '../../utils/todo'

export async function asyncPool<T, TResult>(
  limit: number,
  items: T[],
  iterator: (item: T, index: number) => Promise<TResult>,
): Promise<TResult[]> {
  // TODO: 请实现 asyncPool
  throw createTodoError('asyncPool')
}
`,
    solution: `
export async function asyncPool<T, TResult>(
  limit: number,
  items: T[],
  iterator: (item: T, index: number) => Promise<TResult>,
): Promise<TResult[]> {
  const results: TResult[] = []
  const executing = new Set<Promise<void>>()

  for (const [index, item] of items.entries()) {
    const task = Promise.resolve().then(async () => {
      results[index] = await iterator(item, index)
    })

    executing.add(task)
    task.finally(() => {
      executing.delete(task)
    })

    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  await Promise.all(executing)
  return results
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { asyncPool } from '../../problems/async/asyncPool'

describe('asyncPool', () => {
  it('控制并发数量并保持结果顺序', async () => {
    let running = 0
    let maxRunning = 0

    const result = await asyncPool(2, [1, 2, 3, 4], async (item) => {
      running += 1
      maxRunning = Math.max(maxRunning, running)
      await new Promise((resolve) => setTimeout(resolve, 10))
      running -= 1
      return item * 2
    })

    expect(result).toEqual([2, 4, 6, 8])
    expect(maxRunning).toBeLessThanOrEqual(2)
  })
})
`,
  },
  {
    slug: 'sleep',
    category: 'async',
    title: 'sleep',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 5,
    points: ['Promise', '定时器', '异步封装'],
    summary: '实现一个等待指定时间后完成的 sleep 函数。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function sleep(ms: number): Promise<void> {
  // TODO: 请实现 sleep
  throw createTodoError('sleep')
}
`,
    solution: `
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
`,
    test: `
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sleep } from '../../problems/async/sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('在指定时间后完成', async () => {
    const task = sleep(100)
    vi.advanceTimersByTime(99)

    let done = false
    task.then(() => {
      done = true
    })

    await Promise.resolve()
    expect(done).toBe(false)

    vi.advanceTimersByTime(1)
    await task
    expect(done).toBe(true)
  })
})
`,
  },
  {
    slug: 'retry',
    category: 'async',
    title: 'retry',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 12,
    points: ['错误重试', 'Promise 链', '重试次数控制'],
    summary: '实现失败自动重试的异步函数包装器。',
    problem: `
import { createTodoError } from '../../utils/todo'

export async function retry<T>(
  task: () => Promise<T>,
  retries: number,
  delay = 0,
): Promise<T> {
  // TODO: 请实现 retry
  throw createTodoError('retry')
}
`,
    solution: `
export async function retry<T>(
  task: () => Promise<T>,
  retries: number,
  delay = 0,
): Promise<T> {
  let currentError: unknown

  for (let count = 0; count <= retries; count += 1) {
    try {
      return await task()
    } catch (error) {
      currentError = error

      if (count === retries) {
        break
      }

      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw currentError
}
`,
    test: `
import { describe, expect, it, vi } from 'vitest'
import { retry } from '../../problems/async/retry'

describe('retry', () => {
  it('失败后重试直到成功', async () => {
    const task = vi
      .fn<[], Promise<number>>()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce(2)

    await expect(retry(task, 2)).resolves.toBe(2)
    expect(task).toHaveBeenCalledTimes(2)
  })
})
`,
  },
  {
    slug: 'timeout',
    category: 'async',
    title: 'timeout',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['Promise.race', '超时控制', '错误处理'],
    summary: '给 Promise 增加超时能力，超时后自动 reject。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Timeout',
): Promise<T> {
  // TODO: 请实现 timeout
  throw createTodoError('timeout')
}
`,
    solution: `
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Timeout',
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_resolve, reject) => {
      setTimeout(() => {
        reject(new Error(message))
      }, ms)
    }),
  ])
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { timeout } from '../../problems/async/timeout'

describe('timeout', () => {
  it('超时后抛出错误', async () => {
    await expect(
      timeout(
        new Promise<number>((resolve) => setTimeout(() => resolve(1), 50)),
        10,
      ),
    ).rejects.toThrow('Timeout')
  })
})
`,
  },
  {
    slug: 'serialAsyncTasks',
    category: 'async',
    title: '串行执行异步任务',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['串行调度', 'Promise 链', '结果收集'],
    summary: '按顺序串行执行一组异步任务并收集结果。',
    problem: `
import { createTodoError } from '../../utils/todo'

export async function serialAsyncTasks<T>(
  tasks: Array<() => Promise<T>>,
): Promise<T[]> {
  // TODO: 请实现 serialAsyncTasks
  throw createTodoError('serialAsyncTasks')
}
`,
    solution: `
export async function serialAsyncTasks<T>(
  tasks: Array<() => Promise<T>>,
): Promise<T[]> {
  const result: T[] = []

  for (const task of tasks) {
    result.push(await task())
  }

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { serialAsyncTasks } from '../../problems/async/serialAsyncTasks'

describe('serialAsyncTasks', () => {
  it('按顺序执行任务', async () => {
    const order: number[] = []

    const result = await serialAsyncTasks([
      async () => {
        order.push(1)
        return 1
      },
      async () => {
        order.push(2)
        return 2
      },
    ])

    expect(order).toEqual([1, 2])
    expect(result).toEqual([1, 2])
  })
})
`,
  },
  {
    slug: 'limitConcurrentRequests',
    category: 'async',
    title: '控制最大并发请求数',
    difficulty: 'Hard',
    frequency: '★★★★★',
    suggestedMinutes: 18,
    points: ['并发控制', '任务队列', 'Promise 调度'],
    summary: '给请求函数队列加上最大并发限制。',
    problem: `
import { createTodoError } from '../../utils/todo'

export async function limitConcurrentRequests<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> {
  // TODO: 请实现 limitConcurrentRequests
  throw createTodoError('limitConcurrentRequests')
}
`,
    solution: `
export async function limitConcurrentRequests<T>(
  tasks: Array<() => Promise<T>>,
  limit: number,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = []
    let nextIndex = 0
    let completed = 0

    function runNext() {
      if (completed === tasks.length) {
        resolve(results)
        return
      }

      while (nextIndex < tasks.length && nextIndex - completed < limit) {
        const currentIndex = nextIndex
        nextIndex += 1

        tasks[currentIndex]()
          .then((value) => {
            results[currentIndex] = value
            completed += 1
            runNext()
          })
          .catch(reject)
      }
    }

    if (tasks.length === 0) {
      resolve([])
      return
    }

    runNext()
  })
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { limitConcurrentRequests } from '../../problems/async/limitConcurrentRequests'

describe('limitConcurrentRequests', () => {
  it('限制最大并发数量', async () => {
    let running = 0
    let maxRunning = 0

    const tasks = [1, 2, 3, 4].map(
      (item) => async () => {
        running += 1
        maxRunning = Math.max(maxRunning, running)
        await new Promise((resolve) => setTimeout(resolve, 10))
        running -= 1
        return item
      },
    )

    await expect(limitConcurrentRequests(tasks, 2)).resolves.toEqual([1, 2, 3, 4])
    expect(maxRunning).toBeLessThanOrEqual(2)
  })
})
`,
  },
  {
    slug: 'eventEmitter',
    category: 'browser',
    title: 'EventEmitter',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 12,
    points: ['发布订阅', '事件中心', 'once/off'],
    summary: '实现一个常用的事件总线类。',
    problem: `
import { createTodoError } from '../../utils/todo'

type Handler<TArgs extends unknown[]> = (...args: TArgs) => void

export class EventEmitter<TEvents extends Record<string, unknown[]>> {
  on<TKey extends keyof TEvents>(
    _eventName: TKey,
    _handler: Handler<TEvents[TKey]>,
  ): void {
    throw createTodoError('EventEmitter.on')
  }

  off<TKey extends keyof TEvents>(
    _eventName: TKey,
    _handler: Handler<TEvents[TKey]>,
  ): void {
    throw createTodoError('EventEmitter.off')
  }

  once<TKey extends keyof TEvents>(
    _eventName: TKey,
    _handler: Handler<TEvents[TKey]>,
  ): void {
    throw createTodoError('EventEmitter.once')
  }

  emit<TKey extends keyof TEvents>(
    _eventName: TKey,
    ..._args: TEvents[TKey]
  ): void {
    throw createTodoError('EventEmitter.emit')
  }
}
`,
    solution: `
type Handler<TArgs extends unknown[]> = (...args: TArgs) => void

export class EventEmitter<TEvents extends Record<string, unknown[]>> {
  private events = new Map<keyof TEvents, Set<Handler<unknown[]>>>()

  on<TKey extends keyof TEvents>(
    eventName: TKey,
    handler: Handler<TEvents[TKey]>,
  ): void {
    const handlers = this.events.get(eventName) ?? new Set()
    handlers.add(handler as Handler<unknown[]>)
    this.events.set(eventName, handlers)
  }

  off<TKey extends keyof TEvents>(
    eventName: TKey,
    handler: Handler<TEvents[TKey]>,
  ): void {
    this.events.get(eventName)?.delete(handler as Handler<unknown[]>)
  }

  once<TKey extends keyof TEvents>(
    eventName: TKey,
    handler: Handler<TEvents[TKey]>,
  ): void {
    const wrapped: Handler<TEvents[TKey]> = (...args) => {
      this.off(eventName, wrapped)
      handler(...args)
    }

    this.on(eventName, wrapped)
  }

  emit<TKey extends keyof TEvents>(
    eventName: TKey,
    ...args: TEvents[TKey]
  ): void {
    this.events.get(eventName)?.forEach((handler) => {
      handler(...args)
    })
  }
}
`,
    test: `
import { describe, expect, it, vi } from 'vitest'
import { EventEmitter } from '../../problems/browser/eventEmitter'

describe('EventEmitter', () => {
  it('支持 on、emit、off、once', () => {
    const emitter = new EventEmitter<{ change: [number] }>()
    const handler = vi.fn()
    const onceHandler = vi.fn()

    emitter.on('change', handler)
    emitter.once('change', onceHandler)
    emitter.emit('change', 1)
    emitter.emit('change', 2)
    emitter.off('change', handler)
    emitter.emit('change', 3)

    expect(handler).toHaveBeenCalledTimes(2)
    expect(onceHandler).toHaveBeenCalledTimes(1)
  })
})
`,
  },
  {
    slug: 'pubSub',
    category: 'browser',
    title: '发布订阅模式',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['发布订阅', '消息分发', '取消订阅'],
    summary: '实现一个基于 topic 的发布订阅器。',
    problem: `
import { createTodoError } from '../../utils/todo'

type Subscriber<TPayload> = (payload: TPayload) => void

export class PubSub<TTopics extends Record<string, unknown>> {
  subscribe<TKey extends keyof TTopics>(
    _topic: TKey,
    _subscriber: Subscriber<TTopics[TKey]>,
  ): () => void {
    throw createTodoError('PubSub.subscribe')
  }

  publish<TKey extends keyof TTopics>(
    _topic: TKey,
    _payload: TTopics[TKey],
  ): void {
    throw createTodoError('PubSub.publish')
  }
}
`,
    solution: `
type Subscriber<TPayload> = (payload: TPayload) => void

export class PubSub<TTopics extends Record<string, unknown>> {
  private topics = new Map<keyof TTopics, Set<Subscriber<unknown>>>()

  subscribe<TKey extends keyof TTopics>(
    topic: TKey,
    subscriber: Subscriber<TTopics[TKey]>,
  ): () => void {
    const subscribers = this.topics.get(topic) ?? new Set()
    subscribers.add(subscriber as Subscriber<unknown>)
    this.topics.set(topic, subscribers)

    return () => {
      subscribers.delete(subscriber as Subscriber<unknown>)
    }
  }

  publish<TKey extends keyof TTopics>(
    topic: TKey,
    payload: TTopics[TKey],
  ): void {
    this.topics.get(topic)?.forEach((subscriber) => {
      subscriber(payload)
    })
  }
}
`,
    test: `
import { describe, expect, it, vi } from 'vitest'
import { PubSub } from '../../problems/browser/pubSub'

describe('PubSub', () => {
  it('支持订阅、发布和取消订阅', () => {
    const pubsub = new PubSub<{ news: string }>()
    const handler = vi.fn()
    const unsubscribe = pubsub.subscribe('news', handler)

    pubsub.publish('news', 'hello')
    unsubscribe()
    pubsub.publish('news', 'world')

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledWith('hello')
  })
})
`,
  },
  {
    slug: 'delegateEvent',
    category: 'browser',
    title: 'DOM 事件委托',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['事件冒泡', 'DOM API', '事件委托'],
    summary: '把事件监听挂到父节点上，通过 selector 命中目标元素。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function delegateEvent(
  _container: Element,
  _eventType: keyof HTMLElementEventMap,
  _selector: string,
  _handler: (event: Event, target: Element) => void,
): () => void {
  // TODO: 请实现 delegateEvent
  throw createTodoError('delegateEvent')
}
`,
    solution: `
export function delegateEvent(
  container: Element,
  eventType: keyof HTMLElementEventMap,
  selector: string,
  handler: (event: Event, target: Element) => void,
): () => void {
  const listener = (event: Event) => {
    const target = event.target

    if (!(target instanceof Element)) {
      return
    }

    const matched = target.closest(selector)

    if (matched && container.contains(matched)) {
      handler(event, matched)
    }
  }

  container.addEventListener(eventType, listener)

  return () => {
    container.removeEventListener(eventType, listener)
  }
}
`,
    test: `
import { describe, expect, it, vi } from 'vitest'
import { delegateEvent } from '../../problems/browser/delegateEvent'

describe('delegateEvent', () => {
  it('命中选择器时触发回调', () => {
    const root = document.createElement('div')
    root.innerHTML = '<button class="target">click</button>'
    const button = root.querySelector('.target') as HTMLButtonElement
    const handler = vi.fn()

    delegateEvent(root, 'click', '.target', handler)
    button.click()

    expect(handler).toHaveBeenCalledTimes(1)
    expect(handler.mock.calls[0][1]).toBe(button)
  })
})
`,
  },
  {
    slug: 'parseURLParams',
    category: 'browser',
    title: 'URL 参数解析',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['URLSearchParams', '重复参数', '解码'],
    summary: '把 URL 查询参数解析成对象，并处理重复 key。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function parseURLParams(
  _url: string,
): Record<string, string | string[]> {
  // TODO: 请实现 parseURLParams
  throw createTodoError('parseURLParams')
}
`,
    solution: `
export function parseURLParams(
  url: string,
): Record<string, string | string[]> {
  const parsedUrl = new URL(url, 'https://example.com')
  const result: Record<string, string | string[]> = {}

  parsedUrl.searchParams.forEach((value, key) => {
    const current = result[key]

    if (current === undefined) {
      result[key] = value
      return
    }

    if (Array.isArray(current)) {
      current.push(value)
      return
    }

    result[key] = [current, value]
  })

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { parseURLParams } from '../../problems/browser/parseURLParams'

describe('parseURLParams', () => {
  it('解析查询参数并处理重复 key', () => {
    expect(parseURLParams('https://test.com?a=1&b=2&a=3')).toEqual({
      a: ['1', '3'],
      b: '2',
    })
  })
})
`,
  },
  {
    slug: 'parseCookie',
    category: 'browser',
    title: 'Cookie 解析',
    difficulty: 'Easy',
    frequency: '★★★',
    suggestedMinutes: 8,
    points: ['字符串解析', 'URL 解码', '边界处理'],
    summary: '把 Cookie 字符串解析成键值对象。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function parseCookie(
  _cookie: string,
): Record<string, string> {
  // TODO: 请实现 parseCookie
  throw createTodoError('parseCookie')
}
`,
    solution: `
export function parseCookie(
  cookie: string,
): Record<string, string> {
  if (!cookie.trim()) {
    return {}
  }

  return cookie.split(';').reduce<Record<string, string>>((result, segment) => {
    const [rawKey, ...rest] = segment.trim().split('=')
    result[rawKey] = decodeURIComponent(rest.join('='))
    return result
  }, {})
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { parseCookie } from '../../problems/browser/parseCookie'

describe('parseCookie', () => {
  it('解析 cookie 字符串', () => {
    expect(parseCookie('token=abc; theme=dark; name=sun%20yan')).toEqual({
      token: 'abc',
      theme: 'dark',
      name: 'sun yan',
    })
  })
})
`,
  },
  {
    slug: 'expiringStorage',
    category: 'browser',
    title: 'localStorage 带过期时间封装',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['本地存储', '过期时间', '序列化'],
    summary: '封装带过期时间的 localStorage 读写能力。',
    problem: `
import type { StorageLike } from '../../utils/storage'
import { createTodoError } from '../../utils/todo'

export function createExpiringStorage(_storage: StorageLike) {
  return {
    set(_key: string, _value: unknown, _ttl: number): void {
      throw createTodoError('createExpiringStorage.set')
    },
    get<T>(_key: string): T | null {
      throw createTodoError('createExpiringStorage.get')
    },
    remove(_key: string): void {
      throw createTodoError('createExpiringStorage.remove')
    },
  }
}
`,
    solution: `
import type { StorageLike } from '../../utils/storage'

interface StoredValue {
  value: unknown
  expiresAt: number
}

export function createExpiringStorage(storage: StorageLike) {
  return {
    set(key: string, value: unknown, ttl: number): void {
      const payload: StoredValue = {
        value,
        expiresAt: Date.now() + ttl,
      }

      storage.setItem(key, JSON.stringify(payload))
    },
    get<T>(key: string): T | null {
      const rawValue = storage.getItem(key)

      if (!rawValue) {
        return null
      }

      const parsed = JSON.parse(rawValue) as StoredValue

      if (Date.now() > parsed.expiresAt) {
        storage.removeItem(key)
        return null
      }

      return parsed.value as T
    },
    remove(key: string): void {
      storage.removeItem(key)
    },
  }
}
`,
    test: `
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createExpiringStorage } from '../../problems/browser/expiringStorage'

class MemoryStorage {
  private store = new Map<string, string>()

  getItem(key: string): string | null {
    return this.store.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }
}

describe('createExpiringStorage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('在过期前读取值，过期后返回 null', () => {
    const storage = createExpiringStorage(new MemoryStorage())
    storage.set('token', { ok: true }, 100)

    expect(storage.get<{ ok: boolean }>('token')).toEqual({ ok: true })

    vi.advanceTimersByTime(101)
    expect(storage.get('token')).toBeNull()
  })
})
`,
  },
  {
    slug: 'lruCache',
    category: 'algorithm',
    title: 'LRU Cache',
    difficulty: 'Hard',
    frequency: '★★★★★',
    suggestedMinutes: 18,
    points: ['Map', '缓存淘汰', '数据结构设计'],
    summary: '设计一个支持 get 和 put 的 LRU 缓存。',
    problem: `
import { createTodoError } from '../../utils/todo'

export class LRUCache<TKey, TValue> {
  constructor(_capacity: number) {
    throw createTodoError('LRUCache')
  }

  get(_key: TKey): TValue | -1 {
    throw createTodoError('LRUCache.get')
  }

  set(_key: TKey, _value: TValue): void {
    throw createTodoError('LRUCache.set')
  }
}
`,
    solution: `
export class LRUCache<TKey, TValue> {
  private capacity: number
  private cache = new Map<TKey, TValue>()

  constructor(capacity: number) {
    this.capacity = capacity
  }

  get(key: TKey): TValue | -1 {
    if (!this.cache.has(key)) {
      return -1
    }

    const value = this.cache.get(key) as TValue
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  set(key: TKey, value: TValue): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key, value)

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value as TKey
      this.cache.delete(oldestKey)
    }
  }
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { LRUCache } from '../../problems/algorithm/lruCache'

describe('LRUCache', () => {
  it('按最近最少使用淘汰数据', () => {
    const cache = new LRUCache<number, number>(2)
    cache.set(1, 1)
    cache.set(2, 2)
    expect(cache.get(1)).toBe(1)
    cache.set(3, 3)
    expect(cache.get(2)).toBe(-1)
  })
})
`,
  },
  {
    slug: 'reverseLinkedList',
    category: 'algorithm',
    title: '链表反转',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 10,
    points: ['链表', '指针反转', '迭代'],
    summary: '把单链表原地反转并返回新的头节点。',
    problem: `
import type { ListNode } from '../../utils/list'
import { createTodoError } from '../../utils/todo'

export function reverseLinkedList<T>(
  _head: ListNode<T> | null,
): ListNode<T> | null {
  // TODO: 请实现 reverseLinkedList
  throw createTodoError('reverseLinkedList')
}
`,
    solution: `
import type { ListNode } from '../../utils/list'

export function reverseLinkedList<T>(
  head: ListNode<T> | null,
): ListNode<T> | null {
  let previous: ListNode<T> | null = null
  let current = head

  while (current) {
    const next = current.next
    current.next = previous
    previous = current
    current = next
  }

  return previous
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { reverseLinkedList } from '../../problems/algorithm/reverseLinkedList'
import { createLinkedList, linkedListToArray } from '../../utils/list'

describe('reverseLinkedList', () => {
  it('反转单链表', () => {
    const head = createLinkedList([1, 2, 3])
    expect(linkedListToArray(reverseLinkedList(head))).toEqual([3, 2, 1])
  })

  it('处理空链表', () => {
    expect(reverseLinkedList(null)).toBeNull()
  })
})
`,
  },
  {
    slug: 'binaryTreeDFS',
    category: 'algorithm',
    title: '二叉树 DFS',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['树遍历', '深度优先搜索', '递归'],
    summary: '实现二叉树深度优先遍历，按前序返回节点值。',
    problem: `
import type { TreeNode } from '../../utils/tree'
import { createTodoError } from '../../utils/todo'

export function binaryTreeDFS<T>(_root: TreeNode<T> | null): T[] {
  // TODO: 请实现 binaryTreeDFS
  throw createTodoError('binaryTreeDFS')
}
`,
    solution: `
import type { TreeNode } from '../../utils/tree'

export function binaryTreeDFS<T>(root: TreeNode<T> | null): T[] {
  if (!root) {
    return []
  }

  return [
    root.value,
    ...binaryTreeDFS(root.left),
    ...binaryTreeDFS(root.right),
  ]
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { binaryTreeDFS } from '../../problems/algorithm/binaryTreeDFS'
import { createTree } from '../../utils/tree'

describe('binaryTreeDFS', () => {
  it('按前序遍历节点', () => {
    const tree = createTree(1, createTree(2), createTree(3))
    expect(binaryTreeDFS(tree)).toEqual([1, 2, 3])
  })
})
`,
  },
  {
    slug: 'binaryTreeBFS',
    category: 'algorithm',
    title: '二叉树 BFS',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['树遍历', '广度优先搜索', '队列'],
    summary: '实现二叉树层序遍历，按从上到下返回节点值。',
    problem: `
import type { TreeNode } from '../../utils/tree'
import { createTodoError } from '../../utils/todo'

export function binaryTreeBFS<T>(_root: TreeNode<T> | null): T[] {
  // TODO: 请实现 binaryTreeBFS
  throw createTodoError('binaryTreeBFS')
}
`,
    solution: `
import type { TreeNode } from '../../utils/tree'

export function binaryTreeBFS<T>(root: TreeNode<T> | null): T[] {
  if (!root) {
    return []
  }

  const queue: TreeNode<T>[] = [root]
  const result: T[] = []

  while (queue.length > 0) {
    const current = queue.shift() as TreeNode<T>
    result.push(current.value)

    if (current.left) {
      queue.push(current.left)
    }

    if (current.right) {
      queue.push(current.right)
    }
  }

  return result
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { binaryTreeBFS } from '../../problems/algorithm/binaryTreeBFS'
import { createTree } from '../../utils/tree'

describe('binaryTreeBFS', () => {
  it('按层序遍历节点', () => {
    const tree = createTree(1, createTree(2), createTree(3))
    expect(binaryTreeBFS(tree)).toEqual([1, 2, 3])
  })
})
`,
  },
  {
    slug: 'maxTreeDepth',
    category: 'algorithm',
    title: '二叉树最大深度',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['树递归', '深度计算', '边界处理'],
    summary: '计算二叉树的最大深度。',
    problem: `
import type { TreeNode } from '../../utils/tree'
import { createTodoError } from '../../utils/todo'

export function maxTreeDepth<T>(_root: TreeNode<T> | null): number {
  // TODO: 请实现 maxTreeDepth
  throw createTodoError('maxTreeDepth')
}
`,
    solution: `
import type { TreeNode } from '../../utils/tree'

export function maxTreeDepth<T>(root: TreeNode<T> | null): number {
  if (!root) {
    return 0
  }

  return 1 + Math.max(maxTreeDepth(root.left), maxTreeDepth(root.right))
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { maxTreeDepth } from '../../problems/algorithm/maxTreeDepth'
import { createTree } from '../../utils/tree'

describe('maxTreeDepth', () => {
  it('返回树的最大深度', () => {
    const tree = createTree(1, createTree(2, createTree(3), null), null)
    expect(maxTreeDepth(tree)).toBe(3)
  })
})
`,
  },
  {
    slug: 'quickSort',
    category: 'algorithm',
    title: '快速排序',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 12,
    points: ['分治', '递归', '排序'],
    summary: '实现快速排序并返回升序结果。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function quickSort(array: number[]): number[] {
  // TODO: 请实现 quickSort
  throw createTodoError('quickSort')
}
`,
    solution: `
export function quickSort(array: number[]): number[] {
  if (array.length <= 1) {
    return [...array]
  }

  const [pivot, ...rest] = array
  const left = rest.filter((item) => item <= pivot)
  const right = rest.filter((item) => item > pivot)

  return [...quickSort(left), pivot, ...quickSort(right)]
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { quickSort } from '../../problems/algorithm/quickSort'

describe('quickSort', () => {
  it('返回升序数组', () => {
    expect(quickSort([5, 1, 4, 2, 3])).toEqual([1, 2, 3, 4, 5])
  })
})
`,
  },
  {
    slug: 'mergeSort',
    category: 'algorithm',
    title: '归并排序',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 12,
    points: ['分治', '合并有序数组', '递归'],
    summary: '实现归并排序并返回升序结果。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function mergeSort(array: number[]): number[] {
  // TODO: 请实现 mergeSort
  throw createTodoError('mergeSort')
}
`,
    solution: `
function merge(left: number[], right: number[]): number[] {
  const result: number[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex += 1
    } else {
      result.push(right[rightIndex])
      rightIndex += 1
    }
  }

  return [
    ...result,
    ...left.slice(leftIndex),
    ...right.slice(rightIndex),
  ]
}

export function mergeSort(array: number[]): number[] {
  if (array.length <= 1) {
    return [...array]
  }

  const middle = Math.floor(array.length / 2)
  const left = mergeSort(array.slice(0, middle))
  const right = mergeSort(array.slice(middle))

  return merge(left, right)
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { mergeSort } from '../../problems/algorithm/mergeSort'

describe('mergeSort', () => {
  it('返回升序数组', () => {
    expect(mergeSort([5, 1, 4, 2, 3])).toEqual([1, 2, 3, 4, 5])
  })
})
`,
  },
  {
    slug: 'binarySearch',
    category: 'algorithm',
    title: '二分查找',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 8,
    points: ['二分', '边界收缩', '有序数组'],
    summary: '在有序数组中查找目标值下标。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function binarySearch(array: number[], target: number): number {
  // TODO: 请实现 binarySearch
  throw createTodoError('binarySearch')
}
`,
    solution: `
export function binarySearch(array: number[], target: number): number {
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    const middle = Math.floor((left + right) / 2)
    const middleValue = array[middle]

    if (middleValue === target) {
      return middle
    }

    if (middleValue < target) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }

  return -1
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { binarySearch } from '../../problems/algorithm/binarySearch'

describe('binarySearch', () => {
  it('返回目标值下标', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 4)).toBe(3)
    expect(binarySearch([1, 2, 3, 4, 5], 6)).toBe(-1)
  })
})
`,
  },
  {
    slug: 'twoSum',
    category: 'algorithm',
    title: '两数之和',
    difficulty: 'Easy',
    frequency: '★★★★★',
    suggestedMinutes: 8,
    points: ['哈希表', '一次遍历', '数组索引'],
    summary: '在数组中找到两数之和等于目标值的下标。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function twoSum(array: number[], target: number): [number, number] | [] {
  // TODO: 请实现 twoSum
  throw createTodoError('twoSum')
}
`,
    solution: `
export function twoSum(array: number[], target: number): [number, number] | [] {
  const map = new Map<number, number>()

  for (let index = 0; index < array.length; index += 1) {
    const current = array[index]
    const complement = target - current

    if (map.has(complement)) {
      return [map.get(complement) as number, index]
    }

    map.set(current, index)
  }

  return []
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { twoSum } from '../../problems/algorithm/twoSum'

describe('twoSum', () => {
  it('返回目标值对应的两个下标', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
    expect(twoSum([1, 2, 3], 7)).toEqual([])
  })
})
`,
  },
  {
    slug: 'miniUseState',
    category: 'react',
    title: '手写简化版 useState 思路',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['状态闭包', '更新函数', '基础 Hook 思路'],
    summary: '用闭包模拟最简版 useState 的核心行为。',
    problem: `
import { createTodoError } from '../../utils/todo'

type SetStateAction<T> = T | ((previous: T) => T)

export function createMiniState<T>(
  _initialValue: T,
): [() => T, (nextValue: SetStateAction<T>) => T] {
  // TODO: 请实现 createMiniState
  throw createTodoError('createMiniState')
}
`,
    solution: `
type SetStateAction<T> = T | ((previous: T) => T)

export function createMiniState<T>(
  initialValue: T,
): [() => T, (nextValue: SetStateAction<T>) => T] {
  let state = initialValue

  const getState = () => state
  const setState = (nextValue: SetStateAction<T>) => {
    state =
      typeof nextValue === 'function'
        ? (nextValue as (previous: T) => T)(state)
        : nextValue

    return state
  }

  return [getState, setState]
}
`,
    test: `
import { describe, expect, it } from 'vitest'
import { createMiniState } from '../../problems/react/miniUseState'

describe('createMiniState', () => {
  it('支持读取和更新状态', () => {
    const [getState, setState] = createMiniState(0)

    expect(getState()).toBe(0)
    setState(1)
    expect(getState()).toBe(1)
    setState((previous) => previous + 1)
    expect(getState()).toBe(2)
  })
})
`,
  },
  {
    slug: 'useDebounce',
    category: 'react',
    title: 'useDebounce',
    difficulty: 'Medium',
    frequency: '★★★★★',
    suggestedMinutes: 12,
    points: ['React Hook', '定时器', '副作用清理'],
    summary: '实现一个带延迟更新的 useDebounce Hook。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function useDebounce<T>(_value: T, _delay: number): T {
  // TODO: 请实现 useDebounce
  throw createTodoError('useDebounce')
}
`,
    solution: `
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay, value])

  return debouncedValue
}
`,
    test: `
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from '../../problems/react/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('在延迟后更新值', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'a', delay: 100 },
      },
    )

    rerender({ value: 'b', delay: 100 })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('b')
  })
})
`,
  },
  {
    slug: 'useThrottle',
    category: 'react',
    title: 'useThrottle',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['React Hook', '节流', 'Ref 与 Effect'],
    summary: '实现一个限制更新频率的 useThrottle Hook。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function useThrottle<T>(_value: T, _delay: number): T {
  // TODO: 请实现 useThrottle
  throw createTodoError('useThrottle')
}
`,
    solution: `
import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecutedRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const now = Date.now()
    const remaining = delay - (now - lastExecutedRef.current)

    if (remaining <= 0) {
      lastExecutedRef.current = now
      setThrottledValue(value)
      return
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      lastExecutedRef.current = Date.now()
      setThrottledValue(value)
    }, remaining)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [delay, value])

  return throttledValue
}
`,
    test: `
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useThrottle } from '../../problems/react/useThrottle'

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(0)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('限制值更新频率', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useThrottle(value, delay),
      {
        initialProps: { value: 'a', delay: 100 },
      },
    )

    rerender({ value: 'b', delay: 100 })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('b')
  })
})
`,
  },
  {
    slug: 'usePrevious',
    category: 'react',
    title: 'usePrevious',
    difficulty: 'Easy',
    frequency: '★★★★',
    suggestedMinutes: 8,
    points: ['React Hook', 'useRef', '副作用时机'],
    summary: '保存上一次渲染时的值。',
    problem: `
import { createTodoError } from '../../utils/todo'

export function usePrevious<T>(_value: T): T | undefined {
  // TODO: 请实现 usePrevious
  throw createTodoError('usePrevious')
}
`,
    solution: `
import { useEffect, useRef } from 'react'

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
`,
    test: `
import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { usePrevious } from '../../problems/react/usePrevious'

describe('usePrevious', () => {
  it('返回上一次的值', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      {
        initialProps: { value: 1 },
      },
    )

    expect(result.current).toBeUndefined()

    rerender({ value: 2 })
    expect(result.current).toBe(1)
  })
})
`,
  },
  {
    slug: 'useUpdateEffect',
    category: 'react',
    title: 'useUpdateEffect',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 10,
    points: ['React Hook', '首次渲染跳过', 'effect 控制'],
    summary: '实现仅在更新阶段执行的 useEffect。',
    problem: `
import type { DependencyList, EffectCallback } from 'react'
import { createTodoError } from '../../utils/todo'

export function useUpdateEffect(
  _effect: EffectCallback,
  _deps: DependencyList,
): void {
  // TODO: 请实现 useUpdateEffect
  throw createTodoError('useUpdateEffect')
}
`,
    solution: `
import { useEffect, useRef } from 'react'
import type { DependencyList, EffectCallback } from 'react'

export function useUpdateEffect(
  effect: EffectCallback,
  deps: DependencyList,
): void {
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }

    return effect()
  }, deps)
}
`,
    test: `
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useUpdateEffect } from '../../problems/react/useUpdateEffect'

describe('useUpdateEffect', () => {
  it('跳过首次执行，只在更新时运行', () => {
    const fn = vi.fn()

    const { rerender } = renderHook(
      ({ value }) => {
        useUpdateEffect(() => {
          fn(value)
        }, [value])
      },
      {
        initialProps: { value: 1 },
      },
    )

    expect(fn).not.toHaveBeenCalled()

    rerender({ value: 2 })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(2)
  })
})
`,
  },
  {
    slug: 'useRequest',
    category: 'react',
    title: 'useRequest 简化版',
    difficulty: 'Hard',
    frequency: '★★★★★',
    suggestedMinutes: 18,
    points: ['React Hook', '异步状态管理', '封装请求逻辑'],
    summary:
      '实现一个简化版 useRequest，统一管理 loading、data、error 和 run。',
    problem: `
import { createTodoError } from '../../utils/todo'

interface UseRequestOptions<TParams extends unknown[]> {
  manual?: boolean
  defaultParams?: TParams
}

interface UseRequestResult<TData, TParams extends unknown[]> {
  data: TData | null
  loading: boolean
  error: Error | null
  run: (...params: TParams) => Promise<TData>
}

export function useRequest<TData, TParams extends unknown[]>(
  _service: (...params: TParams) => Promise<TData>,
  _options: UseRequestOptions<TParams> = {},
): UseRequestResult<TData, TParams> {
  // TODO: 请实现 useRequest
  throw createTodoError('useRequest')
}
`,
    solution: `
import { useCallback, useEffect, useState } from 'react'

interface UseRequestOptions<TParams extends unknown[]> {
  manual?: boolean
  defaultParams?: TParams
}

interface UseRequestResult<TData, TParams extends unknown[]> {
  data: TData | null
  loading: boolean
  error: Error | null
  run: (...params: TParams) => Promise<TData>
}

export function useRequest<TData, TParams extends unknown[]>(
  service: (...params: TParams) => Promise<TData>,
  options: UseRequestOptions<TParams> = {},
): UseRequestResult<TData, TParams> {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const run = useCallback(
    async (...params: TParams) => {
      setLoading(true)
      setError(null)

      try {
        const result = await service(...params)
        setData(result)
        return result
      } catch (requestError) {
        const normalizedError =
          requestError instanceof Error
            ? requestError
            : new Error(String(requestError))
        setError(normalizedError)
        throw normalizedError
      } finally {
        setLoading(false)
      }
    },
    [service],
  )

  useEffect(() => {
    if (!options.manual && options.defaultParams) {
      void run(...options.defaultParams)
    }
  }, [options.defaultParams, options.manual, run])

  return {
    data,
    loading,
    error,
    run,
  }
}
`,
    test: `
import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useRequest } from '../../problems/react/useRequest'

describe('useRequest', () => {
  it('支持手动触发请求', async () => {
    const service = vi.fn(async (value: string) => value + '-ok')
    const { result } = renderHook(() =>
      useRequest(service, {
        manual: true,
      }),
    )

    await act(async () => {
      await result.current.run('hello')
    })

    expect(result.current.data).toBe('hello-ok')
    expect(result.current.loading).toBe(false)
    expect(service).toHaveBeenCalledWith('hello')
  })

  it('支持默认参数自动执行', async () => {
    const service = vi.fn(async (value: number) => value * 2)
    const { result } = renderHook(() =>
      useRequest(service, {
        defaultParams: [2],
      }),
    )

    await waitFor(() => {
      expect(result.current.data).toBe(4)
    })
  })
})
`,
  },
  {
    slug: 'useClickOutside',
    category: 'react',
    title: 'useClickOutside',
    difficulty: 'Medium',
    frequency: '★★★★',
    suggestedMinutes: 12,
    points: ['React Hook', 'DOM 事件监听', 'Ref'],
    summary: '监听目标元素外部点击事件并执行回调。',
    testExtension: 'tsx',
    problem: `
import type { RefObject } from 'react'
import { createTodoError } from '../../utils/todo'

export function useClickOutside<T extends HTMLElement>(
  _ref: RefObject<T>,
  _handler: (event: MouseEvent) => void,
): void {
  // TODO: 请实现 useClickOutside
  throw createTodoError('useClickOutside')
}
`,
    solution: `
import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const element = ref.current

      if (!element || element.contains(event.target as Node)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [handler, ref])
}
`,
    test: `
import { fireEvent, render } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useClickOutside } from '../../problems/react/useClickOutside'

function Demo({ onOutsideClick }: { onOutsideClick: (event: MouseEvent) => void }) {
  const ref = createRef<HTMLDivElement>()
  useClickOutside(ref, onOutsideClick)

  return (
    <div>
      <div ref={ref}>inside</div>
      <button type="button">outside</button>
    </div>
  )
}

describe('useClickOutside', () => {
  it('点击外部区域时触发回调', () => {
    const handler = vi.fn()
    const { getByText } = render(<Demo onOutsideClick={handler} />)

    fireEvent.mouseDown(getByText('inside'))
    expect(handler).not.toHaveBeenCalled()

    fireEvent.mouseDown(getByText('outside'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
`,
  },
]

function writeFile(filePath, content) {
  const absolutePath = join(rootDir, filePath)
  mkdirSync(dirname(absolutePath), { recursive: true })
  writeFileSync(absolutePath, content.trimStart() + '\n', 'utf8')
}

function cleanup() {
  rmSync(join(rootDir, 'src', 'problems'), { recursive: true, force: true })
  rmSync(join(rootDir, 'src', 'solutions'), { recursive: true, force: true })
  rmSync(join(rootDir, 'src', 'tests'), { recursive: true, force: true })
  rmSync(join(rootDir, 'src', 'utils'), { recursive: true, force: true })
  rmSync(join(rootDir, 'docs'), { recursive: true, force: true })
  rmSync(join(rootDir, 'src', 'App.css'), { force: true })
  rmSync(join(rootDir, 'src', 'assets'), { recursive: true, force: true })
  rmSync(join(rootDir, 'public'), { recursive: true, force: true })
}

function buildProblemBankSource() {
  const bank = problems.map((problem) => ({
    slug: problem.slug,
    title: problem.title,
    category: problem.category,
    categoryLabel: categoryLabels[problem.category],
    difficulty: problem.difficulty,
    frequency: problem.frequency,
    suggestedMinutes: problem.suggestedMinutes,
    points: problem.points,
    summary: problem.summary,
    problemPath: `src/problems/${problem.category}/${problem.slug}.ts`,
    solutionPath: `src/solutions/${problem.category}/${problem.slug}.ts`,
    testPath: `src/tests/${problem.category}/${problem.slug}.test.${
      problem.testExtension ?? 'ts'
    }`,
  }))

  return `
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

export const problemBank: ProblemItem[] = ${JSON.stringify(bank, null, 2)}
`
}

function buildAppSource() {
  return `
import './index.css'
import { problemBank } from './problem-bank'

const categoryOrder = [
  'javascript',
  'function',
  'object',
  'array',
  'async',
  'browser',
  'algorithm',
  'react',
] as const

function App() {
  const grouped = categoryOrder
    .map((category) => {
      const items = problemBank.filter((problem) => problem.category === category)
      return {
        key: category,
        label: items[0]?.categoryLabel ?? category,
        items,
      }
    })
    .filter((group) => group.items.length > 0)

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Frontend Handwriting Lab</p>
        <h1>前端面试高频手写题练习库</h1>
        <p className="hero-text">
          题目、测试、参考答案和知识点索引都已经预置好了。推荐先从
          <code> src/problems </code>
          开始，自己实现后再跑测试复盘。
        </p>
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-label">总题数</span>
            <strong>{problemBank.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">分类数</span>
            <strong>{grouped.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">练习建议</span>
            <strong>先写再看答案</strong>
          </div>
        </div>
      </section>

      <section className="section">
        {grouped.map((group) => (
          <div key={group.key} className="category-block">
            <div className="category-header">
              <h2>{group.label}</h2>
              <span>{group.items.length} 题</span>
            </div>

            <div className="card-grid">
              {group.items.map((problem) => (
                <article key={problem.slug} className="problem-card">
                  <div className="problem-meta">
                    <span className="badge">{problem.difficulty}</span>
                    <span className="badge subtle">{problem.frequency}</span>
                  </div>
                  <h3>{problem.title}</h3>
                  <p className="summary">{problem.summary}</p>
                  <dl className="meta-list">
                    <div>
                      <dt>分类</dt>
                      <dd>{problem.categoryLabel}</dd>
                    </div>
                    <div>
                      <dt>建议时间</dt>
                      <dd>{problem.suggestedMinutes} 分钟</dd>
                    </div>
                    <div>
                      <dt>考察点</dt>
                      <dd>{problem.points.join(' / ')}</dd>
                    </div>
                  </dl>
                  <div className="path-row">
                    <code>{problem.problemPath}</code>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default App
`
}

function buildIndexCssSource() {
  return `
:root {
  color: #111827;
  background: #f3f4f6;
  font-family:
    Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

code {
  font-family:
    'SFMono-Regular', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
}

#root {
  min-height: 100vh;
}

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

.hero {
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #eef2ff 100%);
  border: 1px solid #dbeafe;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
}

.eyebrow {
  margin: 0 0 8px;
  color: #4f46e5;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 12px;
}

.hero h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 48px);
}

.hero-text {
  margin: 16px 0 0;
  max-width: 780px;
  color: #4b5563;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.stat-card,
.problem-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
}

.stat-card {
  padding: 16px 18px;
}

.stat-label {
  display: block;
  font-size: 13px;
  color: #6b7280;
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 22px;
}

.section {
  margin-top: 32px;
  display: grid;
  gap: 28px;
}

.category-block {
  display: grid;
  gap: 18px;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.category-header h2 {
  margin: 0;
  font-size: 24px;
}

.category-header span {
  color: #6b7280;
  font-size: 14px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.problem-card {
  padding: 18px;
  display: grid;
  gap: 12px;
}

.problem-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e0e7ff;
  color: #3730a3;
  font-size: 12px;
  font-weight: 600;
}

.badge.subtle {
  background: #f3f4f6;
  color: #374151;
}

.problem-card h3 {
  margin: 0;
  font-size: 20px;
}

.summary {
  margin: 0;
  color: #4b5563;
  font-size: 14px;
}

.meta-list {
  display: grid;
  gap: 8px;
  margin: 0;
}

.meta-list div {
  display: grid;
  gap: 2px;
}

.meta-list dt {
  color: #6b7280;
  font-size: 12px;
}

.meta-list dd {
  margin: 0;
  font-size: 14px;
}

.path-row {
  padding-top: 4px;
  color: #6b7280;
  font-size: 12px;
  word-break: break-all;
}

@media (max-width: 640px) {
  .page {
    padding: 20px 16px 48px;
  }

  .hero {
    padding: 24px;
  }
}
`
}

function buildReadmeSource() {
  return `
# frontend-handwriting-lab

一个用于系统练习前端面试高频手写题的本地项目，基于 Vite + React + TypeScript + Vitest 搭建。

## 技术栈

- Vite
- React 18
- TypeScript
- pnpm
- Vitest
- ESLint
- Prettier

## Node 版本

推荐使用当前主流 LTS，项目已按 Node.js 18+ 兼容设计。

## 核心目录

\`\`\`text
frontend-handwriting-lab/
├── docs/
├── scripts/
├── src/
│   ├── problems/
│   ├── solutions/
│   ├── tests/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── problem-bank.ts
├── package.json
├── vite.config.ts
└── README.md
\`\`\`

## 推荐练习方式

1. 打开 \`src/problems\` 中对应题目的文件。
2. 不看 \`src/solutions\`，先自己完成实现。
3. 运行 \`pnpm test\` 验证结果。
4. 针对单题执行 \`pnpm test -- src/tests/分类/题目名.test.ts\`。
5. 测试通过后再查看 \`src/solutions\` 对照思路。
6. 复盘时间复杂度、空间复杂度和边界情况。

## 面试模式

可以通过随机抽题脚本进入面试模式：

\`\`\`bash
pnpm random
pnpm random:easy
pnpm random:medium
pnpm random:hard
\`\`\`

输出示例：

\`\`\`text
🎯 今日手写题：debounce
难度：Medium
分类：函数相关
建议时间：10 分钟
文件：src/problems/function/debounce.ts
\`\`\`

## 常用命令

\`\`\`bash
pnpm install
pnpm dev
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm lint
pnpm format
pnpm typecheck
\`\`\`

## 题库规模

当前共预置 **${problems.length}** 道题，覆盖 JavaScript、函数、对象、数组、异步、浏览器、算法和 React 高频手写题。

## 说明

- 测试默认针对 \`src/problems\` 目录运行。
- \`src/solutions\` 中提供完整参考实现。
- 题目文件保留了 TODO 区域，初始状态下测试失败属于预期行为。
- 首页只做题库索引，不提供在线编辑器，保证项目保持简洁。
`
}

function buildProblemListSource() {
  const lines = [
    '# 前端手写题题库',
    '',
    '| 分类 | 题目 | 难度 | 高频度 | 核心考察点 |',
    '|---|---|---|---|---|',
    ...problems.map(
      (problem) =>
        `| ${categoryLabels[problem.category]} | ${problem.title} | ${problem.difficulty} | ${problem.frequency} | ${problem.points.join('、')} |`,
    ),
  ]

  return lines.join('\n')
}

function buildRandomProblemSource() {
  return `
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
`
}

function writeSharedFiles() {
  writeFile(
    'src/utils/todo.ts',
    `
export function createTodoError(name: string): Error {
  return new Error('TODO: 请先实现 ' + name)
}
`,
  )

  writeFile(
    'src/utils/list.ts',
    `
export interface ListNode<T> {
  value: T
  next: ListNode<T> | null
}

export function createLinkedList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) {
    return null
  }

  const head: ListNode<T> = {
    value: values[0],
    next: null,
  }

  let current = head

  for (let index = 1; index < values.length; index += 1) {
    current.next = {
      value: values[index],
      next: null,
    }
    current = current.next
  }

  return head
}

export function linkedListToArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = []
  let current = head

  while (current) {
    result.push(current.value)
    current = current.next
  }

  return result
}
`,
  )

  writeFile(
    'src/utils/tree.ts',
    `
export interface TreeNode<T> {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}

export function createTree<T>(
  value: T,
  left: TreeNode<T> | null = null,
  right: TreeNode<T> | null = null,
): TreeNode<T> {
  return {
    value,
    left,
    right,
  }
}
`,
  )

  writeFile(
    'src/utils/storage.ts',
    `
export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear?(): void
}
`,
  )

  writeFile('src/problem-bank.ts', buildProblemBankSource())
  writeFile('src/App.tsx', buildAppSource())
  writeFile('src/index.css', buildIndexCssSource())
  writeFile('docs/problem-list.md', buildProblemListSource())
  writeFile('README.md', buildReadmeSource())
  writeFile('scripts/random-problem.ts', buildRandomProblemSource())
}

function writeProblemFiles() {
  problems.forEach((problem) => {
    const testExtension = problem.testExtension ?? 'ts'

    writeFile(
      `src/problems/${problem.category}/${problem.slug}.ts`,
      problem.problem,
    )
    writeFile(
      `src/solutions/${problem.category}/${problem.slug}.ts`,
      problem.solution,
    )
    writeFile(
      `src/tests/${problem.category}/${problem.slug}.test.${testExtension}`,
      problem.test,
    )
  })
}

function main() {
  cleanup()
  writeSharedFiles()
  writeProblemFiles()
  console.log('Scaffolded ' + problems.length + ' problems.')
}

main()
