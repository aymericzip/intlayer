# Intlayer Documentation

Intlayer 문서에 오신 것을 환영합니다. 이 가이드는 Intlayer에 대한 개요, 주요 기능 및 이러한 문서를 효과적으로 활용하여 개발 경험을 향상시키는 방법을 제공합니다.

## Introduction

### What is Intlayer?

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 코드의 모든 곳에서 콘텐츠를 선언할 수 있도록 합니다. 다국어 콘텐츠의 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있도록 합니다. TypeScript를 사용하여 **Intlayer**는 개발을 더 강력하고 효율적으로 만들어 줍니다.

Intlayer는 또한 콘텐츠를 쉽게 편집하고 관리할 수 있는 선택적 비주얼 편집기를 제공합니다. 이 편집기는 코드에 대한 걱정 없이 콘텐츠를 생성하는 팀이나 비주얼 인터페이스를 선호하는 개발자에게 특히 유용합니다.

## Example of usage

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### Main Features

Intlayer는 현대 웹 개발의 필요를 충족하기 위해 다양한 기능을 제공합니다. 아래는 주요 기능과 각 기능에 대한 상세 문서 링크입니다:

- **Internationalization Support**: 국제화에 대한 내장 지원으로 애플리케이션의 글로벌 범위를 확장하십시오.
- **Visual Editor**: Intlayer를 위해 설계된 편집기 플러그인으로 개발 워크플로를 개선하십시오. [비주얼 편집기 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)를 확인하세요.
- **Configuration Flexibility**: [구성 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에 자세히 설명된 광범위한 구성 옵션으로 설정을 사용자 정의하십시오.
- **Advanced CLI Tools**: Intlayer의 명령줄 인터페이스를 사용하여 프로젝트를 효율적으로 관리하십시오. [CLI 도구 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)에서 기능을 탐색하십시오.
- **Compatibility with i18n**: Intlayer는 다른 국제화 라이브러리와 원활하게 작동합니다. 추가 정보는 [i18n 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_i18next.md)를 확인하세요.

### Platforms Supported

Intlayer는 Next.js 및 React 애플리케이션과 원활하게 작동하도록 설계되었습니다. 또한 Vite 및 Create React App을 지원합니다.

- **Next.js Integration**: 서버 측 렌더링 및 정적 사이트 생성을 위해 Intlayer 내에서 Next.js의 힘을 활용하십시오. 세부 정보는 [Next.js 통합 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)에서 확인할 수 있습니다.
- **Vite and React Integration**: 서버 측 렌더링 및 정적 사이트 생성을 위해 Intlayer 내에서 Vite를 활용하십시오. 세부 정보는 [Vite 및 React 통합 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)에서 확인할 수 있습니다.
- **Create React App Integration**: 서버 측 렌더링 및 정적 사이트 생성을 위해 Intlayer 내에서 Create React App의 힘을 활용하십시오. 세부 정보는 [Create React App 통합 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)에서 확인할 수 있습니다.

### How to Use This Docs

이 문서를 최대한 활용하려면:

1. **Relevant Sections로 이동하십시오**: 필요한 내용을 다루는 섹션으로 직접 이동하기 위해 위에 제공된 링크를 사용하십시오.
2. **Interactive Examples**: 사용 가능한 경우, 대화형 예제를 활용하여 기능이 실시간으로 작동하는 모습을 확인하십시오.
3. **Feedback and Contributions**: 귀하의 피드백은 소중합니다. 제안사항이나 수정사항이 있는 경우, 문서 기여를 고려해 주십시오.
