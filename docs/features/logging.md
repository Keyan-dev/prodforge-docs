# Logging (Pino)

Every project logs with **Pino** from `src/lib/logger.ts`.

- **Production:** one JSON object per line, ready for any log collector (CloudWatch, Loki, Datadog…).
- **Development:** readable, colored lines through `pino-pretty` (a dev dependency only, never shipped).
- **Level** from `LOG_LEVEL` (`fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`). `.env.example` sets `debug`.
- **Redaction:** `Authorization` and `Cookie` request headers and `Set-Cookie` response headers are replaced with `[Redacted]`.

## Request logs and request ids

Each request is logged once when it finishes, with method, URL, status and duration. Every request gets an **id**:

- an incoming `X-Request-Id` header is reused (so ids line up across services behind a proxy), otherwise a UUID is generated;
- it's echoed back in the `X-Request-Id` response header and in every [error body](./errors);
- it's attached to every log line for that request.

`/health` and `/ready` aren't logged, since probes every few seconds would drown everything else.

## Logging from your code

```ts
import { logger } from '../lib/logger';

logger.info({ orderId }, 'Order placed');
logger.error({ err }, 'Payment failed');
```

Inside a request handler, use the request-scoped logger (`req.log` in Express, `request.log` in Fastify) so the line carries the request id.

With [OpenTelemetry](./otel) on, log lines also carry the trace id.

**Why Pino:** it's the fastest mainstream Node logger, writes structured JSON by default, and is the logger Fastify already uses.
