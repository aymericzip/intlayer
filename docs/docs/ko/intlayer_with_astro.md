---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Astro i18n - 2026년에 Astro 애플리케이션을 번역하는 방법
description: Intlayer를 사용하여 Astro 사이트에 국제화(i18n)를 추가하는 방법을 배워보세요. 이 가이드를 따라 사이트를 다국어로 만들어 보세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Astro 통합, 설정 및 사용법 업데이트"
---

# Intlayer를 사용하여 Astro 사이트 번역하기 | 국제화 (i18n)

<Tabs defaultTab="code">
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox 데모 - Intlayer로 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 — intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

## Intlayer란 무엇인가요?

**Intlayer**는 현대적인 웹 애플리케이션에서 다국어 지원을 단순화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **번역을 쉽게 관리**하세요: 컴포넌트 레벨의 선언적 사전(Dictionaries)을 사용합니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 로컬라이즈**하세요.
- **TypeScript 지원을 보장**받으세요: 자동 생성된 타입을 통해 자동 완성 및 오류 감지 기능을 향상시킵니다.
- **고급 기능을 활용**하세요: 동적 로케일 감지 및 언어 전환과 같은 기능을 제공합니다.

---

## Astro에서 Intlayer 설정을 위한 단계별 가이드

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-astro-template) 보기.

### 1단계: 종속성 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# 선택 사항: React 아일랜드 지원 추가 시
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# 선택 사항: React 아일랜드 지원 추가 시
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# 선택 사항: React 아일랜드 지원 추가 시
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **astro-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Astro 통합 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어가 포함되어 있습니다.

### 2단계: 프로젝트 설정

애플리케이션의 언어를 설정하기 위한 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 기타 로케일
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 이 설정 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언 위치 및 확장자 설정, 콘솔의 Intlayer 로그 비활성화 등을 구성할 수 있습니다. 사용 가능한 파라미터의 전체 목록은 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Astro 설정에 Intlayer 통합

Astro 설정에 intlayer 플러그인을 추가합니다.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> `intlayer()` 통합 플러그인은 Intlayer를 Astro와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 감시합니다. Astro 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 에일리어스(alias)를 제공합니다.

### 4단계: 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ko: "안녕하세요",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> 콘텐츠 선언은 `contentDir`(기본값 `./src`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치한다면 애플리케이션 어디에서나 정의할 수 있습니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 5단계: Astro에서 콘텐츠 사용

`intlayer`에서 내보낸 핵심 헬퍼를 사용하여 `.astro` 파일에서 직접 사전을 소비할 수 있습니다.

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Fallback for users in unmatched languages -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

### 6단계: 로컬라이즈된 라우팅

로컬라이즈된 페이지를 제공하기 위해 동적 라우트 세그먼트를 생성합니다(예: `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Astro 통합은 개발 중에 언어 인식 라우팅 및 환경 정의를 돕는 Vite 미들웨어를 추가합니다. 또한 직접 로직을 작성하거나 `intlayer`의 `getLocalizedUrl`과 같은 유틸리티를 사용하여 언어 간 링크를 생성할 수 있습니다.

### 7단계: 선호하는 프레임워크 계속 사용하기

선호하는 프레임워크를 사용하여 애플리케이션을 계속 빌드하세요.

- Intlayer + React: [Intlayer with React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer with Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer with Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer with Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer with Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+preact.md)

### TypeScript 설정

Intlayer는 모듈 증강(module augmentation)을 사용하여 TypeScript의 이점을 활용함으로써 코드베이스를 더 견고하게 만듭니다.

![자동 완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 설정에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer가 생성한 파일은 무시하는 것이 좋습니다. 이를 통해 Git 리포지토리에 커밋되는 것을 방지할 수 있습니다.

무시하려면 `.gitignore` 파일에 다음 지침을 추가하세요:

```bash
# Intlayer가 생성한 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer 개발 환경을 개선하기 위해 **공식 Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음 기능을 제공합니다:

- 번역 키 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업(Quick Actions)**.

확장 프로그램 사용에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 15단계: 컴포넌트에서 콘텐츠 추출(선택 사항)

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 많이 걸릴 수 있습니다.

이 프로세스를 용이하게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하기 위한 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러 활성화 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환 후 컴포넌트를 저장할지 여부를 나타냅니다. 그렇게 하면 컴파일러를 한 번만 실행하여 앱을 변환한 다음 제거할 수 있습니다.
     */
    saveComponents: false,

    /**
     * 사전 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='추출 명령'>

컴포넌트를 변환하고 콘텐츠를 추출하기 위해 추출기를 실행합니다

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

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함합니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 컴파일러 플러그인을 추가합니다
  ],
});
```

 </Tab>
</Tabs>

---

### 더 알아보기

더 자세히 알고 싶다면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.
