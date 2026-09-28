---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
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

# intlayer Remix 3 미들웨어 문서

Remix 3용 `intlayer` 미들웨어는 애플리케이션 전반의 국제화 레이어를 관리합니다. 웹 표준(`Request` 및 `Response`)을 기반으로 구축되어 로케일 라우팅(리다이렉트 및 내부 리라이트)을 처리하고, 요청 로케일을 감지하여 쿠키와 헤더에 유지하며, `AsyncLocalStorage` 스코프를 설정하여 하위 핸들러와 컴포넌트가 props 드릴링 없이 번역에 접근할 수 있도록 합니다.

## 사용법

Remix 3 라우터를 초기화할 때 `intlayer` 미들웨어를 등록합니다.

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// `/`, `/fr`, `/es`를 제공하며, 로케일은 요청에서 확인됩니다
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## 설명

`intlayer` 미들웨어는 다음 작업을 수행합니다.

1. **사전 준비**: 시작 시 `prepareIntlayer`를 실행하여 생성된 모든 사전이 빌드되고 사용 가능한 상태인지 확인합니다.
2. **로케일 라우팅**: 설정된 라우팅 전략(`prefix_always`, `prefix_as_needed`, `no_prefix`)에 따라 요청을 평가합니다.
   - **리다이렉트**: 사용자가 `/about`에 방문했는데 로케일 접두사(예: `/fr/about`)로 라우팅되어야 하는 경우, 미들웨어는 적절한 `location` 및 `Set-Cookie` 헤더와 함께 리다이렉트 응답을 반환합니다.
   - **내부 리라이트**: 사용자가 `/fr/about`에 접근하면 URL이 내부적으로 리라이트되어 라우트 핸들러가 `/about`과 매칭되며, 확인된 로케일은 `fr`로 저장됩니다.
   - **현지화된 URL 별칭**: `intlayer.config.ts`에 정의된 URL 리라이트 규칙을 따릅니다(예: `/fr/about`을 `/fr/a-propos`로 리라이트).
3. **로케일 확인**: URL 접두사, 저장된 쿠키, 사용자 정의 헤더 또는 `Accept-Language` 브라우저 선호도를 기반으로 활성 로케일을 감지합니다.
4. **컨텍스트 주입**:
   - `IntlayerState`(`locale`, `defaultLocale`, `availableLocales`)를 `Intlayer` 키와 `context.intlayer` 아래 Remix `RequestContext`에 첨부합니다.
   - 요청의 나머지 부분을 `AsyncLocalStorage` 스코프(`requestStorage`) 내에서 실행하여 핸들러, 뷰, 컴포넌트에서 `useIntlayer`, `useDictionary`, `useLocale`을 깔끔하게 호출할 수 있게 합니다.
5. **영속화**: 사용자의 선호도를 유지하기 위해 나가는 로케일 헤더와 쿠키를 최종 HTTP 응답에 첨부합니다.

## 매개변수

`intlayer` 함수는 선택적인 `IntlayerMiddlewareOptions`를 인수로 받습니다:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // 사용자 정의 라우팅 설정 재정의
};

const middleware = intlayer(options);
```

## 컨텍스트에 직접 접근하기

훅을 사용하는 것 외에도, Remix 요청 컨텍스트에서 확인된 `IntlayerState`에 직접 접근할 수 있습니다:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // context.get()을 통해
  const state = context.get(Intlayer);

  // 또는 context.intlayer 속성을 통해 직접
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## 관련 문서

- [`Intlayer` 요청 컨텍스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/Intlayer.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)
