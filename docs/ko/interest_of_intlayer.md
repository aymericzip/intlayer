# Intlayer: 애플리케이션을 번역하는 더 가까운 방법

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 코드 어디에서나 콘텐츠를 선언할 수 있습니다. 다국어 콘텐츠의 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있습니다. TypeScript를 사용하여 **Intlayer**는 개발을 더 강력하고 효율적으로 만들어 줍니다.

## 사용 예시

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## 왜 Intlayer를 선택해야 하나요?

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 효율적으로 콘텐츠를 정의하고 관리하세요.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장합니다.
- **통합된 콘텐츠 파일**: 번역을 해당 구성 요소 가까이에 유지하여 유지 관리성과 명확성을 높입니다.
- **간소화된 설정**: 최소한의 구성으로 빠르게 시작할 수 있으며, 특히 Next.js 프로젝트에 최적화되어 있습니다.
- **서버 컴포넌트 지원**: Next.js 서버 컴포넌트에 완벽하게 적합하여 매끄러운 서버 사이드 렌더링을 보장합니다.
- **향상된 라우팅**: Next.js 앱 라우팅에 대한 완전한 지원, 복잡한 애플리케이션 구조에 원활하게 적응합니다.
- **상호 운용성**: i18next 상호 운용성을 허용합니다. (베타)
