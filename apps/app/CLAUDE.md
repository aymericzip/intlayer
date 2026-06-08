## What

Intlayer CMS dashboard. TanStack Start (SSR) + React. `https://app.intlayer.org`. Manages projects, dictionaries, environments, members, translations, access keys.

## Commands

```sh
bun run dev          # vite dev --port 3000
bun run build        # vite build
bun run test         # vitest run
bun run lint         # biome lint
bun run lint:fix     # biome lint --write
bun run typecheck    # tsc --noEmit
```

## Path aliases (`imports` in package.json)

| Alias           | Resolves to        |
| --------------- | ------------------ |
| `#/*`           | `src/*`            |
| `#components/*` | `src/components/*` |
| `#layouts/*`    | `src/layouts/*`    |
| `#utils/*`      | `src/utils/*`      |
| `#hooks/*`      | `src/hooks/*`      |
| `#assets/*`     | `src/assets/*`     |

## Routing (TanStack Start / file-based)

Route tree auto-generated → `src/routeTree.gen.ts`. Never edit manually.

```
src/routes/
  __root.tsx                       Root layout (providers, head tags)
  {-$locale}/                      Locale segment (optional prefix)
    route.tsx                      Locale layout (IntlayerProvider)
    page.tsx                       Landing / home
    _dashboard/                    Authenticated dashboard shell
      route.tsx                    Dashboard layout (sidebar, navbar, auth barrier)
      index.tsx                    Default dashboard page
      projects.tsx / organization.tsx / profile.tsx / …
      _admin/                      Admin-only routes
      _editor/                     Dictionary editor routes
    _other/                        Unauthenticated pages (auth, 404, …)
  demo.tsx
  sitemap[.]xml.ts
```

Each route file: `export const Route = createFileRoute(...)({ ... })`. `head()`, `loader()`, `beforeLoad()` declared in same file.

## Content files (i18n)

Every route + most components have sibling `.content.ts` (same folder, same base name):

```
projects.tsx          ← component
projects.content.ts   ← translations via t()
```

Use `useIntlayer('key')` (client) or `getIntlayer('key', locale)` (server/SSR).

## State management

- **Server state**: TanStack Query via hooks from `@intlayer/design-system/api` (`useGetProjects`, `useUpdateProject`, …).
- **Session**: `useSession()` from `@intlayer/design-system/api` → `session`, `user`, `organization`, `project`, `environment`.
- **UI state**: `useSyncExternalStore`-based observables (e.g., `useDashboardRightPanel`).
- No Redux/Zustand — local state + TanStack Query.

## Component conventions

- Import UI from `@intlayer/design-system/<component-name>` (granular, not barrel).
- API hooks from `@intlayer/design-system/api`.
- Route constants from `@intlayer/design-system/routes`.
- Utils (`cn`, etc.) from `@intlayer/design-system/utils`.
- Prefer existing design-system components before writing custom ones.
- Icons: `lucide-react`.

## Auth & access control

- Protected routes: `<AuthenticationBarrier accessRule={...}>`.
- `src/utils/auth.tsx` exports `sessionQueryOptions` + `validateAuth()` — used in route `beforeLoad()`.
- `validateAuth` calls `accessValidation()` from `#components/Auth/AuthenticationBarrier/accessValidation`.

## Electron / Tauri

App also builds as desktop. `src/electron.d.ts`, `src/preload/`, `src/renderer/` support this. `tauri:dev` / `tauri:build` scripts exist, separate from web dev flow.
