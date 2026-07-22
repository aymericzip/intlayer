---
createdAt: 2025-11-20
updatedAt: 2026-06-23
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

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent)와 같은 도구 모음도 함께 제공됩니다. 기술](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

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
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
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

> `getLocaleFromStorage`는 구성에 따라 헤더 또는 쿠키에서 로케일을 확인합니다. 자세한 내용은 [Configuration](https://intlayer.org/doc/configuration) 문서를 참조하세요.

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

</Steps>

### Git 구성

Intlayer가 생성한 파일은 무시하는 것이 권장됩니다.

```plaintext fileName=".gitignore"
# Intlayer가 생성한 파일 무시
.intlayer
```

---

<Steps>

<Step number={1} title="컴포넌트 콘텐츠 추출" isOptional={true}>

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 많이 걸릴 수 있습니다.

이 프로세스를 용이하게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하기 위한 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함합니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### 더 나아가기

- **비주얼 에디터**: UI에서 직접 번역을 편집할 수 있도록 [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 통합하세요.
- **CMS**: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠 관리를 외부화하세요.
