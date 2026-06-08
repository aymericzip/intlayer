---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Test Missing Translations
description: Learn how to test and identify missing translations in your dictionaries.
keywords:
  - Test
  - Missing Translations
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Test missing translations

```bash
npx intlayer test
```

## Aliases:

- `npx intlayer content test`

This command analyzes your content declaration files to identify missing translations across all configured locales. It provides a comprehensive report showing which translation keys are missing for which locales, helping you maintain consistency across your multilingual content.

## Example output:

```bash
npx intlayer content test

Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## Arguments:

**Configuration options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file [envFile]`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project.

  > Example: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer build --no-cache`

**Preparation options:**

- **`--build`**: Build the dictionaries before pushing to ensure the content is up to date. True will force the build, false will skip the build, undefined will allow using the cache of the build.

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging. (default to true using CLI)

  > Example: `npx intlayer content test --verbose`

## Example:

```bash
npx intlayer content test --verbose
```

The output helps you quickly identify which translations need to be completed to ensure your application works properly across all configured locales.
