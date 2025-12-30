---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: SDK CLI
description: Apprenez à utiliser le SDK CLI Intlayer dans votre propre code.
keywords:
  - SDK
  - CLI
  - Intlayer
  - Programmation
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# SDK CLI

Le SDK CLI est une bibliothèque qui vous permet d'utiliser la CLI Intlayer dans votre propre code.

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

Exemple d'utilisation :

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
