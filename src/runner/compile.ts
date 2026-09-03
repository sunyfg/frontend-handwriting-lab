import ts from 'typescript'

export interface CompileResult {
  jsCode: string
  diagnostics: string[]
}

export function compileTypeScript(source: string): CompileResult {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      strict: true,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    reportDiagnostics: true,
  })

  const diagnostics =
    result.diagnostics?.map((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')

      if (diagnostic.file && diagnostic.start !== undefined) {
        const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
        return `${position.line + 1}:${position.character + 1} ${message}`
      }

      return message
    }) ?? []

  return {
    jsCode: result.outputText,
    diagnostics,
  }
}
