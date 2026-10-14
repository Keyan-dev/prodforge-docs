# Adding features later

You don't have to get every choice right on day one. Run `add` inside a project made by create-prodforge to turn more options on:

```bash
cd my-api
git commit -am "before prodforge add"        # so you can review the diff
npx create-prodforge@latest add bullmq jwt otel
```

## Available add-ons

| Add-on | Turns on |
|---|---|
| `redis` | A shared Redis connection ([Redis and BullMQ](/features/redis-bullmq)) |
| `bullmq` | Redis plus a BullMQ queue and worker process |
| `jwt` | [JWT auth](/features/auth#jwt) (needs a database) |
| `better-auth` | [Better Auth](/features/auth#better-auth) (needs a database) |
| `otel` | [OpenTelemetry](/features/otel) tracing |
| `openapi` | [OpenAPI and Scalar](/features/openapi) docs |
| `docker` | [Dockerfile and compose.yaml](/features/docker) |
| `pm2` | [PM2](/features/pm2) ecosystem file |
| `ci` | [GitHub Actions](/features/ci) workflow |
| `git-hooks` | [Husky, lint-staged and commitlint](/features/git-hooks) |
| `example` | The [example users module](/features/example-module) |

## What it does to your files

`add` reads [`.prodforge.json`](/reference/prodforge-json) to learn how the project was generated, then generates the project twice in memory: once with the recorded options and once with the add-ons. The difference is applied to your files as a **three-way merge**, with the first run as the common base:

- **New files** are created.
- **Files you haven't changed** are replaced with the new version.
- **`package.json`** is merged key by key. If you and the generator set the same key differently, yours wins and the clash is reported.
- **Other files you've changed** go through `git merge-file`. Where you and the generator changed the same lines, you get standard conflict markers (`<<<<<<<`) to resolve by hand. Without git installed, the new version is written next to yours as `<file>.prodforge-new`.
- **Generated files you deleted** stay deleted.
- **New env variables** are appended to your `.env` with their `.env.example` values, so the app starts without editing config.
- Dependencies are installed afterwards (the lockfile is allowed to change). Skip it with `--no-install`.

Preview the changes first with:

```bash
npx create-prodforge@latest add redis --dry-run
```

## What it can't do

Only additive options can be added. Switching framework, database, linter or auth kind would mean rewriting code you've already built on, so `add` refuses those. Adding `redis` to a project that already has BullMQ does nothing (BullMQ includes Redis).

::: info Why `add` is part of the same package
It's a subcommand (`create-prodforge add`) rather than a separate `prodforge` package, so there's one thing to install and version. The only cost is that a new project can't be named `add`.
:::
