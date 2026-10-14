# CLI flags

```bash
npm create prodforge@latest [name] -- [flags]
npx create-prodforge@latest add <add-on...> [--dry-run] [--no-install]
```

Every prompt has a flag. Flags win over a [preset](/guide/presets); the prompts only ask what neither settled. `--yes` skips the prompts and uses defaults for the rest.

## Stack

| Flag | Values | Default | |
|---|---|---|---|
| `--framework` | `express`, `fastify`, `hono` | `express` | [Frameworks](/features/frameworks) |
| `--db` | `prisma`, `drizzle`, `mongoose`, `none` | `prisma` | [Databases](/features/databases) |
| `--lint` | `eslint`, `biome` | `eslint` | [Lint and format](/features/lint) |
| `--cache` | `none`, `redis`, `bullmq` | `none` | [Redis and BullMQ](/features/redis-bullmq) |
| `--auth` | `none`, `jwt`, `better-auth` | `none` | [Authentication](/features/auth) (needs a database) |
| `--pm` | `pnpm`, `npm`, `yarn`, `bun` | the one you ran it with | package manager for scripts, CI and Docker |
| `--node` | `24`, `22` | `24` | `engines`, `.nvmrc` and the Docker base image |

## On/off options

Each has a `--no-` form.

| Flag | Default | |
|---|---|---|
| `--example` | on with a database | [Example users module](/features/example-module) |
| `--openapi` | on | [OpenAPI and Scalar](/features/openapi) |
| `--otel` | off | [OpenTelemetry](/features/otel) |
| `--docker` | on | [Docker](/features/docker) (pnpm and npm projects) |
| `--pm2` | on | [PM2](/features/pm2) |
| `--ci` | on | [GitHub Actions CI](/features/ci) |
| `--git-hooks` | on | [Git hooks](/features/git-hooks) |
| `--install` | on | install dependencies after generating |
| `--git` | on | `git init` and an initial commit |

## Run behaviour

| Flag | |
|---|---|
| `-y`, `--yes` | skip prompts, use defaults (the `api` preset) |
| `--preset <name\|file>` | `minimal`, `api`, `full`, or a path to a JSON file ([Presets](/guide/presets)) |
| `--dry-run` | print the file tree and `package.json`, write nothing |
| `--latest` | use npm's latest versions instead of the tested pins ([details](/guide/versions)) |
| `--force` | write into a directory that isn't empty |
| `--help`, `--version` | |

## Package manager detection

When `--pm` isn't given, the CLI uses the package manager you ran it with (`pnpm create` → pnpm, `npm create` → npm, …). If it can't tell (for example a bare `npx create-prodforge`), it uses pnpm when it's installed, otherwise npm with a notice.

## Examples

```bash
# Defaults, no questions
npm create prodforge@latest my-api -- --yes

# Fastify + Drizzle + Biome + JWT
pnpm create prodforge my-api --framework fastify --db drizzle --lint biome --auth jwt --yes

# Hono + MongoDB + BullMQ, npm, Node 22
npm create prodforge@latest my-api -- --framework hono --db mongoose --cache bullmq --pm npm --node 22 --yes

# A tiny service with no database and no docs
pnpm create prodforge my-svc --preset minimal --yes

# See what full would generate
pnpm create prodforge my-api --preset full --dry-run
```
