import { compileTypeScript } from './compile'

export interface ConsoleEntry {
  type: 'log' | 'error'
  message: string
}

export interface ExecuteResult {
  success: boolean
  consoleEntries: ConsoleEntry[]
  exports: Record<string, unknown>
  runtimeError: string | null
  compileErrors: string[]
}

function formatValue(value: unknown): string {
  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Error) {
    return `${value.name}: ${value.message}`
  }

  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

export function executeUserCode(source: string): ExecuteResult {
  const { jsCode, diagnostics } = compileTypeScript(source)

  if (diagnostics.length > 0) {
    return {
      success: false,
      consoleEntries: [],
      exports: {},
      runtimeError: null,
      compileErrors: diagnostics,
    }
  }

  const consoleEntries: ConsoleEntry[] = []
  const module = { exports: {} as Record<string, unknown> }

  const fakeConsole = {
    log: (...args: unknown[]) => {
      consoleEntries.push({
        type: 'log',
        message: args.map(formatValue).join(' '),
      })
    },
    error: (...args: unknown[]) => {
      consoleEntries.push({
        type: 'error',
        message: args.map(formatValue).join(' '),
      })
    },
  }

  try {
    const runner = new Function(
      'module',
      'exports',
      'console',
      `
${jsCode}
return module.exports
`,
    ) as (
      moduleArg: { exports: Record<string, unknown> },
      exportsArg: Record<string, unknown>,
      consoleArg: typeof fakeConsole,
    ) => Record<string, unknown>

    const exportsObject = runner(module, module.exports, fakeConsole)

    return {
      success: true,
      consoleEntries,
      exports: exportsObject,
      runtimeError: null,
      compileErrors: [],
    }
  } catch (error) {
    return {
      success: false,
      consoleEntries,
      exports: {},
      runtimeError:
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : String(error),
      compileErrors: [],
    }
  }
}

export async function executeProblemPreview(
  source: string,
  runSnippet?: string,
): Promise<ExecuteResult & { returnValue?: string }> {
  const execution = executeUserCode(source)

  if (!execution.success || !runSnippet) {
    return execution
  }

  const previewConsoleEntries = execution.consoleEntries
  const fakeConsole = {
    log: (...args: unknown[]) => {
      previewConsoleEntries.push({
        type: 'log',
        message: args.map(formatValue).join(' '),
      })
    },
    error: (...args: unknown[]) => {
      previewConsoleEntries.push({
        type: 'error',
        message: args.map(formatValue).join(' '),
      })
    },
  }

  try {
    const previewRunner = new Function(
      'exports',
      'console',
      'setTimeout',
      'clearTimeout',
      `
return (async () => {
${runSnippet}
})()
`,
    ) as (
      exportsArg: Record<string, unknown>,
      consoleArg: typeof fakeConsole,
      setTimeoutArg: typeof window.setTimeout,
      clearTimeoutArg: typeof window.clearTimeout,
    ) => Promise<unknown>

    const returnValue = await previewRunner(
      execution.exports,
      fakeConsole,
      window.setTimeout.bind(window),
      window.clearTimeout.bind(window),
    )

    return {
      ...execution,
      returnValue:
        returnValue === undefined ? undefined : formatValue(returnValue),
    }
  } catch (error) {
    return {
      ...execution,
      success: false,
      runtimeError:
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : String(error),
    }
  }
}
