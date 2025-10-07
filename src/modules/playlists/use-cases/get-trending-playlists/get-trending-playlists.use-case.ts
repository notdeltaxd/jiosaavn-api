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
    const { data } = await useFetch<z.infer<typeof PlaylistAPIResponseModel>[]>({
      endpoint: Endpoints.trending.playlists,
      params: {
        entity_type: 'playlist',
        entity_language: language
      }
    })

    if (!Array.isArray(data) || !data.length) return []

    return data.map((playlist) => createPlaylistPayload(playlist))
  }
}
