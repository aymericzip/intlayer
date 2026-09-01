---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: 소개
description: Intlayer의 작동 방식을 알아보세요. Intlayer가 애플리케이션에서 사용하는 단계를 확인하세요. 다양한 패키지가 어떤 역할을 하는지 알아보세요.
keywords:
  - 소개
  - 시작하기
  - Intlayer
  - 애플리케이션
  - 패키지
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer 문서

공식 Intlayer 문서에 오신 것을 환영합니다! 이곳에서 Next.js, React, Vite, Express 또는 기타 JavaScript 환경 등 어디에서 작업하든 모든 국제화(i18n) 요구 사항을 위해 Intlayer를 통합, 구성 및 마스터하는 데 필요한 모든 것을 찾을 수 있습니다.

## 소개

### Intlayer란 무엇인가요?

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 코드 내 어디에서나 콘텐츠를 선언할 수 있도록 해줍니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 코드에 쉽게 통합할 수 있게 합니다. TypeScript를 사용하여 **Intlayer**는 개발을 더욱 강력하고 효율적으로 만들어 줍니다.

Intlayer는 또한 콘텐츠를 쉽게 편집하고 관리할 수 있도록 해주는 선택적인 시각적 편집기(visual editor)를 제공합니다. 이 편집기는 콘텐츠 관리에 시각적 인터페이스를 선호하는 개발자나 코드에 대해 걱정하지 않고 콘텐츠를 생성하는 팀에 특히 유용합니다.

### 사용 예시

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      ko: "안녕 세상",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ko": "안녕 세상"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### 왜 대안들보다 Intlayer인가요?

`next-intl`이나 `i18next`와 같은 주요 솔루션과 비교하여 Intlayer는 다음과 같은 통합된 최적화를 제공하는 솔루션입니다:

<AccordionGroup>
<Accordion header="번들 크기 (Bundle size)">

거대한 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%까지 줄여줍니다**.

</Accordion>

<Accordion header="유지 보수성 (Maintainability)">

애플리케이션 콘텐츠의 범위를 제한하는 것은 대규모 애플리케이션의 **유지 보수를 용이하게 합니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능(feature) 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 콘텐츠의 정확성을 보장하기 위해 **완전히 타입화(fully typed)**되어 있습니다.

</Accordion>

<Accordion header="AI 에이전트 (AI Agent)">

콘텐츠를 코드와 같은 위치에 두면 대규모 언어 모델(LLM)이 **필요로 하는 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)** 등과 같은 일련의 도구가 함께 제공되어 AI 에이전트의 개발자 경험(DX)을 훨씬 더 매끄럽게 만듭니다.

</Accordion>

<Accordion header="자동화 (Automation)">

원하는 LLM과 AI 제공자의 비용으로 CI/CD 파이프라인에서 번역을 자동화하세요. Intlayer는 콘텐츠 추출을 자동화하는 **컴파일러(compiler)**를 제공할 뿐만 아니라 **백그라운드에서 번역**할 수 있도록 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)도 제공합니다.

</Accordion>

<Accordion header="성능 (Performance)">

거대한 JSON 파일을 컴포넌트에 연결하면 성능 및 반응성(reactivity) 문제가 발생할 수 있습니다. Intlayer는 빌드 시(build time) 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="비개발자와의 협업 및 확장 (Scaling with non-dev)">

단순한 i18n 솔루션을 넘어, Intlayer는 **자체 호스팅 가능한 [시각적 편집기(visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[완전한 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공하여 다국어 콘텐츠를 **실시간**으로 관리할 수 있도록 지원하며, 번역가, 카피라이터 및 기타 팀원과의 협업을 원활하게 합니다. 콘텐츠는 로컬 및/또는 원격에 저장될 수 있습니다.

</Accordion>
</AccordionGroup>

## 주요 기능

Intlayer는 현대 웹 개발의 요구를 충족하도록 설계된 다양한 기능을 제공합니다. 다음은 각 기능에 대한 자세한 문서로의 링크가 포함된 주요 기능입니다:

- **국제화 지원**: 내장된 국제화 지원으로 애플리케이션의 글로벌 도달 범위를 넓힙니다.
- **시각적 편집기(Visual Editor)**: Intlayer를 위해 설계된 편집기 플러그인으로 개발 워크플로우를 개선하세요. [시각적 편집기 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 확인하세요.
- **구성의 유연성**: [구성 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 자세히 설명된 포괄적인 구성 옵션으로 설정을 맞춤화하세요.
- **고급 CLI 도구**: Intlayer의 명령줄 인터페이스(CLI)를 사용하여 프로젝트를 효율적으로 관리하세요. [CLI 도구 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)에서 기능을 탐색해 보세요.

## 핵심 개념

### 사전(Dictionary)

다국어 콘텐츠를 코드 근처에 배치하여 모든 것을 일관되고 유지 관리하기 쉽게 구성하세요.

- **[시작하기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)**  
  Intlayer에서 콘텐츠를 선언하는 기본 사항을 배웁니다.

- **[번역(Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)**  
  번역이 애플리케이션에서 어떻게 생성, 저장, 활용되는지 이해합니다.

- **[열거(Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md)**  
  여러 언어에 걸쳐 반복되거나 고정된 데이터 세트를 쉽게 관리합니다.

- **[조건(Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/condition.md)**  
  Intlayer에서 조건부 논리를 사용하여 동적 콘텐츠를 만드는 방법을 배웁니다.

- **[삽입(Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md)**  
  삽입 자리 표시자를 사용하여 문자열에 값을 삽입하는 방법을 발견하세요.

- **[함수 페칭(Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md)**  
  프로젝트의 워크플로우와 일치하도록 사용자 정의 논리로 콘텐츠를 동적으로 가져오는(fetch) 방법을 확인합니다.

- **[마크다운(Markdown)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md)**  
  Intlayer에서 마크다운을 사용하여 풍부한 콘텐츠를 작성하는 방법을 배웁니다.

- **[파일 임베딩(File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/file.md)**  
  외부 파일을 Intlayer에 임베드하여 콘텐츠 편집기에서 사용하는 방법을 발견하세요.

- **[중첩(Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/nesting.md)**  
  Intlayer에서 콘텐츠를 중첩하여 복잡한 구조를 만드는 방법을 이해합니다.

### 환경 및 통합

저희는 유연성을 염두에 두고 Intlayer를 구축하여 인기 있는 프레임워크와 빌드 도구 전반에서 원활한 통합을 제공합니다:

- **[Intlayer와 Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)**
- **[Intlayer와 Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)**
- **[Intlayer와 Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_14.md)**
- **[Intlayer와 Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_page_router.md)**
- **[Intlayer와 React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)**
- **[Intlayer와 Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)**
- **[Intlayer와 React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_router_v7.md)**
- **[Intlayer와 Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)**
- **[Intlayer와 React Native 및 Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_native+expo.md)**
- **[Intlayer와 Lynx 및 React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_lynx+react.md)**
- **[Intlayer와 Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+preact.md)**
- **[Intlayer와 Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vue.md)**
- **[Intlayer와 Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nuxt.md)**
- **[Intlayer와 Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+svelte.md)**
- **[Intlayer와 SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_svelte_kit.md)**
- **[Intlayer와 Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_express.md)**
- **[Intlayer와 NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nestjs.md)**
- **[Intlayer와 Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_hono.md)**
- **[Intlayer와 Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_angular_21.md)**

각 통합 가이드에는 **서버 사이드 렌더링(SSR)**, **동적 라우팅**, **클라이언트 사이드 렌더링**과 같은 Intlayer의 기능을 사용하기 위한 모범 사례가 포함되어 있어 빠르고 SEO 친화적이며 확장성이 높은 애플리케이션을 유지할 수 있습니다.

## 기여 및 피드백

저희는 오픈 소스와 커뮤니티 주도 개발의 힘을 소중히 여깁니다. 개선 사항을 제안하거나 새로운 가이드를 추가하거나 문서의 문제를 수정하려면 [GitHub 리포지토리](https://github.com/aymericzip/intlayer/blob/main/docs/docs)에서 Pull Request를 제출하거나 Issue를 열어주시기 바랍니다.

**애플리케이션을 더 빠르고 효율적으로 번역할 준비가 되셨나요?** 오늘 바로 문서를 살펴보고 Intlayer 사용을 시작하세요. 콘텐츠를 체계적으로 유지하고 팀의 생산성을 높이는 강력하고 간소화된 국제화 접근 방식을 경험해 보세요.

## 자주 묻는 질문

<FAQ>

<Question title="Intlayer는 어떤 용도로 사용되나요?">

Intlayer는 JavaScript 및 TypeScript 애플리케이션을 위한 국제화(i18n) 라이브러리입니다. 컴포넌트의 콘텐츠를 컴포넌트 바로 옆의 `.content.ts` 파일에 선언하면, Intlayer가 빌드 타임에 이러한 선언을 타입 안전한 사전으로 컴파일하며 컴포넌트는 `useIntlayer`와 같은 훅을 통해 이를 읽습니다. 번역, 복수형 규칙, 성별, Markdown, 로케일 인식 라우팅, SEO 메타데이터, AI 지원 번역 및 비개발자를 위한 비주얼 에디터까지 종합적으로 지원합니다.

</Question>

<Question title="i18n이 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. 서버 렌더링 마크업은 서버에서 콘텐츠를 확인하고, 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거됩니다. [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 i18next, next-intl 또는 react-i18next에서 마이그레이션할 수 있나요?">

네, 두 가지 방법이 있습니다. [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md) 또는 [next-intl 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md)를 따라 점진적으로 이전할 수 있습니다. 또는 현재 API를 완전히 유지할 수도 있습니다: [호환 어댑터(compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)는 `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` 및 `Lingui`와 완전히 동일한 API를 노출하면서 Intlayer 사전에서 데이터를 제공하므로, import 구문만 변경하고 컴포넌트 코드는 그대로 유지할 수 있습니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 소스 파일을 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 참조하세요.

완전 자동화된 파이프라인을 위해 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)는 빌드 타임에 JSX, TSX, Vue 및 Svelte 소스에서 동일한 작업을 수행하여 변경될 때마다 사전을 생성하고 HMR을 통해 동기화하므로 수동으로 키를 관리할 필요가 없습니다. 정적 분석으로 작동하므로 런타임에만 존재하는 문자열은 제외되며, 사용자 텍스트와 애플리케이션 로직을 구분하기 위해 몇 가지 주석이 필요합니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="JavaScript 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

이 분야는 크게 세 세대로 구분됩니다:

- **런타임 카탈로그 라이브러리**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. 메시지가 런타임에 로드되는 JSON 네임스페이스에 존재합니다. 성숙하고 프레임워크에 구애받지 않지만 타입이 없고 번들 전체가 전달됩니다.
- **컴파일 타임 메시지 라이브러리**: `Lingui`, `Paraglide`, 그리고 추출 단계를 거치는 `react-intl`, `next-intl`. 더 나은 번들 동작과 일부 타입 검사를 제공하지만 여전히 중앙 집중식 카탈로그에 의존합니다.
- **콘텐츠 레이어 라이브러리**: `Intlayer`. 컴포넌트별로 콘텐츠를 선언하고 컴파일하므로 타입 안전성, 트리 쉐이킹(tree-shaking), 개발 도구 및 편집 기능이 동일한 소스에서 완벽하게 제공됩니다.

자세한 비교는 [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를, 번들 및 성능 측정 수치는 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="Intlayer는 어떤 프레임워크를 지원하나요?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, 모든 아일랜드 프레임워크를 지원하는 Astro, Expo를 포함한 React Native, Lynx, 그리고 서버 측에서는 Express, Fastify, NestJS, Hono, Elysia, AdonisJS를 지원합니다. 각각 [environments](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/introduction.md)에서 전용 가이드를 제공합니다.

</Question>

<Question title="중앙 JSON 파일 대신 컴포넌트 옆에 콘텐츠를 선언하는 이유는 무엇인가요?">

세 가지 이유가 있습니다. 첫째, 전체 네임스페이스 대신 컴포넌트가 렌더링하는 항목만 전달하므로 번들 크기가 대폭 줄어듭니다. 둘째, 기능 폴더를 복사하거나 삭제할 때 공유 카탈로그에서 고아 키를 찾을 필요 없이 한 번에 관리할 수 있습니다. 셋째, 컴포넌트를 편집하는 LLM이나 AI 에이전트가 동일한 폴더에서 콘텐츠를 직접 볼 수 있어 AI 지원 작업이 훨씬 정확하고 안정적입니다. [Intlayer 작동 방식](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/how_works_intlayer.md)을 참조하세요.

</Question>

<Question title="AI를 사용하여 앱을 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. CLI가 누락된 번역을 감지하고 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 채워주므로 비용을 AI 제공업체에 직접 지불합니다. `--git-diff`를 사용하면 브랜치에서 변경된 콘텐츠로만 작업 범위를 제한하여 CI 비용을 절감할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="누락된 번역은 어떻게 감지하나요?">

`npx intlayer test`를 실행하세요. 선언된 로케일에 콘텐츠가 누락되면 실패하므로 번역되지 않은 문자열이 프로덕션에 절대 배포되지 않습니다. [VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)은 동일한 오류를 인라인으로 표시하며, [ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)은 `no-raw-text` 규칙을 통해 하드코딩된 문자열을 표시합니다. [콘텐츠 테스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)를 참조하세요.

</Question>

<Question title="URL에 로케일을 반드시 포함해야 하나요?">

아닙니다. `routing.mode`는 `"prefix-no-default"`(기본값: `/about` 및 `/ko/about`), `"prefix-all"`, `"no-prefix"`, `"search-params"`를 지원하며, `routing.domains`를 통해 각 로케일을 자체 도메인에 매핑할 수도 있습니다. 어떤 방식을 선택하든 `getMultilingualUrls`가 메타데이터와 사이트맵을 위한 `hreflang` 대체를 자동으로 구축합니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="번역가와 콘텐츠 편집자가 코드를 건드리지 않고 작업하려면 어떻게 하나요?">

[비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)는 자체 인프라에서 실행되며 실행 중인 앱의 텍스트를 클릭하여 직접 수정한 후 변경 사항을 코드베이스에 다시 기록할 수 있도록 지원합니다. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)는 배포 없이 변경될 수 있도록 콘텐츠를 외부화하며, [실시간 동기화(live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live.md)를 통해 런타임에 업데이트를 즉시 적용합니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네. Intlayer는 Apache 2.0 라이선스에 따른 오픈 소스이며, 라이브러리, CLI, 컴파일러 및 비주얼 에디터는 상업용 프로젝트를 포함하여 무료로 사용할 수 있습니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>
