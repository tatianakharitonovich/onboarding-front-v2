import { Module } from 'vuex-module-decorators'
import { ApiReadWriteModule } from '~/store'
import { CommentData, CommentKey, CommentModel, ICommentModel } from '~/models'
import { $services } from '~/services'

@Module({
  name: 'posts/comments',
  stateFactory: true,
  namespaced: true,
})
export class CommentsModule extends ApiReadWriteModule<CommentData, ICommentModel, CommentKey> {
  get service() {
    return $services.posts.comments
  }

  get GetModel() {
    return CommentModel
  }

  get ReadModel() {
    return CommentModel
  }
}
