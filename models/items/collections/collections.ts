import { CollectionKey, ICollectionModel, IMediaModel, CollectionData, MediaModel } from '~/models'

export class CollectionModel implements ICollectionModel {
  id: CollectionKey
  title: string
  description?: string
  avatar: IMediaModel
  cover: IMediaModel

  constructor(data: CollectionData) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.avatar = new MediaModel(data.avatar)
    this.cover = new MediaModel(data.cover)
  }
}
