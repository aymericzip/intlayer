---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "Intlayer CLI SDK: कोड से कमांड चलाएँ"
description: "CLI SDK से build, push, pull और fill जैसे Intlayer CLI कमांड अपनी Node.js स्क्रिप्ट से चलाएँ।"
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
author: aymericzip
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

```bash packageManager="bun"
bun add @intlayer/cli --dev
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
