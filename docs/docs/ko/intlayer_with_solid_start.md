---
createdAt: 2025-08-06
updatedAt: 2026-08-30
title: "Solid Start i18n - 앱 번역을 위한 완벽한 가이드"
description: "더 이상 i18next는 필요하지 않습니다. 2026년 다국어(i18n) SolidStart 앱 구축 가이드입니다. 서버 렌더링 로케일 라우팅, hreflang, 사이트맵 및 AI 지원 번역."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "Initial history"
author: aymericzip
---

# Intlayer를 사용하여 SolidStart 웹사이트 번역하기 | 국제화 (i18n)

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">

<iframe title="Vite와 Solid를 위한 최고의 i18n 솔루션? Intlayer를 알아보세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>

<Tab label="데모" value="demo">

<iframe
  src="https://intlayer-solid-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Solid Start Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

이 가이드는 **서버 렌더링** SolidStart 애플리케이션을 다룹니다: 로케일 감지는 요청 시 수행되고, 페이지는 올바른 언어로 서버에서 렌더링되며, 검색 엔진에 필요한 `<html lang>`, `hreflang` 및 사이트맵 신호가 서버 측에서 내보내집니다.

## 다른 대안 대신 Intlayer를 선택해야 하는 이유

`@solid-primitives/i18n` 또는 `i18next`와 같은 주요 솔루션과 비교하여 Intlayer는 다음과 같은 통합 최적화를 제공하는 솔루션입니다:

<AccordionGroup>
<Accordion header="완벽한 Solid 지원">

Intlayer는 **컴포넌트 수준의 콘텐츠 스코핑**, **반응형 번역** 및 국제화(i18n) 확장에 필요한 모든 기능을 제공하여 Solid와 완벽하게 작동하도록 최적화되어 있습니다.

</Accordion>

<Accordion header="번들 크기">

페이지에 거대한 JSON 파일을 로드하는 대신 필요한 콘텐츠만 로드합니다. Intlayer는 **번들 및 페이지 크기를 최대 50%까지 줄이는 데 도움을 줍니다**.

</Accordion>

<Accordion header="유지 보수성">

애플리케이션의 콘텐츠 범위를 지정하면 대규모 애플리케이션의 **유지 보수가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한, Intlayer는 콘텐츠의 정확성을 보장하기 위해 **완전히 타입 지원**됩니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 두면 대형 언어 모델(LLM)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**과 같은 도구 모음도 함께 제공되어 AI 에이전트의 개발자 경험(DX)을 더욱 매끄럽게 만듭니다.

</Accordion>

<Accordion header="자동화">

AI 제공업체의 비용으로 선택한 LLM을 사용하여 CI/CD 파이프라인에서 번역을 자동화하세요. Intlayer는 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**할 수 있도록 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)도 제공합니다.

</Accordion>

<Accordion header="성능">

거대한 JSON 파일을 컴포넌트에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="비개발자와의 확장성">

단순한 i18n 솔루션 그 이상으로, Intlayer는 **자체 호스팅 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**와 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공하여 다국어 콘텐츠를 **실시간**으로 관리할 수 있도록 돕고, 번역가, 카피라이터 및 기타 팀원과의 협업을 원활하게 만듭니다. 콘텐츠는 로컬 및/또는 원격으로 저장할 수 있습니다.

</Accordion>
</AccordionGroup>

---

## SolidStart 애플리케이션에서 Intlayer를 설정하기 위한 단계별 가이드

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

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`을 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **solid-intlayer**

  Intlayer를 Solid 애플리케이션과 통합하는 패키지입니다. Solid 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

- **vite-intlayer**

  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 로케일 라우팅 핸들러를 포함합니다.

> `vite-intlayer`는 빌드 시점뿐만 아니라 서버 측의 관심사입니다: SolidStart의 Nitro 서버가 실행하는 요청 핸들러를 제공합니다. `dependencies`에 유지하는 것이 안전한 기본값입니다 — Nitro가 핸들러를 인라인화하는 빌드된 `.output` 디렉터리를 배포하는 경우에만 `devDependencies`로 이동할 수 있습니다.

</Step>

<Step number={2} title="프로젝트 설정">

애플리케이션의 언어를 설정하기 위해 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

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
  routing: {
    mode: "prefix-no-default",
  },
};

export default config;
```

`prefix-no-default`를 사용하면 기본 로케일은 접두사가 없는 URL에서 제공됩니다:

```plaintext
/            /about          → 영어   (기본 로케일)
/fr          /fr/about       → 프랑스어
/es          /es/about       → 스페인어
```

> 이 설정 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자를 설정하고 콘솔에서 Intlayer 로그를 비활성화하는 등의 작업을 수행할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Vite 설정에 Intlayer 통합하기">

설정에 Intlayer 플러그인을 추가합니다:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> `intlayer()` Vite 플러그인은 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 감시하며 애플리케이션 내에 Intlayer 환경 변수를 정의합니다. 또한 성능을 최적화하는 별칭을 제공합니다.

### 로케일 라우팅은 플러그인과 함께 제공됩니다

SolidStart는 [Nitro](https://nitro.build)에서 실행되며, `intlayer()`는 로케일 라우팅 핸들러를 Nitro의 서버 파이프라인에 직접 등록합니다 (기본적으로 `true`인 `routing.enableProxy` 옵션을 통해). 추가로 연결할 작업이 없습니다: 빌드된 서버에서 모든 요청은 루터에 도달하기 전에 검사되며,

- 로케일은 URL 접두사, `INTLAYER_LOCALE` 쿠키, 그리고 `Accept-Language` 헤더 순으로 읽힙니다;
- 접두사가 없는 URL은 확인된 로케일이 기본 로케일이 아닐 때 해당 지역화된 URL로 리디렉션됩니다 (`/` → `/fr`);
- 중복 접두사가 있는 URL은 표준 형식으로 다시 리디렉션됩니다 (`/en/about` → `/about`);
- 로케일 쿠키가 응답에 다시 기록됩니다.

</Step>

<Step number={4} title="콘텐츠 선언하기">

번역을 저장하기 위한 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **SolidStart 전용 주의사항**: `src/routes` 아래의 모든 `.ts` / `.tsx` 파일은 라우트가 되고, `.content.ts` 파일에는 기본 내보내기가 있으므로 페이지로 감지될 수 있습니다. **페이지**의 콘텐츠 선언은 라우트 디렉터리 외부에 보관하세요 (`src/contents/`가 적합합니다). **컴포넌트**의 콘텐츠는 `src/components`가 파일 시스템 라우터에 의해 스캔되지 않으므로 같은 위치에 유지할 수 있습니다.

> 콘텐츠 선언은 `contentDir` 디렉터리(기본값 `./src`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치하는 한 애플리케이션 어디에서나 정의할 수 있습니다.
>
> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={5} title="지역화된 라우팅 추가하기">

이 단계의 목표는 각 언어에 고유한 URL을 부여하는 것입니다. 이것이 검색 엔진이 인덱싱하는 대상입니다.

페이지를 **선택적 동적 세그먼트** 아래로 이동합니다. SolidStart의 파일 시스템 라우터에서 `[[locale]]`은 `:locale?` 경로 패턴으로 컴파일됩니다:

```plaintext
src/routes/
  [[locale]].tsx          ← 세그먼트를 검증하는 레이아웃
  [[locale]]/
    index.tsx             → /        및 /fr        및 /es
    about.tsx             → /about   및 /fr/about  및 /es/about
  [...404].tsx            → 기타 모든 요청을 위한 캐치올
```

레이아웃 파일의 유일한 역할은 세그먼트를 설정된 로케일로 제한하는 것입니다:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

`@solidjs/router`는 `:locale?`을 세그먼트가 있는 패턴과 없는 패턴 두 가지로 확장하고 명확성이 높은 순서대로 시도합니다. `matchFilters`는 작동하는 설정과 혼란스러운 설정의 차이를 만드는 요소입니다:

| URL         | `matchFilters` 없음                                | `matchFilters` 있음             |
| ----------- | -------------------------------------------------- | ------------------------------- |
| `/fr/about` | 프랑스어 about 페이지                              | 프랑스어 about 페이지           |
| `/about`    | About 페이지 (정적 세그먼트가 우선)                | About 페이지                    |
| `/unknown`  | **홈 페이지**가 `locale=unknown`으로 조용히 표시됨 | 일치 없음 → 404 캐치올로 넘어감 |

> `'prefix-all'` 라우팅 모드를 사용하는 경우 `[[locale]]` 대신 `[locale]` (필수)을 권장하며, `'no-prefix'` 또는 `'search-params'`의 경우 세그먼트를 완전히 제거하세요.

</Step>

<Step number={6} title="애플리케이션에 로케일 제공하기">

URL은 로케일의 단일 진실 출처(single source of truth)입니다: 미들웨어가 이미 요청을 지역화된 경로로 리디렉션했으므로 루트 레이아웃에서 경로를 읽으면 서버 렌더링과 클라이언트 하이드레이션이 일치하게 되고 클라이언트 측 탐색 시 로케일이 무료로 업데이트됩니다.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // 서버는 entry-server.tsx에서 <html>을 렌더링합니다; 로케일 간 클라이언트 측
  // 탐색은 속성을 직접 업데이트해야 합니다.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> `IntlayerProvider`는 `locale` prop에 반응하므로 JSX 내부에서 접근자 호출 `locale()`을 전달하는 것으로 충분합니다 — Solid는 이를 게터로 컴파일하며 URL이 변경될 때 전체 트리가 새로운 언어로 다시 렌더링됩니다.

</Step>

<Step number={7} title="서버에서 HTML lang 및 dir 속성 설정하기">

`<html>` 엘리먼트는 `Router` 외부의 `entry-server.tsx`에 의해 렌더링됩니다. 대신 요청 URL에서 로케일을 읽으세요:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

크롤러는 이제 첫 번째 바이트에서 올바른 언어를 받습니다:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="페이지에서 Intlayer 활용하기">

애플리케이션 전체에서 콘텐츠 사전에 접근합니다:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> Solid에서 `useIntlayer`는 반응형 콘텐츠(예: `content`)를 반환합니다. 해당 속성에 직접 접근할 수 있습니다.

> `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려는 경우 다음과 같이 함수의 값을 사용할 수 있습니다:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)를 참조하세요.

콘텐츠 노드는 일반 번역에만 국한되지 않습니다. 예를 들어 복수형 카운터:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

`plural()`은 활성 로케일에 대해 `Intl.PluralRules`를 통해 카테고리를 선택하므로 두 개 이상의 복수형 형태를 가진 언어도 추가 코드 없이 작동합니다.

</Step>

<Step number={9} title="지역화된 Link 컴포넌트 생성하기">

내부 URL에 현재 언어 접두사를 자동으로 붙이는 커스텀 `Link` 컴포넌트를 생성합니다:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

이제 `href="/about"`을 한 번 작성하면 활성 로케일에 따라 `/about`, `/fr/about` 또는 `/es/about`이 생성됩니다 — 페이지 내 어디에서도 수동으로 접두사를 붙일 필요가 없습니다.

</Step>

<Step number={10} title="로케일 스위처 컴포넌트 생성하기">

스위처를 `<select>` 대신 **실제 앵커**로 렌더링합니다: 현재 페이지의 각 언어는 새 탭에서 열 수 있는 크롤링 가능한 링크가 되며, 이는 JavaScript 전용 컨트롤이 제공할 수 없는 장점입니다.

`getPathWithoutLocale`은 현재 경로에서 로케일 세그먼트를 제거하고 `getLocalizedUrl`은 대상 로케일에 맞게 이를 재구성하므로 하드코딩 없이 링크가 라우팅 모드를 따릅니다. 렌더링된 로케일을 변경하는 것은 탐색입니다 — `[[locale]]` 라우트는 URL에서 이를 도출합니다 — 한편 `setLocale`은 선택을 `INTLAYER_LOCALE` 쿠키에 유지하므로 나중에 로케일이 없는 URL을 방문할 때 동일한 언어로 해결됩니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // 현재 표시된 페이지의 표준(로케일 없는) 경로
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // 정확한 일치만 허용하여 기본 로케일 링크가 모든 페이지에서
              // 활성화된 것으로 플래그 지정되지 않도록 함
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // 브라우저의 "뒤로 가기" 버튼이 이전 페이지로 돌아가도록 보장함
              replace
            >
              {/* 자체 로케일에서의 언어 - 예: Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> Solid에서 `useLocale`의 `locale`은 **시그널 접근자(signal accessor)**입니다. 현재 값을 반응형으로 읽으려면 `locale()` (괄호 포함)을 사용하세요.
>
> `getLocaleName(localeItem)`은 각 언어를 해당 언어 자체로 렌더링합니다 — `English / Français / Español`. 두 번째 인수를 전달하면 대신 현재 표시된 언어로 이름을 번역합니다: `getLocaleName(localeItem, locale())`은 영어로 `English / French / Spanish`, 한국어로 `영어 / 프랑스어 / 스페인어`를 제공합니다.
>
> `<A>`는 현재 URL과 일치하는 링크에 이미 `aria-current="page"`를 설정하므로 추가할 것이 없습니다. `replace`는 라우터에 의해 렌더링된 속성에서 다시 읽힙니다: 히스토리 항목을 푸시하는 대신 교체하므로 브라우저 "뒤로 가기" 버튼은 이전 언어의 동일한 페이지가 아니라 전환 전에 방문한 페이지로 돌아갑니다.
>
> 각 링크의 `dir` 및 `hreflang`은 오른쪽에서 왼쪽으로 쓰는 언어 이름을 올바르게 지향하도록 유지하고 보조 기술 및 크롤러에 각 링크가 가리키는 언어를 알려줍니다.
>
> `useLocale` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)를 참조하세요.

</Step>

<Step number={11} title="canonical 및 hreflang 링크 내보내기" isOptional={true}>

`hreflang` 주석은 `/about`, `/fr/about` 및 `/es/about`이 서로 다른 언어로 된 동일한 페이지임을 검색 엔진에 알립니다. `getMultilingualUrls`는 라우팅 모드에 따라 표준(로케일 없는) 경로에서 이를 도출하므로 아무것도 하드코딩되지 않습니다:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** 렌더링되는 페이지의 절대 URL. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

이를 요청 URL을 사용할 수 있는 문서 head에 렌더링합니다:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … <head> 내부, 다른 meta 태그 옆:
<AlternateLinks url={url} />;
```

`GET /fr/about`은 다음을 내보냅니다:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **`@solidjs/meta`에 대한 참고 사항**: 작성 시점 기준으로 `@solidjs/meta`의 `<Title>` 및 `<Meta>`는 하이드레이션 후 클라이언트에 적용되지만 SolidStart v2의 서버 렌더링된 `<head>`에는 **내보내지지 않습니다**. 상류에서 수정될 때까지 크롤러가 JavaScript 없이 봐야 하는 태그(`canonical`, `hreflang`, 필요한 경우 `title` / `description`)를 위와 같이 `entry-server.tsx`에 직접 렌더링하세요.

</Step>

<Step number={12} title="404 페이지 관리하기" isOptional={true}>

`src/routes` 루트의 스플랫 라우트는 `matchFilters`에 의해 거부된 잘못된 로케일 접두사를 포함하여 로케일 세그먼트와 일치하지 않은 모든 경로를 캡처합니다. 로케일은 여전히 루트 레이아웃을 통해 URL에서 오므로 404 페이지는 방문자의 언어로 표시됩니다:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| 요청              | 결과                                    |
| ----------------- | --------------------------------------- |
| `/xx`             | `404` — `xx`는 설정된 로케일이 아닙니다 |
| `/nonexistent`    | 기본 로케일의 `404`                     |
| `/fr/nonexistent` | 프랑스어의 `404` (`Page introuvable`)   |

</Step>

<Step number={13} title="다국어 사이트맵 생성하기" isOptional={true}>

Intlayer의 사이트맵 생성기는 모든 경로를 로케일당 하나의 항목으로 확장하고 이들 사이의 `xhtml:link` 대체 항목을 연결하므로 라우트는 표준 및 로케일 없는 경로만 나열하면 됩니다.

> 평면 URL만 내보내는 기본 생성기와 달리 Intlayer는 각 페이지의 모든 지역화된 변형 간에 양방향 링크를 연결하여 검색 엔진이 지역화된 URL을 관련시키고 올바른 대상에게 올바른 URL을 제공하도록 돕습니다.

SolidStart는 HTTP 메서드를 내보내는 파일을 API 라우트로 변환하고 경로에서 `.ts` 확장자를 제거합니다 — 따라서 `src/routes/sitemap.xml.ts`는 `/sitemap.xml`에서 제공됩니다:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> API 라우트는 선택적 매개변수를 지원하지 않으므로 이 파일을 `[[locale]]` 세그먼트 외부인 `src/routes` 루트에 유지하세요. 사이트맵에는 이미 모든 로케일이 포함되어 있습니다.

`getMultilingualUrls`를 사용하여 동일한 방법으로 `robots.txt`를 작성할 수 있으므로 `Disallow` 항목이 민감한 경로의 모든 지역화된 철자를 포함하도록 할 수 있습니다:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="서버 함수에서 로케일 가져오기" isOptional={true}>

서버 함수 또는 API 라우트 내부에서 현재 로케일에 접근하고 싶을 수 있습니다.

이와 같은 접두사 기반 설정에서는 **URL이 권한을 가집니다**: `getLocaleFromPath`는 요청 URL에서 접두사를 읽습니다. `getLocale`은 로케일 접두사가 없는 요청에 대한 폴백입니다 — `INTLAYER_LOCALE` 쿠키를 검사하고 그 다음 `x-intlayer-locale` 헤더를 검사한 후 `Accept-Language` 협상을 진행합니다.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // 요청에서 쿠키 가져오기 (기본값: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // 요청에서 헤더 가져오기 (기본값: 'x-intlayer-locale'),
      // Accept-Language 협상으로 폴백
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // getIntlayer()를 사용하여 컴포넌트 외부에서 콘텐츠 가져오기
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> 여기서 `getLocale`에만 의존하지 마세요: 로케일 쿠키는 방문자가 언어를 적극적으로 전환할 때만 생성되므로 `/fr/...`에 대한 첫 방문은 기본 로케일로 해결될 수 있습니다.

</Step>

<Step number={15} title="컴포넌트 콘텐츠 추출하기" isOptional={true}>

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 걸릴 수 있습니다.

이 프로세스를 용이하게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출할 수 있는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md)를 제안합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 설정
  compiler: {
    /**
     * 컴파일러를 활성화할지 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환 후 컴포넌트를 저장할지 여부를 나타냅니다.
     *
     * - `true`인 경우 컴파일러가 디스크의 컴포넌트 파일을 다시 씁니다. 따라서 변환은 영구적이 되며 다음 프로세스에서 컴파일러가 변환을 건너뜁니다. 그렇게 하면 앱을 변환한 후 컴파일러를 제거할 수 있습니다.
     *
     * - `false`인 경우 컴파일러가 빌드 출력의 코드에만 `useIntlayer()` 함수 호출을 주입하고 기본 코드베이스는 그대로 유지합니다. 변환은 메모리에서만 수행됩니다.
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
 <Tab value='Extract 명령'>

추출기를 실행하여 컴포넌트를 변환하고 콘텐츠를 추출합니다

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

> 5단계에서 설명한 이유로 나중에 생성된 페이지의 콘텐츠 파일을 `src/routes` 외부로 이동하세요.

 </Tab>
 <Tab value='Babel 컴파일러'>

> v9부터 `intlayerCompiler`가 `intlayer` 플러그인에 포함되어 있으므로 수동으로 추가할 필요가 없습니다.

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함하세요:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
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

<Step number={16} title="TypeScript 설정하기">

Intlayer는 모듈 확장을 사용하여 TypeScript의 이점을 얻고 코드베이스를 더욱 견고하게 만듭니다.

TypeScript 설정에 자동 생성된 타입이 포함되어 있는지 확인하세요:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 기존 설정
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

사전 키 및 콘텐츠 경로가 이제 컴파일 시점에 검사됩니다:

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## 설정 확인하기

서버를 빌드하고 시작한 후 다음 요청이 예상대로 동작하는지 확인하세요:

```bash
npm run build
node .output/server/index.mjs
```

| 요청                                     | 예상 응답                            |
| ---------------------------------------- | ------------------------------------ |
| `GET /`                                  | `200` — 영어                         |
| `GET /` (`Accept-Language: fr` 포함)     | `302` → `/fr`                        |
| `GET /` (`INTLAYER_LOCALE=es` 쿠키 포함) | `302` → `/es`                        |
| `GET /fr`                                | `200` — 프랑스어, `<html lang="fr">` |
| `GET /fr/about`                          | `200` — 프랑스어 about 페이지        |
| `GET /en/about`                          | `302` → `/about` (표준 리디렉션)     |
| `GET /xx`                                | `404`                                |
| `GET /fr/nonexistent`                    | `404` (프랑스어)                     |
| `GET /sitemap.xml`                       | `200` — 다국어 XML 사이트맵          |

페이지를 렌더링하는 행은 `vite dev`에서도 동일하게 동작합니다. 3개의 리디렉션 행은 핸들러를 직접 미들웨어로 등록하지 않는 한 빌드된 서버에만 적용됩니다 (3단계 참조).

> 개발 서버를 Bun (`bun --bun vite dev`) 대신 Node (`vite dev`)에서 실행하세요: SolidStart의 SSR은 현재 Bun 런타임에서 `Expected a Response object, but received 'NodeResponse'` 오류로 실패합니다. 이는 Intlayer와 무관하며 (일반 템플릿에서도 재현됨) `vite build`가 아닌 개발 서버에만 영향을 미칩니다.

---

## Git 설정

Intlayer에서 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 Git 리포지토리에 커밋하는 것을 방지할 수 있습니다.

이렇게 하려면 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

---

## VS Code 확장 프로그램

Intlayer 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

---

## 더 알아보기

더 자세히 알아보려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 참조

- [Intlayer 문서](https://intlayer.org)
- [SolidStart 문서](https://start.solidjs.com)
- [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useIntlayer.md)
- [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useLocale.md)
- [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)
- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

## 자주 묻는 질문

<FAQ>

<Question title="Solid Start 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

- **`@solid-primitives/i18n`**: 직접 조합하고 로드하며 타입을 지정해야 하는 커뮤니티 프리미티브 평면 사전입니다.
- **`i18next`**(Solid 래퍼 포함): 성숙한 카탈로그이지만 Solid Start에서의 로케일 인식 라우팅이나 서버 렌더링을 지원하지 않습니다.
- **`Intlayer`**: 가장 진보된 솔루션입니다. 코드베이스 어디에나 콘텐츠를 선언할 수 있으며([각 컴포넌트 옆 또는 중앙 집중식](https://intlayer.org/ko/blog/per-component-vs-centralized-i18n)), 빌드 타임에 컴파일되고, 지역화된 라우트, 서버 사이드 로케일 확인, 표준(canonical) 및 hreflang 링크, 다국어 사이트맵, AI 번역, 비주얼 에디터 및 CMS를 지원합니다.

Solid Start에서는 이 가이드에서 별도의 단계로 상세히 다루는 서버 측 구성 요소에서 큰 차이가 나타납니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)와 [Solid i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/solid.md)를 참조하세요.

</Question>

<Question title="i18n이 Solid Start 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. 서버 렌더링 마크업은 서버에서 콘텐츠를 확인하고, 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거되고, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/solid.md)를 참조하세요.

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

<Question title="Intlayer는 Solid Start 서버 사이드 렌더링과 호환되나요?">

네. 6단계에서 서버의 애플리케이션에 로케일을 제공하고 7단계에서 `lang` 및 `dir` 속성을 설정하므로 첫 번째 HTML 응답에 이미 올바른 언어가 포함되어 크롤러와 소셜 미리보기 봇이 즉시 읽을 수 있습니다.

</Question>

<Question title="로케일을 변경하면 앱 전체가 다시 렌더링되나요?">

아닙니다. 콘텐츠는 Solid 시그널(signal)에 의해 구동되므로 언어를 전환해도 주변 컴포넌트를 다시 실행하지 않고 변경된 값을 읽는 DOM 노드만 정밀하게 업데이트됩니다.

</Question>

<Question title="표준(canonical) 및 hreflang 링크는 어떻게 추가하나요?">

11단계에서 다룹니다. `getMultilingualUrls`는 `x-default`를 포함한 모든 선언 로케일에 대한 대체를 구축하며, 13단계에서 동일한 데이터를 다국어 사이트맵에 제공하여 한 페이지의 모든 언어 버전이 서로 연결되도록 합니다.

</Question>

<Question title="지역화된 라우트에서 404 페이지는 어떻게 처리하나요?">

12단계에서 다룹니다. `validatePrefix`는 URL의 로케일 세그먼트가 선언된 로케일인지 확인하므로 `/xx/about`과 같은 잘못된 경로는 일반 경로로 취급되어 중복 페이지로 색인화되는 대신 올바른 404를 반환합니다.

</Question>

<Question title="URL에 로케일을 반드시 포함해야 하나요?">

아닙니다. `routing.mode`는 `"prefix-no-default"`(기본값), `"prefix-all"`, `"no-prefix"`, `"search-params"`를 지원하며, `routing.domains`를 통해 각 로케일을 자체 도메인에 매핑할 수도 있습니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="서버 함수에서 로케일을 어떻게 가져오나요?">

14단계에서 다룹니다. 요청에 대해 확인된 로케일은 서버 함수 내부에서 사용할 수 있으므로 가져온 데이터를 클라이언트에서 다시 번역할 필요 없이 동일한 단계에서 지역화할 수 있습니다.

</Question>

<Question title="AI를 사용하여 앱을 자동으로 번역하려면 어떻게 하나요?">

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
