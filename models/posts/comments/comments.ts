import { CommentData, ICommentModel, CommentKey, PostKey } from '~/models'

export class CommentModel implements ICommentModel {
  id: CommentKey
  postId: PostKey
  name: string
  email: string
  body: string

  constructor(data: CommentData) {
    this.id = data.id
    this.postId = data.postId
    this.name = data.name
    this.email = data.email
    this.body = data.body
  }
}
