# Intlayer 문서

Intlayer 문서에 오신 것을 환영합니다. 이 가이드는 Intlayer의 전반적인 개요, 주요 기능 및 개발 경험을 향상시키기 위해 이러한 문서를 효과적으로 활용하는 방법을 제공합니다.

## 소개

### Intlayer란 무엇인가요?

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 이 라이브러리는 코드 어디에서나 콘텐츠를 선언할 수 있도록 해줍니다. 다국어 콘텐츠의 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있게 합니다. TypeScript를 사용하여 **Intlayer**는 개발을 더 강력하고 효율적으로 만들어 줍니다.

Intlayer는 또한 콘텐츠를 쉽게 편집하고 관리할 수 있는 선택적 비주얼 편집기를 제공합니다. 이 편집기는 코드에 대해 걱정하지 않고 콘텐츠를 생성하는 팀이나 시각적 인터페이스를 선호하는 개발자에게 특히 유용합니다.

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

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

### 주요 기능

Intlayer는 현대 웹 개발의 요구에 맞춘 다양한 기능을 제공합니다. 아래는 각각에 대한 자세한 문서 링크와 함께 주요 기능입니다:

- **국제화 지원**: 국제화에 대한 기본 지원으로 애플리케이션의 글로벌 범위를 향상시킵니다.
- **비주얼 편집기**: Intlayer를 위한 편집기 플러그인으로 개발 워크플로를 개선합니다. [비주얼 편집기 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)를 확인하세요.
- **구성 유연성**: [구성 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에 자세히 설명된 광범위한 구성 옵션으로 설정을 사용자화할 수 있습니다.
- **고급 CLI 도구**: Intlayer의 명령줄 인터페이스를 사용하여 프로젝트를 효율적으로 관리합니다. [CLI 도구 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)에서 기능을 탐색하세요.
- **i18n 호환성**: Intlayer는 다른 국제화 라이브러리와 원활하게 작동합니다. [i18n 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_i18next.md)에서 자세한 내용을 확인하세요.

### 지원 플랫폼

Intlayer는 Next.js 및 React 애플리케이션과 원활하게 작동하도록 설계되었습니다. 또한 Vite 및 Create React App을 지원합니다.

- **Next.js 통합**: 서버 사이드 렌더링 및 정적 사이트 생성을 위해 Intlayer 내에서 Next.js의 힘을 활용하세요. 자세한 내용은 [Next.js 통합 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)에서 확인할 수 있습니다.
- **Vite 및 React 통합**: 서버 사이드 렌더링 및 정적 사이트 생성을 위해 Intlayer 내에서 Vite를 활용하세요. 자세한 내용은 [Vite 및 React 통합 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)에서 확인할 수 있습니다.
- **Create React App 통합**: 서버 사이드 렌더링 및 정적 사이트 생성을 위해 Intlayer 내에서 Create React App의 힘을 활용하세요. 자세한 내용은 [Create React App 통합 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)에서 확인할 수 있습니다.

### 이 문서 사용 방법

이 문서에서 최대한의 효과를 얻으려면:

1. **관련 섹션으로 이동**: 위에 제공된 링크를 사용하여 귀하의 필요를 충족하는 섹션으로 직접 이동하세요.
2. **인터랙티브 예시**: 가능한 경우, 인터랙티브 예시를 활용하여 기능이 실제로 어떻게 작동하는지 확인하세요.
3. **피드백 및 기여**: 귀하의 피드백은 소중합니다. 제안이나 수정 사항이 있는 경우, 문서에 기여를 고려해 주세요.
