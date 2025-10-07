import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createPlaylistPayload } from '#modules/playlists/helpers'
import type { IUseCase } from '#common/types'
import type { PlaylistAPIResponseModel, PlaylistModel } from '#modules/playlists/models'
import type { z } from 'zod'

interface FeaturedPlaylistsResponseItem {
  id: string
  title: string
  subtitle: string
  type: string
  image: string
  perma_url: string
  more_info: { song_count: string; firstname: string; follower_count: string; last_updated: string; uid: string }
  explicit_content: string
  mini_obj: boolean
}

interface FeaturedPlaylistsResponse {
  data: FeaturedPlaylistsResponseItem[]
  count: number
  last_page: boolean
}

export interface GetFeaturedPlaylistsArgs {
  limit?: number
  page?: number
}

export class GetFeaturedPlaylistsUseCase
  implements IUseCase<GetFeaturedPlaylistsArgs, z.infer<typeof PlaylistModel>[]>
{
  constructor() {}

  async execute({ limit = 50, page = 1 }: GetFeaturedPlaylistsArgs) {
    const { data } = await useFetch<FeaturedPlaylistsResponse>({
      endpoint: Endpoints.playlists.featured,
      params: { n: limit, p: page, fetch_from_serialized_files: 'true' }
    })

    if (!data?.data?.length) return []

    const playlists = await Promise.all(
      data.data.map(async (item) => {
        const { data: full } = await useFetch<z.infer<typeof PlaylistAPIResponseModel>>({
          endpoint: Endpoints.playlists.id,
          params: { listid: item.id }
        })
        return createPlaylistPayload(full)
      })
    )

    return playlists
  }
}
