---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK CLI Intlayer: uruchamianie poleceń z kodu"
description: "Wywołuj polecenia CLI Intlayer, takie jak build, push, pull i fill, z własnych skryptów Node.js za pomocą SDK CLI."
keywords:
  - SDK
  - CLI
  - Intlayer
  - Programmatic
slugs:
  - doc
  - concept
  - cli
  - sdk
author: aymericzip
---

# CLI SDK

CLI SDK to biblioteka, która pozwala na używanie Intlayer CLI w Twoim własnym kodzie.

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

Przykład użycia:

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
