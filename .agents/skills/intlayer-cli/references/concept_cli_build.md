---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Build Dictionaries
description: Learn how to build your Intlayer dictionaries from content declaration files.
keywords:
  - Build
  - Dictionaries
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Build Dictionaries

To build your dictionaries, you can run the commands:

```bash
npx intlayer build
```

or in watch mode

```bash
npx intlayer build --watch
```

This command will find your declaration content files as default as `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. And build the dictionaries in the `.intlayer` directory.

## Aliases:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Arguments:

- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

  > Example: `npx intlayer build --base-dir ./src`

- **`--env`**: Specify the environment (e.g., `development`, `production`). Useful in the case you use environment variables in your intlayer configuration file.

  > Example: `npx intlayer build --env production`

- **`--env-file`**: Provide a custom environment file to load variables from. Useful in the case you use environment variables in your intlayer configuration file.

  > Example: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Start command in parallel with the build.

  > Example: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Skip the prepare step.

  > Example: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer build --no-cache`
