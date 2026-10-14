# .prodforge.json

Every generated project records the options it was made with in `.prodforge.json`:

```json
{
  "version": "0.1.0",
  "config": {
    "name": "my-api",
    "node": "24",
    "packageManager": "pnpm",
    "framework": "express",
    "db": "prisma",
    "cache": "bullmq",
    "auth": "better-auth",
    "lint": "eslint",
    "openapi": true,
    "otel": true,
    "docker": true,
    "pm2": true,
    "ci": true,
    "gitHooks": true,
    "example": true
  }
}
```

- `version` is the create-prodforge version that generated (or last updated) the project.
- `config` is the full set of options, minus `install` and `git`, which only matter for one run.

[`create-prodforge add`](/guide/add) reads it to regenerate the project's starting point in memory, and updates it after adding features. Commit it. Don't edit it by hand unless you know the project really matches the new values; `add` relies on it for its three-way merge.

It's also a handy record: you can turn it into a [team preset](/guide/presets#your-own-preset-file) by copying `config` and dropping `name`.
