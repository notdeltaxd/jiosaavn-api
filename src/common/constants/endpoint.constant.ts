export const Endpoints = {
  search: {
    all: 'autocomplete.get',
    songs: 'search.getResults',
    albums: 'search.getAlbumResults',
    artists: 'search.getArtistResults',
    playlists: 'search.getPlaylistResults'
  },
  songs: {
    id: 'song.getDetails',
    link: 'webapi.get',
    suggestions: 'webradio.getSong',
    lyrics: 'lyrics.getLyrics',
    station: 'webradio.createEntityStation',
    newReleases: 'content.getAlbums'
  },
  trending: {
    songs: 'content.getTrending',
    albums: 'content.getTrending',
    playlists: 'content.getTrending'
  },
  albums: {
    id: 'content.getAlbumDetails',
    link: 'webapi.get',
    recommendations: 'reco.getAlbumReco'
  },
  artists: {
    id: 'artist.getArtistPageDetails',
    link: 'webapi.get',
    songs: 'artist.getArtistMoreSong',
    albums: 'artist.getArtistMoreAlbum'
  },
  playlists: {
    id: 'playlist.getDetails',
    link: 'webapi.get',
    featured: 'content.getFeaturedPlaylists'
  },
  modules: 'content.getBrowseModules'
}
