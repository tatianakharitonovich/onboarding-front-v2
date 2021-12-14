import { IMediaModel, MediaData } from '~/models'

export type CollectionKey = number

export type CollectionData = {
  id: CollectionKey
  title: string
  description?: string
  avatar: MediaData
  cover?: MediaData
}

export interface ICollectionModel extends CollectionData {
  avatar: IMediaModel
  cover: IMediaModel
}
