# Health, readiness and shutdown

## `/health`: liveness

```bash
curl localhost:3000/health
# {"status":"ok"}
```

Says only that the process is up. The Docker `HEALTHCHECK` and liveness probes use it. It never checks dependencies, so a database blip doesn't get your container killed.

## `/ready`: readiness

```bash
curl localhost:3000/ready
# {"ready":true,"checks":{"database":"ok","redis":"ok"}}
```

Runs every registered check and returns **200** when all pass, **503** otherwise. While the server is shutting down it returns 503 with `{"shutdown":"shutting down"}`, so a load balancer stops sending traffic before connections close.

Features register their own checks (`database`, `redis`). Add yours from the module that owns the connection:

```ts
import { addReadinessCheck } from '../lib/readiness';

addReadinessCheck('payments-api', async () => {
  const res = await fetch('https://payments.example.com/ping');
  if (!res.ok) throw new Error('payments API down');
});
```

Both endpoints sit before CORS and the rate limiter, so probes are never throttled.

## Graceful shutdown

On `SIGTERM` or `SIGINT`, `server.ts`:

1. marks the app not ready (`/ready` → 503),
2. stops accepting new connections and lets open requests finish,
3. closes the database, Redis and queue connections,
4. exits.

If that takes longer than `SHUTDOWN_TIMEOUT_MS` (default 10 s), it forces the exit. Crashes (`uncaughtException`, `unhandledRejection`) go through the same path with exit code 1.

This is why the Dockerfile runs `node dist/server.js` directly rather than through a package manager: the signal has to reach Node. With PM2, the app also sends `process.send('ready')` once it's listening, so reloads wait for new workers to be ready.
