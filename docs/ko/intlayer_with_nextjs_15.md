# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하도록 설계된 혁신적인 오픈 소스 국제화 (i18n) 라이브러리입니다. Intlayer는 최신 **Next.js 15** 프레임워크와 원활하게 통합되며, 강력한 **App Router**를 포함합니다. 서버 구성 요소와 함께 효율적인 렌더링을 위해 최적화되었으며, [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)과 완전히 호환됩니다.

Intlayer를 사용하면:

- **선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 경로 및 콘텐츠를 동적으로 지역화**할 수 있습니다.
- **클라이언트 측 및 서버 측 구성 요소에서 번역에 접근**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원 보장**, 자동 완성과 오류 감지를 개선합니다.
- **동적 지역 감지 및 전환**과 같은 고급 기능의 혜택을 누릴 수 있습니다.

> 참고: Intlayer는 Next.js 12, 13, 14 및 15와 호환됩니다. Next.js 페이지 라우터를 사용하는 경우, 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_page_router.md)를 참조할 수 있습니다. Next.js 12, 13, 14와 App Router의 경우, 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)를 참조하세요.

---

## Next.js 애플리케이션에서 Intlayer 설정을 위한 단계별 가이드

### 1단계: 종속성 설치

필요한 패키지를 npm을 사용해 설치하세요:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위해 설정 파일을 생성하세요:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 지역 추가
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

사용 가능한 모든 매개변수를 보려면, [구성 문서 여기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### 3단계: Next.js 설정에서 Intlayer 통합

Next.js 설정을 Intlayer를 사용하도록 구성하세요:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### 4단계: 로케일 감지를 위한 미들웨어 구성

사용자의 선호 로케일을 감지하기 위해 미들웨어를 설정하세요:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### 5단계: 동적 로케일 경로 정의

지역화된 콘텐츠에 대한 동적 라우팅을 구현하세요:

`src/app/page.ts`를 `src/app/[locale]/page.ts`로 변경하세요.

그런 다음 애플리케이션 레이아웃에서 generateStaticParams 함수를 구현하세요.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // 삽입할 줄

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

그런 다음 `[locale]` 디렉토리에 새로운 레이아웃을 추가하세요:

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

### 6단계: 콘텐츠 선언

콘텐츠 사전을 생성하고 관리하세요:

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

[Intlayer 선언 파일을 선언하는 방법을 보세요](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md).

### 7단계: 코드에서 콘텐츠 활용

애플리케이션 전반에 걸쳐 콘텐츠 사전에 접근하세요:

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
       *   IntlayerServerProvider는 서버 자식에게 로케일을 제공하는 데 사용됩니다.
       *   레이아웃에 설정하면 작동하지 않습니다.
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider는 클라이언트 자식에게 로케일을 제공하는 데 사용됩니다.
       *   레이아웃을 포함하여 모든 부모 구성 요소에 설정할 수 있습니다.
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
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 만들기

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
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 만들기

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 참고: `alt`, `title`, `href`, `aria-label`와 같은 `string` 속성에서 콘텐츠를 사용하려면, 함수의 값으로 호출해야 합니다:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

클라이언트 또는 서버 구성 요소에서 intlayer를 사용하는 더 자세한 내용은 [Next.js 예제 여기](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app)를 참조하세요.

### (선택 사항) 8단계: 메타데이터 국제화

페이지의 제목과 같은 메타데이터를 국제화하려면, Next.js에서 제공하는 `generateMetadata` 함수를 사용할 수 있습니다. 함수 내에서 `getTranslationContent` 함수를 사용하여 메타데이터를 번역하세요.

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

  /**
   * 각 로케일에 대한 모든 URL을 포함하는 개체를 생성합니다.
   *
   * 예시:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 반환값
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... 나머지 코드
````

> 메타데이터 최적화에 대한 더 많은 정보는 [공식 Next.js 문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)를 참조하세요.

### (선택 사항) 9단계: sitemap.xml 및 robots.txt의 국제화

`sitemap.xml` 및 `robots.txt`를 국제화하려면, Intlayer에서 제공하는 `getMultilingualUrls` 함수를 사용할 수 있습니다. 이 함수는 sitemap을 위한 다국어 URLs를 생성할 수 있게 합니다.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> sitemap 최적화에 대한 더 많은 정보는 [공식 Next.js 문서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)를 참조하세요. robots.txt 최적화에 대한 더 많은 정보는 [공식 Next.js 문서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)를 참조하세요.

### (선택 사항) 10단계: 콘텐츠 언어 변경

콘텐츠 언어를 변경하려면, `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 적절히 업데이트할 수 있게 합니다.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>언어 변경</button>;
};
```

### TypeScript 구성

Intlayer는 모듈 증강을 사용하여 TypeScript의 이점을 이용하고 코드베이스를 강화합니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입을 포함해야 합니다.

```json5
// tsconfig.json

{
  // 사용자 정의 구성
  include: [
    "src",
    "types", // <- 자동 생성된 타입 포함
  ],
}
```

### Git 구성

Intlayer에 의해 생성된 파일을 무시하는 것이 좋습니다. 이렇게 하면 Git 리포지토리에 커밋하는 것에서 벗어날 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가하세요:

```gitignore
# Intlayer에 의해 생성된 파일 무시
.intlayer
```
