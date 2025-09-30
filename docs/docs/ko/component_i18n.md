---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: React 및 Next.js에서 컴포넌트를 다국어(i18n)로 만들기
description: Intlayer를 사용하여 다국어 React 또는 Next.js 컴포넌트를 만들기 위해 현지화된 콘텐츠를 선언하고 가져오는 방법을 배우세요.
keywords:
  - i18n
  - 컴포넌트
  - react
  - 다국어
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Intlayer로 컴포넌트를 다국어(i18n)로 만드는 방법

이 가이드는 두 가지 일반적인 환경에서 UI 컴포넌트를 다국어로 만드는 최소 단계를 보여줍니다:

- React (Vite/SPA)
- Next.js (App Router)

먼저 콘텐츠를 선언한 후 컴포넌트에서 이를 가져옵니다.

## 1) 콘텐츠 선언하기 (React 및 Next.js 공통)

컴포넌트 근처에 콘텐츠 선언 파일을 만드세요. 이렇게 하면 번역이 사용되는 위치와 가까워지고 타입 안전성을 보장할 수 있습니다.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

구성 파일을 선호하는 경우 JSON도 지원됩니다.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "다국어 React 컴포넌트",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) 콘텐츠를 가져오기

### 경우 A — React 앱 (Vite/SPA)

기본 접근법: 키로 검색하기 위해 `useIntlayer`를 사용합니다. 이렇게 하면 컴포넌트가 간결하고 타입이 지정됩니다.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

서버 사이드 렌더링 또는 프로바이더 외부에서: 필요할 때 명시적인 `locale`을 전달하며 `react-intlayer/server`를 사용하세요.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

대안: 호출 위치에서 구조를 함께 배치하는 것을 선호한다면 `useDictionary`를 사용하여 전체 선언된 객체를 읽을 수 있습니다.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### 사례 B — Next.js (앱 라우터)

데이터 안전성과 성능을 위해 서버 컴포넌트를 선호하세요. 서버 파일에서는 `next-intlayer/server`에서 `useIntlayer`를 사용하고, 클라이언트 컴포넌트에서는 `next-intlayer`에서 `useIntlayer`를 사용하세요.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

팁: 페이지 메타데이터 및 SEO를 위해 `getIntlayer`를 사용하여 콘텐츠를 가져오고 `getMultilingualUrls`를 통해 다국어 URL을 생성할 수도 있습니다.

## 왜 Intlayer의 컴포넌트 접근법이 최선인가

- **콜로케이션(Collocation)**: 콘텐츠 선언이 컴포넌트 근처에 위치하여 분산을 줄이고 디자인 시스템 전반에서 재사용성을 향상시킵니다.
- **타입 안전성(Type safety)**: 키와 구조가 강력하게 타입 지정되어 있으며, 누락된 번역은 런타임이 아닌 빌드 타임에 감지됩니다.
- **서버 우선(Server-first)**: 보안성과 성능 향상을 위해 서버 컴포넌트에서 네이티브로 작동하며, 클라이언트 훅은 여전히 사용하기 편리합니다.
- **트리 쉐이킹(Tree-shaking)**: 컴포넌트에서 사용하는 콘텐츠만 번들에 포함되어 대규모 앱에서도 페이로드를 작게 유지합니다.
- **개발자 경험(DX) 및 도구**: 내장 미들웨어, SEO 도우미, 선택적 비주얼 에디터/AI 번역 기능이 일상 작업을 간소화합니다.

Next.js 중심 비교 및 패턴은 다음 링크에서 확인하세요: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## 관련 가이드 및 참고 자료

- React 설정 (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- TanStack 시작: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Next.js 설정: https://intlayer.org/doc/environment/nextjs
- Intlayer vs. next-intl vs. next-i18next 비교: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

이 페이지들은 엔드 투 엔드 설정, 프로바이더, 라우팅, SEO 도우미를 포함합니다.
