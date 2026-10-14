# Versions, `--latest` and `--dry-run`

## Pinned versions, tested together

Every dependency version used in generated projects lives in one file in the CLI, `src/core/versions.ts`. Renovate opens PRs to bump it, and the CLI's CI regenerates every framework × database × linter combination, installs it, lints, type-checks, tests, builds, boots it and runs it in Docker before a bump merges.

Generated `package.json` files get **caret ranges** of those pins (`"express": "^5.3.0"`), so you pick up patch and minor releases after generation.

Some versions are deliberately held back, with the reason recorded:

- **Prisma stays on 7.x.** npm's `latest` tag for `prisma` points at an 8.0 release candidate while `@prisma/client` is on 7.10.
- **TypeScript stays on 6.0.** `typescript-eslint` doesn't support TypeScript 7 yet.

Docker image tags (`postgres:18-alpine`, `redis:8-alpine`, `mongo:8`) and GitHub Action versions are pinned the same way.

## `--latest`

```bash
npm create prodforge@latest my-api -- --yes --latest
```

Uses npm's `latest` version of every dependency instead of the pins. The CLI warns that the combination hasn't been tested. It still keeps the pin, and lists it, when:

- the `latest` tag is a prerelease (like Prisma's 8.0 RC), or
- the package is `@types/node`, which follows the Node version you picked.

Docker images, GitHub Action versions and the Scalar CDN script aren't npm dependencies and always stay pinned.

## `--dry-run`

```bash
npm create prodforge@latest my-api -- --preset full --dry-run
```

Prints the file tree and the generated `package.json`, and writes nothing (no install, no git). Useful for comparing options before committing to one. `add --dry-run` does the same for [adding features](./add).
