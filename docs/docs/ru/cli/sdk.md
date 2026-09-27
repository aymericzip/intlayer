---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK CLI Intlayer: запуск команд из кода"
description: "Вызывайте команды CLI Intlayer, такие как build, push, pull и fill, из собственных скриптов Node.js с помощью SDK CLI."
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
author: aymericzip
---

# CLI SDK

CLI SDK, это библиотека, которая позволяет использовать Intlayer CLI в вашем собственном коде.

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
