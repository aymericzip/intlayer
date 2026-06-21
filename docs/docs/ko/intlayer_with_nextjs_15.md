---
createdAt: 2024-12-06
updatedAt: 2026-05-31
title: "Next.js 15 i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Next.js 15 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Next.js 15
  - 자바스크립트
  - 리액트
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
applicationShowcase: https://next-15-intlayer-template-xt83.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# Intlayer로 Next.js 15 번역하기 | 국제화(i18n)

<Tabs defaultTab="video">
  <Tab label="동영상" value="video">
  
<iframe title="Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-15-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://next-15-intlayer-template-xt83.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 - intlayer-next-15-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-next-15-template)을 확인하세요.

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'next-intl' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화 기능을 제공하는 솔루션입니다.

<AccordionGroup>

<Accordion header="전체 Next.js 적용 범위">

Intlayer는 효율적인 렌더링을 위해 **서버 구성요소**와 작동하도록 최적화되어 있으며 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)과 완벽하게 호환됩니다. 정적 렌더링을 차단하지 않으며 미들웨어는 물론 국제화 확장(i18n)에 필요한 모든 기능을 제공합니다.

> Intlayer는 Next.js 12, 13, 14, 15, 16과 호환됩니다. Next.js Pages Router를 사용하는 경우 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)를 참조하세요.
> 로케일 라우팅은 SEO, 번들 크기 및 성능에 유용합니다. 필요하지 않은 경우에는 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md)를 참고하시면 됩니다.
> 앱 라우터가 포함된 Next.js 12, 13, 14, 15의 경우 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md)를 참조하세요.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

</Accordion>

<Accordion header="유지관리성">

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent)와 같은 도구 모음도 함께 제공됩니다. 기술](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

</Accordion>

<Accordion header="오토메이션">

AI 공급자의 비용으로 선택한 LLM을 사용하여 CI/CD 파이프라인을 번역하려면 자동화를 사용하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**을 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

대규모 JSON 파일을 구성 요소에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="개발자가 없는 경우 확장">

Intlayer는 단순한 i18n 솔루션 그 이상으로 관리에 도움이 되는 **자체 호스팅 [비주얼 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** 및 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공합니다. 다국어 콘텐츠를 **실시간**으로 제공하여 번역가, 카피라이터, 기타 팀원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

</Accordion>
</AccordionGroup>

---

## Next.js 애플리케이션에서 Intlayer 설정 단계별 가이드

<Steps>

<Step number={1} title="의존성 설치">

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링, 그리고 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화에 필요한 컨텍스트 제공자와 훅을 제공합니다. 또한 Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과, 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어도 포함되어 있습니다.

</Step>

<Step number={2} title="프로젝트 구성">

Here is the final structure that we will make:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

애플리케이션의 언어를 구성하기 위해 설정 파일을 만듭니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Next.js 구성에 Intlayer 통합하기">

Next.js 설정을 Intlayer와 함께 사용하도록 구성하세요:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 여기에 구성 옵션을 입력하세요 */
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Intlayer를 Next.js와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링하는 역할을 합니다. 또한 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 추가로, 성능 최적화를 위한 별칭(alias)을 제공하며 서버 컴포넌트와의 호환성을 보장합니다.

</Step>

<Step number={4} title="동적 로케일 경로 정의">

`RootLayout`의 모든 내용을 제거하고 다음 코드로 교체하세요:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> `RootLayout` 컴포넌트를 비워두면 `<html>` 태그에 [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) 및 [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) 속성을 설정할 수 있습니다.

동적 라우팅을 구현하려면 `[locale]` 디렉터리에 새 레이아웃을 추가하여 로케일 경로를 제공합니다:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> `[locale]` 경로 세그먼트는 로케일을 정의하는 데 사용됩니다. 예: `/en-US/about`는 `en-US`를, `/fr/about`는 `fr`를 가리킵니다.

> 이 단계에서 `Error: Missing <html> and <body> tags in the root layout.` 오류가 발생할 수 있습니다. 이는 `/app/page.tsx` 파일이 더 이상 사용되지 않으며 제거할 수 있기 때문에 예상되는 현상입니다. 대신, `[locale]` 경로 세그먼트가 `/app/[locale]/page.tsx` 페이지를 활성화합니다. 따라서 브라우저에서 `/en`, `/fr`, `/es`와 같은 경로를 통해 페이지에 접근할 수 있습니다. 기본 로케일을 루트 페이지로 설정하려면 7단계의 `middleware` 설정을 참조하세요.

그런 다음, 애플리케이션 Layout에서 `generateStaticParams` 함수를 구현합니다.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // 삽입할 라인

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... 나머지 코드 */
};

export default LocaleLayout;
```

> `generateStaticParams`는 애플리케이션이 모든 로케일에 필요한 페이지를 사전 빌드하도록 하여 런타임 계산을 줄이고 사용자 경험을 향상시킵니다. 자세한 내용은 [Next.js의 generateStaticParams 문서](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params)를 참조하세요.

</Step>

<Step number={5} title="콘텐츠 선언하기">

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "ko": "편집을 시작하세요",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> 콘텐츠 선언은 애플리케이션 내 어디에서든 정의할 수 있으며, `contentDir` 디렉토리(기본값 `./src`)에 포함되기만 하면 됩니다. 그리고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={6} title="코드에서 콘텐츠 활용하기">

애플리케이션 전반에서 콘텐츠 사전에 접근하세요:

> 애플리케이션 내 어디에서든 `contentDir` 디렉토리(기본값은 `./src`)에 포함되기만 하면 콘텐츠 선언을 정의할 수 있습니다. 그리고 콘텐츠 선언 파일 확장자(기본값은 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={6} title="코드에서 콘텐츠 활용하기">

애플리케이션 전반에서 콘텐츠 사전을 접근하세요:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
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

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`**는 클라이언트 측 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃을 포함한 모든 상위 컴포넌트에 배치할 수 있습니다. 그러나 Next.js가 페이지 간에 레이아웃 코드를 공유하기 때문에 레이아웃에 배치하는 것이 권장됩니다. 레이아웃에서 `IntlayerClientProvider`를 사용하면 각 페이지마다 다시 초기화하는 것을 피할 수 있어 성능이 향상되고 애플리케이션 전체에서 일관된 로컬라이제이션 컨텍스트를 유지할 수 있습니다.
- **`IntlayerServerProvider`**는 서버 자식 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃에는 설정할 수 없습니다.

  > 레이아웃과 페이지는 공통 서버 컨텍스트를 공유할 수 없습니다. 서버 컨텍스트 시스템이 요청별 데이터 저장소([React의 cache](https://react.dev/reference/react/cache) 메커니즘)를 기반으로 하기 때문에 애플리케이션의 서로 다른 세그먼트마다 각 "컨텍스트"가 다시 생성됩니다. 공급자를 공유 레이아웃에 배치하면 이러한 격리가 깨져 서버 컴포넌트에 서버 컨텍스트 값이 올바르게 전파되지 않습니다.

  > 레이아웃과 페이지는 공통 서버 컨텍스트를 공유할 수 없습니다. 서버 컨텍스트 시스템이 요청별 데이터 저장소([React의 캐시](https://react.dev/reference/react/cache) 메커니즘)를 기반으로 하기 때문에 애플리케이션의 서로 다른 세그먼트마다 각 "컨텍스트"가 다시 생성됩니다. 제공자를 공유 레이아웃에 배치하면 이 격리가 깨져 서버 컨텍스트 값이 서버 컴포넌트에 올바르게 전달되지 않습니다.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

> 콘텐츠를 `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 사용하려면, 함수의 값을 호출해야 합니다. 예를 들어:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)를 참조하세요.

</Step>

<Step number={7} title="로케일 감지를 위한 미들웨어 구성" isOptional={true}>

사용자의 선호 로케일을 감지하기 위해 미들웨어를 설정합니다:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerMiddleware`는 사용자의 선호 로케일을 감지하여 [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 명시된 적절한 URL로 리디렉션하는 데 사용됩니다. 또한 사용자의 선호 로케일을 쿠키에 저장할 수 있도록 합니다.

</Step>

<Step number={8} title="메타데이터의 국제화" isOptional={true}>

페이지 제목과 같은 메타데이터를 국제화하려는 경우, Next.js에서 제공하는 `generateMetadata` 함수를 사용할 수 있습니다. 내부에서는 `getIntlayer` 함수에서 콘텐츠를 가져와 메타데이터를 번역할 수 있습니다.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "ko": "create next app에 의해 생성됨"
      },
    },
  },
};
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
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
   *  //  }
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

> `next-intlayer`에서 가져온 `getIntlayer` 함수는 콘텐츠를 `IntlayerNode`로 감싸서 반환하여 시각적 편집기와의 통합을 가능하게 합니다. 반면, `intlayer`에서 가져온 `getIntlayer` 함수는 추가 속성 없이 콘텐츠를 직접 반환합니다.

또는 `getTranslation` 함수를 사용하여 메타데이터를 선언할 수 있습니다. 그러나 메타데이터의 번역을 자동화하고 콘텐츠를 외부화하기 위해 콘텐츠 선언 파일을 사용하는 것이 권장됩니다.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
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

> 메타데이터 최적화에 대해 더 알아보려면 [공식 Next.js 문서](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)를 참고하세요.

</Step>

<Step number={9} title="sitemap.xml 및 robots.txt의 다국어 지원" isOptional={true}>

`sitemap.xml`과 `robots.txt`를 다국어로 지원하려면 Intlayer에서 제공하는 `getMultilingualUrls` 함수를 사용할 수 있습니다. 이 함수는 사이트맵에 다국어 URL을 생성할 수 있게 해줍니다.

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

// 모든 다국어 URL을 가져오는 함수
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// robots 메타데이터 설정
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // 모든 사용자 에이전트 허용
    allow: ["/"], // 루트 경로 허용
    disallow: getAllMultilingualUrls(["/login", "/register"]), // 로그인 및 회원가입 페이지 접근 차단
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> 사이트맵 최적화에 대해 더 알아보려면 [공식 Next.js 문서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)를 참고하세요. robots.txt 최적화에 대해서는 [공식 Next.js 문서](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)를 참고하세요.

</Step>

<Step number={10} title="콘텐츠 언어 변경하기" isOptional={true}>

Next.js에서 콘텐츠의 언어를 변경하려면, 권장되는 방법은 `Link` 컴포넌트를 사용하여 사용자를 적절한 현지화된 페이지로 리디렉션하는 것입니다. `Link` 컴포넌트는 페이지를 미리 가져오도록 하여 전체 페이지 새로고침을 방지하는 데 도움을 줍니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
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

> 대안으로 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 페이지를 미리 가져오지 않으며 페이지를 다시 로드합니다.

> 이 경우 `router.push`를 사용한 리디렉션 없이 서버 측 코드만 콘텐츠의 로케일을 변경합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="지역화된 링크 컴포넌트 만들기" isOptional={true}>

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 커스텀 `Link` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 내부 URL에 현재 언어를 자동으로 접두사로 붙여줍니다. 예를 들어, 프랑스어 사용자가 "About" 페이지로 가는 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로컬라이즈된 URL은 검색 엔진이 언어별 페이지를 올바르게 인덱싱하도록 도와주며, 사용자에게 선호하는 언어로 된 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에 걸쳐 로컬라이즈된 링크를 사용함으로써 내비게이션이 현재 로케일 내에서 유지되어 예상치 못한 언어 전환을 방지합니다.
- **유지보수성**: 현지화 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화하여 애플리케이션이 성장함에 따라 코드베이스를 더 쉽게 유지보수하고 확장할 수 있습니다.

아래는 TypeScript로 구현한 현지화된 `Link` 컴포넌트 예시입니다:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
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
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL 앞에 로케일을 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 링크가 내부 링크이고 유효한 href가 제공된 경우, 로케일이 적용된 URL을 가져옵니다.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### 작동 방식

- **외부 링크 감지**:
- **외부 링크 감지**:  
  헬퍼 함수 `checkIsExternalLink`는 URL이 외부 링크인지 여부를 판단합니다. 외부 링크는 현지화가 필요 없으므로 변경하지 않고 그대로 둡니다.

- **현재 로케일 가져오기**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.

- **URL 현지화**:  
  내부 링크(즉, 외부 링크가 아닌 경우)에 대해 `getLocalizedUrl`을 사용하여 URL 앞에 현재 로케일을 자동으로 붙입니다. 예를 들어 사용자가 프랑스어 로케일에 있다면, `href`에 `/about`을 전달하면 `/fr/about`로 변환됩니다.

- **링크 반환**:  
  이 컴포넌트는 현지화된 URL을 가진 `<a>` 요소를 반환하여, 내비게이션이 로케일과 일관되도록 보장합니다.

이 `Link` 컴포넌트를 애플리케이션 전반에 통합하면 일관되고 언어 인식이 가능한 사용자 경험을 유지할 수 있으며, SEO 및 사용성 향상이라는 이점도 누릴 수 있습니다.

</Step>

<Step number={12} title="번들 크기 최적화" isOptional={true}>

`next-intlayer`를 사용할 때, 사전(dictionary)은 기본적으로 모든 페이지의 번들에 포함됩니다. 번들 크기를 최적화하기 위해 Intlayer는 매크로를 사용하여 `useIntlayer` 호출을 지능적으로 대체하는 선택적 SWC 플러그인을 제공합니다. 이를 통해 사전은 실제로 사용하는 페이지의 번들에만 포함됩니다.

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

> 참고: 이 패키지는 SWC 플러그인이 Next.js에서 아직 실험적이기 때문에 기본적으로 설치되지 않습니다. 향후 변경될 수 있습니다.

</Step>

</Steps>

### TypeScript 구성

Intlayer는 모듈 증강(module augmentation)을 사용하여 TypeScript의 이점을 활용하고 코드베이스를 더욱 견고하게 만듭니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer가 생성한 파일들은 Git 저장소에 커밋하지 않도록 무시하는 것이 권장됩니다.

이를 위해 `.gitignore` 파일에 다음 지시문을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

### VS Code 확장

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- **실시간 오류 감지**로 누락된 번역을 확인할 수 있습니다.
- **인라인 미리보기**로 번역된 내용을 바로 확인할 수 있습니다.
- **빠른 작업**으로 번역을 쉽게 생성하고 업데이트할 수 있습니다.

확장 기능 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.
