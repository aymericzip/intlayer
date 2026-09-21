---
createdAt: 2024-03-07
updatedAt: 2026-09-06
title: "기존 Vite 및 React 애플리케이션을 사후에 다국어(i18n)화하는 방법 (2026 가이드)"
description: "기존 Vite 및 React 앱을 대대적인 리팩토링 없이 다국어(i18n)화하는 2026년 가이드. Intlayer를 활용한 자동 텍스트 추출, AI 번역 및 번들 최적화를 경험하세요."
keywords:
  - Vite i18n
  - React i18n
  - 국제화
  - 기존 Vite 앱 번역
  - 기존 React 앱 번역
  - Intlayer
  - 다국어
  - 컴파일러
  - AI 번역
  - SEO
slugs:
  - blog
  - transform-existing-react-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
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

# 기존 Vite 및 React 애플리케이션을 사후에 다국어(i18n)화하는 방법 (2026 가이드)

처음부터 Vite 및 React 프로젝트에 국제화(i18n)를 적용하는 것은 비교적 간단합니다. 하지만 이미 단일 언어로 구축되어 배포 중인 애플리케이션에 **사후에** 다국어를 적용해야 한다면 어떻게 해야 할까요?

`react-i18next`나 `react-intl` 같은 기존 라이브러리를 사용해 본 개발자라면 그 번거로움을 잘 알고 있습니다:

- 수백 개의 JSX 및 TSX 파일에서 하드코딩된 문자열을 일일이 찾아내기.
- 중첩된 JSON 딕셔너리를 수동으로 생성하고 번역 키(`components.header.title` 등)를 임의로 작명하기.
- UI 텍스트를 번거로운 훅(`t('...')`)으로 교체하기.
- 클라이언트 측 라우팅, 상태 관리 및 언어 전환 로직을 재구성하기.

2026년에는 코드베이스 전체를 처음부터 다시 작성할 필요가 없습니다. **Intlayer**를 사용하면 자동 텍스트 추출, AI 번역 및 매끄러운 Vite 통합을 통해 단 몇 분 만에 기존 Vite 및 React 앱에 다국어를 도입할 수 있습니다.

> Vite 및 React에 대한 단계별 기술 가이드를 찾고 계신가요? 전용 문서를 확인하세요: [Intlayer로 Vite 및 React 번역하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md).

## 목차

<TOC/>

## 사후 적용의 딜레마: 기존 앱에 다국어를 추가하기 힘든 이유

기존 Vite 및 React 애플리케이션에 국제화를 적용할 때 개발자는 세 가지 큰 장애물에 직면합니다:

1. **코드베이스 오염**: 문자열을 수동으로 JSON 딕셔너리에 추출하려면 거의 모든 컴포넌트 파일을 수정해야 합니다. 이는 대규모 Git diff, 병합 충돌 위험 및 화면 깨짐 버그를 유발합니다.
2. **번역 키 관리 부담**: 텍스트 조각마다 `dashboard.hero.ctaButton`과 같은 키를 작명하는 것은 개발 속도를 늦추고 문구가 바뀔 때마다 인지적 부담을 줍니다.
3. **지루한 번역 작업**: 문자열을 추출한 후 5개, 10개 또는 20개 언어로 딕셔너리를 채우려면 끝없는 복사-붙여넣기나 값비싼 외부 번역 서비스가 필요합니다.

Intlayer는 **컴파일러 기반 자동 추출**, **컴포넌트 단위 선언적 딕셔너리**, 그리고 **Vite와의 완벽한 통합**을 통해 이러한 문제를 근본적으로 해결합니다.

## 자동 콘텐츠 추출 (수동 문자열 탐색 불필요)

JSX에서 하드코딩된 문자열을 일일이 복사할 필요 없이, Intlayer는 두 가지 편리한 경로를 제공합니다:

### 옵션 A: CLI 추출 도구 (`npx intlayer extract`)

코드베이스에서 바로 Intlayer의 추출 도구를 실행할 수 있습니다:

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

이 명령어는 React 컴포넌트를 파싱하고 사용자에게 표시되는 텍스트를 감지하여 컴포넌트 파일 바로 옆에 콘텐츠 선언 파일(`.content.ts`)을 자동 생성합니다. 컴포넌트 로직은 선언적이고 명확하며 타입 안전하게 유지되며, 번역 키를 손수 작성할 필요가 없습니다.

### 옵션 B: Intlayer 컴파일러 (빌드 타임 자동 추출)

설정에서 Intlayer 컴파일러를 활성화하면 기본 언어의 일반 텍스트로 컴포넌트를 평소처럼 계속 작성할 수 있습니다. 빌드 시 컴파일러가 텍스트를 추출하고 지역화된 콘텐츠를 자동으로 주입합니다:

```tsx fileName="src/App.tsx"
// 일반적인 React 코드를 작성하세요. 컴파일러가 자동으로 텍스트를 추출합니다
export default function App() {
  return (
    <section>
      <h1>플랫폼에 오신 것을 환영합니다</h1>
      <p>지금 최신 기능을 경험해 보세요.</p>
    </section>
  );
}
```

백그라운드에서 Intlayer가 딕셔너리를 빌드하고 컴포넌트를 지역화된 콘텐츠와 자동으로 연결하므로 수동 리팩토링 단계가 완전히 생략됩니다.

이 경우 다음과 같은 구조의 `src/App.content.ts` 선언 파일이 생성됩니다:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    peullaespomeOsinGeoseulHwan: t({
      ko: "플랫폼에 오신 것을 환영합니다",
    }),
    jigeumChoesinGineungeulGyeon: t({
      ko: "지금 최신 기능을 경험해 보세요.",
    }),
  },
};

export default content;
```

## 선호하는 LLM을 활용한 AI 자동 번역

콘텐츠가 추출된 후 수십 개 언어로 번역하는 데 며칠씩 걸릴 필요가 없습니다. Intlayer에는 자체 API 키를 사용하여 OpenAI, Anthropic, DeepSeek, Mistral과 직접 연동되는 AI 번역 CLI가 내장되어 있습니다:

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

`intlayer.config.ts`에서 지원할 로케일과 AI 제공자를 설정합니다:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.KOREAN],
    defaultLocale: Locales.KOREAN,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Vite 및 React로 구축된 최신 SaaS 애플리케이션 및 대시보드",
  },
};

export default config;
```

`npx intlayer fill`을 실행하면 설정된 모든 로케일에 대해 고품질 번역이 콘텐츠 선언 파일에 채워집니다:

```typescript fileName="src/App.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "app",
  content: {
    peullaespomeOsinGeoseulHwan: t({
      ko: "플랫폼에 오신 것을 환영합니다",
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
    }),
    jigeumChoesinGineungeulGyeon: t({
      ko: "지금 최신 기능을 경험해 보세요.",
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
    }),
  },
};

export default content;
```

Intlayer가 모델에 `applicationContext`를 제공하므로 생성된 번역은 일반 기계 번역보다 기술적 맥락, 브랜드 보이스 및 문법적 디테일을 훨씬 더 정확하게 유지합니다.

배포 전 누락된 텍스트가 없는지 확인하려면 다음을 실행하세요:

```bash
npx intlayer test
```

## Vite 통합 및 Provider 설정

Vite에 Intlayer를 통합하는 것은 `vite.config.ts`에 플러그인을 추가하고 루트 컴포넌트를 `IntlayerProvider`로 감싸는 것만으로 완료됩니다:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Intlayer v9부터 컴파일러는 `intlayer()` 플러그인에 내장되어 있어 `intlayer.config.ts`에 `compiler.enabled`를 설정하면 자동으로 활성화됩니다.

루트 컴포넌트에서 애플리케이션을 `IntlayerProvider`로 감싸줍니다:

```tsx fileName="src/App.tsx"
import { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { MainContent } from "./MainContent";

const App: FC = () => {
  return (
    <IntlayerProvider>
      <MainContent />
    </IntlayerProvider>
  );
};

export default App;
```

### 동적 언어 전환

`useLocale` 훅을 사용하여 애플리케이션 어디에서나 간편하게 언어를 전환할 수 있습니다:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locales)}
    >
      {availableLocales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## 다국어 SEO (Sitemap 및 Robots.txt)

Intlayer는 정적 Vite 배포 환경을 위해 크롤러 친화적인 `sitemap.xml` 및 `robots.txt`를 생성하는 `generateSitemap` 및 `getMultilingualUrls`와 같은 유틸리티를 제공합니다:

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://example.com").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);
console.log("SEO 파일이 성공적으로 생성되었습니다.");
```

`package.json`에 `prebuild` 스크립트를 추가하여 `vite build` 전에 실행되도록 설정합니다:

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## 심층 가이드: 단계별 설정이 준비되셨나요?

이 가이드는 2026년에 대규모 리팩토링 없이 기존 Vite 및 React 앱을 다국어화하는 전반적인 개념을 소개했습니다.

엄격한 TypeScript 타입 안전성, 동적 딕셔너리 및 비주얼 에디터를 포함한 모든 설정 단계를 자세히 확인하려면 공식 기술 가이드를 참고하세요:

👉 **[Intlayer를 활용한 Vite 및 React 번역 전체 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)**

## 자주 묻는 질문 (FAQ)

<FAQ>

<Question title="모든 문자열을 수동으로 수정하지 않고도 Vite 및 React 앱을 다국어화할 수 있나요?">

네. `npx intlayer extract`를 실행하여 하드코딩된 텍스트를 지역화된 콘텐츠 선언 파일로 자동 추출하거나, Intlayer 컴파일러를 사용하여 빌드 시 컴포넌트를 자동 변환하면서 표준 JSX를 작성할 수 있습니다.

</Question>
<Question title="react-i18next나 react-intl에 비해 Intlayer는 어떻게 Vite 번들 크기를 줄이나요?">

Intlayer는 컴포넌트별 딕셔너리 정의와 빌드 타임 매크로 최적화를 사용합니다. 거대한 JSON 파일을 한 번에 불러오는 대신 현재 화면에 렌더링되는 컴포넌트에 필요한 데이터만 번들에 포함됩니다. 동적 딕셔너리를 통해 언어별 지연 로딩도 가능합니다.

</Question>
<Question title="AI를 사용하여 기존 컴포넌트를 여러 언어로 자동 번역할 수 있나요?">

네. Intlayer CLI의 `npx intlayer fill` 명령어를 사용하면 설정된 AI 제공자(OpenAI, Anthropic, Mistral, DeepSeek)와 연동하여 프로젝트 전체에서 누락된 언어 번역을 문맥에 맞게 생성할 수 있습니다.

</Question>
<Question title="컴포넌트를 다시 작성하지 않고 react-i18next나 react-intl에서 마이그레이션할 수 있나요?">

네. Intlayer는 `react-i18next` 및 `react-intl`을 위한 호환 어댑터를 제공하며, 기존 JSON 번역 파일을 동기화할 수 있는 전용 플러그인(`sync-json`)도 제공합니다.

</Question>

</FAQ>
