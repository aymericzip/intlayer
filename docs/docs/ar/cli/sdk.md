---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: SDK سطر الأوامر
description: تعلّم كيفية استخدام SDK سطر أوامر Intlayer في كودك الخاص.
keywords:
  - SDK
  - CLI
  - Intlayer
  - برمجي
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# SDK سطر الأوامر

SDK سطر الأوامر هو مكتبة تتيح لك استخدام سطر أوامر Intlayer في كودك الخاص.

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

مثال على الاستخدام:

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
