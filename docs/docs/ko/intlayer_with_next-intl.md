---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: next-intl을 사용하여 Next.js 15 번역하기 – 2025 i18n 가이드
description: Next.js 15 App Router 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따라가세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Intlayer를 사용하여 next-intl 기반 Next.js 15 웹사이트 번역하기 | 국제화(i18n)

이 가이드는 Next.js 15 (App Router) 앱에서 next-intl의 모범 사례를 안내하며, 강력한 번역 관리 및 자동화를 위해 Intlayer를 어떻게 적용하는지 보여줍니다.

[next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md) 비교를 참고하세요.

- 주니어 개발자: 단계별 섹션을 따라가며 작동하는 다국어 앱을 만드세요.
- 중급 개발자: 페이로드 최적화와 서버/클라이언트 분리에 주의하세요.
- 시니어 개발자: 정적 생성, 미들웨어, SEO 통합, 자동화 훅에 주목하세요.

다룰 내용:

- 설정 및 파일 구조
- 메시지 로딩 최적화
- 클라이언트 및 서버 컴포넌트 사용법
- 메타데이터, 사이트맵, 로봇을 통한 SEO
- 로케일 라우팅을 위한 미들웨어
- Intlayer 추가 (CLI 및 자동화)

## next-intl을 사용하여 애플리케이션 설정하기

next-intl 의존성을 설치하세요:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### 설정 및 콘텐츠 로딩

라우트에서 필요한 네임스페이스만 로드하고 로케일을 조기에 검증하세요. 서버 컴포넌트는 가능하면 동기적으로 유지하고, 클라이언트에는 필요한 메시지만 전달하세요.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // 레이아웃/페이지에서 필요한 네임스페이스만 로드합니다
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // 이 서버 렌더링(RSC)을 위한 활성 요청 로케일 설정
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // 메시지는 서버 측에서 로드됩니다. 클라이언트에는 필요한 것만 전달합니다.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 엄격하게 서버 측 번역/포맷팅
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### 클라이언트 컴포넌트에서의 사용법

카운터를 렌더링하는 클라이언트 컴포넌트의 예를 들어보겠습니다.

**번역 (형식 재사용; 원하는 대로 next-intl 메시지에 로드하세요)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**클라이언트 컴포넌트**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // 중첩된 객체에 직접 범위 지정
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> 페이지 클라이언트 메시지에 "about" 메시지를 추가하는 것을 잊지 마세요
> (클라이언트가 실제로 필요한 네임스페이스만 포함하세요).

### 서버 컴포넌트에서의 사용법

이 UI 컴포넌트는 서버 컴포넌트이며 클라이언트 컴포넌트 아래에서 렌더링될 수 있습니다 (페이지 → 클라이언트 → 서버). 미리 계산된 문자열을 전달하여 동기적으로 유지하세요.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

노트:

- `formattedCount`는 서버 측에서 계산하세요 (예: `const initialFormattedCount = format.number(0)`).
- 서버 컴포넌트에 함수나 직렬화할 수 없는 객체를 전달하지 마십시오.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... 페이지 코드의 나머지 부분
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### 로케일 라우팅을 위한 미들웨어

로케일 감지 및 라우팅을 처리하는 미들웨어를 추가하세요:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // API, Next 내부 및 정적 자산은 제외
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### 모범 사례

- **html `lang` 및 `dir` 설정**: `src/app/[locale]/layout.tsx`에서 `getLocaleDirection(locale)`을 통해 `dir`을 계산하고 `<html lang={locale} dir={dir}>`로 설정하세요.
- **네임스페이스별 메시지 분리**: 로케일 및 네임스페이스별로 JSON을 구성하세요 (예: `common.json`, `about.json`).
- **클라이언트 페이로드 최소화**: 페이지에서 `NextIntlClientProvider`에 필요한 네임스페이스만 전송하세요 (예: `pick(messages, ['common', 'about'])`).
- **정적 페이지 선호**: `export const dynamic = 'force-static'`를 내보내고 모든 `locales`에 대해 정적 파라미터를 생성하세요.
- **동기 서버 컴포넌트**: 비동기 호출이나 직렬화 불가능한 함수 대신 미리 계산된 문자열(번역된 라벨, 포맷된 숫자)을 전달하세요.

## next-intl 위에 Intlayer 구현하기

intlayer 의존성을 설치하세요:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

intlayer 구성 파일을 생성하세요:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // 네임스페이스별 폴더 구조를 Intlayer와 동기화 상태로 유지하세요
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`package.json` 스크립트 추가:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

노트:

- `intlayer fill`: 구성된 로케일을 기반으로 AI 공급자를 사용하여 누락된 번역을 채웁니다.
- `intlayer test`: 누락되거나 잘못된 번역을 검사합니다(CI에서 사용).

인수 및 공급자를 구성할 수 있습니다. 자세한 내용은 [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 참조하세요.
