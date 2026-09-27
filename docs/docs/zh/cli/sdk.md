---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "Intlayer CLI SDK：在代码中运行命令"
description: "使用 CLI SDK 在自己的 Node.js 脚本中调用 build、push、pull 和 fill 等 Intlayer CLI 命令。"
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
author: aymericzip
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

```bash packageManager="bun"
bun add @intlayer/cli --dev
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
  extract,
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
extract();
// ...
```
