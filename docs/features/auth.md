# Authentication

```bash
--auth none          # default
--auth jwt
--auth better-auth   # used by the full preset
```

Auth needs a database to store accounts, so it's skipped (with a notice) when `--db none`. Both options give you a protected `GET /auth/me` example route and tests, and work with every framework and database.

**Why none by default:** the right auth depends on your product (sessions or tokens, your own accounts or an identity provider), and a wrong default is worse than none.

## JWT

A small implementation you can read in one sitting, in `src/modules/auth` and `src/lib/jwt.ts`:

| Method | Path | Body | Returns |
|---|---|---|---|
| `POST` | `/auth/register` | `{ "email", "password" }` | access + refresh tokens |
| `POST` | `/auth/login` | `{ "email", "password" }` | access + refresh tokens |
| `POST` | `/auth/refresh` | `{ "refreshToken" }` | new tokens |
| `GET` | `/auth/me` | `Authorization: Bearer <access token>` | the account |

```bash
curl -X POST localhost:3000/auth/register -H 'content-type: application/json' \
  -d '{"email":"ada@example.com","password":"correct horse battery"}'
```

- Tokens are signed with **`jose`** (HS256). Each has a `type` claim so a refresh token can't be used as an access token.
- Passwords (8 to 200 characters) are hashed with Node's built-in **scrypt**, so there's no native dependency to compile.
- Protect your own routes with the `requireAuth` middleware from the auth module.
- Accounts are stored in an `accounts` table (or collection), separate from the example users.

| Env var | Default | |
|---|---|---|
| `JWT_SECRET` | placeholder | at least 32 characters: `openssl rand -base64 48` |
| `JWT_ACCESS_TTL` | `15m` | access token lifetime |
| `JWT_REFRESH_TTL` | `7d` | refresh token lifetime |

::: warning Refresh tokens can't be revoked
They're stateless and stay valid until they expire. Keep `JWT_REFRESH_TTL` short, add a denylist, or use Better Auth if you need sessions you can end.
:::

## Better Auth

[Better Auth](https://www.better-auth.com) is a full auth library with sessions stored in your database. It's configured in `src/lib/auth.ts` and mounted at `/api/auth`:

| Method | Path | Body |
|---|---|---|
| `POST` | `/api/auth/sign-up/email` | `{ "email", "password", "name" }` |
| `POST` | `/api/auth/sign-in/email` | `{ "email", "password" }` |
| `GET` | `/api/auth/get-session` | |
| `POST` | `/api/auth/sign-out` | |
| `GET` | `/auth/me` | example protected route |

- **Browsers** use the session cookie. **Other clients** use `Authorization: Bearer <token>` with the token from the `set-auth-token` response header (the bearer plugin).
- Its tables are prefixed `auth_` so they don't clash with your own `users`.
- For a browser app on another origin, list it in `CORS_ORIGIN`; Better Auth trusts those origins too. In production, requests from browsers must come from a trusted origin.
- On MongoDB it uses the driver directly with transactions off, since the compose `mongo` service isn't a replica set.

| Env var | Default | |
|---|---|---|
| `BETTER_AUTH_SECRET` | placeholder | at least 32 characters: `openssl rand -base64 48` |
| `BETTER_AUTH_URL` | `http://localhost:3000` | the public URL of the API |

Better Auth has plugins for OAuth providers, two-factor, organizations and more; see its docs.

## Which one?

| | JWT | Better Auth |
|---|---|---|
| Code you own | all of it, under 300 lines | configuration of a library |
| Sessions you can revoke | no | yes |
| Browser cookies | no | yes |
| Social login, 2FA | build it yourself | plugins |
| Extra dependency | `jose` | `better-auth` |
