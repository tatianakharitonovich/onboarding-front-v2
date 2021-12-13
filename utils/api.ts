import { ApiResponse } from '~/services'

type StatusGroup = '200' | '300' | '400' | '500' | undefined

export function getErrorStatusGroup(status?: number): StatusGroup {
  return status ? (`${status.toString()[0]}00` as StatusGroup) : undefined
}

type AsyncRetrieveResponse<TModel> = { data: TModel | null }

export async function asyncRetrieve<TModel = any, TKey = string>(
  action: (key: TKey) => ApiResponse<TModel>,
  key?: TKey,
  success?: (data: TModel) => AsyncRetrieveResponse<TModel> | undefined,
): Promise<AsyncRetrieveResponse<TModel>> {
  if (key) {
    const response = await action(key)
    const data = response.data || null
    return success && data ? success(data) || { data } : { data }
  }
  return { data: null }
}

export function processApiQuery(
  params: Record<string, any>,
): Record<string, string> {
  const searchParams: Record<string, string> = {}
  for (const key of Object.keys(params)) {
    let value = params[key]
    if (Array.isArray(value)) {
      if (value.length) {
        value = value.some((i: any) => typeof i !== 'string')
          ? JSON.stringify(value)
          : value.join(',')
        searchParams[key] = value
      }
    } else if (value) {
      searchParams[key] = value
    }
  }
  return searchParams
}
