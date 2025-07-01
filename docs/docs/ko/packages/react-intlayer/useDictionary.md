---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary 훅 - React Intlayer 문서
description: 시각적 편집기 없이 지역화된 콘텐츠를 효율적으로 처리하기 위한 React 애플리케이션에서 useDictionary 훅 사용에 대한 완벽한 가이드입니다.
keywords:
  - useDictionary
  - React
  - 훅
  - intlayer
  - 지역화
  - i18n
  - 사전
  - 번역
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
---

# React 통합: `useDictionary` 훅 문서

이 섹션에서는 시각적 편집기 없이 지역화된 콘텐츠를 효율적으로 처리할 수 있도록 React 애플리케이션 내에서 `useDictionary` 훅을 사용하는 방법에 대해 자세히 안내합니다.

## React에서 `useDictionary` 가져오기

`useDictionary` 훅은 상황에 따라 다음과 같이 React 애플리케이션에 통합할 수 있습니다:

- **클라이언트 컴포넌트:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // 클라이언트 측 React 컴포넌트에서 사용
  ```

- **서버 컴포넌트:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // 서버 측 React 컴포넌트에서 사용
  ```

## 매개변수

이 훅은 두 개의 매개변수를 받습니다:

1. **`dictionary`**: 특정 키에 대한 현지화된 콘텐츠를 포함하는 선언된 사전 객체입니다.
2. **`locale`** (선택 사항): 원하는 로케일입니다. 지정하지 않으면 현재 컨텍스트의 로케일이 기본값으로 사용됩니다.

## 사전

모든 사전 객체는 타입 안전성을 보장하고 런타임 오류를 방지하기 위해 구조화된 콘텐츠 파일에 선언되어야 합니다. [설정 지침은 여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)에서 확인할 수 있습니다. 다음은 콘텐츠 선언 예시입니다:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
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
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "클라이언트 컴포넌트 예제",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "이것은 클라이언트 컴포넌트 예제의 내용입니다",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
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
};

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente",
        "ko": "클라이언트 컴포넌트 예제"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "ko": "이것은 클라이언트 컴포넌트 예제의 내용입니다"
      }
    }
  }
}
```

## React에서의 사용 예제

아래는 React 컴포넌트에서 `useDictionary` 훅을 사용하는 예제입니다:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## 서버 통합

`IntlayerProvider` 외부에서 `useDictionary` 훅을 사용하는 경우, 컴포넌트를 렌더링할 때 로케일을 명시적으로 파라미터로 제공해야 합니다:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## 속성에 대한 참고 사항

비주얼 에디터를 사용하는 통합과 달리, `buttonTitle.value`와 같은 속성은 여기서 적용되지 않습니다. 대신, 콘텐츠에 선언된 대로 로컬라이즈된 문자열에 직접 접근하세요.

```jsx
<button title={content.title}>{content.content}</button>
```

## 추가 팁

- **타입 안전성**: 항상 `Dictionary`를 사용하여 사전을 정의하여 타입 안전성을 보장하세요.
- **로컬라이제이션 업데이트**: 콘텐츠를 업데이트할 때 모든 로케일이 일관되도록 하여 번역 누락을 방지하세요.

이 문서는 `useDictionary` 훅의 통합에 중점을 두어, 비주얼 에디터 기능에 의존하지 않고 로컬라이즈된 콘텐츠를 관리하는 간소화된 접근법을 제공합니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 이력 초기화
