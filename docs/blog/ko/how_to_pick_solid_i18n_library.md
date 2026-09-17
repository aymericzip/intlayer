---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026년 올바른 Solid i18n 라이브러리를 선택하는 방법"
description: SolidJS 및 SolidStart 국제화를 위한 결정 가이드. @solid-primitives/i18n, solid-i18next, Paraglide, Lingui, Intlayer를 비교하기 전에 답해야 할 질문들과 각 선택이 반응성(reactivity), 번들 크기 및 타입 정의에 미치는 영향을 알아봅니다.
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalization
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# 올바른 Solid i18n 라이브러리를 선택하는 방법

Solid의 반응성(reactivity) 모델은 i18n 라이브러리가 수행해야 하는 역할을 변화시킵니다. 컴포넌트는 한 번만 실행되므로, 셋업(setup) 시점에 `const`에 저장된 번역은 고정된(frozen) 문자열이 됩니다. 따라서 accessor 대신 문자열을 반환하는 라이브러리를 사용하면, 그렇게 작성된 세 개의 컴포넌트를 제외한 나머지 페이지에서만 언어가 전환되는 문제가 발생합니다. Solid용 라이브러리를 선택하는 것은 API 설계뿐만 아니라 이러한 실수를 방지하기 얼마나 쉬운지와도 직결됩니다.

이 가이드는 먼저 답해야 할 질문들을 정리한 후, Vite + Solid 및 SolidStart 환경을 기준으로 `@solid-primitives/i18n`, `solid-i18next`, Paraglide, `@lingui/solid`, Intlayer를 비교 매핑합니다.

![Solid i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 목차

<TOC/>

## 라이브러리를 비교하기 전에 답해야 할 6가지 질문

1. **Vite SPA인가요, SolidStart인가요?** SPA에서는 로케일이 signal 안에만 존재해도 충분합니다. SolidStart에서는 서버의 URL로부터 로케일을 해석해야 하며, 검색 엔진 크롤러가 JavaScript 없이 확인해야 하는 항목(`<html lang>`, `hreflang`)은 `entry-server.tsx`에 위치해야 합니다.
2. **로케일 변경이 얼마나 반응적(reactive)이어야 하나요?** 일부 앱에서는 언어 전환 시 전체 페이지 리로드가 허용될 수 있습니다. 그렇지 않다면 라이브러리의 값은 signal 또는 accessor여야 하며, 해당 값을 읽을 때 복사(copy)가 아닌 추적(track)이 이루어져야 합니다.
3. **누가 번역을 작성하나요?** 개발자, TMS, ICU 문자열을 제공하는 에이전시, 또는 AI 파이프라인. `solid-i18next`는 i18next의 포맷을 사용합니다. `@solid-primitives/i18n`은 딕셔너리 객체 구조를 그대로 따릅니다. 작업 방식에 맞는 도구를 선택하세요.
4. **로케일과 페이지 수는 얼마나 되나요?** 2개 로케일과 5개 페이지라면 모든 번역을 한 번에 번들링해도 무방합니다. 하지만 10개 로케일과 40개 라우트라면 불가능하며, 지연 로딩(lazy catalogs)과 스코핑(scoping)이 주요 비용 요인이 됩니다.
5. **키(key)에 대한 타입이 필요한가요?** `@solid-primitives/i18n`은 원본 딕셔너리로부터 타입을 추론합니다. `solid-i18next`는 수동 선언이 필요합니다. 컴파일 타임 라이브러리들은 타입을 자동 생성합니다.
6. **얼마나 많은 기능이 필요한가요?** 쿠키 관리, 로케일 접두사 라우팅(locale-prefixed routing), 리다이렉트, 포매터. 가장 가벼운 옵션은 이러한 기능이 전혀 없으며, 필요해지기 전까지는 문제없습니다.

답변을 적어두세요. 아래의 모든 내용은 이 답변들을 기준으로 설명합니다.

## 한눈에 보는 라이브러리 환경

Solid는 비교적 최신 생태계로 선택지가 적은 편이며, 3세대에 걸쳐 발전해 왔습니다.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="런타임 딕셔너리: solid-i18next">

Solid용으로 래핑된 i18next입니다. 네임스페이스, 백엔드, 감지기(detectors), 10년간 축적된 플러그인을 제공합니다. 선택지 중 가장 무거우며, React와 동일한 `t("a.b")` 비용이 발생합니다.

</Accordion>
<Accordion header="최소한의 프리미티브 (2022): @solid-primitives/i18n">

직접 관리하는 평면(flat) 딕셔너리, accessor를 반환하는 `translator()`, 원본 객체에서 추론되는 타입. 매우 가볍지만 스코핑, 라우팅, 포매터가 없습니다. 커뮤니티의 기본 선택지입니다.

</Accordion>
<Accordion header="컴파일러 및 코로케이션 콘텐츠 (2024 ~ 2026): Paraglide, Intlayer, @lingui/solid">

Paraglide는 메시지당 하나의 함수를 생성합니다. Intlayer는 컴포넌트별로 `.content.ts` 파일에 콘텐츠를 선언하고 signal 기반 노드를 반환합니다. Lingui의 Solid 바인딩은 2026년에 출시되었으며 매크로 기반 추출 기능을 제공합니다.

</Accordion>
</AccordionGroup>

[JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)에서 각 세대를 자세히 다룹니다.

## 가장 중요한 결정: 콘텐츠가 위치하는 곳과 로드되는 시점

설정 간 번들 크기 차이의 대부분은 두 가지 구조적 선택에서 비롯됩니다.

- **중앙 집중형 vs 컴포넌트별 스코핑 콘텐츠.** 앱 전체를 위한 하나의 딕셔너리인지, 컴포넌트당 하나의 선언인지.
- **정적 vs 동적 임포트.** 시작 시 모든 것을 로드하는지, 활성 로케일(이상적으로는 활성 라우트까지)을 온디맨드로 가져오는지.

다음 그래프는 페이지당 약 30 KB의 텍스트를 포함하고 1~10개 로케일로 번역된 1~10개 페이지 규모의 가상 앱에 대한 페이로드를 추정한 것입니다.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`@solid-primitives/i18n`은 두 축 모두 기본 제공하지 않습니다. 로케일당 딕셔너리를 `createResource`하여 동적 로딩을 구현할 수 있으며, 나머지는 직접 구현해야 합니다. `solid-i18next`는 네임스페이스와 지연 로딩 백엔드를 갖추고 있지만 매핑을 강제하지 않으므로, `common`을 임포트하는 공통 컴포넌트가 모든 라우트의 의존성이 됩니다. Paraglide는 tree-shaking을 통해 페이지 단위 분할을 달성하지만, [Solid 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/solid.md) 구현에서는 적용되지 않았습니다. Intlayer는 컴포넌트별 선언을 통해 이를 해결합니다.

질문 4에 대한 답변이 "많은 페이지"였다면, 어떤 API 선호도보다 이 섹션을 중요하게 고려하세요. [컴포넌트 단위 vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md) 글에서 동일한 트레이드오프의 유지보수 측면을 다룹니다.

## 라이브러리 후보군

라이브러리 크기는 [Solid 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/solid.md) 기준입니다. 10개 페이지, 10개 로케일 앱에서 번들링, tree-shaking, minification 후 빈 컴포넌트 내의 provider와 accessor를 측정한 수치입니다. 콘텐츠 크기는 별도로 측정됩니다.

| 라이브러리               | 콘텐츠 모델                            | 로케일 변경 시 반응성                   | 타입 안전성                    | 스코핑 및 지연 로딩          | 라이브러리 크기                                   |
| :----------------------- | :------------------------------------- | :-------------------------------------- | :----------------------------- | :--------------------------- | :------------------------------------------------ |
| `@solid-primitives/i18n` | 직접 관리하는 평면 딕셔너리            | Signal, translator가 반환하는 accessor  | 3/5 — 원본 딕셔너리로부터 추론 | 기본 내장 없음               | ~0.6 kB                                           |
| `solid-i18next`          | i18next 카탈로그 및 네임스페이스       | Store, provider를 통한 리렌더링         | 2/5 — 수동 선언                | 네임스페이스, 지연 백엔드    | ~14.9 kB                                          |
| Paraglide                | inlang 프로젝트, 생성된 함수들         | 매 호출마다 쿠키 또는 스토리지에서 읽음 | 3.5/5 — 생성됨                 | Tree-shaking (벤치마크 제외) | 거의 0에 가까움 (코드베이스에 생성되는 코드 때문) |
| `@lingui/solid`          | 코드 내 소스 텍스트, 컴파일된 카탈로그 | Signal 기반                             | 2/5 — 컴파일러에서 제공        | 카탈로그별                   | ~11.8 kB                                          |
| Intlayer                 | 컴포넌트당 하나의 `.content.ts`        | Signal 기반 노드, 컴포넌트 재실행 없음  | 5/5 — 생성됨, 기본 활성화      | 지원됨, 컴포넌트별           | ~4.3 kB                                           |

> 수치는 벤치마크 당시 버전 기준의 스냅샷입니다. `@lingui/solid` 크기는 TanStack Start 벤치마크 값입니다. 크기만으로 결정하기 전에 직접 앱에서 테스트해보세요.
> 타입 안전성: 5/5는 URL 포맷터와 헬퍼를 포함하여 키, 매개변수, 모든 로케일이 수동 설정 없이 검사됨을 의미합니다.

Paraglide의 라이브러리 크기가 거의 0에 가까운 것은 구조적 특성 때문입니다. 런타임이 저장소 내에 직접 생성됩니다. Intlayer는 `vite-intlayer`가 필요하므로 빌드 단계 없이 실행할 수 없습니다.

## 답변에 맞는 라이브러리 선택하기

<AccordionGroup>
<Accordion header="Vite SPA, 작은 카탈로그, 방해 요소 없이 단순함을 원할 때">

`@solid-primitives/i18n`. 평면 딕셔너리, accessor를 반환하는 `translator()`, 별도 설정 없이 추론되는 타입. 소규모 앱에 적합하며 소스 코드를 읽는 데 10분이면 충분합니다. 직접 작성해야 할 항목: 로케일 영속성(persistence), 라우팅, 포매터, 라우트별 코드 분할. 이 목록이 늘어난다면 다른 도구로 이전할 신호입니다.

</Accordion>
<Accordion header="i18next 기반의 React 코드베이스에서 이전하는 경우">

`solid-i18next`를 사용하면 카탈로그, 네임스페이스, 백엔드, 감지기를 그대로 재사용할 수 있습니다. 가장 무거운 옵션이며 `react-i18next`와 동일한 비용(수동 타입 선언, 가능하지만 시간 소모가 큰 최적화 작업, 문자열을 반환하는 `t()`로 인해 번역 고정 버그가 발생하기 쉬움)을 수반합니다. 읽기 호출을 JSX나 memo로 감싸고 셋업 시점에 저장하지 마세요.

</Accordion>
<Accordion header="로케일 접두사 라우트와 SSR이 필요한 SolidStart">

서버와 클라이언트가 일치하도록 서버의 URL에서 로케일을 가져와야 합니다. 클라이언트에서 감지하는 것은 너무 늦습니다. `@solid-primitives/i18n`과 `solid-i18next`는 `[[locale]]` 라우트, `matchFilters`, 리다이렉트, `entry-server.tsx` 태그 처리를 개발자에게 맡깁니다. Paraglide는 라우팅을 처리하는 Vite 플러그인을 제공합니다. Intlayer는 미들웨어와 라우트 헬퍼를 제공합니다. 어떤 라이브러리를 선택하든 `<html lang>`과 `hreflang`을 `entry-server.tsx`에 넣으세요. SolidStart v2에서 `@solidjs/meta`는 hydration 이후 클라이언트에서 적용됩니다. [Solid i18n 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/solid.md)에서 해당 설정을 자세히 다룹니다.

</Accordion>
<Accordion header="로케일 변경이 즉각적이고 세분화(fine-grained)되어야 할 때">

값이 signal 또는 accessor이고 읽기 작업이 추적되는 라이브러리를 선택하세요. `@solid-primitives/i18n` accessor와 Intlayer 노드는 컴포넌트 재실행 없이 해당 값을 읽는 DOM 노드만 업데이트합니다. `solid-i18next`는 provider를 통해 리렌더링합니다. Paraglide는 signal 대신 각 메시지 호출 시 쿠키나 스토리지에서 로케일을 읽으므로, 동작은 하지만 노드당 불필요한 작업이 발생합니다.

</Accordion>
<Accordion header="많은 라우트와 엄격한 번들 예산이 있는 대규모 앱">

빌드 타임에 컴파일되는 스코프 기반 콘텐츠를 선택하세요. Intlayer는 라우트가 렌더링하는 데 필요한 것만 전달합니다. Paraglide는 tree-shaking을 통해 이를 달성해야 하므로 설정에서 직접 확인하세요(벤치마크에서는 적용되지 않음). `solid-i18next`를 사용하는 경우 첫날부터 네임스페이스 및 지연 로딩 전략을 계획하고 코드 리뷰에서 이를 강제해야 합니다.

</Accordion>
<Accordion header="타입 안전성이 절대적으로 중요한 경우">

`@solid-primitives/i18n`은 별도 작업 없이 추론된 타입을 제공하며, 이는 대부분의 React 라이브러리가 제공하는 것 이상입니다. 지연 로딩과 라우트별 분할 이후에도 유지되는 생성 타입을 원한다면 Paraglide, `@lingui/solid`, Intlayer 모두 콘텐츠로부터 타입을 생성합니다. [누락된 번역 감지](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md) 글에서 각 라이브러리가 빌드 타임에 무엇을 감지하는지 비교합니다.

</Accordion>
<Accordion header="번역을 AI로 생성할 예정인 경우">

중앙 집중식 딕셔너리를 유지할 이유가 사라집니다. 코로케이션된 콘텐츠와 누락된 로케일을 채워주는 CLI를 함께 사용하는 것이 더 빠른 길입니다. Intlayer의 `fill` 명령어는 사용자의 자체 API 키(OpenAI, Anthropic, Mistral, Gemini)를 활용하며 변경된 내용만 다시 번역합니다.

</Accordion>
</AccordionGroup>

## 각 라이브러리의 한계점

- **`@solid-primitives/i18n`**: 직접 구축하지 않는 한 지연 로딩이나 스코핑 부재, 라우팅 미지원, 쿠키 처리 미지원, 포매터 없음. 소규모 앱에는 훌륭하지만 프로덕션 환경에서는 빠르게 한계에 부딪힙니다.
- **`solid-i18next`**: 가장 무거운 번들 크기, 수동 타입 정의, 독자적인 복수형 포맷, `t()`가 문자열을 반환하여 셋업 시점에 저장할 경우 번역이 고정되는 문제.
- **Paraglide**: 생성된 파일을 저장소에 커밋하고 푸시 전마다 재생성해야 함, Solid 벤치마크에서 tree-shaking이 적용되지 않음, 로케일을 signal이 아닌 호출당 스토리지에서 읽음.
- **`@lingui/solid`**: 2026년 신규 출시로 프로덕션 피드백이 적음. Lingui의 `extract` / `compile` 빌드 단계와 여러 겹치는 문법을 그대로 계승.
- **Intlayer**: 필수 빌드 플러그인 필요, 비교적 작은 생태계, 부분적인 ICU 지원, 구조상 콘텐츠가 코드베이스 전반에 분산되어 있어 번역가를 위한 단일 JSON 내보내기 시 별도 도구가 필요함.

## 코드로 살펴보는 각 옵션

제목과 복수형을 포함하는 장바구니 요약 컴포넌트를 각 후보 라이브러리로 작성한 예시입니다. 번역이 어디서 읽히는지 주의 깊게 살펴보세요. JSX 내부에서는 추적(track)되지만, setup 본문에서는 고정된(frozen) 문자열이 됩니다.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```ts fileName="src/i18n/en.ts"
export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```ts fileName="src/i18n/fr.ts"
import type { en } from "./en";

export const fr: typeof en = {
  cart: { title: "Votre panier", items: "{{ count }} articles" },
};
```

  </Tab>
  <Tab value="es" label="스페인어">

```ts fileName="src/i18n/es.ts"
import type { en } from "./en";

export const es: typeof en = {
  cart: { title: "Tu carrito", items: "{{ count }} artículos" },
};
```

  </Tab>
  </Tabs>

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";
import { en } from "./en";

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

코드 생성(codegen) 없이 영어 객체로부터 키 타입이 추론됩니다. 복수형 규칙, 지연 로딩, 라우팅은 없으며 각각 직접 추가해야 합니다.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="public/locales/fr/cart.json"
{
  "title": "Votre panier",
  "items_one": "{{count}} article",
  "items_other": "{{count}} articles"
}
```

  </Tab>
  <Tab value="es" label="스페인어">

```json fileName="public/locales/es/cart.json"
{
  "title": "Tu carrito",
  "items_one": "{{count}} artículo",
  "items_other": "{{count}} artículos"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

i18next 카탈로그, 네임스페이스, 플러그인을 그대로 사용합니다. `t`가 문자열을 반환하므로 setup 시점에 `const title = t("cart:title")`을 작성하면 고정됩니다. 호출을 JSX 내부에 유지하세요.

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

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

모든 메시지는 타입이 지정되어 생성된 함수입니다. 로케일은 signal이 아닌 매 호출 시 쿠키 또는 스토리지에서 읽으므로, 전환 시의 반응성은 직접 연결해야 합니다.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      ko: "장바구니",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: plural({
      one: t({
        ko: "{{count}}개 항목",
        en: "{{count}} item",
        fr: "{{count}} article",
      }),
      other: t({
        ko: "{{count}}개 항목",
        en: "{{count}} items",
        fr: "{{count}} articles",
      }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

모든 로케일이 컴포넌트 옆의 단일 파일에 위치합니다. `useIntlayer`는 signal 기반 노드를 반환하므로, 로케일이 변경되어도 해당 노드를 읽는 DOM 노드만 업데이트됩니다. JSX 내의 `{content.title}`은 추적되지만, setup 본문 내의 `content.title.value`는 추적되지 않습니다.

  </Tab>
</Tabs>

기존 i18next 코드베이스에서는 [i18next 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md)를 통해 번들러 수준에서 패키지를 별칭(alias) 처리할 수 있어, Intlayer가 콘텐츠를 제공하는 동안에도 카탈로그와 `t()`가 계속 작동합니다. 자세한 내용은 [마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)에서 다룹니다.

## 도입 전 고려할 점

기능 비교표는 라이브러리가 현재 무엇을 할 수 있는지를 보여줍니다. 아래 항목들은 실제로 라이브러리를 유지보수하며 겪게 될 경험을 알려줍니다.

**저장소 활동성을 확인하세요.**

커밋 내역, 이슈 응답 시간, 최신 마이너 릴리스가 올해 있었는지 여부를 확인하세요. 메인테이너가 없는 훌륭한 설계는 언젠가 마이그레이션해야 할 부채가 됩니다.

**npm 다운로드 수만 보고 선택하지 마세요.**

가장 많이 설치된 라이브러리는 가장 먼저 출시된 라이브러리일 뿐, 2026년의 Solid 코드베이스에 가장 적합한 라이브러리가 아닐 수 있습니다. 다운로드 수는 역사를 측정할 뿐 적합성을 측정하지 않습니다.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**메인테이너에게 자금을 지원하는 주체와 그들의 비즈니스 모델을 확인하세요.**

`i18next`(`solid-i18next`의 기반)는 Locize의 지원을 받습니다. `next-intl`, `vue-i18n`, `svelte-i18n`, Lingui는 Crowdin의 지원을 받습니다. Tolgee, Paraglide(inlang), Intlayer는 각각 자체 플랫폼을 운영합니다. 호스팅 번역 서비스가 주 수익원인 벤더는 개발 도구 체인 내에서 번역을 무료로 제공할 유인이 적습니다. Intlayer는 자체 API 키를 활용한 CLI 기반 AI 번역과 셀프 호스팅 가능한 CMS를 제공하는 유일한 도구입니다.

**AI 에이전트에 준비되어 있나요?**

에이전트는 여전히 i18n 작업에 어려움을 겪습니다. 로케일을 빠뜨리거나, 임의의 키를 만들고, 메시지 문법을 혼동합니다. 라이브러리가 에이전트가 콘텐츠를 나열하고 채우며 테스트할 수 있도록 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)나 [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)를 제공하나요? 또한 콘텐츠 로딩이 기본적으로 최적화되어 있나요, 아니면 분기마다 네임스페이스와 지연 임포트를 수동으로 검토해야 하나요?

**기본으로 제공되는 타입 안전성.**

"추가 설정으로 타입을 맞출 수 있다"가 아니라 "새로 설치했을 때 잘못된 키가 `tsc`에서 에러를 발생시키는가"가 중요합니다. 존재하지 않는 키를 전달했을 때, 그리고 특정 번역이 누락된 로케일에서 어떤 일이 발생하는지 확인하세요.

**사용되지 않는 콘텐츠 감지.**

카탈로그는 늘어나기만 합니다. Intlayer 빌드는 사용되지 않는 필드를 제거(purge)하고 로그를 남깁니다(`build.purge`). Paraglide는 호출되지 않은 메시지 함수가 tree-shaking되므로 구조적으로 이를 달성합니다. 다른 모든 도구는 정리 작업을 개발자에게 맡깁니다.

**개발자 경험(DX).**

첫 번째 번역 문자열까지의 설정 시간, 마우스 호버 시 번역을 보여주고 선언부로 이동할 수 있는 [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md) 또는 [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md), 채우기/테스트/푸시를 위한 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md), 컴포넌트에 하드코딩된 문자열을 추출해 키 하나하나를 직접 관리하지 않아도 되게 해주는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) 또는 추출기, 비개발자가 풀 리퀘스트 없이 콘텐츠를 수정할 수 있는 방법([시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md))의 유무를 살펴보세요.

## 자주 묻는 질문

<FAQ>

<Question title="@solid-primitives/i18n으로 프로덕션 앱에 충분한가요?">

소규모 앱이라면 충분하며, 사용할 수 있는 가장 가벼운 옵션입니다. 라우트별 지연 카탈로그, SolidStart에서의 로케일 라우팅, 쿠키 영속성, 포매터가 필요한 시점에는 이 모든 것을 직접 구현해야 하므로 한계에 부딪히게 됩니다.

</Question>

<Question title="로케일이 변경될 때 번역이 업데이트되지 않는 이유는 무엇인가요?">

Solid 컴포넌트는 한 번만 실행되기 때문입니다. 셋업 시점에 `const`로 읽어온 번역은 구독(subscription)이 아닌 단순 문자열입니다. JSX, effect, memo 내부에서 읽거나, 잘못 작성하기 어렵도록 값이 accessor 형태인 라이브러리를 선택하세요.

</Question>

<Question title="컴파일러 기반 라이브러리가 필요한가요?">

번들 크기, 자동 생성 타입, 빌드 타임 누락 키 검사가 실제 필수 요구사항인 경우에만 필요합니다. [컴파일러 vs 선언적 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md) 글에서 컴파일러가 제공하는 이점과 발생할 수 있는 문제점을 설명합니다.

</Question>

<Question title="라이브러리 선택이 SEO에 영향을 미치나요?">

간접적으로 영향을 미칩니다. 검색 엔진 크롤러는 라우팅, `hreflang`, `<html lang>`, 그리고 텍스트가 서버 렌더링 HTML에 포함되어 있는지를 중요하게 보며, SolidStart에서는 이것이 `entry-server.tsx`를 의미합니다. 자세한 내용은 [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)를 참조하세요.

</Question>

</FAQ>

## 더 알아보기

- [Solid i18n 벤치마크: 번들 크기, 누수(leakage) 및 로케일 전환 타이밍](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/solid.md)
- [Solid i18n: 로케일 변경 시 번역이 고정되는 이유](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/solid.md)
- [드롭인 i18next 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md) 및 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)
- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)
- [컴파일러 vs 선언적 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)
- [컴포넌트 단위 vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
- [빌드 시 번들 최적화 원리](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)
- [Vite + Solid 앱에서 i18n 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+solid.md) 및 [SolidStart 앱에서 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_solid_start.md)
- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_react_i18n_library.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_svelte_i18n_library.md)용 동일 가이드
