# React 통합: `useIntlayer` 훅 문서

이 섹션은 React 애플리케이션 내에서 `useIntlayer` 훅을 사용하는 것에 대한 자세한 가이드를 제공하며, 효율적인 콘텐츠 현지화를 가능하게 합니다.

## React에서 `useIntlayer` 가져오기

`useIntlayer` 훅은 상황에 따라 React 애플리케이션에 통합될 수 있습니다:

- **클라이언트 컴포넌트:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용
  ```

- **서버 컴포넌트:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용
  ```

## 매개변수

이 훅은 두 개의 매개변수를 수용합니다:

1. **`key`**: 지역화된 콘텐츠를 검색하기 위한 사전 키입니다.
2. **`locale`** (선택 사항): 원하는 로케일입니다. 지정하지 않으면 컨텍스트의 로케일이 기본값으로 설정됩니다.

## 콘텐츠 선언

모든 사전 키는 타입 안전성을 높이고 오류를 피하기 위해 콘텐츠 선언 파일 내에서 선언해야 합니다. 설정 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)에서 찾을 수 있습니다.

## React에서의 사용 예

React 컴포넌트 내에서 `useIntlayer` 훅을 시연하는 예:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

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

## 속성 처리

속성을 지역화할 때는 콘텐츠 값을 적절히 접근합니다:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## 추가 리소스

- **Intlayer 비주얼 에디터**: 더 직관적인 콘텐츠 관리 경험을 원하시면 비주얼 에디터 문서를 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)에서 참고하세요.

이 섹션은 React 애플리케이션에서 `useIntlayer` 훅의 통합을 특별히 목표로 하며, 지역화 과정을 단순화하고 다양한 로케일 간의 콘텐츠 일관성을 보장합니다.
