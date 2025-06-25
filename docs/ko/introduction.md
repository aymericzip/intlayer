---
docName: introduction
url: /doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: 소개
description: Intlayer가 작동하는 방식을 알아보세요. 귀하의 애플리케이션에서 Intlayer가 사용하는 단계를 확인하세요. 다양한 패키지가 하는 일을 확인하세요.
keywords:
  - 소개
  - 시작하기
  - Intlayer
  - 애플리케이션
  - 패키지
---

# Intlayer 문서

공식 Intlayer 문서에 오신 것을 환영합니다! 여기에서 Next.js, React, Vite, Express 또는 기타 JavaScript 환경에서 국제화(i18n) 요구 사항을 통합, 구성 및 마스터하는 데 필요한 모든 정보를 찾을 수 있습니다.

## 소개

### Intlayer란 무엇인가요?

**Intlayer**는 JavaScript 개발자를 위해 설계된 국제화 라이브러리입니다. 코드를 작성하는 어디에서나 콘텐츠를 선언할 수 있도록 합니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있습니다. TypeScript를 사용하여 **Intlayer**는 개발을 더욱 강력하고 효율적으로 만듭니다.

Intlayer는 또한 콘텐츠를 쉽게 편집하고 관리할 수 있는 선택적 시각적 편집기를 제공합니다. 이 편집기는 콘텐츠 관리를 위한 시각적 인터페이스를 선호하는 개발자나 코드에 대해 걱정하지 않고 콘텐츠를 생성하는 팀에게 특히 유용합니다.

### 사용 예시

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

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## 주요 기능

Intlayer는 현대 웹 개발의 요구를 충족시키기 위해 다양한 기능을 제공합니다. 아래는 주요 기능과 각 기능에 대한 자세한 문서 링크입니다:

- **국제화 지원**: 내장된 국제화 지원으로 애플리케이션의 글로벌 도달 범위를 향상시킵니다.
- **시각적 편집기**: Intlayer를 위해 설계된 편집기 플러그인으로 개발 워크플로를 개선합니다. [시각적 편집기 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)를 확인하세요.
- **구성 유연성**: [구성 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에 자세히 설명된 광범위한 구성 옵션으로 설정을 사용자 정의하세요.
- **고급 CLI 도구**: Intlayer의 명령줄 인터페이스를 사용하여 프로젝트를 효율적으로 관리하세요. [CLI 도구 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)에서 기능을 탐색하세요.

## 핵심 개념

### 사전(Dictionary)

다국어 콘텐츠를 코드 가까이에 조직하여 모든 것을 일관되고 유지 관리 가능하게 만드세요.

- **[시작하기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)**  
  Intlayer에서 콘텐츠를 선언하는 기본 사항을 배우세요.

- **[번역](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/translation.md)**  
  번역이 생성, 저장 및 애플리케이션에서 활용되는 방법을 이해하세요.

- **[열거](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/enumeration.md)**  
  다양한 언어에서 반복되거나 고정된 데이터 세트를 쉽게 관리하세요.

- **[함수 가져오기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/function_fetching.md)**  
  프로젝트 워크플로에 맞는 사용자 정의 로직으로 콘텐츠를 동적으로 가져오는 방법을 확인하세요.

### 환경 및 통합

Intlayer는 유연성을 염두에 두고 설계되어 인기 있는 프레임워크 및 빌드 도구와 원활하게 통합됩니다:

- **[Next.js 15과 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)**
- **[Next.js 14(App Router)와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)**
- **[Next.js 페이지 라우터와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_page_router.md)**
- **[React CRA와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)**
- **[Vite + React와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)**
- **[Express와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_express.md)**

각 통합 가이드에는 **서버 사이드 렌더링**, **동적 라우팅**, **클라이언트 사이드 렌더링**과 같은 Intlayer 기능을 사용하는 모범 사례가 포함되어 있어 빠르고 SEO 친화적이며 고도로 확장 가능한 애플리케이션을 유지할 수 있습니다.

## 기여 및 피드백

우리는 오픈 소스와 커뮤니티 주도의 개발의 힘을 소중히 여깁니다. 개선 사항을 제안하거나 새로운 가이드를 추가하거나 문서의 문제를 수정하려면 [GitHub 리포지토리](https://github.com/aymericzip/intlayer/blob/main/docs)에서 Pull Request를 제출하거나 이슈를 열어주세요.

**애플리케이션을 더 빠르고 효율적으로 번역할 준비가 되셨나요?** Intlayer를 사용하여 문서를 탐색하고 오늘 바로 시작하세요. 콘텐츠를 체계적으로 유지하고 팀의 생산성을 높이는 강력하고 간소화된 국제화 접근 방식을 경험해 보세요.

행복한 번역 되세요!
