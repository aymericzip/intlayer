# Intlayer: 애플리케이션을 번역하는 더 가까운 방법

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 이 라이브러리는 코드의 모든 곳에서 콘텐츠를 선언할 수 있게 해줍니다. 다국어 콘텐츠의 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있도록 합니다. TypeScript를 사용하여 **Intlayer**는 개발을 더 강력하고 효율적으로 만듭니다.

## 사용 예시

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## 왜 Intlayer를 선택해야 하나요?

- **JavaScript 기반 콘텐츠 관리**: JavaScript의 유연성을 활용하여 콘텐츠를 효율적으로 정의하고 관리하세요.
- **타입 안전 환경**: TypeScript를 활용하여 모든 콘텐츠 정의가 정확하고 오류가 없도록 합니다.
- **통합된 콘텐츠 파일**: 번역을 해당하는 구성 요소 근처에 보관하여 유지 관리성과 명확성을 향상시킵니다.
- **간소화된 설정**: 최소한의 구성으로 빠르게 시작할 수 있도록 설계되어 Next.js 프로젝트에 특히 최적화되어 있습니다.
- **서버 컴포넌트 지원**: Next.js 서버 컴포넌트에 완벽하게 적합하며 매끄러운 서버 측 렌더링을 보장합니다.
- **개선된 라우팅**: 복잡한 애플리케이션 구조에 원활하게 적응할 수 있도록 Next.js 앱 라우팅을 완벽하게 지원합니다.
- **상호 운용성**: i18next의 상호 운용성을 허용합니다. (베타)
