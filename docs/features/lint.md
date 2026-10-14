# Lint and format

```bash
--lint eslint   # default: ESLint (flat config) + Prettier
--lint biome
```

Either way the scripts are the same, so CI and git hooks don't change:

```bash
pnpm lint            # find problems
pnpm format          # rewrite files
pnpm format:check    # check formatting (CI)
pnpm typecheck       # tsc --noEmit
```

## ESLint + Prettier (default)

- `eslint.config.js` with `@eslint/js` recommended rules and `typescript-eslint`, plus `eslint-config-prettier` so the two tools don't fight.
- Names starting with `_` may be unused (for required parameters such as Express's `next`).
- `.prettierrc.json`: single quotes, 100 columns.
- **Why:** the largest ecosystem of rules and plugins, and what most teams already know.

## Biome

- One dev dependency (`@biomejs/biome`) and one `biome.jsonc` replace ESLint and Prettier, with the same style.
- Much faster, with no plugin setup. It reads `.gitignore` for ignored files.
- **Pick it when** you want speed and less config, and don't need specific ESLint plugins.
