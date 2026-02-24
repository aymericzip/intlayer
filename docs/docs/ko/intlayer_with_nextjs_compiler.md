---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - 기존 Next.js 애플리케이션을 다국어(i18n)로 만드는 방법 (i18n 가이드 2026)
description: Intlayer Compiler를 사용하여 기존 Next.js 애플리케이션을 다국어로 만드는 방법을 알아보세요. 문서를 따라 국제화(i18n)하고 AI로 번역하세요.
keywords:
  - 국제화
  - 다국어
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - 컴파일러
  - AI
slugs:
  - doc
  - 환경설정
  - nextjs
  - 컴파일러
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: 최초 릴리스
---

# 기존 Next.js 애플리케이션을 다국어(i18n)로 만드는 방법 (i18n 가이드 2026)

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">
  
<iframe title="Next.js를 위한 최고의 i18n 솔루션? Intlayer를 만나보세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)을 확인하세요.

## 목차

<TOC/>

## 기존 애플리케이션을 국제화하는 것이 왜 어려울까요?

단일 언어로 만들어진 앱에 여러 언어를 추가해 본 적이 있다면 그 고통을 아실 겁니다. 단순히 "어려운" 것을 넘어 지루한 작업입니다. 모든 파일을 뒤져 모든 텍스트 문자열을 찾아 별도의 사전 파일로 옮겨야 합니다.

다음은 위험한 부분입니다: 레이아웃이나 로직을 손상시키지 않고 모든 텍스트를 코드 훅으로 교체하는 것입니다. 이는 몇 주 동안 새로운 기능 개발을 중단시키고 끝없는 리팩터링처럼 느껴지는 작업입니다.

## Intlayer 컴파일러란 무엇인가요?

**Intlayer Compiler**는 그런 수작업을 건너뛰기 위해 만들어졌습니다. 개발자가 문자열을 수동으로 추출하는 대신, 컴파일러가 알아서 해줍니다. 컴파일러는 코드를 스캔하고 텍스트를 찾아 AI를 사용하여 백그라운드에서 사전을 생성합니다.
그런 다음 빌드 중에 코드를 수정하여 필요한 i18n 훅을 주입합니다. 기본적으로 앱을 단일 언어인 것처럼 계속 작성하면 컴파일러가 다국어 변환을 자동으로 처리합니다.

> 컴파일러 문서: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md

### 제한 사항

컴파일러는 **컴파일 시점**에 코드 분석 및 변환(훅 삽입 및 사전 생성)을 수행하기 때문에 애플리케이션의 **빌드 프로세스가 느려질 수 있습니다.**

개발 중 이 영향을 최소화하기 위해 컴파일러를 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md) 모드로 실행되도록 구성하거나 필요하지 않을 때 비활성화할 수 있습니다.

---

## Next.js 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

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

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

  Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화를 위한 컨텍스트 공급자와 훅을 제공합니다. 또한 Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과 사용자의 선호 로캘을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 프록시가 포함되어 있습니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성할 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 개발 모드 영향을 줄이려면 'build-only'로 설정 가능
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 접두사 comp- 없음
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "이 앱은 지도 앱입니다",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 개발 모드 영향을 줄이려면 'build-only'로 설정 가능
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 접두사 comp- 없음
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "이 앱은 지도 앱입니다",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 개발 모드 영향을 줄이려면 'build-only'로 설정 가능
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 접두사 comp- 없음
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "이 앱은 지도 앱입니다",
  },
};

module.exports = config;
```

> **참고**: 환경 변수에 `OPEN_AI_API_KEY`가 설정되어 있는지 확인하세요.

> 이 구성 파일을 통해 지역화된 URL, 프록시 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자를 설정하고 콘솔에서 Intlayer 로그를 비활성화하는 등 다양한 작업을 수행할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Next.js 구성에 Intlayer 통합

Intlayer를 사용하도록 Next.js 설정을 구성합니다:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 구성 옵션은 여기에 위치합니다 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 구성 옵션은 여기에 위치합니다 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 구성 옵션은 여기에 위치합니다 */
};

module.exports = withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Next.js와 Intlayer를 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 파일를 모니터링합니다. [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능을 최적화하기 위한 별칭을 제공하고 서버 구성 요소와의 호환성을 보장합니다.

### 4단계: 동적 로캘 경로 정의

`RootLayout`에서 모든 내용을 지우고 다음 코드로 대체합니다:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### 5단계: 콘텐츠 선언(자동)

컴파일러를 활성화하면 콘텐츠 사전(`.content.ts` 파일 등)을 **수동으로 선언할 필요가 없습니다.**

대신, 코드에 직접 문자열로 콘텐츠를 작성할 수 있습니다. Intlayer는 코드를 분석하고, 구성된 AI 공급자를 사용하여 번역을 생성하며, 컴파일 시간에 문자열을 지역화된 콘텐츠로 교체합니다.

### 6단계: 코드에서 콘텐츠 활용

기본 로캘로 하드 코딩된 문자열을 사용하여 구성 요소를 작성하기만 하면 됩니다. 나머지는 컴파일러가 처리합니다.

페이지의 모습 예시:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const PageContent: FC = () => {
  return (
    <>
      <p>다음을 편집하여 시작하세요</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>다음을 편집하여 시작하세요</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { IntlayerServerProvider, getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>다음을 편집하여 시작하세요</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`**는 클라이언트 측 구성요소에 로캘을 제공하는 데 사용됩니다.
- **`IntlayerServerProvider`**는 서버 하위 노드에 로캘을 제공하는 데 사용됩니다.

### (선택) 7단계: 로캘 감지를 위한 프록시 구성

사용자의 선호 로캘을 감지하는 프록시를 설정합니다:

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

> `intlayerProxy`는 사용자의 선호 로캘을 감지하고 [구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 지정된 대로 적절한 URL로 리디렉션하는 데 사용됩니다. 또한 사용자의 선호 로캘을 쿠키에 저장할 수 있습니다.

### (선택) 8단계: 콘텐츠 언어 변경

Next.js에서 콘텐츠 언어를 가장 권장되는 방식으로 변경하려면 `Link` 컴포넌트를 사용하여 사용자를 적절한 언어 페이지로 리디렉션하는 것입니다. 이렇게 하면 Next.js 페이지 프리패치(prefetch)를 활용하여 페이지 전체가 리로드되는 일을 방지할 수 있습니다.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 로캘 - 예. KO */}
              {localeItem}
            </span>
            <span>
              {/* 자체 로캘 방식의 언어 - 예. 한국어 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로캘 방식의 언어 - 예. Francés (현재 로캘이 스페인어인 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어 방식의 로캘 - 예. Korean */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 로캘 - 예. KO */}
              {localeItem}
            </span>
            <span>
              {/* 자체 로캘 방식의 언어 - 예. 한국어 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로캘 방식의 언어 - 예. Francés (현재 로캘이 스페인어인 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어 방식의 로캘 - 예. Korean */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 로캘 - 예. KO */}
              {localeItem}
            </span>
            <span>
              {/* 자체 로캘 방식의 언어 - 예. 한국어 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로캘 방식의 언어 - 예. Francés (현재 로캘이 스페인어인 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어 방식의 로캘 - 예. Korean */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 페이지 프리패치를 허용하지 않고 `useLocale`에서 제공되는 `setLocale` 훅을 대안으로 사용할 수 있습니다. 해당 옵션에 관한 좀 더 깊은 정보는 링크를 참조하세요 [`useLocale` 훅 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md).

### (선택) 9단계: 기존 Server Actions에서 현재의 로캘 가져오기

이메일이나 여러 언어가 필요한 Server Action 백엔드 동작을 수행하기 위해서 `getLocale` 함수를 Next 내의 `next-intlayer/server` 모듈을 통해 실행시킵니다:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // 해당 로캘 값에 특정 작업을 지시합니다
};
```

> `getLocale` 함수는 로캘을 확인하기 위한 사용자 친화적이고 가장 빠른 전략(우선 순위 평가)을 고수합니다:
>
> 1. Header (사용자 Request) 또는 Proxy 로캘 설정을 파악하여 가장 최상위로 결정.
> 2. 만약 값을 찾을 수 없거나 헤더에서 파악이 안된다면, 쿠키 데이터 조회.
> 3. 둘 다 불명확한 사용자의 브라우저 정보를 통해 선호 지역 및 브라우저 설정을 평가.
> 4. 모든 것이 해당되지 않거나 에러라면 시스템 로캘 설정의 Default (기본 언어 풀백 설정) 값 반영
>
> 상황의 Context에 맞춘 알맞은 선택지를 부여합니다.

### (선택) 10단계: 번들의 사이즈 줄이기 및 최적화하기

`next-intlayer`라는 모듈을 사용할 때 기본 정책에 따라 모든 텍스트나 사전들이 번들(모든 페이지의 공통 크기 및 데이터)에 병합되게 설정됩니다. 성능의 감소나 크기를 타의 추종을 불허하게 최적화하기 위해, Next.js 의 SWC 방식을 기반으로한 매크로로 플러그인 컴포넌트 `@intlayer/swc`를 추가 및 이용해 주세요. `useIntlayer`의 컴포넌트에 해당 페이지와 사용되는 텍스트 옵션만 포함할 수 있도록 유도합니다.

활성화 방법은 간단하게 패키지 모듈에 플러그인 `@intlayer/swc` 을 넣습니다:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> 참고 1: (제한점) 오로지 차세대 Next.JS 빌드 컴포넌트인 Next.JS +13버전(이상)에 한정된 패키지 방식입니다.

> 참고 2: SWC 플러그인 실험적 도입(Experimental)이기 때문에 `npm i`시 기본 제공은 안 합니다. (기능 확장이 차후 있을 수 있습니다).

> 참고 3 (주의): 텍스트의 설정을 변경하는 옵션 중 (동적/Dynamic: `importMode: 'dynamic'` 또는 `importMode: 'fetch'`)과 병행되는 경우 `useIntlayer` 코드를 호출 시, React의 <Suspense> 옵션 하위에 매핑되어야 합니다! 다시 말해 가장 위의 Page(또는 루트 Layout 컴포넌트 탑) 상위 수준 레벨에서는 `useIntlayer` 매크로 작동 방식이 중지(또는 블록)될 수 있음을 고고지합니다.

### Turbopack 상황에서의 사전 번경 확인 (Watch Mode)

만일 개발 과정에서 서버나 터미널의 커맨드 기능으로 Next가 권장하고 운영하는 `next dev` 명령을 터보 팩으로 기동시 사전이나 로직이 변경되면 작동 및 갱신의 알림(Watch)이 실행에 결함을 보여 반영 안됩니다!.

그 원인은 개발자 환경 "Turbopack"에서의 "병렬(Concurrency) Webpack Plugin 모니터링 기능의 지원 한계" 때문입니다. 이 제한을 해소하기 위해 `intlayer watch` 와 터보를 포함한 데브 런을 명령으로 동시에 기동합니다.

```json5 fileName="package.json"
{
  // ... 기본 패키지 정보 ...
  "scripts": {
    // ... 일반 스크립트 정보 ...
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> 구버전 패키지 `next-intlayer@<=6.x.x`인 사용자는 해당 Turbopack 사용을 위한 부가 플래그 옵션인 `--turbopack` 옵션이 유지되어 있습니다. Next.js 16과 함께 안전성을 높이고 제한의 문제들을 풀려면 구버전보다 상위 릴리즈 및 플러그 모듈 `next-intlayer@>=7.x.x` 방식 업데이트 및 교체를 당부합니다!

### TypeScript 지원 및 TypeScript 설정

Next 프레임워크와 결합된 Intlayer 시스템은 "Type module augmentation(모듈 확장)"의 코딩 지원의 강력함을 누릴 수 있습니다! 당신은 타입 오류나 지원받는 코드가 어떻게 적용되는 지 확신에 차며 편한 수정의 장점을 확인합니다!.

![자동 완성 (Autocompletion) 기능 확인](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![컴파일 전 오류 표시 (Translation Check TS)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

위와 같은 TS(타입스크립트 컴파일러 오류 표기 / IDE 에러 캐치)를 완벽하게 사용하시려면 오토 생성 모듈 파일을 위해 루트 경로의 `tsconfig.json` 파일에 플러그 타입 스크립트를 지정해 주십시오:

```json5 fileName="tsconfig.json"
{
  // ... 설정값
  "include": [
    // ... 원래 할당값 목록 배열 옵션들
    ".intlayer/**/*.ts", // 자동 생성 폴더를 Include 로 추가해 줍니다!
  ],
}
```

### Git (깃/형상관리) 구성

파일 생성을 피하기 위한 개발자의 상식처럼 Git 형상 원격 저장소에 병합 푸시되지 않기 위해 Ignore 규칙 적용합니다.

루트 디렉토리 내의 숨겨진 텍스트 `.gitignore` 에 옵션을 추가합니다:

```plaintext fileName=".gitignore"
# Intlayer 컴파일 자동 생성 캐시 무시하기!
.intlayer
```

### Visual Studio Code 익스텐션 및 VSC 개발 도구!

Next JS에서 Intlayer로 번역 작업하는 프로그래머분들의 시간을 최대로 감축시킬 VSC의 "공식 도구" 인 **Intlayer VS Code Extension (익스텐션)**을 지원합니다!

[VS Code 스토어(Marketplace) 다운로드 및 활성화.](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

지원 기능 목록:

- **자동 완성 (Autocompletion)**: 사전 키 검색에 관련된 가장 강력한 인텔리센스 및 코드 힌트.
- **실시간(Real-Time) 체크 및 분석**: 스크립트 작성 간 오류 및 키 결여 여부에 대해 붉게 확인하여 방지합니다!.
- **인라인 (Hover-inline) 미리보기**: 렌더 화면 대신 마우스 호버로 코드 위에 한국어, 영어 등 언어가 쓰인 화면과 미리 보기가 실행!.
- **퀵 액션(Quick Edit Actions) 바**: 에딧 에디터 내부의 핫 액션 도구 키로 코드를 덜 작성하고 편집하거나 지우는 매크로 자동화 단축 도구!

VSC 활용 및 관련 도움과 상세 매뉴얼은 여기서 봅니다 -> [Intlayer VS Code 익스텐션 설명서 위키 (영문)](https://intlayer.org/doc/vs-code-extension).

### 다음 단계

기초 구성을 마치고, NextJS 플랫폼 사용도를 극한으로 끌어올릴 수치와 도구들. 비주얼 에디터[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 모듈 추가 활용하기 나 독립된 서버 데이터 관리 방식의 [CMS 연동 백엔드 네트워크 활용 단계](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 연동 및 활용해 보세요.
