# Deploying

A generated project can be deployed three ways. All of them run the bundled `dist/server.js` with Node.

## 1. Docker (containers, Kubernetes, most PaaS)

```bash
docker build -t my-api .
docker run -p 3000:3000 --env-file .env my-api
```

- The image runs as the non-root `node` user and has a `HEALTHCHECK` on `/health`.
- Point your orchestrator's **liveness** probe at `/health` and **readiness** probe at `/ready`.
- Run `db:deploy` (migrations) before the new version takes traffic. In compose that's the `migrate` service; in Kubernetes, a Job or init container built from the `build` stage (`docker build --target build`).
- Scale with replicas, not PM2. Each container runs one Node process.

See [Docker](/features/docker).

## 2. PM2 (a VM or bare-metal server)

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm db:deploy
npm install --global pm2@7.0.4
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup     # restart on reboot
```

PM2 runs one process per CPU in cluster mode and reloads without downtime (`pm2 reload ecosystem.config.cjs`). See [PM2](/features/pm2).

## 3. Plain Node

```bash
pnpm build
NODE_ENV=production node --env-file-if-exists=.env dist/server.js
```

Use your platform's process manager (systemd, a PaaS) to restart it.

## Production checklist

- [ ] `NODE_ENV=production` (JSON logs, no pretty printer)
- [ ] `CORS_ORIGIN` lists your real front-end origins instead of `*`
- [ ] `RATE_LIMIT_PER_MINUTE` suits your traffic (the limiter's store is per process)
- [ ] Secrets (`JWT_SECRET`, `BETTER_AUTH_SECRET`) are long random values: `openssl rand -base64 48`
- [ ] `BETTER_AUTH_URL` is the public URL
- [ ] Migrations run before each release (`db:deploy`)
- [ ] With BullMQ, the worker runs too (`start:worker`, or the compose `worker` service)
- [ ] With OpenTelemetry, `OTEL_TRACES_EXPORTER=otlp` and `OTEL_EXPORTER_OTLP_ENDPOINT` point at your collector
- [ ] `SHUTDOWN_TIMEOUT_MS` is shorter than your platform's kill grace period

All variables are listed in [Environment variables](/reference/env).
