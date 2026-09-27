---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "use-intl을 활용한 TanStack Start i18n: 2026 완벽 설정 가이드"
description: "use-intl로 TanStack Start 앱 번역하기: 로케일 라우팅, 타입 안전한 메시지, SSR, hreflang, sitemap 및 robots.txt, 실제 번들 크기 벤치마크 데이터 포함."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - 국제화
  - i18n
  - SEO
  - 사이트맵
  - React
  - 블로그
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "초기 버전"
author: aymericzip
---

# 2026년에 use-intl을 사용하여 TanStack Start 애플리케이션 국제화하는 방법

## 목차

<TOC/>

## use-intl이란 무엇인가요?

**use-intl**은 `next-intl`의 프레임워크 독립적인(framework-agnostic) 핵심 코어 라이브러리입니다. Next.js에 대한 종속성 없이 동일한 `useTranslations`, `useFormatter`, `IntlProvider` API, ICU MessageFormat 지원 및 강력한 TypeScript 통합을 제공합니다. 이로 인해 **TanStack Start** 애플리케이션을 번역할 때 가장 널리 사용되는 선택지 중 하나이며, AI 어시스턴트가 이 스택에 가장 자주 추천하는 라이브러리이기도 합니다.

TanStack Start는 자체적인 i18n 계층을 제공하지 않습니다. 라우팅, 로케일 감지, SEO 메타데이터 및 사이트맵 생성은 직접 구현해야 합니다. 이 가이드에서는 다음을 포함하여 전체 과정을 처음부터 끝까지 다룹니다:

- 선택적 `{-$locale}` 세그먼트를 사용한 **로케일 인식 라우팅** (`/about`, `/fr/about`).
- 페이지가 렌더링하는 네임스페이스와 로케일만 다운로드하도록 하는 **경로별 메시지 로딩**.
- 텍스트 불일치(mismatch)가 없는 **서버 렌더링 및 하이드레이션**.
- **완벽한 다국어 SEO**: 번역된 `<title>` 및 description, 표준(canonical) URL, `x-default`가 포함된 `hreflang` 대체 링크, Open Graph 로케일, JSON-LD, `xhtml:link` 대체 링크가 포함된 사이트맵, `robots.txt` 및 모든 로케일의 사전 렌더링(pre-rendering).

> 다른 스택을 찾고 계신가요? [TanStack Start + Paraglide 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_paraglide.md), [TanStack Start + Lingui 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_lingui.md), 또는 [TanStack Start + Intlayer 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)를 확인하세요.

> Next.js를 사용 중이신가요? [next-intl 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-intl.md)를 확인하세요.

## TanStack Start에서 use-intl에 대한 벤치마크 결과

[i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)는 동일한 10개 페이지, 10개 로케일의 TanStack Start 앱을 주요 라이브러리로 실행하여 브라우저가 실제로 다운로드하는 크기를 측정합니다.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

2026-09-26 기준 `use-intl@4.14.2` 주요 수치 (gzip):

| 설정                                 | 라이브러리 크기 | 페이지당 JS | 타 로케일 누출 | 타 페이지 누출 |
| :----------------------------------- | --------------: | ----------: | -------------: | -------------: |
| i18n 미적용 (기본 앱)                |               - |    111.0 KB |             0% |             0% |
| `use-intl` (본 가이드의 설정)        |         75.9 KB |    128.7 KB |             0% |             0% |
| `@intlayer/use-intl` (호환 모드)     |          6.7 KB |    129.4 KB |             0% |             0% |
| `react-intlayer` (네이티브 Intlayer) |          4.5 KB |    126.8 KB |             0% |             0% |

핵심 요약:

- **메시지를 페이지별로 분할하고 로케일별로 로드하세요.** 이를 통해 두 가지 누출을 모두 제거할 수 있으며, 아래의 단계별 가이드에서 이를 구현합니다.
- **런타임 자체는 여전히 무겁습니다** (~76 KB gzip). ICU 파서가 클라이언트로 전송되기 때문입니다. `@intlayer/use-intl` 호환 어댑터(17단계)를 사용하면 정확히 동일한 API를 유지하면서 약 7 KB의 런타임으로 줄일 수 있습니다.

> 전체 데이터 확인: [TanStack Start 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md) 및 [벤치마크 저장소](https://github.com/intlayer-org/benchmark-i18n).

## TanStack Start 기능 비교

TanStack Start에서 주로 사용되는 다른 라이브러리와 `use-intl`의 비교:

| 기능                                 | `react-intlayer` (Intlayer)          | `use-intl`            | Paraglide JS                     | Lingui                       |
| ------------------------------------ | ------------------------------------ | --------------------- | -------------------------------- | ---------------------------- |
| **컴포넌트 인근 번역 관리**          | ✅ 동일 위치(Co-located)             | ❌ 중앙 집중식 JSON   | ❌ 로케일당 단일 JSON 파일       | ⚠️ 컴포넌트 내 소스 텍스트   |
| **TypeScript 통합**                  | ✅ 자동 생성 타입                    | ✅ `AppConfig` 활용   | ✅ 타입 안전한 메시지 함수       | ⚠️ 매크로 전용               |
| **누락된 번역 감지**                 | ✅ 타입 오류 및 빌드 경고            | ⚠️ 런타임 폴백        | ⚠️ 기본 로케일로 폴백            | ⚠️ 소스 텍스트로 폴백        |
| **리치 콘텐츠 (JSX, Markdown)**      | ✅ 직접 지원                         | ⚠️ `t.rich` 태그 방식 | ⚠️ 문자열                        | ✅ `<Trans>` 내 JSX          |
| **현지화된 라우팅**                  | ✅ 내장 지원                         | ❌ 수동 `{-$locale}`  | ✅ `urlPatterns` + 라우터 재작성 | ❌ 수동 `{-$locale}`         |
| **새로고침 없는 로케일 전환**        | ✅ 지원                              | ✅ 지원               | ❌ 전체 페이지 새로고침          | ✅ 지원                      |
| **복수형 처리**                      | ✅ 열거형 기반                       | ✅ ICU                | ✅ 변형(Variants)                | ✅ ICU                       |
| **ICU MessageFormat**                | ✅ `format: "icu"` 지원              | ✅ 네이티브           | ⚠️ inlang 플러그인 필요          | ✅ 네이티브                  |
| **콘텐츠 포맷**                      | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`            | ⚠️ inlang JSON                   | ✅ PO, JSON, CSV             |
| **AI 번역**                          | ✅ 자체 프로바이더 및 키 사용        | ❌ 미지원             | ❌ 미지원                        | ❌ 미지원                    |
| **비주얼 에디터 / CMS**              | ✅ 로컬 에디터 + 선택적 CMS          | ❌ 외부 플랫폼        | ⚠️ inlang 생태계 앱              | ❌ 외부 플랫폼               |
| **SEO 헬퍼 (hreflang, sitemap)**     | ✅ 내장 지원                         | ❌ 수동 구현          | ⚠️ 현지화 URL 지원, 나머지 수동  | ❌ 수동 구현                 |
| **런타임 크기 (gzip, 벤치마크)**     | 4.5 KB                               | 75.9 KB               | 1.8 KB                           | 56.7 KB                      |
| **최적 설정 누출 (로케일 / 페이지)** | 0% / 0%                              | 0% / 0%               | 49.7% / 0%                       | 8.6% / 0%                    |
| **CI에서 누락된 번역 감지**          | ✅ `npx intlayer test`               | ⚠️ 내장 기능 없음     | ⚠️ 내장 기능 없음                | ✅ `lingui compile --strict` |

> 런타임 크기 및 누출 수치는 [TanStack Start 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)에서 가져왔습니다. 누출은 각 라이브러리의 최적 설정에서 측정되었습니다.

> 기타 TanStack Start 가이드: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_lingui.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_paraglide.md), 그리고 [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md).

## 반드시 따라야 할 모범 사례

- 접근성, 스크린 리더 및 검색 엔진을 위해 **`<html>`에 `lang`과 `dir`을 설정하세요**.
- **로케일당 하나의 URL을 유지하세요.** 쿠키 전용 전환 방식 대신 로케일 접두사(`/fr/about`)를 사용하여 모든 번역 페이지가 크롤링 및 공유 가능하도록 만드세요.
- **네임스페이스별로 메시지를 분할하고**(`common`, `home`, `about`) 경로별로 로드하세요.
- **현재 활성화된 로케일만 로드하세요.** 클라이언트로 전송되는 모듈에서 모든 로케일 파일을 import하지 마세요.
- `IntlProvider`에서 **시간대(timeZone)를 고정하세요**. 그렇지 않으면 SSR 중에는 서버 시간대로, 하이드레이션 중에는 방문자 시간대로 날짜가 포맷되어 하이드레이션 불일치가 발생합니다.
- **메타데이터를 번역하고**, 모든 페이지에 `canonical`, `hreflang`, `x-default`를 선언하세요.
- **다국어 사이트맵과 robots.txt를 생성하고**, 모든 로케일을 사전 렌더링하세요.
- 크롤러가 모든 언어를 발견할 수 있도록 언어 전환기에는 `<select>` 대신 **실제 링크를 사용하세요**.
- 누락된 키가 컴파일 타임에 오류로 발견되도록 **메시지에 타입을 지정하세요**.

> [국제화 및 SEO 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md) 및 [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)를 확인하세요.

## TanStack Start 애플리케이션에서 use-intl을 설정하는 단계별 가이드

생성할 프로젝트 구조는 다음과 같습니다:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="의존성 설치">

TanStack Start 프로젝트에서 시작한 다음 `use-intl`을 추가합니다:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: `IntlProvider`, `useTranslations`, `useFormatter` 및 `createTranslator`(React 외부, 예를 들어 `head()` 등에서 사용 가능)를 제공합니다.

</Step>
<Step number={2} title="로케일 설정 중앙화">

로케일 및 URL 헬퍼에 대한 단일 진실 공급원(Single source of truth)을 생성합니다. 다른 모든 파일(라우트, SEO, 사이트맵, 사전 렌더링)이 이를 import하므로, 로케일 추가가 단 한 줄 변경으로 가능합니다.

기본 로케일은 접두사 없이 유지되고(`/about`), 다른 로케일에는 접두사가 붙습니다(`/fr/about`). 이는 "필요 시 접두사 추가(as-needed)" 전략입니다: 로케일별 페이지당 하나의 URL을 유지하면서 주 사용자층에게는 짧은 URL을 제공합니다.

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
<Step number={3} title="번역 파일 생성">

로케일별, 네임스페이스별로 메시지를 정리합니다. `common`에는 모든 페이지에 필요한 요소(내비게이션, 푸터)를 담고, 각 페이지는 메타데이터를 포함한 자체 파일을 갖습니다.

use-intl은 **ICU MessageFormat**을 사용하므로 복수형, select 및 포맷된 인자가 메시지 자체에 포함됩니다.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

동일한 방식으로 `metadata` 객체와 페이지 콘텐츠를 포함하는 `home.json`을 생성하세요.

</Step>
<Step number={4} title="네임스페이스 및 로케일별 메시지 로드">

이 로더는 성능 측면에서 가장 중요한 파일입니다. `import.meta.glob`은 Vite가 **JSON 파일당 하나의 청크**를 생성하도록 지시합니다. 프랑스어로 `["about"]`을 요청하는 라우트는 `messages/fr/about.json`만 다운로드하고 다른 파일은 다운로드하지 않으므로, 벤치마크에서 0% 로케일 누출 및 0% 페이지 누출을 달성할 수 있습니다.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="메시지 타입 정의">

모듈 보강(Module augmentation)을 통해 `useTranslations("about")` 및 `t("counter.label")`에서 자동 완성을 제공하고, 오타나 삭제된 키에 대해 컴파일 오류를 발생시킵니다.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

`tsconfig.json`에서 `resolveJsonModule`이 활성화되어 있는지 확인하세요.

</Step>
<Step number={6} title="루트 문서 생성">

루트 라우트는 `<html>`을 렌더링합니다. 선택적 로케일 파라미터를 읽어 `lang` 및 `dir`을 설정하므로, 자바스크립트가 실행되기 전 서버에서 렌더링된 HTML에서 속성이 올바르게 설정됩니다.

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
  // strict: false reads params from whichever route is matched
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

`{-$locale}` 폴더는 **선택적(optional)** 경로 세그먼트를 생성합니다: `/about`과 `/fr/about`은 모두 `/{-$locale}/about`과 매칭됩니다. 이 레이아웃은:

1. 지원되지 않는 접두사를 거부합니다 (`/xx/about` → 404).
2. 현재 로케일에 대한 `common` 네임스페이스만 로드합니다.
3. `IntlProvider`를 통해 메시지를 제공합니다.

로더 결과는 HTML로 직렬화되어 하이드레이션 시 재사용되므로 클라이언트가 `common.json`을 다시 다운로드하지 않습니다. `staleTime: Infinity`는 클라이언트 내비게이션 전반에서 이를 캐시된 상태로 유지합니다.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider`는 부모 프로바이더의 메시지를 병합하지 않습니다. 다음 단계에서 이를 병합하는 작은 컴포넌트를 추가하여 각 페이지가 `common` 위에 자체 네임스페이스를 추가할 수 있도록 합니다.

</Step>
<Step number={8} title="페이지 메시지 스코프 지정">

각 페이지는 자체 로더에서 해당 네임스페이스를 로드한 다음 콘텐츠를 `ScopedMessages`로 감싸서 페이지 네임스페이스를 부모 메시지와 병합합니다.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="페이지에서 번역 사용하기">

페이지 로더는 현재 로케일에 대한 `about` 네임스페이스를 가져오고, `head()`는 이를 바탕으로 번역되고 SEO가 완성된 메타데이터를 구성하며(13단계 참조), 컴포넌트가 콘텐츠를 렌더링합니다.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="컴포넌트에서 번역 및 포매터 사용하기">

프로바이더 하위의 모든 컴포넌트는 `useTranslations` 및 `useFormatter`를 호출할 수 있습니다. 복수형은 ICU에 의해 처리되고, 숫자는 활성 로케일에 맞게 포맷됩니다.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="현지화된 링크 컴포넌트 구축하기" isOptional={true}>

모든 라우트는 `{-$locale}` 아래에 위치하므로 링크는 현재 로케일 파라미터를 전달해야 합니다. 이 래퍼는 TanStack Router의 타입 안전한 `to` 속성을 유지하면서 로케일을 자동으로 주입합니다.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="콘텐츠 언어 변경하기" isOptional={true}>

언어 전환기를 `<select>`가 아닌 **링크**로 렌더링하세요. 링크는 크롤링이 가능하므로 검색 엔진이 모든 언어 버전을 찾을 수 있으며 자바스크립트 없이도 작동합니다. `to="."`는 현재 페이지를 유지하고 로케일 파라미터만 교체합니다. 쿠키는 16단계의 리디렉션 미들웨어를 위해 명시적인 선택을 기억합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
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
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
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
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="메타데이터 국제화" isOptional={true}>

이것이 i18n의 진정한 가치입니다: 각 언어 버전이 개별적으로 검색 순위에 오를 수 있습니다. 모든 페이지는 다음을 제공해야 합니다:

- **번역된** `<title>` 및 `description`;
- 기본 로케일이 아닌 자기 자신을 가리키는 **표준(canonical)** URL;
- **로케일당 하나의 `hreflang` 대체 링크** 및 일치하지 않는 언어를 위한 **`x-default`**;
- 소셜 미리보기에서 사용되는 **Open Graph** `og:locale`, `og:locale:alternate` 및 `og:url`;
- 검색 엔진과 AI 어시스턴트가 페이지 언어를 인식하는 데 도움을 주는 `inLanguage`가 포함된 **JSON-LD**.

단일 헬퍼가 이 모든 것을 생성하므로 페이지 코드를 간결하게 유지할 수 있습니다:

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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
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

9단계에서 보았듯이 모든 페이지의 `head()`에서 이를 사용하세요. 홈 페이지의 경우 `path: "/"`를 전달하세요.

</Step>
<Step number={14} title="사이트맵 국제화" isOptional={true}>

다국어 사이트맵은 **모든 로케일의 모든 URL**을 나열하고, 각 항목은 `xhtml:link`를 통해 모든 대체 링크를 선언합니다. 구글은 이 주석을 페이지의 `hreflang` 태그와 똑같이 취급하므로 페이지가 자주 크롤링되지 않을 때 안정적인 백업 역할을 합니다.

TanStack Start 서버 라우트를 사용하면 파일 라우트에서 이를 직접 제공할 수 있습니다:

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

</Step>
<Step number={15} title="robots.txt 국제화" isOptional={true}>

비공개 경로는 모든 언어로 존재하므로 `Disallow` 규칙이 모든 접두사를 포함해야 합니다. 스타터 템플릿이 `public/robots.txt`를 생성했다면 이를 제거한 다음 라우트에서 제공하세요:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

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
<Step number={16} title="처음 방문하는 사용자를 해당 언어로 리디렉션하기" isOptional={true}>

요청 미들웨어는 로케일 쿠키를 우선 확인한 후 `Accept-Language` 헤더를 기반으로 `/`에 접속한 방문자를 선호 언어로 이동시킵니다. `/`만 리디렉션됩니다: 딥 링크는 건드리지 않으므로 공유된 URL과 크롤러는 항상 요청한 페이지를 그대로 받습니다.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

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

> 전환기에서 명시적으로 영어를 선택한 방문자는 쿠키에 `locale=en`이 저장되므로 다시는 리디렉션되지 않습니다. 완전 정적 배포(18단계)에서는 `/`가 파일로 제공되므로 이 미들웨어가 실행되지 않지만, 페이지는 여전히 접근 가능하고 전환기가 나머지 역할을 수행하므로 문제 없습니다.

</Step>
<Step number={17} title="use-intl API를 유지하면서 Intlayer로 런타임 줄이기" isOptional={true}>

벤치마크에 따르면 use-intl 설정에서 가장 무거운 부분은 런타임 자체(~76 KB gzip)입니다. [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md) 호환 어댑터는 **동일한 API**(`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, ICU 복수형, `t.rich`)를 제공하면서 컴파일된 Intlayer 딕셔너리로부터 이를 제공합니다: 컴포넌트 변경 없이 **~75.9 KB 대신 ~6.7 KB**, 0% 로케일 누출 및 0% 페이지 누출을 달성합니다.

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Vite 플러그인이 `use-intl`을 어댑터로 별칭(alias) 지정하므로 기존 import가 그대로 작동합니다:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

[JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md) 덕분에 JSON 파일이 단일 진실 공급원으로 유지됩니다:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> 이 어댑터는 원활한 마이그레이션 경로이기도 합니다: 어댑터가 실행되면 컴포넌트를 네이티브 `useIntlayer` API로 하나씩 점진적으로 이전할 수 있습니다. [Intlayer TanStack Start 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)를 참조하세요.

</Step>
<Step number={18} title="모든 로케일 사전 렌더링하기" isOptional={true}>

정적 HTML은 제공할 수 있는 가장 빠른 페이지이자 색인하기 가장 쉬운 형태입니다. 모든 현지화된 경로를 나열하여 TanStack Start가 빌드 타임에 사이트맵 및 robots 파일과 함께 모든 언어 버전을 사전 렌더링하도록 설정하세요:

```ts fileName="vite.config.ts"
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
  ],
});
```

로케일 전환기가 실제 링크를 렌더링하므로 `crawlLinks: true`는 목록에 누락된 페이지도 자동으로 감지합니다.

</Step>
<Step number={19} title="현지화된 404 페이지 처리하기" isOptional={true}>

7단계의 레이아웃은 알 수 없는 로케일 접두사에 대해 이미 `notFound()`를 발생시킵니다. 로케일 내부의 알 수 없는 경로도 현지화된 404를 렌더링하도록 catch-all 라우트를 추가하고 `noindex`로 표시하세요: React 19는 `<meta>` 태그를 `<head>`로 호이스팅합니다.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="서버 함수에서 로케일에 접근하기" isOptional={true}>

서버 함수는 라우트 파라미터를 받지 않습니다. 현지화된 이메일을 보내거나 언어 환경설정을 저장하려면 로케일 쿠키를 읽고 `Accept-Language` 헤더로 폴백하세요:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

서버 함수 내부에서 번역하려면 이를 `use-intl`의 `loadMessages` 및 `createTranslator`와 결합하세요.

</Step>
<Step number={21} title="Intlayer를 활용한 번역 자동화" isOptional={true}>

use-intl은 번역을 렌더링하지만 번역을 **생성**하는 데는 도움이 되지 않습니다. Intlayer는 **무료**이자 **오픈 소스**이며, use-intl을 계속 사용하더라도 이 공백을 채워줍니다:

- CI 또는 단위 테스트에서 **누락된 번역 테스트**. [번역 테스트 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)를 참조하세요.
- 자체 API 키와 프로바이더를 사용하여 **AI로 번역**: `npx intlayer fill`은 앱의 컨텍스트에 맞게 누락된 키를 번역합니다. [자동 채우기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md) 및 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참조하세요.
- [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)을 통해 **JSON 파일을 진실 공급원으로 유지**.
- [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 및 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)로 **콘텐츠를 시각적으로 편집**하여 비개발자도 번역을 업데이트할 수 있도록 지원.
- [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md) 및 [에이전트 스킬](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)을 통해 **AI 에이전트에 컨텍스트 제공**.
- [scan 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/scan.md)로 **배포된 사이트에서 누락된 `hreflang`, 잘못된 canonical 및 로케일 누출 검사**.

모든 기능을 살펴보려면 [Intlayer를 선택해야 하는 이유](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 확인하세요.

</Step>
</Steps>

## 자주 묻는 질문

<FAQ>

<Question title="TanStack Start에 use-intl은 좋은 선택인가요?">

네, Next.js 외부에서 `next-intl` API를 사용하고 싶다면 좋은 선택입니다. ICU 메시지, 포매터, 우수한 TypeScript 지원을 제공하며 `setRequestLocale`과 같은 Next.js 전용 제약 사항을 피할 수 있습니다. 단점은 번들 무게입니다: [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)에 따르면 런타임 크기가 약 76 KB gzip에 달하며 단순한 설정에서는 모든 로케일과 모든 페이지가 브라우저로 전송됩니다. 이러한 누출을 방지하려면 본 가이드처럼 라우트 및 로케일별로 네임스페이스를 로드하세요.

</Question>
<Question title="use-intl과 next-intl의 차이점은 무엇인가요?">

`use-intl`은 `next-intl`의 핵심 코어입니다. `next-intl`은 그 위에 미들웨어, 내비게이션 헬퍼, Server Components용 `getTranslations`, 요청 구성 등 Next.js 전용 통합 기능을 추가합니다. TanStack Start에서는 `use-intl`을 직접 사용하고 위에서 설명한 대로 TanStack Router를 사용하여 라우팅을 구현합니다.

</Question>
<Question title="언어 저장을 위해 로케일 접두사를 사용해야 하나요, 아니면 쿠키를 사용해야 하나요?">

URL에 접두사를 사용하는 것이 좋습니다. 그러면 각 언어 버전이 검색 엔진에서 색인하고 사용자가 공유할 수 있는 자체 URL을 갖게 됩니다. 쿠키는 명시적인 선택을 기억하는 용도로 여전히 유용하며, 이것이 16단계의 리디렉션 미들웨어가 하는 역할입니다.

</Question>
<Question title="날짜 포맷 시 하이드레이션 불일치가 발생하는 이유는 무엇인가요?">

서버와 브라우저가 서로 다른 시간대에서 날짜를 포맷하기 때문입니다. `IntlProvider`에 명시적인 `timeZone`(또는 쿠키에 저장된 방문자의 시간대)을 전달하여 양쪽에서 동일한 텍스트를 생성하도록 하세요.

</Question>
<Question title="use-intl의 번들 크기를 줄이려면 어떻게 해야 하나요?">

먼저 메시지를 네임스페이스별로 분할하고 `import.meta.glob`을 사용하여 경로 및 로케일별로 로드하면 로케일 및 페이지 누출이 제거됩니다. 그래도 런타임 크기가 중요하다면 [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md) 어댑터로 전환하세요: 동일한 API를 제공하면서 벤치마크 기준 약 75.9 KB 대신 약 6.7 KB로 줄어듭니다.

</Question>
<Question title="use-intl로 title과 meta description을 번역하려면 어떻게 해야 하나요?">

라우트 로더가 반환한 메시지와 함께 라우트 `head()` 함수 내부에서 `createTranslator`를 호출한 다음 `title`, `description`, canonical 및 `hreflang` 링크를 반환하세요. 13단계에서 재사용 가능한 헬퍼를 제공합니다.

</Question>
<Question title="use-intl에서 Intlayer로 점진적으로 마이그레이션할 수 있나요?">

네. 먼저 호환 어댑터를 설치하면(17단계): 컴포넌트는 Intlayer를 기반으로 계속 `useTranslations`를 호출합니다. 그 후 컴포넌트를 한 번에 하나씩 `useIntlayer`로 이동하고 콘텐츠를 컴포넌트 옆에 선언하세요. [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md) 및 [Intlayer TanStack Start 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)를 참조하세요.

</Question>

</FAQ>
