## What

Runtime engine of Intlayer. Dictionary interpretation, content transpilation, locale resolution, markdown processing, message formatting. Framework-agnostic (no React/DOM). Published as `@intlayer/core`.

## Commands

```sh
bun run dev          # tsdown --watch
bun run build        # tsdown build
bun run test         # vitest run
bun run lint:fix     # biome lint --write
bun run typecheck    # tsc --noEmit
```

## Structure

```
src/
  interpreter/          Evaluates dictionary content nodes at runtime
    index.ts
    plugins/            Plugin interface for extending content types
  transpiler/           Compile-time: content declaration → dictionary JSON
  deepTransformPlugins/ Recursive transform plugins (t(), enumeration, condition, …)
  dictionaryManipulator/ Merge/patch helpers for dictionary documents
  formatters/           Output formatters (string, number, date)
  localization/         Locale matching, defaultLocale fallback, LTR/RTL
  markdown/             Markdown parsing + metadata extraction
  messageFormat/        ICU-like message format parsing
  utils/                Pure helpers shared across modules
  index.ts              Public surface (re-exports all sub-modules)
```

## Key concepts

- **Dictionary**: structured content object with `key` + `content` map. Nodes: translations (`t()`), enumerations, conditions, nested dicts, raw values.
- **Interpreter**: takes compiled dict + locale → resolves all nodes to final values. Plugins extend for new node types (e.g., React elements in `react-intlayer`).
- **Transpiler**: runs at build time (via babel/swc/vite/webpack plugins). Scans `.content.ts`, extracts dicts, emits JSON to `.intlayer/`.
- **Plugin system**: `IInterpreterPlugin<T, S, L>` in `src/interpreter/plugins/`. Framework packages augment via module augmentation to add framework-specific handlers.

## Adding new content node type

1. Define node shape in `@intlayer/types`.
2. Add `deepTransformPlugin` in `src/deepTransformPlugins/` — transforms node at transpile time.
3. Add interpreter plugin — resolves node at runtime.
4. Register plugin in relevant framework package via module augmentation.
