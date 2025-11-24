---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI SDK
description: 了解如何在您自己的代码中使用 Intlayer CLI SDK。
keywords:
  - SDK
  - CLI
  - Intlayer
  - 编程式
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# CLI SDK

CLI SDK 是一个库，允许您在自己的代码中使用 Intlayer CLI。

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

使用示例：

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
