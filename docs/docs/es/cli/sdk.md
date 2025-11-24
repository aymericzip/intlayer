---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: SDK CLI
description: Aprende cómo usar el SDK CLI de Intlayer en tu propio código.
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
