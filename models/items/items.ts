import { ItemKey, IMediaModel, ICollectionModel, CollectionModel, ItemData, MediaModel, IItemModel } from '~/models'

export const POST_PREVIEW_MAX_LENGTH = 128

export class ItemModel implements IItemModel {
  id: ItemKey
  title: string
  description?: string
  collections: ICollectionModel[]
  file: IMediaModel

  constructor(data: ItemData) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.collections = data.collections?.map(collection => new CollectionModel(collection)) || []
    this.file = new MediaModel(data.file)
  }
}
