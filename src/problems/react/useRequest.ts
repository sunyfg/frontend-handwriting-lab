import { createTodoError } from '../../utils/todo'

interface UseRequestOptions<TParams extends unknown[]> {
  manual?: boolean
  defaultParams?: TParams
}

interface UseRequestResult<TData, TParams extends unknown[]> {
  data: TData | null
  loading: boolean
  error: Error | null
  run: (...params: TParams) => Promise<TData>
}

export function useRequest<TData, TParams extends unknown[]>(
  _service: (...params: TParams) => Promise<TData>,
  _options: UseRequestOptions<TParams> = {},
): UseRequestResult<TData, TParams> {
  // TODO: 请实现 useRequest
  throw createTodoError('useRequest')
}

