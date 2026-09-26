---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "2026년 올바른 Svelte i18n 라이브러리를 선택하는 방법"
description: Svelte 및 SvelteKit 국제화를 위한 결정 가이드. svelte-i18n, Paraglide, typesafe-i18n, wuchale, Intlayer를 비교하기 전에 답해야 할 질문들과 각 선택이 번들 크기, 타입 정의 및 SSR 안전성에 미치는 영향을 알아봅니다.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalization
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# 올바른 Svelte i18n 라이브러리를 선택하는 방법

Svelte는 기본적으로 i18n 관련 기능을 내장하고 있지 않습니다. `$t`도 없고, 로케일 프리미티브나 메시지 포맷도 없습니다. 모든 옵션은 서드파티 라이브러리를 선택해야 하며, Svelte 생태계는 컴파일 타임 i18n이 가장 발전한 곳이기 때문에 후보군 간의 차이가 React나 Vue보다 훨씬 큽니다.

이 가이드에서는 먼저 답해야 할 질문들을 정리한 다음, 그 답변을 바탕으로 Vite + Svelte 및 SvelteKit 환경에서 `svelte-i18n`, Paraglide, `typesafe-i18n`, `wuchale`, Intlayer를 매핑합니다.

![Svelte i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 목차

<TOC/>

## 라이브러리를 비교하기 전에 답해야 할 6가지 질문

1. **Vite SPA인가요, 아니면 SvelteKit인가요?** SPA에서는 모듈 수준의 store가 적합합니다. 하나의 탭, 하나의 사용자, 하나의 로케일만 존재하기 때문입니다. 하지만 SvelteKit에서는 동일한 싱글톤이 서버의 동시 요청 간에 공유되어 요청 B가 요청 A의 언어로 렌더링될 수 있습니다. 라이브러리가 요청별 격리 구조(context, `locals`)를 제공하거나, 개발자가 직접 이를 구현해야 합니다.
2. **누가 번역을 작성하나요?** 개발자, TMS, ICU 문자열을 전달하는 에이전시, 또는 AI 파이프라인. `svelte-i18n`은 ICU를 기본 지원합니다. Paraglide와 `typesafe-i18n`은 자체 문법을 사용합니다. 번역 벤더와 형식을 맞추세요.
3. **로케일과 페이지 수는 얼마나 되나요?** 2개 로케일과 5개 페이지라면 모든 번역을 한 번에 번들에 포함해도 문제없습니다. 하지만 10개 로케일과 40개 라우트라면 불가능하며, 런타임 카탈로그와 컴파일된 메시지 간의 차이가 주요 비용 요인이 됩니다.
4. **키에 대한 타입이 필요한가요?** `$_("cart.totl")`과 같은 오타는 `svelte-i18n`에서 런타임 오류로 이어집니다. 컴파일 타임 라이브러리는 구조적으로 이를 타입 에러로 잡아냅니다.
5. **Svelte 4 store인가요, 아니면 Svelte 5 rune인가요?** Rune은 로케일 상태의 문법을 바꿀 뿐, 상태 공유 문제를 해결해 주지는 않습니다. 그러나 `.ts` 파일의 `$state`는 일반 변수로 컴파일되므로, Svelte 5를 사용한다면 라이브러리의 런타임이 rune을 인식할 수 있어야 합니다.
6. **레포지토리에 자동 생성된 파일이 포함되어도 괜찮나요?** Paraglide와 `typesafe-i18n`은 모두 소스 트리에 JavaScript 또는 TypeScript 파일을 생성합니다. 어떤 팀은 이를 문제없이 수용하지만, 다른 팀은 병렬 브랜치마다 머지 충돌을 겪습니다.

답변을 적어두세요. 아래의 모든 내용은 이 답변들을 기준으로 설명합니다.

## 한눈에 보는 라이브러리 환경

Svelte i18n은 React나 Vue보다 늦게 등장했으며, 컴파일 타임 흐름으로 곧바로 넘어갔습니다.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="런타임 딕셔너리 (2019 ~ 2020): svelte-i18n, sveltekit-i18n">

JSON 카탈로그, `intl-messageformat`을 통해 브라우저에서 파싱되는 ICU, 모듈 수준 store(`$locale`, `$_`)에 저장되는 로케일. 가장 많이 채택되었고 문서화가 잘 되어 있지만, SSR 연동은 직접 구성해야 합니다.

</Accordion>
<Accordion header="생성된 타입 (2020 ~ 2022): typesafe-i18n">

제너레이터가 카탈로그를 감시하고 타입이 지정된 접근자(`$LL.cart.total()`)를 생성합니다. 탄탄한 모델이지만 레포지토리에 파일이 생성되며, 최근에는 저장소 활동이 다소 정체되어 있습니다.

</Accordion>
<Accordion header="컴파일러 및 코로케이션 콘텐츠 (2022 ~ 2026): Paraglide, wuchale, Intlayer">

Paraglide는 각 메시지를 export된 함수로 컴파일하여 번들러가 라우트에서 호출되지 않는 메시지를 tree-shake할 수 있도록 합니다. `wuchale`은 빌드 시 마크업에서 문자열을 추출합니다. Intlayer는 컴포넌트별로 콘텐츠를 선언하고 타입과 컴포넌트별 딕셔너리를 생성합니다.

</Accordion>
</AccordionGroup>

[JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)에서 각 흐름을 자세히 다룹니다.

## 가장 중요한 결정: 콘텐츠가 위치하는 곳과 로드되는 시점

두 가지 구조적 선택이 설정 간 번들 차이의 대부분을 설명합니다.

- **중앙집중식 또는 스코프화된 콘텐츠.** 앱 전체를 위한 하나의 `locales/en.json` 파일인지, 컴포넌트별 하나의 선언인지.
- **정적 또는 동적 import.** 시작 시 모든 것을 로드하는지, 아니면 활성 로케일(이상적으로는 활성 라우트까지)을 온디맨드로 가져오는지.

아래 그래프는 페이지당 약 30KB의 텍스트를 가진 1~10개 페이지가 1~10개 로케일로 번역된 이론적인 앱의 페이로드를 추정한 것입니다.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`svelte-i18n`은 기본적으로 왼쪽 상단에 위치합니다. `register("fr", () => import("./fr.json"))`은 로케일별 동적 로딩을 제공하지만, 로케일 카탈로그가 하나의 객체이기 때문에 이를 로드하면 모든 페이지의 텍스트가 함께 로드됩니다. Paraglide는 흥미로운 사례입니다. 모든 메시지가 개별 export 함수이므로 tree-shaking을 통해 페이지 축의 최적화를 자동으로 얻을 수 있으며, [Svelte 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/svelte.md)에서 Vite + Svelte 환경에서 설명대로 잘 작동함을 확인했습니다 (React 및 Next.js 벤치마크에서는 그렇지 않았습니다). Intlayer는 컴포넌트별 선언을 통해 동일한 최적화 영역에 도달합니다.

질문 3에 대한 답이 "많은 페이지"였다면, 어떤 API 선호도보다 이 섹션의 내용을 더 중요하게 고려하세요. [컴포넌트별 vs 중앙집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md) 포스트에서 동일한 트레이드오프의 유지보수 측면을 다룹니다.

## 후보 라이브러리

라이브러리 크기는 [Svelte 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/svelte.md)를 기준으로 합니다. 10개 페이지, 10개 로케일 앱에서 번들링, tree-shaking 및 minification을 거친 빈 컴포넌트 내 store 및 접근자 크기입니다. 콘텐츠는 별도로 측정됩니다.

| 라이브러리      | 메시지 저장 위치                 | 로케일 상태                              | 타입 안전성               | 메시지 포맷                   | 라우트별 분할            | 라이브러리 크기                              |
| :-------------- | :------------------------------- | :--------------------------------------- | :------------------------ | :---------------------------- | :----------------------- | :------------------------------------------- |
| `svelte-i18n`   | 로케일별 JSON 카탈로그           | 모듈 수준 Svelte store                   | 2/5 — 수동 union 타입     | ICU                           | 지원 안 함               | ~16.6 kB                                     |
| `typesafe-i18n` | 생성된 TS 모듈                   | Store 어댑터                             | 4/5 — 생성됨              | 자체 포맷                     | 부분 지원                | 작음                                         |
| Paraglide       | inlang 프로젝트, 함수로 컴파일됨 | 쿠키, URL, 스토리지에서 호출 시마다 읽음 | 3.5/5 — 생성됨            | 자체 포맷                     | 지원 (tree-shaking 활용) | 0에 가까움 (코드베이스에 생성되는 코드 때문) |
| `wuchale`       | 빌드 시 마크업에서 추출          | Store                                    | 해당 없음 (키 없음)       | 자체 포맷                     | 지원                     | ~30.7 kB                                     |
| Intlayer        | 컴포넌트 옆 `.content.ts`        | Context 및 store, rune 지원              | 5/5 — 생성됨, 기본 활성화 | Intlayer (+ ICU, i18next, PO) | 지원, 컴포넌트별         | ~3.6 kB                                      |

> 수치는 벤치마크 당시 버전의 스냅샷입니다. 크기만으로 결정하기 전에 자체 앱에서 직접 실행해 보세요.
> 타입 안전성: 5/5는 URL 포맷터와 헬퍼를 포함하여 키, 매개변수, 모든 로케일이 수동 설정 없이 검사됨을 의미합니다.

Paraglide의 0에 가까운 라이브러리 크기는 구조적인 결과입니다. 런타임이 레포지토리 내에 직접 생성되기 때문입니다. Intlayer는 `vite-intlayer`가 필요하므로 빌드 단계 없이 실행할 수 없습니다.

## 답변에 맞는 라이브러리 매칭

<AccordionGroup>
<Accordion header="Vite SPA, 소규모 팀, 적은 수의 로케일">

`svelte-i18n`. 가장 많은 문서가 있고, `$_`는 마크업에서 자연스럽게 읽히며, `register`와 `waitLocale()`로 로케일별 lazy loading을 처리할 수 있습니다. `isLoading`으로 첫 렌더링을 제어하지 않으면 번역되지 않은 원본 키가 화면에 깜빡일 수 있습니다. 나중에 서버가 추가될 가능성이 있다면 모듈 store에 의존하는 대신 첫날부터 로케일을 Svelte context에 넣으세요. 지금은 추가 비용이 없지만 나중에 프로덕션 전용 버그를 방지할 수 있습니다.

</Accordion>
<Accordion header="로케일 라우팅 및 SSR이 포함된 SvelteKit">

상태 공유 문제가 결정적인 요인입니다. `svelte-i18n`은 SvelteKit에서 작동하지만 요청별 연동(`hooks.server.ts`, `locals`, `load`, 그리고 `setContext`)을 직접 작성해야 하며 미묘한 실수가 발생하기 쉽습니다. Paraglide는 라우팅을 처리하고 호출 시마다 로케일을 읽는 SvelteKit 통합을 제공하여 싱글톤 문제를 우회합니다. Intlayer는 `load` 데이터의 로케일을 context에 설정합니다. [SvelteKit i18n 포스트](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/sveltekit.md)에서 라이브러리를 선택하기 전에 먼저 결정해야 하는 `[[lang]]` 대 `reroute` 선택을 설명합니다.

</Accordion>
<Accordion header="번역이 TMS나 ICU를 제공하는 에이전시에서 오는 경우">

`svelte-i18n`은 `intl-messageformat`을 통해 ICU를 기본 지원하므로 대부분의 벤더와 바로 연동됩니다. Paraglide와 `typesafe-i18n`은 자체 문법을 사용하므로 변환이 필요합니다. Intlayer의 ICU 지원은 부분적이므로 현재 ICU 문자열을 받고 있다면 이를 주요 제약 조건으로 검토해야 합니다.

</Accordion>
<Accordion header="번들 크기가 최우선 제약 조건인 경우">

컴파일 타임을 선택하세요. Paraglide의 tree-shaking은 Vite + Svelte에서 잘 작동하며 라이브러리 비용이 거의 0입니다. Intlayer의 컴포넌트별 딕셔너리는 레포지토리에 파일을 생성하지 않고도 동일한 결과를 제공합니다. `svelte-i18n`은 ICU 파서와 전체 카탈로그를 포함하므로 콘텐츠를 제외하고도 벤치마크에서 `svelte-intlayer`의 약 4.5배 크기에 달합니다.

</Accordion>
<Accordion header="타입 안전성이 타협할 수 없는 조건인 경우">

수동으로 작성한 union 타입이 JSON과 즉시 어긋나는 기본 `svelte-i18n` 설정을 제외한 모든 것을 고려할 수 있습니다. `typesafe-i18n`, Paraglide, Intlayer는 모두 콘텐츠로부터 타입을 자동 생성합니다. 코드베이스에 도입하기 전에 `typesafe-i18n`의 레포지토리 활성도를 확인하세요. [누락된 번역 감지](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md) 포스트에서 각 라이브러리가 빌드 타임에 무엇을 잡아내는지 비교합니다.

</Accordion>
<Accordion header="레포지토리에 생성된 파일이 커밋되는 것을 원하지 않는 경우">

그렇다면 Paraglide와 `typesafe-i18n`은 제외됩니다. `svelte-i18n`과 Intlayer는 출력물을 `node_modules`나 빌드 디렉터리에 보관합니다. Intlayer의 경우 `.content.ts` 파일은 직접 작성하는 소스 코드이며, 컴파일된 딕셔너리와 타입은 `.intlayer/`에 저장되어 gitignore 처리됩니다.

</Accordion>
<Accordion header="번역이 AI를 통해 생성될 예정인 경우">

중앙집중식 JSON을 유지해야 할 이유가 사라집니다. 코로케이션된 콘텐츠와 누락된 로케일을 채워주는 CLI를 사용하는 것이 훨씬 빠른 경로입니다. Intlayer의 `fill` 명령어는 사용자의 자체 API 키(OpenAI, Anthropic, Mistral, Gemini)로 실행되며 변경된 내용만 다시 번역합니다. Paraglide의 inlang 생태계는 자체 플랜을 갖춘 호스팅 솔루션을 제공합니다.

</Accordion>
</AccordionGroup>

## 각 라이브러리의 아쉬운 점

- **`svelte-i18n`**: 비교 대상 중 가장 무거움, 키 타입 미지원, 라우트별 분할 미지원, context를 직접 연결하지 않으면 SvelteKit에서 요청 간 상태가 누출되는 모듈 수준 store.
- **`typesafe-i18n`**: 별도의 watcher 프로세스 필요, 레포지토리에 파일 생성, 최근 개발 활동 정체.
- **Paraglide**: 레포지토리에 커밋되고 매 푸시 전 다시 생성되는 파일들, 병렬 브랜치에서의 머지 충돌, store 대신 각 메시지 호출마다 쿠키나 스토리지에서 로케일을 읽기 때문에 로케일 변경 시 오버헤드 발생.
- **`wuchale`**: 흥미로운 추출 방식이지만 아직 초기 단계임. React 벤치마크에서 프로바이더 리렌더링을 강제해야 하는 반응성 문제가 발생했으며 문서가 부족함.
- **Intlayer**: 필수 빌드 플러그인 필요, 상대적으로 작은 생태계, 부분적인 ICU 지원, 설계상 콘텐츠가 코드베이스 전체에 분산되어 있어 번역가를 위해 하나의 JSON으로 내보내려면 별도 도구가 필요함.

## 코드로 보는 각 옵션

제목과 복수형이 포함된 장바구니 요약 컴포넌트를 각 후보 라이브러리로 작성한 예시입니다. 중요한 부분은 마크업이 아니라 콘텐츠가 어디에 저장되는지, 로케일이 어떻게 보관되는지, 그리고 타입 체커가 무엇을 알고 있는지입니다.

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="스페인어">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

`intl-messageformat`을 통한 ICU 지원, 모듈 수준 store에 저장되는 로케일. `$_`는 모든 문자열을 허용하며 유일한 타입 지정은 직접 작성하는 union 타입뿐입니다.

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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

모든 메시지는 타입이 지정되어 생성된 함수이며, 호출되지 않으면 tree-shake됩니다. `paraglide/` 폴더가 레포지토리에 생성되고, 로케일은 store 대신 호출 시마다 읽힙니다.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```ts fileName="src/i18n/fr/index.ts"
import type { Translation } from "../i18n-types";

const fr = {
  cart: {
    title: "Votre panier",
    items: "{count} article{{s}}",
  },
} satisfies Translation;

export default fr;
```

  </Tab>
  <Tab value="es" label="스페인어">

```ts fileName="src/i18n/es/index.ts"
import type { Translation } from "../i18n-types";

const es = {
  cart: {
    title: "Tu carrito",
    items: "{count} artículo{{s}}",
  },
} satisfies Translation;

export default es;
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

Watcher 프로세스를 통해 생성되는 타입 접근자. 모델은 탄탄하지만 생성된 파일이 레포지토리에 남고 프로젝트 활동이 최근 뜸합니다.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
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
      ko: plural({ one: "{{count}}개 항목", other: "{{count}}개 항목" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

컴포넌트 옆 단일 파일에 모든 로케일이 포함됩니다. `useIntlayer`는 readable store를 반환하므로 `$content`는 익숙한 자동 구독 문법 그대로 동작하며, 로케일은 모듈 싱글톤 대신 context(SSR 안전)에 유지됩니다.

  </Tab>
</Tabs>

이미 `svelte-i18n`을 사용 중이신가요? [`@intlayer/svelte-i18n` 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/svelte-i18n.md)는 번들러 수준에서 패키지를 alias 처리하여, Intlayer가 콘텐츠를 제공하는 동안 `$_`, `$date`, `$number` 및 기존 플랫 키가 계속 작동하도록 지원합니다.

## 결정하기 전에 확인할 사항

기능 비교표는 라이브러리가 오늘 무엇을 할 수 있는지만 알려줍니다. 다음 항목들은 실제로 라이브러리를 유지보수하며 겪게 될 현실을 보여줍니다.

**레포지토리 활동을 확인하세요.**

커밋 내역, 이슈 응답 시간, 그리고 최근 마이너 릴리즈가 올해 있었는지 확인하세요. 메인테이너가 없는 훌륭한 설계는 언젠가 마이그레이션해야 할 시한폭탄과 같습니다.

**npm 다운로드 수만 보고 선택하지 마세요.**

가장 많이 다운로드된 라이브러리는 가장 먼저 출시된 라이브러리일 뿐, 2026년 Svelte 코드베이스에 가장 적합한 라이브러리가 아닙니다. 다운로드 수는 역사를 측정할 뿐, 적합성을 측정하지 않습니다.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**메인테이너를 누가 후원하고 무엇을 판매하는지 살펴보세요.**

`svelte-i18n`은 `next-intl` 및 `vue-i18n`과 마찬가지로 Crowdin의 후원을 받습니다. `i18next`는 Locize의 후원을 받습니다. Tolgee, Paraglide(inlang), Intlayer는 각각 자체 플랫폼을 운영합니다. 호스팅 번역이 주 수익원인 벤더는 개발 툴체인 내에서 무료 번역을 제공할 유인이 적습니다. Intlayer는 자체 API 키를 활용한 CLI 기반 AI 번역과 셀프 호스팅 가능한 CMS를 함께 제공하는 유일한 솔루션입니다.

**AI 에이전트에 대비되어 있나요?**

AI 에이전트는 여전히 i18n 처리에 어려움을 겪습니다. 로케일을 빠뜨리거나, 존재하지 않는 키를 지어내고, 메시지 문법을 혼동합니다. 에이전트가 콘텐츠를 나열하고 채우고 테스트할 수 있도록 라이브러리가 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)나 [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)를 제공하나요? 또한 콘텐츠 로딩이 기본적으로 최적화되어 있나요, 아니면 분기마다 누군가가 네임스페이스와 lazy import를 검토해야 하나요?

**기본으로 제공되는 타입 안전성.**

"추가 설정을 통해 타입을 지정할 수 있음"이 아니라 "새로 설치했을 때 잘못된 키가 `tsc`에서 즉시 실패함"을 의미합니다. 존재하지 않는 키를 사용할 때, 그리고 특정 로케일에 번역이 하나 누락되었을 때 어떤 일이 발생하는지 확인하세요.

**사용되지 않는 콘텐츠 감지.**

카탈로그는 늘어나기만 합니다. Intlayer의 빌드는 사용되지 않는 필드를 정리하고 로그를 남깁니다 (`build.purge`). Paraglide는 호출되지 않은 메시지 함수가 tree-shake되므로 아키텍처상 이 문제를 해결합니다. 그 외 다른 라이브러리들은 정리 작업을 개발자에게 맡깁니다.

**개발자 경험 (DX).**

첫 번역 문자열까지의 설정 시간, 마우스 호버 시 번역을 보여주고 선언부로 바로 이동하는 [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md) 또는 [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md), 번역 채우기, 테스트, 푸시를 위한 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md), 컴포넌트에 하드코딩된 문자열을 추출해 키 하나하나를 직접 관리하지 않아도 되게 해주는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) 또는 추출기, 그리고 비개발자가 풀 리퀘스트 없이 콘텐츠를 편집할 수 있는 방법([시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)).

## 자주 묻는 질문

<FAQ>

<Question title="2026년에도 svelte-i18n이 여전히 적절한 기본 선택인가요?">

작은 카탈로그를 가진 Vite SPA라면 그렇습니다. 가장 많은 문서가 존재하며 ICU 호환성은 많은 팀에게 중요합니다. 하지만 SvelteKit 환경이거나 수십 페이지를 넘어가는 경우 비용(타입 부재, 스코프 분리 부재, 공유 store 문제)이 누적되기 시작합니다.

</Question>

<Question title="Paraglide의 tree-shaking은 실제로 작동하나요?">

Vite + Svelte에서는 그렇습니다. 벤치마크에서 이를 확인했습니다. 반면 TanStack Start 또는 Next.js를 사용하는 React 환경에서는 동일 벤치마크에서 효과를 보지 못했습니다. 어느 쪽 결과든 맹신하기보다 본인의 기술 스택에서 직접 검증해 보세요.

</Question>

<Question title="Rune이 라이브러리 선택 기준을 바꾸나요?">

Rune은 자체 로케일 상태의 문법을 바꿀 뿐 상태 공유 문제를 해결하지는 않습니다. 중요한 것은 라이브러리의 런타임이 Svelte 5에서 rune을 지원하는지, 그리고 모듈 store 대신 context를 사용하는지 여부입니다. 두 가지 모두 확인하세요.

</Question>

<Question title="라이브러리 선택이 SEO에 영향을 미치나요?">

간접적으로 영향을 미칩니다. 크롤러는 라우팅, `hreflang`, `<html lang>`, 그리고 텍스트가 서버 렌더링된 HTML에 포함되어 있는지에 관심을 둡니다. [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)를 참고하세요.

</Question>

</FAQ>

## 더 알아보기

- [Svelte i18n 벤치마크: 번들 크기, 데이터 누출 및 로케일 전환 시간](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/svelte.md)
- [Svelte i18n: store, rune 그리고 모듈 수준의 함정](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/svelte.md) 및 [SvelteKit i18n: 라우팅, SSR 그리고 공유 상태](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/sveltekit.md)
- [드롭인 `svelte-i18n` 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/svelte-i18n.md)
- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)
- [컴파일러 vs 선언적 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)
- [컴포넌트별 vs 중앙집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
- [빌드 타임 번들 최적화 작동 방식](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)
- [Vite + Svelte 앱에 i18n 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+svelte.md) 및 [SvelteKit 앱에 i18n 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_svelte_kit.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_vue_i18n_library.md), [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_solid_i18n_library.md)를 위한 동일한 가이드
