# Documentation: `getLocalizedUrl` 함수 in `intlayer`

## 설명:

`getLocalizedUrl` 함수는 주어진 URL에 지정된 로케일을 접두사로 추가하여 로컬라이즈된 URL을 생성합니다. 이는 절대 URL과 상대 URL 모두를 처리하여 구성에 따라 올바른 로케일 접두사가 적용되도록 합니다.

---

## 매개변수:

- `url: string`

  - **설명**: 로케일로 접두사 추가할 원래 URL 문자열입니다.
  - **유형**: `string`

- `currentLocale: Locales`

  - **설명**: URL이 로컬라이즈되는 현재 로케일입니다.
  - **유형**: `Locales`

- `locales: Locales[]`

  - **설명**: 지원되는 로케일의 선택적 배열입니다. 기본적으로 프로젝트에 구성된 로케일이 제공됩니다.
  - **유형**: `Locales[]`
  - **기본값**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#middleware)

- `defaultLocale: Locales`

  - **설명**: 애플리케이션의 기본 로케일입니다. 기본적으로 프로젝트에서 구성된 기본 로케일이 제공됩니다.
  - **유형**: `Locales`
  - **기본값**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#middleware)

- `prefixDefault: boolean`
  - **설명**: 기본 로케일에 대해 URL을 접두사 추가할지를 나타냅니다. 기본적으로 프로젝트에 구성된 값이 제공됩니다.
  - **유형**: `boolean`
  - **기본값**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md#middleware)

### 반환값:

- **유형**: `string`
- **설명**: 지정된 로케일에 대한 로컬라이즈된 URL입니다.

---

## 사용 예:

### 상대 URL:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// 출력: "/fr/about" 프랑스어 로케일에 대한 결과
// 출력: "/about" 기본 (영어) 로케일에 대한 결과
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

// 출력: "/fr/about" 프랑스어 로케일에 대한 결과
// 출력: "/about" 기본 (영어) 로케일에 대한 결과
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

// 출력: "/fr/about" 프랑스어 로케일에 대한 결과
// 출력: "/about" 기본 (영어) 로케일에 대한 결과
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

// 출력: "/fr/about" 프랑스어 로케일에 대한 결과
// 출력: "/about" 기본 (영어) 로케일에 대한 결과
```

### 절대 URL:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH, // 기본 로케일
  false // 기본 로케일 접두사 추가 여부
); // 출력: "https://example.com/fr/about" 프랑스어 로케일에 대한 결과

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH, // 기본 로케일
  false // 기본 로케일 접두사 추가 여부
); // 출력: "https://example.com/about" 영어 로케일에 대한 결과

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH, // 기본 로케일
  true // 기본 로케일 접두사 추가 여부
); // 출력: "https://example.com/en/about" 영어 로케일에 대한 결과
```

### 지원되지 않는 로케일:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // 현재 로케일
  [Locales.ENGLISH, Locales.FRENCH], // 지원되는 로케일
  Locales.ENGLISH // 기본 로케일
); // 출력: "/about" (지원되지 않는 로케일에 대해 접두사 없음)
```

---

## 엣지 케이스:

- **로케일 세그먼트 없음:**

  - URL에 로케일 세그먼트가 포함되어 있지 않으면, 함수는 적절한 로케일로 안전하게 접두사를 추가합니다.

- **기본 로케일:**

  - `prefixDefault`가 `false`인 경우, 함수는 기본 로케일에 대해 URL을 접두사 추가하지 않습니다.

- **지원되지 않는 로케일:**
  - `locales`에 나열되지 않은 로케일의 경우, 함수는 접두사를 적용하지 않습니다.

---

## 애플리케이션에서의 사용:

다국어 애플리케이션에서 `locales` 및 `defaultLocale`로 국제화 설정을 구성하는 것은 올바른 언어가 표시되도록 보장하는 데 중요합니다. 아래는 `getLocalizedUrl`이 애플리케이션 설정에서 어떻게 사용될 수 있는지에 대한 예입니다:

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

위의 구성은 애플리케이션이 `ENGLISH`, `FRENCH`, `SPANISH`를 지원되는 언어로 인식하고 `ENGLISH`를 기본 언어로 사용하도록 보장합니다.

이 구성을 사용하여 `getLocalizedUrl` 함수는 사용자의 언어 선호에 따라 동적으로 로컬라이즈된 URL을 생성할 수 있습니다:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // 출력: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // 출력: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // 출력: "/about"
```

`getLocalizedUrl`을 통합함으로써 개발자는 여러 언어에 걸쳐 일관된 URL 구조를 유지하여 사용자 경험과 SEO를 모두 향상시킬 수 있습니다.
