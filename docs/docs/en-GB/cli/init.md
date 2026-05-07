---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Initialise Intlayer
description: Learn how to initialise Intlayer in your project.
keywords:
  - Initialise
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Added --no-gitignore option"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Added init command content"
---

# Initialise Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

The `init` command automatically configures Intlayer for your project by creating necessary files and settings. This is the recommended way to start with Intlayer.

## Aliases:

- `npx intlayer init`

## Arguments:

- `--project-root [projectRoot]` - Optional. Specify the project's root directory. If not provided, the command will search for the project root starting from the current working directory.
- `--no-gitignore` - Optional. Skips the automatic update of the `.gitignore` file. If this flag is set, `.intlayer` will not be added to `.gitignore`.

## What it does:

The `init` command performs the following setup tasks:

1. **Validates project structure** - Ensures you are in a valid project directory with a `package.json` file.
2. **Updates `.gitignore`** - Adds `.intlayer` to your `.gitignore` file to exclude generated files from version control (can be skipped with `--no-gitignore`).
3. **Configures TypeScript** - Updates any `tsconfig.json` files to include the Intlayer type definitions (`.intlayer/**/*.ts`).
4. **Creates configuration file** - Generates `intlayer.config.ts` (for TypeScript projects) or `intlayer.config.mjs` (for JavaScript projects) with default settings.
5. **Updates Vite configuration** - If a Vite config file is detected, it adds the import for the `vite-intlayer` plugin.
6. **Updates Next.js configuration** - If a Next.js config file is detected, it adds the import for the `next-intlayer` plugin.

## Examples:

### Basic initialisation:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

This initialises Intlayer in the current directory, with automatic project root detection.

### Initialisation with a custom project root:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

This initialises Intlayer in the specified directory.

### Initialisation without updating .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

This will set up all configuration files but will not modify your `.gitignore` file.

## Output Example:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notes:

- The command is idempotent — you can safely run it multiple times. Already configured steps will be automatically skipped.
- If a configuration file already exists, it will not be overwritten.
- TypeScript configurations without an `include` array (e.g. solution-style configurations with references) are skipped.
- The command stops with an error if no `package.json` is found in the project root.
