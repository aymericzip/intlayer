---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs @intlayer/next-intl: 동일한 API, 다른 번들"
description: Next.js 앱의 next-intl imports가 @intlayer/next-intl compat adapter에 의해 제공될 때 어떤 변화가 생기는지 알아봅니다. 동일한 코드에서 측정된 번들 크기, leakage, 컴포넌트 크기 및 hydration, 그리고 adapter가 유지하는 것, 무시하는 것 및 대체할 수 없는 것.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | 동일한 API, 다른 번들

`@intlayer/next-intl`는 호환성 어댑터입니다. `next-intl` API (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...)를 노출하고 Intlayer에서 컴파일한 딕셔너리로부터 제공합니다. 애플리케이션 코드는 변경되지 않습니다. 번들만 달라집니다.

이 글은 동일한 Next.js 애플리케이션에서 `next-intl`로 한 번 빌드하고 어댑터로 한 번 빌드한 것을 비교합니다. 수치는 브라우저가 실제로 다운로드하는 내용을 기록하는 오픈소스 도구인 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)에서 나옵니다. 라이브러리로서의 `next-intl` vs Intlayer 비교를 원한다면 [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer)를 읽어보세요. 이 글은 컴포넌트를 그대로 유지할 때 어댑터가 어떤 변화를 가져오는지에 관한 것입니다.

<TOC/>

> **요약**: 동일한 Next.js 앱에서 `next-intl`을 `@intlayer/next-intl`로 바꾼 경우, 페이지당 JavaScript는 **153.6 KB에서 147.5 KB** gzip으로, 평균 컴포넌트는 **21.8 KB에서 8.1 KB**로, 외부 페이지 문자열 누수는 **약 90%에서 0%**로, hydration은 **14.7ms에서 12.8ms**로 감소했으며, 수정된 컴포넌트가 없습니다. TanStack Start에서 `use-intl` 동등물(`@intlayer/use-intl`)은 컴포넌트를 **76-87 KB에서 9-11 KB**로 줄였고 로케일 전환은 **7-21ms에서 4-9ms**로 단축했습니다. 어댑터는 `next-intl`의 **14.7 KB** 및 네이티브 `next-intlayer`의 **5.5 KB**와 비교하여 **8.0 KB**의 런타임 비용이 발생합니다. 네비게이션과 미들웨어는 Intlayer의 라우팅 구성에서 다시 구현됩니다. 로컬라이즈된 `pathnames`은 전달되지 않는 유일한 기능입니다.

## `@intlayer/next-intl`이란

`next-intl`는 런타임입니다: `getRequestConfig`는 요청당 `messages/{locale}.json`을 로드하고, `NextIntlClientProvider`는 이를 클라이언트로 전송하며, `useTranslations("about")`는 렌더링 시 해당 객체에서 키를 읽습니다. 모든 최적화(네임스페이스, 페이지당 `pick(messages, [...])`, 지연 로딩)는 직접 작성해야 합니다.

`@intlayer/next-intl`는 해당 체인의 첫 번째와 마지막 부분을 유지하고 중간 부분을 대체합니다. 컴포넌트는 여전히 `useTranslations("about")`을 호출합니다. 그들이 받는 것은 빌드 시에 컴파일되고 해당 컴포넌트로 범위가 지정된 Intlayer 딕셔너리에서 활성 로케일에서만 제공됩니다.

세 가지 메커니즘이 이를 작동하게 합니다:

1. **Import aliasing.** `createNextIntlPlugin()`(from `@intlayer/next-intl/plugin`)은 `withIntlayer`을 래핑하고 Webpack / Turbopack aliases를 추가하여 `next-intl`, `next-intl/server`, `next-intl/navigation` 및 `next-intl/middleware`가 `@intlayer/next-intl`로 resolve되도록 합니다. 당신의 codebase에서 import는 이름이 변경되지 않습니다.
2. **JSON as source of truth.** `syncJSON` plugin은 기존 `messages/{locale}.json`을 읽고, 최상위 수준의 키를 네임스페이스당 하나의 dictionary로 분할하며, CLI나 CMS가 업데이트할 때 동일한 파일에 번역을 다시 작성합니다. 번역가의 workflow는 변경되지 않습니다.
3. **Call-site binding.** Intlayer optimize pass (Babel 또는 SWC)는 `useTranslations("about")`을 `about` dictionary를 직접 받는 call로 다시 작성합니다. 컴포넌트는 더 이상 global message tree에 접근하지 않고, 자신의 content에만 접근합니다.

```tsx fileName="app/[locale]/about/page.tsx"
// 당신의 코드, 변경 없음
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="컴파일러가 내보내는 것 (단순화됨)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

그 리라이트가 아래의 component-size 및 page-leakage 열을 이동시키는 이유입니다: 페이지는 자신이 렌더링하는 컴포넌트의 사전만 가져오며, 제공되는 로케일에서만 가져옵니다.

## 어댑터가 유지, 무시 및 대체하지 않는 것

| `next-intl` API                                                      | `@intlayer/next-intl` 사용                                                                                                   |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ 유지됨. 빌드 시간에 `ns` 사전에 바인딩됨. 키는 당신의 콘텐츠에 대해 타입되어 있습니다.                                    |
| `getTranslations({ locale, namespace })`                             | ✅ 유지됨                                                                                                                    |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ 유지됨. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}`는 Intlayer의 ICU resolver를 통해 실행됨           |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ 유지됨                                                                                                                    |
| `useFormatter()`                                                     | ✅ 유지됨. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange`는 네이티브 `Intl`로 연결됨                          |
| `NextIntlClientProvider`                                             | ✅ 유지됨. `messages`, `timeZone` 및 `now` props는 **수락되지만 무시됨** (개발자 경고가 표시됨)                              |
| `getMessages()`                                                      | ✅ 호환성을 위해 유지됨; 더 이상 필요하지 않음                                                                               |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ 필요하지 않음. 사전은 빌드 시간에 컴파일됨; 요청별 메시지 로딩이 없음                                                     |
| `defineRouting()`                                                    | ✅ 유지됨. 생략된 필드(`locales`, `defaultLocale`, `localePrefix`)는 `intlayer.config.ts`에서 읽음                           |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ 유지됨. Intlayer의 라우팅 설정에서 다시 구현됨; `routing` 인자는 허용되지만 무시됨                                        |
| `pathnames` (지역화된 경로명)                                        | ❌ 타입 지정을 위해 허용되지만, **보간되지 않음**. 평문 경로명을 유지하거나 해당 매핑을 Intlayer의 `rewrite`로 이동          |
| `createMiddleware()`                                                 | ✅ 유지됨. Intlayer의 프록시를 반환; `useLocale()` 및 스위처가 작동하도록 `NEXT_LOCALE` 쿠키를 설정                          |
| `NEXT_LOCALE` 쿠키                                                   | ✅ 기본적으로 읽음 (`routing.storage`를 직접 설정하지 않는 한)                                                               |
| Bare `useTranslations()` with no namespace                           | ⚠️ Works, but the call site is not bound: it resolves through the runtime registry. Pass a namespace to get the bundle gains |

## 벤치마크

### 측정 항목

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite는 각 설정으로 **동일한 애플리케이션**을 빌드합니다: **10개의 페이지** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10개의 locale** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트 및 동일한 콘텐츠. 페이지는 `en` 및 `fr`에서 측정됩니다.

`next-intl`은 네 가지 로딩 전략으로 구축되었습니다. 가장 단순한 설정(`messages/{locale}.json` 전체 로드)부터 최적화된 설정(경로당 하나의 namespace + 페이지당 `pick()`)까지입니다. 어댑터는 **naive 설정과 동일한 컴포넌트**로 구축되었으며, `next.config.ts`와 `intlayer.config.ts`만 변경되었습니다. "scoped" variant는 없습니다: 컴파일러가 컴포넌트당 콘텐츠를 스코프하므로, `static`과 `dynamic` 행이 이미 스코프되어 있습니다.

각 빌드마다, 스위트는 다음을 기록합니다:

- **Lib size**: i18n 라이브러리만 import하는 빈 컴포넌트의 gzip 크기입니다. 런타임의 고정 비용입니다.
- **Page JS**: 페이지당 다운로드되는 gzip JavaScript이며, 모든 페이지와 로케일에 대해 평균을 냅니다.
- **Locale leak %**: 사용자가 **보고 있지 않은** locale에 속하는 다운로드된 JS의 번역된 문자열의 비율.
- **Page leak %**: 사용자가 **방문하지 않은** 페이지에 속하는 다운로드된 JS의 번역된 문자열의 비율.
- **Component avg**: isolation에서 컴파일된 각 component의 평균 gzip 크기. 단일 component가 i18n runtime 및 catalog에 미치는 영향을 보여줍니다.
- **E2E reactivity**: 새로운 locale을 선택한 후 DOM의 `html[lang]` 업데이트까지의 실제 경과 시간 (Playwright, 5회 반복).
- **Hydration**: React hydration 단계 지속 시간.

> 아래의 숫자는 **2026-09-12**에 실행된 결과이며, `next-intl` / `use-intl` 4.14.2 및 `@intlayer/*` 9.5.1을 사용합니다. 테스트 애플리케이션은 의도적으로 작습니다 (locale당 몇십 개의 문자열), 따라서 누수 비율은 **패턴**을 설명합니다: runtime 비용이 고정되어 있는 동안 콘텐츠가 증가하면 증가합니다.

### Next.js 결과

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (i18n 없음)      | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**읽는 방법**

- **동일한 컴포넌트, 페이지당 6 KB 절약.** 어댑터로 빌드한 naive 앱은 **147.5 KB**에 도달하여, 완전히 최적화된 설정(153.6 KB)을 포함한 모든 `next-intl` 구성보다 작습니다. 런타임 자체가 차이입니다: 8.0 KB 대 14.7 KB, 모든 페이지에서 지불됩니다.
- **누수가 컴포넌트를 건드리지 않고 0%로 간다.** 순진한 `next-intl` 설정은 모든 페이지에서 ~90%의 외국어 페이지 문자열을 배송한다. `next-intl`으로 0%에 도달하려면 `scoped-*` 설정을 의미한다: 라우트당 하나의 네임스페이스, 각 페이지에서 `pick(messages, [...])`. 어댑터는 각 `useTranslations("ns")`를 자신의 딕셔너리에 바인딩하는 optimize 패스 때문에 순진한 코드에서 0%에 도달한다.
- **컴포넌트가 2.7배 축소된다.** 격리된 상태로 컴파일된 컴포넌트는 `next-intl`로 평균 **21.8 KB** (제공자와 메시지 트리에 도달함)이고 어댑터로 **8.1 KB**이다. `next-intl`의 `scoped-static` 설정에서는 모든 라우트의 네임스페이스 파일이 그것을 선택하는 페이지에서 도달할 수 있기 때문에 그 숫자가 _80 KB로 올라간다_.
- **Hydration이 2ms 더 빠릅니다** (12.8 vs 14.7 ms): React가 hydrate되기 전에 RSC payload에서 deserialize할 message object가 없습니다.
- **adapter는 native runtime이 아닙니다.** `next-intlayer`는 **141.3 KB**에 위치하며, base app보다 +0.3 KB이고, 5.5 KB runtime을 가집니다. adapter는 Intlayer의 core 위에 `next-intl` API surface (`useFormatter`, `t.rich`, the ICU resolver)를 제공하므로, 8.0 KB이고 page당 +6 KB입니다. 이것은 bridge이지, destination이 아닙니다.

### TanStack Start (`use-intl`)에서의 결과

`use-intl`은 `next-intl`의 framework-agnostic core입니다. 이의 adapter인 `@intlayer/use-intl`은 Vite plugin (`@intlayer/use-intl/plugin`)과 함께 동일한 design을 따릅니다.

| Setup                    | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)       | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |    **7.3 KB** |         135.8 KB |       49.7% |  **0.0%** |        **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |    **7.3 KB** |     **129.7 KB** |    **0.0%** |  **0.0%** |         **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |        5.0 KB |         125.8 KB |       50.0% |      0.0% |             8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |        5.0 KB |         118.6 KB |        0.0% |      0.0% |             6.3 KB |         3.6 ms |     14.1 ms |

**읽는 방법**

- **페이지당 바이트는 최적화된 `use-intl`과 비슷합니다.** `dynamic` 모드의 `@intlayer/use-intl` (129.7 KB)은 `use-intl`의 `scoped-dynamic` (128.7 KB)과 1 KB 이내 차이가 나며, `use-intl`의 일반 `dynamic` (119.4 KB)보다 10 KB _많습니다_. 그 일반 `dynamic` 행은 여전히 외부 페이지 문자열의 90%가 누출됩니다; 바이트 수가 낮은 이유는 테스트 앱의 콘텐츠가 작기 때문입니다. 어댑터의 0%는 콘텐츠가 증가해도 평탄하게 유지되는 것입니다.
- **컴포넌트가 7-9배 더 작습니다.** `use-intl` 컴포넌트는 모든 전략에서 평균 **76-87 KB**이며, 이는 `useTranslations`가 제공자의 전체 메시지 객체에 바인딩되기 때문입니다. 어댑터는 평균 **9-11 KB**입니다.
- **로케일 전환이 더 빠릅니다.** 최적화된 `use-intl` 설정은 `html[lang]`을 업데이트하는 데 **13-21 ms**가 소요되고, 어댑터는 **4-9 ms**가 소요됩니다. 더 적은 컴포넌트가 다시 렌더링되고, 메시지 트리에서 아무것도 다시 선택되지 않습니다.
- **`static`은 모든 로케일을 유지합니다.** 어댑터의 `static` 행은 49.7%의 로케일 누수를 표시하며, 이는 `static` 모드의 네이티브 Intlayer와 동일합니다. 모든 로케일이 번들로 제공되지만 페이지의 사전만 번들로 제공됩니다. 한 줄의 설정 (`importMode: 'dynamic'`)으로 이를 제거할 수 있습니다.

## 숫자가 변하는 이유

컴포넌트에서 아무것도 변경되지 않았으므로, 이득은 전적으로 `useTranslations`가 바인딩된 대상에서 비롯됩니다.

**`next-intl`을 사용할 때**, 바인딩은 provider입니다. `NextIntlClientProvider`는 locale에 대한 전체 `messages` 객체를 받으며, 모든 `useTranslations("about")`은 이것을 읽습니다. bundler는 하나의 컴포넌트가 하나의 hook을 import하고 하나의 context를 읽는 것을 보지만, 오직 `about` 브랜치만 사용되는지 알 수 없습니다. 아래의 routes는 모두 동일한 message 객체를 공유하므로, page-leak 열은 파일을 직접 분할할 때까지 ~90%를 표시합니다.

```bash
.
├── messages
│   ├── en.json                       # 모든 namespace, 모든 page
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**`@intlayer/next-intl`를 사용하는 경우**, 바인딩은 dictionary입니다. `syncJSON`은 `messages/en.json`을 top-level key당 하나의 dictionary로 변환합니다. 컴파일러는 `useTranslations("about")`을 호출하는 컴포넌트를 식별하고 활성 locale에서 `about`을 직접 제공하며, bundler가 추적하고 분할할 수 있는 import로 전달합니다.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # 변경 없음, 여전히 source of truth
│   └── fr.json
├── .intlayer/                        # 생성됨: namespace당, locale당 하나의 dictionary
└── src
    ├── middleware.ts                 # createMiddleware() 이제 Intlayer의 proxy를 반환합니다
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (messages prop 없음)
        └── about/page.tsx            # useTranslations("about")  ← 변경되지 않음
```

`src/i18n.ts`와 `messages` prop이 사라집니다. 나머지는 모두 동일합니다.

## 3단계로 마이그레이션

<Steps>
<Step number={1} title="설치">

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

이 명령은 `next-intl`을 감지하고 `intlayer`, `next-intlayer`, `@intlayer/next-intl` 및 `@intlayer/sync-json-plugin`을 설치합니다. `next-intl`을 계속 설치된 상태로 유지하세요: 이는 어댑터의 peer dependency이며 타입을 제공합니다.

</Step>
<Step number={2} title="Intlayer를 메시지 위치로 지정">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static"은 모든 locale을 번들로 묶고; "dynamic"은 활성화된 것만 요청 시 로드합니다
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU placeholders: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json`은 현재 위치에 유지됩니다. 각 최상위 키는 dictionary가 되며, `useTranslations("about")`은 `about` dictionary에 매핑됩니다.

</Step>
<Step number={3} title="next.config.ts 래핑">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()`은 `withIntlayer`(콘텐츠 감시, 사전 컴파일, 최적화 패스)와 Webpack 및 Turbopack을 위한 `next-intl` → `@intlayer/next-intl` 별칭을 구성합니다. 빌드하면 위 테이블의 숫자들이 당신의 것이 됩니다.

</Step>
</Steps>

### 나중에 삭제할 수 있는 항목

| 파일 / 패턴                                  | 이유                                                                                     |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/i18n.ts`의 `getRequestConfig`           | 요청별 메시지 로딩 없음. 파일은 `createNavigation` 헬퍼도 내보내는 경우에만 유지하세요   |
| `messages={...}` on `NextIntlClientProvider` | The adapter reads compiled output; the prop is ignored and logs a warning in development |
| `await getMessages()` in layouts             | Same reason                                                                              |
| Per-page `pick(messages, [...])`             | The compiler does the picking, per component                                             |

### 바이트 이상으로 얻을 수 있는 것

- **타입 안전 키.** `useTranslations("about")`는 컴파일된 `about` 딕셔너리에 대해 타입이 지정됩니다. `t("does.not.exist")`는 런타임 폴백이 아닌 TypeScript 에러입니다.
- **`npx intlayer test`**는 locale이 key를 누락하면 CI를 실패시킵니다. **`npx intlayer fill`**은 선택한 provider(OpenAI, Anthropic, Mistral, Gemini...)를 사용하여 누락된 것들을 번역하고, 자신의 key를 사용하여 결과를 `messages/{locale}.json`에 다시 씁니다.
- **Visual Editor와 CMS**는 동일한 dictionaries에서 작동하므로, 개발자가 아닌 사람도 UI를 통해 `messages/fr.json`을 편집할 수 있으며 파일이 업데이트됩니다.
- **`.content.ts`로의 점진적 이동.** 모든 component는 `useTranslations("about")`에서 co-located content 파일과 함께 `useIntlayer("about")`로 전환할 수 있으며, 한 번에 하나씩 가능합니다. JSON과 `.content.ts` dictionaries는 공존하며 병합됩니다.

## 시작하기 전에 알아야 할 제한사항

- **라우팅 설정이 `intlayer.config.ts`로 이동합니다.** `createNavigation(routing)`과 `createMiddleware(routing)`은 시그니처를 유지하지만 인수는 무시합니다: locale, 기본 locale, prefix 전략은 Intlayer의 `routing` 설정에서 가져옵니다. `next-intl`의 로컬라이제이션된 `pathnames`(`/about` → `/a-propos`)을 사용하는 경우, 어댑터는 이를 보간하지 않습니다; Intlayer의 `routing.rewrite`가 해당 경우를 다루지만 별도의 변경입니다.
- **Namespace 없는 `useTranslations()`은 바인드되지 않습니다.** 최적화 패스는 어떤 dictionary를 import할지 알기 위해 정적 namespace가 필요합니다. 베어 호출은 여전히 작동하지만, 모든 dictionary를 참조하는 runtime registry를 통해 작동하며, 이는 정확히 제거하려고 했던 누수입니다. namespace를 전달하세요.
- **어댑터는 무료가 아닙니다.** 8.0 KB의 런타임 대 `next-intlayer`의 5.5 KB, 그리고 네이티브 빌드에 비해 페이지당 +6-7 KB입니다. 이는 `next-intl` API 표면의 비용입니다. 모든 컴포넌트가 `useIntlayer`로 이동된 지점에 도달하면 어댑터를 제거하세요.
- **공급자의 `messages`, `timeZone`, `now`는 무시됩니다.** 포매터는 네이티브 `Intl`로 지원되며 로케일만이 출력에 영향을 미칩니다. 강제 타임존 또는 하이드레이션 안정적인 날짜를 위한 고정된 `now`에 의존하는 경우 호출 사이트에서 처리하세요.

## 어느 것을 언제 사용할까요?

- **`next-intl`에 머물러야 합니다** 앱이 작고, 번들이 걱정사항이 아니며, 팀이 네임스페이스와 페이지당 `pick()`을 관리하는 데 능숙한 경우입니다.
- **`@intlayer/next-intl`를 사용하세요.** 현재 `next-intl`을 사용 중이며 번들 크기, 누수 및 하이드레이션 개선, 타입 안전 키, CLI/CMS 도구를 원하지만 전체 재작성은 피하고 싶다면 이를 사용하세요. 이것은 기존의 모든 `next-intl` codebase를 위한 권장되는 진입점입니다.
- **네이티브 (`next-intlayer`)로 이동하세요.** 새로운 프로젝트에서, 또는 adapter가 역할을 다한 후에 이동하세요. 이는 세 가지 중 가장 가벼운 옵션입니다 (5.5 KB, 페이지당 +0.3 KB) 그리고 동기식 서버 컴포넌트, 컴포넌트별 `.content.ts` 파일 및 전체 기능 세트를 활용할 수 있습니다.

## 관련 비교

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (라이브러리, 동일한 벤치마크)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (동일한 adapter 시리즈)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (동일 어댑터 시리즈)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/blog/vue-i18n-vs-intlayer-vue-i18n) (동일 어댑터 시리즈)
- [마이그레이션 가이드: next-intl to Intlayer](https://intlayer.org/doc/migration/next-intl)
- [호환성 어댑터 레퍼런스: next-intl](https://intlayer.org/doc/compatibility/next-intl)

## 결론

`@intlayer/next-intl`은 한 가지를 수행합니다: `useTranslations`이 바인딩되는 대상을 모든 메시지를 보유한 provider에서 해당 컴포넌트를 위해 컴파일된 dictionary로 변경합니다. **페이지당 6 KB**의 크기로 **2.7배 더 작은 컴포넌트**, **0% 누수**, 그리고 누구든 컴포넌트 파일을 열기 전에 **2ms의 hydration**을 제공하는 동일한 Next.js 앱에서 말입니다. Navigation과 middleware는 Intlayer의 routing config 위에 API를 유지하며, native `next-intlayer` runtime은 여전히 더 가볍습니다.

모든 raw data, test app 및 script는 [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom)에 있습니다. 직접 실행해보세요.

자세한 내용은 ['Why Intlayer?' doc](https://intlayer.org/doc/why)을 참조하세요.
