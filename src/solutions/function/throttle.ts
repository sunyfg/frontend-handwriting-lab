export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let locked = false

  return (...args: TArgs) => {
    if (locked) {
      return
    }

    locked = true
    fn(...args)

    setTimeout(() => {
      locked = false
    }, delay)
  }
}

