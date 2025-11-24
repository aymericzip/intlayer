---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI SDK
description: Intlayer CLI SDK를 자신의 코드에서 사용하는 방법을 알아보세요.
keywords:
  - SDK
  - CLI
  - Intlayer
  - 프로그래밍 방식
slugs:
  - doc
  - concept
  - cli
  - sdk
---

# CLI SDK

CLI SDK는 Intlayer CLI를 자신의 코드에서 사용할 수 있게 해주는 라이브러리입니다.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

사용 예시:

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
