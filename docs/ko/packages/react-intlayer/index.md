# react-intlayer: NPM 패키지로 React 애플리케이션을 국제화(i18n)합니다

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`react-intlayer` 패키지**는 React 애플리케이션을 국제화할 수 있게 해줍니다. React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

## 왜 React 애플리케이션을 국제화해야 할까요?

React 애플리케이션을 국제화하는 것은 전 세계 고객에게 효과적으로 서비스를 제공하는 데 필수적입니다. 사용자가 선호하는 언어로 콘텐츠와 메시지를 전달할 수 있도록 합니다. 이 기능은 사용자 경험을 향상시키고 다양한 언어적 배경을 가진 사람들에게 더 접근 가능하고 관련성 있게 만들어 애플리케이션의 도달 범위를 넓혀줍니다.

## Intlayer를 통합해야 하는 이유는 무엇인가요?

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리합니다.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장합니다.
- **통합된 콘텐츠 파일**: 번역을 해당 구성 요소 가까이에 유지하여 유지 관리와 명확성을 향상시킵니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요.

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## 사용 예시

Intlayer를 사용하면 코드베이스의 어느 곳에서나 콘텐츠를 구조화된 방식으로 선언할 수 있습니다.

기본적으로 Intlayer는 `.content.{ts,tsx,js,jsx,mjs,cjs}` 확장자를 가진 파일을 검색합니다.

> 기본 확장자는 [구성 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)의 `contentDir` 속성을 설정하여 수정할 수 있습니다.

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

`react-intlayer`는 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/index.md)와 함께 작동하도록 만들어졌습니다.`intlayer`는 코드 어디에서나 콘텐츠를 선언할 수 있게 해주는 패키지입니다. 이는 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 애플리케이션에 매끄럽게 통합합니다.

다음은 콘텐츠 선언의 예입니다:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

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
} satisfies DeclarationContent;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

콘텐츠를 선언한 후, 코드를 사용하여 활용할 수 있습니다. React 컴포넌트에서 콘텐츠를 사용하는 방법의 예는 다음과 같습니다:

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

## React 애플리케이션의 국제화를 마스터하기

Intlayer는 React 애플리케이션을 국제화하는 데 도움을 주는 많은 기능을 제공합니다.

**기능에 대해 더 알아보려면 [Intlayer 및 Vite와 React를 사용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md) 가이드를 참조하거나 [Intlayer 및 React(Create React App)를 사용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md) 가이드를 참조하세요.**

## `react-intlayer` 패키지에서 제공하는 함수

`react-intlayer` 패키지는 또한 애플리케이션의 국제화를 돕기 위한 몇 가지 함수를 제공합니다.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayerAsync.md)
