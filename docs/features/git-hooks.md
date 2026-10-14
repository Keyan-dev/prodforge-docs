# Git hooks

```bash
--git-hooks      # default (off in the minimal preset)
--no-git-hooks
```

| Tool | Hook | Does |
|---|---|---|
| [Husky](https://typicode.github.io/husky/) | installs the hooks | runs from the `prepare` script on install |
| [lint-staged](https://github.com/lint-staged/lint-staged) | `pre-commit` | lints and formats only the staged files (ESLint + Prettier, or `biome check --write`) |
| [commitlint](https://commitlint.js.org) | `commit-msg` | enforces [Conventional Commits](https://www.conventionalcommits.org) |

Commit messages need a type:

```bash
git commit -m "feat: add orders endpoint"     # ok
git commit -m "fix(auth): reject expired tokens"   # ok
git commit -m "stuff"                          # rejected
```

The CLI makes the initial commit (`chore: initial commit from create-prodforge`) with `--no-verify`.

Docker builds aren't affected: `husky` exits quietly without a `.git` directory, and the production install skips scripts.

**Why:** problems are caught before they reach CI, and conventional commits make changelogs and release tooling possible. If your team doesn't use conventional commits, generate with `--no-git-hooks` or delete `commitlint.config.js` and `.husky/commit-msg`.
