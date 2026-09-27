---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "Intlayer CLI SDK: 코드에서 명령어 실행"
description: "CLI SDK로 build, push, pull, fill 같은 Intlayer CLI 명령어를 직접 작성한 Node.js 스크립트에서 호출합니다."
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
author: aymericzip
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

```bash packageManager="bun"
bun add @intlayer/cli --dev
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
