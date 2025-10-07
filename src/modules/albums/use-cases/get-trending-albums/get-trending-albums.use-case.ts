import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createAlbumPayload } from '#modules/albums/helpers'
import type { IUseCase } from '#common/types'
import type { AlbumAPIResponseModel, AlbumModel } from '#modules/albums/models'
import type { z } from 'zod'

export interface GetTrendingAlbumsArgs {
  language?: string
}

export class GetTrendingAlbumsUseCase implements IUseCase<GetTrendingAlbumsArgs, z.infer<typeof AlbumModel>[]> {
  constructor() {}

  async execute({ language = 'hindi' }: GetTrendingAlbumsArgs) {
    const { data } = await useFetch<z.infer<typeof AlbumAPIResponseModel>[]>({
      endpoint: Endpoints.trending.albums,
      params: {
        entity_type: 'album',
        entity_language: language
      }
    })

    if (!Array.isArray(data) || !data.length) return []

    return data.map((album) => createAlbumPayload(album))
  }
}
