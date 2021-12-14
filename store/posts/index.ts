import { Module } from 'vuex-module-decorators'
import { IItemModel, ItemData, ItemKey, ItemModel } from '~/models'
import { ApiReadWriteModule } from '~/store'
import { $services } from '~/services'

export * from './collections'

@Module({
  name: 'items',
  stateFactory: true,
  namespaced: true,
})
export class ItemsModule extends ApiReadWriteModule<ItemData, IItemModel, ItemKey> {
  get service() {
    return $services.items
  }

  get GetModel() {
    return ItemModel
  }

  get ReadModel() {
    return ItemModel
  }
}
