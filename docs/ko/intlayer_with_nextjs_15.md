# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다. Intlayer는 최신 **Next.js 15** 프레임워크와 매끄럽게 통합되며, 강력한 **App Router**도 포함되어 있습니다. 효율적인 렌더링을 위해 **서버 구성 요소**와 함께 작동하도록 최적화되어 있으며 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)과 완전 호환됩니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터**, 경로 및 콘텐츠를 동적으로 지역화합니다.
- **클라이언트 측 및 서버 측 구성 요소에서 번역에 접근**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능의 혜택을 누릴 수 있습니다.

> 주: Intlayer는 Next.js 12, 13, 14 및 15와 호환됩니다. Next.js 페이지 라우터를 사용 중인 경우 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_page_router.md)를 참조할 수 있습니다. Next.js 12, 13, 14에서 App Router와 관련하여 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)를 참조하세요.

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

npm을 사용하여 필요한 패키지를 설치합니다:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Step 2: Configure Your Project

애플리케이션 언어를 구성하기 위해 구성 파일을 만듭니다:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일 추가
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

모든 사용 가능한 매개변수를 보려면 [여기에서 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### Step 3: Integrate Intlayer in Your Next.js Configuration

Intlayer를 사용하도록 Next.js 설정을 구성합니다:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

사용자의 선호 로케일을 감지하기 위해 미들웨어를 설정합니다:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

지역화된 콘텐츠를 위한 동적 라우팅을 구현합니다:

`src/app/page.ts`를 `src/app/[locale]/page.ts`로 변경합니다.

그런 다음 애플리케이션 레이아웃에서 generateStaticParams 함수를 구현합니다.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // 삽입할 라인

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

그런 다음 `[locale]` 디렉터리에서 새 레이아웃을 추가합니다:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

### Step 6: Declare Your Content

콘텐츠 사전을 생성하고 관리합니다:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Intlayer 선언 파일을 선언하는 방법은 여기서 확인하세요](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md).

### Step 7: Utilize Content in Your Code

애플리케이션 전반에서 콘텐츠 사전을 접근합니다:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider는 서버 자식에게 로케일을 제공하는 데 사용됩니다
       *   레이아웃에서 설정하면 작동하지 않음
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider는 클라이언트 자식에게 로케일을 제공하는 데 사용됩니다
       *   레이아웃을 포함하여 모든 부모 구성 요소에 설정할 수 있습니다
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 주: `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면 값의 함수를 호출해야합니다. 예:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

클라이언트 또는 서버 구성 요소에서 intlayer를 사용하는 방법에 대한 자세한 내용은 [여기에서 nextJS 예제를 확인하세요](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Optional) Step 8: Internationalization of your metadata

메타데이터를 국제화하려면, 예를 들어 페이지의 제목과 같은 경우, NextJS가 제공하는 `generateMetadata` 함수를 사용할 수 있습니다. 함수 내부에서 `getTranslationContent` 함수를 사용하여 메타데이터를 번역합니다.

````typescript
// src/app/[locale]/layout.tsx 또는 src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const url = `/`;

  /**
   * 각 로케일에 대한 모든 URL을 포함하는 객체를 생성합니다.
   *
   * 예시:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // 반환
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * 현재 로케일에 대한 지역화된 URL을 가져옵니다
   *
   * 예시:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * 반환:
   * '/fr/about'는 프랑스어 로케일에 대한 것입니다
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 나머지 코드
````

> 메타데이터 최적화에 대한 자세한 내용은 [공식 Next.js 문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)에서 확인하세요.

### (Optional) Step 9: Internationalization of your sitemap

사이트맵을 국제화하려면 Intlayer가 제공하는 `getMultilingualUrls` 함수를 사용할 수 있습니다. 이 함수는 사이트맵을 위한 다국어 URL을 생성할 수 있게 해줍니다.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> 사이트맵 최적화에 대한 자세한 내용은 [공식 Next.js 문서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)에서 확인하세요.

### (Optional) Step 10: Change the language of your content

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수를 사용하면 애플리케이션의 로케일을 설정하고 콘텐츠를 적절히 업데이트할 수 있습니다.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>언어 변경</button>;
};
```

### Configure TypeScript

Intlayer는 모듈 증강을 사용하여 TypeScript의 이점을 얻고 코드베이스를 더욱 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입을 포함해야 합니다.

```json5
// tsconfig.json

{
  // 맞춤형 구성
  include: [
    "src",
    "types", // <- 자동 생성된 타입 포함
  ],
}
```

### Git Configuration

Intlayer에 의해 생성된 파일은 무시하는 것이 좋습니다. 이렇게 하면 Git 리포지토리에 커밋하는 것을 피할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```gitignore
# Intlayer에 의해 생성된 파일 무시
.intlayer
```
