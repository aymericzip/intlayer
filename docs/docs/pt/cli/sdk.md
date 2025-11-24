---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: SDK CLI
description: Aprenda como usar o SDK CLI do Intlayer no seu próprio código.
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

O SDK CLI é uma biblioteca que permite usar o CLI do Intlayer no seu próprio código.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Exemplo de uso:

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
