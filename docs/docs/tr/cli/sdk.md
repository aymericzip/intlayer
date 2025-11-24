---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI SDK
description: Intlayer CLI SDK'yı kendi kodunuzda nasıl kullanacağınızı öğrenin.
keywords:
  - SDK
  - CLI
  - Intlayer
  - Programmatik
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# CLI SDK

CLI SDK, Intlayer CLI'yı kendi kodunuzda kullanmanızı sağlayan bir kütüphanedir.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Kullanım örneği:

```ts
import {
  push,
  pull,
  fill,
  build,
  listContentDeclaration,
  testMissingTranslations,
  docTranslate,
  docReview,
  transform,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
listContentDeclaration();
// ...
testMissingTranslations();
// ...
docTranslate();
// ...
docReview();
// ...
transform();
// ...
```
