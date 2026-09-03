---
createdAt: 2025-11-20
updatedAt: 2026-08-30
title: "SvelteKit i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) SvelteKit 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 7.1.10
    date: 2025-11-20
    changes: "초기 기록"
author: aymericzip
---

# Intlayer를 사용하여 SvelteKit 웹사이트 번역하기 | 국제화(i18n)

<Tabs defaultTab="code">
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'svelte-i18n' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화 기능을 제공하는 솔루션입니다.

<AccordionGroup>
<Accordion header="전체 SvelteKit 적용 범위">

Intlayer는 **다국어 라우팅**, **SSR 지원** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 SvelteKit과 완벽하게 작동하도록 최적화되었습니다.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

</Accordion>

<Accordion header="유지관리성">

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

</Accordion>

<Accordion header="오토메이션">

AI 공급자의 비용으로 선택한 LLM을 사용하여 CI/CD 파이프라인을 번역하려면 자동화를 사용하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**을 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

대규모 JSON 파일을 구성 요소에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="개발자가 없는 경우 확장">

Intlayer는 단순한 i18n 솔루션 그 이상으로 관리에 도움이 되는 **자체 호스팅 [비주얼 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** 및 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공합니다. 다국어 콘텐츠를 **실시간**으로 제공하여 번역가, 카피라이터, 기타 팀원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

</Accordion>
</AccordionGroup>

---

## SvelteKit 애플리케이션에서 Intlayer 설정 단계별 가이드

GitHub에서 [Application Template](https://github.com/aymericzip/intlayer-sveltekit-template)을 참조하세요.

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

<Steps>

<Step number={1} title="의존성 설치">

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: 핵심 i18n 패키지입니다.
- **svelte-intlayer**: Svelte/SvelteKit용 컨텍스트 제공자와 스토어를 제공합니다.
- **vite-intlayer**: 콘텐츠 선언을 빌드 프로세스와 통합하는 Vite 플러그인입니다.

</Step>

<Step number={2} title="프로젝트 구성">

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

</Step>

<Step number={3} title="Vite 구성에 Intlayer 통합하기">

`vite.config.ts` 파일을 업데이트하여 Intlayer 플러그인을 포함하세요. 이 플러그인은 콘텐츠 파일의 트랜스파일을 처리합니다.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 순서가 중요하며, Intlayer는 SvelteKit보다 먼저 위치해야 합니다.
});
```

</Step>

<Step number={4} title="콘텐츠 선언하기">

`src` 폴더 내 어디에서든 콘텐츠 선언 파일을 생성하세요 (예: `src/lib/content` 또는 컴포넌트와 함께). 이 파일들은 각 로케일별로 `t()` 함수를 사용하여 애플리케이션의 번역 가능한 콘텐츠를 정의합니다.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

</Step>

<Step number={5} title="컴포넌트에서 Intlayer 사용하기">

이제 모든 Svelte 컴포넌트에서 `useIntlayer` 함수를 사용할 수 있습니다. 이 함수는 로케일이 변경될 때 자동으로 업데이트되는 반응형 스토어를 반환합니다. 이 함수는 현재 로케일을 자동으로 존중합니다 (SSR 및 클라이언트 측 네비게이션 모두).

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
<h1>{@const Title = $content.title}<Title /></h1>
<!-- 콘텐츠를 문자열로 렌더링하기 -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="라우팅 설정하기" isOptional={true}>

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

</Step>

<Step number={7} title="서버 사이드 로케일 감지 처리 (Hooks)">

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

> `getLocaleFromStorage`는 구성에 따라 헤더 또는 쿠키에서 로케일을 확인합니다. 자세한 내용은 [Configuration](https://intlayer.org/doc/concept/configuration) 문서를 참조하세요.

> `localeDetector` 함수는 `Accept-Language` 헤더를 처리하여 가장 적합한 로케일을 반환합니다.

로케일이 구성되지 않은 경우 404 오류를 반환하고자 합니다. 이를 쉽게 하기 위해 로케일이 유효한지 확인하는 `match` 함수를 만들 수 있습니다:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
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
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// 제네릭 Load 타입 사용
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
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
	import { useIntlayer } from "svelte-intlayer";

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

</Step>

<Step number={8} title="국제화된 링크" isOptional={true}>

SEO를 위해 경로에 로케일 접두사를 붙이는 것이 권장됩니다(예: `/en/about`, `/fr/about`). 이 컴포넌트는 현재 로케일로 모든 링크에 자동으로 접두사를 붙입니다.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

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

</Step>

<Step number={9} title="언어 전환기" isOptional={true}>

사용자가 언어를 전환할 수 있도록 URL을 업데이트합니다.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
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

</Step>

<Step number={10} title="백엔드 프록시 추가" isOptional={true}>

SvelteKit 애플리케이션에 백엔드 프록시를 추가하려면 `vite-intlayer` 플러그인이 제공하는 `intlayerProxy` 함수를 사용할 수 있습니다. 이 플러그인은 URL, 쿠키 및 브라우저 언어 설정을 기반으로 사용자에게 가장 적합한 로케일을 자동으로 감지합니다.

> Intlayer v9부터 `intlayerProxy()`는 `intlayer()` 플러그인에 직접 번들되어 있으며 `routing.enableProxy` 옵션(`true`가 기본값)을 통해 기본적으로 활성화됩니다. 아래와 같이 별도로 등록하는 것은 이제 선택 사항이며, 역호환성 및 플러그인 순서를 제어해야 하는 설정을 위해 유지됩니다. `routing.enableProxy: false`로 설정하여 옵트아웃할 수 있습니다. [v9 릴리스 노트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/releases/v9.md)를 참조하세요.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="intlayer 에디터 / CMS 설정하기" isOptional={true}>

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
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="Extract the content of your components" isOptional={true}>

기존 codebase가 있다면 수천 개의 파일을 변환하는 것은 시간이 많이 걸릴 수 있습니다.

이 프로세스를 간편하게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하는 [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제공합니다.

이를 설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 config
  compiler: {
    /**
     * 컴파일러가 활성화되어야 하는지 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환 후 컴포넌트를 저장할지 여부를 나타냅니다.
     *
     * - `true`인 경우, 컴파일러는 디스크의 컴포넌트 파일을 다시 작성합니다. 따라서 변환은 영구적이며, 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이런 방식으로 컴파일러는 앱을 변환한 후 제거할 수 있습니다.
     *
     * - `false`인 경우, 컴파일러는 `useIntlayer()` 함수 호출을 빌드 출력의 코드에만 주입하고 기본 codebase를 손상되지 않은 상태로 유지합니다. 변환은 메모리에서만 수행됩니다.
     */
    saveComponents: false,

    /**
     * 딕셔너리 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

extractor를 실행하여 컴포넌트를 변환하고 콘텐츠를 추출합니다

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
 <Tab value='Babel compiler'>

> v9부터 `intlayerCompiler`는 `intlayer` 플러그인에 포함되어 있습니다. 따라서 수동으로 추가할 필요가 없습니다.

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함시킵니다:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // compiler plugin을 추가합니다
  ],
});
```

```bash packageManager="npm"
npm run build # 또는 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 또는 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 또는 yarn dev
```

```bash packageManager="bun"
bun run build # 또는 bun run dev
```

</Tab>
</Tabs>
</Step>

</Steps>

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

## 자주 묻는 질문

<FAQ>

<Question title="SvelteKit 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

- **`svelte-i18n`** 및 **`typesafe-i18n`**: 수동으로 load 함수에 연결해야 하는 스토어(store) 기반 메시지 카탈로그입니다.
- **`Paraglide`**: 강력한 타입 안전성을 갖춘 컴파일된 메시지 라이브러리로, 메시지 계층 자체에만 집중합니다.
- **`Intlayer`**: 가장 진보된 솔루션입니다. 코드베이스 어디에나 콘텐츠를 선언할 수 있으며([각 컴포넌트 옆 또는 중앙 집중식](https://intlayer.org/ko/blog/per-component-vs-centralized-i18n)), 빌드 타임에 컴파일되고, 로케일 인식 라우팅, 서버 사이드 로케일 감지, AI 번역, 비주얼 에디터 및 CMS를 지원합니다.

SvelteKit에서는 서버 측 기능에서 차이가 두드러집니다: hooks에서의 로케일 감지, 지역화된 링크 및 에디터 통합이 프로젝트마다 직접 조립할 필요 없이 라이브러리에 기본 내장되어 있습니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)와 [Svelte i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/svelte.md)를 참조하세요.

</Question>

<Question title="i18n이 SvelteKit 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. 서버 렌더링 마크업은 서버에서 콘텐츠를 확인하고, 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거되고, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/svelte.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 svelte-i18n 또는 typesafe-i18n에서 마이그레이션할 수 있나요?">

대부분 가능합니다. 콘텐츠를 이전하려면 [Svelte I18n 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/svelte-i18n.md)를 따르세요. 점진적으로 마이그레이션할 수도 있습니다: [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 기존 JSON 카탈로그를 단일 진실 공급원(source of truth)으로 유지하면서 Intlayer 사전을 생성하므로 컴포넌트를 하나씩 이전하는 동안 두 계층의 동기화가 유지됩니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 컴포넌트를 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. 이 가이드의 12단계를 확인하세요.

완전 자동화된 파이프라인을 위해 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)는 빌드 타임에 JSX, TSX, Vue 및 Svelte 소스에서 동일한 작업을 수행하여 변경될 때마다 사전을 생성하고 HMR을 통해 동기화하므로 수동으로 키를 관리할 필요가 없습니다.

컴파일러를 켜기 전에 알아두어야 할 두 가지 제한 사항이 있습니다. 정적 분석으로 작동하므로 API 오류 코드나 CMS 필드와 같이 런타임에만 존재하는 문자열은 처리할 수 없습니다. 또한 큰 코드베이스에서 몇 가지 어노테이션이 필요한 `className="active"` 또는 상태 코드와 같은 애플리케이션 로직과 사용자 대면 텍스트를 구분해야 합니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)은 사용자가 직접 제어할 수 있도록 하여 두 가지 문제를 모두 방지합니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="Intlayer는 SvelteKit 서버 사이드 렌더링(SSR) 및 사전 렌더링(prerendering)과 호환되나요?">

네. 7단계에서 `hooks.server.ts`의 서버 측 로케일 감지를 다룹니다. 따라서 첫 번째 HTML 응답에 이미 올바른 언어가 포함되어 검색 엔진과 소셜 크롤러가 바로 읽을 수 있습니다. 사전 렌더링된 라우트는 빌드 타임에 콘텐츠를 확인합니다.

</Question>

<Question title="지역화된 라우트와 다국어 링크는 어떻게 설정하나요?">

6단계와 8단계에서 다룹니다. 라우트 트리의 로케일 세그먼트와 링크용 `getLocalizedUrl`을 통해 활성 언어 내에서 탐색이 유지되며, `routing.mode`는 기본 로케일에 접두사를 붙일지 여부를 결정합니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="Svelte에서 언어 전환기는 어떻게 구현하나요?">

9단계에서 해당 컴포넌트를 보여줍니다. `useLocale`은 활성 로케일, 선언된 로케일 및 선택 사항을 쿠키에 유지하는 설정 함수(setter)를 노출하며, `getLocalizedUrl`은 전환 후에도 독자가 동일한 페이지에 머무를 수 있도록 현재 경로를 다시 작성합니다.

</Question>

<Question title="AI를 사용하여 SvelteKit 앱을 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 누락된 번역을 채워주며, `--git-diff`를 사용하면 브랜치에서 변경된 콘텐츠로 번역 범위를 제한할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 복수형, 성별 및 서식 있는 텍스트(Rich Text)를 지원하나요?">

네: [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md), 긴 텍스트를 위한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md) 및 숫자, 날짜, 통화를 위한 [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)를 지원합니다.

</Question>

<Question title="번역가가 코드를 건드리지 않고 콘텐츠를 수정할 수 있나요?">

자체 인프라에서 실행되어 실행 중인 앱에서 직접 텍스트를 수정할 수 있는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 배포 없이 변경할 수 있도록 콘텐츠를 외부화하는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 통해 가능합니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
