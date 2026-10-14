# Getting started

## Requirements

- **Node.js 22 or 24** (24 is the default for generated projects)
- A package manager: pnpm (recommended), npm, yarn or bun
- **Docker** if you want to run the database, Redis or the whole stack locally with `docker compose`

## Create a project

```bash
npm create prodforge@latest my-api
# or
pnpm create prodforge my-api
yarn create prodforge my-api
bun create prodforge my-api
```

The CLI asks for:

1. **Project name** (also the directory)
2. **Framework**: Express 5, Fastify or Hono
3. **Database**: Prisma + PostgreSQL, Drizzle + PostgreSQL, Mongoose + MongoDB, or none
4. **Linter**: ESLint + Prettier or Biome
5. **Extras**: OpenAPI docs, Docker, PM2, CI, git hooks
6. **Redis**: none, Redis, or Redis + BullMQ workers
7. **Auth** (only when a database is picked): none, JWT or Better Auth
8. **OpenTelemetry**: on or off
9. Whether to **install dependencies** and **initialize git**

Every prompt has a flag (see [CLI flags](/reference/cli)), so you can skip the questions entirely:

```bash
# The recommended defaults (the "api" preset): Express + Prisma + everything production needs
npm create prodforge@latest my-api -- --yes

# Pick everything yourself
npm create prodforge@latest my-api -- --framework fastify --db drizzle --lint biome --auth jwt --yes
```

::: tip The `--` with npm
`npm create` needs `--` before flags meant for the CLI. pnpm, yarn and bun don't.
:::

## Run it

For the default `api` preset (Express + Prisma + Postgres):

```bash
cd my-api
cp .env.example .env               # local settings
docker compose up -d postgres      # start only the database
pnpm db:deploy                     # apply the initial migration
pnpm dev                           # http://localhost:3000
```

Then try it:

```bash
curl localhost:3000/health         # {"status":"ok"}
curl localhost:3000/ready          # checks the database too
curl localhost:3000/users          # the example CRUD module
open http://localhost:3000/docs    # interactive API docs (Scalar)
```

Every generated project also has its own `README.md` with the exact commands for the options you picked (for example `docker compose up -d redis` when Redis is on).

## Check everything passes

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test          # no database needed
pnpm build         # bundles to dist/
pnpm start         # runs the built server
```

These are the same steps the generated GitHub Actions workflow runs.

## Run the whole stack in Docker

```bash
docker compose up --build
```

This starts the database (and Redis if picked), runs migrations in a one-off `migrate` container, then starts the app (and the BullMQ worker). See [Docker](/features/docker).

## Where to next

- [Presets](./presets): `minimal`, `api`, `full`, or your team's own JSON file
- [The generated project](./project-structure): what each file does
- [Features](/features/): every option, what it adds and why
- [Adding features later](./add): `create-prodforge add redis otel`
