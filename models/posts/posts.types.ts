import { CommentData, ICommentModel } from '~/models'

export type PostKey = number

// Necessary data received from API server
export type PostData = {
  id: PostKey
  title: string
  body: string
  userId: 1
  comments?: CommentData[]
}

// Constructed model used in components
export interface IPostModel extends PostData {
  // additional and mapped fields, getters and methods
  comments: ICommentModel[]
  bodyPreview: string
}
