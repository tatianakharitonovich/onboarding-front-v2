import { Module } from 'vuex-module-decorators'
import { IPostModel, PostData, PostKey, PostModel } from '~/models'
import { ApiFullModule } from '~/store'
import { $services } from '~/services'

export * from './comments'

@Module({
  name: 'posts',
  stateFactory: true,
  namespaced: true,
})
export class PostsModule extends ApiFullModule<PostData, IPostModel, PostKey> {
  get service() {
    return $services.posts
  }

  get GetModel() {
    return PostModel
  }

  get ReadModel() {
    return PostModel
  }
}
