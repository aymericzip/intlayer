---
createdAt: 2025-03-25
updatedAt: 2026-03-29
title: Tanstack Start i18n - 2026년에 Solid.js를 사용하여 Tanstack Start 앱을 번역하는 방법
description: Intlayer와 Solid.js를 사용하여 Tanstack Start 애플리케이션에 국제화(i18n)를 추가하는 방법을 알아보세요. 이 포괄적인 가이드를 따라 로케일 인식 라우팅을 갖춘 다국어 앱을 만드세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - 로케일 라우팅
  - Sitemap
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Tanstack Start Solid.js용으로 추가됨"
---

# Intlayer를 사용하여 Solid.js 기반 Tanstack Start 웹사이트 번역하기 | 국제화 (i18n)

## 목차

<TOC/>

이 가이드는 Solid.js가 포함된 Tanstack Start 프로젝트에서 원활한 국제화, 로케일 인식 라우팅, TypeScript 지원 및 최신 개발 관행을 위해 **Intlayer**를 통합하는 방법을 보여줍니다.

## Intlayer란 무엇인가요?

**Intlayer**는 최신 웹 애플리케이션에서 다국어 지원을 단순화하도록 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다.

- 컴포넌트 수준에서 선언적 딕셔너리를 사용하여 **번역을 쉽게 관리**할 수 있습니다.
- 메타데이터, 라우트 및 콘텐츠를 **동적으로 로컬라이즈**할 수 있습니다.
- 자동 생성된 타입을 통해 **TypeScript 지원을 보장**하여 자동 완성 및 오류 감지 기능을 향상시킵니다.
- 동적 로케일 감지 및 전환과 같은 **고급 기능을 활용**할 수 있습니다.
- Tanstack Start의 파일 기반 라우팅 시스템을 통해 **로케일 인식 라우팅을 활성화**할 수 있습니다.

---

## Tanstack Start 애플리케이션에서 Intlayer를 설정하기 위한 단계별 가이드

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">
  
<iframe title="Tanstack Start를 위한 최고의 i18n 솔루션? Intlayer 알아보기" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-tanstack-start-solid-template)을 확인하세요.

### 1단계: 프로젝트 생성

먼저 TanStack Start 웹사이트의 [새 프로젝트 시작](https://tanstack.com/start/latest/docs/framework/solid/quick-start) 가이드에 따라 새로운 TanStack Start 프로젝트를 생성합니다.

### 2단계: Intlayer 패키지 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다.

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **solid-intlayer**
  Intlayer를 Solid 애플리케이션과 통합하는 패키지입니다. Solid 국제화를 위한 컨텍스트 프로바이더와 훅을 제공합니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 3단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 구성 파일을 만듭니다.

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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔의 Intlayer 로그 비활성화 등을 수행할 수 있습니다. 사용 가능한 전체 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 4단계: Vite 구성에 Intlayer 통합

Vite 구성에 intlayer 플러그인을 추가합니다.

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. Vite 애플리케이션 내에 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭(alias)을 제공합니다.

### 5단계: 루트 레이아웃 생성

`useMatches`를 사용하여 현재 로케일을 감지하고 `html` 태그에 `lang` 및 `dir` 속성을 설정하여 국제화를 지원하도록 루트 레이아웃을 구성합니다.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // 활성 매치 중 로케일 매개변수를 찾으려고 시도합니다.
  // 라우트 트리에 동적 세그먼트 "/{-$locale}"을 사용한다고 가정합니다.
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### 6단계: 로케일 레이아웃 생성 (선택 사항)

로케일 접두사를 처리하고 유효성 검사를 수행하는 레이아웃을 만듭니다. 이 레이아웃은 유효한 로케일만 처리되도록 보장합니다.

> 라우트 수준에서 로케일 접두사를 검증할 필요가 없는 경우 이 단계는 선택 사항입니다.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
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
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> 여기서 `{-$locale}`은 현재 로케일로 대체되는 동적 라우트 매개변수입니다. 이 표기법은 해당 슬롯을 선택 사항으로 만들어 `'prefix-no-default'` 등과 같은 라우팅 모드와 함께 작동할 수 있게 합니다.

> 동일한 라우트에서 여러 동적 세그먼트를 사용하는 경우(예: `/{-$locale}/other-path/$anotherDynamicPath/...`) 이 슬롯이 문제를 일으킬 수 있음에 유의하세요.
> `'prefix-all'` 모드의 경우 슬롯을 `$locale`로 전환하는 것을 선호할 수 있습니다.
> `'no-prefix'` 또는 `'search-params'` 모드의 경우 슬롯을 완전히 제거할 수 있습니다.

### 7단계: 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다.

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

> 콘텐츠 선언은 `contentDir` 디렉터리(기본값: `./app`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치하는 경우 애플리케이션 어디에서나 정의할 수 있습니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 8단계: 로케일 인식 컴포넌트 및 훅 활용

로케일 인식 내비게이션을 위해 `LocalizedLink` 컴포넌트를 만듭니다.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

이 컴포넌트는 두 가지 목적을 가집니다.

- URL에서 불필요한 `{-$locale}` 접두사를 제거합니다.
- 사용자가 로컬라이즈된 라우트로 직접 리디렉션되도록 로케일 매개변수를 URL에 주입합니다.

그런 다음 프로그래밍 방식의 내비게이션을 위해 `useLocalizedNavigate` 훅을 만들 수 있습니다.

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

### 9단계: 페이지에서 Intlayer 사용

애플리케이션 전체에서 콘텐츠 딕셔너리에 접근하세요.

#### 로컬라이즈된 홈 페이지

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> Solid에서 `useIntlayer`는 **접근자** 함수(예: `content()`)를 반환합니다. 반응형 콘텐츠에 접근하려면 이 함수를 호출해야 합니다.
>
> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useIntlayer.md)를 참조하세요.

### 10단계: 로케일 스위처 컴포넌트 생성

사용자가 언어를 변경할 수 있도록 하는 컴포넌트를 만듭니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> Solid에서 `useLocale`의 `locale`은 **시그널 접근자**입니다. 현재 값을 반응형으로 읽으려면 `locale()`(괄호 포함)을 사용하세요.
>
> `useLocale` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useLocale.md)를 참조하세요.

### 11단계: HTML 속성 관리

5단계에서 본 것처럼 루트 컴포넌트에서 `useMatches`를 사용하여 `html` 태그의 `lang` 및 `dir` 속성을 관리할 수 있습니다. 이를 통해 서버와 클라이언트 모두에서 올바른 속성이 설정되도록 할 수 있습니다.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // 활성 매치 중 로케일 매개변수를 찾으려고 시도합니다.
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### 12단계: 미들웨어 추가 (선택 사항)

`intlayerProxy`를 사용하여 애플리케이션에 서버 사이드 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 플러그인은 사용자의 브라우저 언어 환경설정에 따라 가장 적절한 로케일을 결정합니다. 감지된 로케일이 없으면 기본 로케일로 리디렉션합니다.

> 프로덕션에서 `intlayerProxy`를 사용하려면 `vite-intlayer` 패키지를 `devDependencies`에서 `dependencies`로 변경해야 합니다.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Nitro를 사용하는 경우 프록시는 서버 앞에 배치되어야 합니다.
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### 12단계: 메타데이터 국제화 (선택 사항)

로케일 인식 메타데이터를 위해 `head` 로더 내에서 `getIntlayer` 함수를 사용하여 콘텐츠 딕셔너리에 접근할 수도 있습니다.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
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

### 13단계: 서버 액션에서 로케일 검색 (선택 사항)

서버 액션이나 API 엔드포인트 내에서 현재 로케일에 접근하고 싶을 수 있습니다.
`intlayer`의 `getLocale` 헬퍼를 사용하여 이를 수행할 수 있습니다.

다음은 TanStack Start의 서버 함수를 사용하는 예입니다.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // 요청에서 쿠키를 가져옵니다 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // 요청에서 헤더를 가져옵니다 (기본값: 'x-intlayer-locale')
    // Accept-Language 협상을 사용한 폴백
    getHeader: (name) => getRequestHeader(name),
  });

  // getIntlayer()를 사용하여 콘텐츠 검색
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### 14단계: 찾을 수 없는 페이지 관리 (선택 사항)

사용자가 존재하지 않는 페이지를 방문할 때 사용자 지정 404 페이지를 표시할 수 있으며, 로케일 접두사가 404 페이지가 트리거되는 방식에 영향을 줄 수 있습니다.

#### 로케일 접두사가 있는 TanStack Router의 404 처리 이해하기

TanStack Router에서 로컬라이즈된 라우트를 사용하여 404 페이지를 처리하려면 다층적인 접근 방식이 필요합니다.

1. **전용 404 라우트**: 404 UI를 표시하는 특정 라우트
2. **라우트 수준 유효성 검사**: 로케일 접두사를 구문 분석하고 잘못된 접두사를 404로 리디렉션
3. **Catch-all 라우트**: 로케일 세그먼트 내에서 일치하지 않는 모든 경로를 캡처

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// 전용 /[locale]/404 라우트를 생성합니다.
// 직접 라우트로 사용되거나 다른 파일에서 컴포넌트로 임포트되어 사용됩니다.
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// notFoundComponent 및 catch-all 라우트에서 재사용할 수 있도록 별도로 내보냅니다.
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad는 라우트가 렌더링되기 전에 실행됩니다(서버와 클라이언트 모두 해당).
  // 로케일 접두사를 유효성 검사하기에 가장 이상적인 장소입니다.
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix는 intlayer 구성을 기반으로 로케일이 유효한지 확인합니다.
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // 잘못된 로케일 접두사 - 유효한 로케일 접두사를 사용하여 404 페이지로 리디렉션
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent는 하위 라우트가 존재하지 않을 때 호출됩니다.
  // 예: /en/존재하지-않는-페이지는 /en 레이아웃 내에서 이를 트리거합니다.
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// $ (splat/catch-all) 라우트는 다른 라우트와 일치하지 않는 모든 경로와 일치합니다.
// 예: /en/some/deeply/nested/invalid/path
// 이를 통해 로케일 내의 모든 일치하지 않는 경로가 404 페이지를 표시하도록 보장합니다.
// 이것이 없으면 일치하지 않는 깊은 경로가 빈 페이지나 오류를 표시할 수 있습니다.
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### 15단계: 컴포넌트의 콘텐츠 추출 (선택 사항)

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 것은 시간이 많이 걸릴 수 있습니다.

이 프로세스를 쉽게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

이를 설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가하면 됩니다.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러 사용 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환된 후 컴포넌트를 저장할지 여부를 나타냅니다.
     *
     * - `true`인 경우 컴파일러는 디스크의 컴포넌트 파일을 다시 씁니다. 따라서 변환은 영구적이 되고 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이렇게 하면 컴파일러가 앱을 변환한 다음 제거할 수 있습니다.
     *
     * - `false`인 경우 컴파일러는 빌드 출력 코드에만 `useIntlayer()` 함수 호출을 주입하고 기본 코드베이스는 그대로 유지합니다. 변환은 메모리에서만 수행됩니다.
     */
    saveComponents: false,

    /**
     * 딕셔너리 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러 사용 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환된 후 컴포넌트를 저장할지 여부를 나타냅니다.
     *
     * - `true`인 경우 컴파일러는 디스크의 컴포넌트 파일을 다시 씁니다. 따라서 변환은 영구적이 되고 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이렇게 하면 컴파일러가 앱을 변환한 다음 제거할 수 있습니다.
     *
     * - `false`인 경우 컴파일러는 빌드 출력 코드에만 `useIntlayer()` 함수 호출을 주입하고 기본 코드베이스는 그대로 유지합니다. 변환은 메모리에서만 수행됩니다.
     */
    saveComponents: false,

    /**
     * 딕셔너리 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러 사용 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환된 후 컴포넌트를 저장할지 여부를 나타냅니다.
     *
     * - `true`인 경우 컴파일러는 디스크의 컴포넌트 파일을 다시 씁니다. 따라서 변환은 영구적이 되고 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이렇게 하면 컴파일러가 앱을 변환한 다음 제거할 수 있습니다.
     *
     * - `false`인 경우 컴파일러는 빌드 출력 코드에만 `useIntlayer()` 함수 호출을 주입하고 기본 코드베이스는 그대로 유지합니다. 변환은 메모리에서만 수행됩니다.
     */
    saveComponents: false,

    /**
     * 딕셔너리 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

module.exports = config;
```

<Tabs>
 <Tab value='추출 명령'>

추출기를 실행하여 컴포넌트를 변환하고 콘텐츠를 추출하세요.

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
 <Tab value='Babel 컴파일러'>

`intlayerCompiler` 플러그인을 포함하도록 `vite.config.ts`를 업데이트하세요.

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
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

---

### 16단계: 사이트맵 생성 (선택 사항)

Intlayer에는 애플리케이션의 사이트맵을 쉽게 만들 수 있는 내장 사이트맵 생성기가 포함되어 있습니다. 로컬라이즈된 경로를 처리하고 검색 엔진에 필요한 메타데이터를 추가합니다.

> Intlayer에서 생성한 사이트맵은 `xhtml:link` 네임스페이스(Hreflang XML 확장)를 지원합니다. 원시 URL만 나열하는 기본 사이트맵 생성기와 달리, Intlayer는 페이지의 모든 언어 버전(예: `/about`, `/about?lang=fr`, `/about?lang=es`) 간에 필요한 양방향 링크를 자동으로 생성합니다. 이를 통해 검색 엔진이 올바른 언어 버전을 올바른 사용자에게 색인화하고 제공할 수 있도록 보장합니다.

이를 사용하려면 먼저 `vite.config.ts`를 구성하여 로컬라이즈된 경로에 대한 사전 렌더링(pre-rendering)을 활성화하고 TanStack Start의 기본 사이트맵 생성을 비활성화해야 합니다.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... 기타 임포트

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
      // ... 기타 설정
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

그런 다음 `generateSitemap` 함수를 사용하는 `src/routes/sitemap[.]xml.ts` 경로를 만듭니다.

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

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
```

---

### 17단계: TypeScript 구성 (선택 사항)

Intlayer는 모듈 보강(module augmentation)을 사용하여 TypeScript의 이점을 얻고 코드베이스를 더 강력하게 만듭니다.

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 구성
  include: [
    // ... 기존 include
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

---

### Git 구성

Intlayer에 의해 생성된 파일은 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 해당 파일을 커밋하지 않을 수 있습니다.

이렇게 하려면 다음 지침을 `.gitignore` 파일에 추가하면 됩니다.

```plaintext fileName=".gitignore"
# Intlayer에 의해 생성된 파일 무시
.intlayer
```

---

## VS Code 확장 프로그램

Intlayer 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다.

- 번역 키에 대한 **자동 완성**
- 누락된 번역에 대한 **실시간 오류 감지**
- 번역된 콘텐츠의 **인라인 미리보기**
- 번역을 쉽게 만들고 업데이트할 수 있는 **빠른 작업**

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

## 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 참조

- [Intlayer 문서](https://intlayer.org)
- [Tanstack Start 문서](https://tanstack.com/start/latest)
- [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useIntlayer.md)
- [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useLocale.md)
- [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)
- [구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
