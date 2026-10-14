# Why each dependency

Every package a generated project might contain, and why it's there. Versions are pinned and tested together in the CLI ([Versions](/guide/versions)).

## Always

| Package | Why |
|---|---|
| `zod` | validates env vars and request bodies; the same schemas generate OpenAPI. One dependency, three jobs |
| `pino` | fast structured JSON logging |
| `pino-pretty` (dev) | readable logs in development only |
| `typescript` (dev) | type-checking (`tsc --noEmit`). Pinned to 6.0 until typescript-eslint supports 7 |
| `tsx` (dev) | runs TypeScript directly in development, with watch mode |
| `tsdown` (dev) | bundles the app into `dist/` for production, so Node runs plain JS |
| `@types/node` (dev) | Node's types, matching the Node version you picked |
| `vitest`, `@vitest/coverage-v8` (dev) | fast ESM-native tests and coverage |

No `dotenv`: Node's `--env-file-if-exists` flag loads `.env`.

## Framework

| Package | Why |
|---|---|
| `express` | the HTTP framework most people know; v5 handles async errors |
| `helmet` | security headers |
| `cors` | cross-origin requests from browsers |
| `express-rate-limit` | basic abuse protection |
| `pino-http` | request logging with request ids |
| `supertest` (dev) | calls the Express app in tests without opening a port |
| `fastify` | faster framework with a plugin system; Pino built in |
| `@fastify/helmet`, `@fastify/cors`, `@fastify/rate-limit` | the same protections as Fastify plugins |
| `hono` | small, Web-standards framework |
| `@hono/node-server` | runs Hono on Node |
| `hono-rate-limiter` | rate limiting for Hono |

## Database

| Package | Why |
|---|---|
| `prisma` (dev), `@prisma/client` | schema, migrations and a typed client |
| `@prisma/adapter-pg`, `pg` | Prisma 7 talks to Postgres through the `pg` driver, with no Rust engine binary |
| `drizzle-orm`, `drizzle-kit` (dev) | SQL-like typed queries and migrations, no code generation |
| `mongoose` | models and validation for MongoDB |
| `mongodb` | the MongoDB driver, used directly by Better Auth on Mongo |

## Options

| Package | Option | Why |
|---|---|---|
| `zod-openapi` | OpenAPI | builds the OpenAPI document from Zod schemas |
| `@scalar/express-api-reference` / `-fastify-` / `-hono-` | OpenAPI | serves the `/docs` page |
| `ioredis` | Redis | the standard Redis client; reconnects, clusters, BullMQ uses it |
| `bullmq` | BullMQ | reliable job queues with retries and backoff on Redis |
| `jose` | JWT | signs and verifies tokens with no native code |
| `better-auth` | Better Auth | sessions, cookies, email/password and plugins |
| `@opentelemetry/sdk-node`, `auto-instrumentations-node`, `instrumentation` | OTel | traces for HTTP, database and Redis calls |
| `eslint`, `@eslint/js`, `typescript-eslint`, `globals`, `eslint-config-prettier` (dev) | ESLint | linting TypeScript, without clashing with Prettier |
| `prettier` (dev) | ESLint | formatting |
| `@biomejs/biome` (dev) | Biome | lint and format in one fast tool |
| `husky`, `lint-staged` (dev) | git hooks | run checks on staged files before each commit |
| `@commitlint/cli`, `@commitlint/config-conventional` (dev) | git hooks | conventional commit messages |

## Not in `package.json`

| Tool | Why |
|---|---|
| PM2 | installed on the server (`npm i -g pm2`), not a project dependency |
| `@scalar/api-reference` | the docs page loads it from a CDN at a pinned version |
| Docker images | `node:alpine`, `postgres:18-alpine`, `mongo:8`, `redis:8-alpine` |
