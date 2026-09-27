---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK واجهة سطر أوامر Intlayer: تشغيل الأوامر من الشيفرة"
description: "استدعِ أوامر Intlayer مثل build وpush وpull وfill من سكربتات Node.js الخاصة بك باستخدام SDK واجهة سطر الأوامر."
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
author: aymericzip
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
