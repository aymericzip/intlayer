---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK de la CLI de Intlayer: comandos desde código"
description: "Llama a comandos de la CLI de Intlayer como build, push, pull y fill desde tus propios scripts de Node.js con el SDK de la CLI."
keywords:
  - SDK
  - CLI
  - Intlayer
  - Programático
slugs:
  - doc
  - concept
  - cli
  - sdk
author: aymericzip
---

# SDK CLI

El SDK CLI es una biblioteca que te permite usar el CLI de Intlayer en tu propio código.

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

Ejemplo de uso:

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
