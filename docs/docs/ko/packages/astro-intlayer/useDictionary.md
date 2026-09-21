---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useDictionary 훅 문서 | astro-intlayer
description: Astro 컴포넌트 및 스크립트에서 useDictionary 훅을 사용하여 사전 객체를 확인하는 방법을 알아봅니다.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "초기 문서"
author: aymericzip
---

# useDictionary 훅 문서

`useDictionary` 훅은 가져온 사전 객체 또는 인라인 사전 객체를 확인하고 Astro 애플리케이션에서 현재 로케일에 맞는 콘텐츠를 반환합니다.

전역 사전 레지스트리에서 키로 사전을 검색하는 `useIntlayer`와 달리, `useDictionary`는 사전 객체와 직접 작동합니다.

## 사용법

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

`t()`로 정의된 인라인 사전을 전달할 수도 있습니다:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
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
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## 매개변수

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: 사전 객체 또는 정규화된 사전 그룹.
2. **`localeOrSelector`**(선택 사항): 특정 로케일 또는 선택기 객체(`{ item }`, `{ variant }`, 필요한 경우 `locale`).

## 설명

이 훅은 다음 작업을 수행합니다:

1. **로케일 감지**: 서버에서는 `Astro.locals.intlayer`에서 로케일을 가져옵니다. 브라우저에서는 클라이언트 측 스토어 로케일을 사용합니다.
2. **콘텐츠 처리**: 확인된 로케일에 따라 번역(`t()`), 열거형, 조건 및 중첩 구조를 확인합니다.
3. **선택기**: 인수에 제공된 항목 또는 변형 선택기를 적용합니다.

## 관련 문서

- [`intlayer` 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useLocale.md)
