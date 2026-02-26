---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - 기존 Next.js 앱을 다국어 앱으로 변환하기 2026
description: Intlayer Compiler를 사용하여 기존 Next.js 애플리케이션을 다국어로 만드는 방법을 알아보세요. 문서를 따라 국제화(i18n)하고 AI로 번역하세요.
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
그런 다음 빌드 단계 중에 소스 코드를 수정하여 필요한 i18n 훅을 주입합니다. 기본적으로 앱을 단일 언어인 것처럼 계속 작성하면 컴파일러가 다국어 변환을 네이티브로 처리합니다.

> 컴파일러 문서: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)

### 제한 사항

컴파일러는 **컴파일 시점**에 코드 분석 및 변환(훅 삽입 및 사전 생성)을 수행하기 때문에 애플리케이션의 **빌드 시간이 느려질 수 있습니다.**

활발한 개발 중(dev 모드) 이 영향을 제한하기 위해 컴파일러를 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md) 모드로 설정하거나 필요하지 않을 때 비활성화할 수 있습니다.

---

## Next.js 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

  Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화를 위한 컨텍스트 공급자와 훅을 제공합니다. 또한 Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과 선호 로캘 감지, 쿠키 관리 및 URL 리디렉션을 처리하는 미들웨어가 포함되어 있습니다.

### 2단계: 프로젝트 구성

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
    enabled: true, // dev 모드 영향을 줄이려면 'build-only'로 설정 가능
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 컴파일 접두사 없음, 기본값은 "comp-"
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

### 3단계: Next.js 구성에 Intlayer 통합

Intlayer를 사용하도록 Next.js 설정을 구성합니다:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 여기에 선택적 추가 Next.js 구성 */
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Next.js와 Intlayer를 통합하는 데 사용됩니다. 사전 파일의 빌드를 보장하고 개발 모드에서 파일를 감시합니다. [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭을 제공하고 서버 컴포넌트와 완벽하게 연동됩니다.

### Babel 구성

Intlayer 컴파일러는 콘텐츠를 추출하고 최적화하기 위해 Babel이 필요합니다. Intlayer 플러그인을 포함하도록 `babel.config.js` (또는 `babel.config.json`)를 업데이트하세요:

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

### 4단계: 페이지에서 로캘 감지

`RootLayout`의 내용을 비우고 아래 예시로 교체하세요:

```tsx fileName="src/app/layout.tsx"
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

### 5단계: 콘텐츠 선언(자동)

컴파일러를 활성화하면 콘텐츠 사전(`.content.ts` 파일 등)을 **수동으로 선언할 필요가 없습니다.**

신 대신, 코드에 직접 하드코딩된 문자열로 콘텐츠를 작성합니다. Intlayer는 소스 코드를 스캔하고 구성된 AI 공급자를 사용하여 번역을 생성하며, 빌드 컴파일 단계 중에 해당 문자열을 지역화된 콘텐츠로 자동으로 교체합니다. 이 모든 것이 완전히 자동화되어 있습니다.

기본 로캘의 하드코딩된 문자열을 사용하여 컴포넌트를 작성하고 나머지는 Intlayer 컴파일러에 맡기면 됩니다.

`page.tsx`의 모습 예시:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>편집하여 시작해보세요!</p>
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

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      ko: {
        getStartedByEditingThis: "편집하여 시작해보세요!",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
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

  </Tab>
</Tabs>

- **`IntlayerClientProvider`**는 클라이언트 측에서 자식 요소에 로캘을 제공하는 데 사용됩니다.
- 반면 **`IntlayerServerProvider`**는 서버 측에서 자식 요소에 로캘을 제공하는 데 사용됩니다.

### (선택 사항) 7단계: 누락된 번역 채우기

Intlayer는 누락된 번역을 채울 수 있도록 CLI 도구를 제공합니다. `intlayer` 명령을 사용하여 코드에서 누락된 번역을 테스트하고 채울 수 있습니다.

```bash
npx intlayer test         # 누락된 번역이 있는지 테스트
```

```bash
npx intlayer fill         # 누락된 번역 채우기
```

> 자세한 내용은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/ci.md)를 참조하세요.

### (선택 사항) 8단계: 지역화된 라우팅 프록시 미들웨어

사용자를 선호하는 로캘로 자동으로 리디렉션하려면 프록시 미들웨어를 설정하세요:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`는 사용자의 선호 로캘을 감지하고 [구성 파일 설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 지정된 적절한 URL로 리디렉션하는 데 사용됩니다. 또한 사용자의 선호 로캘을 쿠키에 저장을 가능하게 합니다.

### (선택 사항) 9단계: 콘텐츠 언어 변경

Next.js 내에서 콘텐츠 언어를 변경하는 가장 권장되는 방법은 `Link` 컴포넌트를 사용하여 사용자를 적절한 언어 경로로 안내하는 것입니다. 이는 Next.js의 프리패치 기능을 활용하며 전체 페이지가 하드 리프레시되는 것을 방지합니다.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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
              {/* 로캘 표기 - 예. KO */}
              {localeItem}
            </span>
            <span>
              {/* 자체 로캘 방식의 언어 - 예. 한국어 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로캘 방식의 언어 - 예. Francés (현재 로캘이 Locales.SPANISH인 경우) */}
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

> 대안으로 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있지만, 이는 페이지 프리패치를 허용하지 않습니다. 자세한 내용은 [`useLocale` 훅 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)를 참조하세요.

### (선택 사항) 10단계: 번들 크기 최적화

`next-intlayer`를 사용할 때 기본적으로 모든 페이지 번들에 사전이 포함됩니다. 번들 크기를 최적화하기 위해 Intlayer는 매크로를 사용하여 `useIntlayer` 호출을 지능적으로 대체하는 선택적 SWC 플러그인을 제공합니다. 이를 통해 사전은 실제로 사용하는 페이지의 번들에만 포함됩니다.

이 최적화를 활성화하려면 `@intlayer/swc` 패키지를 설치하세요. 설치가 완료되면 `next-intlayer`가 자동으로 플러그인을 감지하고 사용합니다:

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

> 참고: 이 최적화는 Next.js 13 이상에서만 사용할 수 있습니다.

> 참고: Next.js SWC 플러그인은 아직 실험 단계이므로 이 패키지는 기본적으로 설치되지 않습니다. 이는 향후 변경될 수 있습니다.

> 참고: (사전 설정에서) `importMode: 'dynamic'` 또는 `importMode: 'fetch'`를 설정한 경우 Suspense에 의존하므로 `useIntlayer` 호출을 `Suspense` 경계로 감싸야 합니다. 즉, 페이지 / 레이아웃 컴포넌트의 최상위 레벨에서 직접 `useIntlayer`를 사용할 수 없게 됩니다.

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
