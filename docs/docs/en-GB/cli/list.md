---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: List Content Declaration Files
description: Learn how to list all content declaration files in your project.
keywords:
  - List
  - Content Declaration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Add absolute output option to list command
  - version: 7.5.11
    date: 2026-01-06
    changes: Add JSON output option to list command
---

# List content declaration files

```bash
npx intlayer content list
```

## Aliases:

- `npx intlayer list`

This command displays all content declaration files in your project, showing their dictionary keys and file paths. It is useful for obtaining an overview of all your content files and verifying that they are properly discovered by Intlayer.

## Arguments:

- **`--json`**: Output the results as JSON instead of formatted text. Useful for scripting and programmatic access.

  > Example: `npx intlayer content list --json`

## Examples:

### List content declaration files:

```bash
npx intlayer content list
```

### Output as JSON:

```bash
npx intlayer content list --json
```

### Output as absolute paths:

```bash
npx intlayer content list --absolute
```

## Example output:

### Formatted output:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total content declaration files: 3
```

### JSON output:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

This command will output:

- A formatted list of all content declaration files with their keys and relative file paths
- The total count of content declaration files found

The output helps you verify that all your content files are properly configured and discoverable by the Intlayer system.
