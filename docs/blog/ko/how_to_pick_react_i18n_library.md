---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026년 올바른 React i18n 라이브러리를 선택하는 방법"
description: React 국제화를 위한 결정 가이드. react-i18next, react-intl, Lingui, use-intl, Paraglide, Intlayer를 비교하기 전에 답해야 할 질문들과 각 선택이 번들 크기, 타입 정의 및 유지보수에 미치는 영향을 알아봅니다.
keywords:
  - react i18n
  - react internationalization
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# 올바른 React i18n 라이브러리를 선택하는 방법

React는 기본 i18n 프리미티브를 제공하지 않습니다. 첫날 선택한 라이브러리가 번역 저장 방식, 번들 포함 방식, 향후 수년간 개발자가 직접 감당해야 할 작업의 양을 결정합니다. 대부분의 팀은 인기도를 기준으로 선택했다가, 키가 2,000개에 도달했을 때 비로소 트레이드오프를 깨닫게 됩니다.

이 가이드는 반대로 접근합니다. 먼저 프로젝트에 대한 몇 가지 질문에 답한 다음, 해당 답변에 맞는 라이브러리를 매핑합니다. 이 글은 순수 React(Vite, React Router, TanStack Start)에 초점을 맞춥니다. Next.js는 고유한 제약 사항이 있으며, 이는 [Next.js 비교](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)에서 다룹니다.

![React i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## 목차

<TOC/>

## 라이브러리를 비교하기 전에 답해야 할 6가지 질문

자신에게 어떤 기준이 중요한지 모른다면 기능 비교표는 무용지물입니다. 다음 항목을 먼저 검토하세요.

1. **앱이 어떻게 렌더링되나요?** SPA 전용, hydration을 포함한 SSR, 또는 React Server Components(RSC). Context 기반 hook은 SPA 어디서나 작동합니다. RSC에서는 hook을 사용하면 텍스트를 렌더링하는 모든 컴포넌트에 `"use client"`가 강제되므로 서버 사이드 API도 필요합니다.
2. **누가 번역을 작성하나요?** 개발자, TMS를 사용하는 사내 팀, ICU 파일을 전달하는 에이전시, 또는 AI 파이프라인. 이는 어떤 API 세부사항보다 카탈로그 형식을 직접적으로 결정합니다.
3. **로케일과 페이지 수는 얼마나 되나요?** 2개 로케일과 5개 페이지라면 모든 번역을 한 번에 전송해도 괜찮습니다. 하지만 10개 로케일과 50개 라우트라면 불가능하며, 로딩 전략이 주요 비용 요인이 됩니다.
4. **키에 대한 타입이 필요한가요?** `t("checkout.totl")`과 같은 오타는 타입을 직접 연결하지 않는 한 모든 키 기반 라이브러리에서 그대로 컴파일됩니다. 이를 감수할 수 있는지 결정하세요.
5. **문자열에 무엇이 포함되나요?** 일반 텍스트, 복수형(plurals), 또는 중간에 `<Link>`가 포함된 문장. 리치 콘텐츠(rich content)는 대부분의 API가 다루기 까다로워지는 영역입니다.
6. **프로젝트 수명이 얼마나 되나요?** 3개월짜리 프로토타입과 5년 동안 유지될 프로덕션 제품은 필요한 빌드 도구의 규모가 다릅니다.

답변을 적어두세요. 아래의 모든 내용은 이 답변들을 기준으로 설명합니다.

## 한눈에 보는 라이브러리 환경

지난 15년간의 JavaScript i18n 역사는 4개의 아키텍처 흐름으로 나뉘며, 비교 대상 React 라이브러리들도 서로 다른 세대에 속해 있습니다.

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="런타임 딕셔너리 (2011 ~ 2017): i18next, react-intl">

메모리에 로드되는 JSON 카탈로그, 런타임에 조회되는 `t("a.b")`, 브라우저에서 파싱되는 ICU 또는 커스텀 문법. 가장 큰 생태계를 갖추고 있지만 런타임이 가장 무겁고, 타입 지원은 선택 사항입니다.

</Accordion>
<Accordion header="컴파일 타임 매크로 (2018 ~ 2021): Lingui, typesafe-i18n">

빌드 시 메시지를 추출하여 컴팩트한 카탈로그로 컴파일하고 인자를 타입화합니다. 더 작은 번들을 얻는 대신 추가 빌드 단계(`extract`, `compile`)가 필요합니다.

</Accordion>
<Accordion header="서버 우선 (2022 ~ 2024): use-intl / next-intl">

SSR 및 Server Components를 중심으로 설계되었습니다. 서버에서 렌더링하고 클라이언트가 필요한 부분만 hydrate합니다. 여전히 키 기반 및 중앙집중식 방식을 따릅니다.

</Accordion>
<Accordion header="컴파일러 및 코로케이션 콘텐츠 (2024 ~ 2026): Paraglide, Intlayer, wuchale">

콘텐츠가 트리 쉐이킹 가능한 함수나 컴포넌트별 딕셔너리로 컴파일됩니다. 타입이 자동 생성되고, 누락된 번역이 있으면 빌드가 실패하며, CLI에서 AI 번역을 실행할 수 있습니다.

</Accordion>
</AccordionGroup>

[JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)에서 각 흐름이 이전 세대의 문제를 어떻게 해결했는지 자세히 확인할 수 있습니다.

## 가장 중요한 결정: 콘텐츠의 위치와 로딩 시점

모든 React i18n 라이브러리는 store, provider, hook이라는 동일한 구조를 가집니다. provider가 받는 데이터는 모두 클라이언트 번들이나 hydration 페이로드에 포함됩니다. 따라서 두 가지 구조적 선택이 핵심입니다:

- **중앙집중식 vs 범위 제한(scoped) 콘텐츠.** 앱 전체를 위한 하나의 `en.json`을 둘 것인지, 컴포넌트별(또는 네임스페이스별) 선언을 둘 것인지.
- **정적 import vs 동적 import.** 시작 시 모든 것을 번들링할 것인지, 활성 로케일과 라우트를 필요에 따라 온디맨드로 가져올 것인지.

아래 그래프는 페이지당 약 30KB의 텍스트가 포함된 1~10개 페이지와 1~10개 로케일로 번역된 가상 앱의 페이로드를 추정한 것입니다.

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

정적 import를 사용하는 중앙집중식 콘텐츠는 두 축 모두에서 증가합니다. 10개 페이지 x 10개 로케일은 모든 페이지에서 300KB의 텍스트를 의미합니다. 동적 import는 로케일 축의 부담을 없앱니다. 범위 제한(scoping)은 페이지 축의 부담을 없앱니다. 오직 두 가지를 조합해야만 일정한 크기를 유지할 수 있습니다.

이는 라이브러리 자체의 특성이 아니라 관리 규율의 문제입니다. `react-i18next`는 네임스페이스와 lazy 백엔드로 범위를 나눌 수 있고, `use-intl`은 라우트별로 분할할 수 있습니다. 하지만 이를 강제하는 장치가 없기 때문에, 공유 컴포넌트인 `<Button>`이 `t("common:cta")`를 참조하는 순간 `common` 네임스페이스가 모든 라우트의 의존성이 되어 버립니다. [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)에서는 이를 "다른 라우트로부터의 누수" 및 "다른 로케일로부터의 누수"로 측정하며, 라이브러리 간의 격차 대부분이 여기서 발생합니다.

3번 질문에 "많은 로케일, 많은 페이지"라고 답했다면 어떤 API 선호도보다 이 섹션을 중요하게 고려하세요. [컴포넌트별 vs 중앙집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md) 포스트에서 동일한 선택의 유지보수 측면을 더 깊이 다룹니다.

## 후보 라이브러리

라이브러리 크기는 [TanStack Start 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)를 기준으로 합니다. 빈 컴포넌트에서 provider와 hook을 번들링, 트리 쉐이킹, minification을 거친 후 측정한 수치이며(10개 페이지, 10개 로케일), 콘텐츠 크기는 별도로 측정되었습니다.

| 라이브러리              | 세대         | 콘텐츠 모델                            | 타입 안전성                        | 메시지 포맷                   | 라이브러리 크기                                   |
| :---------------------- | :----------- | :------------------------------------- | :--------------------------------- | :---------------------------- | :------------------------------------------------ |
| `react-i18next`         | Runtime      | 중앙 JSON, 네임스페이스                | 2/5 — 옵트인 (`CustomTypeOptions`) | i18next (접미사 복수형)       | ~18.4 kB                                          |
| `react-intl` (FormatJS) | Runtime      | 중앙 JSON, ICU                         | 2/5 — 옵트인 (추출 + 유니온)       | ICU                           | ~15.3 kB                                          |
| `use-intl`              | Server-first | 중앙 JSON, ICU                         | 2/5 — 옵트인 (declaration merging) | ICU                           | ~14.1 kB                                          |
| `@tolgee/react`         | Runtime      | 중앙 집중, 인컨텍스트 편집             | 1/5 — 미지원                       | ICU                           | ~11.1 kB                                          |
| Lingui                  | Macro        | 코드 내 소스 텍스트, 컴파일된 카탈로그 | 2/5 — 우수 (컴파일러 지원)         | 매크로를 통한 ICU             | ~11.8 kB                                          |
| Paraglide               | Compiler     | inlang 프로젝트, 생성된 함수           | 3.5/5 — 자동 생성                  | 자체 포맷                     | 거의 0에 가까움 (코드베이스에 생성되는 코드 때문) |
| Intlayer                | Compiler     | 컴포넌트별 `.content.ts`               | 5/5 — 자동 생성, 기본 활성화       | Intlayer (+ ICU, i18next, PO) | ~5.0 kB                                           |

> 수치는 벤치마크 테스트 당시 버전 기준이며 릴리스에 따라 달라집니다. 크기만으로 결정하기 전에 자체 앱에서 직접 벤치마크를 실행해 보세요.
> 타입 안전성: 5/5는 URL 포맷터와 헬퍼를 포함하여 키, 매개변수, 모든 로케일이 수동 설정 없이 검사됨을 의미합니다.

위 표에 나타나지 않는 두 가지 사항이 있습니다. `Paraglide`는 코드베이스에 코드를 직접 생성하므로 라이브러리 크기가 거의 없지만, 매 커밋 전 재생성 단계가 필요하고 생성된 파일에서 머지 충돌이 발생할 수 있습니다. 그리고 `Intlayer`는 번들러 플러그인(`vite-intlayer` 등)이 필수적이므로 빌드 과정이 없는 환경에서는 사용할 수 없습니다.

## 답변에 맞는 라이브러리 찾기

<AccordionGroup>
<Accordion header="프로토타입, 소규모 팀, 적은 로케일 수">

작동하는 가장 단순한 도구를 선택하고 과도한 투자를 피하세요. 로케일당 단일 JSON을 사용하는 `react-i18next`로도 충분하며, 지난 10년간 쌓인 Stack Overflow 답변들이 시간을 절약해 줄 것입니다. 필요해지기 전까지는 네임스페이스 설정을 건너뛰어도 좋습니다. 프로토타입이 정식 제품이 된다면 범위 제한 콘텐츠로 마이그레이션할 계획을 세우세요. [react-i18next 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-i18next.md)를 사용하면 점진적으로 전환할 수 있습니다.

</Accordion>
<Accordion header="번역이 ICU를 지원하는 에이전시나 TMS에서 제공되는 경우">

카탈로그 형식이 이미 결정된 상태입니다. `react-intl`은 ICU 네이티브이며 FormatJS 추출 도구는 해당 파이프라인에 맞춰져 있습니다. `use-intl` 역시 ICU를 지원합니다. `react-i18next`는 ICU 플러그인이 필요하며, 그렇지 않으면 자체 복수형 키를 사용해야 합니다. Intlayer의 ICU 지원은 아직 일부 작업 중이므로, 현재 ICU 문자열을 직접 전달받는다면 완벽히 지원될 때까지 이를 검토 요소로 삼아야 합니다.

</Accordion>
<Accordion header="대규모 앱, 많은 라우트, 번들 크기가 중요한 경우">

규칙이 아닌 기본 동작으로서 범위 제한 콘텐츠와 동적 로딩을 지원하는 라이브러리를 선호하세요. `Lingui`와 `Paraglide`는 컴파일을 통해 이를 달성합니다. Intlayer는 컴포넌트별 선언을 통해 이를 구현하며, 컴파일러가 라우트에서 렌더링하는 콘텐츠만 전송합니다. `react-i18next`나 `use-intl`을 사용한다면 네임스페이스와 lazy 로딩 전략을 첫날부터 계획하고 코드 리뷰에서 엄격히 관리해야 합니다. 도구가 이를 자동으로 강제해주지 않기 때문입니다.

</Accordion>
<Accordion header="타입 안전성이 필수적인 경우">

모든 키 기반 라이브러리는 타입을 지원할 수 있지만, 기본으로 활성화된 경우는 거의 없습니다. lazy 로딩되는 네임스페이스에 맞춰 declaration merging을 직접 유지보수하고 싶지 않다면, 콘텐츠로부터 타입이 자동 생성되는 라이브러리(`Lingui`, `Paraglide`, Intlayer)를 선택하세요. [누락된 번역 감지](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md) 글에서 각 라이브러리가 빌드 타임에 무엇을 감지하는지 비교합니다.

</Accordion>
<Accordion header="리치 콘텐츠가 많은 경우: 마크다운, 문장 내 링크, 로케일별 컴포넌트">

리치 노드는 `t()`가 단순 문자열을 반환하는 방식의 한계가 드러나는 지점입니다. `react-i18next`와 `Lingui`는 `<Trans>`를 제공하고, `react-intl`은 리치 텍스트 태그를 제공하지만, 모두 일반 문자열 방식보다 사용하기 번거롭습니다. Intlayer의 콘텐츠 노드는 JSX, 마크다운, 중첩 객체를 직접 지원하므로 콘텐츠가 단순 UI 라벨 이상일 때 훨씬 적합합니다.

</Accordion>
<Accordion header="AI가 번역을 생성하고 개발자가 검토하는 경우">

가져올 TMS가 없다면 중앙집중식 JSON은 더 이상 필수가 아닙니다. 코로케이션(colocated)된 콘텐츠와 누락된 로케일을 채워주는 CLI 조합이 가장 빠른 방법입니다. Intlayer의 `fill` 명령어는 사용자의 자체 API 키(OpenAI, Anthropic, Mistral, Gemini)를 사용하여 변경된 내용만 번역합니다. Paraglide와 Tolgee는 자체 플랜을 통해 호스팅되는 유사 기능을 제공합니다.

</Accordion>
<Accordion header="향후 Next.js App Router로 이전할 가능성이 있는 경우">

React context는 서버와 클라이언트 경계를 넘지 못합니다. 클라이언트 hook에만 의존하는 라이브러리(`react-i18next`, `react-intl`)는 RSC를 도입하는 순간 별도의 서버 API가 필요하게 됩니다. `use-intl`(`next-intl`로 제공)과 Intlayer(`next-intlayer`로 제공)는 이미 이러한 분리를 지원합니다. 패턴을 표준화하기 전에 [Next.js i18n 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/nextjs.md)를 읽어보세요.

</Accordion>
</AccordionGroup>

## 각 라이브러리의 한계점

모든 선택에는 트레이드오프가 따르므로 솔직한 한계점을 공유합니다.

- **`react-i18next`**: 후보 중 가장 무거운 런타임, 독자적인 복수형 포맷, 직접 유지보수해야 하는 타입 연결, 조용히 쌓이는 미사용 데드 키.
- **`react-intl`**: 다소 장황한 개발자 경험(`useIntl()` 후 `formatMessage({ id })`), 여러 노드와 결합된 전역 인스턴스.
- **`use-intl`**: 시작은 간단하지만 최적화가 까다로움. 네임스페이스, 동적 로딩, 타입 설정을 동시에 관리하려면 개발 속도가 느려질 수 있음.
- **`Lingui`**: 추가적인 `extract` / `compile` 빌드 단계 필요, 여러 중복 문법(`t()`, 태그드 템플릿, `i18n.t()`, `<Trans>`)으로 인해 사람과 AI 어시스턴트 모두 혼란을 겪을 수 있음.
- **`Paraglide`**: 리포지토리 내에 파일 생성, React 벤치마크에서 트리 쉐이킹이 온전히 적용되지 않음, 로케일을 중앙 store가 아닌 개별 노드의 스토리지에서 매번 읽어옴.
- **`Tolgee`**: 키 타입 미지원, 상대적으로 어려운 온보딩, 인컨텍스트 편집 기능이 주요 강점.
- **`Intlayer`**: 필수 번들러 플러그인 필요, 상대적으로 작은 생태계, 부분적인 ICU 지원, 구조상 콘텐츠가 코드베이스 전반에 분산되어 있어 번역가에게 단일 JSON을 추출해 전달하려면 별도 도구가 필요함.
- **`gt-react`, `lingo.dev`**: 벤치마크에서 권장되지 않음: 빌드 시 쿼터 오류 발생, 벤더 종속성, provider의 리렌더링을 강제해야 하는 반응성 문제.

## 코드로 살펴보는 각 옵션

제목과 복수형이 포함된 동일한 장바구니 요약 컴포넌트를 각 후보 라이브러리로 작성한 예시입니다. 중요한 것은 컴포넌트 자체가 아니라 콘텐츠가 어디에 저장되며 타입 체커가 이를 어떻게 인식하는지입니다.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

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
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

복수형은 `Intl.PluralRules`를 통해 해석되는 접미사 키입니다. `CustomTypeOptions`를 선언하지 않으면 `t`는 `(key: string) => string` 타입이 되므로 `t("titel")` 같은 오타도 정상적으로 컴파일됩니다.

  </Tab>
  <Tab label="react-intl" value="react-intl">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="src/locales/fr.json"
{
  "cart.title": "Votre panier",
  "cart.items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  <Tab value="es" label="스페인어">

```json fileName="src/locales/es.json"
{
  "cart.title": "Tu carrito",
  "cart.items": "{count, plural, one {# artículo} other {# artículos}}"
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

대부분의 TMS 플랫폼이 내보내는 형식인 ICU를 처음부터 끝까지 사용합니다. `id`에 대한 타입은 기본 제공되지 않으며, `formatjs` 추출 단계와 생성된 유니온 타입을 통해 지원됩니다.

  </Tab>
  <Tab label="use-intl" value="use-intl">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```json fileName="messages/fr.json"
{
  "Cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="스페인어">

```json fileName="messages/es.json"
{
  "Cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Next.js 바인딩이 제외된 `next-intl`과 동일한 구조입니다. `AppConfig`에 메시지 타입을 확장(augment)하면 키에 타입이 적용되며, 네임스페이스 분할은 사용자가 직접 관리해야 합니다.

  </Tab>
  <Tab label="Lingui" value="lingui">

  <Tabs group="locale">
  <Tab value="en" label="영어">

```po fileName="src/locales/en/messages.po"
msgid "Your cart"
msgstr "Your cart"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# item} other {# items}}"
```

  </Tab>
  <Tab value="fr" label="프랑스어">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

  </Tab>
  <Tab value="es" label="스페인어">

```po fileName="src/locales/es/messages.po"
msgid "Your cart"
msgstr "Tu carrito"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# artículo} other {# artículos}}"
```

  </Tab>
  </Tabs>

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

기본 소스 언어는 컴포넌트 내에 위치하며, 다른 로케일은 `lingui extract` 후 해시된 ID를 가진 `.po` 파일에 저장됩니다. `extract`나 `compile`을 잊으면 경고 없이 기본 영어로 폴백됩니다.

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
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

모든 메시지가 타입이 지정된 생성 함수이므로 키가 누락되면 import 에러가 발생합니다. `paraglide/` 폴더가 코드베이스 내에 생성되며 변경될 때마다 다시 생성됩니다.

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
      ko: plural({ one: "{{count}}개 항목", other: "{{count}}개 항목" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

모든 로케일이 컴포넌트 바로 옆의 단일 파일에 위치합니다. 타입이 빌드 시 생성되므로 `title`이 자동 완성되고, 오타가 있으면 declaration merging 없이도 `tsc` 에러가 발생합니다. 컴포넌트 폴더를 삭제하면 관련 문자열도 함께 정리됩니다.

  </Tab>
</Tabs>

이미 `react-i18next`, `react-intl`, `Lingui`를 사용 중이신가요? 호환 어댑터([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md))가 번들러 수준에서 import를 별칭 처리(alias)하여 컴포넌트 단위로 이전하는 동안에도 기존 API가 그대로 작동하도록 지원합니다. 그 외의 내용은 [마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_react-i18next_to_intlayer.md)를 참고하세요.

## 최종 결정 전 확인할 사항

기능 표는 라이브러리가 현재 무엇을 할 수 있는지만 보여줍니다. 다음 항목들은 실제로 운영하면서 마주하게 될 경험을 알려줍니다.

**저장소 활동성을 확인하세요.**

커밋 주기, 이슈 응답 시간, 최근 마이너 릴리스가 올해 있었는지 확인하세요. 유지보수자가 없는 훌륭한 설계는 결국 마이그레이션 부채가 됩니다.

**npm 다운로드 수만 보고 선택하지 마세요.**

가장 많이 설치된 라이브러리는 가장 먼저 출시된 라이브러리일 뿐, 2026년 React 코드베이스에 가장 적합한 라이브러리는 아닐 수 있습니다. 다운로드 수는 적합성이 아닌 역사를 나타냅니다.

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**유지보수 비용을 누가 지원하고, 무엇을 판매하는지 살펴보세요.**

`i18next`는 Locize의 지원을 받습니다. `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n`, Lingui는 Crowdin의 지원을 받습니다. Tolgee, Paraglide(inlang), Intlayer는 각각 자체 플랫폼을 운영합니다. 호스팅 번역 서비스가 주 수익원인 회사는 도구 체인 내에서 번역을 무료로 제공할 유인이 적습니다. Intlayer는 자체 API 키를 활용한 CLI 기반 AI 번역과 셀프 호스팅 가능한 CMS를 함께 제공하는 유일한 도구입니다.

**AI 에이전트 친화적인가요?**

AI 에이전트는 여전히 i18n 작업에서 실수를 범합니다. 로케일을 누락하거나, 없는 키를 임의로 만들고, 메시지 문법을 혼동하곤 합니다. 라이브러리가 에이전트가 콘텐츠를 조회, 채우기(fill), 테스트할 수 있는 [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)나 [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)를 제공하나요? 또한 콘텐츠 로딩이 기본적으로 최적화되어 있는지, 아니면 분기마다 네임스페이스와 lazy import를 수동으로 검토해야 하는지 확인하세요.

**기본으로 제공되는 타입 안전성.**

"추가 설정을 통해 타입을 지정할 수 있음"이 아니라 "새로 설치하자마자 잘못된 키를 사용하면 `tsc`가 실패함"을 의미합니다. 존재하지 않는 키를 사용할 때와 특정 로케일에 번역이 하나 누락되었을 때 어떤 일이 발생하는지 확인해 보세요.

**미사용 콘텐츠 감지.**

카탈로그는 시간이 지남에 따라 늘어나기만 합니다. Intlayer 빌드는 사용되지 않는 필드를 제거하고 로그를 남깁니다(`build.purge`). Paraglide는 호출되지 않은 메시지 함수가 트리 쉐이킹되므로 아키텍처적으로 이를 해결합니다. 그 외의 라이브러리는 미사용 키 정리를 전적으로 개발자에게 맡깁니다.

**개발자 경험 (DX).**

첫 번역 문자열까지의 설정 시간, 마우스 호버 시 번역을 미리 보여주고 선언 위치로 바로 이동할 수 있는 [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md) 또는 [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md), fill, test, push를 지원하는 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md), 컴포넌트에 하드코딩된 문자열을 추출해 키 하나하나를 직접 관리하지 않아도 되게 해주는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) 또는 추출기, 비개발자가 풀 리퀘스트 없이도 콘텐츠를 편집할 수 있는 도구([비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md))가 제공되는지 확인하세요.

## 자주 묻는 질문 (FAQ)

<FAQ>

<Question title="2026년에도 react-i18next는 여전히 좋은 기본 선택인가요?">

대부분의 팀에게는 그렇습니다. 가장 큰 생태계와 온라인에 가장 많은 문제 해결 자료를 보유하고 있습니다. 다만 가장 무거운 런타임, 독자적인 복수형 포맷, 직접 설정하고 관리해야 하는 타입 안전성 및 스코핑 등 명확하고 예측 가능한 트레이드오프가 존재합니다.

</Question>

<Question title="컴파일러 기반 라이브러리가 반드시 필요한가요?">

번들 크기, 자동 생성되는 타입, 빌드 타임 누락 키 검사가 요구사항에 포함된 경우에만 필요합니다. 2개 로케일을 가진 소규모 앱이라면 런타임 라이브러리가 더 간단합니다. [컴파일러 vs 선언형 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md) 포스트에서 컴파일러가 제공하는 이점과 주의할 점을 설명합니다.

</Question>

<Question title="모든 컴포넌트를 다시 작성하지 않고 나중에 라이브러리를 변경할 수 있나요?">

부분적으로 가능합니다. 키 기반 라이브러리들은 유사한 구조를 공유하므로 호환 어댑터를 통해 하나의 API를 다른 API로 별칭(alias) 처리할 수 있으며, 이것이 Intlayer 어댑터의 작동 방식입니다. 다만 메시지 포맷(ICU vs i18next vs 헬퍼)은 자동으로 변환되지 않으므로 복수형이나 보간(interpolation) 부분은 직접 수정해야 합니다.

</Question>

<Question title="라이브러리 선택이 SEO에 영향을 미치나요?">

간접적으로 영향을 미칩니다. 크롤러가 보는 내용은 라우팅, `hreflang`, `<html lang>` 설정, 그리고 텍스트가 서버 렌더링된 HTML에 포함되는지에 따라 결정됩니다. 일부 라이브러리는 이를 돕는 헬퍼를 제공하지만 대부분은 개발자가 직접 처리해야 합니다. 자세한 내용은 [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)를 참고하세요.

</Question>

</FAQ>

## 더 알아보기

- [i18n 라이브러리 벤치마크: 번들 크기, 누수 및 로케일 전환 타이밍](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md) 및 [TanStack Start 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)
- [React i18n: provider 모델의 작동 방식과 비용](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/list_i18n_technologies/frameworks/react.md)
- [기능별 비교: react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer 비교](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)
- [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)
- [컴파일러 vs 선언형 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)
- [컴포넌트별 vs 중앙집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
- [빌드 타임 번들 최적화 작동 원리](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)
- [Vite + React 앱에서 i18n 설정하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_svelte_i18n_library.md), [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_solid_i18n_library.md)를 위한 가이드
