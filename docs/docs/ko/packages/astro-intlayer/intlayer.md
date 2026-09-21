---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: intlayer 통합 문서 | astro-intlayer
description: astro.config.mjs에서 intlayer Astro 통합을 구성하고 사용하는 방법을 살펴봅니다.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - 통합
  - i18n
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "미들웨어 및 훅 세부 정보로 통합 문서 업데이트"
  - version: 8.0.0
    date: 2026-01-21
    changes: "초기 문서"
author: aymericzip
---

# intlayer Astro 통합 문서

Astro용 `intlayer` 통합은 다국어 국제화(i18n)를 위해 프로젝트를 구성합니다. 빌드 타임 사전 준비, Vite 플러그인 주입, 요청 미들웨어 자동 등록 및 현지화된 사전 렌더링 페이지 출력을 처리합니다.

## 사용법

`astro.config.mjs`에 `intlayer()`를 추가합니다:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Astro CLI의 codemod(`astro add astro-intlayer`)에서도 지원되는 기본 가져오기를 생성합니다:

```ts
import intlayer from "astro-intlayer";
```

## 설명

이 통합은 Astro의 빌드 및 런타임 수명 주기에 연결됩니다:

1. **구성 설정 (`astro:config:setup`)**:
   - **사전 준비**: 빌드가 실행되기 전에 Intlayer 사전과 생성된 타입을 준비합니다.
   - **Vite 플러그인**: Vite 별칭(원활한 사전 가져오기 지원), 로케일 라우팅 프록시 및 빌드 가지치기를 위한 플러그인을 주입합니다.
   - **미들웨어 등록**: 프로젝트의 미들웨어 체인에 `astro-intlayer/middleware`를 자동으로 주입하여 들어오는 모든 요청에 대해 `Astro.locals.intlayer`를 채웁니다.
2. **빌드 완료 (`astro:build:done`)**:
   - **페이지 재작성**: 현지화된 URL 재작성 규칙을 검사하고 해당 현지화 경로에 사전 렌더링된 HTML 페이지를 출력합니다.

## 기본 제공 기능

구성되면 Astro 애플리케이션은 즉시 다음을 사용할 수 있습니다:

- `.astro` 컴포넌트 프론트매터 내의 `useIntlayer`, `useDictionary`, `useLocale` 훅.
- Astro 엔드포인트 및 페이지의 `Astro.locals.intlayer` 객체.
- 반응형 업데이트를 지원하며 동일한 API를 반영하는 `<script>` 블록의 클라이언트 측 가져오기.
- `astro-intlayer/format`의 내장 포맷터 (`useDate`, `useNumber`, `useCurrency` 등).

## 관련 문서

- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useLocale.md)
- [`onRequest` 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/onRequest.md)
