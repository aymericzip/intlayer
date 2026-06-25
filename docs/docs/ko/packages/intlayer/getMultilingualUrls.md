---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getMultilingualUrls 함수 문서 | intlayer
description: intlayer 패키지의 getMultilingualUrls 함수 사용법을 확인하세요
keywords:
  - getMultilingualUrls
  - 번역
  - Intlayer
  - intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "이력 초기화"
author: aymericzip
---

# 문서: `intlayer`의 `getMultilingualUrls` 함수

## 설명

`getMultilingualUrls` 함수는 주어진 URL에 각 지원되는 로케일을 접두사로 붙여 다국어 URL 매핑을 생성합니다. 절대 URL과 상대 URL 모두를 처리할 수 있으며, 제공된 구성이나 기본값에 따라 적절한 로케일 접두사를 적용합니다.

---

## 함수 서명

```typescript
getMultilingualUrls(
  url: string,                   // 필수
  options?: {                    // 선택사항
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## 매개변수

## 매개변수

- `url: string`
  - **설명**: 로케일 접두사를 붙일 원본 URL 문자열입니다.
  - **타입**: `string`

- `locales: Locales[]`
  - **설명**: 선택적 지원 로케일 배열입니다. 프로젝트에 구성된 로케일이 기본값입니다.
  - **타입**: `Locales[]`
  - **기본값**: `localesDefault`

- `defaultLocale: Locales`
  - **설명**: 애플리케이션의 기본 로케일입니다. 프로젝트에 구성된 기본 로케일이 기본값입니다.
  - **타입**: `Locales`
  - **기본값**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **설명**: 기본 로케일에 접두사를 붙일지 여부입니다. 프로젝트에 구성된 값이 기본값입니다.
  - **타입**: `boolean`
  - **기본값**: `prefixDefaultDefault`

### 선택적 매개변수

- `options?: object`
  - **Description**: URL 지역화 동작을 위한 구성 객체입니다.
  - **Type**: `object`
  - **Required**: No (선택사항)

  - `options.locales?: Locales[]`
    - **Description**: 지원되는 로케일의 배열입니다. 제공되지 않으면 프로젝트 구성에서 구성된 로케일을 사용합니다.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: 애플리케이션의 기본 로케일입니다. 제공되지 않으면 프로젝트 구성에서 구성된 기본 로케일을 사용합니다.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: 로케일 처리를 위한 URL 라우팅 모드입니다. 제공되지 않으면 프로젝트 구성에서 구성된 모드를 사용합니다.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: 기본 로케일의 경우 접두사 없음, 다른 로케일의 경우 접두사 포함
      - `prefix-all`: 기본 로케일을 포함한 모든 로케일에 접두사 포함
      - `no-prefix`: URL에 로케일 접두사 없음
      - `search-params`: 로케일에 쿼리 매개변수 사용 (예: `?locale=fr`)

### 반환값

- **타입**: `IConfigLocales<string>`
- **설명**: 각 로케일을 해당 다국어 URL에 매핑한 객체입니다.

---

## 사용 예시

### 기본 사용법 (프로젝트 구성 사용)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// 프로젝트의 구성에서 locales, defaultLocale, mode를 사용합니다
getMultilingualUrls("/dashboard");
// 출력 (프로젝트 구성에 en, fr이 있고 mode가 'prefix-no-default'인 경우):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### 상대 URL

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// 출력: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### 절대 URL

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// 출력: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

### 다양한 라우팅 모드

```typescript
// prefix-no-default: 기본 로케일에 대한 접두사 없음
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// 출력: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: 모든 로케일에 접두사 추가
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// 출력: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: URL에 로케일 접두사 없음
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// 출력: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: 쿼리 매개변수로 로케일 전달
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// 출력: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## 예외 상황

- **로케일 세그먼트 없음:**
  - 함수는 다국어 매핑을 생성하기 전에 URL에서 기존의 로케일 세그먼트를 제거합니다.

- **기본 로케일:**
  - `prefixDefault`가 `false`일 때, 함수는 기본 로케일에 대해 URL에 접두사를 붙이지 않습니다.

- **지원되지 않는 로케일:**
  - `locales` 배열에 제공된 로케일만 URL 생성에 고려됩니다.

---

## 애플리케이션에서의 사용법

다국어 애플리케이션에서는 `locales`와 `defaultLocale`로 국제화 설정을 구성하는 것이 올바른 언어가 표시되도록 하는 데 중요합니다. 아래는 `getMultilingualUrls`가 애플리케이션 설정에서 어떻게 사용될 수 있는지에 대한 예시입니다:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// 지원되는 로케일과 기본 로케일에 대한 설정
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

위의 구성은 애플리케이션이 `ENGLISH`, `FRENCH`, `SPANISH`를 지원 언어로 인식하고, `ENGLISH`를 기본 언어로 사용하도록 보장합니다.

이 구성을 사용하면 `getMultilingualUrls` 함수가 애플리케이션에서 지원하는 로케일을 기반으로 다국어 URL 매핑을 동적으로 생성할 수 있습니다:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// 출력:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }
```

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// 출력:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

위 구성은 애플리케이션이 `ENGLISH`, `FRENCH`, `SPANISH`를 지원 언어로 인식하고 `ENGLISH`를 기본 언어로 사용하도록 보장합니다.

이 구성을 사용하면 `getMultilingualUrls` 함수가 애플리케이션의 지원 로케일을 기반으로 다국어 URL 매핑을 동적으로 생성할 수 있습니다:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// 출력:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// 출력:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

`getMultilingualUrls`를 통합함으로써 개발자는 여러 언어에 걸쳐 일관된 URL 구조를 유지할 수 있어 사용자 경험과 SEO를 모두 향상시킬 수 있습니다.
