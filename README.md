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

```text
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
```

## 推荐练习方式

1. 打开 `src/problems` 中对应题目的文件。
2. 不看 `src/solutions`，先自己完成实现。
3. 运行 `pnpm test` 验证结果。
4. 针对单题执行 `pnpm test -- src/tests/分类/题目名.test.ts`。
5. 测试通过后再查看 `src/solutions` 对照思路。
6. 复盘时间复杂度、空间复杂度和边界情况。

## 面试模式

可以通过随机抽题脚本进入面试模式：

```bash
pnpm random
pnpm random:easy
pnpm random:medium
pnpm random:hard
```

输出示例：

```text
🎯 今日手写题：debounce
难度：Medium
分类：函数相关
建议时间：10 分钟
文件：src/problems/function/debounce.ts
```

## 常用命令

```bash
pnpm install
pnpm dev
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm lint
pnpm format
pnpm typecheck
```

## 题库规模

当前共预置 **62** 道题，覆盖 JavaScript、函数、对象、数组、异步、浏览器、算法和 React 高频手写题。

## 说明

- 测试默认针对 `src/problems` 目录运行。
- `src/solutions` 中提供完整参考实现。
- 题目文件保留了 TODO 区域，初始状态下测试失败属于预期行为。
- 首页只做题库索引，不提供在线编辑器，保证项目保持简洁。

