# Scripts

Script names are the same for every stack. The examples use pnpm; with npm it's `npm run <script>`.

| Script | Does | When |
|---|---|---|
| `dev` | `tsx watch` the server, loading `.env` | always |
| `build` | bundle to `dist/` with tsdown | always |
| `start` | run `dist/server.js`, loading `.env` if present | always |
| `test` | `vitest run` | always |
| `test:watch` | `vitest` | always |
| `test:coverage` | `vitest run --coverage` | always |
| `lint` | `eslint .` or `biome lint` | always |
| `format` | `prettier --write .` or `biome format --write` | always |
| `format:check` | `prettier --check .` or `biome format` | always |
| `typecheck` | `tsc --noEmit` | always |
| `db:migrate` | create and apply a migration (Prisma), apply migrations (Drizzle) | Prisma, Drizzle |
| `db:deploy` | apply pending migrations, for deploys | Prisma, Drizzle |
| `db:generate` | regenerate the Prisma client / generate a Drizzle migration | Prisma, Drizzle |
| `db:studio` | browse data | Prisma, Drizzle |
| `dev:worker` | `tsx watch` the BullMQ worker | BullMQ |
| `start:worker` | run `dist/worker.js` | BullMQ |
| `prepare` | `husky` (installs git hooks) | git hooks |
| `postinstall` | `prisma generate` | Prisma |

With OpenTelemetry on, `dev`, `start`, `dev:worker` and `start:worker` also load the instrumentation with `--import`.
