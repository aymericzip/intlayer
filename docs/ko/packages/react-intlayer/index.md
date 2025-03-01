# react-intlayer: React 애플리케이션을 국제화(i18n)하기 위한 NPM 패키지

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`react-intlayer` 패키지**는 React 애플리케이션을 국제화할 수 있도록 도와줍니다. React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

## React 애플리케이션을 국제화해야 하는 이유?

React 애플리케이션을 국제화하는 것은 글로벌 사용자에게 효과적으로 서비스를 제공하기 위해 필수적입니다. 이를 통해 애플리케이션이 각 사용자의 선호 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이 기능은 사용자 경험을 향상시키고 애플리케이션의 접근성과 관련성을 높여 다양한 언어적 배경을 가진 사람들에게 더 널리 다가갈 수 있도록 합니다.

## Intlayer를 통합해야 하는 이유?

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리할 수 있습니다.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의를 정확하고 오류 없이 유지합니다.
- **통합된 콘텐츠 파일**: 번역을 해당 컴포넌트와 가까운 위치에 유지하여 유지보수성과 명확성을 향상시킵니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## 사용 예제

Intlayer를 사용하면 코드베이스 어디에서나 구조화된 방식으로 콘텐츠를 선언할 수 있습니다.

기본적으로 Intlayer는 `.content.{ts,tsx,js,jsx,mjs,cjs}` 확장자를 가진 파일을 스캔합니다.

> [설정 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)의 `contentDir` 속성을 설정하여 기본 확장자를 수정할 수 있습니다.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### 콘텐츠 선언하기

`react-intlayer`는 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/index.md)와 함께 작동하도록 설계되었습니다. `intlayer`는 코드 어디에서나 콘텐츠를 선언할 수 있도록 해주는 패키지입니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 애플리케이션에 원활하게 통합합니다.

다음은 콘텐츠 선언 예제입니다:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

// 한국어 주석: 콘텐츠 선언
const component1Content = {
  key: "component-1",
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
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 한국어 주석: 콘텐츠 선언
const component1Content = {
  key: "component-1",
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
      ">19": "Many cars",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 한국어 주석: 콘텐츠 선언
const component1Content = {
  key: "component-1",
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
      ">19": "Many cars",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
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

### 코드에서 콘텐츠 활용하기

콘텐츠를 선언한 후에는 코드에서 사용할 수 있습니다. 다음은 React 컴포넌트에서 콘텐츠를 사용하는 예제입니다:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## React 애플리케이션의 국제화 마스터하기

Intlayer는 React 애플리케이션을 국제화하는 데 도움이 되는 다양한 기능을 제공합니다.

**이러한 기능에 대해 자세히 알아보려면 [Intlayer와 Vite 및 React를 사용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md) 가이드 또는 [Intlayer와 React(CRA)를 사용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md) 가이드를 참조하세요.**

## `react-intlayer` 패키지가 제공하는 함수

`react-intlayer` 패키지는 애플리케이션을 국제화하는 데 도움이 되는 몇 가지 함수를 제공합니다.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayerAsync.md)
