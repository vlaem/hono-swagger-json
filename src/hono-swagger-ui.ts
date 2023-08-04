import { MiddlewareHandler } from 'hono'
import { html, raw } from 'hono/html'

interface HonoSwaggerUiOptions {
  route: string
  urls: { url: string; name: string }[]
}

interface PageProps {
  version: string
  urls: { url: string; name: string }[]
}

const generateSwaggerPage = (props: PageProps) =>
  html`<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="UTF-8" />
        <title>Swagger</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/normalize.css@7.0.0/normalize.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/swagger-ui-dist@${props.version}/swagger-ui.css"
        />
        <script src="https://unpkg.com/swagger-ui-dist@${props.version}/swagger-ui-standalone-preset.js"></script>
        <script src="https://unpkg.com/swagger-ui-dist@${props.version}/swagger-ui-bundle.js"></script>
        <script>
          window.onload = function () {
            const ui = SwaggerUIBundle({
              urls: ${raw(JSON.stringify(props.urls))},
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset,
              ],
              plugins: [SwaggerUIBundle.plugins.DownloadUrl],
              layout: 'StandaloneLayout',
            })
            window.ui = ui
          }
        </script>
      </head>
      <body>
        <div id="swagger-ui"></div>
      </body>
    </html>`

export function honoSwaggerUI(
  options: HonoSwaggerUiOptions
): MiddlewareHandler {
  const version = '5.2.0'
  const urls = options.urls

  const apiDocsHtml = generateSwaggerPage({ version, urls })

  return async (c) => {
    return c.html(apiDocsHtml)
  }
}
