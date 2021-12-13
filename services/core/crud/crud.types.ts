import { ReadData, ReadParams, ApiResponse, UpdatePayload } from '~/services'

/** Read only */
export interface IApiReadService<
  TGetModel,
  TKey = number,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModel>
> {
  get(id: TKey): ApiResponse<TGetModel>
  read(params: ReadParams<TFilters>): ApiResponse<ReadData<TReadModel>>
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
  create(payload: TCreateModel): ApiResponse<TGetModel>
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
  delete(id: TKey): ApiResponse<void>
}
