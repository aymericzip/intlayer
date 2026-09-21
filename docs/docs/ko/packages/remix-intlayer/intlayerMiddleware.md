---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: intlayer 미들웨어 문서 | remix-intlayer
description: Remix 3에서 intlayer 미들웨어를 사용하여 로케일을 감지하고, 리다이렉션을 처리하며, 요청 컨텍스트에 Intlayer 상태를 주입하는 방법을 알아봅니다.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "intlayer 미들웨어 초기 문서"
author: aymericzip
---

# intlayer 미들웨어

`intlayer` 미들웨어 함수는 Remix 3 애플리케이션에서 요청별 국제화를 설정합니다. 들어오는 각 요청의 로케일을 감지하고, URL 리다이렉션 규칙을 적용하며, 로케일 상태를 요청 컨텍스트에 유지합니다.

## 사용법

Remix 라우터에 미들웨어를 등록합니다.

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## 동작 방식

미들웨어는 수신된 각 요청에 대해 다음 작업을 수행합니다.

1. **로케일 감지**: Intlayer 설정에 따라 URL 경로 접두사(예: `/ko/about`), 쿠키 또는 `Accept-Language` 헤더에서 로케일을 추출합니다.
2. **URL 리다이렉션**: 요청된 경로에 로케일 접두사가 없고 설정에서 접두사 라우팅이 필요한 경우, 접두사가 포함된 URL로의 리다이렉션 응답(302/307/308)을 반환합니다.
3. **요청 컨텍스트 등록**: `Intlayer` 키를 사용하여 확인된 현재 로케일을 Remix 요청 컨텍스트에 저장하여, 훅(`useLocale`, `useIntlayer`, `useDictionary`)이 이를 투명하게 활용할 수 있도록 합니다.
4. **쿠키 관리**: 사용자의 선호 로케일을 유지해야 하는 경우 `Set-Cookie` 헤더를 설정합니다.

## 관련 문서

- [`Intlayer` 요청 컨텍스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/Intlayer.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useIntlayer.md)
