---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useIntlayer 훅 문서 | astro-intlayer
description: Astro 컴포넌트 및 클라이언트 스크립트에서 useIntlayer 훅을 사용하여 현지화된 콘텐츠에 액세스하는 방법을 알아봅니다.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "초기 문서"
author: aymericzip
---

# useIntlayer 훅 문서

`useIntlayer` 훅을 사용하면 Astro 애플리케이션에서 키를 통해 현지화된 사전 콘텐츠를 검색할 수 있습니다.

동일한 가져오기 경로를 사용하여 두 가지 고유한 컨텍스트에서 호출할 수 있습니다:

1. **서버 / 프론트매터**: `.astro` 파일 내에서 `Astro.locals.intlayer`에 저장된 요청 로케일을 사용하여 콘텐츠를 자동으로 해결합니다.
2. **브라우저 / 클라이언트 `<script>`**: 클라이언트 스크립트 또는 UI 프레임워크 컴포넌트 내에서 클라이언트 측 스토어 구현(`vanilla-intlayer`)으로 해결됩니다.

## 사용법

### Astro 컴포넌트 프론트매터에서

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### 클라이언트 `<script>` 블록에서

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## 매개변수

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: 사전의 고유 키(`.content.ts` 선언 파일에 정의된 키).
2. **`localeOrSelector`**(선택 사항): 특정 로케일 또는 선택기 객체(`{ item }`, `{ variant }`, 필요한 경우 `locale`). 제공되면 요청 컨텍스트 또는 클라이언트 스토어에서 감지된 로케일을 재정의합니다.

## 설명

이 훅은 다음 작업을 수행합니다:

1. **로케일 해결**:
   - 서버에서 `astro-intlayer/middleware`에 의해 초기화된 `AsyncLocalStorage` 범위를 통해 `Astro.locals.intlayer`의 활성 로케일을 읽습니다.
   - 브라우저에서 클라이언트 스토리지/스토어의 활성 로케일을 읽습니다.
2. **사전 검색**: 지정된 키와 일치하는 사전 콘텐츠를 주입합니다.
3. **번역 처리**: 번역(`t()`), 열거형, 조건 및 마크다운을 렌더링 준비가 된 콘텐츠로 해결합니다.

## 관련 문서

- [`intlayer` 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/intlayer.md)
- [`useDictionary` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useDictionary.md)
- [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useLocale.md)
