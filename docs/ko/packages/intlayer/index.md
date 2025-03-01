# intlayer: 다국어 사전(i18n)을 관리하기 위한 NPM 패키지

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, Next.js, Express.js와 같은 프레임워크와 호환됩니다.

**`intlayer` 패키지**는 코드 어디에서나 콘텐츠를 선언할 수 있도록 합니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 애플리케이션에 원활하게 통합됩니다. TypeScript와 함께 사용하면 **Intlayer**는 더 강력하고 효율적인 도구를 제공하여 개발을 향상시킵니다.

## Intlayer를 통합해야 하는 이유

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리합니다.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장합니다.
- **통합된 콘텐츠 파일**: 번역을 해당 구성 요소와 가까운 곳에 유지하여 유지 관리성과 명확성을 향상시킵니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Intlayer 구성

Intlayer는 프로젝트를 설정하기 위한 구성 파일을 제공합니다. 이 파일을 프로젝트 루트에 배치하세요.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
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

> 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

## 사용 예제

Intlayer를 사용하면 코드베이스 어디에서나 구조화된 방식으로 콘텐츠를 선언할 수 있습니다.

기본적으로 Intlayer는 `.content.{ts,tsx,js,jsx,mjs,cjs}` 확장자를 가진 파일을 스캔합니다.

> 기본 확장은 [구성 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)의 `contentDir` 속성을 설정하여 수정할 수 있습니다.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    ├── ClientComponent
    │   ├── index.content.mjs
    │   └── index.mjx
    └── ServerComponent
        ├── index.content.mjs
        └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### 콘텐츠 선언

다음은 콘텐츠 선언의 예입니다:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ko: "안녕하세요 세계",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ko: "안녕하세요 세계",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ko: "안녕하세요 세계",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ko": "안녕하세요 세계"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### 사전 빌드

[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md)를 사용하여 사전을 빌드할 수 있습니다.

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

이 명령은 모든 `*.content.*` 파일을 스캔하고, 이를 컴파일하며, 결과를 **`intlayer.config.ts`**에 지정된 디렉토리에 작성합니다(기본값: `./.intlayer`).

일반적인 출력은 다음과 같습니다:

```bash
.
└── .intlayer
    ├── dictionary  # 콘텐츠 사전 포함
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # 애플리케이션에서 사용할 사전의 진입점 포함
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # 사전의 자동 생성된 타입 정의 포함
        ├── intlayer.d.ts  # Intlayer의 자동 생성된 타입 정의 포함
        ├── client-component.d.ts
        └── server-component.d.ts
```

### i18next 리소스 빌드

Intlayer는 [i18next](https://www.i18next.com/)용 사전을 빌드하도록 구성할 수 있습니다. 이를 위해 `intlayer.config.ts` 파일에 다음 구성을 추가해야 합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer가 i18next 메시지 파일을 생성하도록 설정
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer가 i18next 메시지 파일을 생성하도록 설정
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer가 i18next 메시지 파일을 생성하도록 설정
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

출력:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

예를 들어, **en/client-component.json**은 다음과 같을 수 있습니다:

```json filePath="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

### next-intl 사전 빌드

Intlayer는 [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl)용 사전을 빌드하도록 구성할 수 있습니다. 이를 위해 `intlayer.config.ts` 파일에 다음 구성을 추가해야 합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer가 next-intl 메시지 파일을 생성하도록 설정
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
    nextIntlMessagesDir: "./intl/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer가 next-intl 메시지 파일을 생성하도록 설정
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer가 next-intl 메시지 파일을 생성하도록 설정
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

출력:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

예를 들어, **en/client-component.json**은 다음과 같을 수 있습니다:

```json filePath="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

## CLI 도구

Intlayer는 다음을 위한 CLI 도구를 제공합니다:

- 콘텐츠 선언을 감사하고 누락된 번역을 완성
- 콘텐츠 선언에서 사전 빌드
- CMS에서 로컬 프로젝트로 원격 사전 푸시 및 풀

자세한 내용은 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)를 참조하세요.

## 애플리케이션에서 Intlayer 사용

콘텐츠 선언 후, 애플리케이션에서 Intlayer 사전을 사용할 수 있습니다.

Intlayer는 애플리케이션용 패키지로 제공됩니다.

### React 애플리케이션

React 애플리케이션에서 Intlayer를 사용하려면 [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/index.md)를 사용할 수 있습니다.

### Next.js 애플리케이션

Next.js 애플리케이션에서 Intlayer를 사용하려면 [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/index.md)를 사용할 수 있습니다.

### Express 애플리케이션

Express 애플리케이션에서 Intlayer를 사용하려면 [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/express-intlayer/index.md)를 사용할 수 있습니다.

## `intlayer` 패키지가 제공하는 함수

`intlayer` 패키지는 애플리케이션을 국제화하는 데 도움이 되는 몇 가지 함수를 제공합니다.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getPathWithoutLocale.md)
