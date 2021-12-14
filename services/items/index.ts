import { Context } from '@nuxt/types'
import { ApiReadWriteService, CollectionsService } from '~/services'
import { ItemData, ItemKey } from '~/models'

export * from './collections'

export class ItemsService extends ApiReadWriteService<
ItemData,
ItemKey
> {
  collections: CollectionsService

  constructor(protected app: string, ctx: Context, root?: string) {
    super(app, ctx, root)
    this.collections = new CollectionsService('collection', ctx, this.baseURL)
  }
}
