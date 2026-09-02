import type { RefObject } from 'react'
import { createTodoError } from '../../utils/todo'

export function useClickOutside<T extends HTMLElement>(
  _ref: RefObject<T>,
  _handler: (event: MouseEvent) => void,
): void {
  // TODO: 请实现 useClickOutside
  throw createTodoError('useClickOutside')
}

