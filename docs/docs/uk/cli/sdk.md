---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK CLI Intlayer: запуск команд із коду"
description: "Викликайте команди CLI Intlayer, як-от build, push, pull і fill, із власних скриптів Node.js за допомогою SDK CLI."
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
author: aymericzip
---

# SDK для CLI

CLI SDK, це бібліотека, яка дозволяє використовувати Intlayer CLI у вашому власному коді.

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
  extract,
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
