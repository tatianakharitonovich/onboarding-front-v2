import { Action, VuexModule } from 'vuex-module-decorators'
import {
  IApiFullModule,
  IApiReadModule,
  IApiReadWriteModule,
  IApiModule,
  ModelConstructor,
} from '~/store'
import {
  ApiFullService,
  ApiReadService,
  ApiReadWriteService,
  ApiService,
  ReadData,
  ApiResponse,
  UpdatePayload,
  RetrievePayload,
  ReadPayload,
  CreatePayload,
} from '~/services'

export async function read<TReadModelData, TReadModel, TPayload>(
  method: (payload: TPayload) => ApiResponse<ReadData<TReadModelData>>,
  Model: ModelConstructor<TReadModelData, TReadModel>,
  params: TPayload,
): ApiResponse<ReadData<TReadModel>> {
  const response = await method(params)
  return {
    ...response,
    data: response.data
      ? {
        ...response.data,
        results: response.data?.results?.map(item => new Model(item)),
      }
      : undefined,
  }
}

export abstract class ApiModule
  extends VuexModule
  implements IApiModule {
  abstract get service(): ApiService
}

export abstract class ApiReadModule<
  TGetModelData,
  TGetModel = TGetModelData,
  TKey = number,
  TReadModelData = TGetModelData,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModelData>
>
  extends ApiModule
  implements
    IApiReadModule<
    TGetModelData,
    TGetModel,
    TKey,
    TReadModelData,
    TReadModel,
    TFilters
    > {
  abstract get service(): ApiReadService<
  TGetModelData,
  TKey,
  TReadModelData,
  TFilters
  >

  abstract get GetModel(): ModelConstructor<TGetModelData, TGetModel>
  abstract get ReadModel(): ModelConstructor<TReadModelData, TReadModel>

  @Action({ rawError: true })
  async get(payload: RetrievePayload<TKey>): ApiResponse<TGetModel> {
    const response = await this.service.get(payload)
    return {
      ...response,
      data: response.data ? new this.GetModel(response.data) : undefined,
    }
  }

  @Action({ rawError: true })
  async read(payload?: ReadPayload<TFilters>): ApiResponse<ReadData<TReadModel>> {
    return await read<
    TReadModelData,
    TReadModel,
    ReadPayload<TFilters> | undefined
    >(p => this.service.read(p), this.ReadModel, payload)
  }
}

export abstract class ApiReadWriteModule<
  TGetModelData,
  TGetModel = TGetModelData,
  TKey = number,
  TReadModelData = TGetModelData,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModelData>,
  TCreateModelData = TGetModelData,
  TUpdateModelData = TGetModelData
>
  extends ApiReadModule<
  TGetModelData,
  TGetModel,
  TKey,
  TReadModelData,
  TReadModel,
  TFilters
  >
  implements
    IApiReadWriteModule<
    TGetModelData,
    TGetModel,
    TKey,
    TReadModelData,
    TReadModel,
    TFilters,
    TCreateModelData,
    TUpdateModelData
    > {
  abstract get service(): ApiReadWriteService<
  TGetModelData,
  TKey,
  TReadModelData,
  TFilters,
  TCreateModelData,
  TUpdateModelData
  >

  @Action({ rawError: true })
  async create(payload: CreatePayload<TCreateModelData>): ApiResponse<TGetModel> {
    const response = await this.service.create(payload)
    return {
      ...response,
      data: response.data ? new this.GetModel(response.data) : undefined,
    }
  }

  @Action({ rawError: true })
  async update(
    payload: UpdatePayload<TUpdateModelData, TKey>,
  ): ApiResponse<TGetModel> {
    const response = await this.service.update(payload)
    return {
      ...response,
      data: response.data ? new this.GetModel(response.data) : undefined,
    }
  }

  @Action({ rawError: true })
  async replace(
    payload: UpdatePayload<TCreateModelData, TKey>,
  ): ApiResponse<TGetModel> {
    const response = await this.service.replace(payload)
    return {
      ...response,
      data: response.data ? new this.GetModel(response.data) : undefined,
    }
  }
}

export abstract class ApiFullModule<
  TGetModelData,
  TGetModel = TGetModelData,
  TKey = number,
  TReadModelData = TGetModelData,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModelData>,
  TCreateModelData = TGetModelData,
  TUpdateModelData = TGetModelData
>
  extends ApiReadWriteModule<
  TGetModelData,
  TGetModel,
  TKey,
  TReadModelData,
  TReadModel,
  TFilters,
  TCreateModelData,
  TUpdateModelData
  >
  implements
    IApiFullModule<
    TGetModelData,
    TGetModel,
    TKey,
    TReadModelData,
    TReadModel,
    TFilters,
    TCreateModelData,
    TUpdateModelData
    > {
  abstract get service(): ApiFullService<
  TGetModelData,
  TKey,
  TReadModelData,
  TFilters,
  TCreateModelData,
  TUpdateModelData
  >

  @Action({ rawError: true })
  async delete(payload: RetrievePayload<TKey>): ApiResponse<void> {
    return await this.service.delete(payload)
  }
}
