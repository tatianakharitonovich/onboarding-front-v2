import { Module } from 'vuex-module-decorators'
import { ApiReadModule } from '~/store'
import { CollectionData, CollectionKey, CollectionModel, ICollectionModel } from '~/models'
import { $services } from '~/services'

@Module({
  name: 'items/collections',
  stateFactory: true,
  namespaced: true,
})
export class CollectionsModule extends ApiReadModule<CollectionData, ICollectionModel, CollectionKey> {
  get service() {
    return $services.items.collections
  }

  get GetModel() {
    return CollectionModel
  }

  get ReadModel() {
    return CollectionModel
  }
}
