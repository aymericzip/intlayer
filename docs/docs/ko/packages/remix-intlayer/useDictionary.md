---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useDictionary 훅 문서 | remix-intlayer
description: Remix 3 애플리케이션에서 useDictionary 훅을 사용하여 현재 요청 로케일에 맞게 사전 객체를 처리하는 방법을 살펴봅니다.
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useDictionary 훅 초기 문서"
author: aymericzip
---

# useDictionary 훅 문서

`useDictionary` 훅은 가져온 사전 객체 또는 인라인 사전 객체를 변환하여 Remix 3 애플리케이션의 현재 요청 로케일에 맞는 콘텐츠를 반환합니다.

전역 사전 레지스트리에서 문자열 키로 사전을 조회하는 `useIntlayer`와 달리, `useDictionary`는 사전 객체를 직접 전달받습니다.

## 사용법

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

`t()`를 사용하여 정의된 인라인 사전을 전달할 수도 있습니다.

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        ko: "모든 권리 보유.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## 매개변수

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: 사전 객체 또는 정규화된 사전 그룹.
2. **`localeOrSelector`**(선택 사항): 특정 로케일 또는 선택기 객체(`{ item }`, `{ variant }`, 필요한 경우 `locale`). 제공되면 요청 로케일보다 우선합니다.

## 설명

이 훅은 다음과 같은 작업을 수행합니다.

1. **로케일 감지**: `intlayer()` 미들웨어가 생성한 `AsyncLocalStorage` 저장소에서 활성 요청 로케일을 읽습니다.
2. **콘텐츠 해결**: 해결된 로케일에 따라 번역(`t()`), 열거형, 조건 및 중첩 구조를 평가합니다.
3. **선택기 처리**: 인수에 지정된 항목 또는 변형 선택기를 적용합니다.

## 관련 문서

- [`intlayer` 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)
