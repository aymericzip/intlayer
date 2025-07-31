---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 패키지 문서 | react-intlayer
description: react-intlayer 패키지 사용 방법 보기
keywords:
  - Intlayer
  - react-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
---

# react-intlayer: React 애플리케이션을 국제화(i18n)하기 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`react-intlayer` 패키지**는 React 애플리케이션을 국제화할 수 있게 해줍니다. React 국제화를 위한 컨텍스트 프로바이더와 훅을 제공합니다.

## React 애플리케이션을 국제화해야 하는 이유

React 애플리케이션을 국제화하는 것은 전 세계 사용자에게 효과적으로 서비스를 제공하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자가 선호하는 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고, 다양한 언어 배경을 가진 사람들에게 더 접근 가능하고 관련성 높은 애플리케이션으로 만들어 애플리케이션의 범위를 넓혀줍니다.

## Intlayer를 통합해야 하는 이유

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리할 수 있습니다.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장합니다.
- **통합된 콘텐츠 파일**: 번역을 해당 컴포넌트와 가까이 유지하여 유지보수성과 명확성을 향상시킵니다.

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

## 사용 예시

Intlayer를 사용하면 코드베이스 어디에서나 구조화된 방식으로 콘텐츠를 선언할 수 있습니다.

기본적으로 Intlayer는 확장자가 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`인 파일을 스캔합니다.

> 기본 확장자는 [설정 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에서 `contentDir` 속성을 설정하여 변경할 수 있습니다.

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

`react-intlayer`는 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/index.md)와 함께 작동하도록 만들어졌습니다. `intlayer`는 코드 어디서든 콘텐츠를 선언할 수 있게 해주는 패키지입니다. 다국어 콘텐츠 선언을 구조화된 사전(dictionary)으로 변환하여 애플리케이션에 원활하게 통합할 수 있습니다.

다음은 콘텐츠 선언 예시입니다:

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
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
} satisfies Dictionary;

export default component1Content;
```

```jsx fileName="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "차 없음",
      "1": "한 대의 차",
      ">5": "몇 대의 차",
      ">19": "많은 차",
    }),
  },
};

export default component1Content;
```

```jsx fileName="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "마이너스 1대 미만의 차",
      "-1": "마이너스 1대의 차",
      "0": "차 없음",
      "1": "한 대의 차",
      ">5": "몇 대의 차",
      ">19": "많은 차",
    }),
  },
};

module.exports = component1Content;
```

```json fileName="src/Component1/index.content.json" codeFormat="json"
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

### 코드에서 콘텐츠 활용하기

콘텐츠를 선언한 후, 코드에서 이를 사용할 수 있습니다. 다음은 React 컴포넌트에서 콘텐츠를 사용하는 예제입니다:

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

**이 기능들에 대해 더 알아보려면, Vite 및 React 애플리케이션용 [Intlayer와 함께하는 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md) 가이드나, React Create App용 [Intlayer와 함께하는 React 국제화(i18n) (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md) 가이드를 참고하세요.**

## `react-intlayer` 패키지가 제공하는 함수들

`react-intlayer` 패키지는 애플리케이션의 국제화를 돕기 위한 몇 가지 함수도 제공합니다.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/t.md)
  **이 기능들에 대해 더 알아보려면, Vite 및 React 애플리케이션용 [Intlayer와 Vite 및 React를 이용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md) 가이드나 React Create App용 [Intlayer와 React (CRA)를 이용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md) 가이드를 참조하세요.**

## `react-intlayer` 패키지에서 제공하는 함수들

`react-intlayer` 패키지는 애플리케이션의 국제화를 돕기 위한 몇 가지 함수도 제공합니다.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayerAsync.md)

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력 생성
