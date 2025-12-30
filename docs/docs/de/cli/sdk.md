---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI SDK
description: Erfahren Sie, wie Sie das Intlayer CLI SDK in Ihrem eigenen Code verwenden.
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
