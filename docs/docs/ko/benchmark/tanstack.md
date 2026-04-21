---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: 2026년 TanStack Start를 위한 최고의 i18n 솔루션 - 벤치마크 리포트
description: react-i18next, use-intl, Intlayer와 같은 TanStack Start 국제화 라이브러리를 비교합니다. 번들 크기, 누수, 반응성에 관한 상세 성능 리포트.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - 성능
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "벤치마크 초기화"
---

# TanStack Start i18n 라이브러리 — 2026 벤치마크 리포트

이 페이지는 TanStack Start i18n 솔루션에 대한 벤치마크 리포트입니다.

## 목차

<Toc/>

## 인터랙티브 벤치마크

<I18nBenchmark framework="tanstack" vertical/>

## 결과 참조:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md

전체 벤치마크 저장소는 [여기](https://github.com/intlayer-org/benchmark-i18n/tree/main)에서 확인할 수 있습니다.

## 서론

국제화 솔루션은 React 앱에서 가장 무거운 의존성 중 하나입니다. TanStack Start에서 주요 위험은 불필요한 콘텐츠, 즉 단일 경로의 번들에 다른 페이지와 다른 로케일의 번역을 포함하는 것입니다.

앱이 성장함에 따라 이 문제는 클라이언트에 전송되는 JavaScript를 빠르게 팽창시키고 내비게이션을 느리게 만들 수 있습니다.

실제로 최적화가 가장 덜 된 구현의 경우, 국제화된 페이지가 i18n이 없는 버전보다 몇 배나 무거워질 수 있습니다.

또 다른 영향은 개발자 경험(DX)입니다: 콘텐츠 선언 방식, 타입, 네임스페이스 구성, 동적 로딩, 로케일 변경 시의 반응성 등이 포함됩니다.

## 앱 테스트하기

i18n 누수 문제를 빠르게 파악하기 위해 [여기](https://intlayer.org/i18n-seo-scanner)에서 시도해 볼 수 있는 무료 스캐너를 구축했습니다.

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 문제점

다국어 앱의 비용을 제한하려면 두 가지 레버가 필수적입니다:

- 페이지 / 네임스페이스별로 콘텐츠를 분리하여 필요하지 않을 때 전체 사전을 로드하지 않도록 합니다.
- 필요할 때만 올바른 로케일을 동적으로 로드합니다.

이러한 접근 방식의 기술적 한계 이해:

**동적 로딩**

동적 로딩이 없으면 대부분의 솔루션은 첫 번째 렌더링부터 메시지를 메모리에 유지하므로 경로와 로케일이 많은 앱의 경우 상당한 오버헤드가 발생합니다.

동적 로딩을 사용하면 초기 JS는 줄어들지만 언어 전환 시 추가 요청이 발생할 수 있는 장단점을 수용하게 됩니다.

**콘텐츠 분리**

`const t = useTranslation()` + `t('a.b.c')`를 중심으로 구축된 구문은 매우 편리하지만 런타임에 큰 JSON 객체를 유지하도록 조장하는 경우가 많습니다. 이 모델은 라이브러리가 실제 페이지별 분리 전략을 제공하지 않는 한 트리 쉐이킹을 어렵게 만듭니다.

## 연구 방법론

이 벤치마크에서는 다음과 같은 라이브러리를 비교했습니다:

- `Base App` (i18n 라이브러리 없음)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

프레임워크는 `TanStack Start`이며 **10개의 페이지**와 **10개의 언어**를 가진 다국어 앱을 사용했습니다.

**네 가지 로딩 전략**을 비교했습니다:

| 전략          | 네임스페이스 없음 (글로벌)                   | 네임스페이스 포함 (스코프)                                      |
| :------------ | :------------------------------------------- | :-------------------------------------------------------------- |
| **정적 로딩** | **Static**: 시작 시 모든 것을 메모리에 로드. | **Scoped static**: 네임스페이스별 분리; 시작 시 모든 것을 로드. |
| **동적 로딩** | **Dynamic**: 로케일별 온디맨드 로딩.         | **Scoped dynamic**: 네임스페이스 및 로케일별 세분화된 로딩.     |

## 전략 요약

- **Static**: 간단함. 초기 로드 후 네트워크 지연 없음. 단점: 큰 번들 크기.
- **Dynamic**: 초기 무게 감소(지연 로딩). 로케일이 많을 때 적합함.
- **Scoped static**: 복잡한 추가 네트워크 요청 없이 코드 구조를 유지(논리적 분리).
- **Scoped dynamic**: 코드 분할 및 성능을 위한 최선의 접근 방식. 현재 뷰와 활성 로케일에 필요한 것만 로드하여 메모리 사용을 최소화함.

## 결과 상세

### 1 — 피해야 할 솔루션

`gt-react`나 `lingo.dev`와 같은 일부 솔루션은 분명히 피해야 합니다. 이들은 벤더 종속성과 코드베이스 오염을 결합합니다. 설상가상으로 이를 구현하기 위해 많은 시간을 투자했음에도 불구하고 TanStack Start에서 제대로 작동하지 않았습니다(Next.js의 `gt-next`와 유사).

발생한 문제점들:

**(General Translation)** (`gt-react@latest`):

- 약 110kb 앱의 경우 `gt-react`는 440kb 이상의 추가 데이터를 추가할 수 있습니다(동일 벤치마크의 Next.js 구현에서 확인된 규모).
- General Translation을 사용한 가장 첫 번째 빌드에서 `Quota Exceeded, please upgrade your plan` 메시지가 표시되었습니다.
- 번역이 렌더링되지 않습니다. `Error: <T> used on the client-side outside of <GTProvider>` 오류가 발생하며, 이는 라이브러리의 버그로 보입니다.
- **gt-tanstack-start-react**를 구현하는 동안 라이브러리의 [이슈](https://github.com/generaltranslation/gt/issues/1210#event-24510646961)도 발견했습니다: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser` 오류로 애플리케이션이 중단되었습니다. 이 문제를 보고한 후 관리자는 24시간 이내에 수정했습니다.
- 이 라이브러리들은 `initializeGT()` 함수를 통해 안티 패턴을 사용하여 번들이 깨끗하게 트리 쉐이킹되는 것을 방해합니다.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- AI 쿼터 초과(또는 차단 중인 서버 의존성)로 인해 비용을 지불하지 않으면 빌드 / 프로덕션 출시가 위험해집니다.
- 컴파일러가 번역된 콘텐츠의 거의 40%를 놓치고 있었습니다. 작동시키기 위해 모든 `.map`을 평면적인 컴포넌트 블록으로 다시 작성해야 했습니다.
- CLI에 버그가 있어 아무 이유 없이 설정 파일을 초기화하곤 했습니다.
- 빌드 시 새 콘텐츠가 추가되면 생성된 JSON을 완전히 삭제했습니다. 결과적으로 소수의 키가 수백 개의 기존 키를 지워버릴 수 있었습니다.
- TanStack Start에서 라이브러리의 반응성 문제를 겪었습니다: 로케일 변경 시 작동시키기 위해 프로바이더의 강제 재렌더링이 필요했습니다.

### 2 — 실험적인 솔루션

**(Wuchale)** (`wuchale@0.22.11`):

`Wuchale`의 아이디어는 흥미롭지만 아직 실행 가능한 솔루션은 아닙니다. 이 라이브러리에서 반응성 문제를 겪었으며 TanStack Start에서 앱을 작동시키기 위해 프로바이더의 강제 재렌더링이 필요했습니다. 문서 또한 상당히 불명확하여 온보딩이 어렵습니다.

### 3 — 수용 가능한 솔루션

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide`는 혁신적이고 잘 설계된 접근 방식을 제공합니다. 그럼에도 불구하고 이 벤치마크에서는 광고된 트리 쉐이킹이 나의 Next.js 구현이나 TanStack Start에서 작동하지 않았습니다. 워크플로우와 DX 또한 다른 옵션보다 복잡합니다. 개인적으로 푸시할 때마다 JS 파일을 다시 생성해야 하는 것을 선호하지 않으며, 이는 PR을 통한 개발자들 간의 지속적인 머지 충돌 위험을 만듭니다.

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee`는 앞에서 언급한 많은 문제들을 해결합니다. 비슷한 접근 방식을 가진 다른 도구들보다 시작하기 더 어렵다고 느꼈습니다. 타입 안전성을 제공하지 않아 컴파일 시점에 누락된 키를 찾는 것도 매우 어렵습니다. 누락된 키 감지 기능을 추가하기 위해 Tolgee의 API를 나의 API로 래핑해야 했습니다.

TanStack Start에서도 반응성 문제가 있었습니다: 로케일 변경 시 프로바이더를 강제 재렌더링하고 로케일 변경 이벤트를 구독하여 다른 언어로의 로딩이 올바르게 작동하도록 해야 했습니다.

**(use-intl)** (`use-intl@4.9.1`):

`use-intl`은 React 에코시스템에서 가장 유행하는 "intl" 조각 중 하나이며(`next-intl`과 같은 계열) AI 에이전트들에 의해 자주 추천되지만, 내 견해로는 성능 우선 환경에서 잘못된 선택입니다. 시작하기는 꽤 간단합니다. 실제로는 누수를 최적화하고 제한하는 프로세스가 상당히 복잡합니다. 마찬가지로 동적 로딩 + 네임스페이싱 + TypeScript 타입을 결합하면 개발 속도가 크게 느려집니다.

TanStack Start에서는 Next.js 전용 함정(`setRequestLocale`, 정적 렌더링)을 피할 수 있지만 핵심 문제는 동일합니다: 엄격한 규율이 없으면 번들은 금세 너무 많은 메시지를 포함하게 되고 경로별 네임스페이스 유지는 고통스러워집니다.

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next`는 JavaScript 앱 i18n 요구 사항을 충족시킨 초창기 솔루션 중 하나였기 때문에 가장 인기 있는 옵션일 것입니다. 또한 특정 문제를 해결하기 위한 광범위한 커뮤니티 플러그인 세트를 보유하고 있습니다.

여전히 `t('a.b.c')` 위에 구축된 스택과 동일한 주요 단점을 공유합니다: 최적화는 가능하지만 시간이 매우 많이 소요되며, 대규모 프로젝트는 나쁜 관행(네임스페이스 + 동적 로딩 + 타입)에 빠질 위험이 있습니다.

메시지 형식도 다릅니다: `use-intl`은 ICU MessageFormat을 사용하는 반면, `i18next`는 자체 형식을 사용하므로 이들을 섞어서 사용하면 도구 기술이나 마이그레이션이 복잡해집니다.

**(Lingui)** (`@lingui/core@5.3.0`):

`Lingui`는 종종 찬사를 받습니다. 개인적으로 `lingui extract` / `lingui compile` 워크플로우가 다른 접근 방식보다 복잡하다고 느꼈으며 이 TanStack Start 벤치마크에서 명확한 장점이 없었습니다. 또한 AI를 혼란스럽게 하는 일관성 없는 구문(예: `t()`, `t''`, `i18n.t()`, `<Trans>`)을 발견했습니다.

**(react-intl)** (`react-intl@10.1.1`):

`react-intl`은 Format.js 팀의 성능 중심 구현입니다. DX는 여전히 장황합니다: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })`는 복잡성과 추가 JavaScript 작업을 가중시키고 글로벌 i18n 인스턴스를 React 트리의 많은 노드에 묶어둡니다.

### 4 — 추천 사항

이 TanStack Start 벤치마크에는 `next-translate`(Next.js 플러그인 + `getStaticProps`)에 상응하는 직접적인 대안이 없습니다. 성숙한 에코시스템과 `t()` API를 진정으로 원하는 팀에게는 `react-i18next`와 `use-intl`이 "합리적인" 선택으로 남겠지만, 누수를 피하기 위해 최적화하는 데 많은 시간을 투자할 것을 각오해야 합니다.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

객관성을 위해 나의 솔루션인 `react-intlayer`에 대해서는 직접 판단하지 않겠습니다.

### 개인적인 의견

이 의견은 개인적인 것이며 벤치마크 결과에는 영향을 미치지 않습니다. 그럼에도 불구하고 i18n 세계에서는 번역된 콘텐츠를 위해 `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`와 같은 패턴에 대한 합의가 자주 보입니다.

React 앱에서 함수를 `ReactNode`로 주입하는 것은 내 견해로는 안티 패턴입니다. 또한 피할 수 있는 복잡성과 JavaScript 실행 오버헤드(거의 눈에 띄지 않더라도)를 추가합니다.
