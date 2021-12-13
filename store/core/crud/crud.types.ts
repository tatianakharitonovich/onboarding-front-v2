import {
  ApiFullService,
  ApiReadService,
  ApiReadWriteService,
  ApiService,
  ReadData,
  ApiResponse,
  UpdatePayload,
  ReadPayload,
  RetrievePayload,
  CreatePayload,
} from '~/services'

export type ModelConstructor<TModelData, TModel = TModelData> = {
  new (data: TModelData): TModel
}

export interface IApiModule {
  service: ApiService
}

/** Read only */
export interface IApiReadModule<
  TGetModelData,
  TGetModel = TGetModelData,
  TKey = number,
  TReadModelData = TGetModelData,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModelData>
> extends IApiModule {
  service: ApiReadService<TGetModelData, TKey, TReadModelData, TFilters>
  GetModel: ModelConstructor<TGetModelData, TGetModel>
  ReadModel: ModelConstructor<TReadModelData, TReadModel>
  get(payload: RetrievePayload<TKey>): ApiResponse<TGetModel>
  read(payload?: ReadPayload<TFilters>): ApiResponse<ReadData<TReadModel>>
}

/** Read and write */
export interface IApiReadWriteModule<
  TGetModelData,
  TGetModel = TGetModelData,
  TKey = number,
  TReadModelData = TGetModelData,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModelData>,
  TCreateModelData = TGetModelData,
  TUpdateModelData = TGetModelData
> extends IApiReadModule<
  TGetModelData,
  TGetModel,
  TKey,
  TReadModelData,
  TReadModel,
  TFilters
  > {
  service: ApiReadWriteService<
  TGetModelData,
  TKey,
  TReadModelData,
  TFilters,
  TCreateModelData,
  TUpdateModelData
  >
  create(payload: CreatePayload<TCreateModelData>): ApiResponse<TGetModel>
  update(payload: UpdatePayload<TUpdateModelData, TKey>): ApiResponse<TGetModel>
  replace(payload: UpdatePayload<TCreateModelData, TKey>): ApiResponse<TGetModel>
}

/** Full CRUD */
export interface IApiFullModule<
  TGetModelData,
  TGetModel = TGetModelData,
  TKey = number,
  TReadModelData = TGetModelData,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModelData>,
  TCreateModelData = TGetModelData,
  TUpdateModelData = TGetModelData
> extends IApiReadWriteModule<
  TGetModelData,
  TGetModel,
  TKey,
  TReadModelData,
  TReadModel,
  TFilters,
  TCreateModelData,
  TUpdateModelData
  > {
  service: ApiFullService<
  TGetModelData,
  TKey,
  TReadModelData,
  TFilters,
  TCreateModelData,
  TUpdateModelData
  >
  delete(payload: RetrievePayload<TKey>): ApiResponse<void>
}
