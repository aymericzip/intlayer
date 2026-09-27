---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Paraglide JS를 활용한 TanStack Start i18n: 2026 설정 가이드"
description: "Paraglide JS로 TanStack Start 앱을 번역하세요: URL 전략, 라우터 재작성, SSR 미들웨어, hreflang, 사이트맵 및 robots.txt 설정과 실제 벤치마크 데이터까지 알아봅니다."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - 국제화
  - i18n
  - SEO
  - React
  - 블로그
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "초기 버전"
author: aymericzip
---

# 2026년 Paraglide JS를 사용하여 TanStack Start 애플리케이션을 국제화하는 방법

## 목차

<TOC/>

## Paraglide JS란 무엇인가요?

**Paraglide JS**(inlang 제공)는 **컴파일러 기반** i18n 라이브러리입니다. JSON 객체에서 키를 검색하는 런타임을 제공하는 대신, 각 메시지를 타입이 지정된 JavaScript 함수(`m.about_title()`)로 컴파일합니다. 사용되지 않는 메시지는 번들러에 의해 제거(트리 셰이킹)될 수 있으며, 키에 오타가 있으면 컴파일 에러가 발생합니다.

Paraglide는 공식 TanStack Router 예제에서 사용되는 i18n 방식이며, 세 가지 요소를 통해 TanStack Start와 통합됩니다:

- 메시지와 런타임을 `src/paraglide`로 컴파일하는 **Vite 플러그인**
- 각 요청의 로케일을 확인하는 **서버 미들웨어**
- 지역화된 URL(`/fr/about`)을 라우트 트리(`/about`)로 매핑하여 별도의 `$locale` 세그먼트가 필요 없도록 하는 **라우터 재작성(rewrite)**

이 가이드에서는 이 세 가지를 모두 설정한 다음, Paraglide가 개발자에게 맡기는 나머지 작업들(`lang` 및 `dir`, 언어 전환기, 번역된 메타데이터, `canonical`, `x-default`를 포함한 `hreflang`, Open Graph, JSON-LD, 사이트맵, `robots.txt`, 사전 렌더링 및 지역화된 404 페이지)까지 모두 다룹니다.

> 다른 스택을 찾고 계신가요?

- [TanStack Start + use-intl 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Lingui 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_lingui.md)
- [TanStack Start + Intlayer 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)

> 두 컴파일러 기반 접근 방식을 비교하고 싶으신가요? [Intlayer는 Paraglide보다 더 가벼운가요?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_intlayer_lighter_than_paraglide.md) 문서를 읽어보세요.

- [Intlayer는 Paraglide보다 더 가벼운가요?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_intlayer_lighter_than_paraglide.md)

> 이러한 라이브러리가 어디에서 왔는지 이해하려면 JavaScript i18n의 역사를 읽어보세요.

- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)

## TanStack Start에서의 Paraglide 벤치마크 결과

[i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)는 모든 주요 라이브러리를 사용하여 동일한 10페이지, 10개 로케일 TanStack Start 앱을 실행하고 브라우저가 실제로 다운로드하는 양을 측정합니다.

- [i18n 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

2026-09-26에 측정된 `@inlang/paraglide-js@2.15.1`의 주요 수치 (gzip):

| 설정                  | 라이브러리 크기 | 페이지당 JS | 타 로케일 누출 | 타 페이지 누출 | 페이지 로드 |
| :-------------------- | --------------: | ----------: | -------------: | -------------: | ----------: |
| i18n 미적용 (기본 앱) |               - |    111.0 KB |             0% |             0% |     15.7 ms |
| Paraglide JS          |          1.8 KB |    125.1 KB |          49.7% |             0% |     22.1 ms |
| `react-intlayer`      |          4.5 KB |    126.8 KB |             0% |             0% |     14.8 ms |
| `use-intl`            |         75.9 KB |    128.7 KB |             0% |             0% |     17.4 ms |
| Lingui                |         56.7 KB |    120.2 KB |           8.6% |             0% |     21.9 ms |

주요 시사점:

- **런타임이 매우 작고, 다른 페이지의 번역이 누출되지 않습니다.** 런타임은 설정에 맞게 생성되며, 메시지는 사용되는 곳에서 직접 임포트됩니다.
- **로케일 데이터 누출이 발생합니다.** 각 메시지 함수에 모든 로케일이 포함되어 있으므로, 한 페이지에 전달되는 번역 문자열의 약 절반이 방문자가 사용하지 않는 언어로 구성됩니다. 로케일을 추가할수록 이 비율은 더 커집니다.
- **페이지 로드 속도가 비교군 중 가장 느립니다.** 이는 부분적으로 로케일을 React 컨텍스트에서 읽지 않고 매 호출 시마다 전략을 통해 확인하기 때문입니다.

> 전체 데이터 확인하기: [TanStack Start 벤치마크 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md) 및 [벤치마크 저장소](https://github.com/intlayer-org/benchmark-i18n).

- [TanStack Start 벤치마크 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)

## TanStack Start에서의 기능 비교

Paraglide JS와 TanStack Start에서 흔히 사용되는 다른 라이브러리 간의 비교:

| 기능                                  | `react-intlayer` (Intlayer)          | `use-intl`            | Paraglide JS                      | Lingui                       |
| ------------------------------------- | ------------------------------------ | --------------------- | --------------------------------- | ---------------------------- |
| **컴포넌트 인근 번역 파일 배치**      | ✅ 동위 배치 (Co-located)            | ❌ 중앙 집중식 JSON   | ❌ 로케일당 하나의 JSON 파일      | ⚠️ 컴포넌트 내 원본 텍스트   |
| **TypeScript 통합**                   | ✅ 자동 생성된 타입                  | ✅ `AppConfig` 활용   | ✅ 타입이 지정된 메시지 함수      | ⚠️ 매크로만 지원             |
| **누락된 번역 감지**                  | ✅ 타입 에러 및 빌드 경고            | ⚠️ 런타임 폴백        | ⚠️ 기본 로케일로 폴백             | ⚠️ 원본 텍스트로 폴백        |
| **리치 콘텐츠 (JSX, Markdown)**       | ✅ 직접 지원                         | ⚠️ `t.rich` 태그 지원 | ⚠️ 문자열                         | ✅ `<Trans>` 내부 JSX        |
| **지역화된 라우팅**                   | ✅ 내장 기능                         | ❌ 수동 `{-$locale}`  | ✅ `urlPatterns` + 라우터 재작성  | ❌ 수동 `{-$locale}`         |
| **새로고침 없는 언어 전환**           | ✅ 지원                              | ✅ 지원               | ❌ 전체 페이지 새로고침           | ✅ 지원                      |
| **복수형 (Pluralization)**            | ✅ 열거형 기반                       | ✅ ICU                | ✅ 변형(Variants)                 | ✅ ICU                       |
| **ICU MessageFormat**                 | ✅ `format: "icu"` 지원              | ✅ 기본 지원          | ⚠️ inlang 플러그인 필요           | ✅ 기본 지원                 |
| **콘텐츠 포맷**                       | ✅ `.ts`, `.json`, `.md`, `.yaml` 등 | ⚠️ `.json`            | ⚠️ inlang JSON                    | ✅ PO, JSON, CSV             |
| **AI 번역**                           | ✅ 자체 프로바이더 및 API 키         | ❌ 미지원             | ❌ 미지원                         | ❌ 미지원                    |
| **시각적 에디터 / CMS**               | ✅ 로컬 에디터 + 선택적 CMS          | ❌ 외부 플랫폼        | ⚠️ inlang 생태계 앱               | ❌ 외부 플랫폼               |
| **SEO 헬퍼 (hreflang, 사이트맵)**     | ✅ 내장 기능                         | ❌ 수동 구현          | ⚠️ 지역화된 URL 지원, 나머지 수동 | ❌ 수동 구현                 |
| **런타임 크기 (gzip, 벤치마크)**      | 4.5 KB                               | 75.9 KB               | 1.8 KB                            | 56.7 KB                      |
| **누출, 최적 설정 (로케일 / 페이지)** | 0% / 0%                              | 0% / 0%               | 49.7% / 0%                        | 8.6% / 0%                    |
| **CI에서의 누락 번역 검사**           | ✅ `npx intlayer test`               | ⚠️ 내장 기능 없음     | ⚠️ 내장 기능 없음                 | ✅ `lingui compile --strict` |

> 런타임 크기 및 누출 수치는 [TanStack Start 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)를 기반으로 합니다. 누출은 각 라이브러리의 최적 설정에서 측정되었습니다.

- [TanStack Start 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)

> 기타 TanStack Start 가이드:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)

## 준수해야 할 모범 사례

- 서버에서 확인된 로케일을 바탕으로 **`<html>`에 `lang` 및 `dir`을 설정**하세요.
- 모든 언어 버전이 색인될 수 있도록 접두사 전략(`/fr/about`)을 통해 **로케일당 하나의 URL을 유지**하세요.
- URL이 신뢰할 수 있는 단일 출처가 되고 크롤러가 요청한 페이지를 정확히 받을 수 있도록 **로케일 전략에서 `url`을 첫 번째로 배치**하세요.
- 함수 이름으로 깔끔하게 매핑되는 **단일 레벨의 설명적인 메시지 키**(`about_title`)를 사용하세요.
- 생성된 파일의 머지 충돌을 방지하기 위해 **생성된 `src/paraglide` 폴더가 아닌 `messages/*.json`만 커밋**하세요.
- **메타데이터를 번역**하고, 모든 페이지에 `canonical`, `hreflang` 및 `x-default`를 선언하세요.
- **다국어 사이트맵과 robots.txt를 생성**하고, 모든 로케일을 사전 렌더링하세요.
- 크롤러가 모든 언어를 발견할 수 있도록 **언어 전환기에 실제 링크 태그(`<a>`)를 사용**하세요.

- [국제화 및 SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md)
- [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)

## TanStack Start 애플리케이션에서 Paraglide JS를 설정하는 단계별 가이드

생성할 프로젝트 구조는 다음과 같습니다:

```bash
.
├── project.inlang
│   └── settings.json          # 로케일 및 메시지 포맷 설정
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # 자동 생성됨, git 무시 대상
    ├── server.ts              # Paraglide 미들웨어
    ├── router.tsx             # URL 재작성
    ├── i18n
    │   ├── config.ts          # 사이트 URL, 헬퍼
    │   └── seo.ts             # head() 빌더
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / 및 /fr
        ├── about.tsx          # /about 및 /fr/about
        ├── $.tsx              # 지역화된 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

라우터 재작성이 라우트 매칭 전에 접두사를 제거하므로 별도의 `$locale` 폴더가 필요 없다는 점에 주목하세요.

<Steps>
<Step number={1} title="종속성 설치">

TanStack Start 프로젝트에서 시작한 다음, Paraglide를 초기화합니다. init 명령은 `project.inlang/settings.json`, 최초의 `messages/en.json`을 생성하고 패키지를 설치합니다.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: 컴파일러 및 Vite 플러그인입니다. 런타임 패키지는 설치할 필요가 없습니다. 런타임 코드가 프로젝트 내부로 직접 생성됩니다.

</Step>
<Step number={2} title="로케일 구성">

`project.inlang/settings.json`은 로케일을 관리하는 단일 소스입니다. 메시지 포맷 플러그인은 로케일당 하나의 JSON 파일을 읽습니다.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Vite 플러그인 및 URL 전략 구성">

플러그인은 변경 사항이 있을 때마다 메시지를 컴파일합니다. TanStack Start에서는 세 가지 옵션이 중요합니다:

- **`strategy`**: 로케일을 읽어올 순서가 지정된 목록입니다. `url`을 첫 번째로 설정하면 URL이 신뢰할 수 있는 소스가 됩니다. `cookie`와 `preferredLanguage`는 URL로 결정할 수 없을 때 미들웨어에서 사용됩니다.
- **`urlPatterns`**: 로케일이 URL에 매핑되는 방식입니다. 일치하는 첫 번째 패턴이 적용되므로 기본이 아닌 로케일을 먼저 나열합니다. 여기서는 기본 로케일에 접두사를 붙이지 않고(`/about`), 다른 로케일에는 접두사를 붙입니다(`/fr/about`).
- **`outputStructure: "message-modules"`**: 메시지당 하나의 모듈로 분리하여 페이지에서 임포트하지 않는 메시지를 번들러가 제거할 수 있도록 합니다.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // 기본 로케일은 마지막에 배치: 나머지 모든 URL과 일치함
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

생성된 폴더를 `.gitignore`에 추가합니다. 이 폴더는 `dev` 및 `build` 시 자동으로 다시 빌드됩니다:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="번역 파일 생성">

각 키는 `src/paraglide/messages`에서 내보내지는 함수가 됩니다. 계층 구조가 없는 snake_case 키를 사용하면 함수 이름을 가장 깔끔하게 유지할 수 있습니다. 변수는 `{name}` 플레이스홀더를 사용합니다.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

복수형(Plural)은 inlang 메시지 포맷의 변형(variants) 구문을 사용합니다:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="서버 미들웨어 추가">

미들웨어는 지정한 전략에 따라 각 요청의 로케일을 확인하고, `AsyncLocalStorage` 범위를 통해 전체 서버 렌더링 동안 `getLocale()`에서 해당 로케일을 사용할 수 있도록 합니다. 이를 통해 서로 다른 언어로 들어오는 동시 요청을 안전하게 처리할 수 있습니다.

TanStack Start에서는 기본 서버 엔트리를 래핑합니다:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="라우터에서 지역화된 URL 재작성">

TanStack Router의 `rewrite` 옵션은 라우터의 경계에서 URL을 변환합니다:

- **입력(input)**: `/fr/about`은 라우트 매칭 전에 `/about`으로 비지역화(de-localize)되므로 단일 `about.tsx` 라우트가 모든 언어를 처리할 수 있습니다.
- **출력(output)**: 생성되는 모든 `href`(링크, 리다이렉트, 네비게이션)는 현재 활성화된 로케일에 맞게 지역화되므로 프랑스어 페이지에서 `<Link to="/about">`는 `/fr/about`을 렌더링합니다.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> 링크가 rewrite에 의해 자동으로 지역화되므로 커스텀 `LocalizedLink` 컴포넌트가 필요하지 않습니다. 평소처럼 TanStack Router의 `Link`를 사용하면 됩니다.

</Step>
<Step number={7} title="루트 문서 생성">

`getLocale()`은 서버에서는 미들웨어가 확인한 로케일을 반환하고 브라우저에서는 URL의 로케일을 반환하므로, 서버 HTML과 하이드레이션 이후의 `lang` 및 `dir`이 동일하게 유지됩니다.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** 표준 URL, canonical URL, hreflang 및 사이트맵에 사용되는 공개 오리진 */
export const siteUrl = "https://example.com";

/** Open Graph는 `language_TERRITORY` 코드를 필요로 합니다. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="페이지에서 번역 활용하기">

메시지는 일반 함수입니다. `m`을 가져와서 함수를 호출하고 변수를 객체로 전달하기만 하면 됩니다. 변수를 포함한 모든 것이 타입으로 보호됩니다.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> 메시지 함수는 명시적인 로케일도 지원합니다: `m.about_title({}, { locale: "fr" })`. 이는 이메일 발송처럼 요청과 다른 언어로 렌더링해야 하는 서버 코드에서 유용합니다.

</Step>
<Step number={9} title="콘텐츠 언어 변경하기" isOptional={true}>

크롤러가 모든 언어를 발견할 수 있도록 `localizeHref`를 사용하여 전환기를 **링크**로 렌더링하세요. `setLocale`은 쿠키에 선택 사항을 저장하고 새 언어로 페이지를 다시 로드합니다. 메시지 함수가 React 상태를 구독하지 않고 호출될 때마다 로케일을 읽기 때문에 전체 페이지를 다시 로드하는 것이 Paraglide의 기본 동작입니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // 라우터 경로명 (rewrite에 의해 이미 비지역화됨): "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // 쿠키를 설정하고 지역화된 URL로 새로고침
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="메타데이터 국제화" isOptional={true}>

모든 페이지가 다음 항목들을 제공하면 각 언어 버전이 독립적으로 검색 순위를 확보할 수 있습니다:

- **번역된** `<title>` 및 `description`
- 자기 자신을 가리키는 **canonical** URL
- **로케일당 하나의 `hreflang` 대체 링크** 및 **`x-default`**
- **Open Graph** `og:locale`, `og:locale:alternate` 및 `og:url`
- `inLanguage`가 포함된 **JSON-LD**

Paraglide의 `localizeUrl`은 `urlPatterns`를 기반으로 대체 URL을 생성하므로 실제 라우팅과 불일치할 염려가 없습니다:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** 비지역화된 경로 (예: "/about") */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="사이트맵 국제화" isOptional={true}>

다국어 사이트맵은 모든 로케일의 모든 URL을 나열하며, 각 항목은 `xhtml:link`를 사용하여 모든 대체 언어 버전을 선언합니다:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="robots.txt 국제화" isOptional={true}>

비공개 라우트는 모든 언어로 존재하므로 `Disallow` 규칙은 모든 지역화된 경로를 포함해야 합니다. 스타터 템플릿이 생성한 `public/robots.txt`가 있다면 삭제한 다음, 라우트를 통해 제공하세요:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="모든 로케일 사전 렌더링" isOptional={true}>

TanStack Start가 모든 언어 버전을 사전 렌더링하도록 각 페이지의 지역화된 경로를 나열합니다. `localizeHref`는 브라우저 종속성이 없는 생성된 코드이므로 `vite.config.ts`에서 실행할 수 있지만, 최초 컴파일 이후에만 파일이 존재합니다. 아래와 같이 경로를 수동으로 나열하면 이러한 순서 문제를 방지할 수 있습니다:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // 기본 로케일 "en"은 접두사가 붙지 않음
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... 3단계와 동일한 옵션
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

언어 전환기가 실제 링크를 렌더링하기 때문에, `crawlLinks: true` 옵션은 목록에 누락된 페이지도 자동으로 찾아냅니다.

</Step>
<Step number={14} title="지역화된 404 페이지 처리" isOptional={true}>

라우터 재작성을 적용하면 `/fr/does-not-exist`가 `/does-not-exist`로 매칭되지만 `getLocale()`은 여전히 `fr`을 반환하므로, 7단계의 루트 `notFoundComponent`가 프랑스어로 렌더링됩니다. catch-all 라우트를 구성하여 깊은 경로도 여기에 도달하도록 합니다. 페이지에 `noindex`를 표시하세요. React 19는 `<meta>` 태그를 자동으로 `<head>`로 끌어올립니다.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="서버 함수에서 로케일 접근하기" isOptional={true}>

서버 함수는 Paraglide 미들웨어 범위 내에서 실행되므로 `getLocale()`을 서버 함수에서도 동일하게 사용할 수 있습니다:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Intlayer와 비교" isOptional={true}>

Paraglide와 Intlayer는 모두 빌드 타임에 콘텐츠를 컴파일하고 가능한 한 적은 런타임을 제공한다는 동일한 아이디어를 따르기 때문에 두 라이브러리 간의 직접적인 드롭인 어댑터는 없습니다. 차이점은 브라우저에 도달하는 데이터와 콘텐츠 구성 방식에 있습니다:

- **로케일 관리**: Intlayer는 로케일별로 [동적 딕셔너리](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)를 로드하여 벤치마크 기준 로케일 누출이 0%인 반면, Paraglide의 각 메시지 함수는 모든 로케일을 포함하므로 49.7%의 로케일 누출이 발생합니다.
- **콘텐츠 구성**: 콘텐츠를 각 컴포넌트 옆의 `.content.ts` 파일에 둘 수도 있고, 중앙 집중식 파일로 관리할 수도 있습니다. [컴포넌트별 vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md) 문서를 참고하세요.
- **언어 전환**: 콘텐츠가 React 컨텍스트에서 읽히므로 로케일을 전환해도 페이지 새로고침 없이 리렌더링됩니다.
- **생성된 코드**: `src` 내부에 코드가 생성되지 않으므로 커밋 전에 다시 생성할 필요가 없습니다.

Paraglide가 아닌 다른 라이브러리에서 마이그레이션하는 경우, [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 사용하면 `use-intl`, `next-intl`, `react-i18next`, `react-intl`, Lingui API를 그대로 유지하면서 런타임만 교체할 수 있습니다.

- [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)

[Intlayer는 Paraglide보다 더 가벼운가요?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_intlayer_lighter_than_paraglide.md) 및 [Intlayer TanStack Start 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)를 확인하세요.

- [Intlayer는 Paraglide보다 더 가벼운가요?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_intlayer_lighter_than_paraglide.md)
- [Intlayer TanStack Start 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)

</Step>
<Step number={17} title="Intlayer를 활용하여 번역 자동화하기" isOptional={true}>

Paraglide는 번역을 렌더링하지만 번역을 **생성**하는 데는 도움이 되지 않습니다. Intlayer는 **무료**이며 **오픈 소스**로, Paraglide 프로젝트에서도 유용한 도구들을 제공합니다:

- 자체 API 키와 프로바이더를 사용하여 **AI로 번역**하세요. [자동 완성(auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md) 및 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참고하세요.
- [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)으로 **JSON 파일을 신뢰할 수 있는 소스**로 유지하세요.
- CI에서 **누락된 번역을 테스트**하세요. [번역 테스트 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)를 참고하세요.
- [scan 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/scan.md)를 사용하여 배포된 사이트에서 누락된 `hreflang`, 잘못된 canonical URL 및 로케일 누출을 **스캔**하세요.

</Step>
</Steps>

## 자주 묻는 질문

<FAQ>

<Question title="TanStack Start에서 Paraglide JS는 좋은 선택인가요?">

좋은 선택입니다. 공식 TanStack Router 예제에서 사용되고 있으며, [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)에서 가장 작은 런타임 크기(~1.8 KB gzip)를 기록했고 메시지가 완벽하게 타입으로 보호됩니다. 다만, 모든 메시지 함수에 모든 로케일이 포함되어 있어 다른 언어 방문자에게 약 절반의 번역 문자열이 누출된다는 점과 언어 전환 시 페이지가 새로고침된다는 단점이 있습니다.

- [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)

</Question>
<Question title="Paraglide를 사용할 때 $locale 라우트 세그먼트가 필요한가요?">

아니요. 라우터 `rewrite`가 라우트 매칭 전에 로케일 접두사를 제거하고 생성된 링크에 다시 추가하므로 단일 `about.tsx` 파일로 `/about`, `/fr/about`, `/es/about`을 모두 처리할 수 있습니다.

</Question>
<Question title="언어를 변경할 때 왜 페이지가 새로고침되나요?">

메시지 함수는 호출될 때 로케일을 읽으며 React 상태를 구독하지 않기 때문입니다. 따라서 `setLocale`은 기본적으로 페이지를 다시 로드하여 모든 메시지가 새 언어로 다시 렌더링되도록 합니다. `{ reload: false }`를 전달할 수 있지만, 이 경우 직접 컴포넌트 트리를 다시 렌더링해야 합니다.

</Question>
<Question title="생성된 src/paraglide 폴더를 커밋해야 하나요?">

커밋하지 않는 것이 좋습니다. 이 폴더는 `dev` 및 `build` 시마다 다시 생성되며, 이를 커밋하면 생성된 파일에서 머지 충돌이 발생할 수 있습니다. 대신 `messages/*.json`과 `project.inlang/settings.json`을 커밋하세요.

</Question>
<Question title="Paraglide에서 hreflang 태그를 어떻게 추가하나요?">

라우트의 `head()`에서 `localizeUrl`을 사용하여 로케일당 하나의 절대 URL을 빌드하고 기본 로케일을 가리키는 `x-default`를 추가하세요. 10단계에서 재사용 가능한 헬퍼를 제공하며, 11단계에서는 동일한 대체 링크를 사이트맵에 추가합니다.

</Question>
<Question title="Paraglide는 사용하지 않는 번역을 트리 셰이킹(tree-shaking)하나요?">

`outputStructure: "message-modules"`를 사용할 때 사용하지 않는 **메시지**는 제거되므로 다른 페이지의 콘텐츠는 누출되지 않습니다. 그러나 사용하지 않는 **로케일**은 제거되지 않습니다. 각 메시지 함수에 모든 번역이 포함되어 있기 때문에 벤치마크에서 49.7%의 로케일 누출이 측정됩니다.

</Question>
<Question title="Paraglide에서 Intlayer로 마이그레이션할 수 있나요?">

네, 가능합니다. 두 라이브러리 모두 컴파일러 기반이므로 멘탈 모델이 매우 유사합니다. [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)으로 기존 JSON 파일을 유지한 후, 페이지별로 `m.key()` 호출을 `useIntlayer`로 점진적으로 교체하세요. [Intlayer TanStack Start 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)를 참고하세요.

- [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)
- [Intlayer TanStack Start 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)

</Question>

</FAQ>
