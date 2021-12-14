import { ApiReadService } from '~/services'
import { CollectionData, CollectionKey } from '~/models'

export class CollectionsService extends ApiReadService<
CollectionData,
CollectionKey
> {}
