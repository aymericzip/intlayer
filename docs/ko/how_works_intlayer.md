# Intlayer 작동 방식

## 개요

Intlayer의 역할은 JavaScript 콘텐츠 선언 파일을 사전으로 해석하는 것입니다.

이를 위해 Intlayer는 여러 단계를 거칩니다:

1. 콘텐츠 파일 선언

   - 콘텐츠 파일은 TypeScript, ECMAScript, CommonJS 또는 JSON과 같은 다양한 형식으로 정의될 수 있습니다.
   - 콘텐츠 파일은 프로젝트 어디에서나 정의될 수 있어 유지보수성과 확장성이 향상됩니다. 콘텐츠 파일의 파일 확장자 규칙을 준수하는 것이 중요합니다. 이 확장자는 기본적으로 `*.content.{js|cjs|mjs|ts|tsx|json}`이지만, [설정 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에서 수정할 수 있습니다.

2. 사전 생성

   - 사전은 콘텐츠 파일에서 생성됩니다. 기본적으로 intlayer 사전은 프로젝트의 `.intlayer/dictionary` 디렉토리에 생성됩니다.
   - 두 가지 유형의 사전이 생성될 수 있습니다: intlayer 사전과 i18n 사전(베타).

3. 사전 타입 생성

   - 사전 타입은 intlayer 사전에서 생성됩니다. 기본적으로 intlayer 사전 타입은 프로젝트의 `types` 디렉토리에 생성됩니다.

4. Intlayer 모듈 확장 생성

   - Intlayer [모듈 확장](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)은 Intlayer에 추가 타입을 정의할 수 있는 TypeScript 기능입니다. 이는 사용 가능한 인수나 필수 인수를 제안하여 개발 경험을 향상시킵니다.
     생성된 타입 중 intlayer 사전 타입 또는 언어 구성 타입이 `types/intlayer.d.ts` 파일에 추가되고 다른 패키지에서 사용됩니다. 이를 위해 `tsconfig.json` 파일이 프로젝트의 `types` 디렉토리를 포함하도록 구성되어야 합니다.

5. 콘텐츠 파일 모니터링

   - 콘텐츠 파일은 수정될 때마다 다시 생성되도록 모니터링됩니다.

6. 사전 해석
   - 사전은 최종적으로 애플리케이션에서 사용되도록 해석됩니다.

## 패키지

Intlayer는 번역 프로세스에서 특정 역할을 하는 여러 패키지로 구성됩니다. 다음은 이 패키지의 구조를 나타내는 그래픽 표현입니다:

![intlayer 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` 패키지는 콘텐츠 파일에서 콘텐츠를 선언하는 데 사용됩니다.

### react-intlayer

`react-intlayer` 패키지는 intlayer 사전을 해석하고 React 애플리케이션에서 사용할 수 있도록 합니다.

### next-intlayer

`next-intlayer` 패키지는 `react-intlayer` 위에 레이어로 작동하여 Next.js 애플리케이션에서 intlayer 사전을 사용할 수 있도록 합니다. 이 패키지는 번역 미들웨어, 라우팅 또는 `next.config.js` 파일 구성과 같은 Next.js 환경에서 Intlayer가 작동하도록 하는 필수 기능을 통합합니다.

### vite-intlayer

[Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 Intlayer를 통합하기 위한 Vite 플러그인을 포함하며, 사용자의 선호 로케일을 감지하고, 쿠키를 관리하며, URL 리디렉션을 처리하는 미들웨어를 포함합니다.

### react-scripts-intlayer

`react-scripts-intlayer` 명령어와 플러그인을 포함하여 Create React App 기반 애플리케이션과 Intlayer를 통합합니다. 이 플러그인은 [craco](https://craco.js.org/)를 기반으로 하며 [Webpack](https://webpack.js.org/) 번들러에 대한 추가 구성을 포함합니다.

### intlayer-editor

`intlayer-editor` 패키지는 시각적 편집기를 사용할 수 있도록 합니다. 이 패키지는 선택 사항으로 애플리케이션에 설치될 수 있으며 `react-intlayer` 패키지에서 사용됩니다.
이 패키지는 서버와 클라이언트 두 부분으로 구성됩니다.

클라이언트는 `react-intlayer`에서 사용될 UI 요소를 포함합니다.

서버는 Express를 기반으로 하여 편집기 시각적 요청을 수신하고 콘텐츠 파일을 관리하거나 수정합니다.

### intlayer-cli

`intlayer-cli` 패키지는 `npx intlayer dictionaries build` 명령어를 사용하여 사전을 생성하는 데 사용할 수 있습니다. `intlayer`가 이미 설치된 경우 CLI는 자동으로 설치되며 이 패키지는 필요하지 않습니다.

### @intlayer/core

`@intlayer/core` 패키지는 주요 Intlayer 패키지입니다. 번역 및 사전 관리 기능을 포함합니다. `@intlayer/core`는 다중 플랫폼으로, 다른 패키지에서 사전 해석을 수행하는 데 사용됩니다.

### @intlayer/config

`@intlayer/config` 패키지는 사용 가능한 언어, Next.js 미들웨어 매개변수 또는 통합 편집기 설정과 같은 Intlayer 설정을 구성하는 데 사용됩니다.

### @intlayer/webpack

`@intlayer/webpack` 패키지는 Webpack 기반 애플리케이션에서 Intlayer를 작동시키기 위한 Webpack 구성을 제공합니다. 이 패키지는 기존 Webpack 애플리케이션에 추가할 플러그인도 제공합니다.

### @intlayer/cli

`@intlayer/cli` 패키지는 Intlayer 명령줄 인터페이스와 관련된 스크립트를 선언하는 데 사용되는 NPM 패키지입니다. 모든 Intlayer CLI 명령어의 일관성을 보장합니다. 이 패키지는 특히 [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer-cli/index.md) 및 [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/index.md) 패키지에서 사용됩니다.

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry` 패키지는 intlayer 사전의 진입 경로만 반환하는 패키지입니다. 브라우저에서 파일 시스템 검색이 불가능하기 때문에 Webpack 또는 Rollup과 같은 번들러를 사용하여 사전의 진입 경로를 검색하는 것이 불가능합니다. 이 패키지는 별칭으로 사용됩니다.

### @intlayer/chokidar

`@intlayer/chokidar` 패키지는 콘텐츠 파일을 모니터링하고 각 수정 시 수정된 사전을 다시 생성하는 데 사용됩니다.

### @intlayer/editor

`@intlayer/editor` 패키지는 사전 편집기와 관련된 유틸리티를 제공합니다. 특히 Intlayer 편집기와 애플리케이션을 인터페이스하기 위한 API와 사전을 조작하기 위한 유틸리티를 포함합니다. 이 패키지는 다중 플랫폼입니다.

### @intlayer/editor-react

`@intlayer/editor-react` 패키지는 React 애플리케이션과 Intlayer 편집기를 인터페이스하기 위한 상태, 컨텍스트, 훅 및 컴포넌트를 제공합니다.

## 스마트 문서와 대화하기

- [스마트 문서에 질문하기](https://intlayer.org/docs/chat)
