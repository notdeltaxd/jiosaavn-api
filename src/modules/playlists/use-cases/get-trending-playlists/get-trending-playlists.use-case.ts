import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createPlaylistPayload } from '#modules/playlists/helpers'
import type { IUseCase } from '#common/types'
import type { PlaylistAPIResponseModel, PlaylistModel } from '#modules/playlists/models'
import type { z } from 'zod'

export interface GetTrendingPlaylistsArgs {
  language?: string
}

export class GetTrendingPlaylistsUseCase
  implements IUseCase<GetTrendingPlaylistsArgs, z.infer<typeof PlaylistModel>[]>
{
  constructor() {}

  async execute({ language = 'hindi' }: GetTrendingPlaylistsArgs) {
    // Step 1: fetch trending playlists (returns mini objects)
    const { data } = await useFetch<any[]>({
      endpoint: Endpoints.trending.playlists,
      params: { entity_type: 'playlist', entity_language: language }
    })

    if (!Array.isArray(data) || !data.length) return []

    // Step 2: hydrate each playlist with full details using listid
    const playlists = await Promise.all(
      data.map(async (item) => {
        const listid = item?.more_info?.listid || item?.id
        const { data: full } = await useFetch<z.infer<typeof PlaylistAPIResponseModel>>({
          endpoint: Endpoints.playlists.id,
          params: { listid }
        })
        return createPlaylistPayload(full)
      })
    )

    return playlists
  }
}
