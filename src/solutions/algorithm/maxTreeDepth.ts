import type { TreeNode } from '../../utils/tree'

export function maxTreeDepth<T>(root: TreeNode<T> | null): number {
  if (!root) {
    return 0
  }

  return 1 + Math.max(maxTreeDepth(root.left), maxTreeDepth(root.right))
}

