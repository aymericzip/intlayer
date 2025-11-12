---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: I get an error related to sub-packages @intlayer/*
description: Fix error related to sub-packages @intlayer/*.
keywords:
  - @intlayer/*
  - sub-packages
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# I get an error related to sub-packages `@intlayer/*`

This issue usually arises after updating the Intlayer packages.

Example of error message:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Reason

Base packages such as `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` reuse the same sub-packages like `@intlayer/config`, `@intlayer/core`, `@intlayer/types` to avoid code duplication.

Between two versions, the exports of the sub-packages are not guaranteed to be the same. To limit this problem, intlayer pins the version of the sub-packages to the version of the main package.

> Ex: `intlayer@1.0.0` uses `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Except for `@intlayer/swc`), `@intlayer/*` sub-packages are not meant to be used directly. Therefore, we recommend not installing them directly.

## Resolution

1. Ensure the versions of the main package and the sub-packages are the same.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Incorrect version, it should be 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Try removing the lockfile and node_modules folder, then reinstall the dependencies.

Sometimes, the package manager retains an old version of the sub-packages in the lockfile cache. To resolve this, you can try removing the lockfile and node_modules folder, then reinstall the dependencies.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Check global installation

We recommend installing `intlayer` or `intlayer-cli` globally to access the CLI commands. If the global version differs from the local version, the package manager may use the incorrect version.

**Check if a package is installed globally**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Fix potential global dependency conflicts**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Try cleaning the cache

In some environments such as Docker, GitHub Actions, or web hosting platforms like Vercel, a cache may be present. You can try clearing the cache and retry the installation.

You can also try clearing the cache of your package manager with the following command:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
