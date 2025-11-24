---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Manage Configuration
description: Learn how to get and push your Intlayer configuration to the CMS.
keywords:
  - Configuration
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Manage Configuration

## Get Configuration

The `configuration get` command retrieves the current configuration for Intlayer, particularly the locale settings. This is useful for verifying your setup.

```bash
npx intlayer configuration get
```

## Aliases:

- `npx intlayer config get`
- `npx intlayer conf get`

## Arguments:

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project.
- **`--verbose`**: Enable verbose logging for debugging. (default to true using CLI)
- **`--no-cache`**: Disable the cache.

## Push Configuration

The `configuration push` command uploads your configuration to the Intlayer CMS and editor. This step is necessary to enable the use of remote dictionaries in the Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

## Aliases:

- `npx intlayer config push`
- `npx intlayer conf push`

## Arguments:

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project.
- **`--verbose`**: Enable verbose logging for debugging. (default to true using CLI)
- **`--no-cache`**: Disable the cache.

By pushing the configuration, your project is fully integrated with the Intlayer CMS, enabling seamless dictionary management across teams.
