---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "TanStack Start i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) TanStack Start 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - 로케일 라우팅
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "라우트 head 함수에서 메타데이터 사전의 정적·동적·캐시된 동적 해석 비교"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 7.4.0
    date: 2025-12-11
    changes: "validatePrefix를 도입하고 14단계: 현지화된 경로로 404 페이지 처리하기 추가."
  - version: 7.3.9
    date: 2025-12-05
    changes: "13단계: 서버 액션에서 로케일 가져오기(선택 사항) 추가."
  - version: 7.2.3
    date: 2025-11-18
    changes: "13단계: Nitro 적응 추가."
  - version: 7.1.0
    date: 2025-11-17
    changes: "getPrefix 함수를 추가하여 기본 접두사 수정, useLocalizedNavigate, LocaleSwitcher 및 LocalizedLink 사용."
  - version: 6.5.2
    date: 2025-10-03
    changes: "문서 업데이트"
  - version: 5.8.1
    date: 2025-09-09
    changes: "TanStack Start용으로 추가됨"
author: aymericzip
---

# Intlayer를 사용하여 TanStack Start 웹사이트 번역하기 | 국제화(i18n)

## 목차

<TOC/>

이 가이드는 로케일 인식 라우팅, TypeScript 지원 및 최신 개발 방식을 사용하여 TanStack Start 프로젝트에서 원활한 국제화를 위해 **Intlayer**를 통합하는 방법을 보여줍니다.

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'react-i18next', 'use-intl' 또는 'paraglide'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>

<Accordion header="전체 TanStack 시작 범위">

Intlayer는 TanStack Start에 완전히 최적화되어 **다국어 라우팅**, **쿠키 관리**, **사이트맵 생성**, **동적 콘텐츠 로딩** 및 국제화(i18n) 노력을 확장하는 데 필요한 모든 기능을 제공합니다.

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

## TanStack Start 애플리케이션에서 Intlayer를 설정하기 위한 단계별 가이드

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">

<iframe title="TanStack Start를 위한 최고의 i18n 솔루션? Intlayer를 만나보세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-tanstack-start-template)을 참조하세요.

<Steps>

<Step number={1} title="프로젝트 생성">

먼저 TanStack Start 웹사이트의 [새 프로젝트 시작하기](https://tanstack.com/start/latest/docs/framework/react/quick-start) 가이드에 따라 새 TanStack Start 프로젝트를 생성합니다.

</Step>

<Step number={2} title="Intlayer 패키지 설치">

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 기본 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

</Step>

<Step number={3} title="프로젝트 구성">

애플리케이션의 언어를 구성하기 위한 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등을 수행할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={4} title="Vite 구성에 Intlayer 통합">

구성에 intlayer 플러그인을 추가합니다:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 감시합니다. Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭을 제공합니다.

</Step>

<Step number={5} title="루트 레이아웃 생성">

`useParams`를 사용하여 현재 로케일을 감지하고 `html` 태그에 `lang` 및 `dir` 속성을 설정하여 국제화를 지원하도록 루트 레이아웃을 구성합니다.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>

<Step number={6} title="로케일 레이아웃 생성">

로케일 접두사를 처리하고 유효성 검사를 수행하는 레이아웃을 생성합니다.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // 로케일 접두사 유효성 검사
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> 여기서 `{-$locale}`은 현재 로케일로 대체되는 동적 라우트 매개변수입니다. 이 표기법은 슬롯을 선택 사항으로 만들어 `'prefix-no-default'` 등의 라우팅 모드와 함께 작동할 수 있게 합니다.

> 동일한 라우트에서 여러 동적 세그먼트를 사용하는 경우(예: `/{-$locale}/other-path/$anotherDynamicPath/...`) 이 슬롯이 문제를 일으킬 수 있습니다.
> `'prefix-all'` 모드의 경우 슬롯을 `$locale`로 바꾸는 것이 좋습니다.
> `'no-prefix'` 또는 `'search-params'` 모드의 경우 슬롯을 완전히 제거할 수 있습니다.

</Step>

<Step number={7} title="콘텐츠 선언">

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값: `./app`)에 포함되는 한 애플리케이션 어디에서나 정의할 수 있습니다. 그리고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={8} title="로케일 인식 컴포넌트 및 훅 생성">

로케일 인식 내비게이션을 위한 `LocalizedLink` 컴포넌트를 생성합니다:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

이 컴포넌트에는 두 가지 목적이 있습니다:

- URL에서 불필요한 `{-$locale}` 접두사를 제거합니다.
- URL에 로케일 매개변수를 주입하여 사용자가 현지화된 경로로 직접 리디렉션되도록 보장합니다.

그런 다음 프로그래밍 방식 내비게이션을 위해 `useLocalizedNavigate` 훅을 생성할 수 있습니다:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="페이지에서 Intlayer 활용하기">

> 컴포넌트 안에서는 기본적으로 **`useIntlayer`** 를 사용하세요. 컴파일러가 렌더링되는 로케일로 해석해 주므로 이것이 권장 방식입니다. `getIntlayer` / `getIntlayerAsync` 는 React 트리 바깥(라우트 `head`, 로더, 서버 함수)에서만 사용하세요.

애플리케이션 전반에서 콘텐츠 사전에 액세스합니다:

#### 로컬라이즈된 홈페이지

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> 콘텐츠를 `alt`, `title`, `href`, `aria-label` 등의 `string` 속성에서 사용하려면 함수의 값을 다음과 같이 사용할 수 있습니다:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` hook에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

</Step>

<Step number={9} title="로케일 전환 컴포넌트 만들기">

사용자가 언어를 변경할 수 있는 컴포넌트를 만듭니다:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeEl}
            </span>
            <span>
              {/* 해당 언어의 로케일 - 예: Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* 현재 로케일의 언어 - 예: 현재 로케일이 Locales.SPANISH인 경우 Francés */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어의 언어 - 예: French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` hook에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

</Step>

<Step number={10} title="HTML 속성 관리">

Step 5에서 본 것처럼 루트 컴포넌트에서 `useParams`를 사용하여 `html` 태그의 `lang`과 `dir` 속성을 관리할 수 있습니다. 이렇게 하면 서버와 클라이언트에서 올바른 속성이 설정됩니다.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="미들웨어 추가">

또한 `intlayerProxy`를 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않으면 플러그인이 사용자의 브라우저 언어 설정을 기반으로 가장 적절한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리다이렉트됩니다.

> `intlayerProxy`를 프로덕션에서 사용하려면 `vite-intlayer` 패키지를 `devDependencies`에서 `dependencies`로 변경해야 합니다.

> Intlayer v9 이상에서는 `intlayerProxy()`가 `intlayer()` 플러그인에 직접 번들되며 `routing.enableProxy` 옵션을 통해 기본값으로 활성화됩니다(기본값: `true`). 아래와 같이 별도로 등록하는 것은 선택사항이 되었습니다: 하위 호환성과 플러그인 순서를 제어해야 하는 설정을 위해 유지됩니다. `routing.enableProxy: false`로 설정하여 거부할 수 있습니다. [v9 릴리스 노트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/releases/v9.md)를 참조하세요.

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="메타데이터 국제화">

<Tabs>

<Tab label="정적 해석" value="static">

`getIntlayer`는 **병합된** 사전에 대해 동기적으로 해석되며, 이는 선언된 모든 로케일을 포함합니다. `head`는 동기로 유지되며 아무것도 대기하지 않지만, 전체 다국어 사전이 브라우저로 전송되는 라우트 청크로 끌어옵니다.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // 이 라우트의 경로

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // 정준 링크: 현재 로컬라이즈된 페이지를 가리킵니다
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Google에 모든 로컬라이즈된 버전을 알립니다
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: 일치하지 않는 언어를 사용하는 사용자를 위해
        // 기본 폴백 로케일 정의 (보통 주요 언어)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

작은 메타데이터 사전, 몇 가지 로케일 또는 프로토타이핑 중에 가장 적합합니다.

</Tab>

<Tab label="동적 해석" value="dynamic">

`getIntlayerAsync` (**v9.4**부터 사용 가능)는 `getIntlayer`처럼 동작하지만, 빌드 플러그인이 병합된 사전 대신 `.intlayer/dynamic_dictionaries/`의 로케일별 청크를 가리킵니다. 따라서 페이지는 렌더링되는 로케일만 제공합니다. 해당 청크가 온디맨드로 로드되므로 `head`는 `async`가 됩니다:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // 이 라우트의 경로

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // 정준 링크: 현재 로컬라이즈된 페이지를 가리킵니다
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Google에 모든 로컬라이즈된 버전을 알립니다
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: 일치하지 않는 언어를 사용하는 사용자를 위해
        // 기본 폴백 로케일 정의 (보통 주요 언어)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> `head`가 여러 사전을 읽으면 `Promise.all`로 해석합니다: 각 `getIntlayerAsync`를 자신의 라인에서 대기하면 요청을 순차적으로 연결하는 대신 병렬로 실행합니다.

트레이드오프: 동적 import는 `head` 실행 중에, 문서 렌더링의 중요 경로에서 해석됩니다. 콜드 라우트에서 이는 head를 몇 밀리초 지연시킬 수 있고 **LCP**를 약간 저하시킬 수 있습니다.

</Tab>

<Tab label="캐시된 동적 해석" value="cached">

라우트 `loader`에서 사전을 해석하고 `head`의 `loaderData`에서 다시 읽습니다. 일치하는 라우트의 로더는 병렬로 실행되고, `staleTime: Infinity`는 TanStack Router에 결과가 절대 만료되지 않음을 알려주므로 로케일별 청크가 한 번 해석되고 이후 라우터 캐시에서 제공되어 `head`를 동기로 유지합니다.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // 다른 일치하는 라우트와 병렬로 해석되며, head 중요 경로 밖에서
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // 주어진 로케일에 대해 사전이 변경되지 않음: 청크를 한 번 해석
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // 이 라우트의 경로

    return {
      links: [
        // 정준 링크: 현재 로컬라이즈된 페이지를 가리킵니다
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Google에 모든 로컬라이즈된 버전을 알립니다
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: 일치하지 않는 언어를 사용하는 사용자를 위해
        // 기본 폴백 로케일 정의 (보통 주요 언어)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head`는 로더가 정착되기 전에 호출될 수 있으므로 `loaderData`는 `undefined`일 수 있도록 입력됩니다. 선택적 체이닝을 유지하거나 폴백 제목을 반환하세요.

로케일별 청크를 유지하면서 head 중요 경로에서 비용을 지불하지 않습니다. 대가는 개발자 경험입니다: 콘텐츠는 `loaderData`를 통해 로더에서 `head`로 명시적으로 스레드화되어야 합니다.

</Tab>

</Tabs>

### 어떤 해결 방법을 선택해야 할까요?

|                      | Static resolution     | Dynamic resolution         | Cached dynamic resolution              |
| -------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                  | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| `head` signature     | synchronous           | `async`                    | synchronous, reads `loaderData`        |
| Locales shipped      | every declared locale | requested locale only      | requested locale only                  |
| Client navigations   | nothing to resolve    | re-entered on every match  | served from the router cache           |
| Developer experience | simplest              | one `await`                | content threaded through `loaderData`  |

---

</Step>

<Step number={13} title="서버 액션에서 로케일 검색">

서버 액션이나 API 엔드포인트 내에서 현재 로케일에 액세스하고 싶을 수 있습니다.
`intlayer`의 `getLocale` 헬퍼를 사용하여 이를 수행할 수 있습니다.

TanStack Start의 서버 함수를 사용한 예시입니다:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // 요청에서 쿠키 가져오기 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // 요청에서 헤더 가져오기 (기본값: 'x-intlayer-locale')
    // Accept-Language 협상을 사용한 폴백
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayerAsync()를 사용하여 일부 컨텐츠 검색
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="찾을 수 없음 페이지 관리">

사용자가 존재하지 않는 페이지를 방문할 때, 사용자 정의 찾을 수 없음 페이지를 표시할 수 있으며 로케일 접두사는 찾을 수 없음 페이지가 트리거되는 방식에 영향을 줄 수 있습니다.

#### 현지화된 홈 페이지

> `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면 함수의 값을 다음과 같이 사용할 수 있습니다:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

</Step>

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeEl}
            </span>
            <span>
              {/* 자체 로케일에서의 언어 - 예: Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* 현재 로케일에서의 언어 - 예: 현재 로케일이 Locales.SPANISH일 때 Francés */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 - 예: French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocale` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

</Step>

<Step number={11} title="HTML 속성 관리">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> `head` 는 로더가 완료되기 전에 호출될 수 있어 `loaderData` 는 `undefined` 가능 타입입니다. 옵셔널 체이닝을 유지하거나 대체 제목을 반환하세요.

로케일별 청크의 이점을 유지하면서 그 비용을 `head` 임계 경로에서 지불하지 않습니다. 대가는 DX 입니다. 콘텐츠를 로더에서 `head` 로 `loaderData` 를 통해 명시적으로 전달해야 합니다.

</Tab>

</Tabs>

### 어떤 해석 방식을 선택해야 할까요?

|                       | 정적 해석          | 동적 해석                  | 캐시된 동적 해석                         |
| --------------------- | ------------------ | -------------------------- | ---------------------------------------- |
| API                   | `getIntlayer`      | `getIntlayerAsync` (v9.4+) | `loader` 안의 `getIntlayerAsync` (v9.4+) |
| `head` 시그니처       | 동기               | `async`                    | 동기, `loaderData` 를 읽음               |
| 전송되는 로케일       | 선언된 모든 로케일 | 요청된 로케일만            | 요청된 로케일만                          |
| 클라이언트 내비게이션 | 해석할 것 없음     | 매칭될 때마다 다시 실행    | 라우터 캐시에서 제공                     |
| DX                    | 가장 단순함        | `await` 하나               | 콘텐츠를 `loaderData` 로 전달            |

---

</Step>

<Step number={13} title="서버 액션에서 로케일 가져오기(선택 사항)" isOptional={true}>

서버 액션 또는 API 엔드포인트 내부에서 현재 로케일에 액세스하고 싶을 수 있습니다.
이는 `intlayer`의 `getLocale` 도우미를 사용하여 수행할 수 있습니다.

다음은 TanStack Start의 서버 함수를 사용한 예입니다:

```tsx fileName="src/routes/{-$locale}/index.tsx"
      return getCookie(name, cookieString);
    },
    // 요청에서 헤더 가져오기(기본값: 'x-intlayer-locale')
    // Accept-Language 협상을 사용한 폴백
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer()를 사용하여 일부 콘텐츠 가져오기
  const content = getIntlayer("app", locale);

````

---

</Step>

<Step number={14} title="찾을 수 없는 페이지 관리(선택 사항)" isOptional={true}>

사용자가 존재하지 않는 페이지를 방문할 때 맞춤형 찾을 수 없음 페이지를 표시할 수 있으며, 로케일 접두사가 찾을 수 없음 페이지가 트리거되는 방식에 영향을 줄 수 있습니다.

#### 로케일 접두사를 사용한 TanStack Router의 404 처리 이해

TanStack Router에서 현지화된 경로로 404 페이지를 처리하려면 다층적인 접근 방식이 필요합니다:

1. **전용 404 경로**: 404 UI를 표시하기 위한 특정 경로
2. **경로 수준 유효성 검사**: 로케일 접두사의 유효성을 검사하고 유효하지 않은 경우 404로 리디렉션
3. **Catch-all 경로**: 로케일 세그먼트 내에서 일치하지 않는 모든 경로를 캡처

```tsx fileName="src/routes/{-$locale}/404.tsx"

```

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"

```

</Step>

<Step number={15} title="컴포넌트에서 콘텐츠 추출(선택 사항)" isOptional={true}>

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 많이 걸릴 수 있습니다.

이 프로세스를 용이하게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하기 위한 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

    /**
     * 변환 후 컴포넌트를 저장할지 여부를 나타냅니다. 그렇게 하면 컴파일러를 한 번만 실행하여 앱을 변환한 다음 제거할 수 있습니다.
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
 <Tab value='추출 명령'>

컴포넌트를 변환하고 콘텐츠를 추출하기 위해 추출기를 실행합니다

```bash packageManager="npm"

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

</Tab>
</Tabs>

---

I'm ready to audit the translation. However, I notice that both the reference English block (BLOCK 2 of 3) and the current Korean block (BLOCK 2 of 3) appear to be empty based on what you've provided.

Could you please provide:

1. **The English (en) source content** - the reference material I should audit against
2. **The current Korean (ko) translation** - the content that needs to be reviewed and updated

Once you provide these blocks with the `` and `` delimiters, I'll proceed with the audit and return the fully updated Korean translation.---

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... 기타 플러그인
    tanstackStart({
      // ... 기타 구성
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

그런 다음, `generateSitemap` 함수를 사용하는 `src/routes/sitemap[.]xml.ts` 경로를 생성합니다.

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

Once you provide the full content for both blocks, I'll be able to audit the Korean translation against the English source and make it fully up-to-date according to all the instructions you've specified.

<Step number={17} title="TypeScript 구성">

I'm ready to assist you with the translation audit. However, I notice that the blocks appear to be empty in your message.

Could you please provide:

1. **BLOCK 3 of 3** (en - English source) - the reference content to audit against
2. **Current translation** (ko - Korean) - the content that needs to be reviewed and updated

Once you provide these blocks with the content between `` and ``, I'll perform a thorough audit and return the fully updated Korean translation.---

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
{
  // ... 기존 구성
  include: [
    // ... 기존 포함 항목
    ".intlayer/**/*.ts", // 자동 생성된 유형 포함
  ],
}

### Git 구성

Intlayer에서 생성한 파일을 무시하는 것이 좋습니다. 이렇게 하면 Git 저장소에 커밋하는 것을 피할 수 있습니다.

이렇게 하려면 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성한 파일 무시
.intlayer
````

---

## VS Code 확장 프로그램

Intlayer로 개발 경험을 개선하기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- **자동완성** - 번역 키에 대한 자동완성
- **실시간 오류 감지** - 누락된 번역에 대한 오류 감지
- **인라인 미리보기** - 번역된 콘텐츠의 인라인 미리보기
- **빠른 작업** - 번역을 쉽게 생성하고 업데이트할 수 있는 빠른 작업

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

## 더 나아가기

더 나아가려면 [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 참고

- [Intlayer 문서](https://intlayer.org)
- [Tanstack Start 문서](https://tanstack.com/start)
- [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)
- [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
- [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)
- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

## 자주 묻는 질문

<FAQ>

<Question title="TanStack Start 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

TanStack Start는 자체 i18n 레이어를 제공하지 않으므로 라이브러리를 선택해야 합니다:

- **`i18next` / `react-i18next`** 및 **`react-intl`**: 프레임워크에 구애받지 않는 메시지 카탈로그로, 라우터에 수동으로 연결해야 합니다.
- **`Lingui`**: 컴파일 단계를 거치는 ICU 메시지 포맷 기반입니다.
- **`Paraglide`**: 메시지 계층에만 초점을 맞춘 컴파일된 메시지 라이브러리입니다.
- **`Intlayer`**: 가장 진보된 솔루션입니다. 코드베이스 어디에나 콘텐츠를 선언할 수 있으며([각 컴포넌트 옆 또는 중앙 집중식](https://intlayer.org/ko/blog/per-component-vs-centralized-i18n)), 빌드 타임에 컴파일되고, 타입이 지정된 키, 로케일 인식 라우팅, 사이트맵 생성, AI 번역, 비주얼 에디터 및 CMS를 제공합니다.

TanStack Start에서 중요한 차이점은 라우팅과 서버 렌더링입니다. Intlayer는 프로바이더, 로케일 감지기, 사이트맵을 수동으로 조립할 필요 없이 파일 기반 라우터, `head` 함수 및 사전 렌더링 패스와 완벽히 통합됩니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)와 [TanStack Start i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)를 참조하세요.

</Question>

<Question title="i18n이 TanStack Start 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. 서버 렌더링된 마크업은 서버에서 직접 콘텐츠를 확인하며, 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거되고, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 react-i18next나 react-intl에서 마이그레이션할 수 있나요?">

네, 두 가지 방법이 있습니다. [react-i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_react-i18next_to_intlayer.md) 또는 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 통해 콘텐츠를 점진적으로 마이그레이션할 수 있습니다. 또는 현재 API를 완전히 유지할 수도 있습니다. [호환 어댑터(compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)는 `react-i18next`, `react-intl`, `i18next`와 완전히 동일한 API를 노출하면서 Intlayer 사전에서 데이터를 제공하므로, import 구문만 변경하고 컴포넌트 코드는 그대로 유지할 수 있습니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 컴포넌트를 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. 이 가이드의 15단계를 확인하세요.

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

<Question title="Intlayer는 TanStack Start에서 서버 사이드 렌더링 및 사전 렌더링(pre-rendering)을 지원하나요?">

네. SSR 중에 콘텐츠가 확인되며, 가이드에서는 지역화된 라우트당 하나의 정적 문서를 내보내는 사전 렌더링 구성을 다룹니다. 16단계에서는 `vite.config.ts`에서 `prerender`를 활성화하고 동일한 라우트 테이블에서 지역화된 사이트맵을 생성하는 방법을 보여줍니다.

</Question>

<Question title="hreflang 태그 및 지역화된 사이트맵은 어떻게 추가하나요?">

`src/routes/sitemap[.]xml.ts` 라우트에서 내장 `generateSitemap` 함수를 사용하세요. 일반 URL 목록과 달리 `xhtml:link` 네임스페이스를 내보내므로 페이지의 모든 언어 버전이 서로 양방향으로 연결되어 검색 엔진이 각 대상에게 적합한 버전을 인덱싱할 수 있습니다. 현지화된 `head` 메타데이터는 12단계에서 다룹니다.

</Question>

<Question title="URL에 로케일을 반드시 포함해야 하나요?">

아닙니다. `routing.mode`는 URL 체계를 제어합니다: `"prefix-no-default"`(기본값: `/about`, `/ko/about`), `"prefix-all"`(`/en/about`), `"no-prefix"`(쿠키, 헤더 또는 도메인에서 확인) 또는 `"search-params"`(`/about?locale=ko`). `routing.domains`를 통해 로케일을 별도의 도메인에 매핑할 수도 있습니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="현재 라우트를 유지하는 로케일 전환기는 어떻게 만드나요?">

9단계에 설명된 지역화된 링크 컴포넌트와 함께 `useLocale`을 사용하세요. `useLocale`은 활성 로케일, 사용 가능한 로케일 목록 및 선택 사항을 유지하는 setter를 노출하며, `getLocalizedUrl`은 현재 경로를 대상 언어로 다시 작성하므로 사용자가 홈 페이지로 튕겨 나가지 않고 동일한 페이지에 머무를 수 있습니다.

</Question>

<Question title="지역화된 라우트에서 404 페이지는 어떻게 처리하나요?">

14단계에서 다룹니다. `validatePrefix`는 URL의 로케일 세그먼트가 선언된 로케일인지 여부를 확인하여 `/xx/about`이 일반 경로로 처리되지 않고 실제 404를 반환하도록 합니다. 이 작업이 없으면 알 수 없는 접두사가 조용히 해석되어 검색 엔진이 중복 페이지를 인덱싱하게 됩니다.

</Question>

<Question title="AI를 사용하여 TanStack Start 앱을 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. CLI가 누락된 번역을 찾아 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 채워줍니다. `--git-diff`를 추가하면 현재 브랜치에서 변경된 콘텐츠만 번역하므로 CI 실행 비용을 절감할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 복수형, 성별 및 서식 있는 텍스트(Rich Text)를 지원하나요?">

네. 콘텐츠 선언은 [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md) 및 긴 텍스트를 위한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)을 지원하며, 숫자, 날짜, 통화는 [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)가 처리합니다.

</Question>

<Question title="번역가가 코드를 건드리지 않고 콘텐츠를 수정할 수 있나요?">

자체 인프라에서 실행되어 실행 중인 사이트에서 누구나 직접 텍스트를 수정할 수 있는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 배포 없이 변경할 수 있도록 콘텐츠를 외부화하는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 통해 가능합니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
