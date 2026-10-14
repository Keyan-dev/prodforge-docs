# The generated project

This is the `full` preset with Express and Prisma. Smaller presets have a subset of these files.

```
my-api/
├─ .github/workflows/ci.yml     # lint, format, typecheck, test, build, docker build
├─ .husky/                      # pre-commit (lint-staged) and commit-msg (commitlint)
├─ prisma/
│  ├─ migrations/               # initial migrations, ready for db:deploy
│  └─ schema.prisma
├─ src/
│  ├─ config/env.ts             # Zod-validated env, fails fast on bad config
│  ├─ db/client.ts              # connectDatabase() / disconnectDatabase()
│  ├─ jobs/                     # BullMQ queue connection and an example job
│  ├─ lib/
│  │  ├─ logger.ts              # Pino
│  │  ├─ readiness.ts           # checks behind /ready
│  │  ├─ redis.ts               # shared ioredis connection
│  │  └─ auth.ts                # Better Auth or JWT helpers
│  ├─ middleware/error-handler.ts
│  ├─ modules/
│  │  ├─ health/                # /health and /ready
│  │  ├─ users/                 # example CRUD: routes, schema, repository, OpenAPI
│  │  ├─ auth/                  # auth routes
│  │  └─ docs/                  # /openapi.json and /docs
│  ├─ openapi/document.ts       # the OpenAPI document
│  ├─ app.ts                    # builds the app; importable in tests, opens no port
│  ├─ server.ts                 # connects services, listens, shuts down gracefully
│  ├─ worker.ts                 # BullMQ worker process
│  └─ instrumentation.ts        # OpenTelemetry, loaded with --import
├─ tests/                       # Vitest; no database needed
├─ .env.example                 # every variable, with a comment
├─ .prodforge.json              # the options this project was generated with
├─ Dockerfile, .dockerignore, compose.yaml
├─ ecosystem.config.cjs         # PM2
├─ eslint.config.js, .prettierrc.json   (or biome.jsonc)
├─ tsconfig.json, tsdown.config.ts, vitest.config.ts
├─ package.json
└─ README.md                    # how to run, test and deploy this project
```

## `app.ts` vs `server.ts`

The split matters for testing and deployment:

- **`app.ts`** exports `createApp()`, which builds the framework app with middleware and routes but **doesn't listen on a port** or connect to anything. Tests import it directly.
- **`server.ts`** is the entry point. It validates env, connects the database (and Redis), registers readiness checks, starts listening, and handles `SIGTERM`/`SIGINT` with a graceful shutdown.

## Modules

Code is grouped by feature under `src/modules/<name>/`, each with its routes, Zod schemas and (for data) a repository. The [example users module](/features/example-module) shows the pattern; copy it for your own resources.

## Same scripts for every stack

Whatever you picked, the scripts have the same names: `dev`, `build`, `start`, `test`, `lint`, `format`, `format:check`, `typecheck`, plus `db:*` with a database and `dev:worker` / `start:worker` with BullMQ. See [Scripts](/reference/scripts).

## TypeScript setup

- Strict TypeScript, ESM only (`"type": "module"`).
- `module: preserve` + `moduleResolution: bundler`, so imports have no `.js` extensions.
- **tsx** runs the source in development (with watch mode).
- **tsdown** bundles `src/server.ts` (and `worker.ts`, `instrumentation.ts`) into `dist/` for production.
- `tsc --noEmit` is only used for type-checking.
