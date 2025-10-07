import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createAlbumPayload } from '#modules/albums/helpers'
import type { IUseCase } from '#common/types'
import type { AlbumAPIResponseModel, AlbumModel } from '#modules/albums/models'
import type { z } from 'zod'

interface AlbumRecoItem {
  id: string
  title: string
  image: string
  perma_url: string
  type: string
}

export interface GetAlbumRecommendationsArgs {
  albumId: string
}

export class GetAlbumRecommendationsUseCase
  implements IUseCase<GetAlbumRecommendationsArgs, z.infer<typeof AlbumModel>[]>
{
  constructor() {}

  async execute({ albumId }: GetAlbumRecommendationsArgs) {
    const { data } = await useFetch<AlbumRecoItem[]>({
      endpoint: Endpoints.albums.recommendations,
      params: { albumid: albumId }
    })

    if (!Array.isArray(data) || data.length === 0) return []

    // Fetch full details for each recommended album to match AlbumModel
    const detailedAlbums = await Promise.all(
      data.map(async (item) => {
        const { data: album } = await useFetch<z.infer<typeof AlbumAPIResponseModel>>({
          endpoint: Endpoints.albums.id,
          params: { albumid: item.id }
        })
        return createAlbumPayload(album)
      })
    )

    return detailedAlbums
  }
}
