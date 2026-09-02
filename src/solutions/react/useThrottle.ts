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

