import { Context } from '@nuxt/types'
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { Modules, PostsModule, CommentsModule } from '~/store'

export const makeStore = (ctx: Context): Modules => {
  ctx.store = new Store({})
  ctx.store.registerModule('posts', PostsModule)
  ctx.store.registerModule('posts/comments', CommentsModule)

  return {
    posts: getModule(PostsModule, ctx.store),
    comments: getModule(CommentsModule, ctx.store),
  }
}
