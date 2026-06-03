## What

Shared React UI library + TanStack Query API hooks. Used by `apps/app`, `apps/website`, visual editor. Published as `@intlayer/design-system`.

## Commands

```sh
bun run dev          # tsdown --watch
bun run build        # tsdown build
bun run test         # vitest run
bun run lint:fix     # biome lint --write
bun run typecheck    # tsc --noEmit
```

## Sub-exports (always use specific, not barrel)

| Import path                               | Contents                                         |
| ----------------------------------------- | ------------------------------------------------ |
| `@intlayer/design-system`                 | All UI components (barrel)                       |
| `@intlayer/design-system/<component>`     | Single component (preferred, tree-shakes better) |
| `@intlayer/design-system/api`             | TanStack Query hooks (mutations + queries)       |
| `@intlayer/design-system/hooks`           | Non-API React hooks                              |
| `@intlayer/design-system/providers`       | React context providers, `getQueryClient`        |
| `@intlayer/design-system/libs`            | Low-level helpers (e.g., `getAuthAPI`)           |
| `@intlayer/design-system/utils`           | Pure utilities (`cn`, class merging, etc.)       |
| `@intlayer/design-system/routes`          | Route path constants (`App_*_Path`)              |
| `@intlayer/design-system/tailwind-config` | Shared Tailwind config                           |
| `@intlayer/design-system/css`             | Source Tailwind CSS                              |
| `@intlayer/design-system/css-output`      | Pre-built CSS                                    |

Named component sub-exports (`/button`, `/modal`, `/form`, `/input`, `/select`, `/loader`, `/toaster`, `/accordion`, `/badge`, `/breadcrumb`, `/table`, `/tabs`, `/tag`, `/pagination`, `/popover`, `/dropdown`, `/avatar`, …) map 1-to-1 with `src/components/` folders.

## Structure

```
src/
  components/   One folder per component; each exports from index.ts
  api/
    hooks/      TanStack Query hooks per domain (project.ts, user.ts, …)
    useIntlayerAPI.ts   Hook that instantiates @intlayer/api clients
  hooks/        Reusable React hooks (no API calls)
  providers/    React providers (QueryClient, theme, etc.)
  libs/         Framework helpers (getAuthAPI, etc.)
  utils/        Pure functions (cn, formatters)
  routes.ts     All App_*_Path constants
  tailwind.config.ts
```

## API hooks conventions

- Queries: `useGetXxx(params?, options?)` — wraps `useAppQuery({ queryKey, queryFn, requireUser?, requireOrganization? })`
- Mutations: `useAddXxx()`, `useUpdateXxx()`, `useDeleteXxx()` — wraps `useMutation`; on success invalidates related query keys
- All hooks call `useProjectAPI()` / `useUserAPI()` / etc. (from `useIntlayerAPI`) to get typed fetch clients from `@intlayer/api`

## Adding new component

1. Create `src/components/MyComponent/index.ts` + implementation.
2. Add sub-export in `package.json#exports`: `"./my-component": { "types": "...", "import": "..." }`.
3. Re-export from `src/components/index.ts` for barrel.
4. Add to `tsdown.config.ts` entry points.

## Styling

Tailwind CSS v4. Use `cn()` from `@intlayer/design-system/utils`. Shared config: `src/tailwind.config.ts`.
