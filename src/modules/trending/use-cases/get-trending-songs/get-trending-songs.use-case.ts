import { ApiContextEnum } from '#common/enums'
import { useFetch } from '#common/helpers'
import { Endpoints } from '#common/constants'
import { HTTPException } from 'hono/http-exception'
import type { IUseCase } from '#common/types'
import type { TrendingSongResponse } from '../../models/trending.model'

export interface GetTrendingSongsArgs {
  language?: string
  context?: ApiContextEnum
}

export class GetTrendingSongsUseCase implements IUseCase<GetTrendingSongsArgs, TrendingSongResponse[]> {
  constructor() {}

  async execute({ language = 'hindi', context = ApiContextEnum.WEB6DOT0 }: GetTrendingSongsArgs) {
    try {
      const { data } = await useFetch<TrendingSongResponse[]>({
        endpoint: Endpoints.trending,
        params: {
          __call: 'content.getTrending',
          api_version: '4',
          _format: 'json',
          _marker: '0',
          ctx: context,
          entity_type: 'song',
          entity_language: language
        }
      })

      if (!Array.isArray(data)) {
        throw new HTTPException(500, { message: 'Invalid response format from API' })
      }

      return data
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error
      }
      throw new HTTPException(500, { message: error instanceof Error ? error.message : 'Failed to fetch trending songs' })
    }
  }
}