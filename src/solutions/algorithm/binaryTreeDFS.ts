import type { TreeNode } from '../../utils/tree'

export function binaryTreeDFS<T>(root: TreeNode<T> | null): T[] {
  if (!root) {
    return []
  }

  return [
    root.value,
    ...binaryTreeDFS(root.left),
    ...binaryTreeDFS(root.right),
  ]
}

