import { CancelToken } from 'axios'

/** Read filters */
export type ReadFilters = {
  ordering?: string
  search?: string
}

export type PaginatedReadFilters = ReadFilters & {
  page_size?: number
  page?: number
}

/** Axios cancellable request's interface */
export interface ICancellable {
  cancelToken?: CancelToken
}

/** Read params */
export type ReadParams<TFilters extends {} = {}> = TFilters &
PaginatedReadFilters &
ICancellable

// `parentId` is for nested urls like `/<parentId>/items/`
export type ReadPayload<TFilters extends {} = {}, TParentKey = number> = {
  parentId?: TParentKey
  params?: ReadParams<TFilters>
}

/** Get by ID, Create, Update and Delete methods' params */
export type RetrievePayload<TKey = number, TParentKey = number> = {
  id: TKey
  parentId?: TParentKey
}

/** Create/Modify actions' payloads */
export type CreatePayload<TModel = any, TParentKey = number> = RetrievePayload<undefined, TParentKey> & {
  data: TModel
}

export type UpdatePayload<TModel = any, TKey = number, TParentKey = number> = RetrievePayload<TKey, TParentKey> & {
  data: Partial<TModel>
}

export type EndpointKeys<TKey = number> = Partial<{
  id: TKey
  parentId: any
}>

/** Read response data */
export type ReadData<TModel = any> = {
  count: number
  next: number | null
  previous: number | null
  results: TModel[]
}

/** Responses' types */
export type ApiResponsePayload<TModel = any> = {
  data?: TModel
  status?: number
}

export type ApiResponse<TModel = any> = Promise<ApiResponsePayload<TModel>>

/** Response errors' types */
export type ValidationErrors = {
  [k: string]: string | undefined | ValidationErrors
}

export type ApiError = {
  detail?: string
  error?: string
  [k: string]: string | undefined | ValidationErrors
}
