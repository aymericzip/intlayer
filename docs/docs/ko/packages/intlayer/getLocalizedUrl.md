---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocalizedUrl 함수 문서 | intlayer
description: intlayer 패키지의 getLocalizedUrl 함수 사용법 안내
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# 문서: `intlayer`의 `getLocalizedUrl` 함수

## 설명

`getLocalizedUrl` 함수는 지정된 로케일을 URL 앞에 붙여서 지역화된 URL을 생성합니다. 절대 URL과 상대 URL 모두를 처리하며, 구성에 따라 올바른 로케일 접두사가 적용되도록 보장합니다.

---

## 함수 서명

```typescript
getLocalizedUrl(
  url: string,                   // 필수
  currentLocale: Locales,        // 필수
  options?: {                    // 선택사항
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## 매개변수

### 필수 파라미터

- `url: string`
  - **Description**: 로케일을 접두사로 추가할 원본 URL 문자열입니다.
  - **Type**: `string`
  - **Required**: Yes

- `currentLocale: Locales`
  - **Description**: URL이 로컬라이제이션되는 현재 로케일입니다.
  - **Type**: `Locales`
  - **Required**: Yes

## 매개변수

- `url: string`
  - **설명**: 로케일 접두사가 붙을 원본 URL 문자열입니다.
  - **타입**: `string`

- `currentLocale: Locales`
  - **설명**: URL이 지역화되는 현재 로케일입니다.
  - **타입**: `Locales`

- `locales: Locales[]`
  - **설명**: 지원되는 로케일의 선택적 배열입니다. 기본적으로 프로젝트에 구성된 로케일이 제공됩니다.
  - **타입**: `Locales[]`
  - **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)

- `defaultLocale: Locales`
  - **설명**: 애플리케이션의 기본 로케일입니다. 기본적으로 프로젝트에 구성된 기본 로케일이 제공됩니다.
  - **타입**: `Locales`
  - **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)

- `prefixDefault: boolean`
  - **설명**: 기본 로케일에 대해 URL에 접두사를 붙일지 여부입니다. 기본적으로 프로젝트에 구성된 값이 제공됩니다.
  - **타입**: `boolean`
  - **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)

### 반환값

- **타입**: `string`
- **설명**: 지정된 로케일에 대한 현지화된 URL입니다.

---

## 사용 예시

### 기본 사용법 (필수 매개변수만 사용)

국제화 설정으로 프로젝트를 구성한 후에는 필수 매개변수만으로 함수를 사용할 수 있습니다:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// 프로젝트의 locales, defaultLocale 및 mode 구성을 사용합니다
getLocalizedUrl("/about", Locales.FRENCH);
// 출력: "/fr/about" (French가 지원되고 mode가 'prefix-no-default'라고 가정)

getLocalizedUrl("/about", Locales.ENGLISH);
// 출력: "/about" 또는 "/en/about" (mode 설정에 따라 다름)
```

### 고급 사용법 (선택적 매개변수 포함)

선택적 `options` 매개변수를 제공하여 기본 구성을 재정의할 수 있습니다:

### 상대 URL

```typescript codeFormat={["typescript", "esm"]}
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 출력: 프랑스어 로케일의 경우 "/fr/about"
// 출력: 기본(영어) 로케일의 경우 "/about"
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 출력: 프랑스어 로케일의 경우 "/fr/about"
// 출력: 기본(영어) 로케일의 경우 "/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 출력: 프랑스어 로케일의 경우 "/fr/about"
// 출력: 기본(영어) 로케일의 경우 "/about"
```

### 부분 Configuration Override

선택적 매개변수 중 일부만 제공할 수도 있습니다. 함수는 지정하지 않은 매개변수에 대해 프로젝트 configuration을 사용합니다:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// locales만 override, defaultLocale과 mode는 프로젝트 config 사용
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// mode만 override, locales과 defaultLocale은 프로젝트 config 사용
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // 기본 locale을 포함한 모든 locale에 prefix 강제
});

// 여러 옵션 override
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // 쿼리 매개변수 사용: /about?locale=fr
});
```

### 절대 URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH, // 기본 로케일
  false // 기본 로케일 접두사 사용 여부
); // 프랑스어 로케일의 출력: "https://example.com/fr/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일 목록
  Locales.ENGLISH, // 기본 로케일
  false // 기본 로케일 접두사 사용 여부
); // 영어 로케일의 출력: "https://example.com/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일 목록
  Locales.ENGLISH, // 기본 로케일
  true // 기본 로케일 접두사 사용 여부
); // 영어 로케일의 출력: "https://example.com/en/about"
```

### 지원하지 않는 로케일

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH // 기본 로케일
); // 출력: "/about" (지원되지 않는 로케일에는 접두사가 적용되지 않음)
```

---

## 엣지 케이스

- **로케일 세그먼트 없음:**
  - URL에 로케일 세그먼트가 포함되어 있지 않은 경우, 함수는 적절한 로케일을 안전하게 접두사로 추가합니다.

- **기본 로케일:**
  - `prefixDefault`가 `false`일 때, 함수는 기본 로케일에 대해 URL에 접두사를 추가하지 않습니다.

- **지원되지 않는 로케일:**
  - `locales` 목록에 없는 로케일에 대해서는 함수가 접두사를 적용하지 않습니다.

---

## 애플리케이션에서의 사용

다국어 애플리케이션에서 `locales`와 `defaultLocale`로 국제화 설정을 구성하는 것은 올바른 언어가 표시되도록 하는 데 매우 중요합니다. 아래는 애플리케이션 설정에서 `getLocalizedUrl`을 사용하는 예시입니다:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// 지원되는 로케일과 기본 로케일 설정
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

위 설정은 애플리케이션이 `ENGLISH`, `FRENCH`, `SPANISH`를 지원 언어로 인식하고, `ENGLISH`를 기본 언어로 사용하도록 보장합니다.

이 설정을 사용하면 `getLocalizedUrl` 함수가 사용자의 언어 선호도에 따라 동적으로 지역화된 URL을 생성할 수 있습니다:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 출력: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 출력: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 출력: "/about"
```

`getLocalizedUrl`을 통합함으로써 개발자는 여러 언어에 걸쳐 일관된 URL 구조를 유지할 수 있어 사용자 경험과 SEO를 모두 향상시킬 수 있습니다.
