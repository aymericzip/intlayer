---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "Intlayer CLI SDK: komutları koddan çalıştırın"
description: "CLI SDK ile build, push, pull ve fill gibi Intlayer CLI komutlarını kendi Node.js betiklerinizden çağırın."
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
author: aymericzip
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

```bash packageManager="bun"
bun add @intlayer/cli --dev
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
