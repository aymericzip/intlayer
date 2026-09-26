---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: onRequest 미들웨어 문서 | astro-intlayer
description: Astro 애플리케이션에서 onRequest 미들웨어를 사용하여 요청 로케일을 확인하고 Astro.locals.intlayer를 채우는 방법을 알아봅니다.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "초기 문서"
author: aymericzip
---

# onRequest Astro 미들웨어 문서

`astro-intlayer/middleware`의 `onRequest` 미들웨어는 들어오는 각 HTTP 요청의 로케일을 확인하고 `Astro.locals.intlayer`를 채웁니다.

`astro.config.mjs`에 `intlayer()` 통합을 등록하면 이 미들웨어가 자동으로 주입됩니다. `sequence(...)`를 사용하여 Astro 미들웨어를 수동으로 구성하는 경우에만 직접 가져오면 됩니다.

## 사용법

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // 사용자 정의 미들웨어에서 확인된 로케일에 액세스
  const { locale } = context.locals.intlayer;
  console.log(`로케일 요청 처리 중: ${locale}`);

  return next();
});
```

## 설명

미들웨어는 다음 작업을 수행합니다:

1. **로케일 감지**:
   - **URL**: URL 경로 접두사 또는 `?locale=` 검색 매개변수를 분석합니다(`routing.mode`가 `no-prefix`로 설정되지 않은 경우).
   - **쿠키 / 헤더**: 유지된 로케일 쿠키 또는 사용자 지정 헤더 값을 확인합니다.
   - **Accept-Language**: 브라우저의 기본 언어 협상으로 대체됩니다.
   - 사전 렌더링된 페이지(`context.isPrerendered`)의 경우 Astro 빌드 경고를 방지하기 위해 URL에서 엄격하게 로케일을 추출합니다.
2. **컨텍스트 채우기**: `Astro.locals.intlayer`를 다음으로 채웁니다:
   - `locale`: 확인된 로케일.
   - `defaultLocale`: 기본 대체 로케일.
   - `availableLocales`: 구성된 로케일 배열.
3. **AsyncLocalStorage 스코프**: 다운스트림 요청 처리를 `AsyncLocalStorage` 스코프 내에 래핑하여 `useIntlayer()`, `useDictionary()` 및 `useLocale()`이 인수를 전달하지 않고도 요청 상태에 액세스할 수 있도록 합니다.

## `IntlayerLocals` 타입

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## 관련 문서

- [`intlayer` 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useLocale.md)
