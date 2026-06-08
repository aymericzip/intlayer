## What

Fastify REST API for Intlayer CMS. `https://api.intlayer.org`. Consumed by `apps/app` (dashboard) and end-user CLI integrations.

## Commands

```sh
bun run dev          # watch mode (bun --watch ./src/index.ts)
bun run build        # tsdown build → dist/
bun run test         # vitest run
bun run lint         # biome lint
bun run lint:fix     # biome lint --write
bun run typecheck    # tsc --noEmit
```

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
4. **`src/routes/<domain>.routes.ts`** — exports `getXxxRoutes()` + Fastify plugin `xxxRouter`. Registers preHandlers, wires controllers to HTTP methods.

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
