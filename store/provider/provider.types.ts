import { CommentsModule, PostsModule } from '~/store'

export type Modules = {
  posts: PostsModule
  comments: CommentsModule
}
