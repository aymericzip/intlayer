---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Watch Dictionaries
description: Learn how to watch for changes in your content declaration files and automatically build dictionaries.
keywords:
  - Watch
  - Dictionaries
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# Watch Dictionaries

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

This command will watch for changes in your content declaration files and build the dictionaries in the `.intlayer` directory.
This command is the equivalent of `npx intlayer build --watch --skip-prepare`.

## Aliases:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Arguments:

- **`--with`**: Start command in parallel with the watch.

> Example: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: Run the command in every Intlayer project of the monorepo (or only the current one when run from a project directory). Per-project credentials can be injected via `INTLAYER_PROJECT_CREDENTIALS`, a JSON map of project path to `{ "clientId", "clientSecret" }`.

> Example: `npx intlayer watch --ci`
