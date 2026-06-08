## What

Main user-facing package (`npm install intlayer`). Re-exports public API of `@intlayer/core`, `@intlayer/config`, `@intlayer/cli`. Provides `Dictionary` / `t()` / `useIntlayer` type surface. Entry point for `intlayer` CLI.

## Commands

```sh
bun run dev          # tsdown --watch
bun run build        # tsdown build
bun run test         # vitest run
bun run test:watch   # vitest (watch)
bun run typecheck    # tsc --noEmit
bun run lint:fix     # biome lint --write
```

## Structure

```
src/
  index.ts            Public API: re-exports from @intlayer/core + @intlayer/config + types
  routing/            URL/locale routing utilities (getLocalizedUrl, getPathWithoutLocale, …)
  cli/
    index.ts          CLI entry (delegates to @intlayer/cli)
    script.ts         Script runner
```

## Key exports

- `t()` — marks value as translation object (used in `.content.ts` files)
- `Dictionary` — TS type for content declaration files
- `Locales` enum + `LocalesValues` union — all supported locale codes
- `IntlayerConfig` — config type
- `getLocalizedUrl()`, `getPathWithoutLocale()` — routing helpers (framework-agnostic)
- `defaultLocale`, `locales` — resolved config values

## Content declaration pattern

```ts
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;

export default content;
```

Compiler (build-tool plugin) picks up `.content.ts` → emits dictionary JSON. At runtime, framework hooks (`useIntlayer` from `react-intlayer`, etc.) read compiled output.

## CLI

`intlayer` binary via `package.json#bin`. Delegates to `@intlayer/cli`:

- `intlayer build` — compile dictionaries
- `intlayer watch` — watch mode
- `intlayer push` / `intlayer pull` — CMS sync
- `intlayer translate` — AI translation
