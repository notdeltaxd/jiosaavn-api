import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiContextEnum } from '#common/enums'
import { TrendingController } from './trending.controller'
import { TrendingService } from '../services/trending.service'
import type { TrendingSongResponse } from '../models/trending.model'

describe('TrendingController', () => {
  let trendingController: TrendingController
  let trendingService: TrendingService

  beforeEach(() => {
    trendingController = new TrendingController()
    trendingService = new TrendingService()
    trendingController.initRoutes()
  })

  describe('/trending endpoint', () => {
    it('should return trending songs successfully', async () => {
      const mockSongs: TrendingSongResponse[] = [{
        id: 'test_id',
        title: 'Test Song',
        subtitle: 'Test Artist',
        header_desc: '',
        type: 'song',
        perma_url: 'https://test.com/song',
        image: 'https://test.com/image.jpg',
        language: 'hindi',
        year: '2024',
        play_count: '1000',
        explicit_content: '0',
        list_count: '0',
        list_type: '',
        list: '',
        more_info: {
          music: 'Test Music',
          album_id: 'test_album',
          album: 'Test Album',
          label: 'Test Label',
          origin: 'none',
          is_dolby_content: false,
          '320kbps': 'true',
          encrypted_media_url: 'test_url',
          encrypted_cache_url: '',
          album_url: 'test_album_url',
          duration: '180',
          rights: {
            code: '0',
            cacheable: 'true',
            delete_cached_object: 'false',
            reason: ''
          },
          cache_state: 'false',
          has_lyrics: 'false',
          lyrics_snippet: '',
          starred: 'false',
          copyright_text: 'Test Copyright',
          artistMap: {
            primary_artists: [],
            featured_artists: [],
            artists: []
          },
          release_date: '2024-01-01'
        }
      }]

      vi.spyOn(TrendingService.prototype, 'getTrendingSongs').mockResolvedValue(mockSongs)

      const response = await trendingController.controller.request('/trending')
      const result = await response.json()

      expect(result.success).toBe(true)
      expect(result.message).toBe('Trending songs fetched successfully')
      expect(result.data).toEqual(mockSongs)
    })

    it('should handle errors gracefully', async () => {
      const errorMessage = 'Network error'
      vi.spyOn(TrendingService.prototype, 'getTrendingSongs').mockRejectedValue(new Error(errorMessage))

      const response = await trendingController.controller.request('/trending')
      const result = await response.json()

      expect(result.success).toBe(false)
      expect(result.message).toBe(errorMessage)
      expect(result.data).toEqual([])
    })

    it('should use default language and context if not provided', async () => {
      vi.spyOn(TrendingService.prototype, 'getTrendingSongs').mockResolvedValue([])

      await trendingController.controller.request('/trending')

      expect(TrendingService.prototype.getTrendingSongs).toHaveBeenCalledWith(undefined, ApiContextEnum.WEB6DOT0)
    })

    it('should accept language and context parameters', async () => {
      vi.spyOn(TrendingService.prototype, 'getTrendingSongs').mockResolvedValue([])

      await trendingController.controller.request('/trending?language=hindi&context=android')

      expect(TrendingService.prototype.getTrendingSongs).toHaveBeenCalledWith('hindi', ApiContextEnum.ANDROID)
    })
  })
})