import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import {
  DEFAULT_PAGE_SIZE,
  IApiFullService,
  IApiReadService,
  IApiReadWriteService,
  ReadData,
  ReadParams,
  ApiResponse,
  UpdatePayload,
  extendApiInstance,
  RetrievePayload,
  ReadPayload,
  EndpointKeys,
  CreatePayload,
  IApiService,
} from '~/services'

export class ApiService implements IApiService {
  protected api: NuxtAxiosInstance
  baseURL: string

  constructor(protected app: string, ctx: Context, root?: string) {
    const baseURL = root || ctx.$axios.defaults.baseURL
    this.api = ctx.$axios.create({
      baseURL,
    })
    this.baseURL = `${baseURL}${app}/`
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
      const isObject = value instanceof Object && !(value instanceof File)
      const isSimpleArray = Array.isArray(value) && value.every((i: any) => ['string', 'number'].includes(typeof i))
      const valueString: string | Blob
        = isObject && !isSimpleArray
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
  endpoint({ id, parentId }: EndpointKeys<TKey> = {}): string {
    return `${parentId ? `${parentId}/` : ''}${this.app}/${id ? `${id}/` : ''}`
  }

  get = (payload: RetrievePayload<TKey>): ApiResponse<TGetModel> =>
    this.api.get(this.endpoint(payload))

  read = (
    payload?: ReadPayload<TFilters>,
  ): ApiResponse<ReadData<TReadModel>> => {
    const { cancelToken, ...params }: ReadParams = (payload?.params || {}) as ReadParams<TFilters>
    params.page_size = params.page_size || DEFAULT_PAGE_SIZE
    return this.api.get(this.endpoint(payload), { params, cancelToken })
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

  create = (payload: CreatePayload<TCreateModel>): ApiResponse<TGetModel> =>
    this.api.post(
      this.endpoint(payload),
      this.formProcessor ? this.convertToFormData(payload) : payload,
    )

  update = (
    payload: UpdatePayload<TUpdateModel, TKey>,
  ): ApiResponse<TGetModel> =>
    this.api.patch(
      this.endpoint(payload),
      this.formProcessor ? this.convertToFormData(payload.data) : payload.data,
    )

  replace = (
    payload: UpdatePayload<TCreateModel, TKey>,
  ): ApiResponse<TGetModel> =>
    this.api.put(
      this.endpoint(payload),
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
  delete = (payload: RetrievePayload<TKey>): ApiResponse<void> => this.api.delete(this.endpoint(payload))
}
