import { describe, expect, it } from 'vitest'
import { reverseLinkedList } from '../../problems/algorithm/reverseLinkedList'
import { createLinkedList, linkedListToArray } from '../../utils/list'

describe('reverseLinkedList', () => {
  it('反转单链表', () => {
    const head = createLinkedList([1, 2, 3])
    expect(linkedListToArray(reverseLinkedList(head))).toEqual([3, 2, 1])
  })

  it('处理空链表', () => {
    expect(reverseLinkedList(null)).toBeNull()
  })
})

