---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n 대 Intlayer
description: Vue/Nuxt 앱에서 국제화(i18n)를 위해 vue-i18n과 Intlayer를 비교
keywords:
  - vue-i18n
  - Intlayer
  - 국제화
  - i18n
  - 블로그
  - Vue
  - Nuxt
  - 자바스크립트
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n 대 Intlayer | Vue 국제화(i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

이 가이드는 **Vue 3** (및 **Nuxt**)용으로 인기 있는 두 가지 i18n 옵션인 **vue-i18n**과 **Intlayer**를 비교합니다.
우리는 최신 Vue 도구(Vite, Composition API)에 중점을 두고 다음을 평가합니다:

1. **아키텍처 및 콘텐츠 구성**
2. **TypeScript 및 안전성**
3. **번역 누락 처리**
4. **라우팅 및 URL 전략**
5. **성능 및 로딩 동작**
6. **개발자 경험(DX), 도구 및 유지보수**
7. **SEO 및 대규모 프로젝트 확장성**

<TOC/>

> **요약**: 두 솔루션 모두 Vue 앱을 현지화할 수 있습니다. 만약 **컴포넌트 범위 콘텐츠**, **엄격한 TypeScript 타입**, **빌드 시 누락 키 검사**, **트리 쉐이킹된 사전**, 그리고 **기본 제공 라우터/SEO 도우미**와 더불어 **비주얼 에디터 및 AI 번역**을 원한다면, **Intlayer**가 더 완전하고 현대적인 선택입니다.

## 상위 수준 포지셔닝

- **vue-i18n** - Vue의 사실상 표준 i18n 라이브러리입니다. 유연한 메시지 포맷팅(ICU 스타일), 로컬 메시지를 위한 SFC `<i18n>` 블록, 그리고 방대한 생태계를 갖추고 있습니다. 안전성과 대규모 유지보수는 주로 사용자의 몫입니다.
- **Intlayer** - 엄격한 TS 타이핑, 빌드 타임 검사, 트리 쉐이킹, 라우터 및 SEO 도우미, 선택적 비주얼 에디터/CMS, AI 지원 번역 기능을 갖춘 Vue/Vite/Nuxt용 컴포넌트 중심 콘텐츠 모델입니다.

## 빌드 시 발생하는 비용

기능 비교표에 앞서, 실측된 데이터입니다. [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)은 각 라이브러리를 사용하여 동일한 Vite + Vue 3 앱(10개 페이지, 10개 언어)을 빌드하고 브라우저가 다운로드하는 크기를 기록합니다:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

`vue-i18n` 런타임 자체만으로도 Intlayer의 **6배**에 달하며, 각 페이지는 **90%의 타 페이지 문자열**을 포함하고, 격리되어 컴파일된 컴포넌트는 `useI18n()`이 전역 메시지 트리에 바인딩하기 때문에 **196 KB**를 끌어옵니다. 반응성 및 페이지 로드 시간을 포함한 전체 실행 결과는 [vue-i18n vs Intlayer 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer_benchmark.md)에서 확인할 수 있습니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> 전체 표는 [Vue 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/vue.md)에서 확인하세요.

## 나란히 기능 비교 (Vue 중심)

| 기능                                        | **Intlayer**                                                                    | **vue-i18n**                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **컴포넌트 근처 번역**                      | ✅ 예, 컴포넌트별로 콘텐츠가 함께 위치 (예: `MyComp.content.ts`)                | ✅ 예, SFC `<i18n>` 블록을 통해 (선택 사항)                                |
| **TypeScript 통합**                         | ✅ 고급, 자동 생성된 **엄격한** 타입 및 키 자동완성                             | ✅ 좋은 타입 정의; **엄격한 키 안전성은 추가 설정/규율 필요**              |
| **번역 누락 감지**                          | ✅ **빌드 시** 경고/오류 및 TS 노출                                             | ⚠️ 런타임 대체/경고                                                        |
| **풍부한 콘텐츠 (컴포넌트/마크다운)**       | ✅ 풍부한 노드 및 마크다운 콘텐츠 파일에 대한 직접 지원                         | ⚠️ 제한적 지원 (`<i18n-t>`를 통한 컴포넌트, 외부 플러그인을 통한 마크다운) |
| **AI 기반 번역**                            | ✅ 자체 AI 제공자 키를 사용하는 내장 워크플로우                                 | ❌ 내장되어 있지 않음                                                      |
| **비주얼 에디터 / CMS**                     | ✅ 무료 비주얼 에디터 및 선택적 CMS                                             | ❌ 내장되어 있지 않음 (외부 플랫폼 사용)                                   |
| **지역화된 라우팅**                         | ✅ Vue Router/Nuxt용 로컬라이즈된 경로, URL 및 `hreflang` 생성을 위한 헬퍼 제공 | ⚠️ 핵심 기능 아님 (Nuxt i18n 또는 커스텀 Vue Router 설정 사용)             |
| **동적 라우트 생성**                        | ✅ 지원                                                                         | ❌ 제공되지 않음 (Nuxt i18n에서 제공)                                      |
| **복수형 처리 및 포맷팅**                   | ✅ 열거형 패턴; Intl 기반 포맷터                                                | ✅ ICU 스타일 메시지; Intl 포맷터                                          |
| **콘텐츠 형식**                             | ✅ `.ts`, `.js`, `.json`, `.md`, `.txt` (YAML 작업 중)                          | ✅ `.json`, `.js` (SFC `<i18n>` 블록 포함)                                 |
| **ICU 지원**                                | ⚠️ 작업 중                                                                      | ✅ 예                                                                      |
| **SEO 도우미 (사이트맵, 로봇, 메타데이터)** | ✅ 내장 도우미 (프레임워크 독립적)                                              | ❌ 핵심 아님 (Nuxt i18n/커뮤니티)                                          |
| **SSR/SSG**                                 | ✅ Vue SSR 및 Nuxt와 함께 작동; 정적 렌더링을 차단하지 않음                     | ✅ Vue SSR/Nuxt와 함께 작동                                                |
| **트리 쉐이킹 (사용된 콘텐츠만 포함)**      | ✅ 빌드 시 컴포넌트별 적용                                                      | ⚠️ 부분적 지원; 수동 코드 분할/비동기 메시지 필요                          |
| **지연 로딩**                               | ✅ 로케일별 / 사전별 적용                                                       | ✅ 비동기 로케일 메시지 지원                                               |
| **사용하지 않는 콘텐츠 정리**               | ✅ 예 (빌드 시)                                                                 | ❌ 내장되어 있지 않음                                                      |
| **대규모 프로젝트 유지보수성**              | ✅ 모듈화되고 디자인 시스템 친화적인 구조 권장                                  | ✅ 가능하지만 강력한 파일/네임스페이스 규율 필요                           |
| **생태계 / 커뮤니티**                       | ⚠️ 작지만 빠르게 성장 중                                                        | ✅ Vue 생태계 내 크고 성숙함                                               |

## 심층 비교

<AccordionGroup>
<Accordion header="1) 아키텍처 및 확장성">

- **vue-i18n**: 일반적인 설정은 로케일별로 **중앙 집중식 카탈로그**를 사용하며(선택적으로 파일/네임스페이스로 분할 가능), SFC `<i18n>` 블록은 로컬 메시지를 허용하지만 프로젝트가 커짐에 따라 팀들은 종종 공유 카탈로그로 되돌아갑니다. [컴포넌트별 vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)을 참조하세요.
- **Intlayer**: 각 컴포넌트 옆에 저장되는 **컴포넌트별 사전**을 권장합니다. 이는 팀 간 충돌을 줄이고, 콘텐츠를 쉽게 찾을 수 있게 하며, 자연스럽게 사용되지 않는 키의 누락이나 분산을 제한합니다.

**중요한 이유:** 대규모 Vue 앱이나 디자인 시스템에서는 **모듈화된 콘텐츠**가 단일 카탈로그보다 더 잘 확장됩니다.

</Accordion>
<Accordion header="2) TypeScript 및 안전성">

- **vue-i18n**: 좋은 TS 지원을 제공하지만, **엄격한 키 타입 지정**은 일반적으로 사용자 정의 스키마/제네릭 및 신중한 규칙이 필요합니다.
- **Intlayer**: 콘텐츠에서 **엄격한 타입을 생성**하여 **IDE 자동완성**과 오타/누락 키에 대한 **컴파일 타임 오류**를 제공합니다.

**중요한 이유:** 강력한 타입 검사는 **런타임 이전에** 문제를 잡아냅니다.

</Accordion>
<Accordion header="3) 누락된 번역 처리">

- **vue-i18n**: **런타임** 경고/대체 처리(예: 대체 로케일 또는 키 사용). [누락된 번역 감지](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md)를 참조하세요.
- **Intlayer**: 로케일과 키 전반에 걸친 경고/오류를 포함한 **빌드 타임** 감지., 그리고 CI에서의 `npx intlayer test` 지원.

**중요한 이유:** 빌드 타임 강제 적용으로 프로덕션 UI를 깔끔하고 일관되게 유지합니다.

</Accordion>
<Accordion header="4) 라우팅 및 URL 전략 (Vue Router/Nuxt)">

- **둘 다** 지역화된 라우트와 함께 작동할 수 있습니다. [hreflang 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/hreflang_guide_multilingual_seo.md)를 참조하세요.
- **Intlayer**는 **지역화된 경로 생성**, **로케일 접두사 관리**, 그리고 SEO를 위한 **`<link rel="alternate" hreflang>`** 발행을 돕는 헬퍼를 제공합니다. Nuxt와 함께 사용 시, 프레임워크의 라우팅을 보완합니다.

**중요한 이유:** 맞춤형 연결 계층이 줄어들고, 여러 로케일에 걸쳐 **더 깔끔한 SEO**를 구현할 수 있습니다.

</Accordion>
<Accordion header="5) 성능 및 로딩 동작">

- **vue-i18n**: 비동기 로케일 메시지를 지원하며, 과도한 번들링 방지는 사용자의 책임입니다(카탈로그를 신중히 분할해야 함). 위의 벤치마크가 이를 수치로 보여줍니다: 페이지당 134.9 KB 대 57.1 KB.
- **Intlayer**: 빌드 시 **트리 쉐이킹**을 수행하고, 사전/로케일별로 **지연 로딩**합니다. 사용하지 않는 콘텐츠는 포함되지 않습니다.

**중요한 이유:** 더 작은 번들과 다중 로케일 Vue 앱의 더 빠른 시작 속도를 제공합니다.

</Accordion>
<Accordion header="6) 개발자 경험 및 툴링">

- **vue-i18n**: 성숙한 문서와 커뮤니티를 갖추고 있으며, 일반적으로 편집 워크플로우를 위해 **외부 현지화 플랫폼**에 의존합니다.
- **Intlayer**: **무료 비주얼 에디터**, 선택적 **CMS**(Git 친화적이거나 외부화 가능), **VSCode 확장**, **CLI/CI** 유틸리티, 그리고 사용자의 제공자 키를 활용한 **AI 지원 번역**을 제공합니다., **MCP 서버**

**중요한 이유:** 운영 비용 절감과 개발-콘텐츠 주기의 단축.

</Accordion>
<Accordion header="7) SEO, SSR 및 SSG">

- **두 솔루션 모두** Vue SSR과 Nuxt와 함께 작동합니다. [국제화 및 SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/internationalization_and_SEO.md)를 참조하세요.
- **Intlayer**: 프레임워크에 구애받지 않는 **SEO 도우미**(사이트맵/메타데이터/`hreflang`)를 추가하여 Vue/Nuxt 빌드와 원활하게 작동합니다.

**중요한 이유:** 맞춤형 연결 없이 국제 SEO 구현 가능.

</Accordion>
</AccordionGroup>

## 왜 Intlayer인가? (문제점 및 접근법)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

대부분의 i18n 스택(예: **vue-i18n**)은 **중앙 집중식 카탈로그**에서 시작합니다:

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="언어당 1개 파일" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="언어당 1개 폴더" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

이 폴더는 각 언어의 기능별 네임스페이스로 계속해서 비대해집니다:

```txt
locales
├── EN
│   ├── blog.json
│   ├── about.json
│   ├── auth.json
│   ├── blog.json
│   ├── cart.json
│   ├── categories.json
│   ├── contact.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── faq.json
│   ├── footer.json
│   ├── form.json
│   ├── home.json
│   ├── language.json
│   ├── navbar.json
│   ├── ... 65 files
│   └── validation.json
└── ES
```

이 방식은 앱이 커질수록 개발 속도를 저하시킵니다:

1. **새 컴포넌트의 경우** 원격 카탈로그를 생성/편집하고, 네임스페이스를 연결하며, 번역 작업을 수행합니다 (종종 AI 도구에서 복사/붙여넣기 수동 작업 포함).
2. **컴포넌트를 변경할 때** 공유 키를 찾아 번역하고, 로케일을 동기화하며, 사용하지 않는 키를 제거하고, JSON 구조를 맞춥니다.

**Intlayer**는 콘텐츠를 **컴포넌트별로 구분**하고, CSS, 스토리, 테스트, 문서와 같이 **코드 옆에 보관**합니다:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

모든 로케일 파일을 수동으로 편집해야 하며, 키는 일반 문자열입니다. 오타가 발생하면 프로덕션에서 `componentExample.greting`으로 그대로 렌더링됩니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

모든 로케일이 컴포넌트 바로 옆의 단일 타입 파일에 위치합니다.

</Tab>
</Tabs>

이 접근 방식:

- **개발 속도 향상** (한 번 선언; IDE/AI 자동완성 지원).
- **코드베이스 정리** (1 컴포넌트 = 1 사전).
- **복제/마이그레이션 용이** (컴포넌트와 콘텐츠를 함께 복사).
- **죽은 키 방지** (사용하지 않는 컴포넌트는 콘텐츠를 가져오지 않음).
- **로딩 최적화** (지연 로드된 컴포넌트가 자신의 콘텐츠를 함께 가져옴).

## Intlayer의 추가 기능 (Vue 관련)

- **크로스 프레임워크 지원**: Vue, Nuxt, Vite, React, Express 등과 함께 작동.
- **자바스크립트 기반 콘텐츠 관리**: 코드 내에서 완전한 유연성으로 선언.
- **로케일별 선언 파일**: 모든 로케일을 시드(seed)하고 도구가 나머지를 생성하도록 합니다.
- **타입 안전 환경**: 자동 완성을 지원하는 강력한 TS 구성.
- **간소화된 콘텐츠 조회**: 사전을 위한 모든 콘텐츠를 가져오는 단일 훅/컴포저블.
- **체계적인 코드베이스**: 1 컴포넌트 = 동일 폴더 내 1 사전.
- **향상된 라우팅**: **Vue Router/Nuxt** 로케일 경로 및 메타데이터를 위한 헬퍼.
- **마크다운 지원**: 로케일별 원격/로컬 마크다운 가져오기; 프런트매터를 코드에 노출.
- **무료 비주얼 에디터 및 선택적 CMS**: 유료 로컬라이제이션 플랫폼 없이 작성 가능; Git 친화적 동기화.
- **트리 쉐이커블 콘텐츠**: 사용된 것만 배포; 지연 로딩 지원.
- **정적 렌더링 친화적**: SSG를 차단하지 않음.
- **AI 기반 번역**: 자체 AI 제공자/API 키를 사용하여 231개 언어로 번역합니다.
- **MCP 서버 및 VSCode 확장**: IDE 내에서 i18n 워크플로우와 작성 작업을 자동화합니다.
- **상호 운용성**: 필요에 따라 **vue-i18n**, **react-i18next**, **react-intl**과 연동합니다.

## 언제 어떤 것을 선택해야 할까요?

<AccordionGroup>
<Accordion header="vue-i18n 선택">

**표준 Vue 접근 방식**을 선호하고 카탈로그와 네임스페이스를 직접 관리하는 데 익숙하며, 애플리케이션이 **중소 규모**인 경우(또는 이미 Nuxt i18n에 의존하고 있는 경우). SFC `<i18n>` 블록과 런타임 `setLocaleMessage()`는 Intlayer가 의도적으로 복제하지 않은 기능입니다.

</Accordion>
<Accordion header="Intlayer 선택">

**컴포넌트 단위 콘텐츠**, **엄격한 TypeScript**, **빌드 시 안전성 보장**, **Tree-shaking**, 내장된 라우팅/SEO/에디터 툴링을 중시하는 경우, 특히 **대규모 모듈형 Vue/Nuxt 코드베이스** 및 디자인 시스템에 적합합니다. [Vue와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vue.md) 또는 [Nuxt와 함께](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nuxt.md) 시작하세요.

</Accordion>
<Accordion header="@intlayer/vue-i18n 선택">

현재 `vue-i18n`을 사용 중이며 `.vue` 파일을 수정하지 않고 번들 크기를 줄이고자 하는 경우. [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/vue-i18n.md)는 `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`를 유지하고 컴파일된 사전에서 제공합니다. [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer-vue-i18n.md)의 비교 결과를 확인하세요.

</Accordion>
</AccordionGroup>

## vue-i18n과의 상호 운용성

`intlayer`는 `vue-i18n` 네임스페이스 관리에도 도움이 될 수 있습니다.

`intlayer`를 사용하면 선호하는 i18n 라이브러리 형식으로 콘텐츠를 선언할 수 있으며, intlayer는 선택한 위치(예: `/messages/{{locale}}/{{namespace}}.json`)에 네임스페이스를 생성합니다. [vue-i18n 호환성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/vue-i18n.md) 및 [Nuxt i18n 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/nuxtjs-i18n.md)를 참조하세요.

## 자주 묻는 질문

<FAQ>

<Question title="Intlayer는 vue-i18n의 대체재인가요, 아니면 그 위의 레이어인가요?">

도입 방식에 따라 둘 다 해당됩니다. `vue-intlayer`는 고유한 `useIntlayer()` 컴포저블을 갖춘 네이티브 런타임입니다. `@intlayer/vue-i18n`은 `vue-i18n` API를 유지하면서 연결 대상을 변경하는 호환 어댑터로, 컴포넌트를 건드리지 않고 마이그레이션한 다음 점진적으로 파일 단위로 전환할 수 있습니다.

</Question>

<Question title="내 SFC <i18n> 블록은 어떻게 되나요?">

어댑터는 이를 읽지 않습니다. 해당 메시지를 로케일 JSON 파일로 옮기거나, 생성된 타입을 지원하는 컴포넌트 옆의 `.content.ts` 파일로 이동하세요. 이는 이전되지 않는 유일한 `vue-i18n` 기능입니다.

</Question>

<Question title="Intlayer가 Nuxt와 함께 작동하나요?">

네. [Nuxt와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nuxt.md)는 다국어 라우팅, 로케일 감지 미들웨어 및 사이트맵 생성을 지원합니다. `@nuxtjs/i18n`을 사용 중이라면 [Nuxt i18n 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/nuxtjs-i18n.md)가 마이그레이션 경로입니다.

</Question>

<Question title="locales/{locale}.json을 단일 진실 공급원(SSOT)으로 유지할 수 있나요?">

네. [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/vue-i18n.md)은 `vue-i18n` 문법(`{name}`, `{0}`, `"car | cars"` 파이프 복수형)으로 읽고 CLI나 CMS가 업데이트할 때 번역을 다시 기록합니다.

</Question>

<Question title="Vue에서 Intlayer와 함께 ICU가 작동하나요?">

네이티브 ICU 지원은 작업 중입니다. `@intlayer/vue-i18n` 어댑터는 파이프 복수형, 명명된 보간 및 목록 보간을 포함한 `vue-i18n` 고유의 메시지 구문을 지원합니다. Intlayer의 복수화 모델에 대해서는 [열거형 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md)를 참조하세요.

</Question>

</FAQ>

## GitHub STARs

GitHub stars는 프로젝트의 인기도, 커뮤니티 신뢰도, 장기적 관련성의 강력한 지표입니다. 기술적 품질을 직접 측정하는 것은 아니지만, 얼마나 많은 개발자들이 프로젝트를 유용하게 생각하고, 진행 상황을 따르고 있으며, 채택할 가능성이 있는지를 반영합니다. 프로젝트의 가치를 추정하기 위해 stars는 대안들 간의 견인력을 비교하고 생태계 성장에 대한 통찰력을 제공합니다.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## 결론

**vue-i18n**과 **Intlayer** 모두 Vue 앱을 잘 현지화합니다. 차이점은 견고하고 확장 가능한 설정을 위해 **얼마나 많이 직접 구축해야 하는가**에 있습니다:

- **Intlayer**는 **모듈화된 콘텐츠**, **엄격한 TS**, **빌드 시 안전성**, **트리 쉐이킹된 번들**, 그리고 **라우터/SEO/에디터 도구**를 **기본 제공**합니다.
- 팀이 다중 로케일, 컴포넌트 기반 Vue/Nuxt 앱에서 **유지보수성과 속도**를 우선시한다면, Intlayer는 오늘날 **가장 완벽한** 경험을 제공합니다.

## 추가 자료

- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer_benchmark.md), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer-vue-i18n.md), the adapter on the same app
- [Is vue-i18n outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_vue-i18n_outdated.md)
- [How to pick a Vue i18n library](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/how_to_pick_vue_i18n_library.md)
- [Using Intlayer with vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/intlayer_with_vue-i18n.md)
- [Vue benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/vue.md)
- [Migration guide: vue-i18n to Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_vue-i18n_to_intlayer.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)

Refer to ['Why Intlayer?' doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md) for more details.
