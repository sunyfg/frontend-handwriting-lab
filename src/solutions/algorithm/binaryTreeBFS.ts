import type { TreeNode } from '../../utils/tree'

export function binaryTreeBFS<T>(root: TreeNode<T> | null): T[] {
  if (!root) {
    return []
  }

  const queue: TreeNode<T>[] = [root]
  const result: T[] = []

  while (queue.length > 0) {
    const current = queue.shift() as TreeNode<T>
    result.push(current.value)

    if (current.left) {
      queue.push(current.left)
    }

    if (current.right) {
      queue.push(current.right)
    }
  }

  return result
}

