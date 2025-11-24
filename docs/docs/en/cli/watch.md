---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Watch Dictionaries

```bash
npx intlayer watch
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
