---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: SvelteKit 앱 번역 방법 – i18n 가이드 2026
description: SvelteKit 웹사이트를 다국어로 만드는 방법을 알아보세요. 서버 사이드 렌더링(SSR)을 사용하여 국제화(i18n) 및 번역하는 문서를 따라가세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - SvelteKit
  - 자바스크립트
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init 명령어 추가
  - version: 7.1.10
    date: 2025-11-20
    changes: 초기 기록
---

# Intlayer를 사용하여 SvelteKit 웹사이트 번역하기 | 국제화(i18n)

## 목차

<TOC/>

## Intlayer란 무엇인가?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다. **SvelteKit**의 서버 사이드 렌더링(SSR) 기능과 원활하게 작동합니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**할 수 있습니다.
- **SvelteKit의 SSR을 활용하여 SEO 친화적인 국제화**를 구현할 수 있습니다.

---

## SvelteKit 애플리케이션에서 Intlayer 설정 단계별 가이드

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

시작하려면 새 SvelteKit 프로젝트를 생성하세요. 다음은 우리가 만들 최종 구조입니다:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: 핵심 i18n 패키지입니다.
- **svelte-intlayer**: Svelte/SvelteKit용 컨텍스트 제공자와 스토어를 제공합니다.
- **vite-intlayer**: 콘텐츠 선언을 빌드 프로세스와 통합하는 Vite 플러그인입니다.

### 2단계: 프로젝트 구성

프로젝트 루트에 구성 파일을 생성합니다:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 3단계: Vite 구성에 Intlayer 통합하기

`vite.config.ts` 파일을 업데이트하여 Intlayer 플러그인을 포함하세요. 이 플러그인은 콘텐츠 파일의 트랜스파일을 처리합니다.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 순서가 중요하며, Intlayer는 SvelteKit보다 먼저 위치해야 합니다.
});
```

### 4단계: 콘텐츠 선언하기

`src` 폴더 내 어디에서든 콘텐츠 선언 파일을 생성하세요 (예: `src/lib/content` 또는 컴포넌트와 함께). 이 파일들은 각 로케일별로 `t()` 함수를 사용하여 애플리케이션의 번역 가능한 콘텐츠를 정의합니다.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### 5단계: 컴포넌트에서 Intlayer 사용하기

이제 어떤 Svelte 컴포넌트에서든 `useIntlayer` 함수를 사용할 수 있습니다. 이 함수는 locale이 변경될 때 자동으로 업데이트되는 반응형 스토어를 반환합니다. 이 함수는 SSR과 클라이언트 사이드 내비게이션 모두에서 현재 locale을 자동으로 인식합니다.

> **참고:** `useIntlayer`는 Svelte 스토어를 반환하므로, 반응형 값을 접근하려면 `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: SvelteKit 앱 번역 방법 – i18n 가이드 2026
> description: SvelteKit 웹사이트를 다국어로 만드는 방법을 알아보세요. 서버 사이드 렌더링(SSR)을 사용하여 국제화(i18n) 및 번역하는 문서를 따라가세요.
> keywords:

- 국제화
- 문서
- Intlayer
- SvelteKit
- 자바스크립트
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: 초기 기록

---

# Intlayer를 사용하여 SvelteKit 웹사이트 번역하기 | 국제화(i18n)

## 목차

<TOC/>

## Intlayer란 무엇인가?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다. **SvelteKit**의 서버 사이드 렌더링(SSR) 기능과 원활하게 작동합니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**할 수 있습니다.
- **SvelteKit의 SSR을 활용하여 SEO 친화적인 국제화**를 구현할 수 있습니다.

---

## SvelteKit 애플리케이션에서 Intlayer 설정 단계별 가이드

시작하려면 새 SvelteKit 프로젝트를 생성하세요. 다음은 우리가 만들 최종 구조입니다:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: 핵심 i18n 패키지입니다.
- **svelte-intlayer**: Svelte/SvelteKit용 컨텍스트 제공자와 스토어를 제공합니다.
- **vite-intlayer**: 콘텐츠 선언을 빌드 프로세스와 통합하는 Vite 플러그인입니다.

### 2단계: 프로젝트 구성

프로젝트 루트에 구성 파일을 생성합니다:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### 3단계: Vite 구성에 Intlayer 통합하기

`vite.config.ts` 파일을 업데이트하여 Intlayer 플러그인을 포함하세요. 이 플러그인은 콘텐츠 파일의 트랜스파일을 처리합니다.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 순서가 중요하며, Intlayer는 SvelteKit보다 먼저 위치해야 합니다.
});
```

### 4단계: 콘텐츠 선언하기

`src` 폴더 내 어디에서든 콘텐츠 선언 파일을 생성하세요 (예: `src/lib/content` 또는 컴포넌트와 함께). 이 파일들은 각 로케일별로 `t()` 함수를 사용하여 애플리케이션의 번역 가능한 콘텐츠를 정의합니다.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### 5단계: 컴포넌트에서 Intlayer 사용하기

접두사를 사용해야 합니다 (예: `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section"은 4단계에서 정의한 키에 해당합니다.
  const content = useIntlayer("hero-section");
</script>

<!-- 간단한 콘텐츠로 렌더링 -->
<h1>{$content.title}</h1>
<!-- 에디터를 사용하여 편집 가능한 콘텐츠로 렌더링 -->
<h1><svelte:component this={$content.title} /></h1>
<!-- 콘텐츠를 문자열로 렌더링하기 -->
<div aria-label={$content.title.value}></div>
```

### (선택 사항) 6단계: 라우팅 설정하기

다음 단계에서는 SvelteKit에서 로케일 기반 라우팅을 설정하는 방법을 보여줍니다. 이를 통해 URL에 로케일 접두사(e.g., `/en/about`, `/fr/about`)를 포함시켜 SEO 및 사용자 경험을 향상시킬 수 있습니다.

```bash
.
└─── src
    ├── app.d.ts                  # 로케일 타입 정의
    ├── hooks.server.ts           # 로케일 라우팅 관리
    ├── lib
    │   └── getLocale.ts          # 헤더, 쿠키에서 로케일 확인
    ├── params
    │   └── locale.ts             # 로케일 파라미터 정의
    └── routes
        ├── [[locale=locale]]     # 로케일을 설정하기 위한 라우트 그룹 래핑
        │   ├── +layout.svelte    # 경로에 대한 로컬 레이아웃
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # 폰트 및 전역 스타일을 위한 루트 레이아웃
```

### 7단계: 서버 사이드 로케일 감지 처리 (Hooks)

SvelteKit에서는 SSR 중에 올바른 콘텐츠를 렌더링하기 위해 서버가 사용자의 로케일을 알아야 합니다. 우리는 URL이나 쿠키에서 로케일을 감지하기 위해 `hooks.server.ts`를 사용합니다.

`src/hooks.server.ts` 파일을 생성하거나 수정하세요:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // 현재 경로가 이미 로케일로 시작하는지 확인 (예: /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // URL에 로케일이 없으면 (예: 사용자가 "/" 방문 시) 리다이렉트
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // 임시 리다이렉트
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

그런 다음, 요청 이벤트에서 사용자의 로케일을 가져오는 헬퍼를 만듭니다:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * 요청 이벤트에서 사용자의 로케일을 가져옵니다.
 * 이 함수는 `src/hooks.server.ts`의 `handle` 훅에서 사용됩니다.
 *
 * 먼저 Intlayer 저장소(쿠키 또는 커스텀 헤더)에서 로케일을 가져오려고 시도합니다.
 * 로케일을 찾지 못하면 브라우저의 "Accept-Language" 협상으로 대체합니다.
 *
 * @param event - SvelteKit의 요청 이벤트
 * @returns 사용자의 로케일
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Intlayer 저장소(쿠키 또는 헤더)에서 로케일을 가져오려고 시도
  const storedLocale = getLocaleFromStorage({
    // SvelteKit 쿠키 접근
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKit 헤더 접근
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // 브라우저 "Accept-Language" 협상으로 대체
  const negotiatorHeaders: Record<string, string> = {};

  // SvelteKit Headers 객체를 일반 Record<string, string>으로 변환
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // `Accept-Language` 헤더에서 로케일 확인
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // 일치하는 로케일이 없으면 기본 로케일 반환
  return defaultLocale;
};
```

> `getLocaleFromStorage`는 구성에 따라 헤더 또는 쿠키에서 로케일을 확인합니다. 자세한 내용은 [Configuration](https://intlayer.org/doc/configuration) 문서를 참조하세요.

> `localeDetector` 함수는 `Accept-Language` 헤더를 처리하여 가장 적합한 로케일을 반환합니다.

로케일이 구성되지 않은 경우 404 오류를 반환하고자 합니다. 이를 쉽게 하기 위해 로케일이 유효한지 확인하는 `match` 함수를 만들 수 있습니다:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **참고:** `src/app.d.ts` 파일에 로케일 정의가 포함되어 있는지 확인하세요:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

`+layout.svelte` 파일에서는 i18n과 관련 없는 정적 콘텐츠만 남기고 모든 내용을 제거할 수 있습니다:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

그런 다음, `[[locale=locale]]` 그룹 아래에 새 페이지와 레이아웃을 생성합니다:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// 제네릭 Load 타입 사용
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// 경로에서 로케일로 Intlayer 초기화
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// 레이아웃 콘텐츠 사전 사용
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from 'svelte-intlayer';

	// 홈 콘텐츠 사전을 사용합니다
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

### (선택 사항) 8단계: 국제화된 링크

SEO를 위해 경로에 로케일 접두사를 붙이는 것이 권장됩니다(예: `/en/about`, `/fr/about`). 이 컴포넌트는 현재 로케일로 모든 링크에 자동으로 접두사를 붙입니다.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // 현재 로케일로 URL에 접두사를 붙이는 헬퍼
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

SvelteKit의 `goto`를 사용하는 경우, `getLocalizedUrl`과 같은 로직을 사용하여 로컬라이즈된 URL로 이동할 수 있습니다:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // 로케일에 따라 /en/about 또는 /fr/about로 이동합니다.
```

### (선택 사항) 9단계: 언어 전환기

사용자가 언어를 전환할 수 있도록 URL을 업데이트합니다.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // 스토어에 로케일을 설정하고 onLocaleChange를 트리거합니다
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

### (선택 사항) 10단계: 백엔드 프록시 추가

SvelteKit 애플리케이션에 백엔드 프록시를 추가하려면 `vite-intlayer` 플러그인이 제공하는 `intlayerProxy` 함수를 사용할 수 있습니다. 이 플러그인은 URL, 쿠키 및 브라우저 언어 설정을 기반으로 사용자에게 가장 적합한 로케일을 자동으로 감지합니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (선택 사항) 11단계: intlayer 에디터 / CMS 설정하기

intlayer 에디터를 설정하려면 [intlayer 에디터 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 따라야 합니다.

intlayer CMS를 설정하려면 [intlayer CMS 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 따라야 합니다.

intlayer 에디터 선택기를 시각화하려면 intlayer 콘텐츠에서 컴포넌트 구문을 사용해야 합니다.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- 간단한 콘텐츠로 렌더링 -->
  <h1>{$content.title}</h1>

  <!-- 컴포넌트로 렌더링 (에디터에서 필요) -->
  <svelte:component this={$content.component} />
</div>
```

### Git 구성

Intlayer가 생성한 파일은 무시하는 것이 권장됩니다.

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

---

### 더 나아가기

- **비주얼 에디터**: UI에서 직접 번역을 편집할 수 있도록 [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 통합하세요.
- **CMS**: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠 관리를 외부화하세요.
