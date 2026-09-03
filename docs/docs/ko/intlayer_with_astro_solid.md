---
createdAt: 2026-04-24
updatedAt: 2026-08-30
title: "Astro + Solid i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Astro + Solid 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Astro
  - Solid
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Solid를 위한 초기 문서"
author: aymericzip
---

# Intlayer를 사용하여 Astro + Solid 사이트 번역하기 | 국제화 (i18n)

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

## Astro + Solid에서 Intlayer 설정을 위한 단계별 가이드

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-astro-template) 보기.

<Steps>

<Step number={1} title="종속성 설치">

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

npx intlayer init
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

> `alt`, `title`, `href`, `aria-label` 등과 같은 `문자열` 속성에서 콘텐츠를 사용하려면 다음과 같이 함수의 값을 사용할 수 있습니다.

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

```bash packageManager="npm"
npm install intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer solid-js solid-intlayer @astrojs/solid-js

bun x intlayer init
```

- **intlayer**
  설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **astro-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Astro 통합 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어가 포함되어 있습니다.

- **solid-js**
  핵심 Solid 패키지입니다.

- **solid-intlayer**
  Intlayer를 Solid 애플리케이션과 통합하는 패키지입니다. Solid의 국제화를 위한 `IntlayerProvider`, `useIntlayer` 및 `useLocale` 프리미티브를 제공합니다.

- **@astrojs/solid-js**
  Solid 컴포넌트 아일랜드를 사용할 수 있게 해주는 공식 Astro 통합 도구입니다(사용할 때 `client:only="solid-js"` 적용).

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

Astro 설정에 intlayer 플러그인과 Solid 통합을 추가합니다.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), solid()],
});
```

> `intlayer()` 통합 플러그인은 Intlayer를 Astro와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 감시합니다. Astro 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 에일리어스(alias)를 제공합니다.

> `solid()` 통합은 `client:only="solid-js"`를 통해 Solid 컴포넌트 아일랜드를 사용할 수 있게 합니다.

</Step>

<Step number={4} title="콘텐츠 선언">

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";

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

`intlayer`에서 내보낸 핵심 헬퍼를 사용하여 `.astro` 파일에서 직접 사전을 소비할 수 있습니다. 또한 각 페이지에 hreflang 및 canonical 링크와 같은 SEO 메타데이터를 추가하고, 클라이언트 사이드의 인터랙티브 콘텐츠를 위해 Solid 아일랜드를 포함해야 합니다.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { SolidIsland } from "../../components/solid/SolidIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical 링크: 검색 엔진에 이 페이지의 주 버전임을 알립니다 -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: 모든 로컬라이즈된 버전에 대해 Google에 알립니다 -->
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

    <!-- x-default: 일치하는 언어가 없는 사용자를 위한 폴백(fallback) 옵션 -->
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
    <!-- Solid 아일랜드는 언어 전환기를 포함한 모든 인터랙티브 콘텐츠를 렌더링합니다 -->
    <SolidIsland locale={locale} client:only="solid-js" />
  </body>
</html>
```

> `alt`, `title`, `href`, `aria-label` 등의 `string` 속성에서 콘텐츠를 사용하려면 함수의 값을 다음과 같이 사용할 수 있습니다:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **라우팅 설정에 관한 참고 사항:**
> 사용하는 디렉토리 구조는 `intlayer.config.ts`의 `middleware.routing` 설정에 따라 달라집니다:
>
> - **`prefix-no-default` (기본값):** 루트(프레픽스 없음)에 기본 언어를 유지하고 나머지에 프레픽스를 붙입니다. 모든 케이스를 처리하려면 `[...locale]`을 사용하세요.
> - **`prefix-all`:** 모든 URL에 언어 프레픽스가 붙습니다. 루트를 분리해서 처리할 필요가 없다면 표준 `[locale]`을 사용할 수 있습니다.
> - **`search-param` 또는 `no-prefix`:** 로케일 폴더가 필요 없습니다. 로케일은 검색 파라미터나 쿠키를 통해 처리됩니다.

</Step>

<Step number={6} title="Solid 아일랜드 컴포넌트 생성">

Solid 애플리케이션을 감싸고 서버에서 감지된 로케일을 전달받는 아일랜드 컴포넌트를 생성합니다:

```tsx fileName="src/components/solid/SolidIsland.tsx"
/** @jsxImportSource solid-js */
import { IntlayerProvider, useIntlayer } from "solid-intlayer";
import { type LocalesValues } from "intlayer";
import { LocaleSwitcher } from "./LocaleSwitcher";

function App() {
  const content = useIntlayer("app");

  return (
    <div>
      <h1>{content.title}</h1>
      <LocaleSwitcher />
    </div>
  );
}

export function SolidIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <App />
    </IntlayerProvider>
  );
}
```

> `locale` 프롭은 Astro 페이지(서버 감지)에서 `IntlayerProvider`로 전달되어 트리 내 모든 Solid 프리미티브의 초기 로케일이 됩니다.

> Solid에서는 `useIntlayer`가 **accessor** 함수를 반환합니다(예: `content.). 반응형 콘텐츠에 접근하려면 이 함수를 호출해야 합니다.

</Step>

<Step number={7} title="언어 전환기 추가">

사용 가능한 로케일을 읽고 사용자가 새 언어를 선택할 때 로컬라이즈된 URL로 이동하는 Solid 컴포넌트 `LocaleSwitcher`를 생성합니다:

```tsx fileName="src/components/solid/LocaleSwitcher.tsx"
/** @jsxImportSource solid-js */
import { useLocale } from "solid-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

export function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // 언어 변경 시 로컬라이즈된 URL로 이동
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">언어 전환:</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale() ? "active" : ""}`}
            disabled={localeItem === locale()}
          >
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">
              {getLocaleName(localeItem, locale())}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

> **Solid 반응성에 관한 참고 사항:**
> Solid에서 `locale`은 반응형 signal accessor입니다. 현재 값을 얻으려면 항상 `locale()`과 같이 호출하세요.

> **영속성에 관한 참고 사항:**
> `window.location.href`를 통한 리디렉션을 위해 `onLocaleChange`를 사용하면 새 언어 URL이 확실히 방문되도록 보장합니다. 이를 통해 Intlayer 미들웨어가 언어 쿠키를 설정하고 향후 방문 시 사용자의 선호도를 기억할 수 있습니다.

> `LocaleSwitcher`는 `IntlayerProvider` 내부에서 렌더링되어야 합니다. 아일랜드 컴포넌트 내에서 사용하세요(6단계 참조).

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

<Step number={15} title="컴포넌트에서 콘텐츠 추출하기" isOptional={true}>

기존 codebase가 있다면 수천 개의 파일을 변환하는 데 시간이 걸릴 수 있습니다.

이 과정을 쉽게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

이를 설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
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
     * 변환 후 컴포넌트를 저장할지 여부를 나타냅니다.
     *
     * - `true`인 경우, 컴파일러는 디스크에 컴포넌트 파일을 다시 쓸 것입니다. 따라서 변환은 영구적이며, 컴파일러는 다음 프로세스에서 변환을 건너뜁니다. 이렇게 하면 컴파일러가 앱을 변환한 후 제거할 수 있습니다.
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

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함하세요:

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

<Question title="Solid 아일랜드가 포함된 Astro 사이트를 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

Astro의 내장 `i18n` 옵션은 로케일 접두사와 리디렉션만 처리할 뿐 콘텐츠 자체는 관리하지 않으므로 메시지 레이어가 필요하며, 아일랜드 구조로 인해 두 번째 문제가 발생합니다: 아일랜드는 Astro가 아닌 Solid로 실행된다는 점입니다.

- **Astro `i18n`과 직접 작성한 사전**, 그리고 아일랜드 내부의 **`@solid-primitives/i18n`**: 동기화해야 할 두 개의 콘텐츠 소스가 생기고, 둘 사이에 공유된 타입 안전성이 없습니다.
- **`Intlayer`**: 둘 모두를 위한 단일 콘텐츠 레이어입니다. `astro-intlayer`는 `.astro` 페이지를 다루고 `solid-intlayer`는 Solid 아일랜드를 다루며, 둘 다 동일한 선언을 읽습니다.

라벨을 한 번만 선언하고 정적 페이지와 인터랙티브 아일랜드 양쪽에서 모두 사용할 수 있다는 점이 여기서 단일 콘텐츠 레이어를 선택하는 핵심 이유입니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.

</Question>

<Question title="i18n이 Astro 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. Astro 페이지는 빌드 타임에 렌더링되므로 번역된 HTML만 전송하고 사전은 전혀 전송하지 않으며, 오직 아일랜드만 사전을 전달받습니다. 빌드 타임 컴파일러는 콘텐츠 호출을 컴포넌트가 사용하는 정확한 항목으로 확인하고, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할합니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 @solid-primitives/i18n 또는 i18next에서 마이그레이션할 수 있나요?">

대부분 가능합니다. 콘텐츠를 이전하려면 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 따르세요. 점진적으로 마이그레이션할 수도 있습니다: [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 기존 JSON 카탈로그를 단일 진실 공급원(source of truth)으로 유지하면서 Intlayer 사전을 생성하므로 컴포넌트를 하나씩 이전하는 동안 두 계층의 동기화가 유지됩니다.

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

<Question title="Solid 아일랜드 내부에 별도의 i18n 라이브러리가 필요한가요?">

아닙니다. `solid-intlayer`는 Astro 측과 동일한 사전을 읽으므로 `@solid-primitives/i18n`을 함께 설치할 필요가 없습니다. 6단계에서 아일랜드 컴포넌트가 로케일을 다시 확인하는 대신 페이지로부터 활성 로케일을 직접 전달받는 모습을 보여줍니다.

</Question>

<Question title="아일랜드는 페이지가 어떤 로케일을 렌더링하는지 어떻게 아나요?">

Astro 페이지가 이를 prop으로 전달하고 아일랜드의 Intlayer 프로바이더가 이를 수신하므로, 아일랜드는 서버가 렌더링한 것과 동일한 언어로 하이드레이션(hydrate)됩니다. 이는 아일랜드가 브라우저에서 자체적으로 로케일을 감지할 때 발생하는 기본 언어 깜빡임 현상을 방지합니다.

</Question>

<Question title="번역된 콘텐츠가 정적 HTML로 제공되나요?">

네, 빌드 타임에 렌더링되는 Astro 파트의 경우 지역화된 페이지가 일반 정적 HTML이므로 크롤러가 JavaScript를 실행하지 않고도 바로 읽을 수 있습니다. 오직 아일랜드만 사전을 전달받으며, 자신이 렌더링하는 로케일에 대한 사전에 한정됩니다.

</Question>

<Question title="지역화된 라우팅 및 로케일 전환기는 어떻게 설정하나요?">

7단계에서 전환기를 다룹니다. `routing.mode`는 URL 체계를 결정합니다: `"prefix-no-default"`(기본값: `/about`, `/ko/about`), `"prefix-all"`, `"no-prefix"` 또는 `"search-params"`이며, `routing.domains`를 통해 로케일을 자체 도메인에 매핑할 수도 있습니다. `getLocalizedUrl`은 언어를 전환할 때 독자가 동일한 페이지에 머무를 수 있도록 현재 경로를 다시 작성합니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="지역화된 사이트맵과 hreflang 태그는 어떻게 생성하나요?">

8단계에서 `sitemap.xml`과 `robots.txt`를 다룹니다. `getMultilingualUrls`는 검색 엔진이 올바른 언어 버전을 제공할 수 있도록 `x-default`를 포함한 모든 선언 로케일에 대한 대체를 구축합니다.

</Question>

<Question title="AI를 사용하여 사이트를 자동으로 번역하려면 어떻게 하나요?">

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
