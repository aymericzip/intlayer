---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2024-08-14
title: Intlayer의 이점
description: 프로젝트에서 Intlayer를 사용할 때의 이점과 장점을 알아보세요. Intlayer가 다른 프레임워크 중에서 두드러지는 이유를 이해하세요.
keywords:
  - 장점
  - 이점
  - Intlayer
  - 프레임워크
  - 비교
---

# Intlayer: 웹사이트를 번역하는 맞춤형 방법

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 코드 어디에서나 콘텐츠를 선언할 수 있습니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있습니다. TypeScript를 사용하여 **Intlayer**는 개발을 더욱 견고하고 효율적으로 만듭니다.

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

/** @type {import('intlayer').Dictionary} */
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

/** @type {import('intlayer').Dictionary} */
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

## Intlayer를 선택해야 하는 이유?

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리할 수 있습니다.
- **타입 안전 환경**: TypeScript를 사용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 보장합니다.
- **통합된 콘텐츠 파일**: 번역을 각각의 컴포넌트 근처에 유지하여 유지보수성과 명확성을 향상시킵니다.
- **간소화된 설정**: 최소한의 설정으로 빠르게 시작할 수 있으며, Next.js 프로젝트에 특히 최적화되어 있습니다.
- **서버 컴포넌트 지원**: Next.js 서버 컴포넌트에 완벽하게 적합하여 원활한 서버 사이드 렌더링을 보장합니다.
- **개선된 라우팅**: Next.js 애플리케이션 라우팅을 완벽하게 지원하여 복잡한 애플리케이션 구조에 원활하게 적응합니다.
- **정리된 코드베이스**: 코드베이스를 더욱 정리된 상태로 유지합니다: 1 컴포넌트 = 1 사전을 같은 폴더에 배치.
- **자동 TypeScript 타입**: TypeScript 타입이 자동으로 구현되어 키 이름 변경이나 삭제로 인한 코드 손상을 방지합니다.
- **CI 자동 번역**: 자체 OpenAI API 키를 사용하여 CI에서 번역을 자동으로 채우고 L10n 플랫폼의 필요성을 없앱니다.
- **MCP 서버 통합**: IDE 자동화를 위한 MCP (Model Context Protocol) 서버를 제공하여 개발 환경 내에서 직접 콘텐츠 관리 및 i18n 워크플로우를 원활하게 실현합니다. [자세히 알아보기](https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md).
- **마크다운 지원**: 개인정보 보호정책과 같은 다국어 콘텐츠를 위해 마크다운 파일을 가져오고 해석합니다.
- **무료 시각적 에디터 및 CMS**: 콘텐츠 작성자와 번역 작업을 수행해야 하는 경우 사용할 수 있는 무료 시각적 에디터와 CMS를 제공하여 다시 한 번 현지화 플랫폼의 필요성을 제거하고 코드베이스에서 콘텐츠를 외부화할 수 있게 합니다.
- **간소화된 콘텐츠 검색**: 각 콘텐츠 요소에 대해 `t` 함수를 호출할 필요가 없으며, 단일 훅을 사용하여 모든 콘텐츠를 직접 검색할 수 있습니다.
- **일관된 구현**: 클라이언트와 서버 컴포넌트에 동일한 구현을 사용하며, 각 서버 컴포넌트를 통해 `t` 함수를 전달할 필요가 없습니다.
- **Tree-shakable 콘텐츠**: 콘텐츠는 tree-shakable하여 최종 번들을 가볍게 만듭니다.
- **비차단 정적 렌더링**: Intlayer는 `next-intl`처럼 정적 렌더링을 차단하지 않습니다.
- **상호 운용성**: [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-intl.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-intl.md)과의 상호 운용성을 가능하게 합니다.
