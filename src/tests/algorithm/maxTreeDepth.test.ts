import { describe, expect, it } from 'vitest'
import { maxTreeDepth } from '../../problems/algorithm/maxTreeDepth'
import { createTree } from '../../utils/tree'

describe('maxTreeDepth', () => {
  it('返回树的最大深度', () => {
    const tree = createTree(1, createTree(2, createTree(3), null), null)
    expect(maxTreeDepth(tree)).toBe(3)
  })
})

