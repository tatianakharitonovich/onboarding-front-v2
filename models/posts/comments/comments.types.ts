import { PostKey } from '~/models'

export type CommentKey = number

export type CommentData = {
  id: CommentKey
  postId: PostKey
  name: string
  email: string
  body: string
}

export interface ICommentModel extends CommentData {}
