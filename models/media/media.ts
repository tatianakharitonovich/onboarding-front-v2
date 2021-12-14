import {
  IMediaModel,
  MediaData,
} from '~/models'
import { extractExtension } from '~/utils'

export class MediaModel implements IMediaModel {
  icon: string | null
  preview: string | null
  source: string | null

  protected availableVideoExtensions = ['mp4', 'webm']

  protected hasVideoExtension(title: string): boolean {
    return this.availableVideoExtensions.some(
      x => x.toLowerCase() === extractExtension(title),
    )
  }

  constructor(data?: MediaData) {
    this.icon = data?.icon || null
    this.preview = data?.preview || null
    this.source = data?.source || null
  }

  get isVideo(): boolean {
    return !!this.source && this.hasVideoExtension(this.source)
  }
}
