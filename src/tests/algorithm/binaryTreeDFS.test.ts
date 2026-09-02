import { describe, expect, it } from 'vitest'
import { binaryTreeDFS } from '../../problems/algorithm/binaryTreeDFS'
import { createTree } from '../../utils/tree'

describe('binaryTreeDFS', () => {
  it('按前序遍历节点', () => {
    const tree = createTree(1, createTree(2), createTree(3))
    expect(binaryTreeDFS(tree)).toEqual([1, 2, 3])
  })
})

