import { ReadData, ApiResponse, UpdatePayload, RetrievePayload, ReadPayload, CreatePayload, EndpointKeys } from '~/services'

export interface IApiService {
  baseURL: string
}

/** Read only */
export interface IApiReadService<
  TGetModel,
  TKey = number,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModel>
> {
  endpoint(keys?: EndpointKeys<TKey>): string
  get(payload: RetrievePayload<TKey>): ApiResponse<TGetModel>
  read(params: ReadPayload<TFilters>): ApiResponse<ReadData<TReadModel>>
}

/** Read and write */
export interface IApiReadWriteService<
  TGetModel,
  TKey = number,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModel>,
  TCreateModel = TGetModel,
  TUpdateModel = TGetModel
> extends IApiReadService<TGetModel, TKey, TReadModel, TFilters> {
  formProcessor: boolean
  create(payload: CreatePayload<TCreateModel>): ApiResponse<TGetModel>
  update(payload: UpdatePayload<TUpdateModel, TKey>): ApiResponse<TGetModel>
  replace(payload: UpdatePayload<TCreateModel, TKey>): ApiResponse<TGetModel>
}

/** Full CRUD */
export interface IApiFullService<
  TGetModel,
  TKey = number,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModel>,
  TCreateModel = TGetModel,
  TUpdateModel = TGetModel
> extends IApiReadWriteService<
  TGetModel,
  TKey,
  TReadModel,
  TFilters,
  TCreateModel,
  TUpdateModel
  > {
  delete(payload: RetrievePayload<TKey>): ApiResponse<void>
}
