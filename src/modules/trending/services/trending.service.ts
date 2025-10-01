
import { ApiContextEnum } from '#common/enums'
import { GetTrendingSongsUseCase } from '../use-cases'
import type { TrendingSongResponse } from '../models/trending.model'

export class TrendingService {
  private getTrendingSongsUseCase = new GetTrendingSongsUseCase()

  async getTrendingSongs(language?: string, context: ApiContextEnum = ApiContextEnum.WEB6DOT0): Promise<TrendingSongResponse[]> {
    return this.getTrendingSongsUseCase.execute({ language, context })
  }
}