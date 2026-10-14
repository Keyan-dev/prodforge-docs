# FAQ

### Can I remove something after generating?

Yes, it's your code. Each feature page says which files belong to it. For the example module there's a [removal guide](/features/example-module#removing-it).

### Can I switch from Express to Fastify later?

Not with `add`; switching framework, database, linter or auth kind would rewrite code you've built on. Generate a new project with the other option and compare, or move code across by hand. Your modules are framework-light (schemas and repositories carry over as is).

### Does my project depend on create-prodforge?

No. Nothing from it is installed in your project. `.prodforge.json` is only read by `create-prodforge add`.

### How do I update dependencies after generating?

They're caret ranges, so `pnpm update` picks up minor and patch releases. For majors, use Renovate or Dependabot in your own repo.

### Why does `--yes` give me no auth?

Auth choices depend on your product, and a wrong default is worse than none. Use `--auth jwt`, `--auth better-auth`, or the `full` preset.

### Why is there both Docker and PM2?

They're for different places: Docker for containers and orchestrators, PM2 for a plain VM. PM2 never runs inside the container. See [Deploying](/guide/deploying).

### Why no Docker files for yarn or bun?

The Dockerfile installs from the lockfile, and yarn and bun need a different setup. Pick pnpm or npm if you want Docker.

### Tests pass but `pnpm dev` exits with "Is it running?"

The database (or Redis) isn't reachable. Start it with `docker compose up -d postgres` (or `mongo`, `redis`) and check `DATABASE_URL` in `.env`.

### `pnpm dev` prints "Invalid environment variables"

A variable in `.env` is missing or invalid. Compare with `.env.example`; the message names the variable.

### Where do I report a bug or ask for a feature?

On [GitHub](https://github.com/Keyan-dev/create-prodforge/issues).
