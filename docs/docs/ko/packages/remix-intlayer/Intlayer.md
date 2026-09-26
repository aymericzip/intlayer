---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Intlayer 컨텍스트 문서 | remix-intlayer
description: Remix 3 애플리케이션의 Intlayer 요청 컨텍스트 스토리지 키에 대한 문서입니다.
keywords:
  - Intlayer
  - remix
  - remix-3
  - 요청 컨텍스트
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Intlayer 컨텍스트 키 초기 문서"
author: aymericzip
---

# Intlayer 요청 컨텍스트 키

`Intlayer` 내보내기는 Remix 3에서 요청 컨텍스트 스토리지 식별자 역할을 합니다. 라우트 핸들러나 커스텀 미들웨어 내에서 Remix 컨텍스트 객체로부터 Intlayer 상태를 직접 검색할 수 있습니다.

## 사용법

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## 설명

`Intlayer`는 `intlayer()` 미들웨어가 현재 세션 상태를 Remix의 요청 컨텍스트(`RequestContext`)에 바인딩하는 데 사용됩니다. 일반적으로는 `useLocale()`이나 `useIntlayer()`와 같은 훅을 사용하는 것이 권장됩니다. `context.get(Intlayer)`를 통한 직접 접근은 저수준 미들웨어 핸들러나 컨텍스트 인스턴스가 명시적으로 전달되는 API 라우트에서 유용합니다.

## 관련 문서

- [`intlayer` 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)
