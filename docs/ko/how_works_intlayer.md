# Intlayer 작동 방식

## 개요

Intlayer의 역할은 JavaScript 콘텐츠 선언 파일을 사전으로 해석하는 것입니다.

이를 위해 Intlayer는 여러 단계를 거칩니다:

1. 콘텐츠 파일 선언

   - 콘텐츠 파일은 TypeScript, ECMAScript, CommonJS 또는 JSON과 같은 다양한 형식으로 정의될 수 있습니다.
   - 콘텐츠 파일은 프로젝트 전체에 정의될 수 있어 더 나은 유지 관리와 확장성을 제공합니다. 콘텐츠 파일의 파일 확장자 규칙을 준수하는 것이 중요합니다. 이 확장자는 기본적으로 `*.content.{js|cjs|mjs|ts|tsx|json}`이며, [구성 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에서 수정할 수 있습니다.

2. 사전 생성

   - 사전은 콘텐츠 파일에서 생성됩니다. 기본적으로 intlayer 사전은 프로젝트의 `.intlayer/dictionary` 디렉토리에 생성됩니다.
   - 두 가지 유형의 사전을 생성할 수 있습니다: intlayer 사전 및 i18n 사전 (베타).

3. 사전 유형 생성

   - 사전 유형은 intlayer 사전에서 생성됩니다. 기본적으로 intlayer 사전 유형은 프로젝트의 `types` 디렉토리에 생성됩니다.

4. Intlayer 모듈 증강 생성

   - Intlayer [모듈 증강](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)은 Intlayer에 추가 유형을 정의할 수 있는 TypeScript 기능입니다. 이렇게 하면 사용 가능한 인수 또는 필수 인수를 제안하여 개발 경험을 쉽게 만듭니다.
     생성된 유형 중에서 intlayer 사전 유형이나 심지어 언어 구성 유형이 `types/intlayer.d.ts` 파일에 추가되고 다른 패키지에서 사용됩니다. 이렇게 하려면 `tsconfig.json` 파일이 프로젝트의 `types` 디렉토리를 포함하도록 구성되어 있어야 합니다.

5. 콘텐츠 파일 모니터링

   - 콘텐츠 파일은 수정될 때마다 다시 생성되도록 모니터링됩니다.

6. 사전 해석
   - 사전은 최종적으로 애플리케이션에서 사용되도록 해석됩니다.

## 패키지

Intlayer는 번역 프로세스에서 특정 역할을 가진 여러 패키지로 구성되어 있습니다. 이 패키지 구조의 그래픽 표현은 다음과 같습니다:

![intlayer 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` 패키지는 애플리케이션에서 콘텐츠 파일에 콘텐츠를 선언하는 데 사용됩니다.

### react-intlayer

`react-intlayer` 패키지는 intlayer 사전을 해석하고 이를 React 애플리케이션에서 사용할 수 있도록 하는 데 사용됩니다.

### next-intlayer

`next-intlayer` 패키지는 `react-intlayer` 위에 레이어로 사용되어 intlayer 사전을 Next.js 애플리케이션에서 사용할 수 있도록 합니다. 여기에는 번역 미들웨어, 라우팅 또는 `next.config.js` 파일 구성과 같은 Intlayer가 Next.js 환경에서 작동하도록 하는 필수 기능이 통합되어 있습니다.

### intlayer-editor

`intlayer-editor` 패키지는 시각 편집기의 사용을 허용하는 데 사용됩니다. 이 패키지는 선택 사항으로 애플리케이션에 설치할 수 있으며 `react-intlayer` 패키지에서 사용됩니다.
서버와 클라이언트의 두 부분으로 구성됩니다.

클라이언트는 `react-intlayer`에서 사용될 UI 요소를 포함합니다.

서버는 Express를 기반으로 하며, 편집기 시각 요청을 수신하고 콘텐츠 파일을 관리하거나 수정하는 데 사용됩니다.

### intlayer-cli

`intlayer-cli` 패키지는 `npx intlayer build` 명령을 사용하여 사전을 생성하는 데 사용할 수 있습니다. `intlayer`가 이미 설치되어 있는 경우 CLI는 자동으로 설치되므로 이 패키지는 필요하지 않습니다.

### @intlayer/core

`@intlayer/core` 패키지는 마스터 Intlayer 패키지입니다. 여기에는 번역 및 사전 관리 기능이 포함되어 있습니다. `@intlayer/core`는 멀티 플랫폼이며 다른 패키지에서 사전 해석을 수행하는 데 사용됩니다.

### @intlayer/config

`@intlayer/config` 패키지는 사용 가능한 언어, Next.js 미들웨어 매개변수 또는 통합된 편집기 설정과 같은 Intlayer 설정을 구성하는 데 사용됩니다.

### @intlayer/webpack

`@intlayer/webpack` 패키지는 Next.js 및 React에 컴파일 플러그인을 추가하는 데 사용됩니다.

### @intlayer/cli

`@intlayer/cli` 패키지는 모든 intlayer CLI 명령의 일관성을 보장하는 데 사용됩니다.

### @intlayer/dictionaries-entry

`@intlayer/dictionaries-entry` 패키지는 intlayer 사전의 진입 경로만 반환하는 패키지입니다. 브라우저에서 파일 시스템 검색이 불가능하기 때문에, Webpack이나 Rollup과 같은 번들러를 사용하여 사전의 진입 경로를 검색하는 것은 불가능합니다. 이 패키지는 별칭으로 사용될 수 있도록 설계되었습니다.

### @intlayer/chokidar

`@intlayer/chokidar` 패키지는 콘텐츠 파일을 모니터링하고 각 수정 시 수정된 사전을 다시 생성하는 데 사용됩니다.
