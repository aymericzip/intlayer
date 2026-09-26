---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "기존 Next.js 애플리케이션을 사후에 다국어(i18n)화하는 방법 (2026 가이드)"
description: "기존 Next.js 앱을 대대적인 리팩토링 없이 다국어(i18n)화하는 2026년 가이드. Intlayer를 활용한 자동 텍스트 추출, AI 번역 및 고성능 라우팅을 경험하세요."
keywords:
  - Next.js i18n
  - 국제화
  - 기존 Next.js 앱 번역
  - Next.js 16
  - Intlayer
  - 다국어
  - React i18n
  - 컴파일러
  - AI 번역
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# 기존 Next.js 애플리케이션을 사후에 다국어(i18n)화하는 방법 (2026 가이드)

처음부터 Next.js 프로젝트에 국제화(i18n)를 적용하는 것은 비교적 간단합니다. 하지만 이미 단일 언어로 구축되어 배포 중인 Next.js 앱에 **사후에** 다국어를 적용해야 한다면 어떻게 해야 할까요?

`next-intl`이나 `next-i18next` 같은 기존 라이브러리를 사용해 본 개발자라면 그 고통을 잘 알고 있습니다:

- 수백 개의 JSX/TSX 파일에서 하드코딩된 문자열을 일일이 찾아내기.
- 중첩된 JSON 딕셔너리를 수동 생성하고 번역 키(`pages.dashboard.header.title` 등)를 작명하기.
- 텍스트를 복잡한 훅(`t('...')`)으로 교체하기.
- `app/` 디렉터리 전체를 `app/[locale]/...`로 재구성하여 기존 URL과 검색 엔진 색인을 손상시키기.

2026년에는 코드를 처음부터 다시 짤 필요가 없습니다. **Intlayer**를 사용하면 자동 텍스트 추출, AI 번역, 비침습적 라우팅을 통해 단 몇 분 만에 기존 Next.js 앱에 다국어를 도입할 수 있습니다.

> Next.js 16 App Router에 대한 단계별 전체 기술 가이드를 찾고 계신가요? 전용 문서를 확인하세요: [Intlayer로 Next.js 16 번역하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md).

## 목차

<TOC/>

## 사후 적용의 딜레마: 기존 앱에 다국어를 추가하기 힘든 이유

기존 Next.js 애플리케이션에 국제화를 적용할 때 개발자는 세 가지 큰 문제에 직면합니다:

1. **코드베이스 오염**: 문자열을 수동 추출하면 거의 모든 컴포넌트 파일을 수정해야 하므로 회귀 버그 위험이 급증합니다.
2. **라우팅 구조 강제**: 기존 i18n 라이브러리는 레이아웃과 페이지를 `[locale]` 동적 세그먼트로 이동하도록 강제합니다.
3. **지루한 번역 작업**: 추출 후 수십 개 언어로 번역하기 위해 끝없는 복사-붙여넣기 작업이 필요합니다.

Intlayer는 **컴파일러 기반 자동 추출**, **선언적 딕셔너리**, **유연한 라우팅**으로 이러한 문제를 아키텍처 수준에서 해결합니다.

## 자동 콘텐츠 추출 (수동 텍스트 검색 불필요)

### 옵션 A: CLI 추출 도구 (`npx intlayer extract`)

프로젝트에서 Intlayer의 추출 CLI를 바로 실행하세요:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

React 컴포넌트를 정적 분석하여 사용자 텍스트를 추출하고 컴포넌트 바로 옆에 선언형 파일(`.content.ts`)을 자동 생성합니다.

### 옵션 B: Intlayer 컴파일러 (빌드 타임 자동 추출)

컴파일러를 활성화하면 기본 언어로 일반 텍스트를 컴포넌트에 그대로 작성하면 됩니다. 빌드 시 컴파일러가 텍스트를 추출하고 번역 콘텐츠를 자동으로 주입합니다:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

백그라운드에서 Intlayer가 딕셔너리를 빌드하고 컴포넌트를 현지화된 콘텐츠에 연결하므로 수동 리팩토링 과정이 완전히 사라집니다.

이 경우 다음과 같은 내용으로 `src/app/page.content.ts` 파일이 생성됩니다:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## 선호하는 LLM을 활용한 AI 자동 번역

콘텐츠가 추출되면 내장된 AI CLI를 통해 OpenAI, Anthropic, DeepSeek, Mistral을 사용하여 몇 초 만에 다국어로 번역할 수 있습니다:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "생산성 및 팀 협업을 위한 SaaS 대시보드",
  },
};

export default config;
```

`npx intlayer fill`을 실행하면 설정된 모든 로케일에 대한 번역이 `.content.ts` 선언 파일에 자동으로 채워집니다:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      ko: "플랫폼에 오신 것을 환영합니다",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      ko: "지금 바로 모던한 기능을 탐색해 보세요.",
    }),
  },
};

export default content;
```

Intlayer는 LLM에 상위 수준의 `applicationContext`를 제공하므로 생성된 번역이 기존 자동 번역 도구보다 기술적 뉘앙스, 브랜드 톤, 문법적 맥락을 훨씬 잘 유지합니다.

프로덕션 배포 전 누락된 텍스트가 없는지 확인하려면:

```bash
npx intlayer test
```

## 기존 URL을 손상시키지 않고 다국어 라우팅 추가

Intlayer는 다양한 라우팅 모드를 기본 지원합니다:

- **쿼리 파라미터 / 쿠키 모드 (`search-params`)**: `[locale]` 폴더로 이동하지 않고 기존 `/app/page.tsx` 구조를 그대로 유지합니다.
- **접두사 모드 (`prefix` / `prefix-all-locales`)**: SEO 친화적인 URL(`/ko/dashboard`)이 필요할 때 Next.js 프록시를 통해 간편하게 처리할 수 있습니다.

단 몇 초 만에 Next.js 연동 설정을 완료하세요:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

루트 레이아웃을 `IntlayerProvider`로 감싸세요:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## 다국어 SEO

다국어 메타데이터 및 `hreflang` 태그를 자동 생성하여 글로벌 검색 엔진 노출을 최적화합니다:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## 더 알아보기: 단계별 구현 가이드가 준비되어 있습니다

이 글은 기존 Next.js 앱을 사후에 다국어화하는 아키텍처 개요를 설명했습니다. 미들웨어 설정, 정적 생성 (`generateStaticParams`), 서버 컴포넌트 통합을 포함한 전체 가이드는 공식 문서를 참조하세요:

👉 **[Intlayer로 Next.js 16 번역하기 전체 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)**

## 자주 묻는 질문 (FAQ)

<FAQ>

<Question title="app/[locale]로 파일을 옮기지 않고도 Next.js 앱을 다국어화할 수 있나요?">

네. Intlayer는 `routing.mode: "search-params"`와 쿠키/헤더 감지를 지원하여 기존 폴더 구조를 완전히 유지할 수 있습니다.

</Question>
<Question title="기존 코드의 모든 문자열을 수동으로 바꿔야 하나요?">

아닙니다. `npx intlayer extract` 또는 Intlayer 컴파일러를 통해 자동으로 추출 및 선언할 수 있습니다.

</Question>
<Question title="next-intl 대비 Intlayer는 어떻게 번들 크기를 줄이나요?">

컴포넌트 단위 선언과 빌드 타임 매크로를 통해 실제 페이지에서 사용되는 번역 필드만 클라이언트에 번들링합니다.

</Question>
<Question title="AI를 사용해 컴포넌트를 여러 언어로 자동 번역할 수 있나요?">

네. `npx intlayer fill` 명령을 통해 OpenAI, Claude 등 다양한 LLM으로 문맥을 고려한 고품질 번역을 자동 생성합니다.

</Question>
</FAQ>
