---
createdAt: 2026-09-13
updatedAt: 2026-09-13
priority: 8
title: "vue-i18n vs Intlayer: 2026 벤치마크"
description: 동일한 Vite + Vue 3 앱에서 측정한 vue-i18n과 Intlayer. 라이브러리 크기, 페이지별 JavaScript, 콘텐츠 누수, 컴포넌트 크기 및 로케일 전환 반응성, 숫자 설명 포함.
keywords:
  - vue-i18n
  - Intlayer
  - 국제화
  - i18n
  - 벤치마크
  - 번들 크기
  - 블로그
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n vs Intlayer | Vue 국제화 (i18n) 벤치마크

`vue-i18n`은 Vue를 위한 참조 i18n 라이브러리입니다. Intlayer는 컴파일러 기반의 컴포넌트 범위 대안으로 Vue 통합(`vue-intlayer`)을 제공합니다. 우리는 이미 그들의 [기능과 개발자 경험](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer.md)을 비교했습니다. 이 글은 앱이 빌드된 후 각각에 소요되는 비용을 살펴봅니다.

데이터는 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)에서 나왔으며, 이는 각 라이브러리로 동일한 애플리케이션을 빌드하고 브라우저가 실제로 다운로드하고 실행하는 것을 기록하는 오픈소스 제품군입니다.

<TOC/>

> **tl;dr**: 동일한 Vite + Vue 3 앱에서 `vue-i18n`은 페이지당 **134.9 KB**의 gzipped JavaScript를 전달하는 반면, i18n이 없는 앱은 **41.3 KB**입니다. Intlayer는 **57.1 KB**를 전달합니다. `vue-i18n` runtime만 해도 **24.3 KB gzip**의 무게를 가지며 (Intlayer의 3.9 KB의 6배), 모든 페이지는 **외국어 페이지 문자열의 90%**를 포함하고, 격리되어 컴파일된 component는 전역 message tree에 바인딩되어 있어 **196 KB**를 끌어옵니다. `@intlayer/vue-i18n` adapter는 `vue-i18n` API를 유지하면서 페이지당 **47.0 KB**를 기록했습니다.

## 요약

- **vue-i18n** - Vue 2 / Vue 3를 위한 사실상의 i18n 라이브러리이며 `@nuxtjs/i18n`의 핵심입니다. ICU 스타일 메시지, SFC `<i18n>` 블록, `v-t` 지시문, `d()` / `n()` 포매터, 광범위한 생태계를 지원합니다. 메시지는 `createI18n()`에서 전역 인스턴스로 등록되며, 로케일당 lazy loading은 수동 `setLocaleMessage()` 패턴이고, 라우트당 분할은 직접 구축해야 합니다.
- **Intlayer** - 컴포넌트 중심 콘텐츠 모델입니다. `.content.ts` 딕셔너리는 이들이 제공하는 컴포넌트 옆에 위치하며, 빌드 타임 컴파일러(`vite-intlayer`)가 이들을 tree-shake하고 컴포넌트 및 로케일별로 lazy-load합니다. 콘텐츠에서 생성된 엄격한 TypeScript 타입이 있으며, 누락된 번역은 빌드 타임에 실패합니다. router / SEO 헬퍼, Visual Editor / CMS, AI 지원 번역을 함께 제공합니다.

| 라이브러리            | GitHub Stars                                                                                                                                                                   | Total Commits                                                                                                                                                                      | Last Commit                                                                                                                                         | First Version | NPM Version                                                                                                 | NPM Downloads                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024년 4월    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | Dec 2016      | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> 배지는 자동으로 업데이트됩니다. 스냅샷은 시간이 지남에 따라 달라질 수 있습니다.

## 기능 비교

| 기능                                          | `vue-intlayer` (Intlayer)                          | `vue-i18n`                                                                  |
| --------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| **컴포넌트 근처의 번역**                      | ✅ 예, 각 컴포넌트와 함께 배치된 `.content.ts`     | ✅ SFC `<i18n>` 블록을 통해 (선택적); 글로벌 카탈로그가 일반적인 설정입니다 |
| **TypeScript 통합**                           | ✅ 콘텐츠에서 자동 생성된 엄격한 타입              | ✅ 좋은 타입; 엄격한 키 안전성은 스키마 타입과 규율 필요                    |
| **누락된 번역 감지**                          | ✅ TypeScript 에러 + 빌드 타임 에러/경고           | ⚠️ 런타임 폴백 + 콘솔 경고                                                  |
| **풍부한 콘텐츠 (컴포넌트 / Markdown)**       | ✅ 직접 지원                                       | ⚠️ `<i18n-t>` 컴포넌트 보간; Markdown은 외부 플러그인으로 지원              |
| **ICU 지원**                                  | ⚠️ WIP                                             | ✅ Yes                                                                      |
| **포맷팅 (날짜, 숫자, 통화)**                 | ✅ Intl 기반 포매터                                | ✅ `d()` / `n()` with `datetimeFormats` / `numberFormats`                   |
| **지역화된 라우팅**                           | ✅ Vue Router / Nuxt용 헬퍼, `getMultilingualUrls` | ⚠️ 핵심이 아님 (`@nuxtjs/i18n` 또는 커스텀 라우터 설정)                     |
| **SEO 헬퍼 (hreflang, sitemap, robots)**      | ✅ 내장 헬퍼                                       | ❌ 핵심이 아님                                                              |
| **트리 셰이킹 (사용된 콘텐츠만 번들에 포함)** | ✅ 컴포넌트별, 로캘별, 컴파일러에 의해 자동화됨    | ⚠️ 수동: 카탈로그 분할, 라우트당 `setLocaleMessage()`                       |
| **Lazy loading**                              | ✅ `importMode: 'dynamic'` (한 줄의 설정)          | ✅ 수동 `import()` + `setLocaleMessage()`                                   |
| **Purge unused content**                      | ✅ Dead dictionaries가 빌드 시간에 dropped됨       | ❌ Built-in이 아님                                                          |
| **Testing missing translations (CLI / CI)**   | ✅ `npx intlayer content test`                     | ⚠️ Third-party (`vue-i18n-extract`)                                         |
| **AI-powered translation**                    | ✅ Built-in, 자신의 provider keys를 사용합니다     | ❌ No                                                                       |
| **Visual Editor / CMS**                       | ✅ 무료 Visual Editor + 선택 사항 CMS              | ❌ No (외부 현지화 플랫폼)                                                  |
| **MCP server & Agent Skills**                 | ✅ Yes                                             | ❌ No                                                                       |
| **Ecosystem / community**                     | ⚠️ 작지만 빠르게 성장 중                           | ✅ Vue ecosystem에서 크고 성숙함                                            |

## 벤치마크

### 측정된 항목

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 제품군은 각 라이브러리로 **동일한 Vite + Vue 3 애플리케이션**을 빌드합니다: **10개 페이지** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10개 로케일** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트 및 동일한 콘텐츠. 페이지는 `en`과 `fr`에서 측정됩니다.

두 라이브러리 모두 **static** 구성으로 테스트되었습니다. 대부분의 Vue 프로젝트가 배포하는 구성입니다: `vue-i18n`의 경우, 모든 로케일의 JSON을 import하여 `createI18n({ messages })`로 전달; Intlayer의 경우, 기본 `importMode: 'static'`. 이 모드에서 Intlayer는 모든 로케일을 번들에 포함하지만, 컴파일러는 여전히 콘텐츠를 **컴포넌트당** 범위로 제한하므로, 페이지는 렌더링하는 컴포넌트의 사전만 전달합니다.

각 빌드에 대해 suite는 다음을 기록합니다:

- **Lib size**: i18n 라이브러리만 import하는 빈 component의 gzip 크기. runtime의 고정 비용입니다.
- **Page JS**: 모든 page와 locale에 걸쳐 평균화된 page당 다운로드되는 gzip JavaScript입니다.
- **Locale leak %**: 다운로드된 JS에서 발견된 번역된 문자열 중 사용자가 **보고 있지 않은** locale에 속하는 비율입니다 (`en`과 `fr`에서 fingerprint되므로, 50%는 "측정된 다른 locale이 완전히 존재한다"는 의미; 10개 locale이 번들되면, 실제 낭비는 더 높습니다).
- **Page leak %**: 다운로드된 JS에서 발견된 번역된 문자열 중 사용자가 **접근하지 않은** page에 속하는 비율입니다.
- **Component avg**: 각 component가 독립적으로 컴파일된 평균 gzip 크기입니다. 단일 component가 끌어당기는 i18n runtime과 catalog의 양을 보여줍니다.
- **E2E reactivity**: 새 locale을 선택한 후 DOM에서 `html[lang]`이 업데이트될 때까지의 벽시계 시간 (Playwright, 5회 반복).
- **Page load**: `PerformanceNavigationTiming.duration`.

> 아래 숫자는 **2026-09-12** 실행 데이터로 `vue-i18n` 11.4.0 및 `intlayer` 9.5.0 / 9.5.1을 사용합니다. 테스트 애플리케이션은 의도적으로 작습니다 (locale당 몇십 개의 문자열), 따라서 누출 백분율은 **패턴**을 나타냅니다: 콘텐츠가 증가하면 누출도 증가하지만 runtime 비용은 일정하게 유지됩니다.

### Vite + Vue 3에서의 결과

| Library                       | Strategy | Lib size (gz) | Lib size (min) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Page load |
| ----------------------------- | -------- | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (i18n 없음)          | -        |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |         1.8 ms |   10.8 ms |
| `vue-i18n`                    | static   |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |         2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static   |    **3.9 KB** |    **11.1 KB** |      **57.1 KB** |       56.8% |  **0.0%** |         **7.7 KB** |     **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static   |        7.9 KB |        23.2 KB |          47.0 KB |       15.0% |      0.0% |             8.4 KB |         1.5 ms |    9.3 ms |

> 기본 앱의 page-leak 열은 비워두었습니다: i18n 라이브러리가 없으면 fingerprinting이 공유 청크의 하드코딩된 문자열을 선택하고 그 숫자는 의미가 없습니다.

**읽는 방법**

- **런타임 비용.** `vue-i18n`은 전체 벤치마크에서 가장 무거운 런타임 중 하나입니다: 이를 임포트하는 빈 컴포넌트의 경우 **gzip 24.3 KB / minified 83.2 KB**입니다. `vue-intlayer`는 3.9 KB gzip으로 비용이 듭니다. 이 격차는 당신이 가진 문자열의 수에 관계없이 모든 페이지에서 지불됩니다.
- **페이지당 JavaScript.** i18n이 없는 앱의 무게는 41.3 KB입니다. `vue-i18n`은 이를 3배 이상 늘려 **134.9 KB**가 되고, Intlayer는 **57.1 KB**로 +15.8 KB입니다. 대부분은 번들된 10개의 로케일입니다 (다음 포인트 참조).
- **Leakage.** `createI18n({ messages: { en, fr, ... } })`을 사용하면 모든 페이지가 모든 로케일과 모든 페이지의 문자열을 전달합니다: **50% 로케일 leakage** (두 개의 fingerprinted 로케일에서) 그리고 **90% 페이지 leakage**. Intlayer의 `static` 모드도 모든 로케일을 번들하므로 (따라서 비슷한 locale-leak 수치) **0% 페이지 leakage**를 가집니다: 페이지는 렌더링하는 컴포넌트의 사전만 가져옵니다. `importMode: 'dynamic'`으로 전환하면 로케일 leakage도 제거됩니다. 해당 구성은 이 Vue 실행에 포함되지 않았습니다.
- **컴포넌트 크기는 아키텍처를 보여줍니다.** `useI18n()`을 호출하는 컴포넌트는 평균 **196 KB**로 컴파일됩니다. `t()`가 모든 로케일의 모든 메시지를 보유하는 전역 인스턴스에 바인딩되기 때문입니다. `useIntlayer()`를 사용한 동일한 컴포넌트는 **7.7 KB**로 컴파일됩니다: 자체 딕셔너리에만 접근합니다.
- **반응성**은 둘 다 문제가 되지 않습니다(2-5 ms). Vue의 반응성 시스템은 메시지가 메모리에 있으면 로케일 전환을 저렴하게 만듭니다.
- **`@intlayer/vue-i18n`**, drop-in 어댑터는 `vue-i18n` API를 유지하며 페이지당 **47.0 KB**, 컴포넌트당 **8.4 KB**를 측정했으며, 애플리케이션 코드는 변경되지 않았습니다.

> 참고로, 동일한 실행에서 `fluent-vue`는 페이지당 171.8 KB, 29.7 KB의 runtime, 컴포넌트당 217 KB를 측정했습니다.

## 왜 이러한 간격이 있을까요? 전역 인스턴스 vs. 컴파일된 딕셔너리

`vue-i18n`은 런타임입니다. `createI18n()`은 로케일당 메시지 트리를 보유하는 글로벌 인스턴스를 구축하고, `useI18n()`은 각 컴포넌트를 이에 바인딩하며, `t("footer.github")`는 렌더 시간에 키를 조회합니다. 이것이 SFC `<i18n>` 블록, `v-t`, 그리고 런타임 메시지 로딩을 가능하게 하는 것이며, 또한 모든 컴포넌트의 의존성 그래프가 전체 트리를 포함하는 이유입니다:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # 로케일당 하나의 파일, 내부의 모든 페이지
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

최적화란 **당신이** `en.json`을 라우트별 파일로 분할하고, **당신이** 라우터 가드에서 `setLocaleMessage()`를 호출하고, 컴포넌트가 이동할 때 라우트-파일 맵을 올바르게 유지하는 것을 의미합니다. 런타임은 컴포넌트가 어떤 키를 요청할지 알 수 없기 때문에 당신을 위해 이를 수행할 수 없습니다.

Intlayer는 그 지식을 빌드로 이동합니다. 콘텐츠는 컴포넌트 옆에 선언되고, `vite-intlayer`는 어떤 컴포넌트가 어떤 dictionary를 import하는지 해결합니다:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

컴파일러는 각 딕셔너리와 locale별로 component가 필요로 하는 정확한 JSON을 내보내고, 아무도 import하지 않는 딕셔너리는 제거합니다. Per-route 범위는 per-component 범위의 결과이지, 수행할 작업이 아닙니다.

> 사용하지 않는 locale도 제거하려면 `intlayer.config.ts`에서 `dictionary.importMode: 'dynamic'`을 설정하세요. [bundle optimization doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)을 참조하세요.

## 개발자 경험

### 설정

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

// Intlayer 설정
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### Component

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')`은 메시지 스키마를 직접 입력할 때까지 문자열이며, 오타가 있으면 키가 렌더링됩니다.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

// Counter 컴포넌트의 콘텐츠 정의
const counterContent = {
  key: "counter",
  content: {
    label: t({ ko: "카운터", en: "Counter", fr: "Compteur" }),
    increment: t({ ko: "증가", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

// Counter 콘텐츠에서 label과 increment 가져오기
const { label, increment } = useIntlayer("counter");
// 숫자 포맷팅 유틸리티 초기화
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label`과 `increment`는 타입이 지정되어 있습니다. 오타는 TypeScript 오류이고, 누락된 프랑스어 값은 빌드 오류입니다.

### 로케일별 지연 로딩

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  // 로케일별 메시지를 비동기로 가져옵니다
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

그런 다음 라우터 가드에서 `loadLocaleMessages()`를 호출하고, 페이지별 범위 지정을 원한다면 `locales/{locale}.json`을 경로별로 직접 분할합니다.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## vue-i18n API를 유지하면서 Intlayer의 출력 얻기

`@intlayer/vue-i18n`은 drop-in 어댑터입니다: `useI18n()`, `t()`, `d()`, `n()`, `{name}` 및 `{0}` 보간, 파이프 복수형(`"car | cars"`), `v-t` 및 `i18n.global.locale`이 계속 작동하며, `vite-intlayer`로 컴파일된 Intlayer 사전에서 제공됩니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

벤치마크에서 동일한 앱의 호환성 빌드는 **페이지당 134.9 KB에서 47.0 KB로**, **컴포넌트당 196 KB에서 8.4 KB로** 감소했으며, 컴포넌트는 변경되지 않았습니다. 기존의 `locales/{locale}.json`은 JSON sync 플러그인을 통해 진실의 원천으로 유지될 수 있습니다.

[vue-i18n 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_vue-i18n_to_intlayer.md)와 [호환성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/vue-i18n.md)를 참조하세요. Nuxt 사용자는 [`@nuxtjs/i18n` 호환성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/nuxtjs-i18n.md)을 통해 동일한 경로를 사용할 수 있습니다.

## 어떤 것을 선택할 때?

- **vue-i18n을 선택하세요** 표준 Vue 접근 방식을 원하거나, ICU 메시지나 SFC `<i18n>` 블록에 의존하거나, 이미 `@nuxtjs/i18n`을 사용 중이거나, 번역 플랫폼이 중앙집중식 JSON을 기대하는 경우. Bundle 크기가 중요하다면 카탈로그 분할 및 경로별 lazy-loading 시간을 고려하세요.
- **Intlayer를 선택하세요** **component-scoped content**, **strict TypeScript**, **build-time missing-key errors**, **zero-effort tree-shaking and lazy loading**, 그리고 built-in editorial tooling(Visual Editor, CMS, AI translation, MCP server)을 원하는 경우. 특히 대규모의 모듈식 Vue / Nuxt codebase와 design system에 적합합니다.
- **`@intlayer/vue-i18n`을 선택하세요** 이미 `vue-i18n`을 사용 중이고 재작성 없이 bundle 이점을 원하는 경우.

## 관련 비교

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-intl_vs_intlayer.md) (동일한 벤치마크)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_intlayer.md) (동일한 벤치마크)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md) (동일한 벤치마크)
- [vue-i18n vs Intlayer (기능 & DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer.md)
- [vue-i18n이 구식인가?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_vue-i18n_outdated.md)

## GitHub STARs

GitHub 별은 프로젝트의 인기도, 커뮤니티의 신뢰, 그리고 장기적 관련성을 나타내는 강력한 지표입니다. 기술적 품질의 직접적인 척도는 아니지만, 얼마나 많은 개발자가 프로젝트를 유용하다고 생각하고, 그 진행 상황을 따라가며, 이를 채택할 가능성이 높은지를 반영합니다.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## 결론

`vue-i18n`은 성숙하고 유연하며 Vue와 깊이 있게 통합되어 있습니다. 벤치마크는 Vite 빌드에서 runtime-first 설계의 비용을 보여줍니다: **24 KB gzip runtime**, **페이지당 134.9 KB** (i18n 없이 41 KB인 앱의 경우), **모든 페이지에서 90% 외부 페이지 콘텐츠**, 그리고 각 컴포넌트가 전역 메시지 트리에 연결되어 있기 때문에 **196 KB**에 도달합니다.

Intlayer는 컴파일러로 작업을 이동합니다. 컴포넌트별 딕셔너리와 데드 콘텐츠 제거는 관례가 아닌 빌드 출력입니다. 동일한 앱에서: **3.9 KB runtime**, **페이지당 57.1 KB**, **0% 페이지 누출**, 컴포넌트는 **25배 더 작음**. 그리고 리라이트가 선택지가 아니라면, `@intlayer/vue-i18n`은 컴포넌트를 건드리지 않고도 대부분의 방식으로 작동합니다.

모든 원본 데이터, 테스트 앱 및 스크립트는 [Benchmark Bloom 저장소](https://github.com/intlayer-org/benchmark-bloom)에 있습니다. 직접 실행해보세요.

자세한 내용은 ['Intlayer를 선택해야 하는 이유?' 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.
