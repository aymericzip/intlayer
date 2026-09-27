---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK della CLI di Intlayer: comandi dal codice"
description: "Esegui comandi della CLI di Intlayer come build, push, pull e fill dai tuoi script Node.js con l'SDK della CLI."
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
author: aymericzip
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

```bash packageManager="bun"
bun add @intlayer/cli --dev
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
