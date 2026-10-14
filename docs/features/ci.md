# GitHub Actions CI

```bash
--ci      # default (off in the minimal preset)
--no-ci
```

`.github/workflows/ci.yml` runs on pushes to `main` and on every pull request.

**`check` job:**

1. install from the lockfile (Node version from `.nvmrc`, dependency cache on)
2. `lint`
3. `format:check`
4. `typecheck`
5. `test`
6. `build`

**`docker` job** (with Docker on): builds the image with Buildx and the GitHub Actions cache. It doesn't push anywhere; add a registry login and `push: true` when you're ready to publish images.

The workflow is set up for your package manager (pnpm, npm, yarn or bun). Its permissions are read-only (`contents: read`). Action versions are pinned in the CLI and kept current with Renovate.
