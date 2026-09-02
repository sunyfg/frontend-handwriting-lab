export interface TreeNode<T> {
  value: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}

export function createTree<T>(
  value: T,
  left: TreeNode<T> | null = null,
  right: TreeNode<T> | null = null,
): TreeNode<T> {
  return {
    value,
    left,
    right,
  }
}

