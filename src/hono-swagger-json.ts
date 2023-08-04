import { MiddlewareHandler } from 'hono'
import SwaggerJsdoc, { Options as SwaggerJsdocOptions } from 'swagger-jsdoc'

export function honoSwaggerJsdoc(
  options: SwaggerJsdocOptions
): MiddlewareHandler {
  const spec = SwaggerJsdoc(options)

  return (c) => {
    c.header('Content-Type', 'application/json')
    return c.json(spec, 200)
  }
}
