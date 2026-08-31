---
createdAt: 2024-08-12
updatedAt: 2026-08-30
title: Intlayer 작동 방식
description: Intlayer가 내부적으로 어떻게 작동하는지 알아보세요. Intlayer를 강력하게 만드는 아키텍처와 구성 요소를 이해하십시오.
keywords:
  - Intlayer
  - 어떻게 작동하는가
  - 아키텍처
  - 구성 요소
  - 내부 작동
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# Intlayer 작동 방식

## 목차

<TOC/>

## 개요

Intlayer의 주요 아이디어는 컴포넌트별 콘텐츠 관리를 채택하는 것입니다. 즉, Intlayer의 아이디어는 코드베이스 어디에서나, 컴포넌트와 동일한 디렉토리에서 콘텐츠를 선언할 수 있도록 하는 것입니다.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

이를 위해 Intlayer의 역할은 프로젝트에 존재하는 다양한 형식의 `콘텐츠 선언 파일`을 모두 찾아내고, 이를 기반으로 `사전(dictionary)`을 생성하는 것입니다.

따라서 두 가지 주요 단계가 있습니다:

- 빌드 단계
- 해석 단계

### 사전 빌드 단계

빌드 단계는 세 가지 방법으로 수행할 수 있습니다:

- CLI를 사용하여 `npx intlayer build` 실행
- [vscode 확장](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md) 사용
- [`vite-intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/index.md)와 같은 앱 플러그인 또는 [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/index.md)용 동등한 플러그인을 사용하는 방법. 이러한 플러그인 중 하나를 사용하면 Intlayer는 애플리케이션을 시작(개발)하거나 빌드(프로덕션)할 때 자동으로 사전을 빌드합니다.

1. 콘텐츠 파일 선언
   - 콘텐츠 파일은 TypeScript, ECMAScript, CommonJS 또는 JSON과 같은 다양한 형식으로 정의할 수 있습니다.
   - 콘텐츠 파일은 프로젝트 어디에서나 정의할 수 있어 유지 관리와 확장성이 향상됩니다. 콘텐츠 파일의 파일 확장자 규칙을 준수하는 것이 중요합니다. 기본 확장자는 `*.content.{js|cjs|mjs|ts|tsx|json}`이지만, [설정 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에서 수정할 수 있습니다.

2. `사전(dictionary)` 생성
   - 사전은 콘텐츠 파일에서 생성됩니다. 기본적으로 Intlayer 사전은 프로젝트의 `.intlayer/dictionaries` 디렉토리에 생성됩니다.
   - 이러한 사전은 모든 요구를 충족하고 애플리케이션 성능을 최적화하기 위해 다양한 형식으로 생성됩니다.

3. 사전 타입 생성

4. 사전 타입 생성
   `사전(dictionary)`을 기반으로 Intlayer는 애플리케이션에서 사용할 수 있는 타입을 생성합니다.

- 사전 타입은 Intlayer의 `콘텐츠 선언 파일(content declaration files)`에서 생성됩니다. 기본적으로 Intlayer 사전 타입은 프로젝트의 `.intlayer/types` 디렉토리에 생성됩니다.

- Intlayer [모듈 확장(module augmentation)](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)은 Intlayer에 추가 타입을 정의할 수 있는 TypeScript 기능입니다. 이를 통해 사용 가능한 인수 또는 필요한 인수를 제안하여 개발 경험을 향상시킵니다.
  생성된 타입 중에서 Intlayer 사전 타입 또는 언어 구성 타입이 `types/intlayer.d.ts` 파일에 추가되고 다른 패키지에서 사용됩니다. 이를 위해 `tsconfig.json` 파일이 프로젝트의 `types` 디렉토리를 포함하도록 구성되어야 합니다.

### 사전 해석 단계

Intlayer를 사용하면 `useIntlayer` 훅을 사용하여 애플리케이션에서 콘텐츠에 액세스할 수 있습니다.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

이 훅은 로케일 감지를 관리하고 현재 로케일에 대한 콘텐츠를 반환합니다. 이 훅을 사용하면 마크다운 해석, 복수형 관리 등을 수행할 수 있습니다.

> Intlayer의 모든 기능을 보려면 [사전 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 읽어보세요.

## 원격 콘텐츠

Intlayer를 사용하면 콘텐츠를 로컬에서 선언한 후 CMS로 내보내어 비기술 팀이 편집할 수 있도록 할 수 있습니다.

따라서 Git으로 코드를 관리하는 것과 유사한 방식으로 CMS에서 애플리케이션으로 콘텐츠를 푸시하고 가져올 수 있습니다.

CMS를 사용하는 외부 사전의 경우, Intlayer는 원격 사전을 가져오는 기본적인 fetch 작업을 수행하고 이를 로컬 사전과 병합합니다. 프로젝트에 구성된 경우, Intlayer는 애플리케이션 시작(개발) 또는 빌드(프로덕션) 시 CMS에서 콘텐츠를 자동으로 가져오는 작업을 관리합니다.

## 시각적 편집기

Intlayer는 콘텐츠를 시각적으로 편집할 수 있는 시각적 편집기도 제공합니다. 이 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)는 외부 `intlayer-editor` 패키지에서 사용할 수 있습니다.

![시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- 서버는 클라이언트의 요청을 수신하고 애플리케이션의 콘텐츠(예: `dictionaries` 및 구성)를 검색하여 클라이언트 측에서 접근할 수 있도록 하는 간단한 Express 애플리케이션입니다.
- 한편, 클라이언트는 시각적 인터페이스를 사용하여 콘텐츠와 상호작용하는 데 사용되는 React 애플리케이션입니다.

- 서버는 클라이언트의 요청을 수신하고 애플리케이션의 `dictionaries`와 같은 콘텐츠 및 구성을 가져와 클라이언트 측에서 접근할 수 있도록 하는 간단한 Express 애플리케이션입니다.
- 반면 클라이언트는 시각적 인터페이스를 사용하여 콘텐츠와 상호작용하는 데 사용되는 React 애플리케이션입니다.
  `useIntlayer`를 사용하여 콘텐츠를 호출하고 편집기가 활성화되면, 자동으로 문자열을 `IntlayerNode`라는 Proxy 객체로 감쌉니다. 이 노드는 `window.postMessage`를 사용하여 시각적 편집기 인터페이스가 포함된 래핑된 iframe과 통신합니다.  
  편집기 측에서는 이러한 메시지를 수신하여 실제 콘텐츠와 상호작용하는 것처럼 시뮬레이션하며, 애플리케이션 컨텍스트 내에서 직접 텍스트를 편집할 수 있도록 합니다.

## 애플리케이션 빌드 최적화

애플리케이션의 번들 크기를 최적화하기 위해 Intlayer는 애플리케이션 빌드를 최적화하는 두 가지 플러그인을 제공합니다: `@intlayer/babel` 및 `@intlayer/swc` 플러그인.

애플리케이션 번들 크기를 최적화하기 위해 Intlayer는 `@intlayer/babel` 및 `@intlayer/swc` 플러그인을 제공합니다.  
Babel 및 SWC 플러그인은 애플리케이션의 추상 구문 트리(Abstract Syntax Tree, AST)를 분석하여 Intlayer 함수 호출을 최적화된 코드로 대체하는 방식으로 작동합니다. 이 과정은 실제로 사용되는 사전만 가져오도록 하여 청킹(chunking)을 최적화하고 번들 크기를 줄임으로써 프로덕션에서 최종 번들을 더 가볍게 만듭니다.

개발 모드에서는 Intlayer가 사전을 중앙 집중식 정적 가져오기로 사용하여 개발 경험을 단순화합니다.

[설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에서 `importMode = "dynamic"` 옵션을 활성화하면 Intlayer는 동적 가져오기를 사용하여 사전을 로드합니다. 이 옵션은 애플리케이션 렌더링 시 비동기 처리를 방지하기 위해 기본적으로 비활성화되어 있습니다.

> `@intlayer/babel`는 `vite-intlayer` 패키지에 기본으로 포함되어 있습니다.

> `@intlayer/swc`는 Next.js에서 SWC 플러그인이 아직 실험적이므로 `next-intlayer` 패키지에 기본적으로 설치되어 있지 않습니다.

애플리케이션 빌드를 구성하는 방법을 보려면 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 읽어보세요.

## 패키지

Intlayer는 번역 프로세스에서 특정 역할을 하는 여러 패키지로 구성됩니다. 다음은 이 패키지 구조의 그래픽 표현입니다:

![intlayer 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` 패키지는 애플리케이션에서 콘텐츠 파일 내의 콘텐츠를 선언하는 데 사용됩니다.

### react-intlayer

`react-intlayer` 패키지는 Intlayer 사전을 해석하여 React 애플리케이션에서 사용할 수 있도록 합니다.

### next-intlayer

`next-intlayer` 패키지는 `react-intlayer` 위에 레이어로 작동하여 Intlayer 사전을 Next.js 애플리케이션에서 사용할 수 있도록 합니다. 번역 미들웨어, 라우팅, 또는 `next.config.js` 파일 구성과 같은 Next.js 환경에서 Intlayer가 작동하도록 필수 기능을 통합합니다.

### vue-intlayer

`vue-intlayer` 패키지는 Intlayer 사전을 해석하여 Vue 애플리케이션에서 사용할 수 있도록 합니다.

### nuxt-intlayer

`nuxt-intlayer` 패키지는 Nuxt 모듈로서 Intlayer 사전을 Nuxt 애플리케이션에서 사용할 수 있도록 합니다. 이 패키지는 번역 미들웨어, 라우팅, `nuxt.config.js` 파일 구성 등 Nuxt 환경에서 Intlayer가 작동하는 데 필요한 필수 기능을 통합합니다.

### svelte-intlayer (작업 중)

`svelte-intlayer` 패키지는 Intlayer 사전을 해석하여 Svelte 애플리케이션에서 사용할 수 있도록 합니다.

### solid-intlayer (작업 중)

`solid-intlayer` 패키지는 Intlayer 사전을 해석하여 Solid.js 애플리케이션에서 사용할 수 있도록 합니다.

### preact-intlayer

`preact-intlayer` 패키지는 Intlayer 사전을 해석하여 Preact 애플리케이션에서 사용할 수 있도록 합니다.

### angular-intlayer (작업 중)

`angular-intlayer` 패키지는 Intlayer 사전을 해석하여 Angular 애플리케이션에서 사용할 수 있도록 합니다.

### express-intlayer

`express-intlayer` 패키지는 Express.js 백엔드에서 Intlayer를 사용할 수 있도록 합니다.

### react-native-intlayer

`react-native-intlayer` 패키지는 Metro 번들러와 함께 작동하도록 Intlayer 플러그인을 통합하는 도구를 제공합니다.

### lynx-intlayer

`lynx-intlayer` 패키지는 Lynx 번들러와 함께 작동하도록 Intlayer 플러그인을 통합하는 도구를 제공합니다.

### vite-intlayer

[Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 Intlayer를 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### react-scripts-intlayer

`react-scripts-intlayer` 명령어와 플러그인을 포함하며, Create React App 기반 애플리케이션과 Intlayer를 통합하는 데 사용됩니다. 이 플러그인들은 [craco](https://craco.js.org/)를 기반으로 하며, [Webpack](https://webpack.js.org/) 번들러에 대한 추가 구성을 포함합니다.

### intlayer-editor

`intlayer-editor` 패키지는 시각적 편집기를 사용할 수 있도록 하는 데 사용됩니다. 이 패키지는 선택 사항으로, 애플리케이션에 설치할 수 있으며 `react-intlayer` 패키지에서 사용됩니다.  
이 패키지는 서버와 클라이언트 두 부분으로 구성됩니다.

클라이언트는 `react-intlayer`에서 사용될 UI 요소를 포함합니다.

Express를 기반으로 한 서버는 시각적 편집기 요청을 수신하고 콘텐츠 파일을 관리하거나 수정하는 데 사용됩니다.

### intlayer-cli

`intlayer-cli` 패키지는 `npx intlayer dictionaries build` 명령어를 사용하여 사전을 생성하는 데 사용할 수 있습니다. `intlayer`가 이미 설치되어 있다면 CLI는 자동으로 설치되며 이 패키지는 필요하지 않습니다.

### @intlayer/core

`@intlayer/core` 패키지는 Intlayer의 주요 패키지입니다. 이 패키지는 번역 및 사전 관리 기능을 포함하고 있습니다. `@intlayer/core`는 다중 플랫폼에서 사용 가능하며, 다른 패키지에서 사전 해석을 수행하는 데 사용됩니다.

### @intlayer/config

`@intlayer/config` 패키지는 사용 가능한 언어, Next.js 미들웨어 매개변수 또는 통합 편집기 설정과 같은 Intlayer 설정을 구성하는 데 사용됩니다.

### @intlayer/webpack

`@intlayer/webpack` 패키지는 Webpack 기반 애플리케이션이 Intlayer와 함께 작동하도록 Webpack 구성을 제공하는 데 사용됩니다. 이 패키지는 기존 Webpack 애플리케이션에 추가할 수 있는 플러그인도 제공합니다.

### @intlayer/cli

`@intlayer/cli` 패키지는 Intlayer 명령줄 인터페이스와 관련된 스크립트를 선언하는 데 사용되는 NPM 패키지입니다. 이 패키지는 모든 Intlayer CLI 명령어의 일관성을 보장합니다. 이 패키지는 특히 [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ko/packages/intlayer-cli/index.md) 및 [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ko/packages/intlayer/index.md) 패키지에서 사용됩니다.

### @intlayer/mcp

`@intlayer/mcp` 패키지는 Intlayer 생태계에 맞춘 AI 기반 IDE 지원을 제공하는 MCP(Model Context Protocol) 서버를 제공합니다. 이 서버는 문서를 자동으로 로드하며 Intlayer CLI와 통합됩니다.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

`@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` 및 `@intlayer/dynamic-dictionaries-entry` 패키지는 Intlayer 사전의 진입 경로를 반환합니다. 브라우저에서 파일 시스템을 검색하는 것이 불가능하기 때문에, Webpack이나 Rollup과 같은 번들러를 사용하여 사전의 진입 경로를 가져오는 것은 불가능합니다. 이 패키지들은 별칭(alias)으로 설계되어 Vite, Webpack, Turbopack 등 다양한 번들러에서 번들링 최적화를 가능하게 합니다.

### @intlayer/engine

`@intlayer/engine` 패키지는 콘텐츠 파일을 모니터링하고 수정될 때마다 변경된 사전을 재생성하는 데 사용됩니다.

### @intlayer/editor

`@intlayer/editor` 패키지는 사전 편집기와 관련된 유틸리티를 제공합니다. 특히 애플리케이션과 Intlayer 편집기를 연결하는 API와 사전을 조작하는 유틸리티를 포함합니다. 이 패키지는 크로스 플랫폼입니다.

### @intlayer/editor-react

`@intlayer/editor-react` 패키지는 React 애플리케이션과 Intlayer 편집기를 연결하기 위한 상태, 컨텍스트, 훅 및 컴포넌트를 제공합니다.

### @intlayer/babel

`@intlayer/babel` 패키지는 Vite 및 Webpack 기반 애플리케이션의 사전 번들링을 최적화하는 도구를 제공합니다.

### @intlayer/swc

`@intlayer/swc` 패키지는 Next.js 애플리케이션의 사전 번들링을 최적화하는 도구를 제공합니다.

### @intlayer/api

`@intlayer/api` 패키지는 백엔드와 상호작용하기 위한 API SDK입니다.

### @intlayer/design-system

`@intlayer/design-system` 패키지는 CMS와 시각적 편집기 간의 디자인 요소를 공유하는 데 사용됩니다.

### @intlayer/backend

`@intlayer/backend` 패키지는 백엔드 유형을 내보내며, 향후 독립형 패키지로 백엔드를 제공할 예정입니다.

## 스마트 문서와 채팅하기

- [스마트 문서에 질문하기](https://intlayer.org/doc/chat)

## 자주 묻는 질문

<FAQ>

<Question title="사전은 빌드 타임에 빌드되나요, 아니면 런타임에 빌드되나요?">

빌드 타임에 빌드됩니다. 번들러 플러그인 또는 `npx intlayer build`가 `.content.ts` 파일을 스캔하여 `.intlayer` 폴더에 사전으로 컴파일하고 해당하는 TypeScript 타입을 생성합니다. 런타임 시 컴포넌트는 결과물만 읽으므로 요청 경로에서 파싱이나 파일 로딩이 전혀 발생하지 않습니다.

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

<Question title=".intlayer 폴더는 무엇이며 Git에 커밋해야 하나요?">

컴파일된 사전과 생성된 타입이 포함된 생성 출력 디렉토리입니다. 콘텐츠 파일로부터 유도되므로 `dist` 폴더와 마찬가지로 `.gitignore`에 등록하고 빌드 단계에서 다시 생성해야 합니다.

</Question>

<Question title="활성 로케일은 어떻게 결정되나요?">

`routing.storage`에 나열된 순서대로 소스를 읽어 결정됩니다: `routing.mode`에서 접두사를 사용하는 경우의 URL 접두사, 쿠키, `Accept-Language` 헤더, 기본 로케일 순입니다. 사용자가 명시적으로 선택한 로케일은 저장되어 다음 방문 시에도 유지됩니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="로컬 사전과 원격 사전의 차이점은 무엇인가요?">

로컬 사전은 코드베이스에 선언되어 애플리케이션과 함께 컴파일됩니다. 원격 사전은 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)에서 관리되고 런타임에 확인되므로 배포 없이도 변경될 수 있습니다. 둘 다 동일한 훅을 통해 읽히며, 원격 콘텐츠를 사용할 수 없는 경우 로컬 선언으로 원활하게 폴백됩니다.

</Question>

<Question title="Intlayer는 TypeScript 없이도 작동하나요?">

네. 콘텐츠 파일은 TypeScript, JavaScript, ESM, CommonJS 또는 JSON으로 작성할 수 있습니다. TypeScript는 생성된 타입과 자동 완성을 활성화하므로 권장되지만 필수는 아닙니다.

</Question>

<Question title="서버 렌더링과 클라이언트 렌더링이 동일한 콘텐츠를 어떻게 공유하나요?">

서버는 서버 렌더링된 컴포넌트의 콘텐츠를 직접 확인하므로 해당 마크업에 대해 클라이언트로 사전이 전송되지 않습니다. 클라이언트 컴포넌트는 서버에서 확인된 로케일을 수신하는 프로바이더를 통해 동일한 사전을 읽으므로, 첫 번째 클라이언트 렌더링이 서버 HTML과 일치하여 다른 언어로 깜빡이는 현상(flash)이 발생하지 않습니다.

</Question>

<Question title="Intlayer는 로케일로 인한 하이드레이션 불일치(hydration mismatch)를 어떻게 방지하나요?">

로케일은 브라우저에서 다시 감지되는 대신 서버에서 한 번 확인되어 프로바이더로 전달됩니다. 클라이언트는 서버가 렌더링한 것과 동일한 로케일에서 시작하므로 마크업이 정확히 일치하여 클라이언트 측 로케일 감지에서 흔히 발생하는 문제가 해결됩니다.

</Question>

<Question title="번역을 추가할 때 다시 빌드해야 하나요?">

개발 환경에서는 필요하지 않습니다. 플러그인이 콘텐츠 파일을 감시하고 저장 시 영향을 받는 사전을 자동으로 다시 빌드합니다. 프로덕션 환경에서는 사전이 빌드의 일부가 되지만, 원격 콘텐츠인 경우 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md) 및 [실시간 동기화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/live.md)를 통해 배포 없이 변경 사항을 적용할 수 있습니다.

</Question>

</FAQ>
