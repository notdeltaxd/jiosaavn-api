import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import type { IUseCase } from '#common/types'
import type { SongAPIResponseModel, SongModel } from '#modules/songs/models'
import type { z } from 'zod'

interface NewReleasesResponse {
  data: z.infer<typeof SongAPIResponseModel>[]
  count: number
  last_page: boolean
}

export interface GetNewReleasesArgs {
  limit?: number
  page?: number
}

export class GetNewReleasesUseCase implements IUseCase<GetNewReleasesArgs, z.infer<typeof SongModel>[]> {
  constructor() {}

  async execute({ limit = 50, page = 1 }: GetNewReleasesArgs) {
    const { data } = await useFetch<NewReleasesResponse>({
      endpoint: Endpoints.songs.newReleases,
      params: { n: limit, p: page }
    })

    if (!data?.data?.length) return []

    return data.data.map((song) => createSongPayload(song))
  }
}
