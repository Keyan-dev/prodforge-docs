# Environment variables

Each project's `.env.example` lists only the variables its features use. All are validated at startup in `src/config/env.ts` ([Config](/features/config)).

## Always

| Variable | Default | |
|---|---|---|
| `NODE_ENV` | `development` | `development`, `test` or `production` |
| `PORT` | `3000` | port the HTTP server listens on |
| `LOG_LEVEL` | `debug` in `.env.example` | `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent` |
| `SHUTDOWN_TIMEOUT_MS` | `10000` | how long to wait for open requests on shutdown |
| `CORS_ORIGIN` | `*` | allowed origins, comma-separated, or `*` |
| `RATE_LIMIT_PER_MINUTE` | `100` | requests per minute per client IP |
| `BODY_LIMIT_KB` | `100` | largest accepted request body, in kilobytes |

## Database

| Variable | Default | |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/app` (Postgres) or `mongodb://localhost:27017/app` (MongoDB) | connection string |

## Redis and BullMQ

| Variable | Default | |
|---|---|---|
| `REDIS_URL` | `redis://localhost:6379` | Redis connection string |
| `WORKER_CONCURRENCY` | `5` | jobs each worker process runs at once (BullMQ) |

## JWT auth

| Variable | Default | |
|---|---|---|
| `JWT_SECRET` | placeholder | at least 32 characters |
| `JWT_ACCESS_TTL` | `15m` | access token lifetime |
| `JWT_REFRESH_TTL` | `7d` | refresh token lifetime |

## Better Auth

| Variable | Default | |
|---|---|---|
| `BETTER_AUTH_SECRET` | placeholder | at least 32 characters |
| `BETTER_AUTH_URL` | `http://localhost:3000` | public base URL of the API |

## OpenTelemetry

| Variable | Default | |
|---|---|---|
| `OTEL_SERVICE_NAME` | project name | service name on traces |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `http://localhost:4318` | OTLP/HTTP collector |
| `OTEL_TRACES_EXPORTER` | `none` | `otlp`, `console` or `none` |

Generate secrets with `openssl rand -base64 48`. Never commit `.env`; it's in `.gitignore`.
