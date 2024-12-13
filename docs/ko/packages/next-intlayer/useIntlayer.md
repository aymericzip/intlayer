# Next.js 통합: `useIntlayer` 훅 문서

`useIntlayer` 훅은 Next.js 애플리케이션을 위해 로컬화된 콘텐츠를 효과적으로 가져오고 관리하도록 맞춤화되었습니다. 이 문서는 Next.js 프로젝트 내에서 훅을 활용하는 방법에 중점을 두고, 적절한 로컬화 관행을 보장합니다.

## Next.js에서 `useIntlayer` 가져오기

Next.js 애플리케이션에서 클라이언트 측 또는 서버 측 컴포넌트에서 작업하는지에 따라 다음과 같이 `useIntlayer` 훅을 가져올 수 있습니다:

- **클라이언트 컴포넌트:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // 클라이언트 측 컴포넌트에서 사용됨
  ```

- **서버 컴포넌트:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // 서버 측 컴포넌트에서 사용됨
  ```

## 매개변수

1. **`key`**: 콘텐츠를 가져오고자 하는 사전 키의 문자열 식별자입니다.
2. **`locale`** (선택 사항): 사용할 특정 로케일입니다. 생략할 경우, 훅은 클라이언트 또는 서버 컨텍스트에 설정된 로케일을 기본값으로 사용합니다.

## 콘텐츠 선언 파일

모든 콘텐츠 키는 런타임 오류를 방지하고 타입 안전성을 보장하기 위해 콘텐츠 선언 파일 내에 정의되어야 합니다. 이 접근 방식은 컴파일 타임 검증을 위한 TypeScript 통합도 용이하게 합니다.

콘텐츠 선언 파일 설정에 대한 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)에서 확인할 수 있습니다.

## Next.js에서 사용 예시

애플리케이션의 현재 로케일에 따라 동적으로 로컬화된 콘텐츠를 로드하기 위해 Next.js 페이지 내에서 `useIntlayer` 훅을 구현하는 방법은 다음과 같습니다:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

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

import { useIntlayer } from "next-intlayer/server";

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

## 속성 로컬화 처리

`alt`, `title`, `href`, `aria-label` 등의 속성을 로컬화하려면 콘텐츠를 올바르게 참조해야 합니다:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## 추가 정보

- **Intlayer 비주얼 에디터**: 콘텐츠 관리를 쉽게 하기 위한 비주얼 에디터 사용법은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)에서 확인할 수 있습니다.

이 문서는 Next.js 환경 내에서 `useIntlayer` 훅의 사용을 outline하며, Next.js 애플리케이션 전반에 걸친 로컬화 관리를 위한 강력한 솔루션을 제공합니다.
