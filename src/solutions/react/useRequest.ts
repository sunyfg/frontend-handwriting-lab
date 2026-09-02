import { useCallback, useEffect, useState } from 'react'

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
  service: (...params: TParams) => Promise<TData>,
  options: UseRequestOptions<TParams> = {},
): UseRequestResult<TData, TParams> {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const run = useCallback(
    async (...params: TParams) => {
      setLoading(true)
      setError(null)

      try {
        const result = await service(...params)
        setData(result)
        return result
      } catch (requestError) {
        const normalizedError =
          requestError instanceof Error
            ? requestError
            : new Error(String(requestError))
        setError(normalizedError)
        throw normalizedError
      } finally {
        setLoading(false)
      }
    },
    [service],
  )

  useEffect(() => {
    if (!options.manual && options.defaultParams) {
      void run(...options.defaultParams)
    }
  }, [options.defaultParams, options.manual, run])

  return {
    data,
    loading,
    error,
    run,
  }
}

