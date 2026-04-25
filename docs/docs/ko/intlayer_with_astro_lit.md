---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Lit i18n - 2026년에 Astro + Lit 애플리케이션을 번역하는 방법
description: Intlayer를 사용하여 Astro + Lit 사이트에 국제화(i18n)를 추가하는 방법을 배워보세요. 이 가이드를 따라 사이트를 다국어로 만들어 보세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Astro
  - Lit
  - 웹 컴포넌트
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - lit
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Astro + Lit를 위한 초기 문서"
---

# Intlayer를 사용하여 Astro + Lit 사이트 번역하기 | 국제화 (i18n)

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

## Astro + Lit에서 Intlayer 설정을 위한 단계별 가이드

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox 데모 - Intlayer로 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-astro-template) 보기.

### 1단계: 종속성 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer astro-intlayer lit lit-intlayer @astrojs/lit

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer lit lit-intlayer @astrojs/lit

bun x intlayer init
```

- **intlayer**
  설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **astro-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Astro 통합 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어가 포함되어 있습니다.

- **lit**
  빠르고 가벼운 웹 컴포넌트를 빌드하기 위한 핵심 Lit 패키지입니다.

- **lit-intlayer**
  Intlayer를 Lit 애플리케이션과 통합하는 패키지입니다. 언어 변경 시 LitElement를 자동으로 다시 렌더링하기 위해 `ReactiveController` 기반 훅(`useIntlayer`, `useLocale` 등)을 제공합니다.

- **@astrojs/lit**
  Astro 페이지에서 Lit 커스텀 엘리먼트를 사용할 수 있게 해주는 공식 Astro 통합 도구입니다.

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

Astro 설정에 intlayer 플러그인과 Lit 통합을 추가합니다.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import lit from "@astrojs/lit";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), lit()],
});
```

> `intlayer()` 통합 플러그인은 Intlayer를 Astro와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 감시합니다. Astro 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 에일리어스(alias)를 제공합니다.

> `lit()` 통합은 Astro 페이지 내에서 Lit 커스텀 엘리먼트를 사용할 수 있게 합니다.

### 4단계: 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```typescript fileName="src/components/lit/app.content.ts"
import { t, type Dictionary } from "intlayer";

const litDemoContent = {
  key: "lit-demo",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ko: "안녕하세요",
    }),
    description: t({
      en: "Welcome to my multilingual Astro + Lit site.",
      fr: "Bienvenue sur mon site Astro + Lit multilingue.",
      es: "Bienvenido a mi sitio Astro + Lit multilingüe.",
      ko: "다국어 Astro + Lit 사이트에 오신 것을 환영합니다.",
    }),
  },
} satisfies Dictionary;

export default litDemoContent;
```

> 콘텐츠 선언은 `contentDir`(기본값 `./src`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치한다면 애플리케이션 어디에서나 정의할 수 있습니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 5단계: Astro에서 콘텐츠 사용

`intlayer`에서 내보낸 핵심 헬퍼를 사용하여 `.astro` 파일에서 직접 사전을 소비할 수 있습니다. 또한 각 페이지에 hreflang 및 canonical 링크와 같은 SEO 메타데이터를 추가해야 합니다. Lit 커스텀 엘리먼트는 클라이언트 사이드 `<script>`를 통해 임포트되어 body에 배치됩니다.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { greeting } = getIntlayer("lit-demo", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- Canonical 링크 -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang 링크 -->
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
    <!-- Lit 커스텀 엘리먼트 — 서버에서 감지된 로케일을 프로퍼티로 받습니다 -->
    <lit-demo locale={locale}></lit-demo>
  </body>
</html>

<script>
  import "../../components/lit/LitDemo";
</script>
```

> **라우팅 설정에 관한 참고 사항:**
> 사용하는 디렉토리 구조는 `intlayer.config.ts`의 `middleware.routing` 설정에 따라 달라집니다:
>
> - **`prefix-no-default` (기본값):** 루트(프레픽스 없음)에 기본 언어를 유지하고 나머지에 프레픽스를 붙입니다. 모든 케이스를 처리하려면 `[...locale]`을 사용하세요.
> - **`prefix-all`:** 모든 URL에 언어 프레픽스가 붙습니다. 루트를 분리해서 처리할 필요가 없다면 표준 `[locale]`을 사용할 수 있습니다.
> - **`search-param` 또는 `no-prefix`:** 로케일 폴더가 필요 없습니다. 로케일은 검색 파라미터나 쿠키를 통해 처리됩니다.

### 6단계: Lit 커스텀 엘리먼트 생성

Lit 커스텀 엘리먼트를 생성합니다. 클라이언트에서 Intlayer 싱글톤을 초기화하기 위해 서버에서 감지된 `locale` 프로퍼티를 사용하여 `connectedCallback`에서 `installIntlayer`를 호출합니다.

```typescript fileName="src/components/lit/LitDemo.ts"
import { LitElement, html } from "lit";
import { installIntlayer, useIntlayer, useLocale } from "lit-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

class LitDemo extends LitElement {
  static properties = {
    locale: { type: String },
  };

  locale: LocalesValues = "en" as LocalesValues;

  private _content = useIntlayer(this, "lit-demo");
  private _localeCtrl = useLocale(this, {
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  override connectedCallback() {
    super.connectedCallback();
    // 서버에서 감지된 로케일로 초기화
    installIntlayer({ locale: this.locale as any });
  }

  override render() {
    const { greeting, description } = this._content;
    const {
      locale: currentLocale,
      availableLocales,
      setLocale,
    } = this._localeCtrl;

    return html`
      <div>
        <h1>${greeting}</h1>
        <p>${description}</p>
        <!-- 언어 전환기는 LitElement 내에 렌더링됩니다 -->
        <div class="locale-switcher">
          <span class="switcher-label">언어 전환:</span>
          <div class="locale-buttons">
            ${availableLocales.map(
              (localeItem) => html`
                <button
                  class="locale-btn ${localeItem === currentLocale
                    ? "active"
                    : ""}"
                  ?disabled=${localeItem === currentLocale}
                  @click=${() => setLocale(localeItem)}
                >
                  <span class="ls-own-name">${getLocaleName(localeItem)}</span>
                  <span class="ls-current-name"
                    >${getLocaleName(localeItem, currentLocale)}</span
                  >
                  <span class="ls-code">${localeItem.toUpperCase()}</span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-demo", LitDemo);
```

> `locale` 프롭은 Astro 페이지(서버 감지)에서 전달되어 `connectedCallback`에서 `installIntlayer`를 초기화하는 데 사용되며, 이로 인해 엘리먼트 내 모든 `ReactiveController` 훅의 초기 로케일이 결정됩니다.

> `useIntlayer`는 `ReactiveController`로 등록됩니다. 언어가 변경되면 엘리먼트가 자동으로 다시 렌더링되므로 추가 설정이 필요 없습니다.

### 7단계: 언어 전환기 추가

언어 전환 기능은 Lit 커스텀 엘리먼트의 `render()` 메서드(6단계 참조)에 직접 통합되어 있습니다. `lit-intlayer`의 `useLocale`을 사용하며, 사용자가 새 언어를 선택할 때 로컬라이즈된 URL로 이동합니다:

```typescript fileName="src/components/lit/LitDemo.ts"
// LitElement 클래스 내에서 useLocale 설정(6단계 항목) 이후:

private _localeCtrl = useLocale(this, {
  onLocaleChange: (newLocale: LocalesValues) => {
    // 언어 변경 시 로컬라이즈된 URL로 이동
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

override render() {
  const { locale: currentLocale, availableLocales, setLocale } = this._localeCtrl;

  return html`
    <div class="locale-switcher">
      <span class="switcher-label">언어 전환:</span>
      <div class="locale-buttons">
        ${availableLocales.map(
          (localeItem) => html`
            <button
              class="locale-btn ${localeItem === currentLocale ? "active" : ""}"
              ?disabled=${localeItem === currentLocale}
              @click=${() => setLocale(localeItem)}
            >
              <span class="ls-own-name">${getLocaleName(localeItem)}</span>
              <span class="ls-current-name">${getLocaleName(localeItem, currentLocale)}</span>
              <span class="ls-code">${localeItem.toUpperCase()}</span>
            </button>
          `
        )}
      </div>
    </div>
  `;
}
```

> **Lit 반응성에 관한 참고 사항:**
> `useLocale`은 `ReactiveController`를 반환합니다. `setLocale`이 호출되면 컨트롤러가 자동으로 다시 렌더링을 예약하므로 별도의 DOM 조작 없이도 활성 버튼 상태가 업데이트됩니다.

> **영속성에 관한 참고 사항:**
> `window.location.href`를 통한 리디렉션을 위해 `onLocaleChange`를 사용하면 새 언어 URL이 확실히 방문되도록 보장합니다. 이를 통해 Intlayer 미들웨어가 언어 쿠키를 설정하고 향후 방문 시 사용자의 선호도를 기억할 수 있습니다.

### 8단계: Sitemap 및 Robots.txt

Intlayer는 동적으로 로컬라이즈된 사이트맵과 robots.txt 파일을 생성하기 위한 유틸리티를 제공합니다.

#### 사이트맵

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

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### TypeScript 설정

Intlayer는 모듈 증강(module augmentation)을 사용하여 TypeScript의 이점을 활용함으로써 코드베이스를 더 견고하게 만듭니다. 데코레이터 구문을 사용하는 경우 Lit에서 `experimentalDecorators`를 활성화해야 합니다.

![자동 완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 설정에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    experimentalDecorators: true,
    useDefineForClassFields: false, // 데코레이터 지원을 위해 Lit에서 필수
  },
  include: [
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
