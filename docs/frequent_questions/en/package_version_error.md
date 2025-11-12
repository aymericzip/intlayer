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

This problem usually occurs after an update of the Intlayer packages.

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

Base packages as `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` are reusing the same sub-packages as `@intlayer/config`, `@intlayer/core`, `@intlayer/types` to avoid code duplication.

Between two versions, the exports of the sub-packages are not guaranteed to be the same. To limit this problem, intlayer pins the version of the sub-packages to the version of the main package.

> Ex: `intlayer@1.0.0` uses `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Except for `@intlayer/swc`), `@intlayer/*` sub-packages are not meant to be used directly. So we recommend to do not install them directly.

## Resolution

1. Ensure the versions of the main package and the sub-packages are the same.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Wrong version, it should be 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Try to remove the lockfile and node_modules folder and reinstall the dependencies.

Sometimes, the package manager keep an old version of the sub-packages in the lockfile in cache. To fix this, you can try to remove the lockfile and node_modules folder and reinstall the dependencies.

```bash
rm -rf package-lock.json node_modules

npm install # or yarn install or pnpm install or bun pm install
```

3. Check global installation

We recommend to install `intlayer` or `intlayer-cli` globally to access the CLI commands. If the global version is not the same as the local version, the package manager may consider the wrong version.

**Check if a package is installed globally**

```bash
npm list -g --depth=3 | grep intlayer
```

```bash
yarn global list --depth=3 | grep intlayer
```

```bash
pnpm list -g --depth=3 | grep intlayer
```

```bash
bun pm ls -g --depth=3 | grep intlayer
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

```bash
bun pm rm -g intlayer intlayer-cli
```

5. Try cleaning the cache

For some environments as docker, github actions, or web hosting platforms as Vercel, a cache can be present. You can try to clean the cache and retry the installation.

You can also try to clean the cache of your package manager with the following command:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```

```bash
bun pm cache clean
```

6. Try removing the `.intlayer` folder

Intlayer cache a bundled version of his version itself in the `.intlayer/cache` folder.

This cache can be corrupted if the version of intlayer is not the same as the version of the cached version.

You can try to remove the `.intlayer` folder and retry the build.

```bash
rm -rf .intlayer
```
