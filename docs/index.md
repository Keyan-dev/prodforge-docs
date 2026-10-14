---
layout: home

hero:
  name: create-prodforge
  text: Production-ready TypeScript backends in one command
  tagline: A web framework, a database with migrations, Docker, PM2, CI, logging, health checks and tests, all wired together and passing from the first commit. You pick what goes in.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Browse features
      link: /features/
    - theme: alt
      text: GitHub
      link: https://github.com/Keyan-dev/create-prodforge

features:
  - title: Production-ready by default
    details: Pino logging, Zod-validated env vars, a central error handler, /health and /ready, graceful shutdown, Helmet, CORS and rate limiting in every project.
  - title: Pick your stack
    details: Express, Fastify or Hono. Prisma, Drizzle or Mongoose. ESLint + Prettier or Biome. Add Redis, BullMQ, JWT or Better Auth, and OpenTelemetry.
  - title: Versions tested together
    details: Every dependency version is pinned in one file and the CLI's CI generates, installs, builds and runs every combination before a change merges.
  - title: Nothing hidden
    details: The output is plain code you own. No runtime package from this tool ends up in your project.
  - title: Ship it your way
    details: A non-root multi-stage Docker image with compose, a PM2 cluster config for VMs, and a GitHub Actions workflow, all generated.
  - title: Grow it later
    details: create-prodforge add turns on Redis, BullMQ, auth, OpenTelemetry and more in an existing project, merging with your changes.
---

<div style="max-width: 860px; margin: 48px auto 0;">

```bash
npm create prodforge@latest my-api
```

![create-prodforge generating a project with the full preset](/demo.gif)

</div>
