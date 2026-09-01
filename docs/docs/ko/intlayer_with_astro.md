---
createdAt: 2024-03-07
updatedAt: 2026-08-30
title: "Astro i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Astro 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Astro 통합, 설정 및 사용법 업데이트"
author: aymericzip
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
  title="데모 - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'astro-i18n' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>
<Accordion header="전체 Astro 적용 범위">

Intlayer는 **다국어 라우팅**, **사이트맵** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Astro와 완벽하게 작동하도록 최적화되어 있습니다.

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

## Astro에서 Intlayer 설정을 위한 단계별 가이드

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-astro-template) 보기.

<Steps>

<Step number={1} title="종속성 설치">

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

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

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`을 사용하세요.

> 이 명령어는 당신의 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
```

```bash packageManager="bun"
bun add intlayer astro-intlayer
```

- **intlayer**
  설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **astro-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Astro 통합 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어가 포함되어 있습니다.

</Step>

<Step number={2} title="프로젝트 설정">

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

</Step>

<Step number={3} title="Astro 설정에 Intlayer 통합">

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

</Step>

<Step number={4} title="콘텐츠 선언">

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

> 콘텐츠 선언은 `contentDir`(기본값 `./src`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치한다면 애플리케이션 어디에서나 정의할 수 있습니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={5} title="Astro에서 콘텐츠 사용">

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

</Step>

<Step number={6} title="로컬라이즈된 라우팅">

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

</Step>

<Step number={7} title="언어 선택기 추가">

사용자가 언어를 전환할 수 있도록 `LocaleSwitcher` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 지원되는 모든 로케일 목록을 표시하고 각 언어로 동일한 페이지에 링크해야 합니다.

```astro fileName="src/components/LocaleSwitcher.astro"
---
import {
  locales,
  getLocaleName,
  getLocalizedUrl,
  getLocaleFromPath,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<nav>
  {
    locales.map((localeItem) => (
      <a
        href={getLocalizedUrl(pathWithoutLocale, localeItem)}
        data-locale={localeItem}
        aria-current={localeItem === locale ? "page" : undefined}
      >
        {getLocaleName(localeItem)}
      </a>
    ))
  }
</nav>

<script>
  import { setLocaleInStorageClient, getLocalizedUrl, type LocalesValues } from "intlayer";

  const localeLinks = document.querySelectorAll("[data-locale]");

  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const locale = link.getAttribute("data-locale") as LocalesValues;

      // Update the locale cookie
      setLocaleInStorageClient(locale);
    });
  });
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  a[aria-current="page"] {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

> **지속성에 대한 참고 사항:**
> 클라이언트 측 스크립트에서 `setLocaleInStorageClient`를 사용하면 사용자의 언어 선호도가 쿠키에 저장됩니다. 이를 통해 Intlayer 미들웨어는 선택을 기억하고 향후 방문 시 사용자가 선호하는 언어로 자동으로 리다이렉트할 수 있습니다.

</Step>

<Step number={8} title="Sitemap 및 Robots.txt">

Intlayer는 동적으로 로컬라이즈된 사이트맵과 robots.txt 파일을 생성하기 위한 유틸리티를 제공합니다.

#### 사이트맵

Intlayer는 애플리케이션의 사이트맵을 쉽게 만들 수 있는 내장 사이트맵 생성기를 제공합니다. 로컬라이즈된 경로를 처리하고 검색 엔진에 필요한 메타데이터를 추가합니다.

> Intlayer에서 생성한 사이트맵은 `xhtml:link` 네임스페이스(Hreflang XML 확장)를 지원합니다. 원시 URL만 나열하는 기본 사이트맵 생성기와 달리, Intlayer는 페이지의 모든 언어 버전(예: `/about`, `/about?lang=fr`, `/about?lang=es`) 간에 필요한 양항향 링크를 자동으로 생성합니다. 이를 통해 검색 엔진이 올바른 언어 버전을 올바른 사용자에게 색인화하고 제공할 수 있도록 보장합니다.

모든 로컬라이즈된 경로를 포함하는 사이트맵을 생성하기 위해 `src/pages/sitemap.xml.ts`를 생성합니다.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

검색 엔진 크롤링을 제어하기 위해 `src/pages/robots.txt.ts`를 생성합니다.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>

<Step number={9} title="선호하는 프레임워크 계속 사용하기">

선호하는 프레임워크를 사용하여 애플리케이션을 계속 빌드하세요.

- Intlayer + React: [Intlayer with React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_react.md)
- Intlayer + Vue: [Intlayer with Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_vue.md)
- Intlayer + Svelte: [Intlayer with Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_svelte.md)
- Intlayer + Solid: [Intlayer with Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_solid.md)
- Intlayer + Preact: [Intlayer with Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_preact.md)
- Intlayer + Lit: [Intlayer with Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_lit.md)
- Intlayer + Vanilla JS: [Intlayer with Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_vanilla.md)
  </Step>

<Step number={15} title="컴포넌트에서 콘텐츠 추출" isOptional={true}>

기존 codebase가 있다면 수천 개의 파일을 변환하는 것은 시간이 오래 걸릴 수 있습니다.

이 프로세스를 쉽게 하기 위해 Intlayer는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안하여 컴포넌트를 변환하고 콘텐츠를 추출할 수 있습니다.

이를 설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
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
     * 변환 후 컴포넌트를 저장해야 하는지 여부를 나타냅니다.
     *
     * - `true`인 경우, 컴파일러는 디스크의 컴포넌트 파일을 다시 작성합니다. 그러므로 변환은 영구적이고, 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이렇게 하면 컴파일러가 앱을 변환할 수 있고, 그 후 제거할 수 있습니다.
     *
     * - `false`인 경우, 컴파일러는 빌드 출력에만 `useIntlayer()` 함수 호출을 주입하고 기본 codebase를 그대로 유지합니다. 변환은 메모리에서만 수행됩니다.
     */
    saveComponents: false,

    /**
     * Dictionary 키 접두사
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

> v9 이후로, `intlayerCompiler`는 `intlayer` 플러그인에 포함되어 있습니다. 따라서 수동으로 추가할 필요가 없습니다.

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함시키세요:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 컴파일러 플러그인 추가
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

### 더 알아보기

더 자세히 알고 싶다면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

## 자주 묻는 질문

<FAQ>

<Question title="Astro 사이트를 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

Astro는 로케일 접두사와 리디렉션을 처리하는 라우팅 수준의 `i18n` 옵션을 기본 제공하지만 콘텐츠 자체는 관리하지 않으므로 여전히 메시지 레이어가 필요합니다:

- **Astro 내장 `i18n`**과 직접 작성한 JSON 또는 TypeScript 사전: 추가 종속성은 없지만 타입 검사, 복수형 규칙 및 전용 도구가 없습니다.
- 아일랜드 내부의 **`i18next`** 또는 **`vue-i18n` / `svelte-i18n`**: 각 아일랜드 프레임워크마다 자체 카탈로그를 가진 완전한 라이브러리를 별도로 필요로 합니다.
- **`Intlayer`**: Astro 페이지와 모든 아일랜드 프레임워크가 단 하나의 콘텐츠 계층을 공유하며, 빌드 타임에 컴파일되고, 완전한 타입 안전성을 제공하며 AI 번역, 비주얼 에디터 및 CMS를 지원합니다.

Astro에서의 가장 큰 장점은 아일랜드 런타임마다 별도의 i18n 라이브러리를 설치할 필요 없이 동일한 사전이 `.astro` 페이지와 React, Vue, Svelte, Solid, Preact 또는 Lit 아일랜드 전체를 지원한다는 점입니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.

</Question>

<Question title="i18n이 Astro 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. Astro 페이지는 빌드 타임에 렌더링되므로 번역된 정적 HTML만 전송되고 사전은 전혀 포함되지 않으며, 오직 아일랜드만 사전을 전달받습니다. 빌드 타임 컴파일러는 콘텐츠 호출을 컴포넌트가 사용하는 정확한 항목으로 변환하고, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)은 나머지를 로케일별로 분할합니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50% 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 i18next나 직접 작성한 사전에서 마이그레이션할 수 있나요?">

대부분 가능합니다. [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)에 따라 콘텐츠를 이전할 수 있습니다. 점진적인 마이그레이션도 가능합니다: [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 기존 JSON 카탈로그를 단일 진실 공급원(source of truth)으로 유지하면서 Intlayer 사전을 생성하므로 컴포넌트를 하나씩 이전하는 동안 두 계층을 동기화 상태로 유지할 수 있습니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 컴포넌트를 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. 이 가이드의 15단계를 확인하세요.

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

<Question title="Intlayer는 Astro 아일랜드 내부에서 작동하나요?">

네. `astro-intlayer`가 `.astro` 측을 처리하고, 각 아일랜드 프레임워크는 자체 바인딩을 가지므로 아일랜드는 로케일을 다시 확인할 필요 없이 페이지로부터 활성 로케일을 직접 전달받습니다. [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_vue.md), [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_astro_svelte.md) 등의 전용 가이드가 준비되어 있습니다.

</Question>

<Question title="번역된 콘텐츠가 정적 HTML로 배포되나요?">

네. Astro는 기본적으로 빌드 타임에 페이지를 렌더링하며, Intlayer는 해당 렌더링 중에 콘텐츠를 확인하므로 현지화된 페이지는 순수한 정적 HTML입니다. 런타임에 로케일을 전환해야 하는 아일랜드만 사전을 수신하며, 이마저도 렌더링하는 로케일에 대한 사전만 전송됩니다.

</Question>

<Question title="지역화된 라우팅과 언어 전환기는 어떻게 설정하나요?">

이 가이드의 6단계와 7단계에서 다룹니다. `routing.mode`는 기본 로케일에 접두사를 붙일지(`"prefix-no-default"`), 모든 로케일에 붙일지(`"prefix-all"`), 또는 로케일을 경로 외부에 둘지(`"no-prefix"` 또는 `"search-params"`)를 제어합니다. `getLocalizedUrl`은 사용자가 동일한 페이지에 머무를 수 있도록 현재 경로를 대상 언어로 다시 작성합니다.

</Question>

<Question title="지역화된 사이트맵과 hreflang 태그는 어떻게 생성하나요?">

8단계에서 `sitemap.xml`과 `robots.txt`를 다룹니다. `getMultilingualUrls`는 검색 엔진이 올바른 언어 버전의 페이지를 제공하는 데 사용하는 `x-default`를 포함하여 선언된 모든 로케일에 대한 대체 링크를 구축합니다.

</Question>

<Question title="AI를 사용하여 Astro 사이트를 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 누락된 번역을 채워주며, `--git-diff`를 사용하면 브랜치에서 변경된 콘텐츠로 번역 범위를 제한할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 복수형, 성별 및 Markdown 콘텐츠를 지원하나요?">

네: [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md) 및 긴 형식의 페이지에 편리한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)을 지원합니다. [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)는 숫자, 날짜, 통화를 처리합니다.

</Question>

<Question title="번역가가 코드를 건드리지 않고 콘텐츠를 수정할 수 있나요?">

자체 호스팅되는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 통해 누구나 실행 중인 앱에서 직접 텍스트를 수정할 수 있으며, 배포 없이 콘텐츠를 변경해야 하는 경우에는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 활용할 수 있습니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
