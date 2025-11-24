---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# List content declaration files

```bash
npx intlayer content list
```

## Aliases:

- `npx intlayer list`

This command displays all content declaration files in your project, showing their dictionary keys and file paths. It is useful for obtaining an overview of all your content files and verifying that they are properly discovered by Intlayer.

## Example:

```bash
npx intlayer content list
```

## Example output:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total content declaration files: 3
```

This command will output:

- A formatted list of all content declaration files with their keys and relative file paths
- The total count of content declaration files found

The output helps you verify that all your content files are properly configured and discoverable by the Intlayer system.
