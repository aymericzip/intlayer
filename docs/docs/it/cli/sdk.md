---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: SDK CLI
description: Scopri come utilizzare l'SDK CLI di Intlayer nel tuo codice.
keywords:
  - SDK
  - CLI
  - Intlayer
  - Programmatico
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# SDK CLI

L'SDK CLI è una libreria che ti permette di utilizzare la CLI di Intlayer nel tuo codice.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Esempio di utilizzo:

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
