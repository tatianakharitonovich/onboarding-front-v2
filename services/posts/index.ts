import { Context } from '@nuxt/types'
import { ApiFullService, CommentsService } from '~/services'
import { PostData, PostKey } from '~/models'

export * from './comments'

export class PostsService extends ApiFullService<
PostData,
PostKey
> {
  comments: CommentsService

  constructor(protected app: string, ctx: Context, root?: string) {
    super(app, ctx, root)
    this.comments = new CommentsService('comments', ctx, this.baseURL)
  }
}
