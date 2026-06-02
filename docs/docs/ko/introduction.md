---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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

콘텐츠를 코드와 같은 위치에 두면 대규모 언어 모델(LLM)이 **필요로 하는 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)** 및 **[에이전트 스킬(agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)** 등과 같은 일련의 도구가 함께 제공되어 AI 에이전트의 개발자 경험(DX)을 훨씬 더 매끄럽게 만듭니다.

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
