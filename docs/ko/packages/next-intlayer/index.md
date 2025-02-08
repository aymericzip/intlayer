# next-intlayer: NPM 패키지를 사용하여 Next.js 애플리케이션 국제화(i18n)

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, Next.js 및 Express.js와 같은 프레임워크와 호환됩니다.

**`next-intlayer` 패키지**를 사용하면 Next.js 애플리케이션을 국제화할 수 있습니다. 이 패키지는 Next.js 국제화를 위한 컨텍스트 프로바이더 및 훅을 제공합니다. 또한 Intlayer와 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)을 통합하기 위한 Next.js 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하기 위한 미들웨어를 포함합니다.

## Next.js 애플리케이션을 국제화해야 하는 이유

Next.js 애플리케이션을 국제화하는 것은 글로벌 사용자를 효과적으로 서비스하기 위해 필수적입니다. 이를 통해 사용자의 선호 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이 기능은 사용자 경험을 향상시키고 다양한 언어적 배경을 가진 사람들에 대해 애플리케이션의 접근성과 관련성을 높여줍니다.

## Intlayer 통합의 장점은 무엇인가요?

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리할 수 있습니다.
- **타입 안전한 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 합니다.
- **통합된 콘텐츠 파일**: 번역을 각 구성 요소에 가깝게 유지하여 유지 보수성과 명확성을 향상시킵니다.

## 설치

선택한 패키지 관리자를 사용하여 필요한 패키지를 설치하십시오:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## 사용 예제

Intlayer를 사용하면 코드베이스의 어느 곳에서나 구조화된 방식으로 콘텐츠를 선언할 수 있습니다.

기본적으로, Intlayer는 `.content.{ts,tsx,js,jsx,mjs,cjs}` 확장자를 가진 파일을 스캔합니다.

> 기본 확장자는 [설정 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에서 `contentDir` 속성을 설정하여 수정할 수 있습니다.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
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
    └── components
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
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### 콘텐츠 선언

`next-intlayer`는 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/index.md)와 함께 작동하도록 만들어졌습니다. `intlayer`는 코드의 어디에서나 콘텐츠를 선언할 수 있게 해주는 패키지입니다. 이 패키지는 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 애플리케이션에 원활하게 통합할 수 있도록 합니다.

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

콘텐츠를 선언한 후에는 코드에서 이를 사용할 수 있습니다. 다음은 React 구성 요소에서 콘텐츠를 사용하는 방법에 대한 예입니다:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Next.js 애플리케이션의 국제화 마스터하기

Intlayer는 Next.js 애플리케이션을 국제화하는 데 도움이 되는 다양한 기능을 제공합니다. 주요 기능은 다음과 같습니다:

- **서버 구성 요소의 국제화**: Intlayer는 클라이언트 구성 요소와 동일한 방식으로 서버 구성 요소를 국제화할 수 있게 해줍니다. 즉, 클라이언트와 서버 구성 요소 모두에 대해 동일한 콘텐츠 선언을 사용할 수 있습니다.
- **로케일 감지 미들웨어**: Intlayer는 사용자의 선호 로케일을 감지하기 위한 미들웨어를 제공합니다. 이 미들웨어는 사용자의 선호 로케일을 감지하고 [구성](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에서 지정한 대로 적절한 URL로 리디렉션합니다.
- **메타데이터의 국제화**: Intlayer는 Next.js에서 제공하는 `generateMetadata` 함수를 사용하여 페이지 제목과 같은 메타데이터를 국제화하는 방법을 제공합니다. 메타데이터를 번역하기 위해 `getTranslation` 함수를 사용할 수 있습니다.
- **sitemap.xml 및 robots.txt의 국제화**: Intlayer는 sitemap.xml 및 robots.txt 파일을 국제화할 수 있게 해줍니다. `getMultilingualUrls` 함수를 사용하여 sitemap에 대한 다국어 URL을 생성할 수 있습니다.
- **URL의 국제화**: Intlayer는 `getMultilingualUrls` 함수를 사용하여 URL을 국제화할 수 있게 해줍니다. 이 함수는 sitemap에 대한 다국어 URL을 생성합니다.

**이 기능에 대한 자세한 내용은 [Intlayer 및 Next.js 15 App Router와 함께하는 Next.js 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md) 가이드를 참조하십시오.**

## `next-intlayer` 패키지에서 제공하는 함수들

`next-intlayer` 패키지는 애플리케이션을 국제화하는 데 도움이 되는 여러 함수를 제공합니다.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useIntlayerAsync.md)
