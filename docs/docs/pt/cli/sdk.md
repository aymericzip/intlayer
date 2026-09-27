---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK da CLI do Intlayer: comandos a partir do código"
description: "Chame comandos da CLI do Intlayer como build, push, pull e fill a partir dos seus próprios scripts Node.js com o SDK da CLI."
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

```bash packageManager="bun"
bun add @intlayer/cli --dev
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
