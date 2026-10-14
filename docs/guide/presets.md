# Presets

A preset is a saved set of answers. Pass one with `--preset`, and the CLI only asks about what the preset doesn't settle.

```bash
npm create prodforge@latest my-api -- --preset full --yes
```

## Built-in presets

| | `minimal` | `api` (= `--yes`) | `full` |
|---|---|---|---|
| Framework | Express | Express | Express |
| Database | none | Prisma + Postgres | Prisma + Postgres |
| Example users module | off | on | on |
| OpenAPI + Scalar | off | on | on |
| Docker | on | on | on |
| PM2 | off | on | on |
| GitHub Actions CI | off | on | on |
| Git hooks | off | on | on |
| Redis + BullMQ | off | off | on |
| Auth | none | none | Better Auth |
| OpenTelemetry | off | off | on |

- **`minimal`**: a small Express service with the production basics (logging, env validation, health checks, Docker) and nothing else. Good for a webhook receiver or an internal tool.
- **`api`**: the recommended default and what `--yes` uses. A typical REST API with a Postgres database, docs, CI and deployment files. It has no auth, because the right auth depends on your product.
- **`full`**: everything turned on. Use it to see what the tool can do, or as the start of a larger service.

## Flags win over presets

Precedence is: **flags → preset → prompts → defaults**. So you can start from a preset and change one thing:

```bash
# full preset, but on Fastify and without OpenTelemetry
npm create prodforge@latest my-api -- --preset full --framework fastify --no-otel --yes
```

## Your own preset file

Teams can keep their stack in a JSON file and point `--preset` at it:

```json
{
  "framework": "fastify",
  "db": "drizzle",
  "lint": "biome",
  "auth": "jwt",
  "otel": true
}
```

```bash
npm create prodforge@latest my-api -- --preset ./team-preset.json
```

Rules:

- Any option can be set **except** `name`, `install` and `git`, which belong to each run.
- Unknown keys are an error, so a typo doesn't silently do nothing.
- A `$schema` key is allowed.
- Anything the file leaves out is asked for (or defaulted with `--yes`).

Keys and values match the [CLI flags](/reference/cli): `framework`, `db`, `example`, `cache`, `auth`, `lint`, `openapi`, `otel`, `docker`, `pm2`, `ci`, `gitHooks`, `packageManager`, `node`.
