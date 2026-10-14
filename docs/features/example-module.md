# Example users module

```bash
--example      # default when a database is picked
--no-example
```

`src/modules/users` is a small CRUD API that proves the database wiring works end to end and shows the pattern for your own modules:

| Method | Path | Body |
|---|---|---|
| `GET` | `/users?limit=20&offset=0` | |
| `POST` | `/users` | `{ "email", "name" }` |
| `GET` | `/users/:id` | |
| `PATCH` | `/users/:id` | `{ "email"?, "name"? }` |
| `DELETE` | `/users/:id` | |

## How it's built

- **`users.schema.ts`**: Zod schemas for the request bodies and the `User` type. The same schemas validate requests and feed the [OpenAPI document](./openapi).
- **`users.repository.ts`**: data access behind a `UsersRepository` interface, implemented for your database.
- **`users.routes.ts`**: the HTTP routes for your framework.
- **`users.openapi.ts`**: the OpenAPI paths (with OpenAPI on).
- **`tests/users.test.ts`**: tests that swap the repository for an in-memory one, so they run without a database.

Errors follow the shared [error shape](./errors): a duplicate email is a 409, an unknown or malformed id a 404, an invalid body a 400.

## Removing it

Delete `src/modules/users`, `tests/users.test.ts` and the users lines in `src/app.ts` (and its migration if you haven't deployed it). Or generate with `--no-example`. You can bring it back later with `create-prodforge add example`.
