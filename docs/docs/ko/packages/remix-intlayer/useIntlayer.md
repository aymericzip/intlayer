---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useIntlayer 훅 문서 | remix-intlayer
description: Remix 3 애플리케이션에서 useIntlayer 훅을 사용하여 키별로 현지화된 콘텐츠에 접근하는 방법을 살펴봅니다.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer 훅 초기 문서"
author: aymericzip
---

# useIntlayer 훅 문서

`useIntlayer` 훅을 사용하면 Remix 3 애플리케이션에서 키를 통해 Intlayer 사전의 현지화된 콘텐츠를 가져올 수 있습니다.

현재 요청 컨텍스트(`AsyncLocalStorage`를 통해)에서 활성 로케일을 자동으로 읽어오므로, 라우트 핸들러, 뷰 템플릿 또는 컴포넌트 전체에 걸쳐 로케일을 전달할 필요가 없습니다.

## 사용법

### 라우트 핸들러 내에서

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### 뷰 템플릿 및 컴포넌트 내에서

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## 매개변수

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: 사전의 고유 키(`.content.ts` 선언 파일에 정의된 키).
2. **`localeOrSelector`**(선택 사항): 특정 로케일 또는 선택기 객체(`{ item }`, `{ variant }`, 필요한 경우 `locale`). 제공되면 요청 컨텍스트에서 감지된 로케일을 재정의합니다.

## 설명

이 훅은 다음과 같은 작업을 수행합니다.

1. **컨텍스트 로케일 감지**: `intlayer()` 미들웨어가 설정한 요청 범위의 `AsyncLocalStorage` 스코프에서 현재 로케일을 감지합니다.
2. **사전 조회**: 제공된 키에 해당하는 사전 컴파일된 사전을 가져옵니다.
3. **번역 처리**: 확인된 로케일에 맞춰 번역, 열거형, 마크다운 및 조건부 콘텐츠를 확인합니다.
4. **대체 로케일(Fallback) 처리**: 활성 HTTP 요청 컨텍스트 외부(예: 미들웨어가 없는 백그라운드 작업이나 단위 테스트)에서 호출되는 경우 구성된 `defaultLocale`로 대체됩니다.

## 관련 문서

- [`intlayer` 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/intlayerMiddleware.md)
- [`useDictionary` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useDictionary.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)
