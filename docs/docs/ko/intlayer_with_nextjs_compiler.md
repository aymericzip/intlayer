---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Next.js 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - 컴파일러
  - AI
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "최초 릴리스"
author: aymericzip
---

# 기존 Next.js 애플리케이션을 다국어(i18n)로 만드는 방법 (i18n 가이드 2026)

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">

<iframe title="Next.js를 위한 최고의 i18n 솔루션? Intlayer를 만나보세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
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
그런 다음 빌드 단계 중에 소스 코드를 수정하여 필요한 i18n 훅을 주입합니다. 기본적으로 앱을 단일 언어인 것처럼 계속 작성하면 컴파일러가 다국어 변환을 네이티브로 처리합니다.

> 컴파일러 문서: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)

### 제한 사항

컴파일러는 **컴파일 시점**에 코드 분석 및 변환(훅 삽입 및 사전 생성)을 수행하기 때문에 애플리케이션의 **빌드 시간이 느려질 수 있습니다.**

활발한 개발 중(dev 모드) 이 영향을 제한하기 위해 컴파일러를 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md) 모드로 설정하거나 필요하지 않을 때 비활성화할 수 있습니다.

---

## Next.js 애플리케이션에서 Intlayer 설정 단계별 가이드

<Steps>

<Step number={1} title="종속성 설치">

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

  Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화를 위한 컨텍스트 공급자와 훅을 제공합니다. 또한 Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과 선호 로캘 감지, 쿠키 관리 및 URL 리디렉션을 처리하는 미들웨어가 포함되어 있습니다.

</Step>

<Step number={2} title="프로젝트 구성">

애플리케이션의 언어를 정의하기 위한 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.KOREAN],
    defaultLocale: Locales.KOREAN,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * 개발 중에 컴파일러를 건너뛰고 시작 시간을 단축하려면 'build-only'로 설정하십시오.
     */
    enabled: true,

    /**
     * 최적화된 사전의 출력 디렉터리.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * 키 없이 생성된 파일에 콘텐츠만 삽입합니다.
     */
    noMetadata: false,

    /**
     * 사전 키 접두사
     */
    dictionaryKeyPrefix: "", // Remove base prefix
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "이것은 간단한 지도 애플리케이션 예시입니다",
  },
};

export default config;
```

> **참고**: 환경 변수에 `OPEN_AI_API_KEY`가 설정되어 있는지 확인하세요.

> 이 구성 파일을 통해 지역화된 URL, 프록시 리디렉션, 쿠키 매핑, 콘텐츠 선언의 위치 및 확장자를 설정하고 콘솔에서 Intlayer 로그를 비활성화하는 등 다양한 작업을 수행할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Next.js 구성에 Intlayer 통합">

Intlayer를 사용하도록 Next.js 설정을 구성합니다:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* 여기에 선택적 추가 Next.js 구성 */};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Next.js와 Intlayer를 통합하는 데 사용됩니다. 사전 파일의 빌드를 보장하고 개발 모드에서 파일를 감시합니다. [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭을 제공하고 서버 컴포넌트와 완벽하게 연동됩니다.

</Step>

<Step number={4} title="Babel 구성">

Intlayer 컴파일러는 콘텐츠를 추출하고 최적화하기 위해 Babel이 필요합니다. `babel.config.js` (또는 `babel.config.json`)을 업데이트하여 Intlayer 플러그인을 포함하세요:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

</Step>

<Step number={5} title="페이지에서 로케일 감지">

`RootLayout`에서 모든 것을 제거하고 다음 코드로 바꾸세요:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="컴포넌트 컴파일">

컴파일러가 활성화되면, 더 이상 content dictionaries(예: `.content.ts` 파일)를 수동으로 선언할 **필요가 없습니다**.

대신 코드에 직접 문자열로 콘텐츠를 작성할 수 있습니다. Intlayer가 코드를 분석하고, 구성된 AI 제공자를 사용하여 번역을 생성한 후, 컴파일 시간에 문자열을 지역화된 콘텐츠로 바꿉니다.

기본 로케일에 하드코딩된 문자열로 컴포넌트를 작성하기만 하면 됩니다. 컴파일러가 나머지를 처리합니다.

페이지가 어떻게 보일 수 있는지의 예:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";

const PageContent: FC = () => {
  return (
    <>
      <p>편집하여 시작하세요</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default function Page() {
  return <PageContent />;
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      ko: {
        getStartedByEditing: "편집하여 시작하기",
      },
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      es: {
        getStartedByEditing: "Comience editando",
      },
    }
  }
}
```

<Tabs>
  <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default function Page() {
  return <PageContent />;
}
```

- **`IntlayerProvider`**는 루트 레이아웃에 한 번만 마운트됩니다. 서버 및 클라이언트 컴포넌트 모두에 locale을 제공하므로 페이지가 더 이상 자기 자신을 래핑할 필요가 없습니다.
- `[locale]` 경로 세그먼트가 없으면 locale은 항상 요청에서 가져옵니다 — Intlayer 프록시에서 설정한 `x-intlayer-locale` 헤더, 그 다음 locale 쿠키 — 공급자가 실행되지 않았을 때 서버 훅이 자체적으로 읽습니다.

  </Tab>
  <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerClientProvider`**는 클라이언트 측 컴포넌트에 로케일을 제공하는 데 사용됩니다.
- **`IntlayerServerProvider`**는 서버 자식에 로케일을 제공하는 데 사용됩니다.

  > Layout과 page는 server context system이 per-request data store(via [React's cache](https://react.dev/reference/react/cache) mechanism)을 기반으로 하기 때문에 공통 server context를 공유할 수 없습니다. 애플리케이션의 다양한 세그먼트에 대해 각 "context"가 재생성되므로, provider를 공유 layout에 배치하면 이러한 격리가 깨지고 server context 값이 server components로 올바르게 전파되지 않습니다.

  </Tab>

</Tabs>

</Step>

<Step number={7} title="누락된 번역 채우기" isOptional={true}>

Intlayer는 누락된 번역을 채우는 데 도움이 되는 CLI 도구를 제공합니다. `intlayer` 명령을 사용하여 코드에서 누락된 번역을 테스트하고 채울 수 있습니다.

```bash packageManager="npm"
npx intlayer test         # 누락된 번역이 있는지 테스트합니다
```

```bash packageManager="yarn"
yarn intlayer test         # 누락된 번역이 있는지 테스트
```

```bash packageManager="pnpm"
pnpm intlayer test         # 누락된 번역이 있는지 테스트
```

```bash packageManager="bun"
bun x intlayer test         # 누락된 번역이 있는지 테스트
```

```bash packageManager="npm"
npx intlayer fill         # 누락된 번역 채우기
```

```bash packageManager="yarn"
yarn intlayer fill         # 누락된 번역 채우기
```

```bash packageManager="pnpm"
pnpm intlayer fill         # 누락된 번역 채우기
```

```bash packageManager="bun"
bun x intlayer fill         # 누락된 번역 채우기
```

> 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/ci.md)를 참고하세요.

</Step>

<Step number={8} title="로케일 감지를 위한 프록시 구성" isOptional={true}>

사용자의 선호 언어를 감지하도록 프록시 설정:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`는 사용자의 선호 로케일을 감지하고 [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 지정된 적절한 URL로 리다이렉트하는 데 사용됩니다. 또한 사용자의 선호 로케일을 쿠키에 저장할 수 있게 해줍니다.

> Intlayer v9 이후, 이 미들웨어는 `routing.enableProxy` 옵션을 준수합니다 (기본값은 `true`). 이 파일을 제거하지 않고 pass-through로 변환하려면 설정에서 `routing.enableProxy: false`를 설정하세요. [v9 릴리스 노트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/releases/v9.md)를 참조하세요.

</Step>

<Step number={8} title="콘텐츠의 언어 변경" isOptional={true}>

Next.js에서 콘텐츠의 언어를 변경하려면 `Link` 컴포넌트를 사용하여 사용자를 적절한 지역화된 페이지로 리디렉션하는 것이 권장됩니다. `Link` 컴포넌트는 페이지의 프리페칭을 활성화하므로 전체 페이지 새로고침을 피하는 데 도움이 됩니다.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 자체 로케일의 언어 - 예: Français */}
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
          </button>
        ))}
      </div>
    </div>
  );
};
```

> `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용하는 것도 다른 방법입니다. 이 함수는 페이지 프리페칭을 허용하지 않습니다. 자세한 내용은 [`useLocale` 훅 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)를 참조하세요.

</Step>

<Step number={10} title="번들 크기 최적화" isOptional={true}>

`next-intlayer`를 사용할 때, 기본적으로 모든 페이지에 대해 사전이 번들에 포함됩니다. 번들 크기를 최적화하기 위해 Intlayer는 매크로를 사용하여 `useIntlayer` 호출을 지능적으로 대체하는 선택적 SWC 플러그인을 제공합니다. 이는 실제로 사용하는 페이지의 번들에만 사전이 포함되도록 보장합니다.

`@intlayer/babel` 플러그인은 이미 번들링 최적화를 통합하고 있습니다 (`babel.config.js` 참고). 하지만 `@intlayer/swc` 플러그인이 더 성능이 좋습니다. `@intlayer/babel` 플러그인을 제거하면 `@intlayer/swc` 플러그인을 사용할 수 있습니다.

`@intlayer/swc` 패키지를 설치하세요. 설치하면 `next-intlayer`가 자동으로 플러그인을 감지하고 사용합니다:

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

> 참고: 이 최적화는 Next.js 13 이상에서만 사용 가능합니다.

> 참고: 이 패키지는 SWC 플러그인이 Next.js에서 아직 실험적이기 때문에 기본적으로 설치되지 않습니다. 향후 변경될 수 있습니다.

> 주의: `importMode: 'dynamic'` 또는 `importMode: 'fetch'`로 옵션을 설정하면 (`dictionary` 구성에서), Suspense에 의존하게 되므로 `useIntlayer` 호출을 `Suspense` 경계로 감싸야 합니다. 즉, Page / Layout 컴포넌트의 최상위 레벨에서 `useIntlayer`를 직접 사용할 수 없습니다.

</Step>

<Step number={11} title="컴포넌트에서 콘텐츠 추출" isOptional={true}>

기존 codebase가 있다면 수천 개의 파일을 변환하는 것은 시간이 많이 걸릴 수 있습니다.

이 프로세스를 단순화하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하기 위한 [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제공합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 설정
  compiler: {
    /**
     * 컴파일러가 활성화되어야 하는지 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환된 후 컴포넌트를 저장해야 하는지 나타냅니다.
     *
     * - `true`인 경우, 컴파일러는 디스크의 컴포넌트 파일을 다시 작성합니다. 따라서 변환은 영구적이 되며, 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이렇게 하면 컴파일러가 앱을 변환한 다음 제거할 수 있습니다.
     *
     * - `false`인 경우, 컴파일러는 빌드 출력에만 `useIntlayer()` 함수 호출을 삽입하고 기본 codebase를 그대로 유지합니다. 변환은 메모리에서만 수행됩니다.
     */
    saveComponents: false,

    /**
     * 사전 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

extractor를 실행하여 컴포넌트를 변환하고 콘텐츠를 추출합니다

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

> v9 이상에서는 `intlayerCompiler`가 `intlayer` 플러그인에 포함되어 있습니다. 따라서 수동으로 추가할 필요가 없습니다.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // 컴포넌트에서 콘텐츠를 사전으로 추출
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # 또는 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 또는 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 또는 yarn dev
```

```bash packageManager="bun"
bun run build # 또는 bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### TypeScript 설정

Intlayer는 TypeScript의 이점을 활용하고 코드베이스를 더욱 강력하게 만들기 위해 모듈 확장(module augmentation)을 사용합니다.

![자동 완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 설정에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer에서 생성한 파일을 무시하는 것이 좋습니다. 이를 통해 Git 리포지토리에 커밋되는 것을 방지합니다.

이렇게 하려면 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 익스텐션

Intlayer를 사용한 개발 환경을 개선하기 위해 **공식 Intlayer VS Code 익스텐션**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 익스텐션은 다음을 제공합니다:

- 번역 키 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트하기 위한 **빠른 작업(Quick actions)**.

익스텐션 사용법에 대한 자세한 내용은 [Intlayer VS Code 익스텐션 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### 더 알아보기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

## 자주 묻는 질문

<FAQ>

<Question title="Next.js 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

`next.config.js`의 `i18n` 필드는 App Router에 적용되지 않으므로 지역화 계층은 항상 라이브러리를 통해 선택해야 합니다:

- **`next-intl`**, **`next-i18next` / `i18next`** 및 **`react-intl`**: 네임스페이스별로 로드되는 JSON 또는 ICU 카탈로그 기반이며, 모든 호출 위치에서 키를 수동으로 작성합니다.
- **`Lingui`**: 빌드 타임에 컴파일되는 ICU 메시지를 사용하는 추출 기반 솔루션입니다.
- **`Intlayer`**: 빌드 타임에 컴포넌트에서 직접 콘텐츠를 컴파일하여 추출하며, 완전한 타입 안전성을 제공하고 AI 번역, 비주얼 에디터 및 CMS를 지원합니다.

본 가이드는 컴파일러 설정을 사용하므로 컴포넌트에 일반 문자열을 그대로 작성하면 사전이 자동으로 생성됩니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)와 [Next.js i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)를 참조하세요.

</Question>

<Question title="i18n이 Next.js 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. Server Components는 서버에서 직접 콘텐츠를 확인하며, 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거되며, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 next-intl, next-i18next 또는 i18next에서 마이그레이션할 수 있나요?">

네, 두 가지 방법이 있습니다. [next-intl 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md) 또는 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 통해 콘텐츠를 점진적으로 마이그레이션할 수 있습니다. 또는 현재 API를 완전히 유지할 수도 있습니다. [호환 어댑터(compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)는 `next-intl`, `react-i18next`, `react-intl`과 완전히 동일한 API를 노출하면서 Intlayer 사전에서 데이터를 제공하므로, import 구문만 변경하고 컴포넌트 코드는 그대로 유지할 수 있습니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. 이것이 바로 이 가이드에서 구성한 내용입니다. 기본 로케일의 일반 문자열로 컴포넌트를 작성하기만 하면 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)가 빌드할 때마다 소스를 스캔하고 사용자 대면 텍스트를 추출하여 사전을 생성하므로 수동으로 키를 생성하거나 유지 관리할 필요가 없습니다.

두 가지 제한 사항을 알아두면 좋습니다. 컴파일러는 정적 분석으로 작동하므로 API 오류 코드나 CMS 필드와 같이 런타임에만 존재하는 문자열은 감지할 수 없으므로 여전히 명시적인 사전 선언이 필요합니다. 또한 대규모 코드베이스에서는 `className="active"`나 상태 코드와 같은 애플리케이션 로직과 사용자 텍스트를 구분하기 위해 몇 가지 주석이 필요할 수 있습니다.

수동으로 제어하기를 선호한다면 `npx intlayer extract`를 실행하여 원하는 파일에 대해 추출을 한 번 수행하고 각 컴포넌트 옆에 생성된 `.content` 파일의 diff를 검토할 수도 있습니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 참조하세요.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="컴파일러를 사용해야 할까요, 아니면 콘텐츠를 직접 선언해야 할까요?">

기존 코드베이스에 최소한의 코드 변경으로 i18n을 도입하고 싶을 때는 컴파일러를 사용하세요: 컴포넌트는 그대로 두고 사전이 자동으로 생성됩니다. 키, 구조 및 재사용을 명시적으로 제어하고 싶다면 [표준 Next.js 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)처럼 콘텐츠를 직접 선언하세요. 두 방식은 동일한 사전 계층 내에서 공존할 수 있습니다.

</Question>

<Question title="Babel을 구성해야 하는 이유는 무엇인가요?">

4단계에서 다룹니다. 컴파일러는 Babel 변환을 통해 컴포넌트를 읽으므로 추출 패스를 실행하기 위해 Next.js에 `babel.config.js`가 필요합니다. 컴파일러 설정을 선택하면 `npx intlayer init --interactive`가 이를 자동으로 스캐폴딩해 줍니다.

</Question>

<Question title="컴파일러가 감지할 수 없는 문자열은 어떻게 되나요?">

컴파일러는 정적 분석으로 작동하므로 이러한 문자열은 번역되지 않은 상태로 유지됩니다. API 오류 메시지, CMS 필드 또는 문자열 연결로 런타임에 조립되는 모든 것은 일반적인 방식으로 콘텐츠 파일에 명시적으로 선언해야 합니다. 누락된 항목을 찾으려면 `npx intlayer test`를 실행하세요.

</Question>

<Question title="누락된 번역은 어떻게 채우나요?">

7단계에서 다룹니다. `npx intlayer fill`은 추출된 콘텐츠를 사용자가 지정한 제공업체와 API 키를 통해 원하는 LLM으로 전송하며, `--git-diff`는 브랜치에서 변경된 사항으로 범위를 제한합니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="로케일은 어떻게 감지되나요?">

5단계에서 페이지에서 로케일을 읽고, 8단계에서 URL, 쿠키 또는 `Accept-Language` 헤더에서 로케일을 확인하는 프록시를 추가합니다. `routing.mode`는 로케일이 경로에 나타날지 여부를 결정합니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="Intlayer는 복수형, 성별 및 서식 있는 텍스트(Rich Text)를 지원하나요?">

네: [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md), 긴 텍스트를 위한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md), 그리고 숫자, 날짜, 통화를 위한 [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)를 지원합니다.

</Question>

<Question title="번역가가 코드를 건드리지 않고 콘텐츠를 수정할 수 있나요?">

자체 호스팅되는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 통해 누구나 실행 중인 앱에서 직접 텍스트를 수정할 수 있으며, 배포 없이 콘텐츠를 변경해야 하는 경우에는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 활용할 수 있습니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
