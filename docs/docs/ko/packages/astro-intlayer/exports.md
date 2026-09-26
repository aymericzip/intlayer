---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: astro-intlayer 패키지 문서
description: 로케일 기반 라우팅, 미들웨어, 훅, 클라이언트 스토어 및 사전 관리를 위한 설정을 제공하는 Intlayer의 Astro 통합.
keywords:
  - astro-intlayer
  - astro
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer, useDictionary, useLocale 훅, 미들웨어 및 포맷터 문서 추가"
  - version: 8.0.0
    date: 2026-01-21
    changes: "모든 내보내기에 대한 통합 문서"
author: aymericzip
---

# astro-intlayer 패키지

`astro-intlayer` 패키지는 Astro 애플리케이션에 Intlayer를 통합하는 데 필요한 도구를 제공합니다. 로케일 기반 라우팅, 사전 관리, 빌드 타임 페이지 재작성, 요청 미들웨어, 그리고 서버 렌더링된 `.astro` 컴포넌트와 클라이언트 사이드 스크립트 모두에서 다국어 콘텐츠에 접근하기 위한 훅을 구성합니다.

## 설치

```bash
npm install astro-intlayer
```

## 내보내기

### 통합

`astro-intlayer` 패키지는 프로젝트에 Intlayer를 설정하는 Astro 통합을 제공합니다.

가져오기:

```tsx
import { intlayer } from "astro-intlayer";
```

또는 `astro.config.mjs`에서의 기본 가져오기:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| 함수       | 설명                                                                                                                                                                            | 관련 문서                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | 사전을 준비하고, Vite 플러그인(별칭, 라우팅 프록시, 가지치기)을 구성하며, 요청 미들웨어를 자동 등록하고 재작성된 로케일 URL로 사전 렌더링된 페이지를 출력하는 Astro 통합입니다. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/intlayer.md) |

### 훅 (서버 및 클라이언트)

가져오기:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| 훅              | 설명                                                                                                                                                                        | 관련 문서                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | 키로 하나의 사전을 선택하고 현지화된 콘텐츠를 반환합니다. `.astro` 프론트매터에서는 `Astro.locals`에서 요청 로케일을 읽고, `<script>`에서는 클라이언트 스토어에서 읽습니다. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | 사전 객체를 변환하고 해결된 로케일에 맞는 콘텐츠를 반환합니다. 프론트매터 및 클라이언트 스크립트에서 작동합니다.                                                            | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | 현재 로케일, 기본 로케일, 사용 가능한 로케일 목록 및 로케일 업데이트 함수를 반환합니다.                                                                                     | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/useLocale.md)         |

### 미들웨어 (astro-intlayer/middleware)

가져오기:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| 내보내기    | 타입                | 설명                                                                                                                                                    | 관련 문서                                                                                                       |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | 요청 로케일을 감지하고 `Astro.locals.intlayer`를 연결하는 Astro 미들웨어입니다. `intlayer()`에 의해 자동 등록되거나, 수동으로 구성하기 위해 가져옵니다. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/astro-intlayer/onRequest.md) |

### 유틸리티

가져오기:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| 함수                | 설명                                                                                                  | 관련 문서 |
| ------------------- | ----------------------------------------------------------------------------------------------------- | --------- |
| `getIntlayerLocals` | `Astro.locals` 외부의 요청 저장소 스코프에서 현재 `IntlayerLocals` 객체를 검색하는 도우미 함수입니다. | -         |

### 클라이언트 유틸리티 (astro-intlayer/client)

가져오기:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

브라우저 또는 클라이언트 `<script>` 태그 내에서 가져올 때 `astro-intlayer`는 자동으로 `astro-intlayer/client`(`vanilla-intlayer` 기반)로 매핑되어 클라이언트 측 사전 게터, 스토어 구독자 및 로케일 지속성 도구를 제공합니다.

### 포맷터 (astro-intlayer/format)

가져오기:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| 훅                | 설명                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `useIntl`         | 캐싱 및 구독 기능과 함께 요청 또는 클라이언트 로케일에 바인딩된 Intl 인스턴스를 반환합니다. |
| `useDate`         | 현재 로케일에 미리 바인딩된 날짜 형식화 함수를 반환합니다 (`Intl.DateTimeFormat`).          |
| `useNumber`       | 현재 로케일에 미리 바인딩된 숫자 형식화 함수를 반환합니다 (`Intl.NumberFormat`).            |
| `useCurrency`     | 현재 로케일에 미리 바인딩된 통화 형식화 함수를 반환합니다.                                  |
| `usePercentage`   | 현재 로케일에 미리 바인딩된 백분율 형식화 함수를 반환합니다.                                |
| `useRelativeTime` | 현재 로케일에 미리 바인딩된 상대 시간 형식화 함수를 반환합니다 (`Intl.RelativeTimeFormat`). |
| `useList`         | 현재 로케일에 미리 바인딩된 목록 형식화 함수를 반환합니다 (`Intl.ListFormat`).              |
| `useUnit`         | 현재 로케일에 미리 바인딩된 단위 형식화 함수를 반환합니다.                                  |
| `useCompact`      | 현재 로케일에 미리 바인딩된 컴팩트 숫자 형식화 함수를 반환합니다 (예: `1.5K`).              |

### HTML 유틸리티 (astro-intlayer/html)

가져오기:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| 내보내기          | 타입       | 설명                                                         |
| ----------------- | ---------- | ------------------------------------------------------------ |
| `renderHTML`      | `Function` | HTML 노드를 렌더링하기 위한 독립 실행형 유틸리티 함수입니다. |
| `useHTML`         | `Hook`     | HTML 프로바이더 컨텍스트 및 구성을 가져오는 훅입니다.        |
| `useHTMLRenderer` | `Hook`     | 사전 구성된 HTML 렌더러 함수를 가져오는 훅입니다.            |

### Markdown 유틸리티 (astro-intlayer/markdown)

가져오기:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| 내보내기              | 타입       | 설명                                                  |
| --------------------- | ---------- | ----------------------------------------------------- |
| `compileMarkdown`     | `Function` | 마크다운 문자열을 구조화된 표현으로 컴파일합니다.     |
| `renderMarkdown`      | `Function` | 마크다운 콘텐츠를 출력 노드로 렌더링합니다.           |
| `parseMarkdown`       | `Function` | 원시 마크다운 콘텐츠를 AST로 구문 분석합니다.         |
| `useMarkdown`         | `Hook`     | 마크다운 프로바이더 컨텍스트를 가져오는 훅입니다.     |
| `useMarkdownRenderer` | `Hook`     | 사전 구성된 Markdown 렌더러 함수를 가져오는 훅입니다. |

### 타입

가져오기:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| 타입              | 설명                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | `locale`, `defaultLocale`, `availableLocales`를 포함하여 `Astro.locals.intlayer`에 연결된 객체입니다. |
| `UseLocaleProps`  | `useLocale()`에서 허용하는 선택적 구성 속성입니다.                                                    |
| `UseLocaleResult` | 로케일 속성 및 업데이트 메서드를 제공하는 `useLocale()`의 반환 타입입니다.                            |
