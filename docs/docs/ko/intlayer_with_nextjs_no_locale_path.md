---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js 16 i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Next.js 16 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 8.0.0
    date: 2026-01-10
    changes: "초기 릴리스"
author: aymericzip
---

# Intlayer를 사용하여 Next.js 16 웹사이트 번역(페이지 경로에 [locale] 없이) | 국제화 (i18n)

<Tabs defaultTab="video">
  <Tab label="영상" value="video">

<iframe title="Next.js를 위한 최고의 i18n 솔루션? Intlayer를 확인하세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

GitHub에서 [Application Template](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)을(를) 확인하세요.

## 목차

<TOC/>

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

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

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

## Next.js 애플리케이션에 Intlayer를 설정하는 단계별 가이드

<Steps>

<Step number={1} title="의존성 설치">

npm을 사용하여 필요한 패키지를 설치하세요:

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

  국제화 도구를 제공하는 핵심 패키지로, 구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링, 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 제공합니다.

- **next-intlayer**

Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화(i18n)를 위한 context provider와 hook을 제공합니다. 또한 Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과, 사용자의 선호 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 프록시도 포함합니다.

</Step>

<Step number={2} title="프로젝트 구성">

다음은 최종적으로 만들 구조입니다:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> 로케일 라우팅을 원하지 않는 경우, intlayer를 단순한 provider/hook으로 사용할 수 있습니다. 자세한 내용은 [이 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_no_locale_path.md)를 참조하세요.

애플리케이션의 언어를 구성하려면 config 파일을 생성하세요:

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
  routing: {
    mode: "search-params", // 또는 `no-prefix` - 미들웨어 감지에 유용함
  },
};

export default config;
```

> 이 구성 파일을 통해 로케일별 URL, 프록시 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Intlayer를 Next.js 구성에 통합하기">

다음과 같이 Next.js 설정을 Intlayer와 함께 구성하세요:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* 여기에 구성 옵션을 추가하세요 */};

export default withIntlayer(nextConfig);
```

> The `withIntlayer()` Next.js 플러그인은 Intlayer를 Next.js와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일(content declaration files)의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 추가로 성능 최적화를 위한 alias를 제공하고 서버 컴포넌트와의 호환성을 보장합니다.

> `withIntlayer()` 함수는 promise 함수입니다. 빌드가 시작되기 전에 intlayer 딕셔너리를 준비할 수 있습니다. 다른 플러그인과 함께 사용하려면 이를 await할 수 있습니다. 예:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 동기적으로 사용하려면 `withIntlayerSync()` 함수를 사용할 수 있습니다. 예:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> `withIntlayer()` 함수는 프로미스 함수입니다. 빌드가 시작되기 전에 intlayer 사전(intlayer dictionaries)을 준비할 수 있게 해줍니다. 다른 플러그인과 함께 사용하려면 이를 await할 수 있습니다. 예:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 동기적으로 사용하려면 `withIntlayerSync()` 함수를 사용할 수 있습니다. 예:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer는 명령줄 플래그 `--webpack`, `--turbo`, `--turbopack` 및 현재 **Next.js 버전**을 기반으로 프로젝트가 **webpack** 또는 **Turbopack**을 사용 중인지 자동으로 감지합니다.
>
> `next>=16`의 경우, **Rspack**을 사용하고 있다면 Turbopack을 비활성화하여 Intlayer가 webpack 구성을 사용하도록 명시적으로 강제해야 합니다:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="동적 로케일 라우트 정의">

`RootLayout`에서 모든 항목을 제거하고 다음 코드로 바꾸세요:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> 단일 `IntlayerProvider`는 트리의 두 부분을 모두 커버합니다: 서버 훅에서 읽는 request-scoped 서버 컨텍스트를 제공하고, 클라이언트 컴포넌트가 동일한 로케일을 받도록 클라이언트 provider를 마운트합니다.

RootLayout에서 모든 내용을 제거하고 다음 코드로 교체하세요:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
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

 </Tab>
</Tabs>

</Step>

<Step number={5} title="콘텐츠 선언">

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```typescript fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ko: "내 프로젝트 제목",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ko: "워크플로우를 간소화하고 생산성을 향상시키도록 설계된 혁신적인 플랫폼을 만나보세요.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ko: ["혁신", "생산성", "워크플로우", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "ko": "내 프로젝트 제목",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ko": "워크플로를 간소화하고 생산성을 높이도록 설계된 혁신적인 플랫폼을 만나보세요.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "ko": "워크플로우를 단순화하고 생산성을 향상시키도록 설계된 우리의 혁신적인 플랫폼을 확인해 보세요.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "ko": ["혁신", "생산성", "워크플로우", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ko: "편집하여 시작하세요",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "ko": "편집하여 시작하세요",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> 콘텐츠 선언은 애플리케이션 내 어느 곳에든 정의할 수 있으며, `contentDir` 디렉터리(기본값: `./src`)에 포함되기만 하면 됩니다. 또한 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Steps>

<Step number={6} title="코드에서 콘텐츠 활용">

애플리케이션 전체에서 콘텐츠 딕셔너리에 접근하세요:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`**는 루트 레이아웃에 한 번 마운트됩니다. 서버 및 클라이언트 컴포넌트 모두에 로케일을 제공하므로 페이지는 더 이상 자신을 래핑할 필요가 없습니다.
- `[locale]` 경로 세그먼트가 없으면 로케일은 항상 요청에서 가져옵니다 — Intlayer 프록시가 설정한 `x-intlayer-locale` 헤더, 그 다음 로케일 쿠키 — 프로바이더가 실행되지 않았을 때 서버 훅이 자체적으로 읽습니다.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Next.js 15+에서 headers와 cookies를 await 합니다
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 먼저 intlayer 쿠키를 확인합니다 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // 그 다음 intlayer 헤더를 확인합니다 (기본값: 'x-intlayer-locale')
    // 그리고 마지막으로 accept-language 헤더('accept-language')를 확인합니다
    getHeader: (name) => headerList.get(name),
  });

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

- **`IntlayerClientProvider`**는 클라이언트 측 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃을 포함한 모든 상위 컴포넌트에 배치할 수 있습니다. 다만 Next.js가 레이아웃 코드를 페이지 간에 공유하므로 레이아웃에 배치하는 것이 권장됩니다. 레이아웃에서 `IntlayerClientProvider`를 사용하면 페이지마다 이를 다시 초기화하는 일을 피할 수 있어 성능이 향상되고 애플리케이션 전반에 걸쳐 일관된 로컬라이제이션 컨텍스트를 유지할 수 있습니다.
- **`IntlayerServerProvider`**는 서버 자식 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃에 설정할 수 없습니다.

  > Layout과 page는 공통의 서버 컨텍스트를 공유할 수 없습니다. 서버 컨텍스트 시스템은 [React의 cache](https://react.dev/reference/react/cache) 메커니즘을 통해 요청별 데이터 저장소에 기반하므로 애플리케이션의 서로 다른 세그먼트마다 각 "context"가 재생성됩니다. 프로바이더를 공유 레이아웃에 배치하면 이러한 격리가 깨져 서버 컴포넌트에 서버 컨텍스트 값을 올바르게 전파하지 못하게 됩니다.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

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

> `next-intlayer`는 동형(isomorphic) 임포트 경로입니다: `react-server` export 조건은 서버 컴포넌트에 ambient-locale 구현을 제공하고, 클라이언트 컴포넌트는 context 기반 구현을 받습니다. 같은 호출이 양쪽에서 모두 작동합니다.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

 </Tab>
</Tabs>

> 만약 `alt`, `title`, `href`, `aria-label` 등의 `string` 속성에서 콘텐츠를 사용하려면, 함수의 값을 다음과 같이 사용할 수 있습니다:

> 콘텐츠를 `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에 사용하려면, 함수의 값을 호출해야 합니다. 예:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```
>
> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)를 참조하세요.
> </Step>

> `useIntlayer` hook에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)를 참조하세요.

</Step>

<Step number={7} title="로케일 감지를 위한 프록시 구성" isOptional={true}>

사용자의 선호 로케일을 감지하도록 프록시를 설정하세요:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`는 사용자의 선호 로케일을 감지하고 [구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 지정된 대로 적절한 URL로 리디렉션하는 데 사용됩니다. 또한 사용자의 선호 로케일을 쿠키에 저장할 수 있게 해줍니다.

> Intlayer v9 이후, 이 미들웨어는 `routing.enableProxy` 옵션(`true`가 기본값)을 존중합니다. 이 파일을 제거하지 않고 pass-through로 전환하려면 설정에서 `routing.enableProxy: false`를 설정하세요. [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/releases/v9.md)를 참조하세요.

> 여러 프록시를 함께 체인으로 연결해야 하는 경우(예: 인증이나 커스텀 프록시와 함께 `intlayerProxy`를 사용하는 경우), Intlayer는 이제 `multipleProxies`라는 헬퍼를 제공합니다.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="콘텐츠 언어 변경" isOptional={true}>

Next.js에서 콘텐츠의 언어를 변경하려면 권장되는 방법은 `Link` 컴포넌트를 사용하여 사용자를 적절한 로컬라이즈된 페이지로 리디렉션하는 것입니다. `Link` 컴포넌트는 페이지를 프리페치(prefetch)할 수 있게 하여 전체 페이지 리로드를 피하는 데 도움이 됩니다.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
              {/* 해당 로케일의 언어명 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일의 언어명 - 예: 현재 로케일이 Locales.SPANISH로 설정된 경우 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 대안으로 `useLocale` 훅이 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 페이지를 prefetch(사전 페치)하지 않습니다. 자세한 내용은 [`useLocale` 훅 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)를 참조하세요.

> 문서 참조:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="서버 액션에서 현재 로케일 가져오기" isOptional={true}>

Server Action 내부에서 활성 로케일이 필요하다면(예: 이메일 현지화 또는 로케일에 민감한 로직 실행), `next-intlayer/server`에서 `getLocale`을 호출하세요:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // locale를 사용하여 작업을 수행합니다
};
```

> `getLocale` 함수는 사용자의 로케일을 결정하기 위해 계단식 전략을 따릅니다:
>
> 1. 먼저, 프록시가 설정했을 수 있는 `locale` 값을 요청 헤더에서 확인합니다
> 2. 헤더에서 `locale`을 찾지 못하면 쿠키에 저장된 `locale`을 확인합니다
> 3. 쿠키도 없으면 브라우저 설정에서 사용자의 선호 언어를 감지하려고 시도합니다
> 4. 마지막 수단으로 애플리케이션에 구성된 기본 `locale`로 대체됩니다
>
> 이를 통해 사용 가능한 컨텍스트에 따라 가장 적절한 로케일이 선택됩니다.

</Step>

<Step number={10} title="번들 크기 최적화" isOptional={true}>

`next-intlayer`를 사용할 때 사전(dictionaries)은 기본적으로 모든 페이지의 번들에 포함됩니다. 번들 크기를 최적화하기 위해 Intlayer는 매크로를 사용해 `useIntlayer` 호출을 지능적으로 대체하는 선택적 SWC 플러그인을 제공합니다. 이를 통해 사전은 실제로 해당 사전을 사용하는 페이지의 번들에만 포함됩니다.

이 최적화를 활성화하려면 `@intlayer/swc` 패키지를 설치하세요. 설치하면 `next-intlayer`가 플러그인을 자동으로 감지하여 사용합니다:

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

> 참고: 이 패키지는 SWC 플러그인이 Next.js에서 아직 실험적이기 때문에 기본적으로 설치되어 있지 않습니다. 향후 변경될 수 있습니다.

> 참고: 옵션을 `importMode: 'dynamic'` 또는 `importMode: 'fetch'` (in the `dictionary` configuration)로 설정하면 Suspense에 의존하게 되므로 `useIntlayer` 호출을 `Suspense` 경계로 감싸야 합니다. 즉, Page / Layout 컴포넌트의 최상위 수준에서 `useIntlayer`를 직접 사용할 수 없습니다.

</Steps>

### Turbopack에서 딕셔너리 변경 사항 감시

Turbopack을 개발 서버로 사용하여 `next dev` 명령을 실행하는 경우, 사전(dictionary) 변경 사항은 기본적으로 자동으로 감지되지 않습니다.

이 제한은 Turbopack이 콘텐츠 파일의 변경을 모니터링하기 위해 webpack 플러그인을 병렬로 실행할 수 없기 때문에 발생합니다. 이를 해결하려면 개발 서버와 Intlayer 빌드 워처를 동시에 실행하기 위해 `intlayer watch` 명령을 사용해야 합니다.

```json5 fileName="package.json"
{
  // ... 기존 package.json 구성
  "scripts": {
    // ... 기존 scripts 구성
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> 만약 next-intlayer@<=6.x.x를 사용 중이라면, Next.js 16 애플리케이션이 Turbopack과 올바르게 작동하도록 `--turbopack` 플래그를 유지해야 합니다. 이 제한을 피하려면 next-intlayer@>=7.x.x 사용을 권장합니다.

### TypeScript 구성

Intlayer는 TypeScript의 이점을 얻고 코드베이스를 더욱 견고하게 만들기 위해 module augmentation을 사용합니다.

![자동완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 구성에 자동 생성된 타입들이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동으로 생성된 타입 포함
  ],
}
```

### Git 구성

Intlayer에 의해 생성된 파일을 무시하는 것을 권장합니다. 이렇게 하면 Git 저장소에 해당 파일들이 커밋되는 것을 방지할 수 있습니다.

이를 위해 다음 지침을 `.gitignore` 파일에 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에 의해 생성된 파일 무시
.intlayer
```

### VS Code 확장

Intlayer로 개발 환경을 개선하려면 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 기능은 다음을 제공합니다:

- **번역 키에 대한 자동 완성**.
- **누락된 번역에 대한 실시간 오류 감지**.
- **번역된 콘텐츠의 인라인 미리보기.**
- **빠른 작업(Quick actions)**을 통해 번역을 손쉽게 생성하고 업데이트할 수 있습니다.

자세한 사용 방법은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### 더 나아가기

더 나아가, [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용해 콘텐츠를 외부화할 수 있습니다.

## 자주 묻는 질문

<FAQ>

<Question title="Next.js 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

`next.config.js`의 `i18n` 필드는 App Router에 적용되지 않으므로 지역화 계층은 항상 라이브러리를 통해 선택해야 합니다:

- **`next-intl`**, **`next-i18next` / `i18next`** 및 **`react-intl`**: 네임스페이스별로 로드되는 JSON 또는 ICU 카탈로그 기반입니다.
- **`Lingui`**: 빌드 타임에 컴파일되는 ICU 메시지를 사용하는 추출 기반 솔루션입니다.
- **`Intlayer`**: 가장 진보된 솔루션입니다. 코드베이스 어디에나 콘텐츠를 선언할 수 있으며([각 컴포넌트 옆 또는 중앙 집중식](https://intlayer.org/ko/blog/per-component-vs-centralized-i18n)), 컴포넌트별로 컴파일되고, 완전한 타입 안전성을 제공하며 AI 번역, 비주얼 에디터 및 CMS를 포함합니다.

본 가이드는 경로에 로케일을 포함하지 않는 설정을 다룹니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)와 [Next.js i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)를 참조하세요.

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

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 컴포넌트를 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다.

완전 자동화된 파이프라인을 위해 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)는 빌드 타임에 JSX, TSX, Vue 및 Svelte 소스에서 동일한 작업을 수행하여 변경될 때마다 사전을 생성하고 HMR을 통해 동기화하므로 수동으로 키를 관리할 필요가 없습니다. 정적 분석으로 작동하므로 런타임에만 존재하는 문자열은 제외되며, 사용자 텍스트와 애플리케이션 로직을 구분하기 위해 몇 가지 주석이 필요합니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 사용하면 직접 검토하면서 이 두 가지 문제를 모두 피할 수 있습니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="URL에 로케일을 포함하지 않고 앱을 제공하는 이유는 무엇인가요?">

로케일이 항상 페이지 식별자의 일부일 필요는 없기 때문입니다. 인증된 대시보드, 내부 도구 또는 로그인 뒤에 있는 앱은 모든 URL에 `/ko/`를 노출할 이유가 없습니다: 언어는 문서 구분이 아닌 사용자 환경설정이기 때문입니다. 접두사를 제거하면 라우트, 링크 및 분석 지표를 단일 경로 세트로 깔끔하게 유지할 수 있습니다.

</Question>

<Question title="URL에 로케일이 없을 때의 SEO 영향은 무엇인가요?">

실제 영향이 있으므로 신중히 선택해야 합니다. 언어별 고유 URL이 없으면 검색 엔진이 각 로케일에 대해 별도의 페이지를 인덱싱할 수 없고, `hreflang`이 가리킬 대상이 없으며, 크롤러는 기본 감지 로직이 제공하는 언어만 보게 됩니다. 이는 어차피 인덱싱되지 않는 로그인 기반 콘텐츠에는 문제없지만, 공개 마케팅 사이트나 문서 사이트에는 적합하지 않습니다. 언어별 오가닉 검색 유입이 중요하다면 [Next.js 16 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)의 접두사 설정을 사용하세요.

</Question>

<Question title="no-prefix 모드와 search-params 모드의 차이점은 무엇인가요?">

`"no-prefix"`는 로케일을 URL에서 완전히 배제하고 쿠키, 헤더 또는 도메인에서 확인하므로 모든 언어가 단일 주소를 공유합니다. `"search-params"`는 `/dashboard?locale=ko`와 같이 쿼리 문자열에 로케일을 배치하여 라우트 트리를 변경하지 않고도 각 언어에 고유하고 링크 및 북마크가 가능한 URL을 제공합니다. 언어별로 공유 가능한 링크가 필요한 경우 `"search-params"`를 권장합니다.

</Question>

<Question title="그렇다면 로케일은 어떻게 감지되나요?">

`routing.storage`에 나열된 소스에서 감지되며, 기본적으로 쿠키를 먼저 확인한 다음 `Accept-Language` 헤더를 확인하고, 기본 로케일로 폴백됩니다. 7단계에서 이를 적용하는 프록시를 추가합니다. 사용자가 명시적으로 선택한 언어는 저장되어 다음 방문 시에도 유지됩니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="대신 각 언어를 자체 도메인에 매핑할 수 있나요?">

네, 외관상의 이유로 경로 접두사를 제거했지만 여전히 SEO를 유지하고 싶을 때 고려할 수 있는 최적의 옵션입니다. `routing.domains`는 로케일을 호스트 이름에 매핑하므로 도메인이 언어를 식별하며 경로에 접두사가 추가되지 않고, 모든 언어가 `hreflang`이 가리킬 수 있는 인덱싱 가능한 고유 URL을 갖게 됩니다.

</Question>

<Question title="AI를 사용하여 앱을 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 누락된 번역을 채워주며, `--git-diff`를 사용하면 브랜치에서 변경된 콘텐츠로 번역 범위를 제한할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

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
