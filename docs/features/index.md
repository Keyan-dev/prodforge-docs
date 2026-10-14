# Features

Every project gets the **always-on** essentials. Everything else is an option you pick with a prompt, a [flag](/reference/cli) or a [preset](/guide/presets), or [add later](/guide/add).

## Always on

| Feature | What you get |
|---|---|
| [Config and env vars](./config) | Zod-validated environment in `src/config/env.ts`, fails fast at startup |
| [Logging](./logging) | Pino JSON logs with request ids, pretty in development |
| [Health and shutdown](./health) | `/health`, `/ready`, graceful shutdown on `SIGTERM` |
| [Security defaults](./security) | Helmet, CORS, rate limiting, body-size limit |
| [Errors](./errors) | One JSON error shape, `HttpError`, Zod errors become 400 |
| [Testing](./testing) | Vitest (+ Supertest for Express), coverage via v8 |
| [Lint and format](./lint) | ESLint + Prettier or Biome |
| TypeScript | Strict, ESM, tsx for dev, tsdown for build, `.nvmrc`, `.editorconfig` |

## Options

| Option | Flag | Default | Page |
|---|---|---|---|
| Framework | `--framework express\|fastify\|hono` | `express` | [Frameworks](./frameworks) |
| Database | `--db prisma\|drizzle\|mongoose\|none` | `prisma` | [Databases](./databases) |
| Example module | `--example` / `--no-example` | on with a database | [Example users module](./example-module) |
| OpenAPI + Scalar | `--openapi` / `--no-openapi` | on | [OpenAPI](./openapi) |
| Redis / BullMQ | `--cache none\|redis\|bullmq` | `none` | [Redis and BullMQ](./redis-bullmq) |
| Auth | `--auth none\|jwt\|better-auth` | `none` | [Authentication](./auth) |
| OpenTelemetry | `--otel` | off | [OpenTelemetry](./otel) |
| Docker | `--docker` / `--no-docker` | on | [Docker](./docker) |
| PM2 | `--pm2` / `--no-pm2` | on | [PM2](./pm2) |
| CI | `--ci` / `--no-ci` | on | [GitHub Actions CI](./ci) |
| Git hooks | `--git-hooks` / `--no-git-hooks` | on | [Git hooks](./git-hooks) |

Every option works with every framework and every database. The CLI's CI proves it by generating and running the combinations.
