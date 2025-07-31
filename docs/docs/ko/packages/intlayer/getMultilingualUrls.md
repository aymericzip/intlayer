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
---

# 문서: `intlayer`의 `getMultilingualUrls` 함수

## 설명

`getMultilingualUrls` 함수는 주어진 URL에 각 지원되는 로케일을 접두사로 붙여 다국어 URL 매핑을 생성합니다. 절대 URL과 상대 URL 모두를 처리할 수 있으며, 제공된 구성이나 기본값에 따라 적절한 로케일 접두사를 적용합니다.

---

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

### 반환값

- **타입**: `IConfigLocales<string>`
- **설명**: 각 로케일을 해당 다국어 URL에 매핑한 객체입니다.

---

## 사용 예시

### 상대 URL

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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

```tsx codeFormat="typescript"
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

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// 국제화 설정: 지원되는 로케일과 기본 로케일을 정의합니다.
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// 국제화 설정: 지원되는 로케일과 기본 로케일을 정의합니다.
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;

module.exports = config;
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

## 문서 이력

- 5.5.10 - 2025-06-29: 이력 초기화
