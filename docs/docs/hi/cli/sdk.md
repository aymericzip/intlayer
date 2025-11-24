---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI SDK
description: अपने कोड में Intlayer CLI SDK का उपयोग कैसे करें, जानें।
keywords:
  - SDK
  - CLI
  - Intlayer
  - प्रोग्रामेटिक
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# CLI SDK

CLI SDK एक लाइब्रेरी है जो आपको अपने कोड में Intlayer CLI का उपयोग करने की अनुमति देती है।

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

उपयोग का उदाहरण:

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
