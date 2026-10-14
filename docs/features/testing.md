# Testing (Vitest)

Every project uses [Vitest](https://vitest.dev) and ships with passing tests.

```bash
pnpm test             # run once
pnpm test:watch       # re-run on changes
pnpm test:coverage    # with v8 coverage
```

## No database needed

Tests import `createApp()` from `src/app.ts`, which builds the app without listening or connecting. Data access is behind repository interfaces, and tests swap in in-memory versions (`tests/support/memory-users-repository.ts`). So `pnpm test` runs in a second or two, in CI or on a laptop, with nothing running. Vitest loads `.env.example` with `NODE_ENV=test` and silent logs, so env validation passes too.

The real database, Redis and Docker are exercised by the CLI's own end-to-end tests.

## How each framework is driven

| Framework | Helper |
|---|---|
| Express | [Supertest](https://github.com/ladjs/supertest): `request(createApp()).get('/health')` |
| Fastify | `app.inject({ method: 'GET', url: '/health' })` |
| Hono | `app.request('/health')` |

## What ships

- `tests/health.test.ts`: `/health` and `/ready`
- `tests/app.test.ts`: 404 shape, request ids
- `tests/users.test.ts`: the example CRUD module
- `tests/auth.test.ts`, `tests/docs.test.ts`, `tests/example.job.test.ts`: when those features are on

**Why Vitest:** it's ESM- and TypeScript-native with no transform config, fast, and has a Jest-compatible API.
