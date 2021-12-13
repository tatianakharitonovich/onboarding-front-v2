import { PostKey } from '~/models'

export type CommentKey = string

export type CommentData = {
  id: CommentKey
  postId: PostKey
  name: string
  email: string
  body: string
}

export interface ICommentModel extends CommentData {}
