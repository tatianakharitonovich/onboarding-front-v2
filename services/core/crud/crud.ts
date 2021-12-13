import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import {
  DEFAULT_PAGE_SIZE,
  IApiFullService,
  IApiReadService,
  IApiReadWriteService,
  ICancellable,
  ReadData,
  PaginatedReadFilters,
  ReadParams,
  ApiResponse,
  UpdatePayload,
  extendApiInstance,
} from '~/services'

export class ApiService {
  protected api: NuxtAxiosInstance

  constructor(protected endpoint: string, ctx: Context) {
    this.api = ctx.$axios.create({
      baseURL: `${this.endpoint}/`,
    })
    extendApiInstance(this.api, ctx)
  }

  private cleanObject(data: Record<any, any>): Record<string, any> {
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key]
      }
    })
    return data
  }

  protected convertToFormData(data: Record<string, any>): FormData {
    const cleanedData = this.cleanObject(data)
    return Object.keys(cleanedData).reduce((formData, prop) => {
      const value = cleanedData[prop]
      const valueString: string | Blob
        = Array.isArray(value) && value.some((i: any) => typeof i !== 'string')
          ? JSON.stringify(value)
          : (value as string | Blob)
      formData.append(prop, valueString)
      return formData
    }, new FormData())
  }
}

export class ApiReadService<
  TGetModel,
  TKey = number,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModel>
>
  extends ApiService
  implements IApiReadService<TGetModel, TKey, TReadModel, TFilters> {
  get = (id: TKey): ApiResponse<TGetModel> => this.api.get(`${id}/`)

  read = (
    payload?: ReadParams<TFilters>,
  ): ApiResponse<ReadData<TReadModel>> => {
    const { cancelToken, ...params }: ICancellable & PaginatedReadFilters = (payload
      || {}) as ReadParams<TFilters>
    params.page_size = params.page_size || DEFAULT_PAGE_SIZE
    return this.api.get('', { params, cancelToken })
  }
}

export class ApiReadWriteService<
  TGetModel,
  TKey = number,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModel>,
  TCreateModel = TGetModel,
  TUpdateModel = TGetModel
>
  extends ApiReadService<TGetModel, TKey, TReadModel, TFilters>
  implements
    IApiReadWriteService<
    TGetModel,
    TKey,
    TReadModel,
    TFilters,
    TCreateModel,
    TUpdateModel
    > {
  formProcessor = false

  create = (payload: TCreateModel): ApiResponse<TGetModel> =>
    this.api.post(
      '',
      this.formProcessor ? this.convertToFormData(payload) : payload,
    )

  update = (
    payload: UpdatePayload<TUpdateModel, TKey>,
  ): ApiResponse<TGetModel> =>
    this.api.patch(
      `${payload.id}/`,
      this.formProcessor ? this.convertToFormData(payload.data) : payload.data,
    )

  replace = (
    payload: UpdatePayload<TCreateModel, TKey>,
  ): ApiResponse<TGetModel> =>
    this.api.put(
      `${payload.id}/`,
      this.formProcessor ? this.convertToFormData(payload.data) : payload.data,
    )
}

export class ApiFullService<
  TGetModel,
  TKey = number,
  TReadModel = TGetModel,
  TFilters = Partial<TReadModel>,
  TCreateModel = TGetModel,
  TUpdateModel = TGetModel
>
  extends ApiReadWriteService<
  TGetModel,
  TKey,
  TReadModel,
  TFilters,
  TCreateModel,
  TUpdateModel
  >
  implements
    IApiFullService<
    TGetModel,
    TKey,
    TReadModel,
    TFilters,
    TCreateModel,
    TUpdateModel
    > {
  delete = (id: TKey): ApiResponse<void> => this.api.delete(`${id}/`)
}
