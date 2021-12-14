import { Context } from '@nuxt/types'
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { Modules, ItemsModule, CollectionsModule } from '~/store'

export const makeStore = (ctx: Context): Modules => {
  ctx.store = new Store({})
  ctx.store.registerModule('items', ItemsModule)
  ctx.store.registerModule('items/collections', CollectionsModule)

  return {
    items: getModule(ItemsModule, ctx.store),
    collections: getModule(CollectionsModule, ctx.store),
  }
}
