import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { ApiContextEnum } from '#common/enums'
import { TrendingService } from '../services/trending.service'
import type { TrendingSongResponse } from '../models/trending.model'
import type { Routes } from '#common/types'

export class TrendingController implements Routes {
  public controller: OpenAPIHono
  private trendingService: TrendingService

  constructor() {
    this.controller = new OpenAPIHono()
    this.trendingService = new TrendingService()
  }

  public initRoutes() {
    this.controller.openapi(
      createRoute({
        method: 'get',
        path: '/trending',
        tags: ['Trending'],
        summary: 'Get trending songs',
        description: 'Retrieve trending songs from JioSaavn platform.',
        operationId: 'getTrendingSongs',
        request: {
          query: z.object({
            context: z.nativeEnum(ApiContextEnum).optional().default(ApiContextEnum.WEB6DOT0).openapi({
              title: 'API Context',
              description: 'The API context to use for the request',
              type: 'string',
              enum: Object.values(ApiContextEnum),
              example: ApiContextEnum.WEB6DOT0
            }),
            language: z.string().optional().openapi({
              title: 'Language',
              description: 'Filter trending songs by language',
              type: 'string',
              example: 'hindi'
            })
          })
        },
        responses: {
          200: {
            description: 'Successfully retrieved trending songs',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates if the request was successful',
                    type: 'boolean',
                    example: true
                  }),
                  message: z.string().openapi({
                    description: 'Status message',
                    type: 'string',
                    example: 'Trending songs fetched successfully'
                  }),
                  data: z.array(z.unknown()).openapi({
                    description: 'Array of trending songs',
                    type: 'array',
                    items: {
                      type: 'object'
                    }
                  })
                })
              }
            }
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: z.object({
                  success: z.boolean().openapi({
                    description: 'Indicates request failed',
                    type: 'boolean',
                    example: false
                  }),
                  message: z.string().openapi({
                    description: 'Error message',
                    type: 'string',
                    example: 'Failed to fetch trending songs'
                  }),
                  data: z.array(z.never()).openapi({
                    description: 'Empty array in case of error',
                    type: 'array',
                    items: {
                      type: 'object'
                    }
                  })
                })
              }
            }
          }
        }
      }),
      async (c) => {
        try {
          const { context = ApiContextEnum.WEB6DOT0, language } = c.req.query()
          const songs = await this.trendingService.getTrendingSongs(language, context)
          
          return c.json({
            success: true,
            message: 'Trending songs fetched successfully',
            data: songs
          })
        } catch (error) {
          return c.json({
            success: false,
            message: error instanceof Error ? error.message : 'Failed to fetch trending songs',
            data: []
          })
        }
      }
    )
  }
}