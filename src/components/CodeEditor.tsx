import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  height?: number
}

export function CodeEditor({ value, onChange, height = 520 }: CodeEditorProps) {
  return (
    <div className="editor-shell">
      <Editor
        language="typescript"
        theme="vs-dark"
        value={value}
        height={height}
        onChange={(nextValue) => onChange(nextValue ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          tabSize: 2,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
        }}
      />
    </div>
  )
}
