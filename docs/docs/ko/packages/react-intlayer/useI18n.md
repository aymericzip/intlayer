---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useI18n 훅 문서 | react-intlayer
description: react-intlayer 패키지에서 useI18n 훅을 사용하는 방법을 알아보세요
keywords:
  - useI18n
  - i18n
  - 번역
  - 사전
  - Intlayer
  - 국제화
  - 문서
  - Next.js
  - 자바스크립트
  - 리액트
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
history:
  - version: 6.0.0
    date: 2025-06-29
    changes: `useI18n` 훅 문서 초안 작성
---

# React 통합: `useI18n` 훅 문서

이 섹션에서는 React 애플리케이션 내에서 `useI18n` 훅을 사용하는 방법에 대해 자세히 안내하며, 효율적인 콘텐츠 현지화를 가능하게 합니다.

## React에서 `useI18n` 가져오기

`useI18n` 훅은 다음과 같이 상황에 맞게 React 애플리케이션에 가져와 통합할 수 있습니다:

- **클라이언트 컴포넌트:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // 클라이언트 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // 클라이언트 측 React 컴포넌트에서 사용
  ```

- **서버 컴포넌트:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // 서버 측 React 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // 서버 측 React 컴포넌트에서 사용
  ```

## 매개변수

이 훅은 두 개의 매개변수를 받습니다:

1. **`namespace`**: 번역 키의 범위를 지정하는 사전 네임스페이스입니다.
2. **`locale`** (선택 사항): 원하는 로케일입니다. 지정하지 않으면 컨텍스트의 로케일이 기본값으로 사용됩니다.

## 사전

모든 사전 키는 타입 안전성을 높이고 오류를 방지하기 위해 콘텐츠 선언 파일 내에 선언되어야 합니다. [설정 지침은 여기에서 확인할 수 있습니다](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md).

## React에서의 사용 예시

React 컴포넌트 내에서 `useI18n` 훅을 사용하는 예시:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react.intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 제목을 표시합니다 */}
      <p>{t("description")}</p> {/* 설명을 표시합니다 */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 제목을 표시합니다 */}
      <p>{t("description")}</p> {/* 설명을 표시합니다 */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 제목을 표시합니다 */}
      <p>{t("description")}</p> {/* 설명을 표시합니다 */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 제목을 표시합니다 */}
      <p>{t("description")}</p> {/* 설명을 표시합니다 */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* 제목을 표시합니다 */}
      <p>{t("description")}</p> {/* 설명을 표시합니다 */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## 속성 처리

속성을 현지화할 때는 번역 값을 적절히 접근해야 합니다:

```jsx
<!-- 접근성 속성(예: aria-label)의 경우, 순수 문자열이 필요하므로 .value를 사용하세요 -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## 추가 자료

- **Intlayer 비주얼 에디터**: 보다 직관적인 콘텐츠 관리 경험을 위해 비주얼 에디터 문서를 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)에서 참고하세요.

이 섹션은 React 애플리케이션에서 `useI18n` 훅의 통합을 구체적으로 다루며, 현지화 과정을 단순화하고 다양한 로케일 간 콘텐츠 일관성을 보장합니다.
