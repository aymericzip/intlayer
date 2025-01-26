# React Integration: `useDictionary` Hook Documentation

이 섹션에서는 React 애플리케이션 내에서 `useDictionary` 훅을 사용하는 방법에 대한 자세한 가이드를 제공합니다. 이를 통해 시각적 편집기 없이 지역화된 콘텐츠를 효과적으로 처리할 수 있습니다.

## Importing `useDictionary` in React

`useDictionary` 훅은 컨텍스트에 따라 React 애플리케이션에 통합될 수 있습니다:

- **클라이언트 컴포넌트:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용됨
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용됨
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // 클라이언트 측 React 컴포넌트에서 사용됨
  ```

- **서버 컴포넌트:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용됨
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용됨
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // 서버 측 React 컴포넌트에서 사용됨
  ```

## Parameters

이 훅은 두 개의 매개변수를 받습니다:

1. **`dictionary`**: 특정 키에 대한 지역화된 콘텐츠를 포함하는 선언된 사전 객체.
2. **`locale`** (선택 사항): 원하는 로케일. 지정되지 않으면 현재 컨텍스트의 로케일이 기본값으로 사용됩니다.

## Content Declaration

모든 사전 객체는 타입 안전성을 보장하고 런타임 오류를 방지하기 위해 구조화된 콘텐츠 파일에서 선언되어야 합니다. 설정 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)에서 확인할 수 있습니다. 콘텐츠 선언의 예는 다음과 같습니다:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

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
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## Example Usage in React

다음은 React 컴포넌트에서 `useDictionary` 훅을 사용하는 방법에 대한 예입니다:

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

## Server Integration

`useDictionary` 훅을 `IntlayerProvider` 외부에서 사용하는 경우, 컴포넌트를 렌더링할 때 로케일을 매개변수로 명시적으로 제공해야 합니다:

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

## Notes on Attributes

시각적 편집기를 사용하는 통합과 달리, `buttonTitle.value`와 같은 속성은 여기에서 적용되지 않습니다. 대신 선언된 지역화된 문자열에 직접 접근하세요.

```jsx
<button title={content.title}>{content.content}</button>
```

## Additional Tips

- **타입 안전성**: 항상 `DeclarationContent`를 사용하여 사전을 정의하여 타입 안전성을 보장하세요.
- **지역화 업데이트**: 콘텐츠를 업데이트할 때 모든 로케일이 일치하는지 확인하여 누락된 번역을 방지하세요.

이 문서는 `useDictionary` 훅의 통합에 중점을 두어 시각적 편집기 기능에 의존하지 않고 지역화된 콘텐츠를 관리하는 간소화된 접근 방식을 제공합니다.
