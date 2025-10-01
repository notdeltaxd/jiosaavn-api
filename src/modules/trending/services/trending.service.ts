
import { ApiContextEnum } from '#common/enums'
import { GetTrendingSongsUseCase } from '../use-cases'
import type { TrendingSongResponse } from '../models/trending.model'

export class TrendingService {
  static #getTrendingSongsUseCase = new GetTrendingSongsUseCase()

  static async getTrendingSongs(language?: string, context: ApiContextEnum = ApiContextEnum.WEB6DOT0): Promise<TrendingSongResponse[]> {
    return this.#getTrendingSongsUseCase.execute({ language, context })
  }
}