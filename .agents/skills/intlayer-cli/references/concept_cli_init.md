---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Initialize Intlayer
description: Learn how to initialize Intlayer in your project.
keywords:
  - Initialize
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Add init command
---

# Initialize Intlayer

```bash
npx intlayer init
```

The `init` command automatically sets up Intlayer in your project by configuring necessary files and settings. It's the recommended way to get started with Intlayer.

## Aliases:

- `npx intlayer init`

## Arguments:

- `--project-root [projectRoot]` - Optional. Specify the project root directory. If not provided, the command will search for the project root starting from the current working directory.

## What it does:

The `init` command performs the following setup tasks:

1. **Validates project structure** - Ensures you're in a valid project directory with a `package.json` file
2. **Updates `.gitignore`** - Adds `.intlayer` to your `.gitignore` file to exclude generated files from version control
3. **Configures TypeScript** - Updates all `tsconfig.json` files to include Intlayer type definitions (`.intlayer/**/*.ts`)
4. **Creates configuration file** - Generates an `intlayer.config.ts` (for TypeScript projects) or `intlayer.config.mjs` (for JavaScript projects) with default settings
5. **Updates Vite config** - If a Vite configuration file is detected, adds the `vite-intlayer` plugin import
6. **Updates Next.js config** - If a Next.js configuration file is detected, adds the `next-intlayer` plugin import

## Examples:

### Basic initialization:

```bash
npx intlayer init
```

This will initialize Intlayer in the current directory, automatically detecting the project root.

### Initialize with custom project root:

```bash
npx intlayer init --project-root ./my-project
```

This will initialize Intlayer in the specified directory.

## Example output:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notes:

- The command is idempotent - you can run it multiple times safely. It will skip steps that are already configured.
- If a configuration file already exists, it won't be overwritten.
- TypeScript config files without an `include` array (e.g., solution-style configs with references) are skipped.
- The command will exit with an error if no `package.json` is found in the project root.
