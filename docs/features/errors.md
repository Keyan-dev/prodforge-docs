# Errors

Every failure, in every framework, returns the same JSON shape:

```json
{
  "error": {
    "message": "Validation failed",
    "details": { "fieldErrors": { "email": ["Invalid email address"] } },
    "requestId": "6f1c2a9e-..."
  }
}
```

The central error handler in `src/middleware/error-handler.ts` maps errors to statuses:

| Thrown | Status | Message |
|---|---|---|
| `new HttpError(404, 'User not found')` | the given status | the given message (plus optional `details`) |
| a `ZodError` (invalid body or query) | 400 | `Validation failed`, with flattened field errors |
| a framework error marked safe to show (bad JSON, body too large) | its status | its message |
| anything else | 500 | `Internal Server Error` (the real error is logged, never sent) |

Unknown routes return 404 in the same shape. Only 5xx errors are logged at `error` level.

## Using it

Throw from any handler, including `async` ones:

```ts
import { HttpError } from '../../middleware/error-handler';

const user = await repo.findById(id);
if (!user) throw new HttpError(404, 'User not found');
```

```ts
const body = CreateOrderSchema.parse(req.body);  // a ZodError becomes a 400
```

The `requestId` matches the `X-Request-Id` response header and the request's log lines, so a user can quote it in a bug report.
