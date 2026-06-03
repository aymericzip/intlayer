Intlayer: open-source i18n monorepo. Bun + Turborepo. Ships npm packages (React, Next.js, Vue, Svelte, Angular…) + hosted CMS (backend + dashboard).

Sub-CLAUDE.md per workspace:

- `apps/backend/CLAUDE.md` — Fastify REST API
- `apps/app/CLAUDE.md` — TanStack Start CMS dashboard
- `packages/@intlayer/design-system/CLAUDE.md` — shared UI + TanStack Query hooks
- `packages/@intlayer/api/CLAUDE.md` — typed fetch client
- `packages/@intlayer/core/CLAUDE.md` — dictionary interpreter & transpiler
- `packages/intlayer/CLAUDE.md` — main user package + CLI

## Repo layout

```
apps/
  app/               TanStack Start dashboard (CMS UI)
  backend/           Fastify API server
  website/           Next.js marketing/docs site
  website-tanstack/  TanStack version of website
  showcase/          Showcase app

packages/
  intlayer/          Main user package + CLI entry point
  @intlayer/
    core/            Dictionary interpreter, transpiler, formatters
    config/          Config loader & types
    api/             Typed fetch client for backend REST API
    design-system/   Shared React UI + TanStack Query hooks
    types/           Shared TS types (no runtime)
    cli/             CLI implementation
    editor/          Visual editor core (framework-agnostic)
    editor-react/    React bindings for editor
    lsp/             LSP implementation
    mcp/             MCP server for IDE automation
    babel/swc/webpack/vite/  Build-tool compiler plugins

  react-intlayer/    React hooks & provider
  next-intlayer/     Next.js integration
  vue-intlayer/      Vue integration
  (one package per framework)

utils/
  ts-config/         Shared tsconfig base
  tsdown-config/     Shared tsdown build config

plugins/
  sync-json-plugin/  JSON sync plugin
  sync-po-plugin/    PO file sync plugin
```

## Commands (run from root)

Package manager: **Bun**.

```sh
bun install:packages      # install (excludes examples + website)
bun run build             # build all publishable packages + backend
bun run turbo build --filter=./apps/app
bun run turbo build --filter=./packages/react-intlayer
bun run dev               # watch-build all packages
bun run build:pick        # interactive pick
bun run test:pick
bun run lint              # biome check
bun run lint:fix
bun run check             # lint + format check
bun run check:fix
bun run typecheck         # tsc --noEmit (sequential)
bun run test              # vitest (concurrency=2)
```

## Content declaration flow

Users declare content in `.content.ts` files (co-located with components) using `t()` from `intlayer`. **Intlayer Compiler** (build-tool plugin) extracts at build time → emits JSON to `.intlayer/`. At runtime, `useIntlayer` (react-intlayer etc.) reads compiled dictionaries.

## Commit conventions

Format: `<type>(<scope>): <subject>` — enforced by commitlint + husky.

- **type**: `feat|fix|refactor|style|chore|doc|test|perf|build|ci`
- **scope**: package/app name (optional, lower-case)
- **subject**: imperative, no capital start, no trailing period
- Header ≤100 chars; body/footer lines ≤100 chars

## Tooling

- **Biome** — lint + format. `biome.json`: `indentStyle: space`, `indentWidth: 2`, `lineWidth: 80`.
- **tsdown** — build tool per package (`tsdown.config.ts`).
- **Turborepo** — build graph; `^build` = build deps first.
- New packages → add to `scripts/package-build-order.mjs`.
- Assume dev server running; if not, build manually.
