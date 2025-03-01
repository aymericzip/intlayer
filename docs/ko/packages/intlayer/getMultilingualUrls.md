# 문서: `getMultilingualUrls` 함수 in `intlayer`

## 설명

`getMultilingualUrls` 함수는 주어진 URL에 각 지원 로케일을 접두사로 추가하여 다국어 URL 매핑을 생성합니다. 이 함수는 절대 URL과 상대 URL 모두를 처리할 수 있으며, 제공된 설정 또는 기본값에 따라 적절한 로케일 접두사를 적용합니다.

---

## 매개변수

- `url: string`

  - **설명**: 로케일 접두사가 추가될 원래 URL 문자열입니다.
  - **유형**: `string`

- `locales: Locales[]`

  - **설명**: 지원되는 로케일의 선택적 배열입니다. 프로젝트에서 구성된 로케일이 기본값으로 사용됩니다.
  - **유형**: `Locales[]`
  - **기본값**: `localesDefault`

- `defaultLocale: Locales`

  - **설명**: 애플리케이션의 기본 로케일입니다. 프로젝트에서 구성된 기본 로케일이 기본값으로 사용됩니다.
  - **유형**: `Locales`
  - **기본값**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **설명**: 기본 로케일에 접두사를 추가할지 여부입니다. 프로젝트에서 구성된 값이 기본값으로 사용됩니다.
  - **유형**: `boolean`
  - **기본값**: `prefixDefaultDefault`

### 반환값

- **유형**: `IConfigLocales<string>`
- **설명**: 각 로케일을 해당 다국어 URL에 매핑하는 객체입니다.

---

## 사용 예제

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

## 엣지 케이스

- **로케일 세그먼트 없음:**

  - 함수는 다국어 매핑을 생성하기 전에 URL에서 기존 로케일 세그먼트를 제거합니다.

- **기본 로케일:**

  - `prefixDefault`가 `false`인 경우, 기본 로케일에 대해 URL에 접두사를 추가하지 않습니다.

- **지원되지 않는 로케일:**
  - `locales` 배열에 제공된 로케일만 URL을 생성하는 데 사용됩니다.

---

## 애플리케이션에서의 사용

다국어 애플리케이션에서 `locales` 및 `defaultLocale`로 국제화 설정을 구성하는 것은 올바른 언어가 표시되도록 보장하는 데 중요합니다. 아래는 애플리케이션 설정에서 `getMultilingualUrls`를 사용하는 예제입니다:

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

위 구성은 애플리케이션이 `ENGLISH`, `FRENCH`, 및 `SPANISH`를 지원 언어로 인식하고 `ENGLISH`를 기본 언어로 사용하도록 보장합니다.

이 구성을 사용하여 `getMultilingualUrls` 함수는 애플리케이션의 지원 로케일에 따라 다국어 URL 매핑을 동적으로 생성할 수 있습니다:

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

`getMultilingualUrls`를 통합함으로써 개발자는 여러 언어에 걸쳐 일관된 URL 구조를 유지할 수 있으며, 이는 사용자 경험과 SEO를 향상시킵니다.
