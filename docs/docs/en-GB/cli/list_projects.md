---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: List Intlayer Projects
description: Learn how to list all Intlayer projects in a directory or git repository.
keywords:
  - List
  - Projects
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Add absolute output option to list projects command
---

# List Intlayer Projects

```bash
npx intlayer projects list
```

This command searches for and lists all Intlayer projects by finding directories that contain Intlayer configuration files. It is useful for discovering all Intlayer projects in a monorepo, workspace or git repository.

## Aliases:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Arguments:

- **`--base-dir [path]`**: Specify the base directory to search from. Defaults to the current working directory.

  > Example: `npx intlayer projects list --base-dir /path/to/workspace`

  > Example: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Search from the git root directory rather than the base directory. This is useful for finding all Intlayer projects in a monorepo or git repository.

  > Example: `npx intlayer projects list --git-root`

- **`--json`**: Output the results as JSON instead of formatted text. Useful for scripting and programmatic access.

  > Example: `npx intlayer projects list --json`

- **`--absolute`**: Output the results as absolute paths instead of relative paths.

  > Example: `npx intlayer projects list --absolute`

## How it works:

The command searches for Intlayer configuration files in the specified directory (or the git root if `--git-root` is used). It looks for the following configuration file patterns:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Each directory containing one of these files is considered an Intlayer project and will be listed in the output.

## Examples:

### List projects in current directory:

```bash
npx intlayer projects list
```

### List projects in a specific directory:

```bash
npx intlayer projects list --base-dir ./packages
```

### List all projects in the git repository:

```bash
npx intlayer projects list --git-root
```

### Using the shortcut alias:

```bash
npx intlayer pl --git-root
```

### Output as JSON:

```bash
npx intlayer projects list --json
```

## Example output:

### Formatted output:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON output:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Use cases:

- **Monorepo management**: Discover all Intlayer projects in a monorepo structure
- **Project discovery**: Find all Intlayer-enabled projects in a workspace
- **CI/CD**: Verify Intlayer projects in automated workflows
- **Documentation**: Generate documentation that lists all projects using Intlayer

The output provides absolute paths to each project directory, making it easy to navigate to them or to script operations across multiple Intlayer projects.
