import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import type { IUseCase } from '#common/types'
import type { SongAPIResponseModel, SongModel } from '#modules/songs/models'
import type { z } from 'zod'

export interface GetTrendingSongsArgs {
  language?: string
}

export class GetTrendingSongsUseCase implements IUseCase<GetTrendingSongsArgs, z.infer<typeof SongModel>[]> {
  constructor() {}

  async execute({ language = 'hindi' }: GetTrendingSongsArgs) {
    const { data } = await useFetch<z.infer<typeof SongAPIResponseModel>[]>({
      endpoint: Endpoints.trending.songs,
      params: {
        entity_type: 'song',
        entity_language: language
      }
    })

    if (!Array.isArray(data) || !data.length) return []

    return data.map((song) => createSongPayload(song))
  }
}
