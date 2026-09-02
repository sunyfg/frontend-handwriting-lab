import { describe, expect, it } from 'vitest'
import { binaryTreeBFS } from '../../problems/algorithm/binaryTreeBFS'
import { createTree } from '../../utils/tree'

describe('binaryTreeBFS', () => {
  it('按层序遍历节点', () => {
    const tree = createTree(1, createTree(2), createTree(3))
    expect(binaryTreeBFS(tree)).toEqual([1, 2, 3])
  })
})

