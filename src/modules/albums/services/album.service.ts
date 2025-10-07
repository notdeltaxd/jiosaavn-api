import { GetAlbumByIdUseCase } from '#modules/albums/use-cases/get-album-by-id'
import { GetAlbumByLinkUseCase } from '#modules/albums/use-cases/get-album-by-link'
import { GetAlbumRecommendationsUseCase } from '#modules/albums/use-cases/get-album-recommendations'
import { GetTrendingAlbumsUseCase } from '#modules/albums/use-cases/get-trending-albums'

export class AlbumService {
  private readonly getAlbumByIdUseCase: GetAlbumByIdUseCase
  private readonly getAlbumByLinkUseCase: GetAlbumByLinkUseCase
  private readonly getTrendingAlbumsUseCase: GetTrendingAlbumsUseCase
  private readonly getAlbumRecommendationsUseCase: GetAlbumRecommendationsUseCase

  constructor() {
    this.getAlbumByIdUseCase = new GetAlbumByIdUseCase()
    this.getAlbumByLinkUseCase = new GetAlbumByLinkUseCase()
    this.getTrendingAlbumsUseCase = new GetTrendingAlbumsUseCase()
    this.getAlbumRecommendationsUseCase = new GetAlbumRecommendationsUseCase()
  }

  getAlbumById = (albumId: string) => {
    return this.getAlbumByIdUseCase.execute(albumId)
  }

  getAlbumByLink = (albumLink: string) => {
    return this.getAlbumByLinkUseCase.execute(albumLink)
  }

  getTrendingAlbums = (language?: string) => {
    return this.getTrendingAlbumsUseCase.execute({ language })
  }

  getAlbumRecommendations = (albumId: string) => {
    return this.getAlbumRecommendationsUseCase.execute({ albumId })
  }
}
