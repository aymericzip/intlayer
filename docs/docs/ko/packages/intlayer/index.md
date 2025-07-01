---
docName: package__intlayer
url: https://intlayer.org/doc/packages/intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 패키지 문서 | intlayer
description: intlayer 패키지 사용 방법 보기
keywords:
  - Intlayer
  - intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# intlayer: 다국어 사전(i18n) 관리를 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, Next.js, Express.js와 같은 프레임워크와 호환됩니다.

**`intlayer` 패키지**는 코드 어디에서나 콘텐츠를 선언할 수 있게 해줍니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 애플리케이션에 원활하게 통합됩니다. TypeScript와 함께 사용하면, **Intlayer**는 더 강력하고 효율적인 도구를 제공하여 개발을 향상시킵니다.

## Intlayer를 통합해야 하는 이유

- **자바스크립트 기반 콘텐츠 관리**: 자바스크립트의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리할 수 있습니다.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장합니다.
- **통합된 콘텐츠 파일**: 번역을 해당 컴포넌트와 가까이 유지하여 유지보수성과 명확성을 높입니다.

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

### Intlayer 구성하기

Intlayer는 프로젝트 설정을 위한 구성 파일을 제공합니다. 이 파일을 프로젝트 루트에 배치하세요.

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

> 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

## 사용 예제

Intlayer를 사용하면 코드베이스 어디에서나 구조화된 방식으로 콘텐츠를 선언할 수 있습니다.

기본적으로 Intlayer는 확장자가 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`인 파일을 스캔합니다.

> 기본 확장자는 [구성 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에서 `contentDir` 속성을 설정하여 변경할 수 있습니다.

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

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "많은 자동차",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "마이너스 1대 미만의 자동차",
        "-1": "마이너스 1대의 자동차",
        "0": "자동차 없음",
        "1": "자동차 1대",
        ">5": "몇 대의 자동차",
        ">19": "많은 자동차"
      }
    }
  }
}
```

### 사전 빌드하기

[intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md)를 사용하여 사전을 빌드할 수 있습니다.

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

이 명령어는 모든 `*.content.*` 파일을 스캔하고, 컴파일하며, 결과를 **`intlayer.config.ts`** 파일에 지정된 디렉토리에 기록합니다(기본값은 `./.intlayer`).

일반적인 출력 예시는 다음과 같습니다:

```bash
.
└── .intlayer
    ├── dictionary  # 콘텐츠 사전을 포함합니다
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # 애플리케이션에서 사용할 사전의 진입점을 포함합니다
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # 사전의 자동 생성된 타입 정의를 포함합니다
        ├── intlayer.d.ts  # Intlayer의 자동 생성된 타입 정의를 포함합니다
        ├── client-component.d.ts
        └── server-component.d.ts
```

### i18next 리소스 빌드

Intlayer는 [i18next](https://www.i18next.com/)용 사전을 생성하도록 구성할 수 있습니다. 이를 위해 `intlayer.config.ts` 파일에 다음 구성을 추가해야 합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer에게 i18next용 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리입니다
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
    // Intlayer가 i18next용 메시지 파일을 생성하도록 지시합니다.
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리입니다.
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
    // Intlayer가 i18next용 메시지 파일을 생성하도록 지시합니다.
    dictionaryOutput: ["i18next"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리입니다.
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

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

예를 들어, **en/client-component.json** 파일은 다음과 같을 수 있습니다:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "몇 대의 자동차"
}
```

### next-intl 사전 빌드하기

Intlayer는 [i18next](https://www.i18next.com/) 또는 [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl)용 사전을 빌드하도록 구성할 수 있습니다. 이를 위해 `intlayer.config.ts` 파일에 다음 구성을 추가해야 합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Intlayer에게 i18next용 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
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
    // Intlayer에게 next-intl용 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉터리
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
    // Intlayer에게 next-intl용 메시지 파일을 생성하도록 지시합니다
    dictionaryOutput: ["next-intl"],

    // Intlayer가 메시지 JSON 파일을 작성할 디렉토리
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

출력 예:

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

예를 들어, **en/client-component.json** 파일은 다음과 같을 수 있습니다:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "안녕하세요 세계",
  "zero_numberOfCar": "차가 없습니다",
  "one_numberOfCar": "차 한 대",
  "two_numberOfCar": "차 두 대",
  "other_numberOfCar": "몇 대의 차"
}
```

## CLI 도구

Intlayer는 다음과 같은 CLI 도구를 제공합니다:

- 콘텐츠 선언을 감사하고 누락된 번역을 완성
- 콘텐츠 선언에서 사전(dictionary) 생성
- CMS에서 로컬 프로젝트로 원격 사전을 푸시 및 풀

자세한 내용은 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참고하세요.

## 애플리케이션에서 Intlayer 사용하기

콘텐츠가 선언되면, 애플리케이션에서 Intlayer 사전을 사용할 수 있습니다.

Intlayer는 애플리케이션용 패키지로 제공됩니다.

### React 애플리케이션

React 애플리케이션에서 Intlayer를 사용하려면 [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md)를 사용할 수 있습니다.

### Next.js 애플리케이션

Next.js 애플리케이션에서 Intlayer를 사용하려면 [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)를 사용할 수 있습니다.

### Express 애플리케이션

Express 애플리케이션에서 Intlayer를 사용하려면 [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/express-intlayer/index.md)를 사용할 수 있습니다.

## `intlayer` 패키지가 제공하는 함수들

`intlayer` 패키지는 애플리케이션의 국제화를 돕기 위한 몇 가지 함수도 제공합니다.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md)

## 문서 이력

- 5.5.10 - 2025-06-29: 이력 초기화
