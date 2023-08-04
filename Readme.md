# hono-swagger-jsdoc

hono-swagger-jsdoc is a Swagger generator for Hono. It exposes two functions that act as middleware for your Hono application:

    honoSwaggerJsdoc
    honoSwaggerUI

## honoSwaggerJsdoc

This middleware generates and returns the swagger.json file. It is a wrapper around swagger-jsdoc, and accepts the same options.

```javascript
import { Hono } from 'hono';
import { honoSwaggerJsdoc } from 'hono-swagger-jsdoc';

const app = new Hono();

app.get(
  '/swagger.json',
  honoSwaggerJsdoc({
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'INS API v1',
        version: '1.0.0',
      },
    },
    apis: ['./src/api/routes/v1/**/*.ts', './src/api/routes/v1/**/*.yaml'],
  })
);
```

The input to honoSwaggerJsdoc is the options for swagger-jsdoc. You can learn more about these options here.

## honoSwaggerUI

This middleware returns the HTML for the Swagger UI. It requires the locations of all the Swagger specification files, which can be generated and served by the honoSwaggerJsdoc middleware.

```javascript
import { Hono } from 'hono';
import { honoSwaggerUI } from 'hono-swagger-jsdoc';

const app = new Hono();

app.get(
  '/api-docs',
  honoSwaggerUI({    
    urls: [{ url: '/v1/swagger.json', name: 'v1' }],
  })
)
```
## FAQ

Why are the two middleware separate? Should we just use a single middleware to generate both the spec and the UI?

The two middleware are kept separate to allow for the setup of multiple Swagger JSON files. For instance, if you have multiple versions of your API available (e.g., /api/v1, /api/v2), coding them into a single middleware would be more difficult.