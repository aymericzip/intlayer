---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Lingui를 활용한 Next.js 16 i18n: App Router 설정 가이드"
description: "Next.js 16 App Router에서 Lingui 설정하기: Server Components, SWC 매크로, 프록시 라우팅, generateMetadata, hreflang, sitemap 및 robots.txt, 벤치마크 데이터 포함."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - 국제화
  - i18n
  - SEO
  - 블로그
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "초기 버전"
author: aymericzip
---

# 2026년에 Lingui를 사용하여 Next.js 애플리케이션 국제화하는 방법

## 목차

<TOC/>

## Lingui란 무엇인가요?

**Lingui**는 **매크로**와 **메시지 추출(extraction)**을 중심으로 구축된 i18n 라이브러리입니다. 컴포넌트 내에 원본 텍스트(`` t`Hello` ``, `<Trans>Hello</Trans>`)를 작성하면, `lingui extract`가 모든 메시지를 카탈로그(기본값은 PO 파일)로 수집하고, 로더가 이를 컴팩트한 JavaScript로 컴파일합니다. 메시지는 ICU MessageFormat을 사용하며, Lingui는 App Router의 **React Server Components**를 지원합니다.

이 가이드에서는 **Next.js 16 App Router** 프로젝트에서 Lingui를 다음과 같이 설정합니다:

- **SWC로 컴파일되는 매크로**로 Turbopack의 빠른 속도 유지.
- **서버 및 클라이언트 컴포넌트**가 동일한 `Trans` 및 `useLingui` API 공유.
- `proxy.ts`를 통한 **로케일 라우팅**: 기본 로케일은 `/about`, 기타 로케일은 `/fr/about`으로 처리하며 첫 방문 시 언어 감지.
- `generateStaticParams`를 통한 모든 로케일의 **정적 렌더링**.
- **완벽한 다국어 SEO**: 번역된 `generateMetadata`, canonical, `x-default`가 포함된 `hreflang`, Open Graph 로케일, JSON-LD, `sitemap.ts`, `robots.ts` 및 현지화된 404 페이지.

> 다른 라이브러리를 찾고 계신가요?

- [next-intl 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-intl.md)
- [next-i18next 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-i18next.md)
- [Next.js + Intlayer 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)

> TanStack Start를 사용 중이신가요?

- [TanStack Start + Lingui 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_lingui.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)

> 이러한 라이브러리가 어디에서 왔는지 이해하려면 JavaScript i18n의 역사를 읽어보세요.

- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)

## Next.js에서 Lingui에 대한 벤치마크 결과

[i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)는 동일한 10개 페이지, 10개 로케일의 Next.js 앱을 주요 라이브러리로 실행하여 브라우저가 실제로 다운로드하는 크기를 측정합니다.

- [i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

2026-09-26 기준 Next.js 16에서의 `@lingui/core@6.6.0` 주요 수치 (gzip):

| 설정                                | 라이브러리 크기 | 페이지당 JS | 타 로케일 누출 | 타 페이지 누출 |
| :---------------------------------- | --------------: | ----------: | -------------: | -------------: |
| i18n 미적용 (기본 앱)               |               - |    141.0 KB |             0% |             0% |
| Lingui, 로케일당 단일 카탈로그      |         72.1 KB |    145.4 KB |           2.8% |          89.9% |
| `@intlayer/lingui` (호환 어댑터)    |         10.7 KB |    221.6 KB |            50% |            90% |
| `next-intlayer` (네이티브 Intlayer) |          4.9 KB |    141.5 KB |             0% |             0% |

핵심 요점:

- **로케일당 단일 카탈로그를 사용하더라도 다른 페이지의 메시지가 클라이언트 공급자로 누출**됩니다. 카탈로그 대신 렌더링된 HTML을 전송하는 서버 컴포넌트에 가능한 많은 텍스트를 유지하세요.
- **Lingui 런타임 크기는 gzip 기준 약 72 KB입니다.** `@intlayer/lingui` 호환 어댑터는 런타임을 약 11 KB로 줄여주지만, 이 벤치마크에서는 Next.js 호환 설정이 여전히 전체 카탈로그를 페이지로 전달합니다. 기본 앱 크기를 유지하는 설정은 네이티브 `next-intlayer` API입니다.

> 전체 데이터 확인: [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md) 및 [벤치마크 저장소](https://github.com/intlayer-org/benchmark-i18n).

- [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)

## Next.js 기능 비교

Next.js App Router 프로젝트에서 일반적으로 필요한 기능에 대해 Lingui, `next-intl`, Intlayer를 비교한 결과입니다:

| 기능                             | `next-intlayer` (Intlayer)                         | Lingui                                                     | `next-intl`                                   |
| -------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------- |
| **컴포넌트 인근 번역 배치**      | ✅ 각 컴포넌트와 함께 배치                         | ⚠️ 컴포넌트 내 원본 텍스트, 카탈로그는 중앙 집중식         | ❌ 중앙 집중식 JSON                           |
| **TypeScript 통합**              | ✅ 자동 생성되는 엄격한 타입                       | ⚠️ 매크로는 타입 지원, 메시지 카탈로그는 미지원            | ✅ `AppConfig` 확장을 통한 우수한 지원        |
| **누락된 번역 감지**             | ✅ TypeScript 에러 및 빌드 타임 경고               | ⚠️ 원본 텍스트로의 런타임 폴백                             | ⚠️ 런타임 폴백                                |
| **리치 콘텐츠 (JSX, Markdown)**  | ✅ 직접 지원                                       | ✅ `<Trans>` 내부의 JSX 지원, Markdown 미지원              | ⚠️ `t.rich`를 통한 태그 지원, Markdown 미지원 |
| **AI 번역**                      | ✅ 앱 컨텍스트를 활용한 자체 공급자 및 API 키 지원 | ❌ 미지원                                                  | ❌ 미지원                                     |
| **시각적 편집기 / CMS**          | ✅ 로컬 시각적 편집기 + 선택적 CMS                 | ❌ 외부 플랫폼 필요                                        | ❌ 외부 플랫폼 필요                           |
| **현지화된 라우팅**              | ✅ 내장 지원                                       | ❌ 직접 `proxy.ts` 작성 필요                               | ✅ 내장 `[locale]` 세그먼트                   |
| **복수형 처리(Pluralization)**   | ✅ 열거형(Enumeration) 기반                        | ✅ ICU, `<Plural>` 매크로                                  | ✅ ICU                                        |
| **콘텐츠 포맷**                  | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`   | ✅ PO, JSON, CSV                                           | ✅ `.json`, `.js`, `.ts`                      |
| **ICU MessageFormat**            | ✅ `format: "icu"` 지원                            | ✅ 네이티브 지원                                           | ✅ 네이티브 지원                              |
| **SEO 헬퍼 (hreflang, sitemap)** | ✅ 메타데이터, sitemap, robots.txt 헬퍼 제공       | ❌ 수동 구현                                               | ✅ 우수한 지원                                |
| **서버 컴포넌트**                | ✅ 모든 서버 컴포넌트에서 직접 접근 가능           | ⚠️ 모든 레이아웃 및 페이지에서 `setI18n` 필요              | ⚠️ 컴포넌트마다 `await getTranslations()`     |
| **컴포넌트별 트리 쉐이킹**       | ✅ 빌드 타임 지원 (Babel / SWC)                    | ⚠️ 로케일당 하나의 카탈로그, 페이지별 추출기는 실험적 기능 | ⚠️ 라우트별 `pick()`을 통한 수동 처리         |
| **런타임 크기 (gzip, 벤치마크)** | 4.9 KB                                             | 72.1 KB                                                    | 14.7 KB                                       |
| **CI에서의 번역 누락 검사**      | ✅ `npx intlayer test`                             | ✅ `lingui compile --strict`                               | ⚠️ 내장 기능 없음                             |
| **생태계 / 커뮤니티**            | ⚠️ 상대적으로 작지만 빠르게 성장 중                | ✅ 성숙함                                                  | ✅ 대규모                                     |

> 런타임 크기는 [Next.js 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)에서 가져왔습니다. 자세한 내용은 [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md)를 읽어보세요.

- [Next.js 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md)

> 다른 Next.js 가이드:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)

## 권장 모범 사례

- `[locale]` 레이아웃의 **`<html>`에 `lang`과 `dir`을 설정하세요**.
- 텍스트에는 **서버 컴포넌트를 선호하세요**: 서버에서 HTML을 렌더링하므로 클라이언트에 카탈로그를 보낼 필요가 없습니다.
- **모든 레이아웃과 페이지에서 `initLingui(locale)`를 호출하세요.** 레이아웃은 페이지 이동 시 다시 렌더링되지 않으므로, 페이지가 레이아웃의 로케일 설정을 그대로 신뢰할 수 없습니다.
- **로케일당 하나의 URL을 유지**하고 `generateStaticParams`로 모든 로케일을 사전 렌더링하세요.
- `generateMetadata`에서 `canonical`, `hreflang`, `x-default`와 함께 **메타데이터를 번역하세요**.
- `sitemap.ts` 및 `robots.ts` 규칙을 사용하여 **다국어 사이트맵과 robots.txt를 생성하세요**.
- 검색 크롤러가 모든 언어를 발견할 수 있도록 **로케일 전환기에 실제 링크를 사용하세요**.
- 새 메시지가 번역되지 않은 상태로 배포되지 않도록 **CI에서 `lingui extract`를 실행하세요**.

- [국제화 및 SEO 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md)
- [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)
- [Next.js 다국어 SEO 비교](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/nextjs-multilingual-seo-comparison.md)

## Next.js 애플리케이션에서 Lingui를 설정하는 단계별 가이드

생성할 프로젝트 구조는 다음과 같습니다:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # 로케일 라우팅 및 감지
    ├── locales
    │   ├── en
    │   │   └── messages.po         # `lingui extract`로 생성됨
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # 로케일, URL 헬퍼
    │   ├── appRouterI18n.ts        # 서버 전용 카탈로그 및 인스턴스
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # generateMetadata 빌더
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # 알 수 없는 경로를 위한 현지화된 404
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="의존성 설치">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: 런타임, `I18nProvider`, 서버 컴포넌트용 `setI18n`, 그리고 매크로(`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: Next.js SWC 파이프라인 내에서 매크로를 컴파일합니다.
- **@lingui/loader**: import 시 `.po` 카탈로그를 컴파일하므로 `lingui compile`을 별도로 실행할 필요가 없습니다.
- **@lingui/cli**: 메시지를 카탈로그로 수집하는 `lingui extract` 명령어 제공.

> `@lingui/swc-plugin`은 Next.js의 SWC 버전에 종속된 WebAssembly 플러그인입니다. Next.js 업그레이드 후 빌드가 실패하면, 해당 README에 명시된 호환 버전으로 플러그인을 업데이트하세요.

</Step>
<Step number={2} title="로케일 구성 중앙 집중화">

단일 파일에서 로케일과 URL 헬퍼를 정의합니다. 라우팅, 메타데이터, 사이트맵 및 Lingui가 모두 이 파일을 참조합니다.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Canonical URL, hreflang, sitemap에 사용되는 공개 오리진입니다. */
export const siteUrl = "https://example.com";

/** 방문자가 명시적으로 선택한 로케일을 저장하는 쿠키입니다. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph는 `language_TERRITORY` 코드를 사용합니다. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, 기본 로케일은 접두사 없음. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui 및 Next.js 구성">

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

SWC 플러그인이 매크로를 컴파일하고, 로더가 `.po` 파일을 컴파일하므로 Turbopack(Next.js 16 기본값)과 webpack 모두에서 작동합니다:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

메시지 추출 스크립트를 추가합니다:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="카탈로그 로드 및 서버 인스턴스 생성">

서버 컴포넌트에는 React 컨텍스트가 없으므로, Lingui는 현재 렌더링에 인스턴스를 등록하기 위한 `setI18n`을 제공합니다. 이 모듈은 **서버 프로세스당 한 번** 모든 카탈로그를 로드하고 로케일당 하나의 `I18n` 인스턴스를 생성합니다. 이 파일은 `server-only`이므로 다른 로케일의 카탈로그가 클라이언트 번들에 포함되지 않습니다.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * 현재 서버 컴포넌트 렌더링을 위해 인스턴스를 등록합니다.
 * 모든 레이아웃과 페이지에서 호출해야 합니다.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

TypeScript가 `.po` 파일 import를 인식할 수 있도록 모듈 선언을 추가합니다:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="클라이언트 Provider 생성">

클라이언트 컴포넌트는 React 컨텍스트에서 번역을 읽습니다. Provider는 서버 레이아웃으로부터 활성 로케일의 카탈로그를 전달받아 자체 인스턴스를 한 번 생성합니다.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="동적 로케일 라우트 정의">

`[locale]` 세그먼트는 루트 레이아웃을 포함합니다. `generateStaticParams`는 빌드 시 모든 로케일을 미리 렌더링하고, `dynamicParams = false`는 정의되지 않은 다른 접두사에 대해 404를 반환합니다.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// 알 수 없는 접두사 (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // 상대 경로 canonical 및 Open Graph URL 처리
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> 클라이언트 Provider는 활성 로케일의 전체 카탈로그를 전달받습니다. 이것이 벤치마크에서 "타 페이지 누출"로 측정되는 부분입니다. 텍스트를 서버 컴포넌트에 유지하면 클라이언트에 실제로 필요한 양을 줄일 수 있습니다. 대규모 앱의 경우, Lingui의 실험적 페이지별 추출기(`lingui.config.ts`의 `experimental.extractor`)를 통해 엔트리 포인트별로 카탈로그를 분할할 수 있습니다.

</Step>
<Step number={7} title="서버 컴포넌트에서 번역 활용하기">

서버 컴포넌트는 클라이언트 컴포넌트와 동일한 매크로를 사용합니다. 페이지 간 이동 시 레이아웃이 다시 렌더링되지 않으므로, 페이지 컴포넌트에서도 `initLingui`를 반드시 실행해야 합니다.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="클라이언트 컴포넌트에서 번역 활용하기">

클라이언트 컴포넌트도 동일한 import 방식을 사용합니다. 매크로는 `LinguiClientProvider`에서 인스턴스를 읽어옵니다.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="메시지 추출 및 번역">

메시지 추출을 실행합니다. Lingui가 `src`에서 발견된 모든 메시지를 각 로케일 카탈로그에 기록합니다:

```bash
npm run i18n:extract
```

그런 다음 각 항목의 `msgstr`을 번역합니다:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> `<0>` 플레이스홀더는 `<Trans>` 내부의 JSX 요소를 유지해 주므로, 번역가는 마크업을 건드리지 않고도 위치를 조정할 수 있습니다.

</Step>
<Step number={10} title="로케일 라우팅을 위한 프록시 설정" isOptional={true}>

Next.js 16에서는 `middleware.ts`의 명칭이 `proxy.ts`로 변경되었습니다. 프록시는 "필요에 따른(as-needed)" 접두사 전략을 구현합니다:

- `/fr/about`은 그대로 제공됩니다.
- `/en/about`은 `/about`으로 리디렉션되므로 기본 로케일은 단일 URL을 갖습니다.
- `/about`은 URL 변경 없이 내부적으로 `/en/about`으로 rewrite됩니다.
- `/`로의 첫 방문은 선호 언어(쿠키 우선, 그 다음 `Accept-Language`)로 리디렉션됩니다.

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: 기본 로케일을 위한 단일 URL 유지
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // "/" 첫 방문: 사용자가 선호하는 언어로 이동
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → /en/about으로 제공되며 URL은 유지됨
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // API 라우트, Next.js 내부 파일, 정적 파일(sitemap.xml, robots.txt 등) 제외
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="콘텐츠 언어 전환하기" isOptional={true}>

`usePathname`은 브라우저에 표시되는 URL(`/about` 또는 `/fr/about`)을 반환합니다. 로케일을 제거한 다음 각 언어별 링크를 빌드합니다. 전환기는 실제 링크를 렌더링하므로 크롤러가 각 언어 버전에 접근할 수 있으며, 쿠키를 통해 명시적인 선택을 기억합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="현지화된 Link 컴포넌트 만들기" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** 로케일 접두사가 없는 경로 (예: "/about") */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

`LinguiClientProvider` 내부에서 렌더링되므로 서버 컴포넌트에서도 원활하게 작동합니다:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="메타데이터 국제화" isOptional={true}>

모든 페이지가 다음 항목들을 올바르게 제공하면 각 언어 버전이 독립적으로 검색 순위에 반영될 수 있습니다:

- **번역된** `title` 및 `description`;
- 자체를 가리키는 **canonical** URL;
- **로케일당 하나의 `hreflang` 대체 링크** 및 **`x-default`**;
- **Open Graph**의 `locale`, `alternateLocale`, `url`;
- `inLanguage`가 포함된 **JSON-LD**.

`generateMetadata`는 React 트리 외부에서 실행되므로, `msg` 매크로와 함께 서버 인스턴스를 직접 사용합니다:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** 로케일 접두사가 없는 경로 (예: "/about") */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... 7단계의 페이지 컴포넌트
```

JSON-LD는 페이지 자체에서 렌더링됩니다. 페이지 파일은 Next.js 필드만 export할 수 있으므로, 컴포넌트는 별도 파일로 분리합니다:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// AboutContent 내부
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="사이트맵 국제화" isOptional={true}>

`sitemap.ts` 규약은 `alternates.languages`를 지원하며, Next.js는 이를 `xhtml:link` 대체 항목으로 렌더링합니다. 모든 로케일의 각 URL을 나열합니다:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="robots.txt 국제화" isOptional={true}>

비공개 경로는 모든 언어에 존재하므로 `disallow`에 모든 현지화된 경로가 포함되어야 합니다:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="현지화된 404 페이지 처리" isOptional={true}>

`not-found.tsx`는 `[locale]` 레이아웃 내부에서 렌더링되므로 클라이언트 Provider에 접근할 수 있습니다. Catch-all 라우트는 로케일 내부의 알 수 없는 경로를 404로 전달합니다. Next.js는 404 응답에 자동으로 `noindex`를 추가합니다.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → 현지화된 not-found.tsx로 이동
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Server Actions에서 로케일 접근하기" isOptional={true}>

Server Actions는 라우트 파라미터를 직접 받지 않습니다. 가장 안정적인 방법은 로케일을 알고 있는 페이지의 폼에 로케일 값을 포함하여 전송하는 것입니다:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="매크로는 유지하고, Intlayer로 런타임 크기 줄이기" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md) 호환 어댑터를 사용하면 소스 코드를 수정하지 않고 그대로 유지할 수 있습니다. 매크로는 이전과 동일하게 컴파일되며, 생성된 `i18n._()`, `useLingui()`, `<Trans>` 호출은 Intlayer 딕셔너리를 통해 제공됩니다. Next.js 벤치마크에서 런타임 크기는 gzip 기준 **약 72.1 KB에서 약 10.7 KB**로 감소합니다.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)

Next.js에서는 `next.config.ts`(webpack 및 Turbopack)에서 `@lingui/core`와 `@lingui/react`를 `@intlayer/lingui`로 alias하고, `next-intlayer/server`의 `withIntlayer`로 설정을 래핑하여 어댑터를 연결합니다. 매크로가 먼저 컴파일될 수 있도록 `@lingui/swc-plugin`은 유지하세요. 전체 설정 방법은 [Lingui 호환 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)에 설명되어 있습니다.

- [Lingui 호환 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)

벤치마크 표에서 알 수 있듯이, 어댑터는 런타임 크기를 줄여주지만 Next.js에서 각 페이지로 전송되는 카탈로그 크기까지 완전히 줄이지는 못합니다. 따라서 마이그레이션 브리지로 활용하는 것이 가장 좋습니다. 일단 동작을 확인한 후 각 컴포넌트가 렌더링하는 콘텐츠만 전송하는 네이티브 `useIntlayer` API로 컴포넌트를 점진적으로 전환하세요. [Next.js + Intlayer 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer-lingui.md) 및 모든 [호환 어댑터 목록](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)을 확인하세요.

- [Next.js + Intlayer 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer-lingui.md)
- [호환 어댑터 목록](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)

</Step>
<Step number={19} title="Intlayer를 활용한 번역 자동화" isOptional={true}>

Lingui는 메시지를 추출하지만, 수십 개의 카탈로그를 직접 채우는 작업에 대부분의 시간이 소요됩니다. Intlayer는 **무료** 및 **오픈 소스**이며, 그 도구들은 Lingui와 함께 사용할 수 있습니다:

- 자체 API 키와 공급자를 사용하여 **AI로 번역**할 수 있습니다. [자동 완성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md) 및 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 확인하세요.
- [PO 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)을 사용하여 **PO 파일을 단일 진실 공급원(Source of Truth)**으로 유지할 수 있습니다.
- CI에서 **누락된 번역을 테스트**할 수 있습니다. [번역 테스트 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)를 참고하세요.
- [scan 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/scan.md)를 사용하여 배포된 사이트에서 누락된 `hreflang`, 잘못된 canonical, 로케일 누출 등을 **감사(Audit)**할 수 있습니다.

</Step>
</Steps>

## 자주 묻는 질문 (FAQ)

<FAQ>

<Question title="Lingui는 Next.js App Router와 Server Components를 지원하나요?">

네, 지원합니다. `@lingui/react`는 React Server Components를 지원합니다. 서버 컴포넌트는 `@lingui/react/server`의 `setI18n`을 사용하여 인스턴스를 등록하고, 클라이언트 컴포넌트는 `I18nProvider`에서 이를 읽어오며, 두 환경 모두 동일한 `Trans` 및 `useLingui` 매크로를 사용합니다.

</Question>
<Question title="왜 모든 페이지와 레이아웃에서 initLingui를 호출해야 하나요?">

서버 컴포넌트에는 컨텍스트가 없으므로 인스턴스가 렌더링 단위로 등록됩니다. 레이아웃은 페이지 이동 간에 보존되어 다시 렌더링되지 않으므로, 페이지가 레이아웃에서 설정한 로케일에 의존할 수 없습니다. 각 레이아웃과 페이지 상단에서 `initLingui(locale)`를 호출하면 서로 독립적으로 동작할 수 있습니다.

</Question>
<Question title="Next.js에서 SWC 플러그인과 Babel 중 어떤 것을 사용해야 하나요?">

`@lingui/swc-plugin`을 사용하세요. 이를 통해 SWC 파이프라인과 Turbopack을 유지할 수 있습니다. Babel 구성을 추가하면 Next.js에서 SWC가 비활성화되어 빌드 속도가 느려집니다. 유일하게 신경 써야 할 점은 플러그인 버전이 사용하는 Next.js 릴리스의 SWC 버전과 호환되도록 유지하는 것입니다.

</Question>
<Question title="Lingui에서 generateMetadata를 어떻게 번역하나요?">

`getI18nInstance(locale)`로 서버 인스턴스를 가져온 뒤, `msg` 매크로로 선언된 디스크립터를 번역합니다: ``i18n._(msg`About us`)``. 그런 다음 `alternates.canonical`, `x-default`가 포함된 `alternates.languages`, 그리고 `openGraph.locale`을 반환합니다. 13단계에서 재사용 가능한 헬퍼 함수를 제공합니다.

</Question>
<Question title="Next.js 번들에서 Lingui의 크기는 어느 정도인가요?">

[벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)에 따르면 런타임 크기는 gzip 기준 약 72 KB입니다. 로케일당 하나의 카탈로그를 사용하는 경우 페이지 크기는 i18n 미적용 시 141 KB 대비 약 145 KB이지만, 각 페이지는 여전히 클라이언트 Provider를 통해 다른 페이지의 메시지를 함께 전달받게 됩니다.

- [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)

</Question>
<Question title="Next.js에서 Lingui, next-intl, next-i18next 중 어떤 것을 선택해야 할까요?">

컴포넌트 내에 원본 텍스트를 직접 작성하고 PO 파일 및 전문 번역가와의 협업을 선호하는 팀에는 Lingui가 적합합니다. JSON 카탈로그와 Next.js에 긴밀하게 통합된 `t("key")` API를 선호한다면 next-intl이 적합합니다. i18next 플러그인 생태계를 활용하고 싶다면 next-i18next가 좋습니다. 자세한 비교는 [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md) 및 [Next.js 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)를 참고하세요.

- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)
- [Next.js 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)

</Question>
<Question title="컴포넌트를 다시 작성하지 않고 Lingui에서 Intlayer로 마이그레이션할 수 있나요?">

네, 가능합니다. [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md) 어댑터를 사용하면 매크로는 그대로 유지한 채 런타임만 교체할 수 있으며, 이후 컴포넌트를 `useIntlayer`로 점진적으로 이전할 수 있습니다. 자세한 내용은 [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 확인하세요.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)
- [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)

</Question>

</FAQ>
