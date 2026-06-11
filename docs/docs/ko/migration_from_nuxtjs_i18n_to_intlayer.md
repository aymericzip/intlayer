---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "@nuxtjs/i18n에서 Intlayer로 마이그레이션하기 | 국제화 (i18n)"
description: "기존 코드를 손상시키지 않고 단계별로 Nuxt 애플리케이션을 @nuxtjs/i18n에서 Intlayer로 마이그레이션하는 방법을 알아봅니다. 원활한 전환을 위해 @intlayer/vue-i18n 호환성 어댑터를 사용하세요."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - 마이그레이션
  - 국제화
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# @nuxtjs/i18n에서 Intlayer로 마이그레이션하기

## 왜 @nuxtjs/i18n에서 Intlayer로 마이그레이션해야 하나요?

<AccordionGroup>

<Accordion header="번들 크기">

거대한 JSON 파일을 페이지에 불러오는 대신, 필요한 콘텐츠만 불러옵니다. Intlayer는 **번들 및 페이지 크기를 최대 50%까지 줄이도록** 도와줍니다.

</Accordion>

<Accordion header="유지보수성">

애플리케이션 콘텐츠의 스코프를 나누면 대규모 애플리케이션의 **유지보수가 쉬워집니다**. 전체 콘텐츠 코드베이스를 검토할 필요 없이 기능 디렉토리를 복제하거나 삭제할 수 있습니다. 게다가 Intlayer는 콘텐츠의 정확성을 보장하기 위해 **강력한 타입이 적용**되어 있습니다.

Intlayer는 i18n 생태계에서 **가장 활발하게 개발되는** 솔루션이기도 합니다. 문제가 신속히 해결되고 새로운 프레임워크 어댑터가 주기적으로 추가되며, 실제 운영 환경의 피드백을 기반으로 핵심 API가 지속적으로 개선됩니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠의 위치를 통일(Colocation)하면 대규모 언어 모델(LLM)에 필요한 **컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)** 및 **[에이전트 스킬](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)** 등 일련의 도구가 있어 AI 에이전트를 위한 개발자 경험(DX)이 훨씬 매끄러워집니다.

</Accordion>

<Accordion header="자동화">

AI 제공 업체의 비용만으로 원하는 LLM을 사용하여 CI/CD 파이프라인에서 번역을 자동화하세요. Intlayer는 콘텐츠 추출을 자동화하기 위한 **컴파일러**와 **백그라운드 번역**을 지원하는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)도 제공합니다.

</Accordion>

<Accordion header="성능">

거대한 JSON 파일을 컴포넌트에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시간에 콘텐츠를 불러오도록 최적화합니다.

</Accordion>

<Accordion header="비개발자와의 스케일업">

Intlayer는 단순한 i18n 솔루션을 넘어, 자체 호스팅이 가능한 **[시각적 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 다국어 콘텐츠를 **실시간**으로 관리할 수 있는 **[풀 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공합니다. 이를 통해 번역가, 카피라이터 및 기타 팀 구성원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

</Accordion>

</AccordionGroup>

---

## 마이그레이션 전략

`@nuxtjs/i18n`은 내부적으로 `vue-i18n`에 의해 작동하므로, Intlayer로 마이그레이션하기 위한 두 가지 보완적 전략이 있습니다:

1. **호환성 어댑터 (기존 앱에 권장)** — `@intlayer/vue-i18n`과 `nuxt-intlayer`를 설치하세요. 이 기능은 `vue-i18n`과 **정확히 동일한 API**를 노출하지만, 모든 번역 작업을 Intlayer에 위임합니다. `$t`, `useI18n()` 및 Nuxt 라우팅에 대한 기존 호출은 그대로 유지됩니다. 변경 사항은 초기화뿐입니다.

2. **전체 마이그레이션** — `@nuxtjs/i18n` API를 점진적으로 기본 Intlayer 훅(`useIntlayer`)으로 교체하고 컴포넌트와 함께 `.content.ts` 파일 내에 콘텐츠를 배치합니다.

이 가이드에서는 먼저 **전략 1** (쉽게 도입할 수 있는 호환성 어댑터)에 대해 설명하고, 선택 사항인 전체 마이그레이션에 대해 알아봅니다.

---

## 목차

<TOC/>

---

## 빠른 마이그레이션

다음 단계는 컴포넌트 코드를 변경하지 않고 기존 Nuxt 앱을 Intlayer에서 실행하기 위해 필요한 최소한의 작업입니다.

<Steps>

<Step number={1} title="의존성 설치">

Intlayer 핵심 패키지와 호환성 어댑터를 설치합니다:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
bun x intlayer init
```

> 조만간 Nuxt 설정에서 `@nuxtjs/i18n`을 제거하겠지만 마이그레이션하는 동안 안전하게 설치해 둘 수 있습니다.

</Step>

<Step number={2} title="Intlayer 설정">

`intlayer init` 명령어는 초기 `intlayer.config.ts` 파일을 만듭니다. 기존 로케일(언어)과 일치하도록 업데이트하고 `syncJSON` 플러그인이 메시지 파일을 가리키도록 설정하세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 기존에 사용하던 모든 로케일을 여기에 추가하세요
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // vue-i18n 플레이스홀더 구문인 {name}과 일치시킵니다.
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`**는 로케일을 해당 JSON 파일 경로로 매핑합니다. **`location`**은 Intlayer 관찰자(Watcher)에게 변경 사항을 모니터링할 폴더를 알려줍니다. `format: 'icu'` 옵션은 `vue-i18n` 플레이스홀더가 올바르게 분석되도록 보장합니다.

</Step>

<Step number={3} title="Nuxt 설정 업데이트">

`nuxt.config.ts`에서 `@nuxtjs/i18n` 모듈을 `nuxt-intlayer`로 교체하세요. Intlayer 플러그인이 모듈 별칭을 자동으로 주입하므로, 기존의 `import { useI18n } from 'vue-i18n'` 호출이 부드럽게 `@intlayer/vue-i18n`으로 리디렉션됩니다.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // '@nuxtjs/i18n' 삭제
  modules: ["nuxt-intlayer"],
});
```

> **더 이상 Nuxt i18n 구성 객체를 정의할 필요가 없습니다.** Intlayer는 모든 사전을 **빌드 시간**에 컴파일하고, 로케일 감지, 라우팅 및 사전 불러오기를 매끄럽게 처리합니다.

</Step>

</Steps>

이것으로 빠른 마이그레이션이 완료되었습니다. 이제 Nuxt 앱은 모든 `$t` 호출 및 `useI18n()`을 그대로 유지한 채 Intlayer에서 작동합니다.

---

## 전체 마이그레이션

아래 단계는 선택 사항이며 점진적으로 수행할 수 있습니다. 이는 시각적 에디터, CMS, 타입이 있는 콘텐츠 파일, AI 지원 번역 자동화 등 Intlayer의 전체 기능을 열어줍니다.

<Steps>

<Step number={4} title="명시적으로 가져오기 이름 변경 (선택 사항)" isOptional={true}>

Intlayer 플러그인은 이미 번들러 수준에서 별칭 지정을 처리합니다. 소스 파일에서 명시적으로 의존성을 나타내고 싶다면 수동으로 가져오기 경로를 변경할 수 있습니다:

| 변경 전                              | 변경 후                                        |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

이는 **드롭인 교체(Drop-in replacements)**이므로 함수 호출 시그니처, 매개변수, 반환 타입을 변경할 필요가 없습니다.

</Step>

<Step number={5} title="AI 기반 번역 자동화 활성화" isOptional={true}>

Intlayer 설정이 완료되면, CLI를 사용하여 누락된 번역을 자동으로 채울 수 있습니다:

```bash packageManager="npm"
# 누락된 번역 테스트 (CI에 추가)
npx intlayer test

# AI를 사용하여 누락된 번역 채우기
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

AI 구성을 `intlayer.config.ts`에 추가하세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // 기본값
    // model: "gpt-4o-mini",   // 기본값
  },
};

export default config;
```

> 사용할 수 있는 모든 옵션은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)에서 확인하세요.

</Step>

</Steps>

---

## 마이그레이션 후 삭제할 수 있는 항목

호환성 어댑터가 제자리에 배치되면 기존에 사용하던 다음 상용구를 삭제할 수 있습니다:

| 파일 / 패턴                        | 더 이상 필요 없는 이유                                                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `nuxt.config.ts` 내의 `i18n` 설정  | Intlayer가 내부적으로 라우팅, 사전 불러오기, 기본 로케일 처리를 수행합니다.                                                           |
| `package.json` 안의 `@nuxtjs/i18n` | `nuxt-intlayer`로 완전히 대체되었습니다.                                                                                              |
| JSON 언어 번들 (`locales/*.json`)  | JSON 번들은 `syncJSON` 플러그인을 여전히 사용할 때만 필요합니다. `.content.ts` 파일로 이전을 완료하면 JSON 폴더를 삭제할 수 있습니다. |

한 단계 더 나아갈 준비가 되면 Intlayer는 **코드베이스 내의 모든 `.content.ts` 및 `.content.json` 파일을 자동으로 감지합니다**(기본적으로 `./src` 내의 어느 곳에서든). `MyComponent.vue` 바로 옆에 `my-component.content.ts` 파일을 추가하기만 하면 Intlayer는 별도 설정 없이 컴파일 타임에 이를 감지합니다 — 가져오기, 등록, 중앙 인덱스 파일이 필요 없습니다. 페이지와 컴포넌트에서 번역의 위치 통일이 매우 매끄러워집니다.

---

## TypeScript 설정

Intlayer는 번역 키에 대해 전체 TypeScript IntelliSense(자동 완성)를 제공하기 위해 모듈 확장을 사용합니다. `tsconfig.json` 파일에 자동으로 생성된 타입이 포함되어 있는지 확인하세요:

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동으로 생성된 타입 포함
  ],
}
```

---

## Git 설정

Intlayer가 생성한 디렉토리를 `.gitignore`에 추가하세요:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

---

## 더 알아보기

- **시각적 에디터** — 브라우저에서 시각적으로 번역을 관리하세요: [Intlayer 시각적 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
- **CMS** — 콘텐츠를 외부로 분리하고 원격으로 관리하세요: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)
- **VS Code 확장** — 실시간 번역 자동 완성 및 오류 감지를 경험하세요: [Intlayer VS Code 확장](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)
- **CLI 레퍼런스** — 사용 가능한 CLI 명령어 목록: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- **Intlayer와 Nuxt** — Nuxt 전체 설정 가이드: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nuxt.md)
- **Intlayer와 Vue** — Vue 전체 설정 가이드: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vue.md)
