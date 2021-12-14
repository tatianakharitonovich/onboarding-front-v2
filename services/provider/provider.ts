import { Context } from '@nuxt/types'
import { Services, ItemsService } from '~/services'

// eslint-disable-next-line import/no-mutable-exports
let $services: Services

export const makeServices = (ctx: Context): Services => {
  $services = {
    items: new ItemsService('artwork', ctx),
  }
  return $services
}

export { $services }
