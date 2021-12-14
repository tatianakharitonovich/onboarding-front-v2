import { CollectionData, ICollectionModel, IMediaModel, MediaData } from '~/models'

export type ItemKey = string

// Necessary data received from API server
export type ItemData = {
  id: ItemKey
  title: string
  description?: string
  collections?: CollectionData[]
  file?: MediaData
}

// Constructed model used in components
export interface IItemModel extends ItemData {
  // additional and mapped fields, getters and methods
  collections: ICollectionModel[]
  file: IMediaModel
}
