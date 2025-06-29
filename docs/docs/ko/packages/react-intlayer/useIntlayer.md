---
docName: package__react-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer 훅 설명서 | react-intlayer
description: react-intlayer 패키지에 대한 useIntlayer 훅 사용 방법을 확인하세요
keywords:
  - useIntlayer
  - 사전
  - 키
  - Intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# React 통합: `useIntlayer` 훅 문서

이 섹션은 React 애플리케이션 내에서 `useIntlayer` 훅을 사용하여 효율적인 콘텐츠 로컬라이제이션을 구현하는 방법에 대한 자세한 지침을 제공합니다.

## React에서 `useIntlayer` 가져오기

`useIntlayer` 훅은 다음과 같이 React 애플리케이션에 통합할 수 있습니다:

- **클라이언트 컴포넌트:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // 클라이언트 측 React 컴포넌트에서 사용
  ```

- **서버 컴포넌트:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // 서버 측 React 컴포넌트에서 사용
  ```

## 매개변수

이 훅은 두 개의 매개변수를 받습니다:

1. **`key`**: 로컬라이즈된 콘텐츠를 가져오기 위한 딕셔너리 키.
2. **`locale`** (선택 사항): 원하는 로케일. 지정하지 않으면 컨텍스트의 로케일을 기본값으로 사용합니다.

## 딕셔너리

모든 딕셔너리 키는 타입 안전성을 높이고 오류를 방지하기 위해 콘텐츠 선언 파일 내에 선언되어야 합니다. 설정 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)에서 확인할 수 있습니다.

## React에서의 사용 예시

React 컴포넌트 내에서 `useIntlayer` 훅을 사용하는 예시:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 속성 처리

속성을 로컬라이즈할 때는 콘텐츠 값을 적절히 접근합니다:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 추가 리소스

- **Intlayer 비주얼 에디터**: 보다 직관적인 콘텐츠 관리 경험을 위해 비주얼 에디터 문서를 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)에서 참조하세요.

이 섹션은 React 애플리케이션에서 `useIntlayer` 훅의 통합을 구체적으로 다루며, 로컬라이제이션 프로세스를 단순화하고 다양한 로케일에서 콘텐츠 일관성을 보장합니다.
