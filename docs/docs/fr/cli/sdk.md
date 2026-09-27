---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK de la CLI Intlayer : lancer les commandes en code"
description: "Appelez les commandes de la CLI Intlayer comme build, push, pull et fill depuis vos propres scripts Node.js grâce au SDK de la CLI."
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
author: aymericzip
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
