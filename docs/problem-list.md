# 前端手写题题库

| 分类 | 题目 | 难度 | 高频度 | 核心考察点 |
|---|---|---|---|---|
| JavaScript 基础 | 手写 typeof | Easy | ★★★★★ | 类型判断、边界处理、原始值与引用值 |
| JavaScript 基础 | 手写 instanceof | Easy | ★★★★★ | 原型链、构造函数、边界处理 |
| JavaScript 基础 | 手写 Object.create | Medium | ★★★★ | 原型继承、属性描述符、对象创建 |
| JavaScript 基础 | 手写 new | Medium | ★★★★★ | new 流程、this 绑定、返回值规则 |
| JavaScript 基础 | 手写 call | Medium | ★★★★★ | this 绑定、参数展开、隐式属性 |
| JavaScript 基础 | 手写 apply | Medium | ★★★★★ | this 绑定、数组参数、边界处理 |
| JavaScript 基础 | 手写 bind | Hard | ★★★★★ | this 绑定、柯里化参数、new 绑定优先级 |
| 函数相关 | debounce 防抖 | Medium | ★★★★★ | 定时器、闭包、高频事件优化 |
| 函数相关 | throttle 节流 | Medium | ★★★★★ | 定时器、节流窗口、高频事件优化 |
| 函数相关 | curry 柯里化 | Medium | ★★★★ | 高阶函数、参数收集、递归 |
| 函数相关 | compose | Medium | ★★★★ | 函数组合、从右到左执行、高阶函数 |
| 函数相关 | pipe | Easy | ★★★★ | 函数组合、从左到右执行、高阶函数 |
| 函数相关 | once | Easy | ★★★★ | 闭包、缓存结果、函数包装 |
| 函数相关 | memoize | Medium | ★★★★ | 缓存、闭包、高阶函数 |
| 对象与拷贝 | shallowClone | Easy | ★★★★ | 浅拷贝、对象遍历、数组处理 |
| 对象与拷贝 | deepClone | Hard | ★★★★★ | 递归、循环引用、复杂引用类型 |
| 对象与拷贝 | deepEqual | Medium | ★★★★★ | 递归比较、数组对象比较、边界处理 |
| 对象与拷贝 | flattenObject | Medium | ★★★★ | 递归、路径拼接、对象遍历 |
| 对象与拷贝 | unflattenObject | Medium | ★★★★ | 路径解析、对象重建、数组索引处理 |
| 数组 | Array.prototype.map | Easy | ★★★★★ | 数组遍历、回调参数、返回新数组 |
| 数组 | filter | Easy | ★★★★★ | 数组遍历、条件筛选、返回新数组 |
| 数组 | reduce | Medium | ★★★★★ | 累加器、初始值处理、数组遍历 |
| 数组 | forEach | Easy | ★★★★ | 数组遍历、回调调用、无返回值 |
| 数组 | flat | Medium | ★★★★ | 递归、深度控制、数组处理 |
| 数组 | unique | Easy | ★★★★★ | 去重、Set、顺序保持 |
| 数组 | chunk | Easy | ★★★★ | 数组分片、循环切片、边界处理 |
| 数组 | shuffle | Medium | ★★★★ | 随机算法、Fisher-Yates、原数组保护 |
| 数组 | 数组扁平化 | Easy | ★★★★★ | 递归、数组展开、基础算法 |
| 数组 | 数组去重 | Medium | ★★★★ | 去重、键提取、顺序保持 |
| 异步 | 手写 Promise | Hard | ★★★★★ | 状态机、链式调用、thenable 处理 |
| 异步 | Promise.all | Medium | ★★★★★ | Promise 组合、顺序保持、失败短路 |
| 异步 | Promise.allSettled | Medium | ★★★★ | Promise 组合、状态收集、异步结果结构化 |
| 异步 | Promise.race | Medium | ★★★★ | Promise 组合、最快完成、竞速处理 |
| 异步 | Promise.any | Hard | ★★★★ | Promise 组合、成功短路、AggregateError |
| 异步 | asyncPool / 并发控制 | Hard | ★★★★★ | 并发控制、任务调度、Promise 队列 |
| 异步 | sleep | Easy | ★★★★ | Promise、定时器、异步封装 |
| 异步 | retry | Medium | ★★★★★ | 错误重试、Promise 链、重试次数控制 |
| 异步 | timeout | Medium | ★★★★ | Promise.race、超时控制、错误处理 |
| 异步 | 串行执行异步任务 | Medium | ★★★★ | 串行调度、Promise 链、结果收集 |
| 异步 | 控制最大并发请求数 | Hard | ★★★★★ | 并发控制、任务队列、Promise 调度 |
| 浏览器 | EventEmitter | Medium | ★★★★★ | 发布订阅、事件中心、once/off |
| 浏览器 | 发布订阅模式 | Medium | ★★★★ | 发布订阅、消息分发、取消订阅 |
| 浏览器 | DOM 事件委托 | Medium | ★★★★ | 事件冒泡、DOM API、事件委托 |
| 浏览器 | URL 参数解析 | Easy | ★★★★ | URLSearchParams、重复参数、解码 |
| 浏览器 | Cookie 解析 | Easy | ★★★ | 字符串解析、URL 解码、边界处理 |
| 浏览器 | localStorage 带过期时间封装 | Medium | ★★★★ | 本地存储、过期时间、序列化 |
| 算法/数据结构 | LRU Cache | Hard | ★★★★★ | Map、缓存淘汰、数据结构设计 |
| 算法/数据结构 | 链表反转 | Medium | ★★★★★ | 链表、指针反转、迭代 |
| 算法/数据结构 | 二叉树 DFS | Easy | ★★★★ | 树遍历、深度优先搜索、递归 |
| 算法/数据结构 | 二叉树 BFS | Easy | ★★★★ | 树遍历、广度优先搜索、队列 |
| 算法/数据结构 | 二叉树最大深度 | Easy | ★★★★ | 树递归、深度计算、边界处理 |
| 算法/数据结构 | 快速排序 | Medium | ★★★★★ | 分治、递归、排序 |
| 算法/数据结构 | 归并排序 | Medium | ★★★★★ | 分治、合并有序数组、递归 |
| 算法/数据结构 | 二分查找 | Easy | ★★★★★ | 二分、边界收缩、有序数组 |
| 算法/数据结构 | 两数之和 | Easy | ★★★★★ | 哈希表、一次遍历、数组索引 |
| React | 手写简化版 useState 思路 | Medium | ★★★★ | 状态闭包、更新函数、基础 Hook 思路 |
| React | useDebounce | Medium | ★★★★★ | React Hook、定时器、副作用清理 |
| React | useThrottle | Medium | ★★★★ | React Hook、节流、Ref 与 Effect |
| React | usePrevious | Easy | ★★★★ | React Hook、useRef、副作用时机 |
| React | useUpdateEffect | Medium | ★★★★ | React Hook、首次渲染跳过、effect 控制 |
| React | useRequest 简化版 | Hard | ★★★★★ | React Hook、异步状态管理、封装请求逻辑 |
| React | useClickOutside | Medium | ★★★★ | React Hook、DOM 事件监听、Ref |
