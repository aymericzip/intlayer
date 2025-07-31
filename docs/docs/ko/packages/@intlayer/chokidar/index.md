---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Intlayer i18n용 파일 감시
description: Intlayer를 위한 파일 감시 기능을 제공하는 NPM 패키지로, 국제화 콘텐츠의 자동 업데이트 및 핫 리로딩을 가능하게 합니다.
keywords:
  - intlayer
  - chokidar
  - 파일 감시
  - 핫 리로드
  - i18n
  - 자바스크립트
  - NPM
  - 개발
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar: Intlayer 선언 파일을 사전으로 스캔 및 빌드하는 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/chokidar`** 패키지는 [chokidar](https://github.com/paulmillr/chokidar)를 사용하여 Intlayer 선언 파일을 스캔하고 [Intlayer 구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 따라 사전으로 빌드하는 데 사용됩니다.

## 사용법

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer 사전 빌드

watch({ persistent: true }); // 구성 파일 변경 감시
```

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
