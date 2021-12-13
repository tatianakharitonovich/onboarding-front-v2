import { Context } from '@nuxt/types'
import { ApiFullService, CommentsService } from '~/services'
import { PostData, PostKey } from '~/models'

export * from './comments'

export class PostsService extends ApiFullService<
PostData,
PostKey
> {
  comments: CommentsService

  constructor(protected endpoint: string, ctx: Context) {
    super(endpoint, ctx)
    this.comments = new CommentsService(`${endpoint}/comments`, ctx)
  }
}
