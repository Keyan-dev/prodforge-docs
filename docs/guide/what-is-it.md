# What is create-prodforge?

create-prodforge is a `create-*` style CLI (like `create-vite`) that generates a **Node.js + TypeScript backend** you can deploy. You answer a few questions or pass flags, and it writes a project with the framework, database, tooling and deployment files you picked.

## Why it exists

Most templates stop at "hello world". The work that makes a backend safe to run in production is left to you:

- config that fails fast when a variable is missing or wrong
- structured logs with request ids
- graceful shutdown, so deploys don't drop requests
- separate liveness and readiness checks
- a Docker image that doesn't run as root
- migrations that run as part of the deploy
- CI that lints, type-checks, tests and builds

create-prodforge generates all of it, for whichever stack you pick. Its own CI generates, installs, builds and runs every framework × database combination, so what you get works on the first run.

## What it is not

- **Not a framework or a runtime dependency.** After generation the code is yours. There's nothing from create-prodforge in your `package.json`.
- **Not a frontend tool.** v1 is backend only: no Next.js, React or monorepos (those are ideas for a later version).
- **Not serverless.** Projects run as a long-lived Node process (directly, in Docker or under PM2).

## How it works, briefly

Each option is a self-contained *feature* (Docker, Prisma, BullMQ, …). Features write into an in-memory file system and register what they need: dependencies, scripts, env vars, compose services, code injected into shared files. Nothing touches disk until every feature has run, which is why `--dry-run` is free and why the output is the same whether you used prompts, flags or a preset.

Next: [Getting started](./getting-started).
