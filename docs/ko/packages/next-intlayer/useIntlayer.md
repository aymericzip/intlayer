# Next.js 통합: `useIntlayer` 훅 문서

`useIntlayer` 훅은 Next.js 애플리케이션에서 로컬라이즈된 콘텐츠를 효율적으로 가져오고 관리하기 위해 설계되었습니다. 이 문서는 Next.js 프로젝트 내에서 훅을 활용하는 방법에 초점을 맞추며, 적절한 로컬라이제이션 실천 방법을 보장합니다.

## Next.js에서 `useIntlayer` 가져오기

Next.js 애플리케이션에서 클라이언트 측 또는 서버 측 컴포넌트에서 작업하는지에 따라 `useIntlayer` 훅을 다음과 같이 가져올 수 있습니다:

- **클라이언트 컴포넌트:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // 클라이언트 측 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // 클라이언트 측 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // 클라이언트 측 컴포넌트에서 사용
  ```

- **서버 컴포넌트:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // 서버 측 컴포넌트에서 사용
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // 서버 측 컴포넌트에서 사용
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // 서버 측 컴포넌트에서 사용
  ```

## 매개변수

1. **`key`**: 콘텐츠를 가져올 사전 키에 대한 문자열 식별자.
2. **`locale`** (선택 사항): 사용할 특정 로케일. 생략하면 훅은 클라이언트 또는 서버 컨텍스트에 설정된 로케일을 기본값으로 사용합니다.

## 사전 파일

모든 콘텐츠 키는 런타임 오류를 방지하고 타입 안전성을 보장하기 위해 콘텐츠 선언 파일 내에 정의되어야 합니다. 이 접근 방식은 TypeScript 통합을 통해 컴파일 타임 유효성 검사를 용이하게 합니다.

콘텐츠 선언 파일 설정에 대한 지침은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)에서 확인할 수 있습니다.

## Next.js에서의 사용 예시

다음은 애플리케이션의 현재 로케일에 따라 로컬라이즈된 콘텐츠를 동적으로 로드하기 위해 Next.js 페이지 내에서 `useIntlayer` 훅을 구현하는 방법입니다:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
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

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
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

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
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

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## 속성 로컬라이제이션 처리

`alt`, `title`, `href`, `aria-label` 등의 속성을 로컬라이즈하려면 콘텐츠를 올바르게 참조해야 합니다:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## 추가 정보

- **Intlayer 비주얼 에디터**: 콘텐츠 관리를 더 쉽게 하기 위한 비주얼 에디터 사용 방법은 [여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)에서 확인할 수 있습니다.

이 문서는 Next.js 환경 내에서 `useIntlayer` 훅을 사용하는 방법을 설명하며, Next.js 애플리케이션 전반에 걸쳐 로컬라이제이션을 관리하기 위한 강력한 솔루션을 제공합니다.
