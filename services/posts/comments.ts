import { ApiReadWriteService } from '~/services'
import { CommentData, CommentKey } from '~/models'

export class CommentsService extends ApiReadWriteService<
CommentData,
CommentKey
> {}
