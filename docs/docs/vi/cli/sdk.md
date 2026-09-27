---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "SDK CLI Intlayer: chạy lệnh từ mã nguồn"
description: "Gọi các lệnh CLI Intlayer như build, push, pull và fill từ script Node.js của riêng bạn bằng SDK CLI."
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

CLI SDK là một thư viện cho phép bạn sử dụng Intlayer CLI trong mã của riêng bạn.

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

Ví dụ sử dụng:

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
