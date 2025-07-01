---
createdAt: 2024-08-12
updatedAt: 2025-06-29
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
---

# Intlayer 작동 방식

## 개요

Intlayer의 주요 아이디어는 컴포넌트별 콘텐츠 관리를 채택하는 것입니다. 즉, Intlayer의 아이디어는 코드베이스 어디에서나, 컴포넌트와 동일한 디렉토리에서 콘텐츠를 선언할 수 있도록 하는 것입니다.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
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

> Intlayer의 모든 기능을 보려면 [사전 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 읽어보세요.

## 원격 콘텐츠

Intlayer를 사용하면 콘텐츠를 로컬에서 선언한 후 CMS로 내보내어 비기술 팀이 편집할 수 있도록 할 수 있습니다.

따라서 Git으로 코드를 관리하는 것과 유사한 방식으로 CMS에서 애플리케이션으로 콘텐츠를 푸시하고 가져올 수 있습니다.

CMS를 사용하는 외부 사전의 경우, Intlayer는 원격 사전을 가져오는 기본적인 fetch 작업을 수행하고 이를 로컬 사전과 병합합니다. 프로젝트에 구성된 경우, Intlayer는 애플리케이션 시작(개발) 또는 빌드(프로덕션) 시 CMS에서 콘텐츠를 자동으로 가져오는 작업을 관리합니다.

## 시각적 편집기

Intlayer는 콘텐츠를 시각적으로 편집할 수 있는 시각적 편집기도 제공합니다. 이 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)는 외부 `intlayer-editor` 패키지에서 사용할 수 있습니다.

![시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

- 서버는 클라이언트의 요청을 수신하고 애플리케이션의 `dictionaries`와 같은 콘텐츠 및 구성을 가져와 클라이언트 측에서 접근할 수 있도록 하는 간단한 Express 애플리케이션입니다.
- 반면 클라이언트는 시각적 인터페이스를 사용하여 콘텐츠와 상호작용하는 데 사용되는 React 애플리케이션입니다.
  `useIntlayer`를 사용하여 콘텐츠를 호출하고 편집기가 활성화되면, 자동으로 문자열을 `IntlayerNode`라는 Proxy 객체로 감쌉니다. 이 노드는 `window.sendMessage`를 사용하여 시각적 편집기 인터페이스가 포함된 래핑된 iframe과 통신합니다.  
  편집기 측에서는 이러한 메시지를 수신하여 실제 콘텐츠와 상호작용하는 것처럼 시뮬레이션하며, 애플리케이션 컨텍스트 내에서 직접 텍스트를 편집할 수 있도록 합니다.

## 애플리케이션 빌드 최적화

애플리케이션 번들 크기를 최적화하기 위해 Intlayer는 `@intlayer/babel` 및 `@intlayer/swc` 플러그인을 제공합니다.  
Babel 및 SWC 플러그인은 애플리케이션의 추상 구문 트리(Abstract Syntax Tree, AST)를 분석하여 Intlayer 함수 호출을 최적화된 코드로 대체하는 방식으로 작동합니다. 이 과정은 실제로 사용되는 사전만 가져오도록 하여 청킹(chunking)을 최적화하고 번들 크기를 줄임으로써 프로덕션에서 최종 번들을 더 가볍게 만듭니다.

개발 모드에서는 Intlayer가 사전을 중앙 집중식 정적 가져오기로 사용하여 개발 경험을 단순화합니다.

[설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에서 `activateDynamicImport` 옵션을 활성화하면 Intlayer는 동적 가져오기를 사용하여 사전을 로드합니다. 이 옵션은 애플리케이션 렌더링 시 비동기 처리를 방지하기 위해 기본적으로 비활성화되어 있습니다.

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

### @intlayer/chokidar

`@intlayer/chokidar` 패키지는 콘텐츠 파일을 모니터링하고 수정될 때마다 변경된 사전을 재생성하는 데 사용됩니다.

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

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
