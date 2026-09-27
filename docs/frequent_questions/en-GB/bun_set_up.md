---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: I get module not found error when using bun
description: 'Fix the "Cannot find package" error when running Intlayer with Bun, caused by how Bun scopes require(), with the configuration that solves it.'
keywords:
  - bun
  - module not found
  - intlayer
  - configuration
  - package manager
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
---

# I get module not found error when using bun

## Problem Description

When using bun, you might encounter an error like this:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Reason

Intlayer uses `require` internally. And bun scopes the require function to resolve only the packages of the `@intlayer/config` package, instead of the whole project.

## Solution

### Provide the `require` function in the configuration

```ts
const config: IntlayerConfig = {
  build: {
    require,
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require,
});

export default configuration;
```
