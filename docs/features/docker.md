# Docker

```bash
--docker      # default
--no-docker
```

You get a `Dockerfile`, `.dockerignore` and `compose.yaml`.

::: info Package managers
Docker files are generated for **pnpm and npm** projects. yarn and bun projects skip them for now, with a notice.
:::

## The image

A multi-stage build on `node:<version>-alpine`:

1. **deps**: install all dependencies from the lockfile
2. **build**: `pnpm build` to `dist/`
3. **prod-deps**: production dependencies only, scripts skipped
4. **runtime**: `node_modules` from prod-deps and `dist/` from build, nothing else

The final image:

- runs as the non-root **`node`** user
- has a `HEALTHCHECK` that calls `/health`
- starts with `node dist/server.js` directly, so `SIGTERM` reaches the app for [graceful shutdown](./health)
- has no TypeScript, no dev dependencies and no source

::: tip Commit your lockfile
The build installs with `--frozen-lockfile`, so it needs `pnpm-lock.yaml` or `package-lock.json`.
:::

**Why alpine and not distroless:** distroless has no shell, so `wget` health checks and running migrations don't work without extra steps. Alpine is small and keeps those working.

## compose.yaml

Built from the services your options need:

| Service | When | Notes |
|---|---|---|
| `app` | always | your API, waits for the services below to be healthy |
| `postgres` / `mongo` | with a database | named volume, health check, port published for local dev |
| `migrate` | Prisma or Drizzle | one-off `db:deploy` from the build stage; `app` waits for it to succeed |
| `redis` | Redis or BullMQ | `redis:8-alpine` |
| `worker` | BullMQ | the job worker, from the app image |

```bash
docker compose up -d postgres      # just the database, for pnpm dev
docker compose up --build          # the whole stack
docker compose up --build --wait   # and wait until everything is healthy
```

Inside compose, `DATABASE_URL` and `REDIS_URL` point at the service names (`postgres`, `redis`); your `.env` is read too.

## Docker and PM2

Both are on by default, but **PM2 never runs inside the container**. Docker or Kubernetes already restarts the process, and you scale with replicas. `ecosystem.config.cjs` is for VMs. If you really want PM2 cluster mode in a container, switch the `CMD` to `pm2-runtime ecosystem.config.cjs` yourself.
