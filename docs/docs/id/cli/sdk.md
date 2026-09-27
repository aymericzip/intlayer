---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK CLI Intlayer: jalankan perintah dari kode"
description: "Panggil perintah CLI Intlayer seperti build, push, pull, dan fill dari skrip Node.js Anda sendiri dengan SDK CLI."
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

CLI SDK adalah sebuah library yang memungkinkan Anda menggunakan Intlayer CLI dalam kode Anda sendiri.

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

Contoh penggunaan:

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
