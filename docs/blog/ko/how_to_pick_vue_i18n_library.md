---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026년 올바른 Vue i18n 라이브러리를 선택하는 방법"
description: Vue 및 Nuxt 국제화를 위한 결정 가이드. vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide, Intlayer를 비교하기 전에 답해야 할 질문들과 각 선택이 번들 크기, 타이핑 및 SSR 페이로드에 미치는 영향을 알아봅니다.
keywords:
  - vue i18n
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# 올바른 Vue i18n 라이브러리를 선택하는 방법

"Vue i18n"은 일반적인 용어이자 거의 모든 사람이 설치하는 라이브러리의 이름이기도 합니다. 이는 편리하면서도 동시에 오해를 불러일으킬 수 있습니다. `vue-i18n`은 훌륭한 기본 선택지이지만 유일한 옵션은 아니며, 선택을 주도해야 하는 질문들(SSR 사용 여부, 페이지 수, 번역 작성 주체 등)은 `npm install`을 실행하기 전에 거의 고려되지 않습니다.

이 가이드는 이러한 질문들을 먼저 던진 후, 순수 Vite + Vue 및 Nuxt 환경에 맞는 라이브러리로 답변을 매핑합니다.

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 목차

<TOC/>

## 라이브러리를 비교하기 전에 답해야 할 6가지 질문

1. **Vite SPA인가요, Nuxt인가요?** SPA에서 카탈로그 비용은 JS 번들 문제입니다. Nuxt에서는 메시지가 SSR 상태로 직렬화되어 hydration되므로 HTML 페이로드 문제이기도 합니다. "vue-i18n이 느리다"는 대부분의 보고는 이러한 이유로 Nuxt 앱에서 발생합니다.
2. **누가 번역을 작성하나요?** 개발자, TMS, ICU 문자열을 제공하는 에이전시, 또는 AI 파이프라인. `vue-i18n`은 ICU가 아닌 자체 파이프 구분 복수형 문법을 사용합니다. 외부에서 문자열을 가져오는 경우 이 점이 중요합니다.
3. **로케일과 페이지 수는 얼마나 되나요?** 2개 로케일과 5개 페이지라면 모든 번역을 한 번에 전송할 수 있습니다. 하지만 10개 로케일과 40개 라우트라면 불가능하며, 로딩 전략이 주요 비용 요인이 됩니다.
4. **키에 대한 타입이 필요한가요?** 메시지 스키마 generic을 전달하지 않는 한 `t("cart.totl")`은 `vue-i18n`에서 그대로 컴파일되며, 해당 스키마는 지연 로딩(lazy loading)되는 카탈로그와 충돌하기 쉽습니다.
5. **콘텐츠에 무엇이 포함되나요?** 단순 UI 레이블만 포함되는지, 아니면 마크다운, 문장 내 링크, 로케일별 블록이 포함되는지 확인하세요. 리치 콘텐츠(rich content)는 `t()`가 문자열을 반환하는 방식에서 다루기 까다로워집니다.
6. **CSP가 제약 사항인가요?** 기본 `vue-i18n` 빌드는 브라우저에서 `new Function`을 사용하여 메시지를 컴파일합니다. 런타임 전용(runtime-only) 빌드에는 빌드 타임에 사전 컴파일하기 위해 `@intlify/unplugin-vue-i18n`이 필요합니다.

답변을 적어두세요. 아래의 모든 내용은 이 답변들을 기준으로 설명합니다.

## 한눈에 보는 라이브러리 환경

Vue 생태계는 React보다 i18n 라이브러리 수가 적으며, 서로 다른 아키텍처 흐름에서 파생되었습니다.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="런타임 딕셔너리 (2015 ~ 2019): vue-i18n, @nuxt/i18n">

`vue-i18n`은 2015년에 등장한 이후 줄곧 표준으로 자리잡았습니다. `@nuxt/i18n`은 이를 감싸 로케일 라우팅, SEO 태그 및 로케일별 지연 로딩을 제공합니다. 메시지는 렌더 함수로 컴파일되며, unplugin을 추가하면 빌드 타임에, 그렇지 않으면 브라우저에서 컴파일됩니다.

</Accordion>
<Accordion header="대안 포맷 (2020): fluent-vue">

Mozilla Fluent `.ftl` 파일은 문법을 인식하는 다양한 변형과 함께 친숙한 메시지 문법을 도입했습니다. 키 타입은 지원하지 않으며, Vite 플러그인은 모든 로케일을 모든 페이지에 로드합니다.

</Accordion>
<Accordion header="컴파일러 및 병합 배치된 콘텐츠 (2024 ~ 2026): Paraglide, Intlayer">

Paraglide는 메시지당 하나의 함수를 생성하고 번들러가 나머지를 트리 셰이킹(tree-shaking)하도록 합니다. Intlayer는 `.content.ts` 파일에서 컴포넌트별로 콘텐츠를 선언하고, 타입을 생성하며, 라우트가 렌더링하는 데 필요한 것만 전송합니다.

</Accordion>
</AccordionGroup>

[JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)에서 각 흐름을 자세히 다룹니다.

## 가장 중요한 결정: 콘텐츠의 위치와 로딩 시점

두 가지 구조적 선택이 설정 간의 번들 크기 차이 대부분을 설명합니다:

- **중앙 집중식 vs 스코프 지정된(scoped) 콘텐츠.** 앱 전체를 위한 하나의 `locales/en.json`을 둘 것인지, 컴포넌트당 하나의 선언을 둘 것인지의 차이입니다.
- **정적 import vs 동적 import.** 시작 시 모든 것을 로드할 것인지, 활성 로케일(그리고 이상적으로는 활성 라우트)을 온디맨드로 가져올 것인지의 차이입니다.

아래 그래프는 페이지당 약 30KB의 텍스트가 있는 1~10개 페이지, 1~10개 로케일로 번역된 가상 앱의 페이로드를 추정합니다.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n`은 동적 축을 지원합니다. `import()` 후 `setLocaleMessage`를 사용하면 아무도 읽지 않는 9개 로케일 전송을 방지할 수 있습니다. 하지만 페이지 축은 제공하지 않습니다. 로케일 카탈로그는 하나의 객체이며, 이를 로드하면 모든 페이지의 텍스트가 함께 로드됩니다. SPA에서는 이를 눈치채지 못할 수 있습니다. 하지만 Nuxt에서 `@nuxtjs/i18n`을 사용하고 10개 이상의 페이지가 있는 경우, 모든 라우트가 다른 모든 라우트의 문자열을 JS 청크와 SSR 페이로드에 두 번씩 포함하게 됩니다.

[Vue 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/vue.md)에서는 이를 "다른 라우트로부터의 누수" 및 "다른 로케일로부터의 누수"로 측정합니다. 질문 3에 대한 답변이 "많은 페이지"였다면 이 섹션이 API 선호도보다 훨씬 중요합니다. [컴포넌트별 vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md) 포스트에서는 동일한 트레이드오프의 유지보수 측면을 다룹니다.

## 후보 라이브러리

라이브러리 크기는 10개 페이지, 10개 로케일 앱에서 번들링, 트리 셰이킹, 압축(minification)을 거친 후 빈 컴포넌트 내 플러그인과 composable을 측정한 [Vue 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/vue.md) 기준입니다. 콘텐츠는 별도로 측정됩니다.

| 라이브러리     | 콘텐츠 모델                                      | 타입 안전성                           | 메시지 포맷                         | 라우트별 분할                 | 라이브러리 크기                              |
| :------------- | :----------------------------------------------- | :------------------------------------ | :---------------------------------- | :---------------------------- | :------------------------------------------- |
| `vue-i18n`     | 로케일별 중앙 카탈로그, 선택적 SFC `<i18n>` 블록 | 2/5 — 스키마 generic을 통한 선택 적용 | 자체 포맷 (파이프 복수형)           | 지원 안 함                    | ~24.3 kB                                     |
| `@nuxtjs/i18n` | `vue-i18n`과 동일, 라우팅 및 SEO 태그 추가       | 2/5 — 동일                            | 동일                                | 지원 안 함, 로케일별로만 가능 | ~24.3 kB                                     |
| `fluent-vue`   | `.ftl` 파일 (Mozilla Fluent)                     | 1/5 — 없음                            | Fluent                              | 지원 안 함                    | ~29.7 kB                                     |
| Paraglide      | inlang 프로젝트, 생성된 함수                     | 3.5/5 — 생성됨                        | 자체 포맷                           | 트리 셰이킹을 통해 지원       | 0에 가까움 (코드베이스에 생성되는 코드 때문) |
| Intlayer       | 컴포넌트당 하나의 `.content.ts`                  | 5/5 — 생성됨, 기본 활성화             | Intlayer (+ ICU, i18next, vue-i18n) | 지원 (컴포넌트별)             | ~3.9 kB                                      |

> 수치는 벤치마크 버전 기준 스냅샷입니다. 크기만으로 결정하기 전에 자체 앱에서 직접 실행해 보세요.
> 타입 안전성: 5/5는 URL 포맷터와 헬퍼를 포함하여 키, 매개변수, 모든 로케일이 수동 설정 없이 검사됨을 의미합니다.

Paraglide의 0에 가까운 라이브러리 크기는 구조적 특징입니다. 런타임이 리포지토리 내에 생성되므로, 모든 push 전에 재생성 단계가 필요하고 생성된 파일에서 merge conflict가 발생할 수 있습니다. Intlayer는 `vite-intlayer`(또는 Nuxt 모듈)가 필요하므로 빌드 단계 없이 실행할 수 없습니다.

## 답변에 맞는 라이브러리 매핑

<AccordionGroup>
<Accordion header="Vite SPA, 소규모 팀, 소수의 로케일">

Composition 모드(`legacy: false`)의 `vue-i18n`과 `@intlify/unplugin-vue-i18n`을 함께 사용하여 런타임 전용(runtime-only) 빌드를 제공하세요. `import()`를 사용하여 로케일을 지연 로딩합니다. 이는 대부분의 소규모 앱을 커버하며 커뮤니티 답변도 어디서나 쉽게 찾을 수 있습니다. SFC `<i18n>` 블록은 메시지를 컴포넌트와 함께 배치하여 도움이 되지만, 추출 및 TMS 도구 지원이 JSON 카탈로그보다 부족하므로 팀이 어떤 방식을 사용할지 초기에 결정하세요.

</Accordion>
<Accordion header="로케일 라우팅, sitemap 및 hreflang이 필요한 Nuxt">

`@nuxtjs/i18n`은 코드 작성 없이 라우팅 전략, `hreflang` 태그, 로케일 감지를 제공하므로, 몇 개 페이지로 구성된 콘텐츠 사이트라면 이것만으로도 선택할 이유가 충분합니다. 한계는 로케일별 카탈로그입니다. 대략 10개 이상의 페이지가 넘어가면 SSR 페이로드가 모든 라우트의 텍스트를 포함하게 됩니다. 이러한 경우 `vue-i18n`을 라우트별 메시지와 수동으로 연결하거나 스코프 지정된 콘텐츠로 전환하세요. [Nuxt i18n 포스트](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/nuxt.md)에서 라우팅 전략 선택을 먼저 안내합니다.

</Accordion>
<Accordion header="번역이 TMS 또는 ICU를 전달하는 에이전시로부터 오는 경우">

`vue-i18n`의 복수형 문법(`"no item | one item | {count} items"`)은 ICU가 아니며 이식성이 없습니다. 번역가에게 이에 대해 알려야 하며, TMS export로는 이를 바로 생성할 수 없습니다. 첫 번째 카탈로그가 만들어지기 전에 포맷에 합의하거나, 공급업체와 포맷이 일치하는 라이브러리를 선택하세요. Intlayer의 ICU 지원은 부분적이므로 현재 ICU 문자열을 받고 있다면 이 점도 고려해야 합니다.

</Accordion>
<Accordion header="대규모 앱, 많은 라우트, 번들 또는 SSR 페이로드 예산 제약">

빌드 타임에 컴파일되는 스코프 지정된(scoped) 콘텐츠를 선호하세요. Paraglide는 Vite에서 잘 작동하는 트리 셰이킹을 통해 이를 달성합니다. Intlayer는 컴포넌트별 선언을 통해 라우트가 렌더링하는 것만 전달합니다. `vue-i18n`을 사용하면 라우트별로 메시지를 수동 분할할 수 있지만, 이를 강제하는 메커니즘이 없으며 전역 네임스페이스를 가져오는 공유 컴포넌트로 인해 분할이 무력화될 수 있습니다.

</Accordion>
<Accordion header="타입 안전성이 타협할 수 없는 요구사항인 경우">

`vue-i18n`은 `createI18n`에 스키마 generic을 전달하여 타입을 지정할 수 있습니다. 작동은 하지만, 카탈로그가 지연 로딩되는 순간 깨집니다. 스키마가 아직 로드되지 않았을 수 있는 메시지를 기술하기 때문입니다. 이를 직접 유지보수하고 싶지 않다면 Paraglide나 Intlayer처럼 콘텐츠로부터 타입이 생성되는 라이브러리를 선택하세요. [누락된 번역 감지](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md) 포스트에서 각 라이브러리가 빌드 타임에 감지하는 항목을 비교합니다.

</Accordion>
<Accordion header="콘텐츠가 단순 UI 레이블 이상인 경우">

마크다운 페이지, 중간에 `<RouterLink>`가 포함된 문장, 로케일별 컴포넌트 등이 해당됩니다. `vue-i18n`에는 컴포넌트 보간(component interpolation)을 위한 `<i18n-t>`가 있어 작동은 하지만 장황합니다. Intlayer의 콘텐츠 노드는 마크다운, HTML, 중첩 객체를 직접 지원하므로 콘텐츠 중심의 앱에 더 잘 맞습니다.

</Accordion>
<Accordion header="번역이 AI로 생성되는 경우">

이 경우 중앙 집중식 JSON을 유지해야 할 이유가 사라집니다. 병합 배치된(colocated) 콘텐츠와 누락된 로케일을 채워주는 CLI를 함께 사용하는 것이 가장 빠른 경로입니다. Intlayer의 `fill` 명령어는 사용자의 자체 API key(OpenAI, Anthropic, Mistral, Gemini)로 실행되며 변경된 내용만 다시 번역합니다.

</Accordion>
</AccordionGroup>

## 각 라이브러리의 한계

- **`vue-i18n`**: 비교 대상 중 가장 무거움, 자체 복수형 포맷, 타입은 선택 사항이며 지연 로딩 시 취약함, 라우트별 스코프 미지원, 사용되지 않는 키(dead keys)가 조용히 축적됨. Vue 3 앱에서 `legacy: true`를 유지하면 Vue 2 호환성 계층이 남아 `useI18n()` 타이핑을 잃게 됩니다.
- **`@nuxtjs/i18n`**: 위의 모든 한계를 상속받으며, 라우트가 10여 개를 넘어가면 SSR 페이로드에 모든 페이지의 문자열이 포함됩니다.
- **`fluent-vue`**: 훌륭한 메시지 문법을 갖추었으나 키 타입이 없고, Vite 플러그인이 모든 언어의 모든 콘텐츠를 모든 페이지에 로드합니다. 벤치마크에서 가장 무겁습니다.
- **Paraglide**: 생성된 파일이 리포지토리에 커밋되어 매 push 전 재생성이 필요하며, 반응형 스토어가 아닌 쿠키나 스토리지에서 메시지 호출 시마다 로케일을 읽어오므로 로케일 변경 시 추가 연산이 듭니다.
- **Intlayer**: 빌드 플러그인이 필수이며, 생태계가 상대적으로 작고 ICU 지원이 부분적입니다. 또한 구조상 콘텐츠가 코드베이스 전체에 분산되어 있어 번역가를 위해 하나의 JSON으로 내보내려면 별도 도구가 필요합니다.

## 코드로 살펴보는 각 옵션

동일한 컴포넌트(제목과 복수형이 포함된 장바구니 요약)를 각 후보 라이브러리로 작성한 모습입니다. 흥미로운 부분은 템플릿이 아니라 콘텐츠의 위치와 `vue-tsc`가 이를 인식하는 방식입니다.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="스페인어">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

파이프 구분 복수형은 vue-i18n의 자체 포맷이며 ICU가 아닙니다. `createI18n`에 메시지 스키마 generic을 전달하지 않는 한 `t`는 임의의 문자열을 허용합니다.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="스페인어">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Fluent의 문법은 복수형과 문법적 변형을 잘 처리합니다. 메시지 ID는 타입이 지정되지 않은 문자열이며, Vite 플러그인은 모든 로케일을 모든 페이지에 번들링합니다.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="스페인어">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

모든 메시지는 생성된 타입 안전한 함수이므로, 누락된 키는 import 에러로 나타납니다. `paraglide/` 폴더는 리포지토리 내에 생성되며 변경 사항이 있을 때마다 재생성됩니다.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      ko: "장바구니",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      ko: plural({ one: "{{count}}개 상품", other: "{{count}}개 상품" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

모든 로케일이 컴포넌트 옆의 단일 파일에 위치합니다. 빌드 시 타입이 생성되므로 `title`이 자동 완성되고 오타가 있으면 `vue-tsc` 검사에 실패합니다. `<title />`은 시각적 편집기가 타겟팅할 수 있는 노드를 렌더링하며, `{{ items(props.count) }}`는 일반 문자열을 반환합니다.

  </Tab>
</Tabs>

이미 `vue-i18n`을 사용 중이신가요? [`@intlayer/vue-i18n` 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/vue-i18n.md)는 번들러 수준에서 패키지를 alias 처리하여, Intlayer가 콘텐츠를 제공하는 동안 `useI18n()`, `$t`, 파이프 복수형, `v-t`가 그대로 작동하도록 합니다. [마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_vue-i18n_to_intlayer.md)에서 어댑터 이후의 전환 과정을 다루며, [Nuxt 전용 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_nuxtjs_i18n_to_intlayer.md)도 제공됩니다.

## 최종 결정 전에 확인할 사항

기능 비교표는 라이브러리가 현재 무엇을 지원하는지 알려줍니다. 아래 항목들은 실제로 라이브러리를 사용하며 유지보수할 때 겪게 될 경험을 보여줍니다.

**저장소 활동성을 확인하세요.**

커밋 내역, 이슈 응답 시간, 최신 마이너 릴리스가 올해 있었는지 확인하세요. 유지보수자가 없는 훌륭한 설계는 곧 마이그레이션해야 할 대상일 뿐입니다.

**npm 다운로드 수만으로 선택하지 마세요.**

가장 많이 설치된 라이브러리는 2026년의 Vue 코드베이스에 가장 적합한 라이브러리가 아니라 가장 먼저 출시된 라이브러리일 뿐입니다. 다운로드 수는 적합성이 아니라 역사를 측정합니다.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**누가 유지보수자에게 비용을 지불하고 무엇을 판매하는지 살펴보세요.**

`vue-i18n`은 `next-intl`, `svelte-i18n`과 마찬가지로 Crowdin의 후원을 받습니다. `i18next`는 Locize의 후원을 받습니다. Tolgee, Paraglide(inlang), Intlayer는 각각 자체 플랫폼을 운영합니다. 호스팅 번역 서비스를 주 수익원으로 하는 공급업체는 툴체인 내에서 무료 번역을 제공할 유인이 적습니다. Intlayer는 자체 API 키를 사용하여 CLI를 통한 AI 번역을 지원하고 자체 호스팅(self-host) 가능한 CMS를 제공하는 유일한 솔루션입니다.

**AI 에이전트 친화적인가요?**

에이전트는 여전히 i18n 처리에 어려움을 겪습니다. 로케일을 빠뜨리거나, 임의의 키를 생성하거나, 메시지 문법을 혼동합니다. 해당 라이브러리가 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)나 [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)를 제공하여 에이전트가 콘텐츠를 나열, 채우기 및 테스트할 수 있나요? 또한 콘텐츠 로딩이 기본적으로 최적화되어 있는지, 아니면 매 분기마다 누군가가 네임스페이스와 지연 import를 검토해야 하나요?

**기본 제공되는 타입 안전성.**

"추가 설정으로 타입을 지정할 수 있다"가 아니라 "새로 설치했을 때 잘못된 키가 `tsc`에서 에러를 발생시킨다"여야 합니다. 존재하지 않는 키를 사용할 때와 특정 로케일에 번역이 하나 누락되었을 때 어떤 일이 일어나는지 확인하세요.

**미사용 콘텐츠 감지.**

카탈로그는 계속 커지기만 합니다. Intlayer의 빌드는 사용되지 않는 필드를 제거하고 로그를 남깁니다(`build.purge`). Paraglide는 호출되지 않은 메시지 함수가 트리 셰이킹되므로 아키텍처적으로 이를 해결합니다. 그 외의 라이브러리들은 정리 작업을 개발자에게 맡깁니다.

**개발자 경험(DX).**

첫 번째 번역 문자열까지의 설정 시간, 마우스 호버 시 번역을 표시하고 선언으로 이동할 수 있는 [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md) 또는 [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md), 채우기/테스트/푸시를 위한 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md), 컴포넌트에 하드코딩된 문자열을 추출해 키 하나하나를 직접 관리하지 않아도 되게 해주는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) 또는 추출기, 비개발자가 풀 리퀘스트 없이 콘텐츠를 편집할 수 있는 도구([시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)) 지원 여부를 확인하세요.

## 자주 묻는 질문 (FAQ)

<FAQ>

<Question title="2026년에도 vue-i18n이 여전히 올바른 기본 선택지인가요?">

대부분의 Vue 앱에서는 그렇습니다. 가장 큰 생태계와 철저한 문서를 갖추고 있으며, 비용 또한 예측 가능합니다. 무거운 런타임, 커스텀 복수형 포맷, 직접 구축하고 관리해야 하는 라우트별 스코핑 등이 그 대가입니다.

</Question>

<Question title="Nuxt에서 @nuxtjs/i18n을 사용해야 할까요, 아니면 vue-i18n을 직접 연결해야 할까요?">

라우팅 구조가 매우 특이하거나 앱의 페이지 수가 적지 않다면 모듈을 사용하세요. 직접 연결한다는 것은 로케일 라우트, 미들웨어, `hreflang`, 사이트맵을 직접 다시 구축하는 것을 의미하며, 이는 생각보다 까다롭습니다.

</Question>

<Question title="컴파일러 기반 라이브러리가 꼭 필요한가요?">

번들 크기, SSR 페이로드, 자동 생성되는 타입 또는 빌드 타임 누락 키 검사가 실제 요구사항인 경우에만 필요합니다. [컴파일러 vs 선언적 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md) 포스트에서 컴파일러가 제공하는 이점과 발생할 수 있는 한계를 설명합니다.

</Question>

<Question title="라이브러리 선택이 SEO에 영향을 미치나요?">

간접적으로 영향을 미칩니다. 크롤러는 라우팅, `hreflang`, `<html lang>`, 텍스트가 서버 렌더링된 HTML에 포함되어 있는지 여부를 중요하게 봅니다. [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)를 참조하세요.

</Question>

</FAQ>

## 더 알아보기

- [Vue i18n 벤치마크: 번들 크기, 누수 및 로케일 전환 타이밍](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/vue.md)
- [Vue i18n: vue-i18n의 동작 방식과 한계점](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/vue.md) 및 [Nuxt i18n 포스트](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n vs Intlayer 기능별 비교](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer.md) 및 [vue-i18n vs Intlayer 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer_benchmark.md)
- [vue-i18n은 구식인가요?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_vue-i18n_outdated.md)
- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)
- [컴파일러 vs 선언적 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)
- [컴포넌트별 vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
- [Vite + Vue 앱에서 i18n 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vue.md) 및 [Nuxt 앱에서 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nuxt.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_svelte_i18n_library.md), [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_solid_i18n_library.md) 가이드
