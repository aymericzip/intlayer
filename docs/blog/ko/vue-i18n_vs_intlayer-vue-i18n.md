---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "vue-i18n vs @intlayer/vue-i18n: 동일한 API, 다른 Bundle"
description: Vue 3 앱이 vue-i18n 호출을 유지하면서 @intlayer/vue-i18n compat adapter를 통해 제공할 때 어떤 변화가 발생하는지 알아봅니다. 동일한 Vite + Vue 코드에서 페이지별 JavaScript, runtime 크기, 컴포넌트 크기 및 누수를 측정하고, adapter가 유지하는 것, 무시하는 것, 그리고 대체할 수 없는 것을 비교합니다.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n VS @intlayer/vue-i18n | 동일한 API, 다른 Bundle

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

`@intlayer/vue-i18n`은 compat 어댑터입니다: `vue-i18n` API (`createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...)를 노출하고 Intlayer에 의해 컴파일된 딕셔너리에서 제공합니다. 당신의 `.vue` 파일은 변경되지 않습니다. `t("footer.github")`가 바인딩되는 대상만 변경됩니다.

이 문서는 동일한 Vite + Vue 3 애플리케이션에서 `vue-i18n`으로 빌드한 경우와 어댑터로 빌드한 경우의 성능 변화를 측정합니다. 수치는 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)에서 나왔습니다. `vue-i18n`과 Intlayer를 라이브러리로 비교하려면 [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer)와 [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark)를 읽으세요. 이 문서는 컴포넌트를 그대로 유지했을 때 어댑터가 어떤 변화를 가져오는지에 관한 것입니다.

<TOC/>

> **tl;dr**: 동일한 Vite + Vue 3 앱에서 `vue-i18n`을 `@intlayer/vue-i18n`으로 교체하면 페이지당 JavaScript가 **134.9 KB에서 47.0 KB** gzip으로 감소했습니다 (i18n 없는 앱의 무게는 41.3 KB), 런타임은 **24.3 KB에서 7.9 KB**, 평균 컴포넌트는 **196 KB에서 8.4 KB**, 외부 페이지 문자열 누수는 **90%에서 0%**로 감소했습니다. 단 하나의 `.vue` 파일도 수정하지 않았습니다. `createI18n({ messages })`는 폴백으로 계속 작동합니다. JSON imports를 제거하면 위의 숫자를 얻을 수 있습니다. SFC `<i18n>` 블록과 런타임 `setLocaleMessage()`는 이월되지 않는 두 가지 기능입니다.

## `@intlayer/vue-i18n`이란 무엇인가

`vue-i18n`는 런타임입니다. `createI18n({ messages: { en, fr, ... } })`는 모든 로케일의 모든 메시지를 보유하는 글로벌 인스턴스를 빌드합니다. `useI18n()`은 각 컴포넌트를 이에 바인딩하고, `t("footer.github")`는 렌더 시간에 트리를 순회합니다. 이 디자인은 SFC `<i18n>` 블록과 `setLocaleMessage()`를 가능하게 하는 것이며, 모든 컴포넌트의 의존성 그래프가 전체 트리를 포함하는 이유이기도 합니다.

`@intlayer/vue-i18n`는 API를 유지하고 트리를 대체합니다:

1. **Import aliasing.** `@intlayer/vue-i18n/plugin`의 `vueI18nVitePlugin()`은 `vite-intlayer`를 래핑하고 `vue-i18n`이 `@intlayer/vue-i18n`으로 해석되도록 하는 `resolve.alias`를 추가합니다. import는 이름이 바뀌지 않습니다.
2. **JSON as source of truth.** `syncJSON` plugin는 기존 `locales/{locale}.json`을 `format: "vue-i18n"`으로 읽으며 (`{name}`, `{0}` list interpolation과 `"car | cars"` pipe plurals이 올바르게 파싱됨), CLI 또는 CMS가 이들을 업데이트할 때 번역을 다시 작성합니다.
3. **Call-site binding.** Intlayer optimize pass는 `useI18n()` call sites를 다시 작성하여 component가 활성 locale에서 키 이름의 dictionaries를 받고, bundler가 추적하고 분할할 수 있는 imports를 받습니다.

```vue fileName="src/components/Footer.vue"
<!-- Your code, unchanged -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="컴파일러가 생성하는 것 (간소화됨)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

컴포넌트가 더 이상 전역 메시지 트리에 접근하지 않습니다. `footer`에만 접근합니다. 이것이 아래 component-size 열이 196 KB에서 8 KB로 떨어지는 이유입니다.

## 어댑터가 유지하는 것, 무시하는 것, 그리고 대체하지 않는 것

| `vue-i18n` API                                                      | `@intlayer/vue-i18n`을 사용할 때                                                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ 유지됨. `t` 키는 당신의 딕셔너리에 대해 타입이 지정됨                                                                 |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ 유지됨. `{name}`, `{0}` 및 파이프로 구분된 복수형은 이전과 같이 해결됨                                                |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ 유지됨. `createI18n()`의 `datetimeFormats` / `numberFormats`은 준수되며, 기본 `Intl`로 지원됨                         |
| `i18n.global.locale.value = "fr"`                                   | ✅ 유지됨. Intlayer의 클라이언트에서 지원하는 `WritableComputedRef`이며, 반응성은 이전과 동일하게 동작함                 |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ 유지됨. `app.use(i18n)`에 의해 `app.config.globalProperties`에 등록됨                                                 |
| `v-t` directive                                                     | ✅ 유지됨                                                                                                                |
| `legacy: true`                                                      | ✅ 허용됨                                                                                                                |
| `createI18n({ messages })`                                          | ⚠️ `messages`는 **runtime fallback**으로 사용되며 개발 경고가 표시됩니다. 번들 크기 감소를 위해 JSON import를 제거하세요 |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ 경고 표시 후 작동하지 않음. Runtime message 로딩은 build-time dictionaries로 대체됩니다                               |
| SFC `<i18n>` custom blocks                                          | ❌ 읽지 않음. 이 메시지들을 locale JSON으로 이동하거나 component 옆의 `.content.ts`로 옮기세요                           |
| `@nuxtjs/i18n`                                                      | ⚠️ 별도의 adapter, [Nuxt compat doc](https://intlayer.org/doc/compatibility/nuxtjs-i18n)을 참조하세요                    |

## 벤치마크

### 측정 항목

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 스위트는 각 설정으로 **동일한 Vite + Vue 3 애플리케이션**을 빌드합니다: **10개 페이지** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10개 로케일** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트와 동일한 콘텐츠. 페이지는 `en` 및 `fr`로 측정됩니다.

둘 다 **static** 구성으로 빌드되었습니다. 대부분의 Vue 프로젝트가 배포하는 구성입니다: `vue-i18n`의 경우, 모든 로케일의 JSON이 import되어 `createI18n({ messages })`로 전달됩니다; 어댑터의 경우, `vite.config.ts` 및 `intlayer.config.ts`가 변경되고 `messages` import가 제거된 동일한 컴포넌트입니다. 참고용으로 native `vue-intlayer`가 포함되어 있습니다.

각 빌드에 대해 스위트는 다음을 기록합니다:

- **Lib size**: i18n 라이브러리만 import하는 빈 컴포넌트의 gzip (및 minified) 크기.
- **Page JS**: 모든 페이지와 로케일에 걸쳐 평균화된 페이지당 다운로드되는 gzip JavaScript 크기.
- **Locale leak %**: 사용자가 **보고 있지 않은** 로케일에 속하는 다운로드된 JS의 번역된 문자열 비율.
- **Page leak %**: 사용자가 **있지 않은** 페이지에 속하는 다운로드된 JS의 번역된 문자열 비율.
- **Component avg**: 격리된 상태로 컴파일된 각 컴포넌트의 평균 gzip 크기.
- **E2E reactivity**: 새로운 로케일을 선택한 후 `html[lang]`이 DOM에서 업데이트될 때까지의 실제 소요 시간 (Playwright, 5회 반복).
- **Page load**: `PerformanceNavigationTiming.duration`.

> 아래 숫자들은 **2026-09-12** 실행 날짜의 `vue-i18n` 11.4.0과 `@intlayer/vue-i18n` 9.5.1을 사용한 결과입니다. 테스트 애플리케이션은 의도적으로 작은 규모(로케일당 수십 개의 문자열)이므로, leakage 백분율은 **패턴**을 설명합니다: 콘텐츠가 증가하면서 leakage는 증가하지만 런타임 비용은 고정된 상태로 유지됩니다.

### Vite + Vue 3 결과

관심 있는 메트릭과 라이브러리를 선택하세요:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                    | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |  Page load |
| ------------------------ | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ---------: |
| **base** (i18n 없음)     | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |    **7.9 KB** |    **23.2 KB** |      **47.0 KB** |   **15.0%** |  **0.0%** |         **8.4 KB** |     **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |        3.9 KB |        11.1 KB |          57.1 KB |       56.8% |      0.0% |             7.7 KB |         4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |        3.9 KB |        11.1 KB |          59.8 KB |       50.0% |      0.0% |             6.5 KB |         4.0 ms |    15.8 ms |

> base app의 page-leak 열은 공백으로 남겨집니다: i18n 라이브러리가 없으면 fingerprinting이 shared chunks의 하드코딩된 문자열을 선택하고 숫자는 의미가 없습니다.

**읽는 방법**

- **페이지당 88 KB 절감, 동일한 components.** `vue-i18n`은 41.3 KB app을 **134.9 KB**로 가져갑니다. 동일한 components의 adapter 빌드는 **47.0 KB**에 도달하며, base app보다 5.7 KB 초과합니다. 차이의 대부분은 `createI18n({ messages })`가 모든 페이지로 끌어오는 74.9 KB의 `src/locales`이고 adapter는 절대 블록으로 번들하지 않습니다.
- **런타임이 3배 축소됩니다.** `vue-i18n`만 import하는 빈 component의 비용은 **24.3 KB gzip / 83.2 KB minified**입니다: `@intlify/core-base`, message compiler 및 runtime. Adapter의 비용은 **7.9 KB / 23.2 KB**이며, 대부분 Intlayer의 core와 `vue-i18n` API surface입니다.
- **Components: 23배 더 작습니다.** 격리 상태로 컴파일된 `useI18n()` component의 평균 크기는 **196 KB**입니다. 왜냐하면 `t`는 모든 locale의 모든 message를 보유하는 instance에 바인딩되기 때문입니다. Adapter를 사용하면 동일한 component의 평균 크기는 **8.4 KB**입니다: 자신의 dictionary에 도달합니다.
- **누수(Leakage).** `vue-i18n`은 모든 로캘과 모든 페이지의 문자열을 모든 페이지에 제공합니다: 50% 로캘 누수 (두 개의 fingerprinted 로캘에서; 10개의 로캘이 번들된 경우 실제 낭비는 더 높음), 90% 페이지 누수. 어댑터는 각 컴포넌트가 자신의 딕셔너리만 import하기 때문에 페이지 누수를 **0%**로 줄입니다. 이 `static` 실행에서 로캘 누수는 15%입니다; `importMode: 'dynamic'`은 이를 제거하는 설정이며, 이 Vue 실행에는 해당 설정이 포함되지 않았습니다.
- **반응성 및 페이지 로드.** 로캘 전환은 두 경우 모두 저렴합니다 (1.5-2.8 ms); 메시지가 메모리에 있으면 Vue의 반응성 시스템이 이를 가능하게 합니다. 페이지 로드는 13.6 ms에서 **9.3 ms**로 단축되며, 이는 파싱할 JavaScript가 88 KB 줄어든 것과 일치합니다.
- **네이티브 행에 대해.** `vue-intlayer`는 이 실행에서 `static` 모드에서 모든 로케일을 번들링했으며 3.9 KB 런타임과 함께 57.1 KB에 도달했습니다. 어댑터의 동기화된 딕셔너리는 더 적은 외국 로케일 문자열을 포함했으므로 페이지당 수치가 더 낮습니다. 네이티브 런타임은 세 개 중 가장 가볍게 유지되며, 해당 `.content.ts` 모델은 SFC `<i18n>` 블록이 동등한 것을 찾는 곳입니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> 모든 라이브러리와 전략이 포함된 전체 표는 [Vue 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark/vue)에서 확인하세요.

## 숫자가 움직이는 이유

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

`src/components/`의 아무것도 변경되지 않았으므로 이득은 `useI18n`이 바인딩된 대상에서 나옵니다.

**`vue-i18n`을 사용할 때**, 바인딩은 글로벌 인스턴스입니다. `createI18n({ messages: { en, fr, ... } })`은 모든 것을 포함하는 하나의 import이고, `useI18n()`을 호출하는 모든 컴포넌트가 모든 콘텐츠에 접근할 수 있으므로 번들러는 인스턴스 아래로 분할할 수 없습니다. 최적화는 _직접_ `en.json`을 라우트별로 분할하고, 라우터 가드에서 `setLocaleMessage()`를 호출하며, 컴포넌트가 이동할 때 라우트-파일 매핑을 올바르게 유지하는 것을 의미합니다. 낭비는 페이지와 로케일이라는 두 축에서 동시에 증가합니다:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # 모든 페이지의 문자열
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**`@intlayer/vue-i18n`을 사용할 때**, 바인딩은 dictionary입니다. `syncJSON`은 `en.json`의 각 top-level 키를 dictionary로 변환합니다. optimize pass는 component에 해당 키의 항목들을 제공하고, bundler가 추적하여 페이지별로 split합니다.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                     # generated: one dictionary per top-level key, per locale
└── src
    ├── i18n.ts                    # createI18n({})   ← messages import 제거됨
    ├── main.ts                    # app.use(i18n)    ← unchanged
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← unchanged
```

`i18n.ts`의 `messages` import는 삭제해야 할 한 줄입니다. 이것이 88 KB입니다.

## 세 단계로 마이그레이션

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

명령어는 `vue-i18n`을 감지하고, `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` 및 `@intlayer/sync-json-plugin`을 설치하며, `intlayer.config.ts`를 미리 채웁니다. `vue-i18n`을 설치된 상태로 유지하세요: 이는 peer dependency이며 타입을 제공합니다.

</Step>
<Step number={2} title="Intlayer를 locale 파일로 지정">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static"은 모든 로케일을 번들링합니다; "dynamic"은 활성 로케일을 필요에 따라 로드합니다
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // vue-i18n 방언: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

`locales/{locale}.json`은 원래 위치에 유지됩니다. 각 최상위 키(`footer`, `hero`...)는 dictionary가 됩니다.

</Step>
<Step number={3} title="플러그인 추가 및 메시지 import 제거">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// Before: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()`은 `vite-intlayer`를 감싸고 (콘텐츠 감시, dictionary 컴파일, optimize pass) `vue-i18n`을 adapter로 aliasing합니다. `messages` import를 제거하는 것이 88 KB를 줄일 수 있습니다; 남겨두면 앱이 계속 작동하지만 둘 다 배포됩니다.

</Step>
</Steps>

### 나중에 삭제할 수 있는 것

| 파일 / 패턴                                       | 이유                                                             |
| ------------------------------------------------- | ---------------------------------------------------------------- |
| `import en from "./locales/en.json"` 및 유사 항목 | adapter의 fallback으로만 사용됨. 88 KB가 여기에 있었음           |
| 라우터 가드의 `setLocaleMessage()`                | No-op. 라우트별 로딩은 이제 compiler의 역할임                    |
| `@intlify/unplugin-vue-i18n`                      | 필요 없음: 메시지를 미리 컴파일하고 adapter가 읽지 않는 SFC 블록 |
| SFC `<i18n>` 블록                                 | 읽지 않음; locale JSON 또는 컴포넌트당 `.content.ts`로 이동      |

### 바이트 절감 외에 얻을 수 있는 것

- **타입화된 키.** `t("footer.github")`는 컴파일된 `footer` 딕셔너리에 대해 타입이 지정되며, 잘못된 경로는 키가 텍스트로 렌더링되는 대신 TypeScript 오류가 됩니다.
- **`npx intlayer test`** 는 모든 locale에서 누락된 키가 있으면 CI를 실패시킵니다. **`npx intlayer fill`** 은 자신의 provider 키(OpenAI, Anthropic, Mistral, Gemini...)로 누락된 키를 번역하고 `locales/{locale}.json`에 다시 작성합니다.
- **Visual Editor 및 CMS** 는 동일한 JSON에서 작동하므로 개발자가 아닌 사람은 UI를 통해 편집하고 파일이 업데이트됩니다.
- **`.content.ts`로의 점진적 이동.** 모든 컴포넌트는 `useI18n()`에서 `useIntlayer("footer")`로 전환할 수 있으며, 함께 배치된 콘텐츠 파일을 사용합니다. JSON 및 `.content.ts` 딕셔너리는 공존하며 병합됩니다.

## 시작하기 전에 알아야 할 제한사항

<AccordionGroup>
<Accordion header="SFC <i18n> 블록은 읽히지 않음">

메시지가 컴포넌트 내부에 있는 경우 로케일 파일이나 생성된 타입을 갖춘 동일한 개념의 `.content.ts`로 이동해야 합니다.

</Accordion>
<Accordion header="런타임 메시지 로딩 제거됨">

`setLocaleMessage()` 및 `mergeLocaleMessage()`는 경고를 표시하고 반환합니다. 런타임에 CMS에서 가져오는 번역은 [Intlayer CMS](https://intlayer.org/ko/doc/concept/cms) 또는 `intlayer pull` / `push` 명령어가 필요합니다.

</Accordion>
<Accordion header="messages는 폴백일 뿐, 무료가 아님">

`createI18n()`에서 JSON 임포트를 유지하면 번들에 75 KB가 그대로 남습니다. `intlayer test`가 통과되면 삭제하세요.

</Accordion>
<Accordion header="어댑터는 네이티브 런타임이 아님">

`vue-intlayer`의 3.9 KB에 비해 어댑터는 7.9 KB입니다. 모든 컴포넌트가 `useIntlayer`로 전환되면 제거하세요.

</Accordion>
</AccordionGroup>

## 어떤 것을 언제 사용할까요?

<AccordionGroup>
<Accordion header="vue-i18n 유지">

애플리케이션이 SFC `<i18n>` 블록이나 런타임 `setLocaleMessage()` 흐름에 의존하거나, 페이지당 90 KB가 사용자층에 문제가 되지 않는 경우.

</Accordion>
<Accordion header="@intlayer/vue-i18n 사용">

`vue-i18n`을 사용 중이며 `.vue` 파일을 수정하지 않고 88 KB 절감, 23배 더 작은 컴포넌트, 0% 페이지 누수, 타입 정의된 키 및 CI 검사를 원하는 경우. 기존 `vue-i18n` 코드베이스의 진입점입니다.

</Accordion>
<Accordion header="네이티브로 전환 (vue-intlayer)">

새 프로젝트이거나 어댑터가 역할을 다한 경우 적합합니다. 가장 가벼운 런타임(3.9 KB)과 `<i18n>` 블록을 타입이 지정된 콘텐츠로 대체하는 컴포넌트별 `.content.ts` 모델을 제공합니다. [Vue와 함께 사용하는 Intlayer](https://intlayer.org/ko/doc/environment/vite-and-vue) 또는 [Nuxt와 함께](https://intlayer.org/ko/doc/environment/nuxt-and-vue) 시작하세요.

</Accordion>
</AccordionGroup>

## 자주 묻는 질문

<FAQ>

<Question title=".vue 파일을 수정해야 하나요?">

아닙니다. 벤치마크 빌드는 `vite.config.ts`, `intlayer.config.ts` 및 `src/i18n.ts`의 `messages` 임포트 한 줄만 수정했습니다. 모든 `useI18n()`, `$t`, `v-t` 및 Options API 호출 부분은 그대로 유지되었습니다.

</Question>

<Question title="왜 컴포넌트 크기가 23배나 더 작나요?">

`useI18n()`이 전역 인스턴스 접근을 중단하기 때문입니다. `createI18n({ messages })`는 모든 로케일의 모든 메시지를 보유하므로 독립적으로 컴파일된 컴포넌트라도 196 KB를 끌어옵니다. 어댑터를 사용하면 고유한 사전에만 접근합니다: 8.4 KB.

</Question>

<Question title="d() 및 n() 포맷팅은 어떻게 되나요?">

유지됩니다. `createI18n()`에 전달된 `datetimeFormats` 및 `numberFormats`가 적용되며 네이티브 `Intl` API가 지원합니다. [날짜, 시간 및 숫자 형식 지정](https://intlayer.org/ko/blog/date-time-number-formatting-locales)을 참조하세요.

</Question>

<Question title="Nuxt에서도 작동하나요?">

`@intlayer/vue-i18n`은 Vite + Vue를 대상으로 합니다. `@nuxtjs/i18n`의 경우 [Nuxt i18n 호환 어댑터](https://intlayer.org/ko/doc/compatibility/nuxtjs-i18n)를 사용하고, 네이티브 설정은 [Nuxt와 함께 사용하는 Intlayer](https://intlayer.org/ko/doc/environment/nuxt-and-vue)를 확인하세요.

</Question>

<Question title="컴포넌트 단위로 점진적 마이그레이션이 가능한가요?">

네. 모든 컴포넌트는 함께 배치된 콘텐츠 파일을 통해 `useI18n()`에서 `useIntlayer("footer")`로 전환할 수 있습니다. JSON과 `.content.ts` 사전은 공존하며 병합됩니다.

</Question>

</FAQ>

## 관련 비교

동일한 어댑터 시리즈:

- [next-intl vs @intlayer/next-intl](https://intlayer.org/ko/blog/next-intl-vs-intlayer-next-intl)
- [i18next vs @intlayer/i18next](https://intlayer.org/ko/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/ko/blog/lingui-vs-intlayer-lingui)

직접 비교된 라이브러리:

- [vue-i18n vs Intlayer](https://intlayer.org/ko/blog/vue-i18n-vs-intlayer), features and DX
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ko/blog/vue-i18n-vs-intlayer-benchmark)
- [Is vue-i18n outdated?](https://intlayer.org/ko/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/ko/blog/how-to-pick-vue-i18n-library)

참조 문서:

- [Compat adapter: vue-i18n](https://intlayer.org/ko/doc/compatibility/vue-i18n) and [Nuxt i18n](https://intlayer.org/ko/doc/compatibility/nuxtjs-i18n)
- [마이그레이션 가이드: vue-i18n에서 Intlayer로](https://intlayer.org/ko/doc/migration/vue-i18n)
- [Vue 벤치마크 보고서](https://intlayer.org/ko/doc/benchmark/vue)
- [번들 최적화](https://intlayer.org/ko/doc/concept/bundle-optimization) 및 [Intlayer 컴파일러](https://intlayer.org/ko/doc/compiler)
- [비주얼 에디터](https://intlayer.org/ko/doc/concept/editor), [CMS](https://intlayer.org/ko/doc/concept/cms) 및 [AI 번역](https://intlayer.org/ko/doc/concept/auto-fill)

## 결론

`@intlayer/vue-i18n`은 `useI18n()`이 바인딩되는 대상을 변경합니다: 모든 locale의 모든 message를 보유하는 global instance에서 해당 component를 위해 컴파일된 dictionary로. 동일한 Vite + Vue 3 app에서 **page당 88 KB 감소**, **3배 작은 runtime**, **23배 작은 components** 및 **0% page leakage**를 달성할 수 있으며, config 파일 하나, plugin line 하나, 그리고 삭제된 import 하나만 필요합니다. SFC `<i18n>` blocks과 runtime message loading은 지원하지 않는 두 가지이며, native `vue-intlayer` runtime은 여전히 그 절반 크기입니다.

모든 원본 데이터, 테스트 앱 및 스크립트는 [Benchmark Bloom 저장소](https://github.com/intlayer-org/benchmark-bloom)에 있습니다. 직접 실행해보세요.

자세한 내용은 ['Intlayer를 선택해야 하는 이유?' 문서](https://intlayer.org/ko/doc/why)를 참조하세요.
