---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: next-i18next를 사용하여 Next.js 애플리케이션 국제화하는 방법
description: next-i18next로 i18n 설정하기: 다국어 Next.js 앱을 위한 모범 사례와 SEO 팁, 국제화, 콘텐츠 구성 및 기술 설정을 다룹니다.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: 초기 버전
---

# 2025년에 next-i18next를 사용하여 Next.js 애플리케이션 국제화하는 방법

## 목차

<TOC/>

## next-i18next란 무엇인가?

**next-i18next**는 Next.js 애플리케이션을 위한 인기 있는 국제화(i18n) 솔루션입니다. 원래 `next-i18next` 패키지는 Pages Router를 위해 설계되었지만, 이 가이드에서는 최신 **App Router**에서 `i18next`와 `react-i18next`를 직접 사용하여 i18next를 구현하는 방법을 보여줍니다.

이 접근 방식을 통해 다음을 할 수 있습니다:

- **네임스페이스(예: `common.json`, `about.json`)를 사용하여 번역을 조직화**하여 더 나은 콘텐츠 관리를 할 수 있습니다.
- **각 페이지에 필요한 네임스페이스만 로드하여 번역을 효율적으로 로드**함으로써 번들 크기를 줄일 수 있습니다.
- **서버 및 클라이언트 컴포넌트 모두를 지원**하며 적절한 SSR과 하이드레이션 처리를 할 수 있습니다.
- **타입 안전한 로케일 구성과 번역 키로 TypeScript 지원을 보장**할 수 있습니다.
- **적절한 메타데이터, 사이트맵, robots.txt 국제화를 통해 SEO 최적화**를 합니다.

> 대안으로 [next-intl 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-intl.md)를 참조하거나, 직접 [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)를 사용할 수 있습니다.

> [next-i18next vs next-intl vs Intlayer 비교](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)를 확인하세요.

## 따라야 할 실천 사항

구현에 들어가기 전에, 다음과 같은 실천 사항을 따라야 합니다:

- **HTML `lang` 및 `dir` 속성 설정**
- 레이아웃에서 `getLocaleDirection(locale)`을 사용하여 `dir`을 계산하고, 적절한 접근성과 SEO를 위해 `<html lang={locale} dir={dir}>`를 설정하세요.
- **네임스페이스별 메시지 분리**
  JSON 파일을 로케일과 네임스페이스별로 구성하세요(예: `common.json`, `about.json`). 필요한 것만 로드할 수 있습니다.
- **클라이언트 페이로드 최소화**
  페이지에서 필요한 네임스페이스만 `NextIntlClientProvider`에 전달하세요(예: `pick(messages, ['common', 'about'])`).
- **정적 페이지 선호**
  성능과 SEO 향상을 위해 가능한 한 정적 페이지를 사용하세요.
- **서버 컴포넌트에서의 국제화**
  페이지나 `client`로 표시되지 않은 모든 컴포넌트 같은 서버 컴포넌트는 정적이며 빌드 시 미리 렌더링될 수 있습니다. 따라서 번역 함수들을 props로 전달해야 합니다.
- **TypeScript 타입 설정**
  애플리케이션 전반에 걸쳐 타입 안전성을 보장하기 위해 로케일에 대한 TypeScript 타입을 설정하세요.
- **리디렉션을 위한 프록시**
  로케일 감지 및 라우팅을 처리하고 사용자를 적절한 로케일 접두사가 붙은 URL로 리디렉션하기 위해 프록시를 사용하세요.
- **메타데이터, 사이트맵, robots.txt의 국제화**
  Next.js에서 제공하는 `generateMetadata` 함수를 사용하여 메타데이터, 사이트맵, robots.txt를 국제화함으로써 모든 로케일에서 검색 엔진이 더 잘 인식하도록 하세요.
- **링크 현지화**
  `Link` 컴포넌트를 사용하여 사용자를 적절한 로케일 접두사가 붙은 URL로 리디렉션하도록 링크를 현지화하세요. 이는 모든 로케일에서 페이지 발견을 보장하는 데 중요합니다.
- **테스트 및 번역 자동화**
  테스트와 번역 자동화는 다국어 애플리케이션 유지 관리를 위한 시간을 절약하는 데 도움이 됩니다.

> 국제화 및 SEO에 대해 알아야 할 모든 내용을 나열한 문서를 참조하세요: [next-intl을 사용한 국제화 (i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md).

---

## Next.js 애플리케이션에서 i18next 설정 단계별 가이드

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션 국제화하기"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> GitHub에서 [Application Template](https://github.com/aymericzip/next-i18next-template)을 참조하세요.

다음은 우리가 생성할 프로젝트 구조입니다:

```bash
.
├── i18n.config.ts
└── src # Src는 선택 사항입니다
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (홈 메시지로 모든 페이지를 오염시키지 않기 위한 라우트 그룹)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: 번역 로딩 및 관리를 담당하는 핵심 국제화 프레임워크입니다.
- **react-i18next**: 클라이언트 컴포넌트를 위한 `useTranslation` 훅 등을 제공하는 i18next의 React 바인딩입니다.
- **i18next-resources-to-backend**: 필요한 네임스페이스만 동적으로 로드할 수 있도록 번역 파일의 동적 로딩을 가능하게 하는 플러그인입니다.

### 2단계: 프로젝트 구성

지원하는 로케일, 기본 로케일, URL 현지화에 대한 헬퍼 함수를 정의하는 구성 파일을 만드세요. 이 파일은 i18n 설정의 단일 진실 소스 역할을 하며 애플리케이션 전반에 걸쳐 타입 안전성을 보장합니다.

로케일 구성을 중앙 집중화하면 불일치를 방지하고 향후 로케일을 추가하거나 제거하기가 더 쉬워집니다. 헬퍼 함수는 SEO 및 라우팅을 위한 일관된 URL 생성을 보장합니다.

```ts fileName="i18n.config.ts"
// 타입 안전성을 위해 지원하는 로케일을 const 배열로 정의합니다.
// 'as const' 단언은 TypeScript가 string[] 대신 리터럴 타입을 추론하도록 합니다.
export const locales = ["en", "fr"] as const;

// locales 배열에서 Locale 타입을 추출합니다.
// 이는 "en" | "fr" 의 유니언 타입을 생성합니다.
export type Locale = (typeof locales)[number];

// 로케일이 지정되지 않았을 때 사용하는 기본 로케일 설정
export const defaultLocale: Locale = "en";

// 오른쪽에서 왼쪽으로 읽는 언어들로, 특수한 텍스트 방향 처리가 필요함
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// 로케일이 RTL(오른쪽에서 왼쪽) 텍스트 방향이 필요한지 확인
// 아랍어, 히브리어, 페르시아어, 우르두어 등에 사용됨
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// 주어진 로케일과 경로에 대해 지역화된 경로 생성
// 기본 로케일 경로는 접두사가 없음 (예: "/about" 대신 "/en/about" 아님)
// 다른 로케일은 접두사가 붙음 (예: "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// 절대 URL의 기본 URL (사이트맵, 메타데이터 등에서 사용)
const ORIGIN = "https://example.com";

// 로케일 접두사가 포함된 절대 URL 생성
// SEO 메타데이터, 사이트맵, 정규 URL에 사용
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// 브라우저에서 로케일 쿠키를 설정하는 데 사용
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1년
    "SameSite=Lax",
  ].join("; ");
}
```

### 3단계: 번역 네임스페이스 중앙 집중화

애플리케이션에서 노출하는 모든 네임스페이스에 대해 단일 소스 오브 트루스를 만드세요. 이 목록을 재사용하면 서버, 클라이언트, 툴링 코드가 동기화되고 번역 헬퍼에 대한 강력한 타입 지원이 활성화됩니다.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### 4단계: TypeScript로 번역 키 강력한 타입 지정하기

`i18next`를 확장하여 표준 언어 파일(보통 영어)을 가리키도록 하세요. 그러면 TypeScript가 네임스페이스별 유효한 키를 추론하여 `t()` 호출이 끝까지 검사됩니다.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> 팁: 이 선언 파일은 `src/types` 폴더 아래에 저장하세요(폴더가 없으면 생성). Next.js는 이미 `tsconfig.json`에 `src`를 포함하고 있어 자동으로 이 확장이 인식됩니다. 만약 인식되지 않는다면, `tsconfig.json` 파일에 다음을 추가하세요:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

이 설정이 완료되면 자동완성과 컴파일 타임 검사를 활용할 수 있습니다:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// 정상, 타입이 지정됨: t("counter.increment")
// 오류, 컴파일 에러: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### 5단계: 서버 사이드 i18n 초기화 설정

서버 컴포넌트용 번역을 로드하는 서버 사이드 초기화 함수를 만듭니다. 이 함수는 서버 사이드 렌더링을 위해 별도의 i18next 인스턴스를 생성하여 렌더링 전에 번역이 로드되도록 보장합니다.

서버 컴포넌트는 클라이언트 컴포넌트와 다른 컨텍스트에서 실행되기 때문에 자체 i18next 인스턴스가 필요합니다. 서버에서 번역을 미리 로드하면 번역되지 않은 콘텐츠가 잠시 보이는 현상을 방지하고, 검색 엔진이 번역된 콘텐츠를 인식하도록 하여 SEO를 향상시킵니다.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// i18next를 위한 동적 리소스 로딩 구성
// 이 함수는 로케일과 네임스페이스에 따라 번역 JSON 파일을 동적으로 임포트합니다.
// 예: locale="fr", namespace="about" -> "@/locales/fr/about.json"을 임포트
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * 서버 사이드 렌더링을 위한 i18next 인스턴스 초기화
 *
 * @returns 서버 사이드 사용을 위해 초기화된 i18next 인스턴스
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // 새로운 i18next 인스턴스 생성 (클라이언트 측 인스턴스와 별개)
  const i18n = createInstance();

  // React 통합 및 백엔드 로더로 초기화
  await i18n
    .use(initReactI18next) // React 훅 지원 활성화
    .use(backend) // 동적 리소스 로딩 활성화
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // 성능 향상을 위해 지정된 네임스페이스만 로드
      defaultNS: "common", // 네임스페이스가 지정되지 않은 경우 기본 네임스페이스
      interpolation: { escapeValue: false }, // HTML 이스케이프 하지 않음 (React가 XSS 보호 처리)
      react: { useSuspense: false }, // SSR 호환성을 위해 Suspense 비활성화
      returnNull: false, // 누락된 키에 대해 null 대신 빈 문자열 반환
      initImmediate: false, // 리소스가 로드될 때까지 초기화를 지연 (더 빠른 SSR)
    });
  return i18n;
}
```

### 6단계: 클라이언트 사이드 i18n 프로바이더 생성

애플리케이션을 i18next 컨텍스트로 감싸는 클라이언트 컴포넌트 프로바이더를 생성합니다. 이 프로바이더는 서버에서 미리 로드된 번역을 받아 미번역 콘텐츠 깜빡임(FOUC)을 방지하고 중복 요청을 피합니다.

클라이언트 컴포넌트는 브라우저에서 실행되는 자체 i18next 인스턴스가 필요합니다. 서버에서 미리 로드된 리소스를 받아 원활한 하이드레이션을 보장하고 콘텐츠 깜빡임을 방지합니다. 또한 이 프로바이더는 로케일 변경과 네임스페이스 로딩을 동적으로 관리합니다.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// 클라이언트 측 동적 리소스 로딩 구성
// 서버 측과 동일한 패턴이지만, 이 인스턴스는 브라우저에서 실행됩니다.
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // 서버에서 미리 로드된 리소스 (FOUC - 번역되지 않은 콘텐츠 깜박임 방지)
  // 형식: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * i18next 컨텍스트로 앱을 감싸는 클라이언트 사이드 i18n 프로바이더
 * 서버에서 미리 로드된 리소스를 받아 번역을 다시 가져오는 것을 방지
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // useState 지연 초기화를 사용하여 i18n 인스턴스를 한 번만 생성
  // 이렇게 하면 렌더링마다 인스턴스가 생성되지 않음
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // 리소스가 제공된 경우(서버에서), 클라이언트 측에서 다시 가져오는 것을 방지하기 위해 사용
        // 이는 FOUC(Flash of Unstyled Content)를 방지하고 초기 로드 성능을 향상시킴
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // undefined 값 반환 방지
      });

    return i18nInstance;
  });

  // locale prop이 변경될 때 언어 업데이트
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // 클라이언트 측에서 필요한 모든 네임스페이스가 로드되었는지 확인
  // 배열 비교를 위해 join("|")를 의존성으로 사용
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // React 컨텍스트를 통해 모든 자식 컴포넌트에 i18n 인스턴스 제공
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### 7단계: 동적 로케일 라우트 정의

앱 폴더에 `[locale]` 디렉토리를 생성하여 로케일에 대한 동적 라우팅을 설정합니다. 이를 통해 Next.js는 각 로케일이 URL 세그먼트가 되는 로케일 기반 라우팅을 처리할 수 있습니다 (예: `/en/about`, `/fr/about`).

동적 라우트를 사용하면 Next.js가 빌드 시 모든 로케일에 대해 정적 페이지를 생성할 수 있어 성능과 SEO가 향상됩니다. 레이아웃 컴포넌트는 로케일에 따라 HTML의 `lang` 및 `dir` 속성을 설정하는데, 이는 접근성과 검색 엔진 이해에 매우 중요합니다.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// 동적 매개변수 비활성화 - 모든 로케일은 빌드 시점에 알려져 있어야 합니다
// 이는 모든 로케일 경로에 대해 정적 생성을 보장합니다
export const dynamicParams = false;

/**
 * 빌드 시점에 모든 로케일에 대한 정적 매개변수를 생성합니다
 * Next.js는 여기서 반환된 각 로케일에 대해 페이지를 사전 렌더링합니다
 * 예: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * 로케일별 HTML 속성을 처리하는 루트 레이아웃 컴포넌트
 * 로케일에 따라 lang 속성과 텍스트 방향(ltr/rtl)을 설정합니다
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  /// URL 매개변수에서 로케일 유효성 검사
  /// 잘못된 로케일이 제공되면 기본 로케일로 대체
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  /// 로케일에 따라 텍스트 방향 결정
  /// 아랍어와 같은 RTL 언어는 올바른 텍스트 렌더링을 위해 dir="rtl" 필요
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### 8단계: 번역 파일 생성하기

각 로케일과 네임스페이스별로 JSON 파일을 생성하세요. 이 구조는 번역을 논리적으로 조직하고 각 페이지에 필요한 번역만 로드할 수 있게 해줍니다.

네임스페이스별로 번역을 구성하는 것(e.g., `common.json`, `about.json`)은 코드 분할을 가능하게 하고 번들 크기를 줄여줍니다. 각 페이지에 필요한 번역만 로드하므로 성능이 향상됩니다.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/ko/home.json"
{
  "title": "홈",
  "description": "홈 페이지 설명",
  "welcome": "환영합니다",
  "greeting": "안녕하세요, 세계!",
  "aboutPage": "소개 페이지",
  "documentation": "문서"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/ko/about.json"
{
  "title": "소개",
  "description": "소개 페이지 설명",
  "counter": {
    "label": "카운터",
    "increment": "증가",
    "description": "버튼을 클릭하여 카운터를 증가시킵니다"
  }
}
```

### 9단계: 페이지에서 번역 활용하기

서버에서 i18next를 초기화하고 번역을 서버와 클라이언트 컴포넌트 모두에 전달하는 페이지 컴포넌트를 만듭니다. 이렇게 하면 렌더링 전에 번역이 로드되어 콘텐츠 깜빡임을 방지할 수 있습니다.

서버 측 초기화는 페이지가 렌더링되기 전에 번역을 로드하여 SEO를 향상시키고 FOUC(Flash of Unstyled Content)를 방지합니다. 미리 로드된 리소스를 클라이언트 프로바이더에 전달함으로써 중복 요청을 피하고 원활한 하이드레이션을 보장합니다.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * i18n 초기화를 처리하는 서버 컴포넌트 페이지
 * 서버에서 번역을 미리 로드하고 클라이언트 컴포넌트에 전달합니다
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // 이 페이지에 필요한 번역 네임스페이스 정의
  // 타입 안정성과 자동 완성을 위해 중앙 집중식 목록 재사용
  const pageNamespaces = allNamespaces;

  // 필요한 네임스페이스로 서버에서 i18next 초기화
  // 서버 측에서 번역 JSON 파일을 로드합니다
  const i18n = await initI18next(locale, pageNamespaces);

  // "about" 네임스페이스에 대한 고정된 번역 함수 가져오기
  // getFixedT는 네임스페이스를 고정하므로 t("about:title") 대신 t("title") 사용 가능
  const tAbout = i18n.getFixedT(locale, "about");

  // i18n 인스턴스에서 번역 번들 추출
  // 이 데이터는 클라이언트 측 i18n을 하이드레이션하기 위해 I18nProvider에 전달됨
  // FOUC(번역되지 않은 콘텐츠 깜박임)를 방지하고 중복 요청을 피함
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### 10단계: 클라이언트 컴포넌트에서 번역 사용하기

클라이언트 컴포넌트는 `useTranslation` 훅을 사용하여 번역에 접근할 수 있습니다. 이 훅은 번역 함수와 i18n 인스턴스에 접근할 수 있게 하여, 콘텐츠를 번역하고 로케일 정보를 사용할 수 있도록 합니다.

클라이언트 컴포넌트는 번역에 접근하기 위해 React 훅이 필요합니다. `useTranslation` 훅은 i18next와 원활하게 통합되며, 로케일이 변경될 때 반응형 업데이트를 제공합니다.

> 페이지나 프로바이더가 필요한 네임스페이스만 포함하고 있는지 확인하세요 (예: `about`).  
> React 버전이 19 미만이라면, `Intl.NumberFormat` 같은 무거운 포매터는 메모이제이션하세요.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * React 훅을 사용한 번역 클라이언트 컴포넌트 예제
 * useState, useEffect, useTranslation 같은 훅을 사용할 수 있습니다.
 */
const ClientComponent = () => {
  // useTranslation 훅은 번역 함수와 i18n 인스턴스에 접근할 수 있게 해줍니다.
  // "about" 네임스페이스의 번역만 로드하도록 지정합니다.
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // 로케일에 맞는 숫자 포매터 생성
  // i18n.language는 현재 로케일을 제공합니다 (예: "en", "fr")
  // Intl.NumberFormat은 로케일 규칙에 따라 숫자를 포맷합니다.
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 로케일별 형식으로 숫자 포맷팅 */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
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

### 11단계: 서버 컴포넌트에서 번역 사용하기

서버 컴포넌트는 React 훅을 사용할 수 없으므로, 부모 컴포넌트로부터 props를 통해 번역을 전달받습니다. 이 방법은 서버 컴포넌트를 동기적으로 유지하며 클라이언트 컴포넌트 내부에 중첩될 수 있도록 합니다.

클라이언트 경계 내에 중첩될 수 있는 서버 컴포넌트는 동기적이어야 합니다. 번역된 문자열과 로케일 정보를 props로 전달함으로써 비동기 작업을 피하고 올바른 렌더링을 보장합니다.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // 부모 서버 컴포넌트로부터 전달된 번역 함수
  // 서버 컴포넌트는 훅을 사용할 수 없으므로 번역은 props를 통해 전달됨
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * 서버 컴포넌트 예제 - 번역을 props로 받음
 * 클라이언트 컴포넌트(비동기 서버 컴포넌트) 내부에 중첩될 수 있음
 * React 훅을 사용할 수 없으므로 모든 데이터는 props 또는 비동기 작업에서 받아야 함
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // 로케일을 사용하여 서버 측에서 숫자 포맷팅
  // SSR 중 서버에서 실행되어 초기 페이지 로드를 개선함
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* props로 전달된 번역 함수 사용 */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (선택 사항) 12단계: 콘텐츠 언어 변경하기

Next.js에서 콘텐츠의 언어를 변경하는 권장 방법은 로케일 접두사가 붙은 URL과 Next.js 링크를 사용하는 것입니다. 아래 예제는 현재 로케일을 경로에서 읽어와 경로명에서 제거하고, 사용 가능한 각 로케일에 대해 하나의 링크를 렌더링합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="언어 선택기">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

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
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (선택 사항) 13단계: 지역화된 Link 컴포넌트 만들기

앱 전반에 걸쳐 지역화된 URL을 재사용하면 내비게이션이 일관되고 SEO 친화적으로 유지됩니다. 내부 경로에는 활성 로케일을 접두사로 붙이고 외부 URL은 그대로 두는 작은 헬퍼로 `next/link`를 감싸세요.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> 팁: `LocalizedLink`는 드롭인 교체이므로, import를 교체하고 컴포넌트가 로케일별 URL을 처리하도록 하여 점진적으로 마이그레이션하세요.

### (선택 사항) 14단계: 서버 액션 내에서 활성 로케일 접근하기

서버 액션은 종종 이메일, 로깅 또는 서드파티 통합을 위해 현재 로케일이 필요합니다. 프록시가 설정한 로케일 쿠키와 `Accept-Language` 헤더를 결합하여 폴백으로 사용하세요.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// 현재 로케일을 사용하는 서버 액션 예시
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // 로케일을 사용하여 지역화된 부수 효과 처리 (이메일, CRM 등)
  console.log(`로케일 ${locale} 로 서버에서 처리 중인 작업`);
}
```

> 이 헬퍼는 Next.js의 쿠키와 헤더에 의존하기 때문에, Route Handlers, Server Actions 및 기타 서버 전용 컨텍스트에서 작동합니다.

### (선택 사항) 15단계: 메타데이터 국제화하기

콘텐츠 번역도 중요하지만, 국제화의 주요 목표는 여러분의 웹사이트를 전 세계에 더 잘 노출시키는 것입니다. I18n은 적절한 SEO를 통해 웹사이트 가시성을 향상시키는 놀라운 수단입니다.

적절하게 국제화된 메타데이터는 검색 엔진이 페이지에서 어떤 언어가 사용 가능한지 이해하는 데 도움을 줍니다. 여기에는 hreflang 메타 태그 설정, 제목과 설명 번역, 각 로케일에 맞는 정규 URL(canonical URL) 설정이 포함됩니다.

다국어 SEO에 관한 좋은 실천 사항 목록은 다음과 같습니다:

- `<head>` 태그에 hreflang 메타 태그를 설정하여 검색 엔진이 페이지에서 사용 가능한 언어를 이해할 수 있도록 합니다.
- `http://www.w3.org/1999/xhtml` XML 스키마를 사용하여 sitemap.xml에 모든 페이지 번역을 나열합니다.
- robots.txt에서 접두사가 붙은 페이지를 제외하는 것을 잊지 마세요 (예: `/dashboard`, `/fr/dashboard`, `/es/dashboard`).
- 가장 현지화된 페이지로 리디렉션하기 위해 커스텀 Link 컴포넌트를 사용하세요 (예: 프랑스어에서는 `<a href="/fr/about">À propos</a>`).

개발자들은 종종 여러 로케일에 걸쳐 페이지를 올바르게 참조하는 것을 잊어버립니다. 이를 수정해 봅시다:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * 각 로케일 버전의 페이지에 대한 SEO 메타데이터를 생성합니다
 * 이 함수는 빌드 시 각 로케일마다 실행됩니다
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // 이 로케일에 대한 번역 파일을 동적으로 가져옵니다
  // 메타데이터의 번역된 제목과 설명을 얻기 위해 사용됩니다
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // 모든 로케일에 대한 hreflang 매핑을 생성합니다
  // 검색 엔진이 언어 대체를 이해하는 데 도움을 줍니다
  // 형식: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // 이 로케일 버전의 정규 URL
      canonical: absoluteUrl(locale, "/about"),
      // SEO를 위한 언어 대체(hreflang 태그)
      // "x-default"는 기본 로케일 버전을 지정
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>소개</h1>;
}
```

### (선택 사항) 16단계: 사이트맵 국제화하기

모든 로케일 버전의 페이지를 포함하는 사이트맵을 생성하세요. 이는 검색 엔진이 모든 언어 버전의 콘텐츠를 발견하고 색인화하는 데 도움을 줍니다.

적절하게 국제화된 사이트맵은 검색 엔진이 모든 언어 버전의 페이지를 찾고 색인화할 수 있도록 보장합니다. 이는 국제 검색 결과에서 가시성을 향상시킵니다.

```ts fileName="src/app/sitemap.ts"
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

ts fileName="src/app/sitemap.ts"
// 더 나은 SEO를 위해 모든 로케일 변형을 포함한 사이트맵 생성
// alternates 필드는 검색 엔진에 언어 버전을 알려줌
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

### (선택 사항) 17단계: robots.txt 국제화하기

보호된 경로의 모든 로케일 버전을 적절히 처리하는 robots.txt 파일을 만드세요. 이를 통해 검색 엔진이 어떤 언어로든 관리자(admin) 또는 대시보드 페이지를 인덱싱하지 않도록 보장합니다.

모든 로케일에 대해 robots.txt를 올바르게 구성하면 검색 엔진이 민감한 페이지를 어떤 언어로도 인덱싱하지 못하게 할 수 있습니다. 이는 보안과 개인정보 보호에 매우 중요합니다.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// 모든 로케일에 대한 경로 생성 (예: /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (선택 사항) 18단계: 로케일 라우팅을 위한 미들웨어 설정

사용자의 선호 로케일을 자동으로 감지하고 적절한 로케일 접두사가 붙은 URL로 리디렉션하는 프록시를 만듭니다. 이를 통해 사용자는 선호하는 언어로 된 콘텐츠를 볼 수 있어 사용자 경험이 향상됩니다.

미들웨어는 사용자가 사이트를 방문할 때 자동으로 선호하는 언어로 리디렉션되도록 보장합니다. 또한 향후 방문을 위해 사용자의 선호를 쿠키에 저장합니다.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// 확장자를 가진 파일과 매칭되는 정규식 (예: .js, .css, .png)
// 로케일 라우팅에서 정적 자산을 제외하는 데 사용
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Accept-Language 헤더에서 로케일 추출
 * "fr-CA", "en-US" 등의 형식을 처리
 * 브라우저 언어가 지원되지 않을 경우 기본 로케일로 대체
 */
const pickLocale = (accept: string | null) => {
  // 첫 번째 언어 선호도 가져오기 (예: "fr-CA,en-US;q=0.9"에서 "fr-CA")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // 기본 언어 코드 추출 (예: "fr-CA"에서 "fr")
  const base = raw.toLowerCase().split("-")[0];
  // 이 로케일을 지원하는지 확인, 아니면 기본값 사용
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Next.js에서 로케일 감지 및 라우팅을 위한 프록시
 * 페이지 렌더링 전에 모든 요청에서 실행됨
 * 필요 시 자동으로 로케일 접두사가 붙은 URL로 리다이렉트함
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Next.js 내부 경로, API 라우트, 정적 파일은 프록시를 건너뜀
  // 이들은 로케일 접두사가 붙지 않아야 함
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // URL에 이미 로케일 접두사가 있는지 확인
  // 예: "/fr/about" 또는 "/en"이면 true 반환
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // 로케일 접두사가 없으면, 로케일을 감지하고 리디렉션합니다.
  if (!hasLocale) {
    // 먼저 쿠키에서 로케일을 가져오려고 시도합니다 (사용자 선호도).
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // 쿠키 로케일이 유효하면 사용하고, 그렇지 않으면 브라우저 헤더에서 감지합니다.
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // 경로명을 수정하기 위해 URL을 복제합니다.
    const url = request.nextUrl.clone();
    // 경로명에 로케일 접두사를 추가합니다.
    // 루트 경로는 중복 슬래시를 피하기 위해 특별히 처리합니다.
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // 리디렉션 응답을 생성하고 로케일 쿠키 설정
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // 다음 경로를 제외한 모든 경로와 매칭:
    // - API 경로 (/api/*)
    // - Next.js 내부 경로 (/_next/*)
    // - 정적 파일 (/static/*)
    // - 확장자가 있는 파일 (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (선택 사항) 19단계: Intlayer를 사용하여 번역 자동화하기

Intlayer는 애플리케이션의 현지화 과정을 지원하기 위해 설계된 **무료**이자 **오픈 소스** 라이브러리입니다. i18next가 번역 로딩과 관리를 담당하는 반면, Intlayer는 번역 워크플로우 자동화를 도와줍니다.

번역을 수동으로 관리하는 것은 시간도 많이 걸리고 오류가 발생하기 쉽습니다. Intlayer는 번역 테스트, 생성 및 관리를 자동화하여 시간을 절약하고 애플리케이션 전반에 걸쳐 일관성을 보장합니다.

Intlayer는 다음을 가능하게 합니다:

- **코드베이스 내 원하는 위치에 콘텐츠 선언하기**  
  Intlayer는 `.content.{ts|js|json}` 파일을 사용하여 코드베이스 내 원하는 위치에 콘텐츠를 선언할 수 있게 합니다. 이를 통해 콘텐츠를 더 잘 조직할 수 있으며, 코드베이스의 가독성과 유지보수성을 향상시킵니다.

- **누락된 번역 테스트하기**  
  Intlayer는 CI/CD 파이프라인이나 단위 테스트에 통합할 수 있는 테스트 기능을 제공합니다. [번역 테스트하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)에서 자세히 알아보세요.

- **번역 자동화**  
  Intlayer는 번역을 자동화할 수 있는 CLI와 VSCode 확장 기능을 제공합니다. 이를 CI/CD 파이프라인에 통합할 수 있습니다. [번역 자동화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md) 에 대해 자세히 알아보세요.  
  사용자는 **자신의 API 키와 원하는 AI 제공자를 사용할 수 있습니다**. 또한 문맥 인식 번역도 지원합니다. 자세한 내용은 [콘텐츠 채우기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md)를 참조하세요.

- **외부 콘텐츠 연결**
- **외부 콘텐츠 연결**  
  Intlayer는 외부 콘텐츠 관리 시스템(CMS)에 콘텐츠를 연결할 수 있도록 합니다. 최적화된 방식으로 데이터를 가져와 JSON 리소스에 삽입할 수 있습니다. [외부 콘텐츠 가져오기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md)에서 자세히 알아보세요.

- **비주얼 에디터**  
  Intlayer는 비주얼 에디터를 사용하여 콘텐츠를 편집할 수 있는 무료 비주얼 에디터를 제공합니다. [번역 비주얼 편집](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)에서 자세히 알아보세요.

그리고 더 많은 기능들이 있습니다. Intlayer가 제공하는 모든 기능을 확인하려면 [Intlayer의 장점 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.
