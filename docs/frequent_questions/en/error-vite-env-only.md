---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` & Intlayer – false positive `node:fs` denied error
description: Why vite-env-only reports a denied `node:fs` import with Intlayer + React-Router + Vite and what to do.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only denies `node:fs` with Intlayer

If you used the **vite-env-only** plugin (as mentioned in older React-Router v7 suggestions) and see:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…even though there’s **no `node:fs` in your client bundle**, this is a **false positive**.

## What causes it

`vite-env-only` runs a Babel-based check **early in the Vite graph resolution**, _before_:

- aliasing (including Intlayer’s browser vs node mappings),
- dead-code elimination,
- SSR vs client resolution,
- virtual modules like React-Router’s.

Intlayer packages contain code that can work on both Node and browser. At an _intermediate_ stage, a Node built-in like `node:fs` may appear in the graph **before** Vite removes it from the client build. `vite-env-only` sees that and errors immediately, even though the final bundle doesn’t contain it.

## React-Router and Server Modules

In the React-Router documentation about **server module conventions**  
(https://reactrouter.com/api/framework-conventions/server-modules), the team **explicitly suggests using `vite-env-only`** to prevent server-only imports from leaking into the client bundle.

However, those conventions rely on Vite’s aliasing, conditional exports, and tree-shaking to remove server-only code. While aliasing and conditional exports are already applied, some Node-based utilities are still present in packages like `@intlayer/core` at that stage (even though they are never imported on the client). Because tree-shaking has not run yet, those functions are still parsed by Babel, and `vite-env-only` detects their `node:` imports and raises a false positive — even though they are correctly purged from the final client bundle.

## How to fix / work around

### Recommended: Drop `vite-env-only`

Simply remove the plugin. In many cases you don’t need it — Vite already handles client vs server imports via its own resolution.

This fixes the false `node:fs` denial without changes to Intlayer.

### Validate the final build instead

If you still want to ensure no Node built-ins in the client, do it **after build**, e.g.:

```bash
pnpm build
grep -R "node:" dist/
```

If no results, your client bundles are clean.

## Summary

- `vite-env-only` can error on `node:fs` because it checks too early.
- Vite + Intlayer + React-Router’s server modules conventions normally remove server-only references correctly.
- Removing the plugin or verifying the _final output_ is usually the best solution.
