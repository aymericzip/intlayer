---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI SDK
description: Intlayer CLI SDKを自分のコードで使用する方法を学びます。
keywords:
  - SDK
  - CLI
  - Intlayer
  - プログラム的
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# CLI SDK

CLI SDKは、Intlayer CLIを自分のコード内で使用できるライブラリです。

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

使用例:

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
