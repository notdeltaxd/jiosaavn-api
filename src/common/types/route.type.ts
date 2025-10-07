import type { OpenAPIHono } from '@hono/zod-openapi'
import type { Hono } from 'hono'

export interface IController {
  router: Hono
  path: string
}

export interface Routes {
  controller: Hono | OpenAPIHono
  initRoutes: () => void
}
