---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI SDK
description: Узнайте, как использовать Intlayer CLI SDK в вашем собственном коде.
keywords:
  - SDK
  - CLI
  - Intlayer
  - Программирование
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# CLI SDK

CLI SDK — это библиотека, которая позволяет использовать Intlayer CLI в вашем собственном коде.

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

Пример использования:

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
