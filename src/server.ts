import { AlbumController, ArtistController, SearchController, SongController, TrendingController } from '#modules/index'
import { PlaylistController } from '#modules/playlists/controllers'
import { App } from './app'

const app = new App([
  new SearchController(),
  new SongController(),
  new AlbumController(),
  new ArtistController(),
  new PlaylistController(),
  new TrendingController()
]).getApp()

export default app
