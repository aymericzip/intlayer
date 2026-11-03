---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "Intlayer CLI SDK: הרצת פקודות מתוך קוד"
description: "קרא לפקודות Intlayer CLI כגון build, push, pull ו-fill באופן תכנותי מתוך סקריפטי Node.js משלך באמצעות ה-CLI SDK."
keywords:
  - SDK
  - ערכת פיתוח
  - CLI
  - Intlayer
  - Programmatic
  - תכנותי
slugs:
  - doc
  - concept
  - cli
  - sdk
author: aymericzip
---

# ערכת פיתוח CLI (CLI SDK)

ה-CLI SDK היא ספרייה המאפשרת לך להשתמש ב-Intlayer CLI בתוך קוד משלך.

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

דוגמה לשימוש:

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
