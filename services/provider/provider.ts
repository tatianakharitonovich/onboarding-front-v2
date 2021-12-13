import { Context } from '@nuxt/types'
import { Services, PostsService } from '~/services'

// eslint-disable-next-line import/no-mutable-exports
let $services: Services

export const makeServices = (ctx: Context): Services => {
  $services = {
    posts: new PostsService('posts', ctx),
  }
  return $services
}

export { $services }
