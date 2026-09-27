---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Lingui를 활용한 TanStack Start i18n: 2026 완벽 설정 가이드"
description: "Lingui로 TanStack Start 앱 번역하기: 매크로, PO 카탈로그, SSR, 로케일 라우팅, hreflang, sitemap 및 robots.txt, 실제 번들 크기 벤치마크 데이터 포함."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - 국제화
  - i18n
  - SEO
  - PO 파일
  - React
  - 블로그
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "초기 버전"
author: aymericzip
---

# 2026년에 Lingui를 사용하여 TanStack Start 애플리케이션 국제화하는 방법

## 목차

<TOC/>

## Lingui란 무엇인가요?

**Lingui**는 **매크로**와 **메시지 추출(extraction)**을 중심으로 구축된 i18n 라이브러리입니다. 컴포넌트 내에 원본 텍스트(`` t`Hello` ``, `<Trans>Hello</Trans>`)를 직접 작성하면, `lingui extract`가 모든 메시지를 카탈로그(기본값은 PO 파일)로 수집하고, 번역가가 이를 채우며, Vite 플러그인이 이를 컴팩트한 JavaScript로 컴파일합니다. 메시지는 ICU MessageFormat을 사용하므로 복수형과 select 구문이 지원됩니다.

TanStack Start에는 내장된 i18n 계층이 없으므로, 이 가이드에서는 처음부터 Lingui를 연결합니다:

- `@rolldown/plugin-babel`을 통해 **Babel로 컴파일되는 매크로** (`@vitejs/plugin-react` v6 및 Vite 8에서 필요).
- 선택적 `{-$locale}` 세그먼트를 사용한 **로케일 라우팅** (`/about`, `/fr/about`).
- **로케일당 하나의 카탈로그를 필요 시(on demand) 로드**하고 렌더링당 하나의 `I18n` 인스턴스를 사용하여 동시 SSR 요청이 로케일을 공유하지 않도록 방지.
- **완벽한 다국어 SEO**: 번역된 `<title>` 및 description, 표준 URL(canonical), `x-default`가 포함된 `hreflang`, Open Graph 로케일, JSON-LD, 사이트맵, `robots.txt`, 사전 렌더링(pre-rendering) 및 현지화된 404 페이지.

> 다른 스택을 찾고 계신가요?

- [TanStack Start + use-intl 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Paraglide 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_paraglide.md)
- [TanStack Start + Intlayer 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)

> Next.js를 사용 중이신가요?

- [Next.js + Lingui 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_nextjs_lingui.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md)

> 이러한 라이브러리가 어디에서 왔는지 이해하려면 JavaScript i18n의 역사를 읽어보세요.

- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)

## TanStack Start에서 Lingui에 대한 벤치마크 결과

[i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)는 동일한 10개 페이지, 10개 로케일의 TanStack Start 앱을 주요 라이브러리로 실행하여 브라우저가 실제로 다운로드하는 크기를 측정합니다.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

2026-09-26 기준 `@lingui/core@6.6.0` 주요 수치 (gzip):

| 설정                                 | 라이브러리 크기 | 페이지당 JS | 타 로케일 누출 | 타 페이지 누출 |
| :----------------------------------- | --------------: | ----------: | -------------: | -------------: |
| i18n 미적용 (기본 앱)                |               - |    111.0 KB |             0% |             0% |
| Lingui (본 가이드의 설정)            |         56.7 KB |    115.2 KB |           9.3% |             0% |
| `@intlayer/lingui` (호환 모드)       |          9.8 KB |    136.7 KB |           9.9% |             0% |
| `react-intlayer` (네이티브 Intlayer) |          4.5 KB |    126.8 KB |             0% |             0% |

주요 시사점:

- **로케일당 하나의 카탈로그를 필요 시 로드합니다.** 이를 통해 페이지 크기를 기본 앱 크기에 가깝게 유지할 수 있습니다.
- **런타임은 여전히 무겁습니다** (~57 KB gzip). `@intlayer/lingui` 호환 어댑터(16단계)는 매크로를 그대로 유지하면서 런타임을 ~10 KB로 줄여줍니다.

> 전체 데이터 확인: [TanStack Start 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md) 및 [벤치마크 저장소](https://github.com/intlayer-org/benchmark-i18n).

## TanStack Start에서의 기능 비교

TanStack Start에서 일반적으로 사용되는 다른 라이브러리들과 Lingui의 비교:

| 기능                                   | `react-intlayer` (Intlayer)          | `use-intl`            | Paraglide JS                     | Lingui                       |
| -------------------------------------- | ------------------------------------ | --------------------- | -------------------------------- | ---------------------------- |
| **컴포넌트 인근 번역 관리**            | ✅ 동일 위치 배치(Co-located)        | ❌ 중앙 집중식 JSON   | ❌ 로케일당 하나의 JSON 파일     | ⚠️ 컴포넌트 내 원본 텍스트   |
| **TypeScript 통합**                    | ✅ 자동 생성 타입                    | ✅ `AppConfig` 경유   | ✅ 타입이 지정된 메시지 함수     | ⚠️ 매크로 전용               |
| **누락된 번역 감지**                   | ✅ 타입 에러 및 빌드 경고            | ⚠️ 런타임 폴백        | ⚠️ 기본 로케일로 폴백            | ⚠️ 원본 텍스트로 폴백        |
| **리치 콘텐츠 (JSX, Markdown)**        | ✅ 직접 지원                         | ⚠️ `t.rich` 태그 방식 | ⚠️ 문자열                        | ✅ `<Trans>` 내부 JSX        |
| **현지화된 라우팅**                    | ✅ 내장 지원                         | ❌ 수동 `{-$locale}`  | ✅ `urlPatterns` + 라우터 재작성 | ❌ 수동 `{-$locale}`         |
| **새로고침 없는 로케일 전환**          | ✅ 지원                              | ✅ 지원               | ❌ 전체 페이지 새로고침          | ✅ 지원                      |
| **복수형 처리**                        | ✅ 열거형 기반                       | ✅ ICU                | ✅ 변형(Variants)                | ✅ ICU                       |
| **ICU MessageFormat**                  | ✅ `format: "icu"` 경유              | ✅ 네이티브           | ⚠️ inlang 플러그인 경유          | ✅ 네이티브                  |
| **콘텐츠 포맷**                        | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`            | ⚠️ inlang JSON                   | ✅ PO, JSON, CSV             |
| **AI 번역**                            | ✅ 사용자 지정 제공업체 및 키        | ❌ 미지원             | ❌ 미지원                        | ❌ 미지원                    |
| **시각적 에디터 / CMS**                | ✅ 로컬 에디터 + 선택적 CMS          | ❌ 외부 플랫폼        | ⚠️ inlang 생태계 앱              | ❌ 외부 플랫폼               |
| **SEO 헬퍼 (hreflang, sitemap)**       | ✅ 내장 지원                         | ❌ 수동 구현          | ⚠️ 현지화된 URL, 나머지 수동     | ❌ 수동 구현                 |
| **런타임 크기 (gzip, 벤치마크)**       | 4.5 KB                               | 75.9 KB               | 1.8 KB                           | 56.7 KB                      |
| **최적 설정 누출률 (로케일 / 페이지)** | 0% / 0%                              | 0% / 0%               | 49.7% / 0%                       | 8.6% / 0%                    |
| **CI에서 누락된 번역 감지**            | ✅ `npx intlayer test`               | ⚠️ 미내장             | ⚠️ 미내장                        | ✅ `lingui compile --strict` |

> 런타임 크기 및 누출률 수치는 [TanStack Start 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)에서 가져왔습니다. 누출률은 각 라이브러리의 최적 설정에서 측정되었습니다.

> 기타 TanStack Start 가이드:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)

## 권장 모범 사례

- **라우트 로케일을 기반으로 `<html>`의 `lang` 및 `dir`을 설정**하여 서버 HTML에서 올바르게 렌더링되도록 합니다.
- **접두사를 사용하여 로케일당 하나의 URL을 유지**하여 모든 언어 버전이 색인 가능하도록 합니다.
- **로케일당 하나의 `I18n` 인스턴스를 생성**하고, SSR 중에 전역 인스턴스를 절대 변조하지 마세요. 두 개의 동시 요청이 서로의 로케일을 덮어쓸 수 있습니다.
- 클라이언트 코드에서 모든 카탈로그를 가져오지 말고, **활성 카탈로그만 로드**하세요.
- **하나의 매크로 스타일을 선택**하고(컴포넌트에서는 `useLingui` + `t`, 지연 디스크립터에서는 `msg`) 일관되게 유지하세요. `t`, `i18n._`, `i18n.t`, `<Trans>`를 혼용하면 사람과 AI 어시스턴트 모두 코드를 읽기 어려워집니다.
- **CI에서 `lingui extract`를 실행**하여 새로운 메시지가 번역되지 않은 채 배포되지 않도록 하세요.
- **메타데이터를 번역**하고, 모든 페이지에 `canonical`, `hreflang`, `x-default`를 선언하세요.
- **다국어 sitemap과 robots.txt를 생성**하고, 모든 로케일을 사전 렌더링하세요.
- **로케일 전환기에 실제 링크를 사용**하여 크롤러가 모든 언어를 발견할 수 있도록 하세요.

- [국제화 및 SEO 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md)
- [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)

## TanStack Start 애플리케이션에 Lingui를 설정하는 단계별 가이드

생성할 프로젝트 구조는 다음과 같습니다:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request middleware (locale redirect)
    ├── i18n
    │   ├── config.ts           # Locales, URL helpers
    │   ├── lingui.ts           # Catalog loader, I18n instances
    │   ├── negotiateLocale.ts  # Accept-Language parsing
    │   └── seo.ts              # head() builder
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Locale layout + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Localized 404
```

<Steps>
<Step number={1} title="의존성 설치">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: 런타임, `I18nProvider` 및 매크로(`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: 메시지를 카탈로그로 수집하기 위한 `lingui extract`.
- **@lingui/vite-plugin**: 가져오기 시 `.po` 카탈로그를 컴파일하므로 `lingui compile`이 필요하지 않습니다.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: 빌드 타임에 매크로를 변환합니다.

</Step>
<Step number={2} title="로케일 설정 중앙화">

기본 로케일은 접두사 없이 유지되고(`/about`), 기타 로케일에는 접두사가 붙습니다(`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui 설정">

Lingui 설정은 동일한 로케일 목록을 재사용하므로 카탈로그, 라우터, 사이트맵 간에 불일치가 발생하지 않습니다.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

추출 스크립트를 추가합니다:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check`는 컴포넌트에 추출 및 커밋되지 않은 메시지가 포함되어 있을 때 CI에서 실패합니다.

</Step>
<Step number={4} title="Vite 설정">

`@vitejs/plugin-react` v6부터는 Babel이 더 이상 내장되어 있지 않습니다. `@rolldown/plugin-babel`이 Lingui 매크로 플러그인을 실행하며, `linguiTransformerBabelPreset`은 매크로를 가져오는 파일만 처리하여 빌드 속도를 빠르게 유지합니다.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="로케일별 카탈로그 로드">

`import()`의 템플릿 리터럴을 통해 Vite는 **로케일당 하나의 청크**를 생성하며, Lingui 플러그인이 `.po` 파일을 컴파일합니다. 프랑스어 방문자는 프랑스어 카탈로그만 다운로드합니다.

컴파일된 메시지는 일반 데이터이므로 라우트 로더에서 반환하고, HTML로 직렬화하며, 하이드레이션 시 재사용할 수 있습니다.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

TypeScript에서 `.po` 가져오기를 허용하려면 모듈을 한 번 선언하세요:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="루트 도큐먼트 생성">

루트 라우트는 선택적 로케일 파라미터를 읽어 서버 렌더링된 `<html>`에 `lang`과 `dir`을 설정합니다.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="로케일 레이아웃 라우트 생성">

`{-$locale}` 폴더는 선택적 경로 세그먼트를 생성합니다. `/about`과 `/fr/about`은 모두 `/{-$locale}/about`과 일치합니다. 레이아웃은 알 수 없는 접두사를 거부하고, 현재 로케일의 카탈로그를 로드하며, 전용 `I18n` 인스턴스를 제공합니다.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="페이지에서 번역 활용">

컴포넌트에 원본 텍스트를 작성합니다. 매크로는 빌드 타임에 이를 메시지 ID로 변환하고, `lingui extract`가 이를 수집합니다.

- 중첩 요소를 포함한 JSX 콘텐츠를 위한 `<Trans>`;
- 문자열(속성, props)을 위한 `useLingui().t`;
- ICU 복수형을 위한 `<Plural>`.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> 카탈로그의 동적 `import()`는 모듈 시스템에 의해 캐시되므로 여러 로더에서 `loadI18n`을 호출해도 카탈로그를 두 번 다운로드하지 않습니다.

</Step>
<Step number={9} title="메시지 추출 및 번역">

추출 명령을 실행합니다. Lingui는 모든 메시지를 각 로케일 카탈로그에 작성합니다:

```bash
npm run i18n:extract
```

그런 다음 각 항목의 `msgstr`을 번역합니다:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> 기본적으로 메시지 ID는 원본 텍스트의 해시값입니다. 영어 텍스트를 변경하면 새 메시지가 생성됩니다. 자주 변경되는 텍스트에는 명시적 ID(`<Trans id="about.title">About us</Trans>`)를 사용하세요.

</Step>
<Step number={10} title="현지화된 링크 컴포넌트 구축" isOptional={true}>

모든 라우트는 `{-$locale}` 아래에 위치하므로 링크는 현재 로케일 파라미터를 전달해야 합니다.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="콘텐츠 언어 변경" isOptional={true}>

크롤러가 모든 언어 버전을 찾을 수 있도록 전환기를 **링크**로 렌더링합니다. `to="."`는 현재 페이지를 유지하고 로케일 파라미터를 교체합니다. 그런 다음 로케일 레이아웃의 로더가 새 카탈로그를 가져옵니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="메타데이터 국제화" isOptional={true}>

모든 페이지가 번역된 `<title>`과 description, 자체 참조 canonical, 로케일당 하나의 `hreflang` 및 `x-default`, Open Graph 로케일, `inLanguage`가 포함된 JSON-LD를 제공한다면 각 언어 버전이 개별적으로 검색 순위에 오를 수 있습니다. 메타데이터는 로더(8단계)에서 번역되며, 이 헬퍼 함수가 나머지를 구성합니다:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={13} title="사이트맵 및 robots.txt 국제화" isOptional={true}>

사이트맵은 모든 로케일의 모든 URL을 나열하며, 각 항목은 `xhtml:link`로 모든 대체 언어를 선언합니다. `robots.txt`는 모든 언어의 비공개 경로를 차단하고 사이트맵을 가리킵니다. 스타터 템플릿에서 `public/robots.txt`를 생성했다면 이를 삭제하세요.

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={14} title="모든 로케일 사전 렌더링" isOptional={true}>

TanStack Start가 빌드 타임에 모든 언어 버전을 사전 렌더링할 수 있도록 모든 현지화된 경로를 나열합니다:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="첫 방문자 리디렉션 및 404 페이지 처리" isOptional={true}>

요청 미들웨어는 `/`에 도달한 방문자를 기본 설정 언어로 리디렉션합니다(쿠키 우선, 그다음 `Accept-Language`). 딥 링크는 절대 리디렉션되지 않으므로 크롤러와 공유 URL은 항상 요청한 페이지를 그대로 받습니다.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

404 페이지의 경우, catch-all 라우트가 레이아웃의 현지화된 `notFoundComponent`를 렌더링합니다. `noindex`로 표시하세요. React 19는 `<meta>`를 `<head>`로 호이스팅합니다.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Intlayer로 매크로를 유지하면서 런타임 줄이기" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md) 호환 어댑터는 소스 코드를 그대로 유지합니다. 매크로는 이전과 동일하게 컴파일되며, 결과로 생성되는 `i18n._()`, `useLingui()`, `<Trans>` 호출은 컴파일된 Intlayer 딕셔너리에 의해 제공됩니다. 벤치마크에서 런타임은 **~56.7 KB에서 ~9.8 KB** gzip으로 감소합니다.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

매크로 변환 이후에 플러그인을 추가하여 `@lingui/core`와 `@lingui/react`를 어댑터로 별칭(alias) 지정하도록 합니다:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

카탈로그는 [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md) (JSON 카탈로그) 또는 [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md) (PO 카탈로그)을 통해 동기화됩니다. 전체 설정은 [Lingui 호환 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)를 참고하고, 나란히 비교한 내용은 [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer-lingui.md)에서 확인하세요.

</Step>
<Step number={17} title="Intlayer를 활용한 번역 자동화" isOptional={true}>

Lingui는 메시지를 추출하지만, 수십 개의 카탈로그를 수작업으로 채우는 데 대부분의 시간이 소요됩니다. Intlayer는 **무료**이며 **오픈 소스**로, Lingui와 함께 작동하는 도구를 제공합니다:

- 자체 API 키와 제공업체를 사용하여 **AI로 번역**. [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md) 및 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참고하세요.
- [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)을 사용하여 **PO 파일을 단일 진실 공급원(source of truth)**으로 유지.
- CI에서 **누락된 번역 테스트**. [번역 테스트 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)를 참고하세요.
- [scan 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/scan.md)를 사용하여 누락된 `hreflang`, 잘못된 canonical, 로케일 누출에 대해 **배포된 사이트 감사**.

</Step>
</Steps>

## 자주 묻는 질문

<FAQ>

<Question title="Lingui는 TanStack Start와 함께 작동하나요?">

네. Lingui에는 전용 TanStack Start 통합이 없지만, Vite 플러그인과 Babel 매크로 플러그인이 그대로 작동합니다. 올바르게 설정해야 할 두 가지 핵심 사항은 `@rolldown/plugin-babel`을 통해 매크로를 실행하는 것(Vite 8 및 `@vitejs/plugin-react` v6에는 Babel이 더 이상 포함되지 않음)과 SSR 중에 전역 인스턴스를 활성화하는 대신 로케일당 하나의 `I18n` 인스턴스를 생성하는 것입니다.

</Question>
<Question title="@lingui/core의 전역 i18n 객체를 사용하지 않는 이유는 무엇인가요?">

서버에서는 단일 프로세스가 동시에 여러 요청을 렌더링합니다. 공유 객체에서 `i18n.activate("fr")`를 호출하면 병렬로 영어로 렌더링 중인 요청의 언어가 변경될 수 있습니다. `setupI18n`은 로케일당 격리된 인스턴스를 생성하므로 안전합니다.

</Question>
<Question title="lingui compile을 실행해야 하나요?">

아니요. `@lingui/vite-plugin`은 `.po` 카탈로그를 가져올 때 컴파일합니다. 새로운 메시지를 수집할 때 `lingui extract`만 실행하면 됩니다.

</Question>
<Question title="Lingui에서 페이지 제목과 메타 설명을 어떻게 번역하나요?">

`msg` 매크로로 선언하고 라우트 로더에서 ``i18n._(msg`...`)``로 번역합니다. 로더는 일반 문자열을 반환하므로 `head()`는 동기적으로 유지되고 값은 하이드레이션을 위해 직렬화됩니다. 8단계와 12단계에서 전체 설정을 보여줍니다.

</Question>
<Question title="TanStack Start 번들에서 Lingui 크기는 얼마나 되나요?">

[벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)에서는 런타임으로 ~56.7 KB gzip이 측정됩니다. 로케일당 하나의 카탈로그를 필요 시 로드하면 페이지 크기는 i18n이 없는 111 KB 대비 ~115 KB가 됩니다. 모든 카탈로그를 정적으로 가져오면 ~152 KB로 증가합니다.

</Question>
<Question title="Lingui 매크로를 유지하면서 Intlayer로 마이그레이션할 수 있나요?">

네. [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md) 어댑터는 매크로를 유지하고 런타임을 교체합니다. 그런 다음 컴포넌트를 하나씩 `useIntlayer`로 이전할 수 있습니다. [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 참고하세요.

</Question>

</FAQ>
