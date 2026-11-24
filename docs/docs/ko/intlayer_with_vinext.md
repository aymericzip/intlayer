---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Vite 위에서 Next.js 앱을 번역하는 완벽 가이드"
description: "Vite 위의 Next.js API인 vinext에 Intlayer를 설정하세요. proxy.ts 로케일 라우팅, Server 및 Client Components, 현지화된 메타데이터, 사이트맵, Cloudflare Workers 배포까지 다룹니다."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "최초 기록"
author: aymericzip
---

# Intlayer로 vinext 웹사이트 번역하기

[vinext](https://github.com/cloudflare/vinext)는 Next.js API를 Vite 위에서 다시 구현합니다. `app/` 디렉터리, `next/*` import, `proxy.ts`는 그대로 동작하지만, 빌드는 Turbopack이나 webpack 대신 Vite로 실행됩니다.

Intlayer는 두 개의 패키지로 이 구성에 연결됩니다. Next.js에서 컴포넌트가 이미 사용하는 훅, 프로바이더, 프록시를 제공하는 `next-intlayer`, 그리고 빌드 쪽(딕셔너리 컴파일, 감시, 번들 최적화)을 담당하는 `vite-intlayer`입니다.

> 자체 툴체인으로 Next.js를 실행하고 계신가요? 대신 [Next.js 16 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)를 따르세요.

- [Next.js 16 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)

## 목차

<TOC/>

## 왜 다른 대안이 아니라 Intlayer인가요?

`next-intl`이나 `i18next` 같은 솔루션과 비교해, Intlayer는 최적화가 내장되어 있습니다.

<AccordionGroup>
<Accordion header="Vite 위의 Next.js API를 위해 설계되었습니다">

동일한 `next-intlayer` 코드가 Next.js와 vinext에서 모두 동작합니다. Server Components는 서버에서 콘텐츠를 해석하고, Client Components는 프로바이더를 통해 읽으며, 로케일 라우팅은 `proxy.ts`에서 실행됩니다. 두 툴체인 사이를 옮겨도 컴포넌트는 수정할 필요가 없습니다.

</Accordion>
<Accordion header="번들 크기">

거대한 JSON 파일을 페이지에 불러오는 대신 필요한 콘텐츠만 불러옵니다. Vite 플러그인이 각 `useIntlayer` 호출을 컴포넌트가 실제로 사용하는 항목으로 바꿔 주므로 **번들과 페이지 크기를 최대 50% 줄일 수 있습니다**.

</Accordion>
<Accordion header="유지보수성">

콘텐츠를 컴포넌트 단위로 구성하면 대규모 애플리케이션의 **유지보수가 쉬워집니다**. 전체 콘텐츠 코드베이스를 검토하지 않고도 기능 폴더를 복제하거나 삭제할 수 있고, Intlayer는 **완전한 타입**을 지원해 콘텐츠를 정확하게 유지합니다.

</Accordion>
<Accordion header="AI 에이전트">

콘텐츠를 가까이에 두면 LLM에 필요한 **컨텍스트가 줄어듭니다**. Intlayer는 누락된 번역을 검사하는 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**, **[에이전트 스킬](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**을 제공합니다.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)
- [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)
- [에이전트 스킬](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)

</Accordion>
<Accordion header="자동화">

원하는 LLM을 사용해 CI/CD 파이프라인에서 번역하세요. 비용은 AI 제공업체에 직접 지불합니다. Intlayer는 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**하는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)도 제공합니다.

- [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

</Accordion>
<Accordion header="비개발자와 함께 확장하기">

Intlayer는 **셀프 호스팅 가능한 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[완전한 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공하여 번역가, 카피라이터와 **실시간**으로 다국어 콘텐츠를 관리할 수 있습니다. 콘텐츠는 로컬 및/또는 원격에 저장할 수 있습니다.

- [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
- [완전한 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## vinext 애플리케이션에 Intlayer를 설정하는 단계별 가이드

<Steps>
<Step number={1} title="의존성 설치">

동작하는 vinext 프로젝트에서 시작하세요. 새로 만들려면 `npm create vinext-app@latest`를 실행하세요. 기존 Next.js 앱을 마이그레이션하려면 `npx vinext init`을 실행하세요.

그런 다음 Intlayer를 설치하세요.

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일, [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md) 등 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

  Next.js API용 프로바이더, 훅, 프록시를 제공합니다. vinext는 `next/navigation`, `next/headers`, `next/server`를 자체 구현으로 연결하므로 `next-intlayer`는 수정 없이 동작합니다.

- **vite-intlayer**

  콘텐츠 선언을 빌드하고, 개발 중에 감시하며, 프로덕션 번들에서 딕셔너리를 최적화하는 Vite 플러그인입니다. vinext가 실행하지 않는 Next.js 플러그인 `withIntlayer()`를 대신합니다.

</Step>
<Step number={2} title="프로젝트 설정">

애플리케이션이 현지화된 URL 경로(예: `/en/about`, `/fr/about`)를 사용할지, 경로에 로케일 세그먼트 없이 콘텐츠를 제공할지(예: `/about`, 쿠키, 헤더 또는 쿼리 매개변수로 로케일 감지) 선택하세요.

<Tabs group="routing-mode">
<Tab label="로케일 경로 사용" value="with-locale-path">

### 아키텍처

현지화된 모든 페이지는 동적 세그먼트 `[locale]` 아래에 중첩됩니다. 각 언어가 고유한 URL을 가지므로 SEO와 정적 렌더링에 권장됩니다.

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
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### 설정

지원하는 언어를 선언하려면 `intlayer.config.ts` 파일을 만드세요.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="로케일 경로 없음" value="without-locale-path">

### 아키텍처

라우트에 `[locale]` 세그먼트가 없습니다. 모든 페이지는 `src/app/` 바로 아래에 있고, 로케일은 쿠키, 헤더 또는 쿼리 매개변수에서 가져옵니다. 대시보드나 인증이 필요한 앱에 적합합니다.

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### 설정

`routing.mode`를 `"search-params"`(예: `/about?locale=fr`) 또는 `"no-prefix"`로 설정하세요.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> 이 파일에서는 프록시 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치와 확장자, 로그 등도 설정합니다. 전체 목록은 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참고하세요.

- [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

</Step>
<Step number={3} title="Vite 설정에 Intlayer 통합">

`vite.config.ts`에서 `vinext()` 옆에 `intlayer()` 플러그인을 추가하세요.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> `intlayer()` 플러그인은 빌드가 시작되기 전에 딕셔너리를 빌드하고, 개발 중에 콘텐츠 파일을 감시하며, RSC, SSR, 클라이언트 환경에서 `next-intlayer`가 사용하는 별칭과 최적화를 설정합니다.

> `intlayer()`는 Vite 개발 서버용 로케일 라우팅 미들웨어도 제공합니다. vinext에서는 `src/proxy.ts`가 개발 환경과 프로덕션 런타임 모두에서 이미 그 역할을 하므로, `ignore` 옵션으로 Vite 쪽을 꺼서 모든 요청이 두 번 라우팅되지 않도록 합니다.

> `next.config.ts`에 `withIntlayer()`를 넣지 마세요. vinext는 `redirects`, `rewrites`, `headers` 같은 옵션을 위해 `next.config.ts`를 읽지만 webpack이나 Turbopack 플러그인은 실행하지 않습니다.

Cloudflare Workers에 배포한다면 `vinext init`이 생성한 `cloudflare()` 플러그인을 그대로 두세요.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="동적 로케일 라우트 정의">

<Tabs group="routing-mode">
<Tab label="로케일 경로 사용" value="with-locale-path">

`RootLayout`의 내용을 모두 지우고 다음 코드로 바꾸세요.

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> `RootLayout`을 비워 두면 로케일 레이아웃이 `<html>` 태그의 [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) 및 [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) 속성을 설정할 수 있습니다.

`[locale]` 디렉터리에 레이아웃을 추가하세요.

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> 하나의 `IntlayerProvider`가 트리의 양쪽을 모두 담당합니다. Server Components에 로케일을 제공하고 클라이언트 프로바이더를 마운트하여 Client Components도 같은 로케일을 받습니다.

> `[locale]` 세그먼트가 로케일을 담습니다. `/en-US/about`은 `en-US`로, `/fr/about`은 `fr`로 해석됩니다. 이전의 `src/app/page.tsx`는 더 이상 사용되지 않으므로 삭제해도 됩니다. 프록시(7단계)가 루트에서 기본 로케일을 제공합니다.

> `generateStaticParams`는 vinext가 각 로케일마다 모든 페이지를 프리렌더링하도록 합니다. vinext는 `dynamicParams`도 적용하므로 `export const dynamicParams = false`를 설정하면 알 수 없는 로케일은 404를 반환합니다.

</Tab>
<Tab label="로케일 경로 없음" value="without-locale-path">

`[locale]` 디렉터리가 없습니다. 요청에서 로케일을 읽고 애플리케이션을 `IntlayerProvider`로 감싸도록 `src/app/layout.tsx`를 설정하세요.

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

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

</Tab>
</Tabs>

</Step>
<Step number={5} title="콘텐츠 선언">

번역을 저장할 콘텐츠 선언을 만드세요.

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ko: "편집을 시작하세요",
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
      "main": {
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
}
```

> 콘텐츠 선언은 콘텐츠 선언 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치하기만 하면 `contentDir` 디렉터리(기본값 `./src`) 안 어디에나 둘 수 있습니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참고하세요.

- [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)

</Step>
<Step number={6} title="코드에서 콘텐츠 사용">

어떤 컴포넌트에서든 딕셔너리에 접근할 수 있습니다.

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

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
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer`는 아이소모픽입니다. vinext가 RSC 환경에 적용하는 `react-server` export 조건 덕분에 Server Components는 서버 구현을, Client Components는 컨텍스트 기반 구현을 사용합니다. 동일한 호출이 양쪽에서 동작합니다.

> `alt`, `title`, `href`, `aria-label` 같은 `string` 속성에서 콘텐츠를 사용하려면 값을 읽으세요.
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 자세한 내용은 [`useIntlayer` 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)를 참고하세요.

- [`useIntlayer` 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)

> 이미 앱이 있다면 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)와 [extract 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)가 수천 개의 컴포넌트를 1초 만에 변환합니다.

- [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)
- [extract 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)

</Step>
<Step number={7} title="로케일 감지를 위한 프록시 설정">

vinext는 Next.js 16과 마찬가지로 개발과 프로덕션, Cloudflare Workers에서도 `proxy.ts`(및 `middleware.ts`)를 실행합니다. Intlayer 프록시를 export하세요.

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy`는 사용자의 선호 로케일을 감지하고, [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 따라 해당 URL로 리디렉션하며, 로케일을 쿠키에 저장합니다. 또한 로케일을 `getLocale()`과 서버 훅에 전달하므로, 로케일 경로 없는 아키텍처에서도 유지하세요.

- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

> 여러 프록시를 연결하려면(예: `intlayerProxy`와 인증) `multipleProxies`를 사용하세요.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="메타데이터 국제화" isOptional={true}>

vinext는 Metadata API를 지원합니다. `generateMetadata`와 `getIntlayer`를 사용해 페이지 메타데이터를 번역하세요.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      ko: "내 vinext 앱",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      ko: "Vite에서 실행되는 Next.js 앱",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
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
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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

// ... Rest of the code
````

> `intlayer`에서 import한 `getIntlayer` 함수는 메타데이터 객체에 바로 쓸 수 있는 원시 값을 반환합니다. `next-intlayer`의 함수는 비주얼 에디터를 위해 값을 감쌉니다.

</Step>
<Step number={9} title="sitemap.xml과 robots.txt 국제화" isOptional={true}>

`sitemap.ts`와 `robots.ts`는 Next.js와 동일하게 동작합니다. `getMultilingualUrls`로 현지화된 모든 URL을 나열하세요.

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
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

</Step>
<Step number={10} title="콘텐츠 언어 변경" isOptional={true}>

현지화된 페이지로 이동하려면 `next/link`를 사용하세요. vinext는 클라이언트 측 네비게이션과 프리페칭을 유지하므로 전체 새로고침 없이 전환됩니다.

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
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> 문서 참고 자료:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` 함수](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 함수](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 함수](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="현지화된 Link 컴포넌트 만들기" isOptional={true}>

커스텀 `Link` 컴포넌트는 내부 URL 앞에 현재 로케일을 붙여, 프랑스어 사용자가 `/about`을 클릭하면 `/fr/about`으로 이동하게 합니다.

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Server Actions에서 현재 로케일 가져오기" isOptional={true}>

Server Action 안에서 `next-intlayer/server`의 `getLocale`을 호출하세요.

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale`은 프록시가 요청 헤더에 설정한 로케일을 먼저 읽고, 그다음 로케일 쿠키, 그다음 브라우저의 `Accept-Language` 헤더를 읽으며, 마지막으로 기본 로케일로 대체합니다.

</Step>
<Step number={13} title="Cloudflare Workers에 배포" isOptional={true}>

Intlayer는 빌드 시점에 딕셔너리를 번들로 컴파일하므로 런타임에 파일 시스템을 읽는 것이 없고, 앱은 workerd에서 그대로 실행됩니다. vinext CLI로 빌드하고 배포하세요.

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> 다른 곳(Vercel, Netlify, AWS, Node.js)에 배포하려면 `vinext()` 옆에 [Nitro](https://v3.nitro.build/) Vite 플러그인을 추가하거나 `next.config.ts`에 `output: "standalone"`을 설정하세요. Intlayer 설정은 달라지지 않습니다.

</Step>
<Step number={14} title="컴포넌트에서 콘텐츠 추출" isOptional={true}>

기존 코드베이스에서는 Intlayer의 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)와 [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)로 하드코딩된 문자열을 콘텐츠 선언으로 옮길 수 있습니다.

- [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)
- [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)

`intlayer.config.ts`에서 컴파일러를 활성화하세요.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

추출기를 실행해 컴포넌트를 변환하고 콘텐츠를 추출하세요.

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
 <Tab value='Vite compiler'>

`intlayer()` Vite 플러그인에는 컴파일러가 포함되어 있습니다. `compiler.enabled`를 설정한 뒤에는 평소처럼 개발 서버나 빌드를 실행하세요.

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### TypeScript 설정

Intlayer는 모듈 확장(module augmentation)을 사용해 콘텐츠 키와 값에 타입을 지정합니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

생성된 타입을 TypeScript 설정에 포함하세요.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git 설정

Intlayer가 생성한 파일을 무시하세요.

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code 확장 프로그램

공식 **[Intlayer VS Code 확장 프로그램](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)**을 설치하면 키 자동 완성, 누락된 번역 오류, 인라인 미리보기, 빠른 작업을 사용할 수 있습니다. [확장 프로그램 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)를 참고하세요.

- [확장 프로그램 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)

### 더 알아보기

[비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 추가하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)로 콘텐츠를 외부로 분리하세요.

- [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)

## 자주 묻는 질문

<FAQ>

<Question title="vinext란 무엇인가요?">

vinext는 Cloudflare가 관리하는 오픈 소스 Vite 플러그인으로, Next.js의 공개 API(App Router와 Pages Router, React Server Components, Server Actions, `proxy.ts`, 라우트 핸들러, `next/*` 모듈)를 다시 구현합니다. Next.js 코드는 Vite에서 실행되며 Cloudflare Workers에 네이티브로 배포하거나 Nitro를 통해 다른 플랫폼에 배포할 수 있습니다.

</Question>
<Question title="Next.js 설정과 비교해 무엇이 달라지나요?">

빌드 통합만 달라집니다. Next.js에서는 `withIntlayer()`가 `next.config.ts`를 감쌉니다. vinext에서는 대신 `vite-intlayer`의 `intlayer()` 플러그인을 `vite.config.ts`에 넣습니다. 프로바이더, 훅, `proxy.ts`, 메타데이터, 사이트맵 코드는 동일하므로 이 페이지에서 다루지 않는 내용은 [Next.js 16 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)를 따르세요.

- [Next.js 16 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)

</Question>
<Question title="Next.js i18n 설정이나 SWC 플러그인이 필요한가요?">

아니요. `next.config.ts`의 `i18n` 필드는 vinext에서 Pages Router의 로케일 접두사만 다루며, Intlayer는 `proxy.ts`로 자체 라우팅을 수행합니다. `@intlayer/swc` 플러그인도 필요하지 않습니다. Vite 플러그인이 이미 `useIntlayer` 호출을 바꿔 주므로 각 페이지는 사용하는 딕셔너리만 전달합니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참고하세요.

- [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)

</Question>
<Question title="개발 중에 `intlayer watch`가 필요한가요?">

아니요. `intlayer()` Vite 플러그인이 `vite dev`와 함께 콘텐츠 워처를 시작하며, 콘텐츠를 수정하면 변경된 딕셔너리를 읽는 컴포넌트만 핫 업데이트됩니다.

</Question>
<Question title="컴포넌트를 다시 작성하지 않고 `next-intl`이나 `i18next`에서 마이그레이션할 수 있나요?">

네. [next-intl 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md) 또는 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 따르거나, Intlayer 딕셔너리로 동작하는 `next-intl`, `react-i18next`, `react-intl` API를 제공하는 [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)로 기존 API를 유지할 수 있습니다.

- [next-intl 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md)
- [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)
- [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)

</Question>
<Question title="/fr/about처럼 URL에 로케일을 넣어야 하나요?">

아니요. `routing.mode`는 다음 값을 받습니다.

- `"prefix-no-default"`(기본값): 기본 로케일은 `/about`, 나머지는 `/fr/about`.
- `"prefix-all"`: 모든 로케일에 접두사가 붙습니다(`/en/about`, `/fr/about`).
- `"no-prefix"`: 경로에 로케일이 없으며 쿠키나 헤더로 결정됩니다.
- `"search-params"`: `/about?locale=fr`.

[설정 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)와 2단계의 로케일 경로 없는 아키텍처를 참고하세요.

- [설정 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

</Question>
<Question title="AI로 앱을 자동 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. CLI가 누락된 번역을 감지하고, 직접 선택한 제공업체와 API 키로 원하는 LLM을 사용해 채웁니다. [fill 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md)와 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참고하세요.

- [fill 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md)
- [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)

</Question>
<Question title="배포 전에 누락된 번역을 어떻게 찾나요?">

CI에서 `npx intlayer test`를 실행하세요. 선언된 로케일에 콘텐츠가 없으면 빌드가 실패합니다. [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)은 입력하는 동안 같은 오류를 보여 주고, [ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)은 하드코딩된 문자열을 표시합니다.

- [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)
- [ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)

</Question>
<Question title="Intlayer는 무료이고 오픈 소스인가요?">

네. Intlayer는 Apache 2.0 라이선스의 오픈 소스이며, 라이브러리, CLI, 비주얼 에디터, 컴파일러는 상업적 용도를 포함해 무료로 사용할 수 있습니다. 호스팅형 CMS는 선택적인 유료 서비스이며, [셀프 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

- [셀프 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)

</Question>

</FAQ>
