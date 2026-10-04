## What

Fastify REST API for Intlayer CMS. `https://api.intlayer.org`. Consumed by `apps/app` (dashboard) and end-user CLI integrations.

## Commands

```sh
bun run dev          # watch mode (bun --watch ./src/index.ts)
bun run build        # tsdown build → dist/
bun run test         # vitest run (node runtime — see note below)
bun run lint         # biome lint
bun run lint:fix     # biome lint --write
bun run typecheck    # tsc --noEmit
```

Unlike the other workspaces, `test` runs `bun vitest` (node) rather than
`bun --bun vitest`. Under `bun --bun`, Vite's SSR transform drops zod's
re-exported `z` namespace (`import * as z` + `export { z }` in its ESM entry),
so `import { z } from 'zod'` — and `'zod/v4'` — resolve to `undefined` and every
validation schema throws at import time. Plain bun and node both handle the
module correctly; only the test transform is affected. Keep the flag off until
that is fixed upstream.

## Path aliases (tsconfig)

| Alias            | Resolves to         |
| ---------------- | ------------------- |
| `@controllers/*` | `src/controllers/*` |
| `@services/*`    | `src/services/*`    |
| `@routes/*`      | `src/routes/*`      |
| `@middlewares/*` | `src/middlewares/*` |
| `@schemas/*`     | `src/schemas/*`     |
| `@emails/*`      | `src/emails/*`      |
| `@utils/*`       | `src/utils/*`       |
| `@logger`        | `src/logger/index`  |
| `@/*`            | `src/*`             |

## Architecture

### Four-layer pattern (per domain)

1. **`src/schemas/<domain>.schema.ts`** — Mongoose schema + model. Types in `src/types/`.
2. **`src/services/<domain>.service.ts`** — pure DB ops; no HTTP types, no `request`/`reply`.
3. **`src/controllers/<domain>.controller.ts`** — reads `request.session`, calls services + `hasPermission`, returns via `formatResponse`/`formatPaginatedResponse`, handles errors via `ErrorHandler`.
4. **`src/routes/<domain>.routes.ts`** — exports Fastify plugin `xxxRouter`. Registers preHandlers, wires controllers to HTTP methods.

### Contract routes & OpenAPI

- Every route is declared in `@intlayer/backend-contract` (zod/mini schemas, one file per domain) and registered with `registerContractRoutes(fastify, contract, handlers)` (`src/utils/contract/`): per-route zod validation, a handler required for every route. An entry can be `{ handler, options }` (rate limit `config`, `bodyLimit`, hooks) or `null` (left unregistered: conditional/cloud-only routes, or registration split around a scoped plugin).
- Only the `.well-known` OAuth discovery documents and the Stripe webhook (raw body) stay plain Fastify routes.
- Validation failures answer the backend envelope (`INVALID_REQUEST_BODY`, 400), not Fastify's default payload. Responses are never altered: outside production they are checked against the contract and drift is logged.
- Swagger UI at `/docs`, spec at `/docs/json`. `registerOpenAPI(app)` must be called directly on `app` (not `app.register`) before the routers.

### Mongoose vs zod (wire types)

- The contract owns the **wire** shape (zod → `z.output` types: ids and dates as strings). The backend owns the **DB** shape (mongoose schemas + `src/types`).
- `src/utils/contract/wireCompatibility.ts` asserts, per entity, `Serialized<BackendType>` (ObjectId/Date → string, functions dropped) satisfies the contract type: `bun run typecheck` fails on drift.
- The contract may only depend on `@intlayer/types`. Types owned by `@intlayer/engine` or `@intlayer/ai` (which depend on `@intlayer/api` → contract) are mirrored in the contract and asserted equal/assignable in `wireCompatibility.ts`.

### Package

`@intlayer/backend` is **private** and exposes nothing (no `export.ts`, no type build): clients, the dashboard and the design system import every API type from `@intlayer/backend-contract`.

`@intlayer/backend-contract` has no barrel: import from the domain file's subpath (`@intlayer/backend-contract/user`, `/project`, `/defineRoute`…).

### Migrating / adding a route

1. Add it (schemas + named types) to the domain file of `@intlayer/backend-contract`.
2. Give its handler in the domain router (`registerContractRoutes`); type the controller request with `ContractRequest<XxxRoutes['name']>`.
3. Add the client function in `@intlayer/api` using its `RouteEndpoints` table (tsc rejects any method/path drift).
4. New entity? add an `AssertWire` line in `wireCompatibility.ts`.

### Auth & session

- **better-auth**: sessions, magic links, passkeys, 2FA, SSO. Init: `src/utils/auth/getAuth.ts`.
- **OAuth2** (`@node-oauth/oauth2-server`): access-key flows — `src/middlewares/oAuth2.middleware.ts`.
- Both populate `request.session: Session | null` (`src/types/session.types.ts`).
- `SessionContext` carries `permissions`, `allowedEnvironmentIds`, `allowedLocales`.

### RBAC (`src/utils/permissions.ts`)

- **Roles**: `user`, `admin`, `org_admin`, `org_user`, `project_admin`, `project_user`, `project_reviewer`
- **Permissions**: `resource:action` — e.g., `project:write`, `dictionary:read`
- **Resources**: `organization`, `project`, `dictionary`, `tag`, `user`
- **Actions**: `read`, `write`, `admin`
- Call `hasPermission(session, 'resource:action')` in controllers only, never services.

### Response helpers (`src/utils/responseData.ts`)

Never call `reply.send()` with raw data. Always use:

```ts
reply.send(formatResponse({ data, message }));
reply.send(formatPaginatedResponse({ data, page, pageSize, totalPages }));
ErrorHandler.handleGenericErrorResponse(reply, "ERROR_CODE");
ErrorHandler.handleAppErrorResponse(reply, appError);
```

`ResponseData<T>` shape: `{ success, status, data, message?, error? }`.

### Error codes

All error strings in `src/utils/errors/errorCodes.ts`. Throw `new AppError('ERROR_CODE')` or `new GenericError('ERROR_CODE')` from services; controllers catch → delegate to `ErrorHandler`.

### Mapper pattern

Raw Mongoose docs → API types before returning. Each domain: `src/utils/mapper/<domain>.ts` with `mapXxxToAPI()` / `mapXxxsToAPI()`. Converts `ObjectId` → `string`, strips internal fields.

### i18n in backend

Uses `fastify-intlayer` for localized error messages. Use `t('key', locale)` in controllers when locale-aware strings needed.
