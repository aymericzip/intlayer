# React Integration: `useDictionary` 훅 문서

이 섹션에서는 `useDictionary` 훅을 React 애플리케이션 내에서 사용하는 방법에 대한 자세한 안내를 제공하며, 시각 편집기 없이 지역화된 콘텐츠를 효율적으로 처리할 수 있도록 합니다.

## React에서 `useDictionary` 가져오기

`useDictionary` 훅은 컨텍스트에 따라 React 애플리케이션에 통합할 수 있습니다:

- **클라이언트 컴포넌트:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용됩니다
  ```

- **서버 컴포넌트:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // 서버 측 React 컴포넌트에서 사용됩니다
  ```

## 매개변수

이 훅은 두 개의 매개변수를 받습니다:

1. **`dictionary`**: 특정 키에 대한 지역화된 콘텐츠를 포함하는 선언된 사전 객체입니다.
2. **`locale`** (선택 사항): 원하는 로케일. 명시되지 않은 경우 현재 컨텍스트의 로케일로 기본 설정됩니다.

## 콘텐츠 선언

모든 사전 객체는 유형 안전성을 보장하고 런타임 오류를 방지하기 위해 구조화된 콘텐츠 파일에 선언되어야 합니다. 설정 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)에서 확인할 수 있습니다. 다음은 콘텐츠 선언의 예입니다:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## React에서의 사용 예

아래는 React 컴포넌트에서 `useDictionary` 훅을 사용하는 방법의 예입니다:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## 서버 통합

`IntlayerServerProvider` 외부에서 `useDictionary` 훅을 사용하는 경우, 컴포넌트를 렌더링할 때 로케일을 매개변수로 명시적으로 제공해야 합니다:

```tsx
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## 속성에 대한 주의 사항

시각 편집기를 사용하는 통합과 달리, `buttonTitle.value`와 같은 속성은 여기서 적용되지 않습니다. 대신, 콘텐츠에 선언된 대로 지역화된 문자열에 직접 접근하십시오.

```tsx
<button title={content.title}>{content.content}</button>
```

## 추가 팁

- **유형 안전성**: 항상 `DeclarationContent`를 사용하여 사전을 정의하여 유형 안전성을 보장하십시오.
- **지역화 업데이트**: 콘텐츠를 업데이트할 때 모든 로케일이 일관되도록 하여 누락된 번역을 방지하세요.

이 문서는 `useDictionary` 훅의 통합에 초점을 맞추어 시각 편집기 기능에 의존하지 않고 지역화된 콘텐츠를 관리하는 간소화된 접근 방식을 제공합니다.
