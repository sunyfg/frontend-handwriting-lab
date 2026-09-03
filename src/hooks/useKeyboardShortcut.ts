import { useEffect } from 'react'

interface UseKeyboardShortcutOptions {
  onRunCode?: () => void
  onRunTests?: () => void
}

export function useKeyboardShortcut({
  onRunCode,
  onRunTests,
}: UseKeyboardShortcutOptions) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const isCommand = event.metaKey || event.ctrlKey

      if (!isCommand || event.key !== 'Enter') {
        return
      }

      if (event.shiftKey) {
        if (onRunTests) {
          event.preventDefault()
          onRunTests()
        }
        return
      }

      if (onRunCode) {
        event.preventDefault()
        onRunCode()
      }
    }

    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [onRunCode, onRunTests])
}
