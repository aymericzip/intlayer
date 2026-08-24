---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer 패키지 문서
description: Intlayer용 Elysia 플러그인으로 번역 함수와 로케일 감지 기능을 제공합니다.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "모든 exports에 대한 통합 문서"
author: aymericzip
---

# elysia-intlayer 패키지

`elysia-intlayer` 패키지는 Elysia 애플리케이션에서 국제화를 처리하기 위한 플러그인을 제공합니다. 사용자 로케일을 감지하고 라우트 컨텍스트에 `intlayer` 객체를 주입합니다.

## 설치

```bash
npm install elysia-intlayer
```

## 내보내기

### 플러그인

임포트:

```tsx
import { intlayer } from "elysia-intlayer";
```

| 함수       | 설명                                                                                                                                                                                                                                                                                             | 관련 문서                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Intlayer를 Elysia 애플리케이션에 통합하는 Elysia 플러그인. 스토리지(쿠키, 헤더)에서, 이어서 `Accept-Language`에서 로케일 감지를 처리하고, `locale`, `t`, `getIntlayer`, `getDictionary`를 노출하는 `intlayer` 객체를 라우트 컨텍스트에 주입하며, `AsyncLocalStorage` 요청 컨텍스트를 설정합니다. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/elysia-intlayer/intlayer.md) |

### 함수

임포트:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| 함수            | 설명                                                                                                                                                                                                                               | 관련 문서                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Elysia에서 현재 로케일의 콘텐츠를 가져오는 전역 번역 함수. `AsyncLocalStorage`를 사용해 `intlayer` 플러그인이 설정한 요청 컨텍스트에 접근하며, 그 외부에서는 기본 로케일로 폴백합니다. `intlayer.t`를 통해서도 접근할 수 있습니다. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |
| `getIntlayer`   | 생성된 선언에서 키로 사전을 가져와 현재 로케일의 콘텐츠를 반환합니다. `getDictionary`의 최적화 버전입니다. `AsyncLocalStorage`를 사용해 요청 컨텍스트에 접근합니다. `intlayer.getIntlayer`를 통해서도 접근할 수 있습니다.          | -                                                                                                      |
| `getDictionary` | 사전 객체를 처리하여 현재 로케일의 콘텐츠를 반환합니다. `t()` 번역, 열거형, markdown, HTML 등을 처리합니다. `AsyncLocalStorage`를 사용해 요청 컨텍스트에 접근합니다. `intlayer.getDictionary`를 통해서도 접근할 수 있습니다.       | -                                                                                                      |

### 타입

임포트:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| 타입                | 설명                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerContext`   | 모든 라우트 컨텍스트에 주입되는 `intlayer` 객체의 형태: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | 로케일 맵을 현재 요청 로케일에 해당하는 콘텐츠로 변환하는 번역 함수의 시그니처.                                                                              |
