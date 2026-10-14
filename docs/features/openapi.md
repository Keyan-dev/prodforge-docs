# OpenAPI and Scalar

```bash
--openapi      # default (off in the minimal preset)
--no-openapi
```

Your API gets:

- **`GET /openapi.json`**: an OpenAPI 3.1 document built from your Zod schemas with `zod-openapi`
- **`GET /docs`**: an interactive reference page by [Scalar](https://scalar.com) where you can read every endpoint and send test requests

## Adding your routes

The document lives in `src/openapi/document.ts`. Each module adds its own paths, built from the same Zod schemas that validate requests, so the docs can't drift from the validation:

```ts
// src/modules/orders/orders.openapi.ts
import { CreateOrderSchema, OrderSchema } from './orders.schema';

export const ordersPaths = {
  '/orders': {
    post: {
      summary: 'Create an order',
      requestBody: { content: { 'application/json': { schema: CreateOrderSchema } } },
      responses: {
        201: { description: 'Created', content: { 'application/json': { schema: OrderSchema } } },
      },
    },
  },
};
```

Then spread `ordersPaths` into `paths` in `document.ts`. The example users module and the auth modules show complete versions.

::: info Why the paths are written by hand
Express has no route schemas to infer the document from. Writing paths next to the routes keeps all three frameworks identical, and it's still one source of truth because the schemas are shared.
:::

## Details

- The Scalar script is loaded from jsDelivr at a **pinned version**, so the page doesn't change under you. Fastify serves it from its npm package instead.
- `/docs` has its own Content-Security-Policy that allows that script; every other route keeps Helmet's strict default.
- **Why it's on by default:** once Zod is in, docs cost one route and one small package, and it's what people expect from an API.
