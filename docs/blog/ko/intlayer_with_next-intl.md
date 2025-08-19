---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer와 next-intl
description: React 앱을 위해 next-intl와 Intlayer를 통합하다
keywords:
  - next-intl
  - Intlayer
  - 국제화
  - 문서화
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-intl
---

# Next.js 국제화(i18n) with next-intl 및 Intlayer

next-intl과 Intlayer는 Next.js 애플리케이션을 위해 설계된 오픈 소스 국제화(i18n) 프레임워크입니다. 이들은 소프트웨어 프로젝트에서 번역, 지역화 및 언어 전환 관리를 위해 널리 사용됩니다.

이들은 세 가지 주요 개념을 공유합니다:

1. **콘텐츠 선언**: 애플리케이션의 번역 가능한 콘텐츠를 정의하는 방법입니다.
   - Intlayer에서 `content declaration file`이라고 불리는 이 파일은 구조화된 데이터를 내보내는 JSON, JS 또는 TS 파일이 될 수 있습니다. 자세한 내용은 [Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/concept/content)에서 확인하세요.
   - next-intl에서는 일반적으로 JSON 파일에서 `messages` 또는 `locale messages`라고 불립니다. 자세한 내용은 [next-intl 문서](https://github.com/amannn/next-intl)에서 확인하세요.

2. **유틸리티**: 애플리케이션 내에서 콘텐츠 선언을 구축하고 해석하기 위한 도구로, Intlayer의 `useIntlayer()` 또는 `useLocale()`, next-intl의 `useTranslations()` 등이 있습니다.

3. **플러그인 및 미들웨어**: URL 리디렉션 관리, 번들 최적화 등을 위한 기능 - 예를 들어, Intlayer의 `intlayerMiddleware` 또는 next-intl의 [`createMiddleware`](https://github.com/amannn/next-intl) 등이 있습니다.

## Intlayer vs. next-intl: 주요 차이점

Intlayer가 next.js의 다른 i18n 라이브러리(예: next-intl)와 어떻게 비교되는지에 대한 더 깊은 분석을 위해서는 [next-i18next vs. next-intl vs. Intlayer 블로그 포스트](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_next-intl_vs_intlayer.md)를 확인하세요.

## Intlayer로 next-intl 메시지 생성 방법

### Intlayer를 next-intl과 함께 사용해야 하는 이유는 무엇인가요?

Intlayer 콘텐츠 선언 파일은 일반적으로 더 나은 개발자 경험을 제공합니다. 두 가지 주요 이점 때문에 더 유연하고 유지 관리가 용이합니다:

1. **유연한 배치**: Intlayer 콘텐츠 선언 파일을 애플리케이션의 파일 트리 어디에나 배치할 수 있습니다. 이를 통해 사용되지 않거나 남아 있는 메시지 파일 없이 구성 요소의 이름을 바꾸거나 삭제할 수 있습니다.

   예시 파일 구조:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # 콘텐츠 선언 파일
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # 콘텐츠 선언 파일
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # 콘텐츠 선언 파일
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # 콘텐츠 선언 파일
               └── index.jsx
   ```

2. **중앙집중식 번역**: Intlayer는 모든 번역을 하나의 콘텐츠 선언에 저장하여 아무런 번역도 누락되지 않도록 합니다. TypeScript 프로젝트에서는 누락된 번역이 자동으로 타입 오류로 표시되어 개발자가 즉각적으로 피드백을 받을 수 있습니다.

### 설치

Intlayer와 next-intl을 함께 사용하려면 두 라이브러리를 모두 설치해야 합니다:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### Intlayer를 구성하여 next-intl 메시지 내보내기

> **참고:** Intlayer에서 next-intl용 메시지를 내보내면 구조에 약간의 차이가 발생할 수 있습니다. 가능하다면 Intlayer 전용 또는 next-intl 전용 플로우를 유지하여 통합을 간소화하세요. Intlayer에서 next-intl 메시지를 생성해야 하는 경우 아래 단계를 따르세요.

프로젝트의 루트에 있는 `intlayer.config.ts` 파일(또는 `.mjs` / `.cjs`)을 생성하거나 업데이트하세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // next-intl 출력을 사용
    nextIntlMessagesDir: "./intl/messages", // next-intl 메시지를 저장할 위치
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### 콘텐츠 선언

다음은 여러 형식의 콘텐츠 선언 파일 예시입니다. Intlayer는 이를 next-intl이 소비할 수 있는 메시지 파일로 컴파일합니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-component",
  "content": {
    "helloWorld": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### next-intl 메시지 빌드

next-intl용 메시지 파일을 빌드하려면 다음을 실행하세요:

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

이 명령은 `./intl/messages` 디렉토리에 리소스를 생성합니다(이는 `intlayer.config.*`에 구성되어 있습니다). 예상 출력은 다음과 같습니다:

```bash
.
└── intl
    └── messages
       └── ko
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

각 파일은 모든 Intlayer 콘텐츠 선언으로부터 컴파일된 메시지를 포함합니다. 최상위 키는 일반적으로 `content.key` 필드와 일치합니다.

### 다음.js 앱에서 next-intl 사용하기

> 더 자세한 내용은 공식 [next-intl 사용 문서](https://github.com/amannn/next-intl#readme)를 참조하세요.

1. **미들웨어 생성 (선택 사항):**  
   자동 언어 감지 또는 리디렉션을 관리하려면 next-intl의 [createMiddleware](https://github.com/amannn/next-intl#createMiddleware)를 사용하세요.

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **메시지를 로드하기 위한 `layout.tsx` 또는 `_app.tsx` 생성:**  
   App Router(Next.js 13+)를 사용하는 경우 레이아웃을 생성하세요:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';


   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   페이지 라우터(Next.js 12 이하)를 사용하는 경우 `_app.tsx`에서 메시지를 로드하세요:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **서버 측에서 메시지 가져오기 (페이지 라우터 예시):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### Next.js 구성 요소에서 콘텐츠 사용하기

메시지가 next-intl에 로드된 후, `useTranslations()` 후크를 통해 구성 요소에서 사용할 수 있습니다:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component'는 Intlayer의 콘텐츠 키에 해당합니다.

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**그게 전부입니다!** Intlayer 콘텐츠 선언 파일을 업데이트하거나 새로 추가할 때마다 `intlayer build` 명령을 다시 실행하여 next-intl JSON 메시지를 재생성하세요. next-intl은 업데이트된 콘텐츠를 자동으로 가져옵니다.
