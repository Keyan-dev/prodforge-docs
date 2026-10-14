# Security defaults

These are on in every project and configured with env vars.

| Protection | Express | Fastify | Hono | Env var |
|---|---|---|---|---|
| Security headers | `helmet` | `@fastify/helmet` | `secureHeaders()` | |
| CORS | `cors` | `@fastify/cors` | `cors()` | `CORS_ORIGIN` (default `*`) |
| Rate limiting | `express-rate-limit` | `@fastify/rate-limit` | `hono-rate-limiter` | `RATE_LIMIT_PER_MINUTE` (default 100 per IP) |
| Body size limit | `express.json({ limit })` | Fastify `bodyLimit` option | `bodyLimit()` | `BODY_LIMIT_KB` (default 100) |

- **Helmet** sets headers such as `Content-Security-Policy`, `Strict-Transport-Security` and `X-Content-Type-Options`, which close off common browser attacks. The `/docs` page gets its own CSP because the Scalar UI needs an inline script.
- **CORS:** set `CORS_ORIGIN` to a comma-separated list of origins in production, e.g. `https://app.example.com,https://admin.example.com`.
- **Rate limiting** answers 429 once a client IP passes the limit per minute, with standard `RateLimit` headers. The store is in memory, so each process counts separately.
- **Body limit** rejects oversized bodies with 413 before they're parsed.

Other defaults that matter:

- 5xx error details are logged, never sent to the client ([Errors](./errors)).
- Auth headers and cookies are redacted from logs ([Logging](./logging)).
- The Docker image runs as the non-root `node` user ([Docker](./docker)).
- Passwords (JWT auth) are hashed with Node's built-in `scrypt` ([Authentication](./auth)).
