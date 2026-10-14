import { defineConfig } from 'vitepress';

const repo = 'https://github.com/Keyan-dev/create-prodforge';

export default defineConfig({
  title: 'create-prodforge',
  description:
    'Scaffold production-ready Node.js + TypeScript backends: Express, Fastify or Hono, Prisma, Drizzle or Mongoose, Docker, PM2, CI, auth, Redis and OpenTelemetry.',
  // Served from https://keyan-dev.github.io/prodforge-docs/
  base: '/prodforge-docs/',
  cleanUrls: true,
  lastUpdated: true,
  head: [['meta', { name: 'theme-color', content: '#e8590c' }]],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Features', link: '/features/' },
      { text: 'Reference', link: '/reference/cli' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'What is create-prodforge?', link: '/guide/what-is-it' },
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Presets', link: '/guide/presets' },
          { text: 'The generated project', link: '/guide/project-structure' },
          { text: 'Adding features later', link: '/guide/add' },
          { text: 'Versions, --latest and --dry-run', link: '/guide/versions' },
          { text: 'Deploying', link: '/guide/deploying' },
        ],
      },
      {
        text: 'Features',
        items: [
          { text: 'Overview', link: '/features/' },
          { text: 'Frameworks', link: '/features/frameworks' },
          { text: 'Databases', link: '/features/databases' },
          { text: 'Example users module', link: '/features/example-module' },
          { text: 'Config and env vars', link: '/features/config' },
          { text: 'Logging (Pino)', link: '/features/logging' },
          { text: 'Health, readiness and shutdown', link: '/features/health' },
          { text: 'Security defaults', link: '/features/security' },
          { text: 'Errors', link: '/features/errors' },
          { text: 'OpenAPI and Scalar', link: '/features/openapi' },
          { text: 'Redis and BullMQ', link: '/features/redis-bullmq' },
          { text: 'Authentication', link: '/features/auth' },
          { text: 'OpenTelemetry', link: '/features/otel' },
          { text: 'Testing (Vitest)', link: '/features/testing' },
          { text: 'Lint and format', link: '/features/lint' },
          { text: 'Git hooks', link: '/features/git-hooks' },
          { text: 'Docker', link: '/features/docker' },
          { text: 'PM2', link: '/features/pm2' },
          { text: 'GitHub Actions CI', link: '/features/ci' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'CLI flags', link: '/reference/cli' },
          { text: 'Environment variables', link: '/reference/env' },
          { text: 'Scripts', link: '/reference/scripts' },
          { text: '.prodforge.json', link: '/reference/prodforge-json' },
          { text: 'Why each dependency', link: '/reference/dependencies' },
          { text: 'FAQ', link: '/reference/faq' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: repo }],
    editLink: {
      pattern: 'https://github.com/Keyan-dev/prodforge-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Keyan',
    },
  },
});
