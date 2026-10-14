# Redis and BullMQ

```bash
--cache none     # default
--cache redis    # a shared Redis connection
--cache bullmq   # Redis + a BullMQ job queue and worker process
```

## Redis (`--cache redis`)

`src/lib/redis.ts` exports one shared [ioredis](https://github.com/redis/ioredis) connection:

```ts
import { redis } from '../lib/redis';

await redis.set(`session:${id}`, JSON.stringify(data), 'EX', 3600);
const cached = await redis.get(`user:${id}`);
```

- Opened before the server listens; if Redis is down the app exits with a clear log, like the database.
- Reported as `redis` in [`/ready`](./health) and closed on shutdown.
- Created with `lazyConnect`, so tests import modules that use it without a Redis server.
- `REDIS_URL` (default `redis://localhost:6379`); compose adds a `redis:8-alpine` service.

**Why ioredis:** it's the most widely used Redis client for Node, handles reconnects and clusters, and BullMQ is built on it.

## Background jobs (`--cache bullmq`)

[BullMQ](https://docs.bullmq.io) adds a job queue on Redis, with jobs processed by a **separate worker process** (`src/worker.ts`). Slow work (emails, image processing, webhooks) never holds up HTTP requests, and the API and the worker scale independently.

`src/jobs/example.job.ts` shows the pattern:

```ts
// Runs in the worker. Throwing makes BullMQ retry the job.
export async function processExampleJob(job: Job<ExampleJobData>) { ... }

// Called from the app, e.g. in a route handler. 3 attempts with exponential backoff.
export async function enqueueExampleJob(data: ExampleJobData) { ... }
```

```ts
// in a route
await enqueueExampleJob({ message: 'welcome email for ' + user.email });
```

To add a job type, copy `example.job.ts` and register its processor in the `workers` list in `src/worker.ts`.

### Running the worker

| Where | Command |
|---|---|
| Development | `pnpm dev:worker` (in a second terminal next to `pnpm dev`) |
| After a build | `pnpm start:worker` |
| Docker Compose | the `worker` service, from the same image as the app |
| PM2 | a `worker` app in `ecosystem.config.cjs` (fork mode) |

- `WORKER_CONCURRENCY` (default 5) sets how many jobs each worker process runs at once.
- On `SIGTERM` the worker lets running jobs finish (up to `SHUTDOWN_TIMEOUT_MS`) before exiting.
