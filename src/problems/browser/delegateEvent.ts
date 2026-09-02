import { createTodoError } from '../../utils/todo'

export function delegateEvent(
  _container: Element,
  _eventType: keyof HTMLElementEventMap,
  _selector: string,
  _handler: (event: Event, target: Element) => void,
): () => void {
  // TODO: 请实现 delegateEvent
  throw createTodoError('delegateEvent')
}

