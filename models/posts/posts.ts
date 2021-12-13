import { IPostModel, PostKey, PostData, ICommentModel, CommentModel } from '~/models'

export const POST_PREVIEW_MAX_LENGTH = 128

export class PostModel implements IPostModel {
  id: PostKey
  title: string
  body: string
  userId: 1
  comments: ICommentModel[]

  constructor(data: PostData) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.userId = data.userId
    this.comments = data.comments?.map(comment => new CommentModel(comment)) || []
  }

  get bodyPreview(): string {
    return this.body.length < POST_PREVIEW_MAX_LENGTH
      ? this.body
      : `${this.body.slice(0, POST_PREVIEW_MAX_LENGTH - 3)}...`
  }
}
