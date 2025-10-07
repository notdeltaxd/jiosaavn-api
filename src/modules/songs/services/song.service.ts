import { CreateSongStationUseCase } from '#modules/songs/use-cases/create-song-station'
import { GetNewReleasesUseCase } from '#modules/songs/use-cases/get-new-releases'
import { GetSongByIdUseCase, type GetSongByIdArgs } from '#modules/songs/use-cases/get-song-by-id'
import { GetSongByLinkUseCase } from '#modules/songs/use-cases/get-song-by-link'
import { GetSongSuggestionsUseCase, type GetSongSuggestionsArgs } from '#modules/songs/use-cases/get-song-suggestions'
import { GetTrendingSongsUseCase } from '#modules/songs/use-cases/get-trending-songs'

export class SongService {
  private readonly getSongByIdUseCase: GetSongByIdUseCase
  private readonly getSongByLinkUseCase: GetSongByLinkUseCase
  private readonly createSongStationUseCase: CreateSongStationUseCase
  private readonly getSongSuggestionsUseCase: GetSongSuggestionsUseCase
  private readonly getTrendingSongsUseCase: GetTrendingSongsUseCase
  private readonly getNewReleasesUseCase: GetNewReleasesUseCase

  constructor() {
    this.getSongByIdUseCase = new GetSongByIdUseCase()
    this.getSongByLinkUseCase = new GetSongByLinkUseCase()
    this.createSongStationUseCase = new CreateSongStationUseCase()
    this.getSongSuggestionsUseCase = new GetSongSuggestionsUseCase()
    this.getTrendingSongsUseCase = new GetTrendingSongsUseCase()
    this.getNewReleasesUseCase = new GetNewReleasesUseCase()
  }

  getSongByIds = (args: GetSongByIdArgs) => {
    return this.getSongByIdUseCase.execute(args)
  }

  getSongByLink = (token: string) => {
    return this.getSongByLinkUseCase.execute(token)
  }

  createSongStation = (songIds: string) => {
    return this.createSongStationUseCase.execute(songIds)
  }

  getSongSuggestions = (args: GetSongSuggestionsArgs) => {
    return this.getSongSuggestionsUseCase.execute(args)
  }

  getTrendingSongs = (language?: string) => {
    return this.getTrendingSongsUseCase.execute({ language })
  }

  getNewReleases = (args: { limit?: number; page?: number }) => {
    return this.getNewReleasesUseCase.execute(args)
  }
}
