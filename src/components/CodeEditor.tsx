import Editor from '@monaco-editor/react'
import { cn } from '../lib/utils'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  height?: number
  className?: string
  language?: string
}

export function CodeEditor({
  value,
  onChange,
  height = 520,
  className,
  language = 'typescript',
}: CodeEditorProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-inner',
        className,
      )}
    >
      <Editor
        language={language}
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
          padding: {
            top: 16,
          },
        }}
      />
    </div>
  )
}
