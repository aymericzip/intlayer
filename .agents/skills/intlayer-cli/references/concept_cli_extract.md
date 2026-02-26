---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Extract strings
description: Learn how to extract strings from your components into a .content file close to the component.
keywords:
  - Extract
  - Components
  - Migration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Extract strings

```bash
npx intlayer extract
```

This command analyzes your code files to extract strings from components into a .content file close to the component. It supports interactive file selection or specific file targeting.

## Aliases:

- `npx intlayer ext`

## Arguments:

**File selection options:**

- **`-f, --file [files...]`**: List of specific files to extract. If not provided, the CLI will scan for matching files (`**/*.{tsx,jsx,vue,svelte,ts,js}`) and prompt you to select which ones to extract.

  > Example: `npx intlayer extract -f src/components/MyComponent.tsx`

**Output options:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Directory to save the generated content declaration files.

  > Example: `npx intlayer extract -o src/content`

- **`--code-only`**: Only extract the component code (do not write content declaration).

  > Example: `npx intlayer extract --code-only`

- **`--declaration-only`**: Only generate content declaration (do not rewrite component).

  > Example: `npx intlayer extract --declaration-only`

**Configuration options:**

- **`--base-dir`**: Specify the base directory for the project.
- **`--env`**: Specify the environment.
- **`--env-file`**: Provide a custom environment file.
- **`--verbose`**: Enable verbose logging.

**Required plugins:**

The extract command works without additional plugin on TypeScript / JSX files. However, it requires the following plugins to be installed for Vue and Svelte projects:

- **`@intlayer/vue-transformer`**: For Vue files.
- **`@intlayer/svelte-transformer`**: For Svelte files.
