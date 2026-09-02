import type { DependencyList, EffectCallback } from 'react'
import { createTodoError } from '../../utils/todo'

export function useUpdateEffect(
  _effect: EffectCallback,
  _deps: DependencyList,
): void {
  // TODO: 请实现 useUpdateEffect
  throw createTodoError('useUpdateEffect')
}

