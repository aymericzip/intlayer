---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: next-i18next를 사용하여 Next.js 15 번역하기 – 2025 i18n 가이드
description: i18next/next-i18next로 Next.js 15 App Router 앱을 국제화하고 Intlayer로 향상시키는 실용적이고 프로덕션 준비된 가이드입니다.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Intlayer를 사용하여 next-i18next로 Next.js 15 웹사이트 번역하기 | 국제화 (i18n)

### 이 가이드가 대상인 사용자

- **초급**: 정확한 단계를 따라하고 코드 블록을 복사하세요. 작동하는 다국어 앱을 얻을 수 있습니다.
- **중급**: 체크리스트와 모범 사례 안내를 활용하여 일반적인 실수를 피하세요.
- **고급**: 상위 구조, SEO, 자동화 섹션을 훑어보세요; 합리적인 기본값과 확장 지점을 찾을 수 있습니다.

### 구축할 내용

- 지역화된 라우트가 있는 App Router 프로젝트 (예: `/`, `/fr/...`)
- 로케일, 기본 로케일, RTL 지원이 포함된 i18n 설정
- 서버 사이드 i18n 초기화 및 클라이언트 프로바이더
- 필요에 따라 로드되는 네임스페이스 번역
- `hreflang`, 지역화된 `sitemap`, `robots`를 포함한 SEO
- 로케일 라우팅을 위한 미들웨어
- 번역 워크플로우 자동화를 위한 Intlayer 통합 (테스트, AI 채우기, JSON 동기화)

> 참고: next-i18next는 i18next 위에 구축되었습니다. 이 가이드는 App Router에서 next-i18next와 호환되는 i18next 기본 기능을 사용하며, 아키텍처를 간단하고 프로덕션 준비 상태로 유지합니다.
> 더 넓은 비교는 [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-i18next_vs_intlayer.md)를 참조하세요.

---

## 1) 프로젝트 구조

next-i18next 의존성을 설치하세요:

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

명확한 구조로 시작하세요. 메시지는 locale과 namespace별로 분리해서 유지하세요.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

체크리스트 (중급/고급):

- locale별 namespace당 하나의 JSON 파일을 유지하세요
- 메시지를 과도하게 중앙집중화하지 마세요; 작은 페이지/기능 범위의 namespace를 사용하세요
- 모든 locale을 한 번에 임포트하지 마세요; 필요한 것만 로드하세요

---

## 2) 의존성 설치

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

next-i18next API 또는 설정 연동을 사용할 계획이라면, 다음도 설치하세요:

```bash
pnpm add next-i18next
```

---

## 3) 핵심 i18n 설정

로케일, 기본 로케일, RTL, 그리고 지역화된 경로/URL을 위한 헬퍼를 정의합니다.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

시니어 노트: `next-i18next.config.js`를 사용하는 경우, `i18n.config.ts`와 일치하도록 유지하여 불일치를 방지하세요.

---

## 4) 서버 사이드 i18n 초기화

필요한 locale/namespace JSON만 동적으로 가져오는 백엔드를 사용하여 서버에서 i18next를 초기화합니다.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// src/locales/<locale>/<namespace>.json에서 JSON 리소스 로드
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

중간 노트: 페이로드를 제한하기 위해 페이지별 네임스페이스 목록을 짧게 유지하세요. 전역 “catch-all” 번들은 피하세요.

---

## 5) React 컴포넌트를 위한 클라이언트 프로바이더

서버 설정을 반영하고 요청된 네임스페이스만 로드하는 프로바이더로 클라이언트 컴포넌트를 감싸세요.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: 번들 }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

초급 팁: 모든 메시지를 클라이언트에 전달할 필요가 없습니다. 페이지의 네임스페이스만 전달하는 것으로 시작하세요.

---

## 6) 지역화된 레이아웃과 라우트

언어와 방향을 설정하고, 정적 렌더링을 우선시하기 위해 로케일별 라우트를 미리 생성합니다.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) 서버 + 클라이언트 사용 예제 페이지

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// 페이지에 대해 정적 렌더링 강제 적용
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

번역 (각 네임스페이스별로 `src/locales/...` 아래에 JSON 파일 하나씩):

```json fileName="src/locales/ko/about.json"
{
  "title": "소개",
  "description": "소개 페이지 설명",
  "counter": {
    "label": "카운터",
    "increment": "증가"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

클라이언트 컴포넌트 (필요한 네임스페이스만 로드):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> 페이지/프로바이더에는 필요한 네임스페이스(예: `about`)만 포함되도록 하세요.
> React 버전이 19 미만인 경우, `Intl.NumberFormat`과 같은 무거운 포매터는 메모이제이션하세요.

클라이언트 경계 내에 포함된 동기 서버 컴포넌트:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: 메타데이터, Hreflang, 사이트맵, 로봇

콘텐츠 번역은 도달 범위를 확장하는 수단입니다. 다국어 SEO를 철저히 구성하세요.

모범 사례:

- 루트에 `lang`과 `dir` 설정
- 각 로케일에 대해 `alternates.languages` 추가 (+ `x-default`)
- `sitemap.xml`에 번역된 URL 목록 작성 및 `hreflang` 사용
- 로컬라이즈된 비공개 영역(예: `/fr/admin`)은 `robots.txt`에서 제외

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // src/locales에서 올바른 JSON 번들 가져오기
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) 로케일 라우팅을 위한 미들웨어

로케일을 감지하고 누락된 경우 로컬라이즈된 경로로 리디렉션합니다.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // 확장자가 있는 파일 제외

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // 확장자를 가진 파일과 다음 경로로 시작하는 경로를 제외한 모든 경로와 매칭
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) 성능 및 개발자 경험(DX) 모범 사례

- **html `lang` 및 `dir` 설정**: `src/app/[locale]/layout.tsx`에서 완료됨.
- **네임스페이스별 메시지 분리**: 번들을 작게 유지 (`common.json`, `about.json` 등).
- **클라이언트 페이로드 최소화**: 페이지에서 필요한 네임스페이스만 프로바이더에 전달.
- **정적 페이지 선호**: 로케일별로 `export const dynamic = 'force-static'` 및 `generateStaticParams` 사용.
- **서버 컴포넌트 동기화**: 렌더 시점의 비동기 호출 대신 미리 계산된 문자열/포맷 전달.
- **무거운 연산 메모이제이션**: 특히 구버전 React 클라이언트 코드에서 중요.
- **캐시 및 헤더**: 가능하면 동적 렌더링보다 정적 또는 `revalidate` 사용 선호.

---

## 11) 테스트 및 CI

- `t`를 사용하는 컴포넌트에 대해 키 존재 여부를 확인하는 단위 테스트 추가.
- 각 네임스페이스가 모든 로케일에서 동일한 키를 가지고 있는지 검증합니다.
- 배포 전에 CI 과정에서 누락된 키를 표시합니다.

Intlayer가 이 작업의 대부분을 자동화해줍니다 (다음 섹션 참조).

---

## 12) Intlayer 추가하기 (자동화)

Intlayer는 JSON 번역을 동기화 상태로 유지하고, 누락된 키를 테스트하며, 필요 시 AI로 채워주는 기능을 제공합니다.

intlayer 의존성을 설치하세요:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

패키지 스크립트 추가:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

일반적인 흐름:

- CI에서 `pnpm i18n:test`를 실행하여 누락된 키가 있을 경우 빌드 실패 처리
- 로컬에서 `pnpm i18n:fill`을 실행하여 새로 추가된 키에 대해 AI 번역 제안 받기

> CLI 인수를 제공할 수 있습니다; 자세한 내용은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참조하세요.

---

## 13) 문제 해결

- **키를 찾을 수 없음**: 페이지/프로바이더가 올바른 네임스페이스를 나열하고 JSON 파일이 `src/locales/<locale>/<namespace>.json` 경로에 존재하는지 확인하세요.
- **잘못된 언어/영어 깜박임**: `middleware.ts`의 로케일 감지와 프로바이더의 `lng` 값을 다시 확인하세요.
- **RTL 레이아웃 문제**: `dir`이 `isRtl(locale)`에서 파생되었는지, 그리고 CSS가 `[dir="rtl"]`을 준수하는지 확인하세요.
- **SEO 대체 언어 누락**: `alternates.languages`에 모든 로케일과 `x-default`가 포함되어 있는지 확인하세요.
- **번들 크기 과다**: 네임스페이스를 더 세분화하고 클라이언트에서 전체 `locales` 트리를 임포트하지 않도록 하세요.

---

## 14) 다음 단계

- 기능이 확장됨에 따라 더 많은 로케일과 네임스페이스 추가
- 오류 페이지, 이메일 및 API 기반 콘텐츠 현지화
- 번역 업데이트를 위한 PR 자동 생성 기능으로 Intlayer 워크플로 확장

시작 템플릿을 원한다면 다음을 사용해 보세요: `https://github.com/aymericzip/intlayer-next-i18next-template`.
