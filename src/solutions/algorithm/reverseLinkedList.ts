import type { ListNode } from '../../utils/list'

export function reverseLinkedList<T>(
  head: ListNode<T> | null,
): ListNode<T> | null {
  let previous: ListNode<T> | null = null
  let current = head

  while (current) {
    const next = current.next
    current.next = previous
    previous = current
    current = next
  }

  return previous
}

