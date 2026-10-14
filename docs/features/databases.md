# Databases

```bash
--db prisma     # default: Prisma 7 + PostgreSQL
--db drizzle    # Drizzle ORM + PostgreSQL
--db mongoose   # Mongoose + MongoDB
--db none
```

Every database option gives you:

- a `DATABASE_URL` env variable (validated at startup)
- `src/db/client.ts` with `connectDatabase()` and `disconnectDatabase()`
- a connection **before** the server listens: if the database is down, the app logs "Is it running?" and exits instead of serving errors
- a `database` check in [`/ready`](./health) and a disconnect during graceful shutdown
- a compose service (Postgres 18 or MongoDB 8) with a named volume and a health check, with its port published so `pnpm dev` on your machine can use it
- with the [example module](./example-module), a `users` table/collection and its repository

## Prisma + PostgreSQL (default)

- **Why:** the smoothest migration workflow for a new project, a fully typed client, and Prisma 7 ships without the old Rust engine binary.
- **Packages:** `@prisma/client`, `@prisma/adapter-pg` + `pg` (the Postgres driver Prisma talks through), `prisma` (CLI, dev only).
- **Files:** `prisma/schema.prisma`, `prisma.config.ts`, `prisma/migrations/`. The client is generated into `src/generated/prisma` (gitignored) on `postinstall`, so a fresh clone type-checks after install.
- **Pinned to 7.10**, because npm's `latest` for `prisma` is currently an 8.0 release candidate.

| Script | Command | Use |
|---|---|---|
| `db:migrate` | `prisma migrate dev` | change the schema, then create and apply a migration (asks for a name) |
| `db:deploy` | `prisma migrate deploy` | apply pending migrations; for deploys and CI |
| `db:generate` | `prisma generate` | regenerate the client |
| `db:studio` | `prisma studio` | browse data |

## Drizzle + PostgreSQL

- **Pick it when** you'd rather write something close to SQL, with no code generation step.
- **Packages:** `drizzle-orm`, `pg`, `drizzle-kit` (dev only).
- **Files:** the schema in `src/db/schema.ts`, `drizzle.config.ts`, migrations in `drizzle/`.

| Script | Command | Use |
|---|---|---|
| `db:generate` | `drizzle-kit generate` | create a migration from schema changes |
| `db:migrate` / `db:deploy` | `drizzle-kit migrate` | apply migrations |
| `db:studio` | `drizzle-kit studio` | browse data |

## Mongoose + MongoDB

- **Pick it when** your data is document-shaped.
- **Packages:** `mongoose`.
- **No migrations:** MongoDB has no schema migrations, so there are no `db:*` scripts. Indexes are built from the models on connect, and the server waits for them so unique constraints (like a unique email) hold from the first request.
- `DATABASE_URL=mongodb://localhost:27017/app`

## Migrations in Docker

`compose.yaml` has a one-off **`migrate`** service built from the Dockerfile's `build` stage (which has the dev tools and migration files). It runs `db:deploy`, and the app waits for it to finish successfully before starting. That keeps migration tooling out of the runtime image.

## No database

With `--db none` there's no example module and auth is skipped (it needs somewhere to store accounts). You can add your own data layer and register a check with `addReadinessCheck()` from `src/lib/readiness.ts`.
