---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: TanStack Start 앱을 번역하는 방법 – i18n 가이드 2026
description: Intlayer를 사용하여 TanStack Start 애플리케이션에 국제화(i18n)를 추가하는 방법을 알아보세요. 로케일 인식 라우팅으로 앱을 다국어화하기 위한 이 포괄적인 가이드를 따르세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - 로케일 라우팅
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init 명령어 추가
  - version: 7.4.0
    date: 2025-12-11
    changes: validatePrefix를 도입하고 14단계: 현지화된 경로로 404 페이지 처리하기 추가.
  - version: 7.3.9
    date: 2025-12-05
    changes: 13단계: 서버 액션에서 로케일 가져오기(선택 사항) 추가.
  - version: 7.2.3
    date: 2025-11-18
    changes: 13단계: Nitro 적응 추가.
  - version: 7.1.0
    date: 2025-11-17
    changes: getPrefix 함수를 추가하여 기본 접두사 수정, useLocalizedNavigate, LocaleSwitcher 및 LocalizedLink 사용.
  - version: 6.5.2
    date: 2025-10-03
    changes: 문서 업데이트
  - version: 5.8.1
    date: 2025-09-09
    changes: TanStack Start용으로 추가됨
---

# Intlayer를 사용하여 TanStack Start 웹사이트 번역하기 | 국제화(i18n)

## 목차

<TOC/>

이 가이드는 로케일 인식 라우팅, TypeScript 지원 및 최신 개발 방식을 사용하여 TanStack Start 프로젝트에서 원활한 국제화를 위해 **Intlayer**를 통합하는 방법을 보여줍니다.

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 단순화하도록 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용**하여 번역을 쉽게 관리할 수 있습니다.
- **메타데이터, 경로 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입**으로 TypeScript 지원을 보장하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 활용할 수 있습니다.
- **TanStack Start의 파일 기반 라우팅 시스템**을 사용하여 로케일 인식 라우팅을 활성화할 수 있습니다.

---

## TanStack Start 애플리케이션에서 Intlayer를 설정하기 위한 단계별 가이드

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">
  
<iframe title="TanStack Start를 위한 최고의 i18n 솔루션? Intlayer를 만나보세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-tanstack-start-template)을 참조하세요.

### 1단계: 프로젝트 생성

먼저 TanStack Start 웹사이트의 [새 프로젝트 시작하기](https://tanstack.com/start/latest/docs/framework/react/quick-start) 가이드에 따라 새 TanStack Start 프로젝트를 생성합니다.

### 2단계: Intlayer 패키지 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 기본 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 3단계: 프로젝트 구성

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

### 4단계: Vite 구성에 Intlayer 통합

구성에 intlayer 플러그인을 추가합니다:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 감시합니다. Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭을 제공합니다.

### 5단계: 루트 레이아웃 생성

`useMatches`를 사용하여 현재 로케일을 감지하고 `html` 태그에 `lang` 및 `dir` 속성을 설정하여 국제화를 지원하도록 루트 레이아웃을 구성합니다.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // 활성 매치 중 하나의 매개변수에서 로케일을 찾으려고 시도합니다.
  // 이는 라우트 트리에서 동적 세그먼트 "/{-$locale}"을 사용한다고 가정합니다.
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

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

### 6단계: 로케일 레이아웃 생성

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

### 7단계: 콘텐츠 선언

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

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값: `./app`)에 포함되는 한 애플리케이션 어디에서나 정의할 수 있습니다. 그리고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 8단계: 로케일 인식 컴포넌트 및 훅 생성

로케일 인식 내비게이션을 위한 `LocalizedLink` 컴포넌트를 생성합니다:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// 주요 유틸리티
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// 헬퍼
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

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
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

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

### 9단계: 페이지에서 Intlayer 활용하기

애플리케이션 전반에서 콘텐츠 사전에 액세스합니다:

#### 현지화된 홈 페이지

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
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

> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

### 10단계: 로케일 스위처 컴포넌트 생성

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

### 11단계: HTML 속성 관리

5단계에서 본 것처럼, 루트 컴포넌트에서 `useMatches`를 사용하여 `html` 태그의 `lang` 및 `dir` 속성을 관리할 수 있습니다. 이를 통해 서버와 클라이언트에서 올바른 속성이 설정되도록 보장합니다.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // 활성 매치 중 하나의 매개변수에서 로케일을 찾으려고 시도합니다.
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### 12단계: 미들웨어 추가(선택 사항)

`intlayerProxy`를 사용하여 애플리케이션에 서버 사이드 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 플러그인은 사용자의 브라우저 언어 기본 설정에 따라 가장 적합한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

> 프로덕션에서 `intlayerProxy`를 사용하려면 `vite-intlayer` 패키지를 `devDependencies`에서 `dependencies`로 변경해야 합니다.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Nitro를 사용하는 경우 프록시를 서버 앞에 배치해야 합니다.
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### 13단계: 메타데이터 국제화(선택 사항)

`getIntlayer` 훅을 사용하여 애플리케이션 전반에서 콘텐츠 사전에 액세스할 수도 있습니다:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### 14단계: 서버 액션에서 로케일 가져오기(선택 사항)

서버 액션 또는 API 엔드포인트 내부에서 현재 로케일에 액세스하고 싶을 수 있습니다.
이는 `intlayer`의 `getLocale` 도우미를 사용하여 수행할 수 있습니다.

다음은 TanStack Start의 서버 함수를 사용한 예입니다:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // 요청에서 쿠키 가져오기(기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // 요청에서 헤더 가져오기(기본값: 'x-intlayer-locale')
    // Accept-Language 협상을 사용한 폴백
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer()를 사용하여 일부 콘텐츠 가져오기
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### 15단계: 찾을 수 없는 페이지 관리(선택 사항)

사용자가 존재하지 않는 페이지를 방문할 때 맞춤형 찾을 수 없음 페이지를 표시할 수 있으며, 로케일 접두사가 찾을 수 없음 페이지가 트리거되는 방식에 영향을 줄 수 있습니다.

#### 로케일 접두사를 사용한 TanStack Router의 404 처리 이해

TanStack Router에서 현지화된 경로로 404 페이지를 처리하려면 다층적인 접근 방식이 필요합니다:

1. **전용 404 경로**: 404 UI를 표시하기 위한 특정 경로
2. **경로 수준 유효성 검사**: 로케일 접두사의 유효성을 검사하고 유효하지 않은 경우 404로 리디렉션
3. **Catch-all 경로**: 로케일 세그먼트 내에서 일치하지 않는 모든 경로를 캡처

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// 이것은 전용 /[locale]/404 경로를 생성합니다.
// 직접 경로로 사용되거나 다른 파일에서 컴포넌트로 임포트되어 사용됩니다.
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent 및 catch-all 경로에서 재사용할 수 있도록 별도로 내보냅니다.
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad는 경로가 렌더링되기 전에 실행됩니다(서버 및 클라이언트 모두에서).
  // 로케일 접두사의 유효성을 검사하기에 이상적인 장소입니다.
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix는 intlayer 구성에 따라 로케일이 유효한지 확인합니다.
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 유효하지 않은 로케일 접두사 - 유효한 로케일 접두사가 포함된 404 페이지로 리디렉션
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // 자식 경로가 존재하지 않을 때 notFoundComponent가 호출됩니다.
  // 예: /en/존재하지-않는-페이지는 /en 레이아웃 내에서 이를 트리거합니다.
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) 경로는 다른 경로와 일치하지 않는 모든 경로와 일치합니다.
// 예: /en/어떤/깊게/중첩된/유효하지-않은/경로
// 이를 통해 로케일 내의 모든 일치하지 않는 경로가 404 페이지를 표시하도록 보장합니다.
// 이것이 없으면 일치하지 않는 깊은 경로는 빈 페이지나 오류를 표시할 수 있습니다.
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### 16단계: TypeScript 구성(선택 사항)

Intlayer는 모듈 확장을 사용하여 TypeScript의 이점을 얻고 코드베이스를 더욱 견고하게 만듭니다.

TypeScript 구성에 자동 생성된 유형이 포함되어 있는지 확인하세요:

```json5 fileName="tsconfig.json"
{
  // ... 기존 구성
  include: [
    // ... 기존 포함 항목
    ".intlayer/**/*.ts", // 자동 생성된 유형 포함
  ],
}
```

---

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 커밋되는 것을 방지할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

---

## VS Code 확장 프로그램

Intlayer를 사용한 개발 환경을 개선하기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

## 더 나아가기

더 나아가려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 참고 자료

- [Intlayer 문서](https://intlayer.org)
- [TanStack Start 문서](https://reactrouter.com/)
- [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)
- [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
- [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)
- [구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
