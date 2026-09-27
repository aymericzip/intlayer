---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "Intlayer CLI SDK: Befehle aus Code ausführen"
description: "Rufen Sie Intlayer-CLI-Befehle wie build, push, pull und fill mit dem CLI SDK aus Ihren eigenen Node.js-Skripten auf."
keywords:
  - SDK
  - CLI
  - Intlayer
  - Programmgesteuert
slugs:
  - doc
  - concept
  - cli
  - sdk
author: aymericzip
---

# CLI SDK

Das CLI SDK ist eine Bibliothek, die es Ihnen ermöglicht, das Intlayer CLI in Ihrem eigenen Code zu verwenden.

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

Beispiel für die Verwendung:

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
