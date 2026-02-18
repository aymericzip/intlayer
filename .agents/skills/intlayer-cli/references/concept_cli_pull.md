---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Pull Dictionaries
description: Learn how to pull dictionaries from the Intlayer editor and CMS.
keywords:
  - Pull
  - Dictionaries
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Pull Distant Dictionaries

```bash
npx intlayer pull
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) is installed, you can also pull dictionaries from the editor. By this way, you can overwrite the content of your dictionaries for the need of your application.

## Aliases:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Arguments:

**Dictionary options:**

- **`-d, --dictionaries`**: Ids of the dictionaries to pull. If not specified, all dictionaries will be pulled.

  > Example: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Ids of the dictionaries to pull (alias for --dictionaries).

  > Example: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Configuration options:**

- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer build --no-cache`

**Environment variables options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

  > Example: `npx intlayer dictionary push --env production`

**Output options:**

- **`--new-dictionaries-path`** : Path to the directory where the new dictionaries will be saved. If not specified, the news dictionaries will be saved in the `./intlayer-dictionaries` directory of the project. If a `filePath` fields is specified in your dictionary content, the dictionaries will not consider this argument and will be saved in the specified `filePath` directory.

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging. (default to true using CLI)

## Example:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
