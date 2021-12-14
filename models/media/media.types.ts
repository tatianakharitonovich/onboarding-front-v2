export interface MediaData {
  icon?: string | null
  preview?: string | null
  source?: string | null
}

export interface IMediaModel extends MediaData {
  icon: string | null
  preview: string | null
  source: string | null
  readonly isVideo: boolean // future getter
}
