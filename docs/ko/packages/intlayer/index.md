# intlayer: NPM 패키지로 다국어 콘텐츠 선언 관리 (i18n)

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, Next.js 및 Express.js와 호환됩니다.

**`intlayer` 패키지**를 사용하면 코드 어디서나 콘텐츠를 선언할 수 있습니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 애플리케이션에 매끄럽게 통합합니다. TypeScript를 사용하여 **Intlayer**는 더 강력하고 효율적인 도구를 제공하여 개발을 향상시킵니다.

## Intlayer를 통합해야 하는 이유는 무엇입니까?

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리하십시오.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장하십시오.
- **통합 콘텐츠 파일**: 번역을 각 구성 요소와 가깝게 유지하여 유지 보수성과 명확성을 향상시킵니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하십시오:

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

Intlayer는 프로젝트를 설정하기 위한 구성 파일을 제공합니다. 이 파일을 프로젝트의 루트에 배치하십시오.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.KOREAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.KOREAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.KOREAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.KOREAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.KOREAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.KOREAN,
  },
};

module.exports = config;
```

> 사용 가능한 매개변수에 대한 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

## 사용 예시

Intlayer를 사용하면 코드베이스 어디에서나 콘텐츠를 구조화된 방식으로 선언할 수 있습니다.

기본적으로 Intlayer는 `.content.{ts,tsx,js,jsx,mjs,cjs}` 확장자를 가진 파일을 검색합니다.

> 기본 확장자는 [구성 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에서 `contentDir` 속성을 설정하여 수정할 수 있습니다.

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

### 콘텐츠 선언하기

다음은 콘텐츠 선언 예시입니다:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      ko: "안녕하세요 세계",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "차량이 -1대 미만입니다",
      "-1": "차량이 -1대입니다",
      "0": "차량이 없습니다",
      "1": "차량이 1대입니다",
      ">5": "차량이 몇 대 있습니다",
      ">19": "차량이 많이 있습니다",
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
      ko: "안녕하세요 세계",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "차량이 -1대 미만입니다",
      "-1": "차량이 -1대입니다",
      "0": "차량이 없습니다",
      "1": "차량이 1대입니다",
      ">5": "차량이 몇 대 있습니다",
      ">19": "차량이 많이 있습니다",
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
      ko: "안녕하세요 세계",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "차량이 -1대 미만입니다",
      "-1": "차량이 -1대입니다",
      "0": "차량이 없습니다",
      "1": "차량이 1대입니다",
      ">5": "차량이 몇 대 있습니다",
      ">19": "차량이 많이 있습니다",
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
        "ko": "안녕하세요 세계",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "차량이 -1대 미만입니다",
        "-1": "차량이 -1대입니다",
        "0": "차량이 없습니다",
        "1": "차량이 1대입니다",
        ">5": "차량이 몇 대 있습니다",
        ">19": "차량이 많이 있습니다"
      }
    }
  }
}
```

### 사전 빌드하기

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

이 명령은 모든 `*.content.*` 파일을 검색하고, 이를 컴파일하여 **`intlayer.config.ts`**에서 지정한 디렉토리에 결과를 기록합니다(기본적으로 `./.intlayer`).

전형적인 출력은 다음과 같을 수 있습니다:

```bash
.
├── .intlayer
│   ├── dictionary  # 당신의 콘텐츠의 사전을 포함합니다
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # 애플리케이션에서 사용할 사전의 진입점을 포함합니다
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # 당신의 사전의 자동 생성된 타입 정의를 포함합니다
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # Intlayer의 자동 생성된 타입 정의를 포함합니다
```

### i18next 리소스 빌드하기

Intlayer는 [i18next](https://www.i18next.com/)를 위한 사전을 빌드하도록 구성할 수 있습니다. 이를 위해 `intlayer.config.ts` 파일에 다음 구성을 추가해야 합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer에 i18next를 위한 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 쓸 디렉토리입니다
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
    // Intlayer에 i18next를 위한 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 쓸 디렉토리입니다
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
    // Intlayer에 i18next를 위한 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 쓸 디렉토리입니다
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 사용 가능한 매개변수에 대한 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

출력:

```bash
.
└── i18next
    └── resources
        ├── ko
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

예를 들어, **ko/client-component.json**의 내용은 다음과 같을 수 있습니다:

```json filePath="intlayer/dictionary/ko/client-component.json"
{
  "myTranslatedContent": "안녕하세요 세계",
  "zero_numberOfCar": "차량이 없습니다",
  "one_numberOfCar": "차량이 1대입니다",
  "two_numberOfCar": "차량이 2대입니다",
  "other_numberOfCar": "차량이 몇 대 있습니다"
}
```

### i18next 또는 next-intl 사전 빌드하기

Intlayer는 [i18next](https://www.i18next.com/) 또는 [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl)을 위한 사전을 빌드하도록 구성할 수 있습니다. 이를 위해 `intlayer.config.ts` 파일에 다음 구성을 추가해야 합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer에 i18next를 위한 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 쓸 디렉토리입니다
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Intlayer에 i18next를 위한 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 쓸 디렉토리입니다
    nextIntlMessagesDir: "./i18next/messages",
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
    // Intlayer에 i18next를 위한 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 쓸 디렉토리입니다
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 사용 가능한 매개변수에 대한 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

출력:

```bash
.
└── intl
    └── messages
        ├── ko
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

예를 들어, **ko/client-component.json**의 내용은 다음과 같을 수 있습니다:

```json filePath="intlayer/dictionary/ko/client-component.json"
{
  "myTranslatedContent": "안녕하세요 세계",
  "zero_numberOfCar": "차량이 없습니다",
  "one_numberOfCar": "차량이 1대입니다",
  "two_numberOfCar": "차량이 2대입니다",
  "other_numberOfCar": "차량이 몇 대 있습니다"
}
```

## CLI 도구

Intlayer는 다음을 수행할 수 있는 CLI 도구를 제공합니다:

- 콘텐츠 선언을 감사하고 누락된 번역을 보완합니다
- 콘텐츠 선언에서 사전을 빌드합니다
- 원격 사전을 CMS에서 로컬 프로젝트로 푸시하고 풀합니다

자세한 정보는 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)를 참조하십시오.

## Intlayer를 애플리케이션에서 사용하기

콘텐츠가 선언되면 애플리케이션에서 Intlayer 사전을 사용할 수 있습니다.

Intlayer는 애플리케이션용 패키지로 제공됩니다.

### React 애플리케이션

React 애플리케이션에서 Intlayer를 사용하려면 [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/index.md)를 사용할 수 있습니다.

### Next.js 애플리케이션

Next.js 애플리케이션에서 Intlayer를 사용하려면 [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/index.md)를 사용할 수 있습니다.

### Express 애플리케이션

Express 애플리케이션에서 Intlayer를 사용하려면 [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/express-intlayer/index.md)를 사용할 수 있습니다.

## `intlayer` 패키지가 제공하는 기능

`intlayer` 패키지는 애플리케이션의 국제화를 도와주는 몇 가지 기능을 제공합니다.

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
