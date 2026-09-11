---
createdAt: 2026-09-09
updatedAt: 2026-09-11
title: "Remix 3 i18n - 앱 다국어 번역 완벽 가이드"
description: "더 이상 i18next는 필요 없습니다. 2026년 다국어(i18n) Remix 3 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO 및 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - 웹 표준
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 초기 문서"
author: aymericzip
---

# Intlayer를 사용하여 Remix 3 웹사이트 번역하기 | 국제화 (i18n)

이 가이드에서는 언어 인식 라우팅, 타입 안전한 콘텐츠 선언, 서버 렌더링 JSX 컴포넌트, Node.js, Bun, Deno 및 Cloudflare Workers 전반에 걸친 크로스 런타임 지원을 통해 **Remix 3** 애플리케이션에 **Intlayer**를 원활하게 통합하는 방법을 설명합니다.

## Remix 3란 무엇인가요?

**Remix 3**는 **완전히 웹 표준을 기반으로 구축된, 조합 가능하고 런타임에 구애받지 않는 웹 프레임워크**로의 근본적인 아키텍처 전환을 의미합니다. 특정 번들러나 독점 서버 API에 종속되지 않고 단일 목적의 모듈형 패키지로 배포됩니다.

- **`remix/fetch-router`** (또는 `remix/router`): Fetch API(`Request` 및 `Response`)를 기반으로 구축된 가볍고 표준을 준수하는 라우팅.
- **`remix/ui`**: JSX 컴포넌트 모델(`jsxImportSource: "remix/ui"`). 컴포넌트는 Handle을 받아 렌더 함수를 반환하는 셋업 함수로, React와 유사하지만 상태는 순수 JavaScript 클로저에 유지됩니다.
- **`remix/middleware/render`**: 모든 요청에 `context.render(<Page />)`를 설치하여 JSX 트리를 HTML `Response`로 스트리밍합니다.
- **`remix/node-fetch-server`**: Bun, Deno 및 엣지 런타임을 기본 지원하는 Node.js용 서버 어댑터.
- **`remix/cookie`**: 암호학적으로 안전한 쿠키 파싱 및 직렬화.

**Intlayer**와 결합하면 컴파일 타임 안전성, 자동화된 AI 번역, 서버 렌더링 시 추가 오버헤드 없는 성능, 매끄러운 언어 라우팅을 제공하는 완전한 국제화 시스템을 구축할 수 있습니다.

## 목차

<TOC/>

## 다른 대안 대신 Intlayer를 선택해야 하는 이유

`i18next`나 맞춤형 번역 로더와 같은 기존 솔루션과 비교할 때 Intlayer는 최신 웹 아키텍처에 최적화된 통합 개발자 경험을 제공합니다.

<AccordionGroup>
<Accordion header="Remix 3 및 웹 표준 완전 지원">

Intlayer는 웹 표준(`Request`, `Response`, `Headers`, `URL`)과 완벽하게 작동하도록 설계되었습니다. 가벼운 미들웨어를 통해 Remix 3의 Fetch 라우터에 쉽게 통합되어 특정 런타임에 종속되지 않고 URL 경로, 쿠키 또는 `Accept-Language` 헤더에서 언어를 추출합니다.

</Accordion>
<Accordion header="타입 안전한 콘텐츠 선언">

느슨한 JSON 키와 런타임 키 누락 오류는 이제 잊으세요. Intlayer는 선언된 모든 언어에서 TypeScript 검사를 적용하여 번역이 누락되거나 잘못된 경우 빌드 시 경고를 표시합니다.

</Accordion>
<Accordion header="서버 번들 오버헤드 제로">

Remix 3는 서버에서 JSX 컴포넌트를 렌더링하고 HTML을 클라이언트로 스트리밍합니다. 요청된 언어에 대해 확인된 텍스트만 출력 스트림에 렌더링됩니다. 컴포넌트가 명시적으로 `clientEntry`로 표시되지 않는 한 클라이언트 하이드레이션 번들이나 무거운 번역 카탈로그가 필요하지 않습니다.

</Accordion>
<Accordion header="AI 에이전트 및 자동화 지원">

Intlayer는 콘텐츠 선언(`.content.ts`)을 라우트 로직과 같은 위치에 배치하여 대규모 언어 모델(LLM)에 필요한 토큰 컨텍스트를 줄입니다. `intlayer fill` 및 `intlayer test`와 같은 기본 CLI 명령을 사용하면 선택한 AI 공급자의 순수 비용으로 CI/CD 파이프라인에서 번역을 자동화할 수 있습니다.

</Accordion>
<Accordion header="비주얼 에디터 및 CMS 통합">

코드 우선 워크플로 외에도 Intlayer는 자체 호스팅 가능한 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 및 [원격 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 제공하여 비개발자인 편집자와 번역가가 코드를 다시 배포하지 않고도 콘텐츠를 업데이트할 수 있습니다.

</Accordion>
</AccordionGroup>

## 단계별 가이드

<Tabs defaultTab="code">
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 다국어화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 템플릿"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-remix-3-template)을 확인하세요.

<Steps>
<Step number={1} title="종속성 설치">

원하는 패키지 관리자를 사용하여 `intlayer` 및 `remix`(버전 3)를 설치합니다.

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: 구성 관리, 사전 선언(`t()`, `Dictionary`), CLI 도구 및 런타임 인터프리터를 제공하는 핵심 국제화 엔진입니다.
- **`remix`**: `remix/router`, `remix/routes`, `remix/ui`, `remix/middleware/render`, `remix/node-fetch-server`를 내보내는 통합 Remix 3 프레임워크 패키지입니다.

</Step>
<Step number={2} title="Intlayer 구성">

프로젝트 루트에 `intlayer.config.ts`를 생성하여 지원 언어 및 국제화 설정을 선언합니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.KOREAN],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.KOREAN],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.KOREAN],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 추가 구성 설정은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>
<Step number={3} title="다국어 콘텐츠 선언">

`.content.ts` 파일에 지역화된 콘텐츠를 선언합니다.

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      ko: "Remix 3에 오신 것을 환영합니다",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      ko: "기본 i18n을 갖춘 웹 표준 기반의 조합 가능한 애플리케이션입니다.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      ko: "언어 변경:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer는 JSON, YAML 및 CommonJS 형식도 지원합니다. [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>
<Step number={4} title="Intlayer 사전 빌드">

사전 정의를 컴파일하여 TypeScript 타입 및 런타임 레지스트리를 생성합니다.

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

이 명령은 콘텐츠를 `.intlayer` 아티팩트 디렉터리로 컴파일하여 완벽한 TypeScript 자동 완성과 빠른 사전 조회를 제공합니다.

</Step>
<Step number={5} title="Intlayer 미들웨어 구현">

Remix 3는 `createRouter({ middleware: [...] })`를 통해 조합 가능한 미들웨어 파이프라인을 제공합니다.

다음 우선순위에 따라 들어오는 각 요청의 언어를 확인하는 Intlayer 미들웨어를 생성합니다.

1. Intlayer의 `getLocaleFromPath`를 통한 URL 경로 접두사(예: `/ko` 또는 `/fr`).
2. 저장 쿠키(`INTLAYER_LOCALE`), 사용자 정의 헤더(`x-intlayer-locale`), 표준 `Accept-Language` 헤더 및 설정된 `defaultLocale`을 자동으로 협상하는 Intlayer의 `getLocale` 헬퍼.

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Remix 3 RequestContext에서 확인된 언어를 검색하기 위한 타입 안전한 컨텍스트 키입니다.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Remix 3용 Intlayer 미들웨어입니다.
 *
 * 다음 우선순위에 따라 요청 언어를 확인합니다:
 * 1. `getLocaleFromPath`를 통한 URL 경로 접두사(예: `/ko/...`)
 * 2. `getLocale`을 통한 헤더 및 저장소 협상(쿠키, 사용자 정의 헤더, Accept-Language, 기본 defaultLocale 대체)
 *
 * 확인된 언어를 Remix 3 RequestContext에 연결합니다.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // 경로 감지 (/ko/about -> "ko", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // 확인된 언어를 Remix 3 요청 컨텍스트에 첨부
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // 확인된 언어를 Remix 3 요청 컨텍스트에 첨부
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="타입 안전한 라우트 정의">

`remix/routes`의 `route()`를 사용하여 애플리케이션 라우트를 정의합니다.

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // 기본 로케일 라우트
  home: "/",

  // 동적 :locale 세그먼트가 있는 현지화된 라우트
  localizedHome: "/:locale",
});
```

`route()`를 사용하면 애플리케이션 전반에서 타입 안전한 URL을 생성할 수 있습니다.

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "ko" }); // "/ko"
```

</Step>
<Step number={7} title="JSX를 사용한 지역화된 페이지 렌더링">

Remix 3는 `remix/ui`의 JSX 컴포넌트를 사용하여 UI를 렌더링합니다. 컴포넌트는 `Handle`을 받아 **렌더 함수**를 반환하는 **셋업 함수**입니다. 셋업은 인스턴스당 한 번 실행되고, 렌더는 매 업데이트마다 실행되며, props는 `handle.props`를 통해 읽습니다.

확인된 언어로부터 `<html lang="..." dir="...">` 속성을 설정하는 공유 `Document` 셸부터 시작합니다.

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, type Locale } from "intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  locale: Locale;
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { locale, title, children } = handle.props;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

그런 다음 홈페이지를 만듭니다. `getIntlayer`로 지역화된 사전을 추출하고 언어 전환기를 렌더링합니다.

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import {
  getIntlayer,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import type { Handle } from "remix/ui";
import { routes } from "../routes";
import { Document } from "./document";

type HomePageProps = {
  locale: Locale;
};

export const HomePage = (handle: Handle<HomePageProps>) => () => {
  const { locale } = handle.props;
  const home = getIntlayer("home", locale);

  return (
    <Document locale={locale} title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          {locales.map((targetLocale) => {
            const isActive = targetLocale === locale;

            return (
              <a
                key={targetLocale}
                href={getLocalizedPath(routes.home.href(), targetLocale)}
                class={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {getLocaleName(targetLocale, locale)}
              </a>
            );
          })}
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX는 React가 아닙니다. 훅이 없으며, `class`는 있는 그대로 작성하고(`className`도 허용됨), 재렌더링은 `handle.update()`로 명시적으로 트리거합니다. 보간된 값은 자동으로 이스케이프됩니다.

</Step>
<Step number={8} title="라우터 및 서버 연결">

Intlayer 미들웨어 옆에 `remix/middleware/render`의 `render()` 미들웨어를 추가합니다. 모든 요청에 `context.render(node, init)`을 설치하여 JSX 트리를 HTML `Response`로 스트리밍합니다(앞에 `<!DOCTYPE html>`을 추가하고 `Content-Type` 헤더를 설정).

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Intlayer + render 미들웨어로 라우터 초기화
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. 라우트 핸들러 매핑
router.map(routes, {
  actions: {
    // 기본 로케일 라우트
    home(context) {
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },

    // 현지화된 라우트
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },
  },
});
```

> `context.render`는 두 번째 인수로 선택적 `ResponseInit`을 받습니다(예: `context.render(<NotFoundPage locale={locale} />, { status: 404 })`).

마지막으로 표준 `fetch` 핸들러를 통해 라우터를 노출합니다. 동일한 라우터가 Node.js, Bun, Deno 및 Cloudflare Workers에서 실행됩니다.

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

// Bun / Deno / Cloudflare Workers
export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="번역 검사 및 자동 채우기">

Intlayer는 누락된 번역을 감사하고 AI를 사용하여 자동으로 채울 수 있는 CLI를 제공합니다.

```bash packageManager="npm"
# 누락된 번역 확인
npx intlayer test

# AI를 사용하여 누락된 번역 채우기
npx intlayer fill
```

```bash packageManager="pnpm"
# 누락된 번역 확인
pnpm dlx intlayer test

# AI를 사용하여 누락된 번역 채우기
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# 누락된 번역 확인
yarn dlx intlayer test

# AI를 사용하여 누락된 번역 채우기
yarn dlx intlayer fill
```

```bash packageManager="bun"
# 누락된 번역 확인
bun x intlayer test

# AI를 사용하여 누락된 번역 채우기
bun x intlayer fill
```

</Step>
</Steps>

## TypeScript 구성

JSX가 `remix/ui` 런타임을 가리키도록 설정하고 `tsconfig.json`에 생성된 `.intlayer` 타입이 포함되어 있는지 확인하세요.

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"`는 `<HomePage />`가 React 대신 Remix의 `createElement`로 해석되도록 만듭니다.

## 결론

Remix 3와 Intlayer를 사용하면 개방형 웹 표준을 준수하는 가볍고 완전히 타입이 지정된 이식성 높은 스택을 확보할 수 있습니다. 간단한 마케팅 페이지부터 엣지에서 렌더링되는 전 세계 분산 서비스까지 원활하게 확장할 수 있습니다.
