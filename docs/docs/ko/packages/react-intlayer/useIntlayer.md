---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useIntlayer 훅 문서 | react-intlayer
description: react-intlayer 패키지에서 useIntlayer 훅을 사용하는 방법을 확인하세요
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# React 통합: `useIntlayer` 훅 문서

이 섹션에서는 React 애플리케이션 내에서 `useIntlayer` 훅을 사용하는 방법에 대해 자세히 안내하며, 효율적인 콘텐츠 현지화를 가능하게 합니다.

## React에서 사용 예제

React 컴포넌트 내에서 `useIntlayer` 훅을 사용하는 예제:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1> {/* 제목을 표시합니다 */}
      <p>{content.description}</p> {/* 설명을 표시합니다 */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1> {/* 제목을 표시합니다 */}
      <p>{content.description}</p> {/* 설명을 표시합니다 */}
    </div>
  );
};
```

## 추가 자료

- **Intlayer 비주얼 에디터**: 보다 직관적인 콘텐츠 관리 경험을 위해 비주얼 에디터 문서를 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)에서 참고하세요.

이 섹션은 React 애플리케이션에서 `useIntlayer` 훅의 통합을 구체적으로 다루며, 현지화 과정을 단순화하고 다양한 로케일 간 콘텐츠 일관성을 보장합니다.
