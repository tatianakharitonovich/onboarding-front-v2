import { CancelToken } from 'axios'

export type ReadFilters = {
  ordering?: string
  search?: string
}

export type PaginatedReadFilters = ReadFilters & {
  page_size?: number
  page?: number
}

export interface ICancellable {
  cancelToken?: CancelToken
}

export type ReadParams<TFilters extends {} = {}> = TFilters &
PaginatedReadFilters &
ICancellable

export type ReadRelated<TFilters extends {} = {}, TKey = number> = {
  id: TKey
  params?: ReadParams<TFilters>
}

export type ReadData<TModel = any> = {
  count: number
  next: number | null
  previous: number | null
  results: TModel[]
}

export type UpdatePayload<TModel = any, TKey = number> = {
  id: TKey
  data: Partial<TModel>
}

export type ValidationErrors = {
  [k: string]: string | undefined | ValidationErrors
}

export type ApiError = {
  detail?: string
  error?: string
  [k: string]: string | undefined | ValidationErrors
}

export type ApiResponsePayload<TModel = any> = {
  data?: TModel
  status?: number
}

export type ApiResponse<TModel = any> = Promise<ApiResponsePayload<TModel>>
