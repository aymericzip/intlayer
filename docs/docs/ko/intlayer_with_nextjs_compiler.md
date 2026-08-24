---
createdAt: 2026-01-10
updatedAt: 2026-06-23
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
