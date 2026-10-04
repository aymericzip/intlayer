## What

Typed fetch client wrapping every Intlayer backend endpoint. Published as `@intlayer/api`. Used by end-user CLI tools and wrapped by `@intlayer/design-system/api` (TanStack Query hooks) for `apps/app`.

## Commands

```sh
bun run dev          # tsdown --watch
bun run build        # tsdown build
bun run test         # vitest run
bun run lint:fix     # biome lint --write
```

## Structure

```
src/
  fetcher.ts            Base fetch wrapper (credentials, JSON, params serialization)
  getIntlayerAPI/       One file per backend domain
    project.ts          getProjectAPI() → { getProjects, addProject, … }
    dictionary.ts
    user.ts
    organization.ts
    ai.ts
    audit.ts
    … (one file per domain)
    index.ts            getIntlayerAPI(options) — composes all domain APIs
  distantDictionary/    Utilities for fetching remote dictionaries
  proxy.ts              Server-side proxy helpers
  types.ts              Shared type re-exports
  index.ts              Public surface
```

## Conventions

- Each domain file exports factory `getXxxAPI(authOptions, intlayerConfig?)` → plain object of async functions.
- `backendURL` resolved from `intlayerConfig?.editor?.backendURL` with fallback — never hardcode.
- All functions call `fetcher<ReturnType>(url, options)` from `../fetcher`.
- Request body → `body: Record<string, unknown>`. Query params → `params: Record<string, string | string[] | undefined>`.
- Request/response types come from `@intlayer/backend-contract` subpaths (`/responseData` for `ResponseData<T>` / `PaginatedResponse<T>`, `/<domain>` for every DTO). The package has no barrel.
- Every domain builds its URLs with `buildRouteURL` from a `RouteEndpoints` table checked with `satisfies` — tsc fails on any method/path drift. Runtime-import only `@intlayer/backend-contract/defineRoute` (zod-free).

## Adding new endpoint

1. Declare the route in `@intlayer/backend-contract` (see `apps/backend/CLAUDE.md`).
2. Add the function in `src/getIntlayerAPI/<domain>.ts`, using the domain's `RouteEndpoints` table + `buildRouteURL`.
3. Re-export from `src/index.ts` if consumers need direct access.
4. Add TanStack Query hook in `@intlayer/design-system/src/api/hooks/<domain>.ts`.
