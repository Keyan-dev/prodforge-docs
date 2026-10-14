# OpenTelemetry

```bash
--otel     # off by default, on in the full preset
```

[OpenTelemetry](https://opentelemetry.io) traces show where time goes in each request: HTTP handlers, database queries, Redis calls and outgoing requests become spans, and Pino log lines carry the trace id so you can jump from a log to its trace.

## How it's wired

`src/instrumentation.ts` starts the OpenTelemetry Node SDK with the auto-instrumentations (file-system spans off, as they're noise). It has to load **before** the app, so every start script loads it with `--import`:

```json
"dev":   "tsx watch --import ./src/instrumentation.ts --env-file-if-exists=.env src/server.ts",
"start": "node --import ./dist/instrumentation.js --env-file-if-exists=.env dist/server.js"
```

The Docker image sets it through `NODE_OPTIONS`, and PM2 through the app's env. Importing it from `server.ts` wouldn't work: ESM modules are only patched if the loader hook is registered before they load.

## Sending traces

Nothing is exported until you choose to:

| Env var | Default | |
|---|---|---|
| `OTEL_TRACES_EXPORTER` | `none` | `otlp` to send, `console` to print them |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `http://localhost:4318` | your collector (OTLP over HTTP) |
| `OTEL_SERVICE_NAME` | the project name | service name on traces |

Any other standard `OTEL_*` variable works too. To try it locally with Jaeger:

```bash
docker run -d -p 16686:16686 -p 4318:4318 jaegertracing/all-in-one
OTEL_TRACES_EXPORTER=otlp pnpm dev
# open http://localhost:16686
```

**Packages:** `@opentelemetry/sdk-node`, `@opentelemetry/auto-instrumentations-node`, `@opentelemetry/instrumentation`.

**Why it's opt-in:** it adds several packages and needs a collector to be useful. `/health` and `/ready` are always on.
