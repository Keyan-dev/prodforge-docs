# prodforge-docs

Usage documentation for [create-prodforge](https://github.com/Keyan-dev/create-prodforge), a CLI that scaffolds production-ready Node.js + TypeScript backends.

**Read it at https://keyan-dev.github.io/prodforge-docs/**

## Working on the docs

```bash
pnpm install
pnpm dev        # http://localhost:5173/prodforge-docs/
pnpm build      # static site in docs/.vitepress/dist
pnpm preview
```

Pages are Markdown files in `docs/`, built with [VitePress](https://vitepress.dev). The sidebar is in `docs/.vitepress/config.mts`.

- `docs/guide/`: getting started, presets, project layout, `add`, deploying
- `docs/features/`: one page per feature of the generated projects
- `docs/reference/`: CLI flags, env vars, scripts, `.prodforge.json`, dependencies, FAQ

The source of truth is the create-prodforge repo (`README.md`, `docs/decisions.md` and `src/features/`). When a feature changes there, update its page here.

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## License

MIT
