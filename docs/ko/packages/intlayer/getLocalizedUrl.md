---
docName: package__intlayer__getLocalizedUrl
url: /doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getLocalizedUrl 함수 문서 | intlayer
description: intlayer 패키지의 getLocalizedUrl 함수 사용 방법을 확인하세요
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
---

# Documentation: `getLocalizedUrl` Function in `intlayer`

## 설명

`getLocalizedUrl` 함수는 지정된 로케일로 주어진 URL에 접두사를 추가하여 로컬라이즈된 URL을 생성합니다. 이 함수는 절대 URL과 상대 URL 모두를 처리하며, 설정에 따라 올바른 로케일 접두사가 적용되도록 보장합니다.

---

## 매개변수

- `url: string`

  - **설명**: 로케일 접두사가 추가될 원래 URL 문자열입니다.
  - **유형**: `string`

- `currentLocale: Locales`

  - **설명**: URL이 로컬라이즈될 현재 로케일입니다.
  - **유형**: `Locales`

- `locales: Locales[]`

  - **설명**: 지원되는 로케일의 선택적 배열입니다. 기본적으로 프로젝트에서 구성된 로케일이 제공됩니다.
  - **유형**: `Locales[]`
  - **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#middleware)

- `defaultLocale: Locales`

  - **설명**: 애플리케이션의 기본 로케일입니다. 기본적으로 프로젝트에서 구성된 기본 로케일이 제공됩니다.
  - **유형**: `Locales`
  - **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#middleware)

- `prefixDefault: boolean`
  - **설명**: 기본 로케일에 대해 URL에 접두사를 추가할지 여부입니다. 기본적으로 프로젝트에서 구성된 값이 제공됩니다.
  - **유형**: `boolean`
  - **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#middleware)

### 반환값

- **유형**: `string`
- **설명**: 지정된 로케일에 대한 로컬라이즈된 URL입니다.

---

## 사용 예시

### 상대 URL

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 출력: "/fr/about" (프랑스어 로케일)
// 출력: "/about" (기본 로케일인 영어)
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

// 출력: "/fr/about" (프랑스어 로케일)
// 출력: "/about" (기본 로케일인 영어)
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

// 출력: "/fr/about" (프랑스어 로케일)
// 출력: "/about" (기본 로케일인 영어)
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

// 출력: "/fr/about" (프랑스어 로케일)
// 출력: "/about" (기본 로케일인 영어)
```

### 절대 URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH, // 기본 로케일
  false // 기본 로케일 접두사 여부
); // 출력: "https://example.com/fr/about" (프랑스어)

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH, // 기본 로케일
  false // 기본 로케일 접두사 여부
); // 출력: "https://example.com/about" (영어)

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH, // 기본 로케일
  true // 기본 로케일 접두사 여부
); // 출력: "https://example.com/en/about" (영어)
```

### 지원되지 않는 로케일

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH // 기본 로케일
); // 출력: "/about" (지원되지 않는 로케일에 대해 접두사가 적용되지 않음)
```

---

## 엣지 케이스

- **로케일 세그먼트 없음:**

  - URL에 로케일 세그먼트가 포함되어 있지 않은 경우, 함수는 적절한 로케일을 안전하게 접두사로 추가합니다.

- **기본 로케일:**

  - `prefixDefault`가 `false`인 경우, 함수는 기본 로케일에 대해 URL에 접두사를 추가하지 않습니다.

- **지원되지 않는 로케일:**
  - `locales`에 나열되지 않은 로케일의 경우, 함수는 접두사를 적용하지 않습니다.

---

## 애플리케이션에서의 사용

다국어 애플리케이션에서 `locales` 및 `defaultLocale` 설정을 구성하는 것은 올바른 언어가 표시되도록 보장하는 데 중요합니다. 아래는 애플리케이션 설정에서 `getLocalizedUrl`을 사용하는 예시입니다:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// 지원되는 로케일 및 기본 로케일에 대한 구성
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
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

위 구성은 애플리케이션이 `ENGLISH`, `FRENCH`, `SPANISH`를 지원 언어로 인식하고 `ENGLISH`를 기본 언어로 사용하도록 보장합니다.

이 구성을 사용하면 `getLocalizedUrl` 함수가 사용자의 언어 환경 설정에 따라 동적으로 로컬라이즈된 URL을 생성할 수 있습니다:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 출력: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 출력: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 출력: "/about"
```

`getLocalizedUrl`을 통합하면 개발자는 여러 언어에 걸쳐 일관된 URL 구조를 유지할 수 있어 사용자 경험과 SEO를 향상시킬 수 있습니다.
