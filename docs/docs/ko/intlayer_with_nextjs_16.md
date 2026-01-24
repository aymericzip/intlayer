---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Next.js 16 앱 번역 방법 – 2026 i18n 가이드
description: Next.js 16 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따라가세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Next.js 16
  - 자바스크립트
  - 리액트
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init 명령어 추가
  - version: 7.0.6
    date: 2025-11-01
    changes: `alternates` 객체에 `x-default` 언급 추가
  - version: 7.0.0
    date: 2025-06-29
    changes: 초기 기록
---

# Intlayer를 사용하여 Next.js 16 웹사이트 번역하기 | 국제화(i18n)

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">
  
<iframe title="Next.js를 위한 최고의 i18n 솔루션? Intlayer를 발견하세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-next-16-template)을 확인하세요.

## 목차

<TOC/>

## Intlayer란 무엇인가요?

**Intlayer**는 최신 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다. Intlayer는 강력한 **App Router**를 포함한 최신 **Next.js 16** 프레임워크와 원활하게 통합됩니다. 효율적인 렌더링을 위해 **서버 컴포넌트**와 함께 작동하도록 최적화되어 있으며, [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)과 완벽하게 호환됩니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- 컴포넌트 수준에서 선언적 사전을 사용하여 **번역을 쉽게 관리**할 수 있습니다.
- 메타데이터, 라우트 및 콘텐츠를 **동적으로 현지화**할 수 있습니다.
- 클라이언트 및 서버 측 컴포넌트 모두에서 **번역에 접근**할 수 있습니다.
- 자동 생성된 타입으로 **TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 활용할 수 있습니다.

> Intlayer는 Next.js 12, 13, 14, 16과 호환됩니다. Next.js Page Router를 사용하는 경우, 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_page_router.md)를 참조하세요.
> 로케일 라우팅은 SEO, 번들 크기 및 성능에 유용합니다. 필요하지 않은 경우 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_no_locale_path.md)를 참조하세요.
> Next.js 12, 13, 14에서 App Router를 사용하는 경우, 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_14.md)를 참조하세요.

---

## Next.js 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

  Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화를 위한 컨텍스트 프로바이더와 훅을 제공합니다. 또한, Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 프록시도 포함되어 있습니다.

### 2단계: 프로젝트 구성

최종적으로 만들어질 구조는 다음과 같습니다:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Intlayer 프로바이더를 위한 로케일 레이아웃
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # 스타일 및 전역 프로바이더를 위한 루트 레이아웃
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> 로케일 라우팅을 원하지 않는 경우, intlayer를 단순한 프로바이더 / 훅으로 사용할 수 있습니다. 자세한 내용은 [이 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_no_locale_path.md)를 참조하세요.

애플리케이션의 언어를 구성하기 위해 설정 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 지역화된 URL, 프록시 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Next.js 구성에 Intlayer 통합하기

Next.js 설정을 Intlayer와 함께 사용하도록 구성합니다:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 여기에 구성 옵션을 입력하세요 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 여기에 구성 옵션을 입력하세요 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 여기에 구성 옵션을 입력하세요 */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Intlayer를 Next.js와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 추가로, 성능 최적화를 위한 별칭(alias)을 제공하며 서버 컴포넌트와의 호환성을 보장합니다.

> `withIntlayer()` 함수는 프로미스 함수입니다. 빌드가 시작되기 전에 Intlayer 사전을 준비할 수 있게 해줍니다. 다른 플러그인과 함께 사용하려면 `await`할 수 있습니다. 예시:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 동기적으로 사용하고 싶다면 `withIntlayerSync()` 함수를 사용할 수 있습니다. 예시:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer는 명령줄 플래그 `--webpack`, `--turbo` 또는 `--turbopack`뿐만 아니라 현재 **Next.js 버전**을 기반으로 프로젝트가 **webpack** 또는 **Turbopack**을 사용하고 있는지 자동으로 감지합니다.
>
> `next>=16`부터 **Rspack**을 사용하는 경우, Turbopack을 비활성화하여 Intlayer가 webpack 구성을 사용하도록 명시적으로 강제해야 합니다:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### 4단계: 동적 로케일 경로 정의

`RootLayout`의 모든 내용을 제거하고 다음 코드로 교체하세요:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // 여전히 `next-themes`, `react-query`, `framer-motion` 등과 같은 다른 프로바이더로 children을 감쌀 수 있습니다.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // 여전히 `next-themes`, `react-query`, `framer-motion` 등과 같은 다른 프로바이더로 children을 감쌀 수 있습니다.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // 여전히 `next-themes`, `react-query`, `framer-motion` 등과 같은 다른 프로바이더로 children을 감쌀 수 있습니다.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> `RootLayout` 컴포넌트를 비워두면 `<html>` 태그에 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 및 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 속성을 설정할 수 있습니다.

동적 라우팅을 구현하려면 `[locale]` 디렉토리에 새 레이아웃을 추가하여 로케일 경로를 제공하세요:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
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

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> `[locale]` 경로 세그먼트는 로케일을 정의하는 데 사용됩니다. 예: `/en-US/about`는 `en-US`를 가리키고 `/fr/about`는 `fr`를 가리킵니다.

> 이 단계에서 `Error: Missing <html> and <body> tags in the root layout.` 오류가 발생할 수 있습니다. 이는 `/app/page.tsx` 파일이 더 이상 사용되지 않으며 삭제할 수 있기 때문에 예상되는 현상입니다. 대신, `[locale]` 경로 세그먼트가 `/app/[locale]/page.tsx` 페이지를 활성화합니다. 따라서 브라우저에서 `/en`, `/fr`, `/es`와 같은 경로를 통해 페이지에 접근할 수 있습니다. 기본 로케일을 루트 페이지로 설정하려면 7단계의 `proxy` 설정을 참조하세요.

그런 다음, 애플리케이션 Layout에서 `generateStaticParams` 함수를 구현하세요.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // 삽입할 라인

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 나머지 코드 */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // 삽입할 라인

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 나머지 코드 */
};

// ... 나머지 코드
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // 삽입할 라인

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... 나머지 코드 */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams`는 애플리케이션이 모든 로케일에 대해 필요한 페이지를 사전 빌드하도록 보장하여 런타임 계산을 줄이고 사용자 경험을 향상시킵니다. 자세한 내용은 [Next.js의 generateStaticParams 문서](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)를 참조하세요.

> Intlayer는 `export const dynamic = 'force-static';`와 함께 작동하여 모든 로케일에 대해 페이지가 사전 빌드되도록 보장합니다.

### 5단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> 콘텐츠 선언은 애플리케이션 내 어디에서나 정의할 수 있으며, `contentDir` 디렉토리(기본값: `./src`)에 포함되기만 하면 됩니다. 그리고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 6단계: 코드에서 콘텐츠 활용하기

애플리케이션 전반에서 콘텐츠 사전을 접근하세요:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

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
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`**는 클라이언트 측 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃을 포함한 모든 상위 컴포넌트에 배치할 수 있습니다. 그러나 Next.js가 페이지 간에 레이아웃 코드를 공유하기 때문에 레이아웃에 배치하는 것이 권장됩니다. 레이아웃에서 `IntlayerClientProvider`를 사용하면 각 페이지마다 다시 초기화하는 것을 방지하여 성능을 향상시키고 애플리케이션 전체에서 일관된 로컬라이제이션 컨텍스트를 유지할 수 있습니다.
- **`IntlayerServerProvider`**는 서버 자식 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃에서는 설정할 수 없습니다.

  > 레이아웃과 페이지는 공통 서버 컨텍스트를 공유할 수 없습니다. 서버 컨텍스트 시스템은 요청별 데이터 저장소([React의 cache](https://react.dev/reference/react/cache) 메커니즘)를 기반으로 하여 애플리케이션의 서로 다른 세그먼트마다 각 "컨텍스트"가 다시 생성되기 때문입니다. 공급자를 공유 레이아웃에 배치하면 이 격리가 깨져 서버 컨텍스트 값이 서버 컴포넌트에 올바르게 전달되지 않습니다.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 콘텐츠를 `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 사용하려면, 함수의 값을 호출해야 합니다. 예를 들어:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)를 참조하세요.

### (선택 사항) 7단계: 로케일 감지를 위한 프록시 구성

사용자의 선호 로케일을 감지하기 위해 프록시를 설정합니다:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy`는 사용자의 선호 로케일을 감지하여 [구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 명시된 적절한 URL로 리디렉션하는 데 사용됩니다. 또한 사용자의 선호 로케일을 쿠키에 저장할 수 있도록 합니다.

> 여러 프록시를 함께 연결해야 하는 경우(예: 인증 또는 커스텀 프록시와 함께 `intlayerProxy`를 사용하는 경우), Intlayer는 이제 `multipleProxies`라는 헬퍼를 제공합니다.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (선택 사항) 8단계: 메타데이터의 국제화

페이지 제목과 같은 메타데이터를 국제화하려는 경우, Next.js에서 제공하는 `generateMetadata` 함수를 사용할 수 있습니다. 내부에서 `getIntlayer` 함수로부터 콘텐츠를 가져와 메타데이터를 번역할 수 있습니다.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 각 로케일에 대한 모든 URL을 포함하는 객체를 생성합니다.
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
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 나머지 코드
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 각 로케일에 대한 모든 URL을 포함하는 객체를 생성합니다.
   *
   * 예시:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 반환값
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... 나머지 코드
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * 각 로케일에 대한 모든 URL을 포함하는 객체를 생성합니다.
   *
   * 예시:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 반환값
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... 나머지 코드
````

> `next-intlayer`에서 가져온 `getIntlayer` 함수는 콘텐츠를 `IntlayerNode`로 래핑하여 시각적 편집기와의 통합을 가능하게 합니다. 반면, `intlayer`에서 가져온 `getIntlayer` 함수는 추가 속성 없이 콘텐츠를 직접 반환합니다.

또는 `getTranslation` 함수를 사용하여 메타데이터를 선언할 수 있습니다. 그러나 메타데이터의 번역을 자동화하고 콘텐츠를 외부화하기 위해 콘텐츠 선언 파일을 사용하는 것이 권장됩니다.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

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
  };
};

// ... 나머지 코드
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... 나머지 코드
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... 나머지 코드
```

> 메타데이터 최적화에 대해 더 알아보기 [공식 Next.js 문서에서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (선택 사항) 9단계: sitemap.xml 및 robots.txt의 다국어화

`sitemap.xml` 및 `robots.txt`를 다국어화하려면 Intlayer에서 제공하는 `getMultilingualUrls` 함수를 사용할 수 있습니다. 이 함수는 사이트맵에 다국어 URL을 생성할 수 있게 해줍니다.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
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

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> 사이트맵 최적화에 대해 더 알아보기 [공식 Next.js 문서에서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). robots.txt 최적화에 대해 더 알아보기 [공식 Next.js 문서에서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (선택 사항) 10단계: 콘텐츠의 언어 변경하기

Next.js에서 콘텐츠의 언어를 변경하려면, 권장되는 방법은 `Link` 컴포넌트를 사용하여 사용자를 적절한 현지화된 페이지로 리디렉션하는 것입니다. `Link` 컴포넌트는 페이지의 사전 로딩(prefetching)을 가능하게 하여 전체 페이지 새로고침을 방지하는 데 도움이 됩니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // "뒤로 가기" 브라우저 버튼이 이전 페이지로 리디렉션되도록 보장합니다.
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서의 언어 - 예: 현재 로케일이 Locales.SPANISH일 때 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // "뒤로 가기" 브라우저 버튼이 이전 페이지로 리디렉션되도록 보장합니다.
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일의 언어 - 예: 현재 로케일이 Locales.SPANISH로 설정된 경우 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // "뒤로 가기" 브라우저 버튼이 이전 페이지로 리디렉션되도록 보장합니다.
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일 내 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일 내 언어 - 예: 현재 로케일이 Locales.SPANISH일 때 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> 대안으로 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 페이지 사전 로딩(prefetching)을 허용하지 않습니다. 자세한 내용은 [`useLocale` 훅 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)를 참고하세요.

> 또한 `onLocaleChange` 옵션에 함수를 설정하여 로케일이 변경될 때 사용자 정의 함수를 실행할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... 나머지 코드

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>프랑스어로 변경</button>
);
```

> 문서 참고:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (선택 사항) 11단계: 지역화된 링크 컴포넌트 생성하기

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 커스텀 `Link` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 내부 URL에 현재 언어를 자동으로 접두사로 붙여줍니다. 예를 들어, 프랑스어 사용자가 "About" 페이지로 가는 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로컬라이즈된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인하도록 도와주며, 사용자에게 선호하는 언어로 된 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에 걸쳐 로컬라이즈된 링크를 사용함으로써 내비게이션이 현재 로케일 내에서 유지되어 예상치 못한 언어 전환을 방지합니다.
- **유지보수성**: 로컬라이제이션 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화하여 애플리케이션이 성장함에 따라 코드베이스를 더 쉽게 유지보수하고 확장할 수 있습니다.

아래는 TypeScript로 구현한 로컬라이즈된 `Link` 컴포넌트입니다:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주합니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우, `getLocalizedUrl`을 사용하여 URL 앞에 로케일을 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 만약 링크가 내부 링크이고 유효한 href가 제공되었다면, 지역화된 URL을 가져옵니다.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주합니다.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우, `getLocalizedUrl`을 사용하여 URL 앞에 로케일을 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 만약 링크가 내부 링크이고 유효한 href가 제공되었다면, 지역화된 URL을 가져옵니다.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주합니다.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우, `getLocalizedUrl`을 사용하여 URL 앞에 로케일을 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 만약 링크가 내부 링크이고 유효한 href가 제공되었다면, 지역화된 URL을 가져옵니다.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### 작동 원리

- **외부 링크 감지**:  
  유틸리티 함수 `checkIsExternalLink`는 URL이 외부 링크인지 확인합니다. 외부 링크는 현지화가 필요하지 않으므로 변경되지 않은 상태로 유지됩니다.

- **현재 로케일 가져오기**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.

- **URL 현지화**:  
  내부 링크(즉, 외부 링크가 아닌 링크)의 경우, `getLocalizedUrl`을 사용하여 URL 앞에 현재 로케일을 자동으로 붙입니다. 즉, 사용자가 프랑스어 환경에 있는 경우, `href`로 `/about`을 전달하면 `/fr/about`으로 변환됩니다.

- **링크 반환**:  
  컴포넌트는 현지화된 URL을 가진 `<a>` 요소를 반환하여 내비게이션이 로케일과 일치하도록 보장합니다.

이 `Link` 컴포넌트를 애플리케이션 전반에 통합함으로써, 일관성 있고 언어를 인식하는 사용자 경험을 유지하는 동시에 향상된 SEO 및 사용성 이점을 누릴 수 있습니다.
