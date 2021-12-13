import { Context } from '@nuxt/types'
import { PostsService } from '..'
import { Services } from '.'

let $services: Services

export const makeServices = (ctx: Context): Services => {
  $services = {
    posts: new PostsService('posts', ctx),
  }
  return $services
}
