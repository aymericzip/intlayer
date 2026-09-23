---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: CLI - Upgrade Intlayer packages
description: Learn how to use the Intlayer CLI upgrade command to list every Intlayer package of your project or monorepo and upgrade them to the latest version.
keywords:
  - CLI
  - Upgrade
  - Update
  - Packages
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Add upgrade command"
author: aymericzip
---

# Upgrade Intlayer Packages

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

The `upgrade` command lists the Intlayer packages declared in every `package.json` of your project, including monorepo workspaces, and upgrades them to the latest published version. It runs the same package upgrade step as `intlayer init`, on its own.

## Arguments:

- `--project-root [projectRoot]` - Optional. The project root directory. By default, the command starts from the nearest `package.json` above the current working directory.
- `--dry-run` - Optional. Lists the packages and their target version without modifying any file.
- `--tag <tag>` - Optional. The npm dist-tag to upgrade to (for example `canary`). Defaults to `latest`.

## What it does:

1. **Lists the Intlayer packages** - Scans every `package.json` of the project (skipping `node_modules` and build outputs) for `intlayer`, `@intlayer/*`, `*-intlayer` and `intlayer-*` dependencies and dev dependencies.
2. **Fetches the target version** - Reads the version of the selected dist-tag (`latest` by default) of each package from the npm registry.
3. **Rewrites the ranges** - Updates each outdated range in place, keeping its operator (`^`, `~` or none) and the file indentation.
4. **Installs once** - Runs a single install from the workspace root (the nearest directory with a lock file), using the package manager that owns the lock file:

| Lock file                      | Command        |
| ------------------------------ | -------------- |
| `bun.lock` / `bun.lockb`       | `bun install`  |
| `pnpm-lock.yaml`               | `pnpm install` |
| `yarn.lock`                    | `yarn install` |
| `package-lock.json` or no lock | `npm install`  |

If there is no lock file, the `packageManager` field of `package.json` (for example `"bun@1.2.0"`) is used before falling back to npm.

Ranges that do not point to the registry, such as `workspace:*`, `file:`, `link:`, `catalog:` or git URLs, are never modified.

## Examples:

### List the available upgrades without applying them:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Upgrade to the canary release:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Example output:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Notes:

- Run the command from the root of your repository to upgrade every workspace. Run it from a workspace to upgrade that workspace only.
- Packages whose version cannot be fetched (offline, private or unpublished package) are listed and left unchanged.
- If the install fails, the upgraded ranges are kept in `package.json`. Run your package manager's install command manually.
