---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: remix-intlayer 패키지 문서
description: Remix 3 애플리케이션에 국제화(i18n)를 제공하는 remix-intlayer 패키지의 내보내기 문서입니다.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer 내보내기 초기 문서"
author: aymericzip
---

# remix-intlayer 패키지

`remix-intlayer` 패키지는 Remix 3 애플리케이션에 Intlayer를 통합하기 위한 도구를 제공합니다. 요청 로케일 감지를 위한 미들웨어, 요청 컨텍스트 접근, 사전 조회 및 로케일 관리를 위한 훅을 포함합니다.

## 설치

```bash
npm install remix-intlayer
```

## 패키지 내보내기

### 미들웨어

| 내보내기   | 타입          | 설명                                                                                          | 관련 문서                                                                                                                        |
| ---------- | ------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | 미들웨어 함수 | 요청 로케일을 감지하고, 리다이렉션을 처리하며, 요청 컨텍스트를 채우는 Remix 3 미들웨어입니다. | [intlayer 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/intlayerMiddleware.md) |

### 컨텍스트 스토리지

| 내보내기                    | 타입                         | 설명                                                                                                                                  | 관련 문서                                                                                                              |
| --------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | RequestContext 키 / 스토리지 | Remix 3 요청 컨텍스트(`context.get(Intlayer)`)에서 Intlayer 상태를 가져오는 데 사용되는 요청 컨텍스트 키입니다.                       | [Intlayer 컨텍스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                     | 요청 컨텍스트에 직접 설치된 프로퍼티 이름(`'intlayer'`)으로, `context.intlayer` 및 `context.get(Intlayer)`를 통해 접근할 수 있습니다. | -                                                                                                                      |

### 훅

| 내보내기        | 타입 | 설명                                                                                                 | 관련 문서                                                                                                                  |
| --------------- | ---- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | 훅   | 현재 요청 로케일에 맞춰 키로 지정된 사전 콘텐츠를 조회하고 해결합니다.                               | [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | 훅   | 사전에 가져온 사전 객체에서 현재 요청 로케일에 해당하는 콘텐츠를 반환합니다.                         | [useDictionary 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | 훅   | 현재 요청 로케일, 기본 로케일 및 프로젝트에서 사용 가능한 전체 로케일 목록에 대한 접근을 제공합니다. | [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)         |

### 유틸리티

가져오기:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| 함수                  | 설명                                                                                                                                    | 관련 문서 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `createLocaleRouting` | 요청, 구성 및 옵션이 주어졌을 때 로케일 라우팅 결정(`redirect`, `rewrite` 또는 `pass`)을 계산하는 순수 함수입니다.                      | -         |
| `getIntlayerState`    | React 컴포넌트 외부에서 `AsyncLocalStorage` 요청 범위의 현재 `IntlayerState`(`locale`, `defaultLocale`, `availableLocales`)를 읽습니다. | -         |

### 포맷터 (remix-intlayer/format)

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
} from "remix-intlayer/format";
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

### HTML 유틸리티 (remix-intlayer/html)

가져오기:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| 내보내기          | 타입       | 설명                                                         |
| ----------------- | ---------- | ------------------------------------------------------------ |
| `renderHTML`      | `Function` | HTML 노드를 렌더링하기 위한 독립 실행형 유틸리티 함수입니다. |
| `useHTML`         | `Hook`     | HTML 프로바이더 컨텍스트 및 구성을 가져오는 훅입니다.        |
| `useHTMLRenderer` | `Hook`     | 사전 구성된 HTML 렌더러 함수를 가져오는 훅입니다.            |

### Markdown 유틸리티 (remix-intlayer/markdown)

가져오기:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
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
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| 타입                        | 설명                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Remix 요청 컨텍스트에 저장된 `locale`, `defaultLocale` 및 `availableLocales`를 포함하는 상태 객체입니다. |
| `IntlayerMiddlewareOptions` | `intlayer()` 미들웨어에 전달되는 구성 옵션입니다.                                                        |
| `LocaleRoutingOptions`      | 로케일 접두사, 감지 및 리디렉션을 사용자 정의하는 옵션입니다.                                            |
| `LocaleRoutingAction`       | 라우팅 결정을 나타내는 구별된 유니온: `redirect`, `rewrite` 또는 `pass`.                                 |
| `LocaleRoutingRequest`      | `createLocaleRouting`에 필요한 최소한의 요청 표현입니다.                                                 |
| `UseLocaleResult`           | `locale`, `defaultLocale` 및 `availableLocales`를 포함하는 `useLocale()`의 반환 타입입니다.              |
