type SetStateAction<T> = T | ((previous: T) => T)

export function createMiniState<T>(
  initialValue: T,
): [() => T, (nextValue: SetStateAction<T>) => T] {
  let state = initialValue

  const getState = () => state
  const setState = (nextValue: SetStateAction<T>) => {
    state =
      typeof nextValue === 'function'
        ? (nextValue as (previous: T) => T)(state)
        : nextValue

    return state
  }

  return [getState, setState]
}

