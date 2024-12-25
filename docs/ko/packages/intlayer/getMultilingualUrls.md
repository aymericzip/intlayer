# Documentation: `getMultilingualUrls` 함수 in `intlayer`

## 설명:

`getMultilingualUrls` 함수는 주어진 URL에 지원되는 각 로케일을 접두어로 붙여 다국어 URL의 매핑을 생성합니다. 절대 URL과 상대 URL 모두 처리할 수 있으며, 제공된 구성 또는 기본값에 따라 적절한 로케일 접두어를 적용합니다.

---

## 매개변수:

- `url: string`

  - **설명**: 로케일로 접두어를 붙일 원래 URL 문자열입니다.
  - **유형**: `string`

- `locales: Locales[]`

  - **설명**: 지원되는 로케일의 선택적 배열입니다. 프로젝트에 구성된 로케일 기본값으로 설정됩니다.
  - **유형**: `Locales[]`
  - **기본값**: `localesDefault`

- `defaultLocale: Locales`

  - **설명**: 애플리케이션의 기본 로케일입니다. 프로젝트에 구성된 기본 로케일로 설정됩니다.
  - **유형**: `Locales`
  - **기본값**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **설명**: 기본 로케일에 접두어를 붙일지 여부입니다. 프로젝트에 구성된 값으로 설정됩니다.
  - **유형**: `boolean`
  - **기본값**: `prefixDefaultDefault`

### 반환값:

- **유형**: `IConfigLocales<string>`
- **설명**: 각 로케일에 해당하는 다국어 URL을 매핑하는 객체입니다.

---

## 예제 사용법:

### 상대 URL:

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

### 절대 URL:

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

## 엣지 케이스:

- **로케일 세그먼트 없음:**

  - 이 함수는 다국어 매핑을 생성하기 전에 URL에서 기존의 로케일 세그먼트를 제거합니다.

- **기본 로케일:**

  - `prefixDefault`가 `false`일 때, 함수는 기본 로케일의 URL에 접두어를 붙이지 않습니다.

- **지원되지 않는 로케일:**
  - `locales` 배열에 제공된 로케일만 URL 생성에 고려됩니다.

---

## 애플리케이션에서의 사용:

다국어 애플리케이션에서는 `locales`와 `defaultLocale`로 국제화 설정을 구성하는 것이 올바른 언어가 표시되도록 하는 데 중요합니다. 아래는 애플리케이션 설정에서 `getMultilingualUrls`를 어떻게 사용할 수 있는지에 대한 예제입니다:

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

위의 구성은 애플리케이션이 `ENGLISH`, `FRENCH`, `SPANISH`를 지원되는 언어로 인식하고 `ENGLISH`를 대체 언어로 사용하도록 보장합니다.

이 구성을 사용하여 `getMultilingualUrls` 함수는 애플리케이션의 지원되는 로케일에 따라 다국어 URL 매핑을 동적으로 생성할 수 있습니다:

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

`getMultilingualUrls`를 통합함으로써 개발자는 여러 언어에 걸쳐 일관된 URL 구조를 유지하여 사용자 경험과 SEO를 향상시킬 수 있습니다.
