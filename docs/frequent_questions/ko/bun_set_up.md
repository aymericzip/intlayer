---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: bun 사용 시 모듈을 찾을 수 없다는 오류가 발생합니다
description: bun 사용 시 발생하는 오류 수정 방법.
keywords:
  - bun
  - 모듈을 찾을 수 없음
  - intlayer
  - 설정
  - 패키지 관리자
slugs:
  - frequent-questions
  - bun-set-up
---

# bun 사용 시 모듈을 찾을 수 없다는 오류가 발생합니다

## 문제 설명

bun을 사용할 때 다음과 같은 오류가 발생할 수 있습니다:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## 원인

Intlayer는 내부적으로 `require`를 사용합니다. 그리고 bun은 `require` 함수를 전체 프로젝트가 아닌 `@intlayer/config` 패키지의 패키지들만 해결하도록 범위를 제한합니다.

## 해결 방법

### 설정에 `require` 함수를 제공하기

```ts
const config: IntlayerConfig = {
  build: {
    require, // require 함수를 빌드 설정에 제공합니다.
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // require 함수를 Intlayer 설정에 포함시킵니다.
});

export default configuration;
```
