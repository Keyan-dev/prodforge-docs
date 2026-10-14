# Frameworks

```bash
--framework express   # default
--framework fastify
--framework hono
```

All three give you the **same project shape**: an `app.ts` with a `createApp()` factory, a `server.ts` that listens and shuts down gracefully, the same error body, request ids, `/health` and `/ready`, and the same env variables. Database, auth, OpenAPI and the example module work with any of them unchanged.

## Express 5 (default)

- **Why it's the default:** it's the framework most Node developers already know, and v5 finally handles errors thrown from `async` handlers without extra wrappers.
- **Packages:** `express`, `helmet`, `cors`, `express-rate-limit`, `pino-http` (request logs), `@scalar/express-api-reference` (docs page).
- **Tests:** Supertest calls the app returned by `createApp()` without opening a port.

## Fastify 5

- **Pick it when** you want more throughput and a plugin system with built-in schemas and logging.
- **Packages:** `fastify`, `@fastify/helmet`, `@fastify/cors`, `@fastify/rate-limit` (the Fastify versions of the Express middleware). Fastify uses Pino as its own logger, so there's no `pino-http`.
- **Tests:** Fastify's `app.inject()`, no network or Supertest needed.

## Hono

- **Pick it when** you want a small, Web-standards API (`Request`/`Response`) that you could later move to other runtimes.
- **Runs on Node** through `@hono/node-server`. Uses Hono's built-in request id, secure headers, CORS and body-limit middleware, plus `hono-rate-limiter`.
- **Tests:** `app.request()`, which needs no server.

## Comparison

| | Express | Fastify | Hono |
|---|---|---|---|
| Familiarity | highest | medium | growing |
| Speed | good | fastest of the three on Node | very good |
| Request logs | pino-http | built-in (Pino) | a small Pino middleware (`src/middleware/request-logger.ts`) |
| Test helper | Supertest | `app.inject()` | `app.request()` |
| Docs page package | `@scalar/express-api-reference` | `@scalar/fastify-api-reference` | `@scalar/hono-api-reference` |

::: info Rate limits are per process
All three use an in-memory rate-limit store. With several processes (PM2 cluster, replicas) each one counts separately.
:::
