import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Context } from '@nuxt/types'
import { AxiosRequestConfig } from 'axios'
import { getErrorStatusGroup, processApiQuery } from '~/utils'
import { ApiResponsePayload } from '~/services'

export function extendApiInstance(api: NuxtAxiosInstance, ctx: Context) {
  api.defaults.paramsSerializer = (params) => {
    return new URLSearchParams(processApiQuery(params)).toString()
  }
  api.defaults.headers.common = {
    Accept: 'application/json',
  }

  api.interceptors.response.use(undefined, async (error) => {
    const response = error.response
    const status = response?.status

    if (!status || getErrorStatusGroup(status) === '500') {
      /* Global error. Show toast or something */
    }

    // extract useful data
    return {
      error: response?.data,
      status,
    } as ApiResponsePayload
  })

  api.onRequest(async (config): Promise<AxiosRequestConfig> => {
    config.headers.common = {
      ...config.headers.common,
      'Accept-Language': ctx.i18n.locale,
    }
    return config
  })
}
