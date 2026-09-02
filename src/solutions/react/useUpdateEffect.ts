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

