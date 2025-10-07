import {
  GetFeaturedPlaylistsUseCase,
  GetPlaylistByIdUseCase,
  GetPlaylistByLinkUseCase,
  GetTrendingPlaylistsUseCase,
  type GetPlaylistByIdArgs,
  type GetPlaylistByLinkArgs
} from '#modules/playlists/use-cases'

export class PlaylistService {
  private readonly getPlaylistByIdUseCase: GetPlaylistByIdUseCase
  private readonly getPlaylistByLinkUseCase: GetPlaylistByLinkUseCase
  private readonly getTrendingPlaylistsUseCase: GetTrendingPlaylistsUseCase
  private readonly getFeaturedPlaylistsUseCase: GetFeaturedPlaylistsUseCase

  constructor() {
    this.getPlaylistByIdUseCase = new GetPlaylistByIdUseCase()
    this.getPlaylistByLinkUseCase = new GetPlaylistByLinkUseCase()
    this.getTrendingPlaylistsUseCase = new GetTrendingPlaylistsUseCase()
    this.getFeaturedPlaylistsUseCase = new GetFeaturedPlaylistsUseCase()
  }

  getPlaylistById = (args: GetPlaylistByIdArgs) => {
    return this.getPlaylistByIdUseCase.execute(args)
  }

  getPlaylistByLink = (args: GetPlaylistByLinkArgs) => {
    return this.getPlaylistByLinkUseCase.execute(args)
  }

  getTrendingPlaylists = (language?: string) => {
    return this.getTrendingPlaylistsUseCase.execute({ language })
  }

  getFeaturedPlaylists = (args: { limit?: number; page?: number }) => {
    return this.getFeaturedPlaylistsUseCase.execute(args)
  }
}
