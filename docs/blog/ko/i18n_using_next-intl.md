---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-intl을 사용하여 Next.js 애플리케이션을 국제화하는 방법
description: next-intl으로 i18n 설정하기: 다국어 Next.js 앱을 위한 모범 사례와 SEO 팁, 국제화, 콘텐츠 구성 및 기술 설정을 다룹니다.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: 초기 버전
---

# 2025년에 next-intl을 사용하여 Next.js 애플리케이션을 국제화하는 방법

## 목차

<TOC/>

## next-intl이란?

**next-intl**은 Next.js App Router를 위해 특별히 설계된 인기 있는 국제화(i18n) 라이브러리입니다. 뛰어난 TypeScript 지원과 내장 최적화를 제공하여 다국어 Next.js 애플리케이션을 원활하게 구축할 수 있습니다.

> 원하신다면 [next-i18next 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-i18next.md)를 참고하거나, 직접 [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_next-intl.md)를 사용할 수도 있습니다.

> 비교 내용은 [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)에서 확인하세요.

## 따라야 할 모범 사례

구현에 들어가기 전에, 다음과 같은 모범 사례를 따라야 합니다:

- **HTML `lang` 및 `dir` 속성 설정**
  레이아웃에서 `getLocaleDirection(locale)`를 사용하여 `dir`을 계산하고, 올바른 접근성과 SEO를 위해 `<html lang={locale} dir={dir}>`를 설정하세요.
- **네임스페이스별 메시지 분리**
  로케일과 네임스페이스별로 JSON 파일을 구성하여 (예: `common.json`, `about.json`) 필요한 것만 로드하도록 하세요.
- **클라이언트 페이로드 최소화**
  페이지에서 `NextIntlClientProvider`에 필요한 네임스페이스만 전송하세요 (예: `pick(messages, ['common', 'about'])`).
- **정적 페이지 선호**
  성능과 SEO 향상을 위해 가능한 한 정적 페이지를 사용하세요.
- **서버 컴포넌트에서의 i18n**

서버 컴포넌트는 페이지나 `client`로 표시되지 않은 모든 컴포넌트처럼 정적이며 빌드 시 미리 렌더링할 수 있습니다. 따라서 번역 함수를 props로 전달해야 합니다.

- **TypeScript 타입 설정**  
  애플리케이션 전반에 걸쳐 타입 안전성을 보장하기 위해 로케일에 대한 타입을 설정하세요.
- **리디렉션을 위한 프록시**  
  로케일 감지와 라우팅을 처리하고 사용자를 적절한 로케일 접두사가 붙은 URL로 리디렉션하기 위해 프록시를 사용하세요.
- **메타데이터, 사이트맵, robots.txt의 국제화**  
  Next.js에서 제공하는 `generateMetadata` 함수를 사용하여 메타데이터, 사이트맵, robots.txt를 국제화하여 모든 로케일에서 검색 엔진이 더 잘 인식하도록 하세요.
- **링크 현지화**  
  `Link` 컴포넌트를 사용하여 링크를 현지화하고 사용자를 적절한 로케일 접두사가 붙은 URL로 리디렉션하세요. 이는 모든 로케일에서 페이지의 검색 가능성을 보장하는 데 중요합니다.
- **테스트 및 번역 자동화**
  테스트와 번역 자동화는 다국어 애플리케이션을 유지 관리하는 데 소요되는 시간을 줄이는 데 도움이 됩니다.

> 국제화 및 SEO에 대해 알아야 할 모든 내용을 정리한 문서를 참고하세요: [next-intl과 함께하는 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md).

---

## Next.js 애플리케이션에서 next-intl 설정 단계별 가이드

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
loading="lazy"

> GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/next-intl-template)을 참조하세요.

다음은 우리가 생성할 프로젝트 구조입니다:

```bash
.
├── global.ts
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
└── src # Src는 선택 사항입니다
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (홈 리소스로 모든 페이지를 오염시키지 않기 위한 라우트 그룹)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Next.js App Router용 핵심 국제화 라이브러리로, 번역 관리를 위한 훅, 서버 함수, 클라이언트 프로바이더를 제공합니다.

### 2단계: 프로젝트 구성

지원하는 로케일을 정의하고 next-intl의 요청 구성을 설정하는 구성 파일을 만드세요. 이 파일은 i18n 설정의 단일 진실 소스로 작동하며 애플리케이션 전반에 걸쳐 타입 안전성을 보장합니다.

로케일 구성을 중앙 집중화하면 불일치를 방지하고 향후 로케일을 추가하거나 제거하기가 더 쉬워집니다. `getRequestConfig` 함수는 모든 요청 시 실행되며 각 페이지에 필요한 번역만 로드하여 코드 분할을 가능하게 하고 번들 크기를 줄입니다.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// 타입 안전성을 갖춘 지원 로케일 정의
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// 코드 분할을 가능하게 하기 위해 로케일별로 메시지를 동적으로 로드합니다
// Promise.all은 더 나은 성능을 위해 네임스페이스를 병렬로 로드합니다
async function loadMessages(locale: Locale) {
  // 레이아웃/페이지에서 필요한 네임스페이스만 로드합니다
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... 향후 JSON 파일은 여기에 추가해야 합니다
  ]);

  return { common, home, about } as const;
}

// 지역화된 URL을 생성하는 헬퍼 함수 (예: /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig는 모든 요청 시 실행되며 서버 컴포넌트에 메시지를 제공합니다
// next-intl이 Next.js의 서버 사이드 렌더링에 연결되는 부분입니다
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1년
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // /en/... 경로를 /...로 변경
  // 선택 사항: 지역화된 경로명
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // 쿠키로 인한 "/" -> "/en" 리디렉션 방지
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### 3단계: 동적 로케일 라우트 정의

앱 폴더에 `[locale]` 디렉토리를 생성하여 로케일 기반 동적 라우팅을 설정하세요. 이를 통해 Next.js는 각 로케일이 URL 세그먼트가 되는 로케일 기반 라우팅을 처리할 수 있습니다 (예: `/en/about`, `/fr/about`).

동적 라우트를 사용하면 Next.js가 빌드 시 모든 로케일에 대해 정적 페이지를 생성할 수 있어 성능과 SEO가 향상됩니다. 레이아웃 컴포넌트는 로케일에 따라 HTML의 `lang` 및 `dir` 속성을 설정하는데, 이는 접근성과 검색 엔진 이해에 매우 중요합니다.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// 빌드 시 모든 로케일에 대해 정적 페이지를 미리 생성 (SSG)
// 이는 성능과 SEO를 향상시킵니다
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next.js App Router에서 params는 Promise입니다 (await 가능)
  // 이를 통해 동적 라우트 세그먼트를 비동기적으로 해결할 수 있습니다
  const { locale } = await params;

  // 중요: setRequestLocale은 next-intl에 이 요청에 사용할 로케일을 알려줍니다
  // 이것이 없으면 getTranslations()가 서버 컴포넌트에서 사용할 로케일을 알 수 없습니다
  setRequestLocale(locale);

  // 올바른 HTML 렌더링을 위해 텍스트 방향(LTR/RTL)을 가져옵니다
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 메시지는 서버 측에서 로드됩니다. 클라이언트에는 필요한 것만 전달하세요.
  // 이렇게 하면 브라우저로 전송되는 자바스크립트 번들이 최소화됩니다.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 엄격히 서버 측에서만 사용하는 번역/포맷팅
  // 이들은 서버에서 실행되며 컴포넌트에 props로 전달될 수 있습니다
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider는 클라이언트 컴포넌트에서 번역을 사용할 수 있게 합니다
    // 클라이언트 컴포넌트가 실제로 사용하는 네임스페이스만 전달하세요
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### 4단계: 번역 파일 생성하기

각 로케일과 네임스페이스별로 JSON 파일을 생성하세요. 이 구조는 번역을 논리적으로 구성하고 각 페이지에 필요한 번역만 로드할 수 있게 해줍니다.

네임스페이스별로 번역을 구성하는 것(e.g., `common.json`, `about.json`)은 코드 분할을 가능하게 하며 번들 크기를 줄여줍니다. 이렇게 하면 각 페이지에 필요한 번역만 로드하여 성능을 향상시킬 수 있습니다.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### 5단계: 페이지에서 번역 활용하기

서버에서 번역을 로드하고 이를 서버 및 클라이언트 컴포넌트 모두에 전달하는 페이지 컴포넌트를 만드세요. 이렇게 하면 렌더링 전에 번역이 로드되어 콘텐츠 깜박임을 방지할 수 있습니다.

서버 측에서 번역을 로드하면 SEO가 향상되고 FOUC(번역되지 않은 콘텐츠 깜박임)를 방지할 수 있습니다. `pick`을 사용하여 필요한 네임스페이스만 클라이언트 프로바이더에 전달함으로써 브라우저에 전송되는 자바스크립트 번들 크기를 최소화합니다.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 메시지는 서버 측에서 로드됩니다. 클라이언트에는 필요한 것만 전달하세요.
  // 이렇게 하면 브라우저로 전송되는 JavaScript 번들이 최소화됩니다.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // 엄격히 서버 측 번역/포맷팅
  // 이들은 서버에서 실행되며 컴포넌트에 props로 전달될 수 있습니다
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider는 클라이언트 컴포넌트에서 번역을 사용할 수 있게 합니다.
    // 클라이언트 컴포넌트가 실제로 사용하는 네임스페이스만 전달하세요.
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### 6단계: 클라이언트 컴포넌트에서 번역 사용하기

클라이언트 컴포넌트는 `useTranslations` 및 `useFormatter` 훅을 사용하여 번역 및 포맷팅 기능에 접근할 수 있습니다. 이 훅들은 `NextIntlClientProvider` 컨텍스트에서 값을 읽어옵니다.

클라이언트 컴포넌트는 번역에 접근하기 위해 React 훅이 필요합니다. `useTranslations`와 `useFormatter` 훅은 next-intl과 원활하게 통합되며, 로케일이 변경될 때 반응형 업데이트를 제공합니다.

> 페이지의 클라이언트 메시지에 필요한 네임스페이스를 추가하는 것을 잊지 마세요 (클라이언트 컴포넌트가 실제로 필요로 하는 네임스페이스만 포함하세요).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // 중첩된 객체에 직접 범위를 지정
  // useTranslations/useFormatter는 NextIntlClientProvider 컨텍스트에서 읽는 훅입니다.
  // 이 훅들은 컴포넌트가 NextIntlClientProvider로 감싸져 있을 때만 작동합니다.
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

### 7단계: 서버 컴포넌트에서 번역 사용하기

서버 컴포넌트는 React 훅을 사용할 수 없으므로, 부모 컴포넌트로부터 props를 통해 번역과 포매터를 전달받습니다. 이 방법은 서버 컴포넌트를 동기적으로 유지하며 클라이언트 컴포넌트 내부에 중첩될 수 있게 합니다.

클라이언트 경계 내에 중첩될 수 있는 서버 컴포넌트는 동기적이어야 합니다. 번역된 문자열과 포맷된 값을 props로 전달함으로써 비동기 작업을 피하고 올바른 렌더링을 보장합니다. 부모 페이지 컴포넌트에서 번역과 포맷을 미리 계산하세요.

```tsx fileName="src/components/ServerComponent.tsx"
// 클라이언트 컴포넌트 내에 중첩된 서버 컴포넌트는 동기적이어야 합니다
// React는 서버/클라이언트 경계 간에 비동기 함수를 직렬화할 수 없습니다
// 해결책: 부모에서 번역/포맷을 미리 계산하고 props로 전달
type ServerComponentProps = {
  formattedCount: string; // 포맷된 카운트 문자열
  label: string; // 버튼 라벨
  increment: string; // 증가 텍스트
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

> 페이지나 레이아웃에서 `next-intl/server`의 `getTranslations`와 `getFormatter`를 사용하여 번역과 포맷팅을 미리 계산한 후, 이를 props로 서버 컴포넌트에 전달하세요.

---

### (선택 사항) 8단계: 콘텐츠의 언어 변경하기

next-intl을 사용하여 콘텐츠의 언어를 변경하려면, 동일한 경로명을 가리키면서 로케일을 전환하는 로케일 인식 링크를 렌더링하세요. 프로바이더가 URL을 자동으로 재작성하므로 현재 경로만 지정하면 됩니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 가져옵니다
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="언어 선택기">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // 기본 로케일인지 여부에 따라 href를 생성합니다
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (선택 사항) 9단계: 현지화된 Link 컴포넌트 사용하기

`next-intl`은 활성 로케일을 자동으로 적용하는 현지화된 링크 컴포넌트를 포함하는 서브패키지 `next-intl/navigation`을 제공합니다. 우리는 이미 `@/i18n` 파일에서 이를 추출해 두었으므로 다음과 같이 사용할 수 있습니다:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (선택 사항) 10단계: 서버 액션 내에서 활성 로케일 접근하기

서버 액션은 `next-intl/server`를 사용하여 현재 로케일을 읽을 수 있습니다. 이는 현지화된 이메일을 보내거나 제출된 데이터와 함께 언어 선호도를 저장하는 데 유용합니다.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // 템플릿, 분석 레이블 등을 선택하기 위해 locale을 사용합니다.
  console.log(`locale ${locale}에서 받은 연락처 양식`);
}
```

> `getLocale`는 `next-intl` 프록시가 설정한 locale을 읽기 때문에 서버 어디서나 작동합니다: Route Handlers, Server Actions, 그리고 edge functions.

### (선택 사항) 11단계: 메타데이터 국제화하기

콘텐츠 번역도 중요하지만, 국제화의 주요 목표는 웹사이트를 전 세계에 더 잘 보이게 만드는 것입니다. I18n은 적절한 SEO를 통해 웹사이트 가시성을 향상시키는 놀라운 수단입니다.

적절하게 국제화된 메타데이터는 검색 엔진이 페이지에서 어떤 언어가 사용 가능한지 이해하는 데 도움을 줍니다. 여기에는 hreflang 메타 태그 설정, 제목과 설명 번역, 각 로케일에 대해 정규화된 URL이 올바르게 설정되었는지 확인하는 작업이 포함됩니다.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata는 각 로케일마다 실행되어 SEO 친화적인 메타데이터를 생성합니다
// 이것은 검색 엔진이 대체 언어 버전을 이해하는 데 도움을 줍니다.
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

// ... 페이지 나머지 코드
```

### (선택 사항) 12단계: 사이트맵 국제화하기

모든 로케일 버전의 페이지를 포함하는 사이트맵을 생성하세요. 이는 검색 엔진이 모든 언어 버전의 콘텐츠를 발견하고 색인화하는 데 도움이 됩니다.

적절하게 국제화된 사이트맵은 검색 엔진이 모든 언어 버전의 페이지를 찾고 색인화할 수 있도록 보장합니다. 이는 국제 검색 결과에서 가시성을 향상시킵니다.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * 모든 로케일과 해당 로컬라이즈된 경로의 맵을 가져옵니다.
 *
 * 예시 출력:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// 더 나은 SEO를 위해 모든 로케일 변형을 포함하는 사이트맵 생성
// alternates 필드는 검색 엔진에 언어 버전을 알립니다
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (선택 사항) 13단계: robots.txt 국제화하기

보호된 경로의 모든 로케일 버전을 적절히 처리하는 robots.txt 파일을 만드세요. 이를 통해 검색 엔진이 어떤 언어로든 관리자(admin)나 대시보드 페이지를 인덱싱하지 않도록 할 수 있습니다.

모든 로케일에 대해 robots.txt를 올바르게 구성하면, 각 로케일별로 경로가 다를 때 민감한 페이지가 검색 엔진에 인덱싱되는 것을 방지할 수 있습니다.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// 모든 로케일에 대한 경로 생성 (예: /admin, /fr/admin, /es/admin)
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

### (선택 사항) 14단계: 로케일 라우팅을 위한 프록시 설정

사용자의 선호 로케일을 자동으로 감지하고 적절한 로케일 접두사가 붙은 URL로 리디렉션하는 프록시를 만드세요. next-intl은 이를 자동으로 처리하는 편리한 프록시 함수를 제공합니다.

프록시는 사용자가 사이트를 방문할 때 자동으로 선호하는 언어로 리디렉션되도록 보장합니다. 또한 사용자의 선호도를 저장하여 향후 방문 시 사용자 경험을 향상시킵니다.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// 미들웨어는 라우트 이전에 실행되어 로케일 감지 및 라우팅을 처리합니다.
// localeDetection: true는 Accept-Language 헤더를 사용하여 로케일을 자동 감지합니다.
export default proxy;

export const config = {
  // API, Next 내부, 정적 자산은 건너뜁니다.
  // 정규식: api, _next로 시작하거나 점(.)이 포함된 경로(파일)를 제외한 모든 경로와 매칭됩니다.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (선택 사항) 15단계: 로케일에 대한 TypeScript 타입 설정

TypeScript 설정은 키에 대한 자동완성과 타입 안전성을 제공하는 데 도움이 됩니다.

프로젝트 루트에 global.ts 파일을 생성하고 다음 코드를 추가할 수 있습니다:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... 향후 JSON 파일도 여기에 추가해야 합니다
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

이 코드는 모듈 확장(Module Augmentation)을 사용하여 locales와 messages를 next-intl의 AppConfig 타입에 추가합니다.

### (선택 사항) 15단계: Intlayer를 사용하여 번역 자동화하기

Intlayer는 애플리케이션의 현지화 과정을 지원하기 위해 설계된 **무료**이자 **오픈 소스** 라이브러리입니다. next-intl이 번역 로딩과 관리를 담당하는 반면, Intlayer는 번역 워크플로우를 자동화하는 데 도움을 줍니다.

번역을 수동으로 관리하는 것은 시간 소모가 크고 오류가 발생하기 쉽습니다. Intlayer는 번역 테스트, 생성 및 관리를 자동화하여 시간을 절약하고 애플리케이션 전반에 걸쳐 일관성을 보장합니다.

Intlayer는 다음을 가능하게 합니다:

- **코드베이스 내 원하는 위치에 콘텐츠 선언하기**  
  Intlayer는 `.content.{ts|js|json}` 파일을 사용하여 코드베이스 내 원하는 위치에 콘텐츠를 선언할 수 있게 합니다. 이를 통해 콘텐츠를 더 잘 조직할 수 있으며, 코드베이스의 가독성과 유지보수성을 향상시킵니다.

- **누락된 번역 테스트하기**  
  Intlayer는 CI/CD 파이프라인이나 단위 테스트에 통합할 수 있는 테스트 기능을 제공합니다. [번역 테스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)에 대해 자세히 알아보세요.

- **번역 자동화**
  Intlayer는 번역을 자동화할 수 있는 CLI와 VSCode 확장 기능을 제공합니다. 이는 CI/CD 파이프라인에 통합할 수 있습니다. [번역 자동화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)에 대해 자세히 알아보세요.
  사용자는 **자신의 API 키와 원하는 AI 제공자를 사용할 수 있습니다**. 또한 상황에 맞는 번역을 제공하므로, [내용 채우기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md)를 참고하세요.

- **외부 콘텐츠 연결**
  Intlayer는 외부 콘텐츠 관리 시스템(CMS)에 콘텐츠를 연결할 수 있도록 합니다. 이를 최적화된 방식으로 가져와 JSON 리소스에 삽입할 수 있습니다. [외부 콘텐츠 가져오기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md)에서 자세히 알아보세요.

- **비주얼 에디터**  
  Intlayer는 비주얼 에디터를 사용하여 콘텐츠를 편집할 수 있는 무료 비주얼 에디터를 제공합니다. [번역 비주얼 편집](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)에서 자세히 알아보세요.

그리고 더 많은 기능들이 있습니다. Intlayer가 제공하는 모든 기능을 확인하려면 [Intlayer의 관심사 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.
