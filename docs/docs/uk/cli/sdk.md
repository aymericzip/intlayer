---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: SDK для CLI
description: Дізнайтеся, як використовувати Intlayer CLI SDK у власному коді.
keywords:
  - SDK
  - CLI
  - Intlayer
  - Програмне
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# SDK для CLI

CLI SDK — це бібліотека, яка дозволяє використовувати Intlayer CLI у вашому власному коді.

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

Приклад використання:

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
// ... (опущено)
pull();
// ... (опущено)
fill();
// ... (опущено)
build();
// ... (опущено)
listContentDeclaration();
// ... (опущено)
testMissingTranslations();
// ... (опущено)
docTranslate();
// ... (опущено)
docReview();
// ... (опущено)
transform();
// ... (опущено)
```
