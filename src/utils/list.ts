export interface ListNode<T> {
  value: T
  next: ListNode<T> | null
}

export function createLinkedList<T>(values: T[]): ListNode<T> | null {
  if (values.length === 0) {
    return null
  }

  const head: ListNode<T> = {
    value: values[0],
    next: null,
  }

  let current = head

  for (let index = 1; index < values.length; index += 1) {
    current.next = {
      value: values[index],
      next: null,
    }
    current = current.next
  }

  return head
}

export function linkedListToArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = []
  let current = head

  while (current) {
    result.push(current.value)
    current = current.next
  }

  return result
}

