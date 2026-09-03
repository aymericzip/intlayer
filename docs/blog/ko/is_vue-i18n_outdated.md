---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: 2026년에도 vue-i18n을 계속 써야 할까요?
description: vue-i18n은 지난 10년간 Vue 및 Nuxt 생태계의 표준이었습니다. 하지만 벤치마크 결과 웹에서 가장 무거운 i18n 런타임으로 나타났습니다. 그 원인을 분석합니다.
keywords:
  - vue-i18n
  - Intlayer
  - 국제화
  - i18n
  - Vue
  - Nuxt
  - 번들 크기
  - 블로그
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# 2026년에도 vue-i18n을 계속 써야 할까요?

Vue 생태계에서 `vue-i18n`만큼 압도적인 점유율을 기록한 라이브러리는 드뭅니다. Vue 2 시절부터 Kazupon의 주도하에 성장해 왔으며, `@nuxtjs/i18n`의 기반이자 다국어 지원 Vue 프로젝트의 사실상 표준이었습니다.

그러나 2026년 벤치마크 결과는 놀라운 사실을 드러냈습니다. **`vue-i18n`은 테스트한 모든 주요 프론트엔드 프레임워크 중 가장 무거운 지역화 런타임이었습니다.**

Vite + Vue 기반의 가벼운 기본 애플리케이션(31.5 KB)에 `vue-i18n`을 추가하자, 페이지당 평균 JavaScript 크기가 **136.4 KB**로 4배 이상 치솟았습니다.

본래 가볍고 기민한 프레임워크로 사랑받는 Vue에서, 왜 i18n 도구만 이토록 비대해졌을까요? 그리고 순수 런타임 모델은 오늘날에도 유효할까요?

<TOC/>

## 핵심 요약

**테스트 대상 중 가장 무거운 런타임:**

텍스트를 추가하기도 전에 이미 **24.3 KB (gzip 기준, Minified 시 83.2 KB)**의 크기를 차지하여, `intlayer` 코어 런타임(2.7 KB) 대비 **약 9배 무겁습니다**.

**페이지 페이로드 330% 증가:**

`vue-i18n`은 31.5 KB에 불과했던 기본 Vue 페이지를 136.4 KB로 늘려놓았습니다. 반면 Intlayer는 59.3 KB에 그쳐 **56% 더 가벼운 페이로드**를 제공합니다.

**브라우저로 번들링되는 컴파일러:**

번들러에 특정 별칭(alias)을 수동 설정하지 않는 한, `vue-i18n`은 브라우저에서 텍스트를 실시간 파싱하기 위해 전체 메시지 컴파일러를 클라이언트로 전송합니다.

**유지보수 추세:**

지난 1년간 `vue-i18n`은 약 259개의 커밋을 기록했으나, 대부분 버그 수정과 Vue 마이너 버전 대응에 집중되었습니다.

**공식 현대적 도구의 부재:**

공식 Language Server (LSP), AI용 MCP 서버, CLI 기반 자동 번역 등 차세대 워크플로우를 위한 도구가 부족합니다.

## 유지보수 vs. 현대적 도구 비교

| 저장소                | 스타                                                                                                                                                   | 전체 커밋                                                                                                                                                           | 연간 커밋                                                                                                                                                          | 최근 커밋                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

최근 12개월 활동 비교:

- `intlify/vue-i18n`: **259 커밋** (Vue 3 및 Nuxt 유지보수 위주).
- `aymericzip/intlayer`: **4,343 커밋** (컴파일러 고도화, LSP 도구, AI 에이전트 연동 작업 등 지속 개발).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

오래된 라이브러리는 안정성이 뛰어납니다. 하지만 오늘날의 프론트엔드는 빌드 타임 AST 변환, 데드 코드 제거, AI 자동화에 기반하고 있습니다. 런타임에 종속된 구조로는 이러한 혁신을 온전히 따라잡기 어렵습니다.

## Vite + Vue 성능 측정 결과

Vite 및 Vue 3 기반 10개 페이지, 10개 언어 애플리케이션 측정:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> 프로덕션 gzip 압축을 적용하여 실제 브라우저에서 측정했습니다. 세부 사항은 [Vue 벤치마크 문서](https://intlayer.org/ko/doc/benchmark/vue)에서 확인할 수 있습니다.

### 라이브러리 초기 오버헤드

번역 텍스트를 불러오기 전의 순수 라이브러리 크기:

| 라이브러리        | Gzip 기준  | Minified 기준 |
| ----------------- | ---------- | ------------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB       |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB**    |

`vue-i18n`의 런타임 엔진만으로 **24.3 KB (gzip)**에 달해 Vue 코어 전체 크기와 맞먹습니다. 반면 Intlayer는 단 **2.7 KB**만 차지합니다.

### 페이지 크기 및 불필요한 번역 누수

| 구성            | 평균 페이지 JS (gz) | 타 언어 누수율 | 타 페이지 누수율 | 평균 컴포넌트 (gz) |
| --------------- | ------------------- | -------------- | ---------------- | ------------------ |
| 기본(i18n 없음) | 31.5 KB             | 0.0%           | 90.0%            | 0.9 KB             |
| `vue-i18n`      | **136.4 KB**        | 50.2%          | 90.0%            | 196.0 KB           |
| Intlayer        | **59.3 KB**         | 51.1%          | **0.0%**         | **6.5 KB**         |

### 측정 주요 결과

**높은 상대적 증가율:**

Vue 프레임워크 자체의 기본 크기가 워낙 작기 때문에(~31 KB), `vue-i18n`을 도입하면 페이지 페이로드가 4배 이상 커집니다.

**타 페이지로의 번역 데이터 누수:**

기본 설정 상태에서는 특정 라우트에 내려오는 **텍스트 데이터의 90%**가 다른 페이지용입니다. Intlayer는 이를 완전히 제거하여 누수율 **0.0%**를 기록했습니다.

**개별 컴포넌트의 비대화:**

사전이 반복 복제되면서 `vue-i18n`의 지역 스코프 컴포넌트 크기는 평균 196 KB까지 치솟았으나, Intlayer에서는 **6.5 KB**에 불과했습니다.

## vue-i18n이 무거운 이유

### 브라우저로 전송되는 AST 컴파일러

`vue-i18n`은 자체 메시지 형식 컴파일러를 내장하고 있습니다. 복수형 규칙이나 변수 치환 로직이 브라우저 런타임에서 AST(추상 구문 트리)로 실시간 변환됩니다.

이를 방지하려면 번들러에서 `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js`로 별칭을 지정하고 `@intlify/unplugin-vue-i18n`을 통해 사전 컴파일을 수행해야 하지만, 많은 프로젝트에서 이 과정이 생략됩니다.

### 모놀리식 기능 구조

날짜 및 숫자 포매터, 링크드 메시지, 레거시 Options API 지원 브리지(`$t`, `v-t`), 반응형 프록시가 모두 포함되어 있습니다. `<script setup>` 내에서 단순 텍스트만 표시하고 싶더라도 전체 시스템이 함께 로드됩니다.

### 동적 키로 인한 트리 쉐이킹 차단

`"home.hero.title"` 키가 런타임에 평가되므로 번들러는 실제로 쓰이는 텍스트를 식별할 수 없습니다. 쓰이지 않는 문구도 번들에 남아 있게 됩니다.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

[Intlayer 컴파일러](https://intlayer.org/ko/doc/compiler)는 컴포넌트가 접근하는 프로퍼티를 명확히 파악하여 클라이언트 번들 생성 전에 미사용 번역을 안전하게 배제합니다. 자세한 내용은 [번들 최적화](https://intlayer.org/ko/doc/concept/bundle-optimization)를 참고하세요.

## 개발자 경험 (DX) 비교

### 격리된 JSON 폴더 vs. 컴포넌트와 함께 배치

`vue-i18n`에서는 텍스트가 멀리 떨어진 `locales/` 디렉터리에 머뭅니다. Intlayer를 사용하면 컴포넌트 파일 바로 옆에 콘텐츠 파일을 선언할 수 있습니다.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/ko.json"
{
  "hero": {
    "title": "모든 언어로 출시하세요"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      ko: "모든 언어로 출시하세요",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

`Hero.vue`를 삭제하거나 이동하면 해당 콘텐츠 선언 파일도 자연스럽게 함께 관리됩니다.

### 에디터 자동완성 vs. 엄격한 완전성 보장

`DefineLocaleMessage`를 통해 기본 스키마 기준의 자동완성은 지원됩니다. 하지만 모든 언어의 완결성을 보장하지는 못합니다. `ko.json`에서 키를 지워도 TypeScript 빌드가 멈추지 않습니다.

Intlayer는 사전을 엄격하게 검증합니다. [`strictMode`](https://intlayer.org/ko/doc/concept/configuration)를 활성화하면 어떤 언어에서든 번역이 누락될 경우 즉각 빌드 에러가 발생합니다.

### IDE 및 AI 도구 지원

| 기능                      | `vue-i18n`           | Intlayer                                                               |
| ------------------------- | -------------------- | ---------------------------------------------------------------------- |
| **VS Code 확장 프로그램** | 서드파티 (i18n Ally) | ✅ [공식 확장 프로그램](https://intlayer.org/ko/doc/vs-code-extension) |
| **Language Server (LSP)** | ❌ 없음              | ✅ [전용 LSP](https://intlayer.org/ko/doc/lsp)                         |
| **AI용 MCP 서버**         | ❌ 없음              | ✅ [내장 MCP 서버](https://intlayer.org/ko/doc/mcp-server)             |
| **에이전트 스킬 세트**    | ❌ 없음              | ✅ [자율 에이전트 스킬](https://intlayer.org/ko/doc/agent_skills)      |
| **인컨텍스트 비주얼 CMS** | ❌ 없음              | ✅ [무료 오픈소스 CMS](https://intlayer.org/ko/doc/concept/editor)     |

## 번역 워크플로우

`vue-i18n`에는 자체적인 번역 생성 명령어가 없습니다. 개발자들은 파일을 Crowdin이나 Phrase 같은 외부 플랫폼으로 내보내야 합니다.

Intlayer는 완전한 네이티브 도구를 기본 제공합니다.

**로컬 AI 자동 채우기 (`intlayer fill`):**

소유한 OpenAI, Anthropic, Mistral, Gemini API 키를 사용하여 누락된 번역을 자동으로 생성합니다.

**자체 호스팅 비주얼 CMS:**

[Intlayer CMS](https://intlayer.org/ko/doc/concept/cms)를 연동하면 기획자나 마케터가 웹 UI에서 문구를 직접 수정하고 변경 사항을 Git에 커밋할 수 있습니다.

**오픈소스 라이선스:**

모든 컴포넌트가 Apache 2.0 라이선스로 제공됩니다.

## 지금도 vue-i18n이 유효한 경우는?

<AccordionGroup>
<Accordion header="기존 대규모 Nuxt 2/3 프로젝트">

라우팅 구조가 `@nuxtjs/i18n`과 깊게 얽혀 있다면 시스템을 전면 개편하는 것이 부담스러울 수 있습니다.

</Accordion>
<Accordion header="특수한 ICU 포맷팅 요구사항">

고도로 중첩된 메시지 링크나 복잡한 숫자/날짜 규칙을 폭넓게 사용 중인 경우.

</Accordion>
<Accordion header="가벼운 토이 프로젝트">

번들 크기가 성능이나 사용자 경험에 결정적인 영향을 미치지 않는 경우.

</Accordion>
</AccordionGroup>

## 기존 vue-i18n 설정을 어떻게 개선할 수 있을까요?

Intlayer는 `vue-i18n` 및 `@nuxtjs/i18n`의 함수 시그니처(`useI18n`, `$t`, `<i18n-t>`)를 그대로 재현하는 드롭인 호환성 패키지를 제공합니다. 템플릿이나 Composable을 다시 작성하지 않고도 컴파일러 기반의 가벼운 아키텍처가 제공하는 혜택을 누릴 수 있습니다.

설정은 단 한 줄의 명령어로 완료됩니다:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

이 대화형 CLI는 다음 작업을 자동으로 수행합니다:

1. `@intlayer/vue-i18n` 또는 `@intlayer/nuxt-i18n` 호환성 패키지를 설치합니다.
2. Vite 또는 Nuxt 번들러 별칭(alias)을 설정하여 기존 임포트 및 템플릿 태그가 Intlayer로 원활하게 라우팅되도록 연결하므로, `vue-i18n`을 `package.json`에서 안전하게 제거할 수 있습니다.
3. 에디터 내 언어 서버(LSP) 진단을 즉시 활성화하고, 클라이언트 번들에서 24KB 크기의 AST 파서를 완전히 제거하며, 대대적인 리팩토링 없이 로컬 AI 번역 워크플로우를 사용할 수 있게 합니다.

단계별 세부 내용은 다음 가이드를 참고하세요:

- **쉬운 호환성:** [`vue-i18n` 호환성 레이어](https://intlayer.org/ko/doc/compatibility/vue-i18n) 또는 [`@nuxtjs/i18n` 호환性 레이어](https://intlayer.org/ko/doc/compatibility/nuxtjs-i18n)를 이용해 기존 템플릿 코드를 그대로 유지할 수 있습니다.
- **단계별 이전 가이드:** JSON 파일을 구조화된 사전으로 변환하는 가이드를 참고하세요: [vue-i18n 마이그레이션](https://intlayer.org/ko/doc/migration/vue-i18n), [@nuxtjs/i18n 마이그레이션](https://intlayer.org/ko/doc/migration/nuxtjs-i18n).
- **하이브리드 구성:** `vue-i18n`을 런타임으로 유지하면서, [Intlayer와 vue-i18n을 함께 활용](https://intlayer.org/ko/blog/intlayer-with-vue-i18n)하여 엄격한 타입 검사와 로컬 AI 번역만 먼저 도입할 수도 있습니다.

무료 [i18n SEO 스캐너](https://intlayer.org/i18n-seo-scanner)를 통해 현재 웹사이트의 번들 누수와 크기를 분석해 보세요:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## 관련 글 보기

- [Vue & Vite i18n 벤치마크: 성능 세부 분석](https://intlayer.org/ko/doc/benchmark/vue)
- [vue-i18n vs Intlayer 비교 분석](https://intlayer.org/ko/blog/vue-i18n-vs-intlayer)
- [2026년에도 next-intl을 계속 써야 할까요?](https://intlayer.org/ko/blog/is-next-intl-outdated)
- [컴파일러 기반 i18n과 선언적 접근법의 차이](https://intlayer.org/ko/blog/compiler-vs-declarative-i18n)
