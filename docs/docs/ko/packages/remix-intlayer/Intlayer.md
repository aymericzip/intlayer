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

`intlayer()` 미들웨어가 실행되면 `IntlayerState` 객체를 `Intlayer` 키 아래 요청 컨텍스트에 저장합니다. 모든 라우트 핸들러 내에서 이를 가져올 수 있습니다:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // context.get(Intlayer)를 통한 접근
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

직접 속성 단축 표기인 `context.intlayer`를 사용하여 접근할 수도 있습니다:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## `IntlayerState` 구조

`IntlayerState` 객체는 다음을 포함합니다:

| 속성               | 타입                | 설명                                                       |
| ------------------ | ------------------- | ---------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | 현재 요청에 대해 결정된 로케일입니다.                      |
| `defaultLocale`    | `DeclaredLocales`   | `intlayer.config.ts`에 정의된 대체(fallback) 로케일입니다. |
| `availableLocales` | `DeclaredLocales[]` | 프로젝트에 구성된 모든 지원 로케일 목록입니다.             |

## 관련 문서

- [`intlayer` 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useIntlayer.md)
