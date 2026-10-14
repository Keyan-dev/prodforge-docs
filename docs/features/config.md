# Config and env vars

Every variable the app reads is declared in **`src/config/env.ts`** with a Zod schema and validated **once, at startup**. If anything is missing or invalid, the app prints a readable error and exits before it starts listening:

```
Invalid environment variables:
✖ Invalid URL
  → at DATABASE_URL
```

Use the typed `env` object everywhere instead of `process.env`:

```ts
import { env } from './config/env';

app.listen(env.PORT);   // a number, not a string
```

## Where values come from

- **Development:** `pnpm dev` and `pnpm start` load `.env` with Node's built-in `--env-file-if-exists` flag. No `dotenv` dependency.
- **Tests:** Vitest loads `.env.example` with `NODE_ENV=test` and silent logs, so tests run with no setup.
- **Production:** real environment variables from your platform, compose's `environment`, or PM2's `env`.

`.env.example` lists every variable with a comment and a working local default. Each feature adds only the variables it needs, so the schema only lists what your project uses. See the full list in [Environment variables](/reference/env).

## Adding your own

Add a field to the schema; the type follows:

```ts
const EnvSchema = z.object({
  // ...
  STRIPE_API_KEY: z.string().startsWith('sk_'),
  FEATURE_FLAGS: z.string().default('').transform((s) => s.split(',').filter(Boolean)),
});
```

Then add it to `.env.example` so the next developer knows about it.

**Why Zod:** it's already used for request validation and OpenAPI, so one dependency covers three jobs.
