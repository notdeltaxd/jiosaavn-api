import { ApiContextEnum } from '#common/enums'
import { TrendingService } from '../services/trending.service'
import type { TrendingSongResponse } from '../models/trending.model'

export class TrendingController {
  static async getTrendingSongs(context: ApiContextEnum = ApiContextEnum.WEB6DOT0, language?: string) {
    try {
      const songs = await TrendingService.getTrendingSongs(language, context)
      
      return {
        status: true,
        message: 'Trending songs fetched successfully',
        data: songs
      } as {
        status: boolean
        message: string
        data: TrendingSongResponse[]
      }
    } catch (error) {
      return {
        status: false,
        message: error instanceof Error ? error.message : 'Failed to fetch trending songs',
        data: []
      } as {
        status: boolean
        message: string
        data: TrendingSongResponse[]
      }
    }
  }
}